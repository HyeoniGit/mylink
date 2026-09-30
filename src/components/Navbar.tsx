'use client';

import React, { useState } from 'react';
import { Share2, Check, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFE600] border-b-4 border-black px-4 sm:px-8 py-3.5 shadow-[0_4px_0_0_#000]">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-black text-[#FFE600] flex items-center justify-center font-black text-xl border-2 border-black shadow-[2px_2px_0_0_#fff]">
            ⚡
          </div>
          <div>
            <span className="font-black text-2xl tracking-tighter text-black uppercase">
              MYLINK
            </span>
            <span className="ml-2 hidden sm:inline-block text-xs font-black bg-black text-white px-2 py-0.5 uppercase tracking-wider rotate-[-2deg]">
              v2.0 NEO
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="neo-btn flex items-center gap-2 bg-white text-black px-3.5 py-1.5 text-sm hover:bg-[#A6FF96]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>주소 복사됨!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">페이지 공유</span>
              </>
            )}
          </button>

          <div className="hidden md:flex items-center gap-1.5 bg-[#FF90E8] border-2 border-black px-3 py-1 font-bold text-xs shadow-[2px_2px_0_0_#000]">
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            <span>NEOBRUTALISM EDITION</span>
          </div>
        </div>
      </div>
    </header>
  );
}
