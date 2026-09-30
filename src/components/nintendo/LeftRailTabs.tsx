'use client';

import React from 'react';

interface LeftRailTabsProps {
  onSelectSort: (sort: string) => void;
  activeSort: string;
}

export default function LeftRailTabs({ onSelectSort, activeSort }: LeftRailTabsProps) {
  const tabs = [
    { id: 'default', label: 'TOP TEN' },
    { id: 'clicks', label: 'TOP CLICKS' },
    { id: 'likes', label: "PLAYER'S CHOICE" },
    { id: 'esrb', label: 'ESRB RATINGS' },
  ];

  return (
    <aside className="hidden lg:flex flex-col gap-1 w-[26px] select-none shrink-0 pt-2">
      {tabs.map((tab) => {
        const isActive = activeSort === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectSort(tab.id)}
            className={`carbon-halftone w-[26px] py-3 flex items-center justify-center border-l-2 border-t border-b border-[#4a5166] border-r-2 ${
              isActive ? 'border-r-[#f68d1f] bg-[#3d4f97]' : 'border-r-[#0e1014]'
            } transition-all cursor-pointer group`}
            title={tab.label}
          >
            <span
              className={`text-[9px] font-bold tracking-[1px] whitespace-nowrap rotate-[-90deg] uppercase ${
                isActive ? 'text-[#ffffff]' : 'text-[#9fbee7] group-hover:text-[#ffffff]'
              }`}
              style={{ writingMode: 'vertical-rl' }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
