import Link from 'next/link';
import { BarChart3, ChevronRight, Globe, Link2, Sparkles } from 'lucide-react';
import PageShell from '@/components/profile/PageShell';
import SectionPanel from '@/components/dashboard/SectionPanel';
import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const FEATURES = [
  {
    icon: Link2,
    title: '링크 관리',
    description: '포트폴리오·SNS·블로그 링크를 한 곳에 모으고 바로 수정·삭제하세요.',
  },
  {
    icon: BarChart3,
    title: '클릭 통계',
    description: '어떤 링크가 인기 있는지 클릭 수로 한눈에 확인할 수 있어요.',
  },
  {
    icon: Globe,
    title: '개인 URL',
    description: 'mylink/내아이디 주소 하나로 어디서든 공유하세요.',
  },
];

const PREVIEW_LINKS = ['포트폴리오 웹사이트', 'Instagram', 'GitHub', '기술 블로그'];

const TITLE_TEXT =
  'uppercase tracking-wider text-white font-black italic [-webkit-text-stroke:1.5px_#3d4f97] [text-shadow:3px_3px_0px_#21242e]';

/** 랜딩 페이지 (14주차): 히어로 → 기능 소개 → 미리보기 → 푸터 */
export default function LandingPage() {
  return (
    <PageShell wide>
      {/* 1. 히어로 */}
      <Card variant="chamfered" className="w-full px-4 py-10 sm:py-14 text-center">
        <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none opacity-40 bg-gradient-to-bl from-white via-transparent to-transparent" />
        <p className="text-[11px] font-bold text-[#3d4f97] uppercase tracking-[0.3em] mb-2">MyLink · Link Portal</p>
        <h1 className={cn('text-4xl sm:text-6xl mb-3', TITLE_TEXT)}>마이링크</h1>
        <p className="text-sm sm:text-lg font-bold text-[#21242e] mb-6 break-keep">
          나만의 링크 페이지를 30분 만에
        </p>
        <Link href="/login" className={cn(buttonVariants({ variant: 'signal', size: 'lg' }), 'px-6 h-11 text-sm')}>
          <Sparkles size={15} />
          시작하기 ▶
        </Link>
      </Card>

      {/* 2. 기능 소개 */}
      <SectionPanel label="기능 소개 (FEATURES)">
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <Card variant="platinum" className="h-full p-4 flex flex-col gap-2 hover:translate-y-0">
                <span className="w-9 h-9 rounded-full bg-[#f68d1f] text-white flex items-center justify-center shadow-xs">
                  <Icon size={18} />
                </span>
                <h2 className="text-sm font-black text-[#21242e]">{title}</h2>
                <p className="text-xs text-[#60619c] leading-relaxed break-keep">{description}</p>
              </Card>
            </li>
          ))}
        </ul>
      </SectionPanel>

      {/* 3. 미리보기 */}
      <SectionPanel label="미리보기 (PREVIEW)">
        <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
          {/* 예시 화면 목업 */}
          <div aria-hidden className="w-full max-w-[260px] mx-auto sm:mx-0 bg-[#21242e] p-2 shadow-[0_6px_16px_rgba(0,0,0,0.4)]">
            <Card variant="beveled" className="p-3 flex flex-col items-center gap-2">
              <span className="w-12 h-12 rounded-full bg-[#5b5fc7] border-2 border-white text-white font-black flex items-center justify-center">
                홍
              </span>
              <p className={cn('text-base', TITLE_TEXT)}>홍길동</p>
              <p className="text-[10px] font-bold text-[#21242e]">@honggildong</p>
              {PREVIEW_LINKS.map((title) => (
                <div
                  key={title}
                  className="w-full bg-[#dedede] border-t border-l border-b-2 border-r-2 border-t-white border-l-white border-b-[#3d4f97] border-r-[#3d4f97] px-2 py-1.5 flex items-center justify-between"
                >
                  <span className="text-[11px] font-bold text-[#21242e]">{title}</span>
                  <span className="w-4 h-4 rounded-full bg-[#f68d1f] text-white flex items-center justify-center">
                    <ChevronRight size={10} strokeWidth={3} />
                  </span>
                </div>
              ))}
            </Card>
          </div>

          <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
            <h2 className={cn('text-2xl', TITLE_TEXT)}>링크 하나로 나를 소개하세요</h2>
            <p className="text-xs sm:text-sm text-[#21242e] leading-relaxed break-keep">
              구글 계정으로 로그인하면 바로 나만의 페이지가 만들어져요.
              <br />
              프로필 소개 링크에 <b>mylink/내아이디</b> 를 걸어두면 끝!
            </p>
            <Link href="/login" className={cn(buttonVariants({ variant: 'amber', size: 'lg' }), 'px-5')}>
              나도 만들어보기 ▶
            </Link>
          </div>
        </div>
      </SectionPanel>
    </PageShell>
  );
}
