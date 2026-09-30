'use client';

import React from 'react';

export default function FooterBar() {
  return (
    <footer className="w-full mt-6 select-none">
      {/* Carbon Chamfered Slab Footer */}
      <div className="carbon-halftone border-t-2 border-l border-[#4a5166] border-b-2 border-r-2 border-[#0e1014] p-3 sm:p-4 chamfer-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {/* Copyright & Navigation */}
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[10px] text-[#9fbee7] font-bold uppercase tracking-wider">
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Privacy Policy</a>
              <span>|</span>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Terms of Use</a>
              <span>|</span>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Parents Guide</a>
              <span>|</span>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Contact Nintendo</a>
            </div>

            <p className="text-[10px] text-[#9fbee7]/80 font-sans leading-tight">
              TM, ® and the Nintendo logo are trademarks of Nintendo of America Inc. © 1997–2001 Nintendo. MyLink Console Hardware Edition.
            </p>
          </div>

          {/* Right: ESRB Privacy Certified Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-[#ecab37] border border-[#ffffff] px-2 py-1 text-center shadow-[1px_1px_0_0_#000]">
              <div className="text-[8px] font-black text-[#21242e] uppercase leading-none tracking-tight">
                PRIVACY CERTIFIED
              </div>
              <div className="text-[10px] font-black text-[#21242e] leading-none mt-0.5">
                ESRB
              </div>
            </div>

            <div className="bg-[#ffffff] border border-[#3d4f97] px-1.5 py-1 text-center">
              <span className="text-[10px] font-black text-[#21242e] uppercase">
                EVERYONE (E)
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
