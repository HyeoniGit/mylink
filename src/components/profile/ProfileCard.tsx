'use client';

import React from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import type { LinkDoc, ProfileDoc } from '@/types/mylink';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, cardVariants } from '@/components/ui/card';
import { incrementClick, normalizeUrl } from '@/lib/firebase/links';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  userId: string;
  profile: ProfileDoc;
  links: LinkDoc[];
}

/** 방문자가 보는 공개 프로필 카드 (/[username]) */
export default function ProfileCard({ userId, profile, links }: ProfileCardProps) {
  // 클릭 감지 → 서버에 +1 요청. 링크는 <a target="_blank"> 로 그대로 새 탭에서 열림
  const handleClick = (linkId: string) => {
    incrementClick(userId, linkId).catch((e) => console.error('클릭 수 저장 실패:', e));
  };

  const initialChar = profile.displayName ? profile.displayName.trim().charAt(0) : 'M';

  return (
    <div className="w-full flex flex-col items-center">
      {/* 45deg Chamfered Profile Panel with Metallic Bevel */}
      <Card variant="chamfered" className="w-full p-4 sm:p-6">
        {/* Subtle retro highlight corner accent */}
        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-40 bg-gradient-to-bl from-white via-transparent to-transparent" />

        {/* Profile Avatar & Info */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 group">
            <Avatar size="xl" className="transition-transform duration-200 group-hover:scale-105">
              {profile.avatarUrl && (
                <AvatarImage src={profile.avatarUrl} alt={profile.displayName} referrerPolicy="no-referrer" />
              )}
              <AvatarFallback>{initialChar}</AvatarFallback>
            </Avatar>
            <span
              className="absolute bottom-0 right-1 w-4 h-4 rounded-full bg-[#f68d1f] border-2 border-white shadow-xs"
              title="Active"
            />
          </div>

          {/* Display Name with Box-Art Outlined Drop Shadow */}
          <h1 className="text-xl sm:text-2xl uppercase tracking-wider mb-1 break-keep px-2 text-white font-black italic [-webkit-text-stroke:1.5px_#3d4f97] [text-shadow:3px_3px_0px_#21242e]">
            {profile.displayName}
          </h1>
          <p className="text-[10px] font-bold text-[#3d4f97] mb-2">@{profile.username}</p>

          {profile.bio && (
            <p className="text-xs sm:text-sm text-[#21242e] font-medium max-w-md mb-3 leading-relaxed break-keep px-1">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Section Label Bar (Silkscreen style) */}
        <div className="w-full bg-[#7a8aba] border-t border-white/60 border-b border-[#3d4f97] px-2.5 py-1 mb-3 mt-1 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#21242e]">
            <span className="text-[10px] text-[#f68d1f]">▶</span>
            <span className="text-[11px] font-bold uppercase tracking-wider font-sans">
              링크 목록 (LINKS)
            </span>
          </div>
          <Badge variant="indigo">{links.length} items</Badge>
        </div>

        {/* Link Buttons Stack */}
        <div className="w-full flex flex-col gap-2.5">
          {links.length === 0 ? (
            <Card variant="inset" className="w-full">
              <CardContent className="p-6 text-center">
                <p className="text-sm font-bold text-[#21242e]">아직 등록된 링크가 없습니다.</p>
              </CardContent>
            </Card>
          ) : (
            links.map((link) => (
              <a
                key={link.id}
                href={normalizeUrl(link.url)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClick(link.id)}
                className={cn(
                  cardVariants({ variant: 'platinum' }),
                  'group w-full p-3 flex items-center justify-between gap-3 text-left duration-150 cursor-pointer'
                )}
              >
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-[#21242e] group-hover:text-[#3d4f97] transition-colors truncate">
                      {link.title}
                    </span>
                    <ExternalLink
                      size={11}
                      className="text-[#60619c] opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    />
                  </div>
                  {link.description && (
                    <p className="text-[11px] text-[#60619c] truncate mt-0.5">{link.description}</p>
                  )}
                </div>
                <span className="w-6 h-6 shrink-0 rounded-full bg-[#f68d1f] flex items-center justify-center text-white shadow-xs group-hover:bg-[#ff9e3b] group-active:scale-95 transition-all">
                  <ChevronRight size={14} strokeWidth={2.5} />
                </span>
              </a>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
