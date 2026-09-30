import { LinkItem } from '@/types/link';

export const INITIAL_LINKS: LinkItem[] = [
  {
    id: 'link-1',
    title: 'Next.js 15 공식 문서',
    url: 'https://nextjs.org/docs',
    description: '서버 컴포넌트, App Router, 터보팩 가이드 및 최신 레퍼런스',
    category: 'dev',
    emoji: '⚡',
    likes: 42,
    clicks: 128,
    bgColor: '#FFE600', // Neo Yellow
    isFeatured: true,
  },
  {
    id: 'link-2',
    title: 'Tailwind CSS 테마 가이드',
    url: 'https://tailwindcss.com',
    description: '모던 웹을 위한 유틸리티 우선 CSS 프레임워크',
    category: 'design',
    emoji: '🎨',
    likes: 35,
    clicks: 94,
    bgColor: '#70D6FF', // Sky Cyan
    isFeatured: true,
  },
  {
    id: 'link-3',
    title: 'GitHub 프로필 & 저장소',
    url: 'https://github.com',
    description: '오픈소스 프로젝트와 소스코드 저장소 모음',
    category: 'dev',
    emoji: '🐙',
    likes: 58,
    clicks: 210,
    bgColor: '#A6FF96', // Lime Green
    isFeatured: false,
  },
  {
    id: 'link-4',
    title: 'Lucide Icons 아이콘 팩',
    url: 'https://lucide.dev',
    description: '미려하고 일관된 오픈소스 벡터 아이콘 컬렉션',
    category: 'tools',
    emoji: '✨',
    likes: 29,
    clicks: 83,
    bgColor: '#FF90E8', // Bubblegum Pink
    isFeatured: false,
  },
  {
    id: 'link-5',
    title: 'Figma 디자인 시스템 랩',
    url: 'https://figma.com',
    description: 'UI/UX 프로토타이핑 및 컴포넌트 라이브러리 협업 툴',
    category: 'design',
    emoji: '📐',
    likes: 51,
    clicks: 147,
    bgColor: '#D4BBFF', // Lavender
    isFeatured: true,
  },
  {
    id: 'link-6',
    title: 'My Favorite Tech Articles',
    url: 'https://velog.io',
    description: '주간 개발 인사이트 및 생산성 팁 블로그 아티클',
    category: 'star',
    emoji: '⭐',
    likes: 64,
    clicks: 172,
    bgColor: '#FFC06E', // Peach Orange
    isFeatured: false,
  },
];
