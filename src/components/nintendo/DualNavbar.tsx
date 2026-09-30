'use client';

import React from 'react';

interface DualNavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAddModal: () => void;
}

export default function DualNavbar({ activeTab, onSelectTab, onOpenAddModal }: DualNavbarProps) {
  const primaryNavItems = [
    { id: 'all', label: 'LINKS' },
    { id: 'dev', label: 'SYSTEMS' },
    { id: 'design', label: 'GAMES' },
    { id: 'tools', label: 'NEWS' },
    { id: 'star', label: 'NSIDER' },
  ];

  const secondaryNavLinks = [
    'Parents',
    'Customer Service',
    'Corporate',
    'Global',
    'Privacy',
    'Store',
    'Contact',
  ];

  return (
    <div className="w-full select-none">
      {/* Primary Navigation Bar (Carbon Navy with Halftone Dot-Matrix Texture) */}
      <div className="carbon-halftone h-[32px] px-3 flex items-center justify-between border-t border-l border-[#4a5166] border-b-2 border-r-2 border-[#0e1014]">
        {/* Left: Nintendo Racetrack Logo Pill */}
        <div className="flex items-center gap-3">
          <div className="bg-[#ffffff] border border-[#3d4f97] rounded-full px-2.5 py-0.5 flex items-center justify-center shadow-[1px_1px_0_0_#000]">
            <span className="text-[#e60012] font-black text-[13px] tracking-tighter uppercase font-sans">
              Nintendo<span className="text-[9px] align-super">®</span>
            </span>
          </div>

          {/* Primary Nav Menu Words (Nav Gold #e48600, 13px Bold Uppercase) */}
          <nav className="hidden sm:flex items-center space-x-4 pl-1">
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`text-[13px] font-bold uppercase tracking-[0.5px] transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'text-[#ffffff] underline decoration-[#f68d1f] decoration-2 underline-offset-4'
                    : 'text-[#e48600] hover:text-[#ffffff]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: Amber Utility Chips */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenAddModal}
            className="nin-btn-amber text-[10px] px-2 py-0.5 shadow-[1px_1px_0_0_#000]"
          >
            + ADD LINK
          </button>
          <button
            type="button"
            className="nin-btn-amber text-[10px] px-2 py-0.5 shadow-[1px_1px_0_0_#000] hidden md:inline-block"
          >
            CODE BANK
          </button>
          <button
            type="button"
            className="nin-btn-amber text-[10px] px-2 py-0.5 shadow-[1px_1px_0_0_#000] hidden sm:inline-block"
          >
            LINK FINDER
          </button>
        </div>
      </div>

      {/* Secondary Navigation Strip (Pale Sky #9fbee7) */}
      <div className="bg-[#9fbee7] h-[22px] px-3 flex items-center justify-between border-t border-[#ffffff] border-b border-[#3d4f97] text-[10px] sm:text-[11px] font-bold text-[#21242e] tracking-[0.3px]">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {secondaryNavLinks.map((link, idx) => (
            <React.Fragment key={link}>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="hover:text-[#3d4f97] hover:underline whitespace-nowrap cursor-pointer"
              >
                {link}
              </a>
              {idx < secondaryNavLinks.length - 1 && (
                <span className="text-[#3d4f97]/60">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="hidden lg:block text-[9px] text-[#3d4f97] uppercase font-bold">
          CONSOLE EDITION 2001
        </div>
      </div>
    </div>
  );
}
