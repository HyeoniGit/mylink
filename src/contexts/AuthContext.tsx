'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase/client';
import { ensureProfile } from '@/lib/firebase/profile';
import type { ProfileDoc } from '@/types/mylink';

interface AuthContextValue {
  user: User | null;
  profile: ProfileDoc | null;
  /** onAuthStateChanged 첫 응답 전까지 true */
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setProfile: (profile: ProfileDoc) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileDoc | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState<string | null>(null);

  // 로그인 상태 감지 (새로고침해도 유지)
  useEffect(() => {
    if (!isFirebaseConfigured) return;
    return onAuthStateChanged(getFirebaseAuth(), async (nextUser) => {
      setUser(nextUser);
      if (nextUser) {
        try {
          setProfile(await ensureProfile(nextUser));
        } catch (e) {
          setError(e instanceof Error ? e.message : '프로필을 불러오지 못했습니다.');
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setError(null);
    try {
      await signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider());
    } catch (e) {
      const code = (e as { code?: string }).code;
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return;
      setError(e instanceof Error ? e.message : '로그인에 실패했습니다.');
    }
  }, []);

  const logout = useCallback(() => signOut(getFirebaseAuth()), []);

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, error, signInWithGoogle, logout, setProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth 는 AuthProvider 안에서만 사용할 수 있습니다.');
  return ctx;
}
