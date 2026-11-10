import React from 'react';
import SectionPanel from './SectionPanel';

/** .env.local 에 Firebase 설정값이 없을 때 안내 */
export default function FirebaseSetupNotice() {
  return (
    <SectionPanel label="설정 필요 (SETUP)">
      <div className="text-xs text-[#21242e] leading-relaxed flex flex-col gap-1.5">
        <p className="font-bold">Firebase 설정값이 없습니다.</p>
        <p>
          프로젝트 루트의 <code className="font-mono bg-white/70 px-1">.env.example</code> 을{' '}
          <code className="font-mono bg-white/70 px-1">.env.local</code> 로 복사한 뒤, Firebase 콘솔의 웹 앱
          설정값을 채우고 개발 서버를 다시 시작해주세요.
        </p>
      </div>
    </SectionPanel>
  );
}
