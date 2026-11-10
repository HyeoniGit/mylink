'use client';

import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import type { LinkDoc, LinkInput } from '@/types/mylink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createLink, deleteLink, normalizeUrl, subscribeLinks, updateLink } from '@/lib/firebase/links';
import SectionPanel from './SectionPanel';
import LinkRow from './LinkRow';
import DeleteLinkDialog from './DeleteLinkDialog';
import LinkStats from './LinkStats';

const MAX_LINKS = 20;
const EMPTY: LinkInput = { title: '', url: '', description: '' };

/** 내 링크 관리: Create / Read / Update / Delete (users/{userId}/links) + 클릭 통계 */
export default function LinkManager({ userId }: { userId: string }) {
  const [links, setLinks] = useState<LinkDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [draft, setDraft] = useState<LinkInput>(EMPTY);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const [pendingDelete, setPendingDelete] = useState<LinkDoc | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Read: Firestore 실시간 구독 → 추가/수정/삭제 시 목록 자동 갱신
  useEffect(() => {
    return subscribeLinks(
      userId,
      (next) => {
        setLinks(next);
        setLoading(false);
        setLoadError(null);
      },
      () => {
        setLoadError('링크를 불러오지 못했습니다. Firestore 설정을 확인해주세요.');
        setLoading(false);
      }
    );
  }, [userId]);

  // Create
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.url.trim()) {
      setAddError('제목과 URL 을 모두 입력해주세요.');
      return;
    }
    if (links.length >= MAX_LINKS) {
      setAddError(`링크는 최대 ${MAX_LINKS}개까지 등록할 수 있습니다.`);
      return;
    }
    setAdding(true);
    try {
      await createLink(userId, {
        title: draft.title.trim(),
        url: normalizeUrl(draft.url),
        description: draft.description?.trim() ?? '',
      });
      setDraft(EMPTY);
      setAddError(null);
    } catch {
      setAddError('추가에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setAdding(false);
    }
  };

  // Delete (모달에서 [삭제하기] 클릭 시)
  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteLink(userId, pendingDelete.id);
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <SectionPanel
        label="내 링크 관리 (LINKS)"
        aside={<Badge variant="indigo">{links.length}/{MAX_LINKS}</Badge>}
      >
        {/* 링크 추가 폼 */}
        <Card variant="inset" className="p-2.5 mb-3">
          <form onSubmit={handleAdd} className="flex flex-col gap-1.5">
            <Input
              aria-label="새 링크 제목"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              maxLength={50}
              placeholder="링크 제목 (예: 인스타그램)"
              className="font-bold"
            />
            <Input
              aria-label="새 링크 URL"
              value={draft.url}
              onChange={(e) => setDraft({ ...draft, url: e.target.value })}
              placeholder="instagram.com/myname"
              className="font-mono text-[11px]"
            />
            <div className="flex gap-1.5">
              <Input
                aria-label="새 링크 설명"
                value={draft.description ?? ''}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                maxLength={80}
                placeholder="한 줄 설명 (선택)"
                className="text-[11px]"
              />
              <Button type="submit" variant="amber" disabled={adding} className="shrink-0">
                <Plus size={12} />
                <span>{adding ? '추가 중' : '추가'}</span>
              </Button>
            </div>
            {addError && <p role="alert" className="text-[10px] font-bold text-[#e60012]">{addError}</p>}
          </form>
        </Card>

        {/* 링크 목록 */}
        <div className="flex flex-col gap-2">
          {loading ? (
            <p className="text-xs font-bold text-[#21242e] text-center py-4 animate-pulse">불러오는 중...</p>
          ) : loadError ? (
            <p role="alert" className="text-xs font-bold text-[#e60012] text-center py-4">{loadError}</p>
          ) : links.length === 0 ? (
            <Card variant="inset" className="p-5 text-center text-xs text-[#60619c]">
              아직 링크가 없습니다. 위에서 첫 링크를 추가해보세요!
            </Card>
          ) : (
            links.map((link, idx) => (
              <LinkRow
                key={link.id}
                index={idx}
                link={link}
                onSave={(input) => updateLink(userId, link.id, input)}
                onRequestDelete={() => setPendingDelete(link)}
              />
            ))
          )}
        </div>

        <DeleteLinkDialog
          linkTitle={pendingDelete?.title ?? null}
          deleting={deleting}
          onCancel={() => setPendingDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      </SectionPanel>

      {/* 링크 관리 영역 아래: 클릭 통계 */}
      {!loading && !loadError && <LinkStats links={links} />}
    </>
  );
}
