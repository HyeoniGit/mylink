import { renderOgCard, OG_SIZE } from '@/lib/og';
import { SITE_TAGLINE, SITE_URL } from '@/lib/site';

export const alt = '마이링크 - 나만의 링크 페이지';
export const size = OG_SIZE;
export const contentType = 'image/png';

/** 랜딩 페이지(/) 공유 시 미리보기 이미지 */
export default async function Image() {
  return renderOgCard({
    title: '마이링크',
    subtitle: SITE_TAGLINE,
    badge: '링크 관리 · 클릭 통계 · 개인 URL',
    footer: SITE_URL.replace(/^https?:\/\//, ''),
  });
}
