'use client';

import React, { useState } from 'react';
import { LinkItem } from '@/types/link';

interface ContentColumnProps {
  links: LinkItem[];
  onOpenLink: (item: LinkItem) => void;
  onLikeLink: (id: string) => void;
  onDeleteLink: (id: string) => void;
}

export default function ContentColumn({
  links,
  onOpenLink,
  onLikeLink,
  onDeleteLink,
}: ContentColumnProps) {
  const [selectedPoll, setSelectedPoll] = useState('gba');
  const [pollVoted, setPollVoted] = useState(false);

  // Featured 2x2 sites
  const featuredSites = [
    { title: 'Pokemon.com', url: 'www.pokemon.com', color: '#ffb266', glyph: '⚡' },
    { title: 'Next.js Dev', url: 'nextjs.org', color: '#70D6FF', glyph: '▲' },
    { title: 'Game Boy Vault', url: 'gameboy.nintendo.com', color: '#acace7', glyph: '🎮' },
    { title: 'GitHub Hub', url: 'github.com', color: '#A6FF96', glyph: '🐙' },
  ];

  const handlePollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPollVoted(true);
  };

  return (
    <div className="flex-1 space-y-3">
      {/* 1. Official News / Links Module */}
      <div className="nin-plate p-1">
        {/* Section Label Bar */}
        <div className="bg-[#7a8aba] px-2 py-1 flex items-center justify-between border-b border-[#3d4f97] mb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[#3d4f97] text-[10px] font-black">≡</span>
            <span className="text-[11px] font-bold text-[#ffffff] uppercase tracking-[0.5px]">
              OFFICIAL HEADLINES & CURATED LINKS
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#ffffff]/80">
            TOTAL: {links.length}
          </span>
        </div>

        {/* Stacked Platinum List Rows */}
        <div className="space-y-1">
          {links.length > 0 ? (
            links.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenLink(item)}
                className="nin-plate-platinum p-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 hover:bg-[#e6ebf5] transition-colors cursor-pointer group"
              >
                {/* Left: Category Icon & Headline */}
                <div className="flex items-start sm:items-center gap-2 flex-1 min-w-0">
                  {/* Category Stamp */}
                  <span className="bg-[#3d4f97] text-[#ffffff] text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider shrink-0 mt-0.5 sm:mt-0">
                    {item.category}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-bold text-[#3d4f97] group-hover:text-[#e60012] group-hover:underline truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-[#60619c] font-normal hidden md:inline">
                        ({item.url.replace(/^https?:\/\//, '').split('/')[0]})
                      </span>
                    </div>
                    <p className="text-[11px] text-[#21242e] line-clamp-1 font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right: Stats & Orange Chevron Chip */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 shrink-0 self-end sm:self-auto"
                >
                  <button
                    type="button"
                    onClick={() => onLikeLink(item.id)}
                    className="text-[10px] font-bold text-[#e60012] hover:bg-[#ffffff] px-1.5 py-0.5 border border-[#3d4f97]/40 flex items-center gap-1 cursor-pointer"
                    title="Like / Star"
                  >
                    ★ <span>{item.likes}</span>
                  </button>

                  <span className="text-[10px] text-[#60619c] font-bold">
                    {item.clicks} hits
                  </span>

                  {/* Button-Arrow-Chip (18px Signal Orange chip with white forward chevron) */}
                  <button
                    type="button"
                    onClick={() => onOpenLink(item)}
                    className="w-[18px] h-[18px] bg-[#f68d1f] border border-[#ffffff] flex items-center justify-center text-white text-[9px] font-black group-hover:bg-[#e48600] cursor-pointer"
                    title="Read / Visit"
                  >
                    ▶
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 bg-[#ffffff] border border-[#3d4f97] text-center text-[12px] text-[#21242e]">
              No links matched your search filter.
            </div>
          )}
        </div>
      </div>

      {/* 2. Featured Sites 2x2 Grid */}
      <div className="nin-plate p-1">
        <div className="bg-[#7a8aba] px-2 py-1 flex items-center justify-between border-b border-[#3d4f97] mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[#3d4f97] text-[10px] font-black">≡</span>
            <span className="text-[11px] font-bold text-[#ffffff] uppercase tracking-[0.5px]">
              FEATURED SITES & NETWORKS
            </span>
          </div>
          <span className="text-[9px] text-[#ecab37] font-bold uppercase">
            CERTIFIED PORTALS
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {featuredSites.map((site) => (
            <div
              key={site.title}
              className="bg-[#21242e] border-2 border-[#3d4f97] p-1.5 flex flex-col justify-between h-[78px] hover:border-[#ffffff] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{site.glyph}</span>
                <span className="text-[8px] font-black text-[#ecab37] uppercase">
                  ACTIVE
                </span>
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#ffffff] group-hover:text-[#f68d1f] truncate">
                  {site.title}
                </div>
                <div className="text-[9px] text-[#9fbee7] font-mono truncate">
                  {site.url}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Player's Poll Module (Raised Periwinkle Plate) */}
      <div className="nin-plate-periwinkle p-3 border-2 border-[#3d4f97]">
        <div className="flex items-center justify-between border-b border-[#3d4f97] pb-1.5 mb-2">
          <span className="text-[11px] font-black uppercase text-[#21242e] tracking-[0.5px]">
            ≡ PLAYER'S POLL: CONSOLE GENERATION
          </span>
          <span className="bg-[#ecab37] text-[#21242e] text-[9px] font-bold px-1.5 py-0.2 border border-[#3d4f97] uppercase">
            WEEKLY
          </span>
        </div>

        <form onSubmit={handlePollSubmit} className="space-y-2">
          <p className="text-[12px] font-bold text-[#21242e]">
            Which platform is your primary workstation in 2001?
          </p>

          <div className="space-y-1.5 pl-1">
            {[
              { id: 'gba', label: 'Game Boy Advance (32-bit Portable Power)' },
              { id: 'n64', label: 'Nintendo 64 (3D Cartridge Classic)' },
              { id: 'gc', label: 'Nintendo GameCube (Next-Gen Optical)' },
              { id: 'web', label: 'Web Workstation / Next.js Terminal' },
            ].map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-2 text-[11px] font-sans text-[#21242e] cursor-pointer"
              >
                <input
                  type="radio"
                  name="platformPoll"
                  value={opt.id}
                  checked={selectedPoll === opt.id}
                  onChange={(e) => setSelectedPoll(e.target.value)}
                  className="w-3.5 h-3.5 accent-[#f68d1f] cursor-pointer"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              className="nin-btn-signal px-3 py-1 text-[11px] flex items-center gap-1.5"
            >
              <span>SUBMIT VOTE</span>
              <span className="text-[10px]">▶</span>
            </button>
            {pollVoted && (
              <span className="text-[11px] font-bold text-[#3d4f97]">
                ✓ Your vote has been tallied!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
