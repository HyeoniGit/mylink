import React from 'react';
import ProfileNavbar from '@/components/profile/ProfileNavbar';
import ProfileFooter from '@/components/profile/ProfileFooter';

/** 모든 페이지 공통 프레임: 카본 헤더 + 브러시드 캔버스 + 카본 푸터 */
export default function PageShell({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  /** 랜딩 페이지처럼 데스크톱에서 넓게 쓸 때 */
  wide?: boolean;
}) {
  return (
    <main className="min-h-screen bg-[#556288] flex flex-col items-center justify-start p-2 sm:p-4 select-text font-sans">
      <div className={`w-full ${wide ? 'max-w-4xl' : 'max-w-[460px]'} bg-[#7a8aba] border-t-2 border-l border-b-2 border-r-2 border-t-white border-l-white border-b-[#3d4f97] border-r-[#3d4f97] p-1 sm:p-2 shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex flex-col`}>
        <ProfileNavbar />
        <div className="p-2 sm:p-3 bg-gradient-to-b from-[#8ba1d4] via-[#7a8aba] to-[#60619c] flex flex-col gap-3">
          {children}
        </div>
        <ProfileFooter />
      </div>
    </main>
  );
}
