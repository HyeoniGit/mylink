'use client';

import React from 'react';
import Link from 'next/link';
import { LogIn, LogOut, UserRound } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { isFirebaseConfigured } from '@/lib/firebase/client';

export default function ProfileNavbar() {
  const { user, profile, loading, logout } = useAuth();

  return (
    <header className="w-full h-12 px-3 sm:px-4 flex items-center justify-between gap-2 border-b-2 border-[#3d4f97] text-white select-none bg-[#21242e] bg-[radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:3px_3px]">
      {/* Nintendo Style Logo Pill */}
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <div className="bg-white px-2.5 py-0.5 rounded-full border-2 border-[#e60012] shadow-[0_1px_3px_rgba(0,0,0,0.5)] flex items-center">
          <span className="text-[#e60012] font-black text-xs sm:text-sm tracking-wider uppercase font-sans">
            마이링크
          </span>
        </div>
        <span className="hidden sm:inline-block text-[10px] text-[#9fbee7] uppercase font-bold tracking-widest">
          Link Portal
        </span>
      </Link>

      {/* 로그인 상태에 따른 UI */}
      {isFirebaseConfigured && !loading && (
        <div className="flex items-center gap-2 min-w-0">
          {user ? (
            <>
              <Link
                href="/mypage"
                className="flex items-center gap-1 text-[11px] font-bold text-[#ecab37] hover:text-white truncate"
                title="마이페이지"
              >
                <UserRound size={12} className="shrink-0" />
                <span className="truncate">{profile?.displayName ?? user.displayName}님</span>
              </Link>
              <Button variant="carbon" size="sm" onClick={logout} className="active:scale-95">
                <LogOut size={12} />
                <span>로그아웃</span>
              </Button>
            </>
          ) : (
            <Link href="/login" className={buttonVariants({ variant: 'amber', size: 'sm' })}>
              <LogIn size={12} />
              <span>로그인</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
