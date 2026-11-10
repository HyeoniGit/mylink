'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, ExternalLink } from 'lucide-react';
import type { ProfileDoc } from '@/types/mylink';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { saveProfile, UsernameError, validateUsername } from '@/lib/firebase/profile';
import SectionPanel from './SectionPanel';

interface ProfileEditorProps {
  userId: string;
  profile: ProfileDoc;
  onSaved: (profile: ProfileDoc) => void;
}

const LABEL = 'block font-bold text-[#21242e] mb-1 text-xs';

export default function ProfileEditor({ userId, profile, onSaved }: ProfileEditorProps) {
  const [form, setForm] = useState<ProfileDoc>(profile);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // 저장 후 상위 프로필이 바뀌면 폼도 맞춰준다
  const [syncedProfile, setSyncedProfile] = useState(profile);
  if (profile !== syncedProfile) {
    setSyncedProfile(profile);
    setForm(profile);
  }

  const dirty =
    form.username !== profile.username ||
    form.displayName !== profile.displayName ||
    form.bio !== profile.bio ||
    form.avatarUrl !== profile.avatarUrl;

  const update = (field: keyof ProfileDoc) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNotice(null);
    setError(null);
    setForm({ ...form, [field]: field === 'username' ? e.target.value.toLowerCase() : e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.displayName.trim()) return setError('표시 이름을 입력해주세요.');
    const invalid = validateUsername(form.username.trim());
    if (invalid) return setError(invalid);

    setSaving(true);
    try {
      await saveProfile(userId, profile.username, form);
      const saved = { ...form, username: form.username.trim(), displayName: form.displayName.trim(), bio: form.bio.trim() };
      onSaved(saved);
      setNotice('프로필이 저장되었습니다.');
    } catch (err) {
      setError(err instanceof UsernameError ? err.message : '저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SectionPanel label="프로필 수정 (PROFILE)">
      {/* 공유 URL */}
      <div className="mb-3 flex items-center justify-between gap-2 bg-white/80 border border-[#3d4f97]/30 px-2.5 py-1.5 text-[11px]">
        <span className="text-[#60619c] truncate">
          내 공유 URL: <b className="text-[#21242e]">/{profile.username}</b>
        </span>
        <Button
          variant="signal"
          size="xs"
          nativeButton={false}
          render={<Link href={`/${profile.username}`} target="_blank" />}
        >
          <ExternalLink size={10} />
          <span>내 페이지</span>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label htmlFor="profile-username" className={LABEL}>
            username (공유 URL) *
          </label>
          <Input
            id="profile-username"
            value={form.username}
            onChange={update('username')}
            maxLength={20}
            placeholder="honggildong"
            className="font-mono"
            required
          />
          <p className="text-[10px] text-[#21242e]/70 mt-1">영문 소문자·숫자·_·- 3~20자</p>
        </div>

        <div>
          <label htmlFor="profile-display-name" className={LABEL}>
            표시 이름 (최대 30자) *
          </label>
          <Input
            id="profile-display-name"
            value={form.displayName}
            onChange={update('displayName')}
            maxLength={30}
            placeholder="홍길동"
            required
          />
        </div>

        <div>
          <label htmlFor="profile-bio" className={`${LABEL} flex items-center justify-between`}>
            <span>소개글 (Bio)</span>
            <span className="text-[10px] text-[#21242e]/70 font-normal">{form.bio.length} / 100자</span>
          </label>
          <Textarea
            id="profile-bio"
            value={form.bio}
            onChange={update('bio')}
            maxLength={100}
            rows={2}
            placeholder="안녕하세요! 한 줄 소개를 적어주세요."
          />
        </div>

        <div>
          <label htmlFor="profile-avatar" className={LABEL}>
            프로필 사진 URL
          </label>
          <Input
            id="profile-avatar"
            type="url"
            value={form.avatarUrl}
            onChange={update('avatarUrl')}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        {error && <p role="alert" className="text-[11px] font-bold text-[#e60012]">{error}</p>}
        {notice && <p role="status" className="text-[11px] font-bold text-[#21242e]">✓ {notice}</p>}

        <div className="flex justify-end">
          <Button type="submit" variant="signal" disabled={!dirty || saving} className="px-4 active:scale-95">
            <Check size={13} strokeWidth={3} />
            <span>{saving ? '저장 중...' : '프로필 저장 ▶'}</span>
          </Button>
        </div>
      </form>
    </SectionPanel>
  );
}
