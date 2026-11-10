'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageShell from '@/components/profile/PageShell';
import ProfileEditor from '@/components/dashboard/ProfileEditor';
import LinkManager from '@/components/dashboard/LinkManager';
import FirebaseSetupNotice from '@/components/dashboard/FirebaseSetupNotice';
import { useAuth } from '@/contexts/AuthContext';
import { isFirebaseConfigured } from '@/lib/firebase/client';

/** 마이페이지: 로그인한 본인의 프로필·링크·통계를 관리 (로그인 필수) */
export default function MyPage() {
  const router = useRouter();
  const { user, profile, loading, error, setProfile } = useAuth();

  // 로그아웃 상태면 로그인 페이지로
  useEffect(() => {
    if (isFirebaseConfigured && !loading && !user) router.replace('/login');
  }, [loading, user, router]);

  return (
    <PageShell>
      {!isFirebaseConfigured ? (
        <FirebaseSetupNotice />
      ) : loading || !user ? (
        <p className="text-xs font-bold text-white text-center py-10 animate-pulse">마이링크 로딩 중...</p>
      ) : !profile ? (
        <p role="alert" className="text-xs font-bold text-white text-center py-10">
          {error ?? '프로필을 준비하는 중...'}
        </p>
      ) : (
        <>
          <ProfileEditor userId={user.uid} profile={profile} onSaved={setProfile} />
          <LinkManager userId={user.uid} />
        </>
      )}
    </PageShell>
  );
}
