'use client';

import React, { useState } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DeleteLinkDialogProps {
  /** 삭제할 링크 이름. null 이면 닫힘 */
  linkTitle: string | null;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

/** 삭제 확인 모달: 항목 이름 표시 + 경고 + [취소] [삭제하기] */
export default function DeleteLinkDialog({ linkTitle, deleting, onCancel, onConfirm }: DeleteLinkDialogProps) {
  // 닫힘 애니메이션 동안 제목이 비지 않도록 마지막 값을 유지
  const [shownTitle, setShownTitle] = useState(linkTitle);
  if (linkTitle !== null && linkTitle !== shownTitle) setShownTitle(linkTitle);

  return (
    <Dialog open={linkTitle !== null} onOpenChange={(open) => !open && !deleting && onCancel()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="px-3 py-2 border-b-2 border-[#3d4f97] text-white bg-[#21242e] bg-[radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:3px_3px]">
          <DialogTitle className="text-sm">정말 삭제하시겠습니까?</DialogTitle>
        </DialogHeader>

        <div className="p-4 flex flex-col gap-2 text-xs">
          <DialogDescription className="text-[#21242e] text-xs">
            <b className="text-sm">&quot;{shownTitle}&quot;</b> 링크가 삭제됩니다.
          </DialogDescription>
          <p className="flex items-center gap-1.5 font-bold text-[#e60012]">
            <AlertTriangle size={14} />
            이 작업은 되돌릴 수 없습니다.
          </p>
        </div>

        <DialogFooter>
          <Button variant="carbon" onClick={onCancel} disabled={deleting}>
            취소
          </Button>
          <Button
            onClick={onConfirm}
            disabled={deleting}
            className="bg-[#e60012] text-white font-bold border-t-2 border-l border-b-2 border-r-2 border-t-[#ff6b6b] border-l-[#ff6b6b] border-b-[#8a000b] border-r-[#8a000b] rounded-xs hover:bg-[#ff1a2b]"
          >
            <Trash2 size={13} />
            <span>{deleting ? '삭제 중...' : '삭제하기'}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
