'use client';

import React from 'react';

interface HeroPanelProps {
  onExploreClick: () => void;
}

export default function HeroPanel({ onExploreClick }: HeroPanelProps) {
  return (
    <div className="w-full mb-3 select-none">
      <div className="nin-plate p-1">
        {/* Inner Hero Beveled Frame with Chamfered Corners */}
        <div className="relative bg-gradient-to-r from-[#8ba1d4] via-[#acace7] to-[#9fbee7] border-2 border-[#3d4f97] p-5 sm:p-7 overflow-hidden chamfer-lg">
          {/* Subtle Circuit/Matrix Background Lines */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(#3d4f97 1px, transparent 1px), linear-gradient(90deg, #3d4f97 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Left Hero Content */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-block bg-[#3d4f97] text-[#ffffff] text-[9px] font-bold uppercase tracking-[1px] px-2 py-0.5 border border-[#ffffff] mb-1">
                SYSTEM RELEASE • 32-BIT POWER
              </div>
              
              {/* Display Box-Art Wordmark */}
              <h1 className="box-art-title text-3xl sm:text-4xl lg:text-5xl uppercase leading-none">
                MYLINK ADVANCE
              </h1>

              {/* Tagline */}
              <p className="text-[13px] sm:text-[14px] font-bold text-[#21242e] max-w-md leading-snug">
                Gorgeous graphics, instant discovery, and a portable catalog of the web's best resources.
              </p>

              {/* Badges Row */}
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                <span className="bg-[#ecab37] text-[#21242e] text-[9px] font-bold px-2 py-0.5 border border-[#3d4f97] uppercase">
                  OFFICIAL SEAL OF QUALITY
                </span>
                <span className="bg-[#21242e] text-[#ffffff] text-[9px] font-bold px-2 py-0.5 border border-[#ffffff] uppercase">
                  HARDWARE ACCELERATED
                </span>
              </div>
            </div>

            {/* Right: Round Forward Button & Hardware Console Graphic */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              {/* Retro Console / Cartridge Badge Graphic */}
              <div className="w-24 h-16 bg-[#21242e] border-2 border-[#ffffff] shadow-[3px_3px_0_0_#3d4f97] flex flex-col items-center justify-center p-1 relative">
                <div className="w-full h-2 bg-[#e60012] mb-1"></div>
                <span className="text-[#ffffff] text-[9px] font-black tracking-widest uppercase">
                  GAME BOY
                </span>
                <span className="text-[#9fbee7] text-[7px] font-bold tracking-wider">
                  ADVANCE
                </span>
              </div>

              {/* Button-Icon-Arrow (22px Signal Orange disc with white chevron) */}
              <button
                type="button"
                onClick={onExploreClick}
                className="group flex items-center gap-2 bg-[#21242e] border border-[#ffffff] px-3 py-1 shadow-[2px_2px_0_0_#3d4f97] hover:bg-[#3d4f97] transition-all cursor-pointer"
              >
                <span className="text-[11px] font-bold text-[#ffffff] uppercase tracking-[0.5px]">
                  ENTER VAULT
                </span>
                <div className="w-[20px] h-[20px] bg-[#f68d1f] rounded-full flex items-center justify-center border border-[#ffffff] group-hover:scale-110 transition-transform">
                  <span className="text-white text-[10px] font-black leading-none pl-0.5">▶</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
