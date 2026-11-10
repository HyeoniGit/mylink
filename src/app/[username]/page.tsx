import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/profile/PageShell';
import ProfileCard from '@/components/profile/ProfileCard';
import { isFirebaseConfigured } from '@/lib/firebase/client';
import { fetchLinks } from '@/lib/firebase/links';
import { fetchProfile, findUserIdByUsername } from '@/lib/firebase/profile';

type Params = Promise<{ username: string }>;

/** /[username] → userId → 프로필 + 링크. 없으면 null */
async function loadPage(rawUsername: string) {
  if (!isFirebaseConfigured) return null;
  const username = decodeURIComponent(rawUsername).toLowerCase();
  const userId = await findUserIdByUsername(username);
  if (!userId) return null;
  const [profile, links] = await Promise.all([fetchProfile(userId), fetchLinks(userId)]);
  return profile ? { userId, profile, links } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await loadPage((await params).username);
  if (!data) return { title: '페이지를 찾을 수 없습니다' };
  const { displayName, username, bio } = data.profile;
  const title = `마이링크 - ${displayName}`;
  const description = bio || `${displayName}님의 링크 모음 · 나만의 링크 페이지를 30분 만에!`;
  // og:image 는 같은 폴더의 opengraph-image.tsx 가 자동으로 연결됨
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/${username}` },
    openGraph: { type: 'profile', title, description, url: `/${username}` },
  };
}

/** 공개 개인 페이지: 로그인 없이 누구나 조회 가능 */
export default async function UserPage({ params }: { params: Params }) {
  const data = await loadPage((await params).username);
  if (!data) notFound();

  return (
    <PageShell>
      <ProfileCard userId={data.userId} profile={data.profile} links={data.links} />
    </PageShell>
  );
}
