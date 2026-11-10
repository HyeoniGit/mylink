'use client';

import React, { useState } from 'react';
import { Check, ExternalLink, Pencil, Trash2, X } from 'lucide-react';
import type { LinkDoc, LinkInput } from '@/types/mylink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { normalizeUrl } from '@/lib/firebase/links';

interface LinkRowProps {
  index: number;
  link: LinkDoc;
  onSave: (input: LinkInput) => Promise<void>;
  onRequestDelete: () => void;
}

/** 링크 한 줄: [일반 모드] ↔ [편집 모드] 인라인 편집 */
export default function LinkRow({ index, link, onSave, onRequestDelete }: LinkRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<LinkInput>({ title: link.title, url: link.url, description: link.description ?? '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEdit = () => {
    setDraft({ title: link.title, url: link.url, description: link.description ?? '' });
    setError(null);
    setIsEditing(true);
  };

  // 취소: 원래 값 복구 + 편집 모드 해제
  const cancelEdit = () => {
    setDraft({ title: link.title, url: link.url, description: link.description ?? '' });
    setError(null);
    setIsEditing(false);
  };

  // 저장: 빈 칸 검증 → updateDoc → 편집 모드 해제
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.url.trim()) {
      setError('제목과 URL 을 모두 입력해주세요.');
      return;
    }
    setSaving(true);
    try {
      await onSave({
        title: draft.title.trim(),
        url: normalizeUrl(draft.url),
        description: draft.description?.trim() ?? '',
      });
      setIsEditing(false);
    } catch {
      setError('수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSaving(false);
    }
  };

  if (isEditing) {
    return (
      <Card variant="platinum" className="p-2.5 hover:translate-y-0 hover:shadow-xs ring-2 ring-[#ecab37]">
        <form onSubmit={handleSave} className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="amber">편집 중</Badge>
            <Input
              aria-label="링크 제목"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              maxLength={50}
              placeholder="링크 제목"
              className="flex-1 h-7 font-bold"
              autoFocus
            />
          </div>
          <Input
            aria-label="링크 URL"
            value={draft.url}
            onChange={(e) => setDraft({ ...draft, url: e.target.value })}
            placeholder="https://example.com"
            className="h-7 text-[11px] font-mono"
          />
          <Input
            aria-label="한 줄 설명"
            value={draft.description ?? ''}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            maxLength={80}
            placeholder="한 줄 설명 (선택)"
            className="h-6 text-[10px]"
          />
          {error && <p role="alert" className="text-[10px] font-bold text-[#e60012]">{error}</p>}
          <div className="flex justify-end gap-1.5 mt-0.5">
            <Button variant="carbon" size="xs" onClick={cancelEdit} disabled={saving}>
              <X size={11} />
              <span>취소</span>
            </Button>
            <Button type="submit" variant="signal" size="xs" disabled={saving}>
              <Check size={11} strokeWidth={3} />
              <span>{saving ? '저장 중...' : '저장'}</span>
            </Button>
          </div>
        </form>
      </Card>
    );
  }

  return (
    <Card variant="platinum" className="p-2.5 flex items-center gap-2 hover:translate-y-0">
      <Badge variant="indigo">#{index + 1}</Badge>
      <div className="flex-1 min-w-0">
        <a
          href={normalizeUrl(link.url)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-bold text-xs text-[#21242e] hover:text-[#3d4f97] truncate"
        >
          <span className="truncate">{link.title}</span>
          <ExternalLink size={10} className="shrink-0 text-[#60619c]" />
        </a>
        <p className="text-[10px] text-[#60619c] font-mono truncate">{link.url}</p>
        {link.description && <p className="text-[10px] text-[#60619c] truncate">{link.description}</p>}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <Badge variant="indigo" title="클릭 수">{link.clickCount} 클릭</Badge>
        <Button variant="amber" size="icon-sm" onClick={startEdit} aria-label={`${link.title} 수정`} title="수정">
          <Pencil size={11} />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onRequestDelete}
          aria-label={`${link.title} 삭제`}
          title="삭제"
          className="text-[#e60012] hover:bg-red-50 hover:text-[#e60012] rounded-xs"
        >
          <Trash2 size={13} />
        </Button>
      </div>
    </Card>
  );
}
