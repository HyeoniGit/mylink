import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/** /robots.txt : 마이페이지·로그인은 검색 제외, sitemap 위치 안내 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/mypage', '/login', '/api/'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
