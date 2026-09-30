'use client';

import React from 'react';

interface RightActionRailProps {
  onOpenAddModal: () => void;
  onResetData: () => void;
  totalLinks: number;
}

export default function RightActionRail({
  onOpenAddModal,
  onResetData,
  totalLinks,
}: RightActionRailProps) {
  return (
    <div className="w-full lg:w-[220px] space-y-3 shrink-0">
      {/* 1. Carbon-Navy Action Buttons Stack */}
      <div className="space-y-1.5 select-none">
        <button
          type="button"
          onClick={onOpenAddModal}
          className="nin-btn-carbon w-full py-2 px-3 text-[11px] flex items-center justify-between group cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-[#f68d1f]">✚</span>
            <span>ADD NEW LINK</span>
          </span>
          <span className="text-[#f68d1f] text-[10px] group-hover:translate-x-0.5 transition-transform">
            ▶
          </span>
        </button>

        <button
          type="button"
          onClick={() => alert('Nintendo Member Log In (2001 Archive System)')}
          className="nin-btn-carbon w-full py-2 px-3 text-[11px] flex items-center justify-between group cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-[#9fbee7]">■</span>
            <span>MY ACCOUNT / LOGIN</span>
          </span>
          <span className="text-[#9fbee7] text-[10px] group-hover:translate-x-0.5 transition-transform">
            ▶
          </span>
        </button>

        <button
          type="button"
          onClick={() => alert('Subscribed to Nintendo Power / MyLink Weekly Bulletin!')}
          className="nin-btn-carbon w-full py-2 px-3 text-[11px] flex items-center justify-between group cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-[#ecab37]">★</span>
            <span>FREE NEWSLETTER</span>
          </span>
          <span className="text-[#ecab37] text-[10px] group-hover:translate-x-0.5 transition-transform">
            ▶
          </span>
        </button>

        <button
          type="button"
          onClick={() => alert('Customer Service & Help Desk 24/7 Hotline: 1-800-255-3700')}
          className="nin-btn-carbon w-full py-2 px-3 text-[11px] flex items-center justify-between group cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-[#9fbee7]">?</span>
            <span>CUSTOMER HELP</span>
          </span>
          <span className="text-[#9fbee7] text-[10px] group-hover:translate-x-0.5 transition-transform">
            ▶
          </span>
        </button>
      </div>

      {/* 2. Info Box ("What Is — Link Finder" with Amber Tab) */}
      <div className="nin-plate p-1">
        <div className="bg-[#ffffff] border border-[#3d4f97] p-3 space-y-2">
          {/* Amber Header Tab */}
          <div className="bg-[#ecab37] text-[#21242e] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 border border-[#3d4f97] inline-block">
            WHAT IS — LINK FINDER
          </div>
          <p className="text-[11px] text-[#21242e] leading-snug font-sans">
            MyLink 2001 lets you curate web resources directly into your console chassis. Filter by system category or submit new cartridges to the vault.
          </p>
          <div className="nin-dotted-divider pt-1"></div>
          <div className="flex items-center justify-between text-[10px] text-[#60619c]">
            <span className="font-bold">INDEXED: {totalLinks} ITEMS</span>
            <button
              type="button"
              onClick={onResetData}
              className="text-[#e60012] underline hover:text-[#21242e] font-bold cursor-pointer"
            >
              Reset Vault
            </button>
          </div>
        </div>
      </div>

      {/* 3. Promo Card (Pale Lavender with Outlined Product Wordmark) */}
      <div className="nin-plate p-1">
        <div className="bg-[#acace7] border border-[#3d4f97] p-3 text-center space-y-2 relative overflow-hidden">
          <div className="text-[9px] font-bold tracking-widest text-[#3d4f97] uppercase">
            NOW AVAILABLE
          </div>
          <div className="box-art-title text-xl tracking-tight text-white uppercase leading-none">
            GAME BOY<br />ADVANCE
          </div>
          <p className="text-[11px] font-bold text-[#21242e]">
            Life's an adventure. Take it with you!
          </p>
          <div className="pt-1">
            <span className="bg-[#f68d1f] text-white text-[10px] font-bold px-2 py-0.5 border border-white uppercase shadow-[1px_1px_0_0_#3d4f97]">
              PLAY IT LOUD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
