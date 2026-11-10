import React from 'react';
import { Card } from '@/components/ui/card';

/** 실크스크린 라벨 바가 달린 챔퍼드 패널 */
export default function SectionPanel({
  label,
  aside,
  children,
}: {
  label: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card variant="chamfered" className="w-full p-3 sm:p-4">
      <div className="w-full bg-[#7a8aba] border-t border-white/60 border-b border-[#3d4f97] px-2.5 py-1 mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[#21242e]">
          <span className="text-[10px] text-[#f68d1f]">▶</span>
          <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
        </div>
        {aside}
      </div>
      {children}
    </Card>
  );
}
