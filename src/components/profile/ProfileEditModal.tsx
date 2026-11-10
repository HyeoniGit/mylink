'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, RotateCcw, Check, Link as LinkIcon, User } from 'lucide-react';
import { UserProfile, MyLinkItem } from '@/types/profile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  currentLinks: MyLinkItem[];
  onSave: (user: UserProfile, links: MyLinkItem[]) => void;
  onResetToDefault: () => void;
}

const TAB_ACTIVE =
  'bg-[#ecab37] text-[#21242e] border-t-2 border-l border-b-2 border-r-2 border-t-[#ffde7a] border-l-[#ffde7a] border-b-[#a66f12] border-r-[#a66f12] hover:bg-[#ecab37]';
const TAB_INACTIVE = 'text-white/80 hover:text-white bg-[#3d4f97] hover:bg-[#3d4f97]';

export default function ProfileEditModal({
  isOpen,
  onClose,
  currentUser,
  currentLinks,
  onSave,
  onResetToDefault,
}: ProfileEditModalProps) {
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);
  const [links, setLinks] = useState<MyLinkItem[]>(currentLinks);
  const [activeTab, setActiveTab] = useState<'profile' | 'links'>('profile');

  // Sync state when opened or props update
  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setBio(currentUser.bio);
      setAvatarUrl(currentUser.avatarUrl);
      setLinks(currentLinks);
    }
  }, [isOpen, currentUser, currentLinks]);

  // Add new link row
  const handleAddLink = () => {
    if (links.length >= 20) {
      alert('링크는 최대 20개까지 등록 가능합니다.');
      return;
    }
    const newLink: MyLinkItem = {
      id: `link-${Date.now()}`,
      title: '새 링크',
      url: 'https://',
      description: '',
      clicks: 0,
      order: links.length + 1,
      isVisible: true,
      createdAt: new Date().toISOString(),
    };
    setLinks([...links, newLink]);
  };

  // Remove link
  const handleRemoveLink = (id: string) => {
    setLinks(links.filter((l) => l.id !== id));
  };

  // Update link fields
  const handleUpdateLink = (id: string, field: 'title' | 'url' | 'description', value: string) => {
    setLinks(
      links.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  // Save all
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('표시 이름을 입력해주세요.');
      return;
    }

    const updatedUser: UserProfile = {
      ...currentUser,
      name: name.slice(0, 30),
      bio: bio.slice(0, 100),
      avatarUrl: avatarUrl.trim(),
    };

    onSave(updatedUser, links);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <DialogHeader className="px-3 py-2 pr-9 border-b-2 border-[#3d4f97] text-white select-none bg-[#21242e] bg-[radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:3px_3px] gap-0.5">
          <DialogTitle className="flex items-center gap-2">
            <span className="text-[#ecab37] uppercase tracking-wider">≡ EDIT MODE</span>
            <span className="text-white">마이링크 프로필 & 링크 편집</span>
          </DialogTitle>
          <DialogDescription>변경 사항은 이 브라우저의 LocalStorage에 저장됩니다.</DialogDescription>
        </DialogHeader>

        {/* Tab Selection */}
        <div className="flex bg-[#60619c] p-1 gap-1 border-b border-[#3d4f97]">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('profile')}
            className={cn(
              'flex-1 rounded-none font-bold uppercase tracking-wider',
              activeTab === 'profile' ? TAB_ACTIVE : TAB_INACTIVE
            )}
          >
            <User size={12} />
            <span>프로필 설정</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('links')}
            className={cn(
              'flex-1 rounded-none font-bold uppercase tracking-wider',
              activeTab === 'links' ? TAB_ACTIVE : TAB_INACTIVE
            )}
          >
            <LinkIcon size={12} />
            <span>링크 관리 ({links.length})</span>
          </Button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col text-xs font-sans">
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {activeTab === 'profile' ? (
              <Card variant="platinum" className="p-3.5 flex flex-col gap-3 hover:translate-y-0 hover:shadow-xs">
                <div>
                  <label htmlFor="edit-name" className="block font-bold text-[#21242e] mb-1">
                    표시 이름 (최대 30자) *
                  </label>
                  <Input
                    id="edit-name"
                    type="text"
                    maxLength={30}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="예: 김민준 · UX Designer"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="edit-bio" className="font-bold text-[#21242e] mb-1 flex items-center justify-between">
                    <span>소개 문구 (Bio)</span>
                    <span className="text-[10px] text-[#60619c] font-normal">
                      {bio.length} / 100자
                    </span>
                  </label>
                  <Textarea
                    id="edit-bio"
                    maxLength={100}
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="자기소개 또는 한 줄 슬로건을 입력해주세요."
                  />
                </div>

                <div>
                  <label htmlFor="edit-avatar" className="block font-bold text-[#21242e] mb-1">
                    프로필 사진 이미지 URL
                  </label>
                  <Input
                    id="edit-avatar"
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                  />
                  <p className="text-[10px] text-[#60619c] mt-1">
                    웹 이미지 주소를 입력하거나 비워두면 이름 첫 글자 이니셜이 표시됩니다.
                  </p>
                </div>
              </Card>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between px-1">
                  <span className="font-bold text-[#21242e] text-xs">
                    등록된 링크 목록 ({links.length}/20)
                  </span>
                  <Button variant="amber" size="sm" onClick={handleAddLink}>
                    <Plus size={12} />
                    <span>링크 추가</span>
                  </Button>
                </div>

                {links.length === 0 ? (
                  <Card variant="inset" className="p-6 text-center text-[#60619c]">
                    링크가 없습니다. 위의 [링크 추가]를 눌러 새 링크를 등록해보세요.
                  </Card>
                ) : (
                  <div className="flex flex-col gap-2">
                    {links.map((link, idx) => (
                      <Card
                        key={link.id}
                        variant="platinum"
                        className="p-2.5 flex flex-col gap-1.5 hover:translate-y-0 hover:shadow-xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="indigo">#{idx + 1}</Badge>
                          <Input
                            type="text"
                            maxLength={50}
                            value={link.title}
                            onChange={(e) => handleUpdateLink(link.id, 'title', e.target.value)}
                            placeholder="링크 제목 (예: 포트폴리오)"
                            className="flex-1 h-7 font-bold"
                            required
                          />
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleRemoveLink(link.id)}
                            className="text-[#e60012] hover:bg-red-50 hover:text-[#e60012] rounded-xs"
                            title="링크 삭제"
                            aria-label="링크 삭제"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>

                        <div className="flex flex-col gap-1 pl-6">
                          <Input
                            type="text"
                            value={link.url}
                            onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)}
                            placeholder="https://example.com"
                            className="h-7 text-[11px] font-mono"
                            required
                          />
                          <Input
                            type="text"
                            value={link.description || ''}
                            onChange={(e) => handleUpdateLink(link.id, 'description', e.target.value)}
                            placeholder="한 줄 설명 (선택)"
                            className="h-6 text-[10px] text-[#60619c]"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <DialogFooter className="items-center sm:justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetToDefault}
              className="text-[#21242e] hover:bg-transparent hover:text-[#3d4f97] font-bold"
              title="초기 더미데이터로 되돌리기"
            >
              <RotateCcw size={11} />
              <span>초기 데이터 복원</span>
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="carbon" onClick={onClose} className="active:scale-95">
                취소
              </Button>
              <Button type="submit" variant="signal" className="px-4 active:scale-95">
                <Check size={13} strokeWidth={3} />
                <span>저장하기 ▶</span>
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
