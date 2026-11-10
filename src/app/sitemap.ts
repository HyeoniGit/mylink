import type { MetadataRoute } from 'next';
import { isFirebaseConfigured } from '@/lib/firebase/client';
import { listUsernamesServer } from '@/lib/firebase/server';
import { SITE_URL } from '@/lib/site';

// 1시간마다 다시 생성 → 새로 가입한 사용자의 /username 도 반영
export const revalidate = 3600;

/** /sitemap.xml : 랜딩 페이지 + 모든 사용자의 공개 페이지(/username) */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
  ];

  if (isFirebaseConfigured) {
    try {
      const usernames = await listUsernamesServer();
      usernames.forEach((u) => pages.push({ url: `${SITE_URL}/${u}`, changeFrequency: 'daily', priority: 0.8 }));
    } catch (e) {
      console.error('sitemap: 사용자 목록을 불러오지 못했습니다.', e);
    }
  }

  return pages;
}
