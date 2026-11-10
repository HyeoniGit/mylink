/**
 * 배포된 사이트의 기본 URL (OG 태그·sitemap 에 사용)
 * 1) NEXT_PUBLIC_SITE_URL 이 있으면 그 값
 * 2) Vercel 배포 환경이면 Vercel 이 자동으로 넣어주는 프로덕션 도메인
 * 3) 로컬 개발 서버
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');

export const SITE_NAME = '마이링크';
export const SITE_TAGLINE = '나만의 링크 페이지를 30분 만에!';
