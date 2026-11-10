import { renderOgCard, OG_SIZE } from '@/lib/og';
import { SITE_TAGLINE, SITE_URL } from '@/lib/site';
import { isFirebaseConfigured } from '@/lib/firebase/client';
import { fetchLinks } from '@/lib/firebase/links';
import { fetchProfile, findUserIdByUsername } from '@/lib/firebase/profile';

export const alt = '마이링크 프로필 미리보기';
export const size = OG_SIZE;
export const contentType = 'image/png';

/** /[username] 공유 시 미리보기 이미지: 프로필 사진 + 이름 + 소개글 + 링크 개수 */
export default async function Image({ params }: { params: Promise<{ username: string }> }) {
  const username = decodeURIComponent((await params).username).toLowerCase();
  const host = SITE_URL.replace(/^https?:\/\//, '');

  const userId = isFirebaseConfigured ? await findUserIdByUsername(username) : null;
  const [profile, links] = userId
    ? await Promise.all([fetchProfile(userId), fetchLinks(userId)])
    : [null, []];

  if (!profile) {
    return renderOgCard({ title: '마이링크', subtitle: SITE_TAGLINE, footer: host });
  }

  return renderOgCard({
    title: profile.displayName,
    subtitle: profile.bio || `${profile.displayName}님의 링크 모음`,
    avatarUrl: profile.avatarUrl || undefined,
    badge: `${links.length}개의 링크`,
    footer: `${host}/${profile.username}`,
  });
}
