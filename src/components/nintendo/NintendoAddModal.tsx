'use client';

import React, { useState } from 'react';
import { CategoryType, LinkItem } from '@/types/link';

interface NintendoAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (link: Omit<LinkItem, 'id' | 'likes' | 'clicks'>) => void;
}

export default function NintendoAddModal({ isOpen, onClose, onAdd }: NintendoAddModalProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('dev');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      alert('Title and URL are required.');
      return;
    }

    onAdd({
      title: title.trim(),
      url: url.trim(),
      description: description.trim() || 'Official curated web resource.',
      category,
      emoji: '⚡',
      bgColor: '#ffffff',
      isFeatured: true,
    });

    setTitle('');
    setUrl('');
    setDescription('');
    setCategory('dev');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      {/* Molded Bevel Plate Modal Container */}
      <div className="w-full max-w-md nin-plate p-1 shadow-[4px_4px_12px_rgba(0,0,0,0.5)]">
        {/* Header Bar */}
        <div className="bg-[#7a8aba] px-3 py-1.5 flex items-center justify-between border-b border-[#3d4f97]">
          <div className="flex items-center gap-1.5">
            <span className="text-[#3d4f97] text-[11px] font-black">≡</span>
            <span className="text-[12px] font-bold text-[#ffffff] uppercase tracking-[0.5px]">
              REGISTER NEW WEB CARTRIDGE
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-4 h-4 bg-[#e60012] text-white text-[10px] font-bold flex items-center justify-center border border-white hover:bg-red-700 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Platinum Gray Form Body */}
        <div className="bg-[#dedede] p-4 space-y-3 border-t border-white">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Title Field */}
            <div>
              <label className="block text-[11px] font-bold text-[#21242e] uppercase tracking-wider mb-1">
                Link Title:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Next.js 16 Documentation"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#ffffff] border border-[#3d4f97] p-1.5 text-[12px] text-[#21242e] focus:outline-none"
              />
            </div>

            {/* URL Field */}
            <div>
              <label className="block text-[11px] font-bold text-[#21242e] uppercase tracking-wider mb-1">
                Resource URL:
              </label>
              <input
                type="url"
                required
                placeholder="https://nextjs.org"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-[#ffffff] border border-[#3d4f97] p-1.5 text-[12px] text-[#21242e] focus:outline-none font-mono"
              />
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-[11px] font-bold text-[#21242e] uppercase tracking-wider mb-1">
                System Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full bg-[#ffffff] border border-[#3d4f97] p-1.5 text-[11px] font-bold text-[#21242e] uppercase focus:outline-none cursor-pointer"
              >
                <option value="dev">SYSTEMS / DEV</option>
                <option value="design">GRAPHICS & DESIGN</option>
                <option value="tools">TOOLS & CODE BANK</option>
                <option value="star">FAVORITES / TOP PICKS</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-bold text-[#21242e] uppercase tracking-wider mb-1">
                Short Annotation:
              </label>
              <textarea
                rows={2}
                placeholder="Brief summary of this link..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#ffffff] border border-[#3d4f97] p-1.5 text-[12px] text-[#21242e] focus:outline-none resize-none"
              />
            </div>

            {/* Dotted Divider */}
            <div className="nin-dotted-divider pt-1"></div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="nin-btn-carbon px-3 py-1 text-[11px]"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="nin-btn-signal px-4 py-1 text-[11px] flex items-center gap-1"
              >
                <span>COMMIT LINK</span>
                <span>▶</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
