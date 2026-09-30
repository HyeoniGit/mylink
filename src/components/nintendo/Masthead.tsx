'use client';

import React from 'react';

interface MastheadProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

export default function Masthead({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: MastheadProps) {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between pb-2 pt-3 px-2 sm:px-4">
      {/* Mario Mascot & Speech Bubble */}
      <div className="flex items-center gap-3 select-none mb-2 sm:mb-0">
        {/* Pixel / Retro Mario Mascot Avatar */}
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 bg-[#e60012] border-2 border-[#ffffff] shadow-[2px_2px_0_0_#3d4f97] flex items-center justify-center text-2xl font-black text-white">
            M
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#f68d1f] border border-[#ffffff] text-[8px] font-bold text-white flex items-center justify-center">
            ★
          </div>
        </div>

        {/* Speech Bubble */}
        <div className="relative bg-[#ffffff] border border-[#3d4f97] text-[#21242e] text-[11px] font-bold px-3 py-1.5 shadow-[1px_1px_0_0_#3d4f97] rounded-[10px]">
          <span className="text-[#e60012] mr-1">"</span>
          Welcome to Nintendo.com!
          <span className="text-[#e60012] ml-1">"</span>
          {/* Speech bubble tail pointer */}
          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-[#ffffff]"></div>
        </div>
      </div>

      {/* Search Module (Input + Category Select + Amber GO Chip) */}
      <div className="flex items-center gap-1.5 bg-[#7a8aba] p-1 border-t border-l border-[#ffffff] border-b border-r border-[#3d4f97]">
        <label className="text-[10px] font-bold text-[#ffffff] uppercase tracking-wider hidden md:inline">
          SEARCH:
        </label>
        
        {/* Search Field */}
        <input
          type="text"
          placeholder="Keywords..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-[21px] w-28 sm:w-36 bg-[#ffffff] border border-[#3d4f97] px-1.5 text-[11px] font-sans text-[#21242e] focus:outline-none"
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="h-[21px] bg-[#ffffff] border border-[#3d4f97] px-1 text-[10px] font-bold uppercase text-[#21242e] focus:outline-none cursor-pointer"
        >
          <option value="all">ALL CATEGORIES</option>
          <option value="dev">SYSTEMS / DEV</option>
          <option value="design">GRAPHICS / ART</option>
          <option value="tools">CODE & TOOLS</option>
          <option value="star">FAVORITES ★</option>
        </select>

        {/* Amber [GO] Chip */}
        <button
          type="button"
          className="nin-btn-amber h-[21px] px-2.5 text-[10px] flex items-center justify-center"
        >
          GO
        </button>
      </div>
    </div>
  );
}
