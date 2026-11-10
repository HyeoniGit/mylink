'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import PageShell from '@/components/profile/PageShell';
import SectionPanel from '@/components/dashboard/SectionPanel';
import FirebaseSetupNotice from '@/components/dashboard/FirebaseSetupNotice';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { isFirebaseConfigured } from '@/lib/firebase/client';

/** 로그인 페이지: 로그인되면 마이페이지로 이동 */
export default function LoginPage() {
  const router = useRouter();
  const { user, loading, error, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (user) router.replace('/mypage');
  }, [user, router]);

  return (
    <PageShell>
      {!isFirebaseConfigured ? (
        <FirebaseSetupNotice />
      ) : (
        <SectionPanel label="로그인 (LOGIN)">
          <div className="flex flex-col items-center text-center gap-3 py-4">
            <h1 className="text-xl uppercase tracking-wider text-white font-black italic [-webkit-text-stroke:1.5px_#3d4f97] [text-shadow:3px_3px_0px_#21242e]">
              나만의 링크 페이지
            </h1>
            <p className="text-xs text-[#21242e] font-medium break-keep">
              구글 계정으로 로그인하고 링크를 모아
              <br />
              <b>mylink/내아이디</b> 주소로 공유해보세요.
            </p>
            <Button
              variant="amber"
              size="lg"
              onClick={signInWithGoogle}
              disabled={loading || Boolean(user)}
              className="active:scale-95"
            >
              <LogIn size={14} />
              <span>{user ? '마이페이지로 이동 중...' : 'Google로 로그인'}</span>
            </Button>
            {error && <p role="alert" className="text-[11px] font-bold text-[#e60012]">{error}</p>}
          </div>
        </SectionPanel>
      )}
    </PageShell>
  );
}
