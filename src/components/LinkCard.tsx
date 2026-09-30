'use client';

import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Heart, Trash2, Tag } from 'lucide-react';
import { LinkItem } from '@/types/link';

interface LinkCardProps {
  item: LinkItem;
  onLike: (id: string) => void;
  onClickCount: (id: string) => void;
  onDelete: (id: string) => void;
  onCopySuccess: () => void;
}

export default function LinkCard({
  item,
  onLike,
  onClickCount,
  onDelete,
  onCopySuccess,
}: LinkCardProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const getDomain = (urlStr: string) => {
    try {
      const u = new URL(urlStr.startsWith('http') ? urlStr : `https://${urlStr}`);
      return u.hostname.replace('www.', '');
    } catch {
      return urlStr;
    }
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.url);
      setCopied(true);
      onCopySuccess();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      onCopySuccess();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    onLike(item.id);
  };

  const handleOpen = () => {
    onClickCount(item.id);
    const targetUrl = item.url.startsWith('http') ? item.url : `https://${item.url}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const categoryLabels: Record<string, { label: string; bg: string }> = {
    all: { label: '전체', bg: '#FFFFFF' },
    dev: { label: '💻 개발', bg: '#A6FF96' },
    design: { label: '🎨 디자인', bg: '#70D6FF' },
    tools: { label: '🛠️ 툴', bg: '#FF90E8' },
    star: { label: '⭐ 즐겨찾기', bg: '#FFE600' },
  };

  const categoryMeta = categoryLabels[item.category] || { label: item.category, bg: '#FFFFFF' };

  return (
    <div
      onClick={handleOpen}
      style={{ backgroundColor: item.bgColor }}
      className="neo-card p-5 relative flex flex-col justify-between cursor-pointer group select-none"
    >
      {/* Featured Ribbon */}
      {item.isFeatured && (
        <div className="absolute -top-3 -right-2 bg-black text-[#FFE600] border-2 border-black font-black text-[11px] px-2.5 py-0.5 shadow-[2px_2px_0_0_#FFE600] rotate-3 z-10">
          RECOMMENDED ★
        </div>
      )}

      {/* Top Header: Emoji + Title + Category */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white border-2 border-black neo-shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              {item.emoji}
            </div>
            <div>
              <h3 className="font-black text-xl text-black leading-tight group-hover:underline decoration-2">
                {item.title}
              </h3>
              <span className="text-xs font-bold text-zinc-700 bg-white/70 px-2 py-0.5 border border-black inline-block mt-0.5">
                {getDomain(item.url)}
              </span>
            </div>
          </div>

          <div
            style={{ backgroundColor: categoryMeta.bg }}
            className="border-2 border-black px-2.5 py-0.5 text-xs font-black neo-shadow-sm shrink-0"
          >
            {categoryMeta.label}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm font-medium text-zinc-900 line-clamp-2 my-2 bg-white/50 p-2 border border-black/30">
          {item.description}
        </p>
      </div>

      {/* Bottom Action Footer */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-4 pt-3 border-t-2 border-black/30 flex items-center justify-between gap-2"
      >
        {/* Left: Like & Clicks */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            className={`neo-btn flex items-center gap-1.5 px-2.5 py-1 text-xs ${
              liked ? 'bg-[#FF6584] text-white' : 'bg-white text-black'
            }`}
            title="좋아요"
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-white' : 'fill-none'}`} />
            <span>{item.likes}</span>
          </button>

          <span className="text-xs font-black text-zinc-700 bg-black/10 px-2 py-1 border border-black">
            {item.clicks} views
          </span>
        </div>

        {/* Right: Actions (Copy, Visit, Delete) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="neo-btn bg-white p-1.5 text-black hover:bg-zinc-100"
            title="링크 복사"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-600 stroke-[3]" />
            ) : (
              <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
            )}
          </button>

          <button
            onClick={handleOpen}
            className="neo-btn bg-black text-white p-1.5 hover:bg-zinc-800"
            title="바로가기"
          >
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`'${item.title}' 링크를 삭제하시겠습니까?`)) {
                onDelete(item.id);
              }
            }}
            className="neo-btn bg-[#FF6584] text-white p-1.5 hover:bg-red-600"
            title="삭제"
          >
            <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
