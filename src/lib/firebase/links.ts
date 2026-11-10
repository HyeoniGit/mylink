import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type Timestamp,
} from 'firebase/firestore';
import { getDb } from './client';
import type { LinkDoc, LinkInput } from '@/types/mylink';

/** Firestore 경로: users/{userId}/links */
const linksCol = (userId: string) => collection(getDb(), 'users', userId, 'links');

function toLinkDoc(id: string, data: Record<string, unknown>): LinkDoc {
  return {
    id,
    title: String(data.title ?? ''),
    url: String(data.url ?? ''),
    description: data.description ? String(data.description) : '',
    clickCount: typeof data.clickCount === 'number' ? data.clickCount : 0,
    createdAt: (data.createdAt as Timestamp | null)?.toMillis?.() ?? Date.now(),
  };
}

/** Read (실시간): 링크 목록을 구독하고 변경 시 콜백 호출 */
export function subscribeLinks(
  userId: string,
  onChange: (links: LinkDoc[]) => void,
  onError?: (e: Error) => void
) {
  const q = query(linksCol(userId), orderBy('createdAt', 'asc'));
  return onSnapshot(
    q,
    (snap) => onChange(snap.docs.map((d) => toLinkDoc(d.id, d.data()))),
    onError
  );
}

/** Read (1회): 공개 페이지에서 사용 */
export async function fetchLinks(userId: string): Promise<LinkDoc[]> {
  const snap = await getDocs(query(linksCol(userId), orderBy('createdAt', 'asc')));
  return snap.docs.map((d) => toLinkDoc(d.id, d.data()));
}

/** Create */
export function createLink(userId: string, input: LinkInput) {
  return addDoc(linksCol(userId), {
    ...input,
    clickCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/** Update */
export function updateLink(userId: string, linkId: string, input: LinkInput) {
  return updateDoc(doc(getDb(), 'users', userId, 'links', linkId), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

/** Delete */
export function deleteLink(userId: string, linkId: string) {
  return deleteDoc(doc(getDb(), 'users', userId, 'links', linkId));
}

/**
 * 클릭 수 +1 (13주차)
 * 현재 값을 읽어서 계산하지 않고 서버에 "+1 해줘"(increment)를 요청하므로
 * 여러 명이 동시에 클릭해도 카운트가 손실되지 않는다.
 */
export function incrementClick(userId: string, linkId: string) {
  return updateDoc(doc(getDb(), 'users', userId, 'links', linkId), {
    clickCount: increment(1),
  });
}

/** 사용자가 입력한 URL 에 프로토콜이 없으면 https:// 를 붙여준다 */
export function normalizeUrl(url: string) {
  const trimmed = url.trim();
  if (/^(https?:|mailto:)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
