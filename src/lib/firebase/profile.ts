import { doc, getDoc, runTransaction } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { getDb } from './client';
import type { ProfileDoc } from '@/types/mylink';

/** Firestore 경로: users/{userId}/profile/info */
const profileRef = (userId: string) => doc(getDb(), 'users', userId, 'profile', 'info');
/** Firestore 경로: usernames/{username} → { uid } (중복 체크 + URL 조회용) */
const usernameRef = (username: string) => doc(getDb(), 'usernames', username);

export const USERNAME_PATTERN = /^[a-z0-9_-]{3,20}$/;
/** 앱의 다른 라우트와 겹치면 안 되는 이름 */
const RESERVED = new Set(['api', 'login', 'logout', 'admin', 'dashboard', 'settings', 'mypage', '_next']);

export class UsernameError extends Error {}

export function validateUsername(username: string): string | null {
  if (!USERNAME_PATTERN.test(username)) {
    return 'username 은 영문 소문자·숫자·_·- 조합 3~20자만 가능합니다.';
  }
  if (RESERVED.has(username)) return `"${username}" 은(는) 사용할 수 없는 이름입니다.`;
  return null;
}

/** 이메일 앞부분을 URL 에 쓸 수 있는 username 후보로 변환 */
function usernameFromEmail(email: string | null) {
  const base = (email?.split('@')[0] ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '')
    .slice(0, 16);
  return base.length >= 3 && !RESERVED.has(base) ? base : `user${base}`.slice(0, 16).padEnd(4, '0');
}

export async function fetchProfile(userId: string): Promise<ProfileDoc | null> {
  const snap = await getDoc(profileRef(userId));
  return snap.exists() ? (snap.data() as ProfileDoc) : null;
}

/**
 * 로그인 직후 호출: 프로필이 없으면 생성한다.
 * - username: 이메일 앞부분 (중복이면 숫자 접미사)
 * - displayName / avatarUrl: 구글 계정 정보
 */
export async function ensureProfile(user: User): Promise<ProfileDoc> {
  const existing = await fetchProfile(user.uid);
  if (existing) return existing;

  const base = usernameFromEmail(user.email);
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = attempt === 0 ? base : `${base}${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      return await runTransaction(getDb(), async (tx) => {
        const taken = await tx.get(usernameRef(candidate));
        if (taken.exists()) throw new UsernameError('taken');
        const profile: ProfileDoc = {
          username: candidate,
          displayName: user.displayName ?? candidate,
          bio: '',
          avatarUrl: user.photoURL ?? '',
        };
        tx.set(usernameRef(candidate), { uid: user.uid });
        tx.set(profileRef(user.uid), profile);
        return profile;
      });
    } catch (e) {
      if (!(e instanceof UsernameError)) throw e;
    }
  }
  throw new Error('사용 가능한 username 을 만들지 못했습니다. 잠시 후 다시 시도해주세요.');
}

/**
 * 프로필 저장. username 이 바뀌면 중복 체크 후 매핑 문서를 교체한다.
 * 중복이면 UsernameError 를 던진다.
 */
export async function saveProfile(userId: string, prevUsername: string, next: ProfileDoc) {
  const username = next.username.trim().toLowerCase();
  const invalid = validateUsername(username);
  if (invalid) throw new UsernameError(invalid);

  await runTransaction(getDb(), async (tx) => {
    if (username !== prevUsername) {
      const taken = await tx.get(usernameRef(username));
      if (taken.exists() && taken.data().uid !== userId) {
        throw new UsernameError(`"${username}" 은(는) 이미 사용 중인 username 입니다.`);
      }
      tx.set(usernameRef(username), { uid: userId });
      tx.delete(usernameRef(prevUsername));
    }
    tx.set(profileRef(userId), {
      username,
      displayName: next.displayName.trim().slice(0, 30),
      bio: next.bio.trim().slice(0, 100),
      avatarUrl: next.avatarUrl.trim(),
    });
  });
}
