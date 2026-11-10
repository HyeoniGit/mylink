import React from 'react';
import { Badge } from '@/components/ui/badge';

export const GITHUB_REPO_URL = 'https://github.com/HyeoniGit/mylink';

export default function ProfileFooter() {
  return (
    <footer className="w-full py-3 px-4 border-t-2 border-[#3d4f97] flex flex-col sm:flex-row items-center justify-between gap-2 text-white select-none bg-[#21242e] bg-[radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:3px_3px]">
      <div className="flex flex-col items-center sm:items-start gap-0.5">
        <span className="text-[10px] text-white font-bold tracking-wider">한양대학교 바이브 코딩</span>
        <span className="text-[10px] text-[#9fbee7] tracking-wider font-sans">© 2026 마이링크 (MyLink)</span>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="amber">v1.0</Badge>
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-bold text-[#9fbee7] hover:text-white underline underline-offset-2"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
