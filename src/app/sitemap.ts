import type { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { getDb, isFirebaseConfigured } from '@/lib/firebase/client';
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
      const snap = await getDocs(collection(getDb(), 'usernames'));
      snap.forEach((d) => pages.push({ url: `${SITE_URL}/${d.id}`, changeFrequency: 'daily', priority: 0.8 }));
    } catch (e) {
      console.error('sitemap: 사용자 목록을 불러오지 못했습니다.', e);
    }
  }

  return pages;
}
