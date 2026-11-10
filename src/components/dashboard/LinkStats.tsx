import React from 'react';
import type { LinkDoc } from '@/types/mylink';
import { Card } from '@/components/ui/card';
import SectionPanel from './SectionPanel';

/** 마이페이지 통계 섹션 (13주차): 총 클릭수 + 링크별 클릭수(많은 순) */
export default function LinkStats({ links }: { links: LinkDoc[] }) {
  const total = links.reduce((sum, l) => sum + l.clickCount, 0);
  const ranked = [...links].sort((a, b) => b.clickCount - a.clickCount);
  const max = ranked[0]?.clickCount || 1;

  return (
    <SectionPanel label="클릭 통계 (STATS)">
      {/* 총 클릭수 */}
      <Card variant="inset" className="p-3 mb-3 flex items-baseline justify-center gap-2">
        <span className="text-[11px] font-bold text-[#60619c] uppercase tracking-wider">총</span>
        <span className="text-3xl font-black italic text-[#f68d1f] [text-shadow:2px_2px_0px_#21242e] tabular-nums">
          {total.toLocaleString()}
        </span>
        <span className="text-[11px] font-bold text-[#60619c] uppercase tracking-wider">클릭</span>
      </Card>

      {/* 링크별 클릭수 */}
      {ranked.length === 0 ? (
        <p className="text-xs text-center text-[#21242e] py-2">링크를 추가하면 클릭 통계가 여기에 표시됩니다.</p>
      ) : (
        <ol className="flex flex-col gap-2">
          {ranked.map((link, idx) => (
            <li key={link.id} className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-bold text-[#21242e] truncate">
                  <span className="text-[#f68d1f] mr-1">{idx + 1}.</span>
                  {link.title}
                </span>
                <span className="shrink-0 font-bold text-[#21242e] tabular-nums">
                  {link.clickCount.toLocaleString()} 클릭
                </span>
              </div>
              {/* 진행 바 */}
              <div
                className="h-2.5 bg-white border-t border-l border-t-[#3d4f97] border-l-[#3d4f97] border-b border-r border-b-white border-r-white"
                role="progressbar"
                aria-label={`${link.title} 클릭 비율`}
                aria-valuenow={link.clickCount}
                aria-valuemax={max}
              >
                <div
                  className="h-full bg-[#ecab37] transition-[width] duration-500"
                  style={{ width: `${(link.clickCount / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ol>
      )}
    </SectionPanel>
  );
}
