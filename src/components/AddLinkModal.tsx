'use client';

import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { CategoryType, LinkItem } from '@/types/link';

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (link: Omit<LinkItem, 'id' | 'likes' | 'clicks'>) => void;
}

const EMOJI_OPTIONS = ['⚡', '🚀', '💻', '🎨', '🛠️', '📚', '💡', '🔥', '⭐', '🎯', '🎧', '☕'];
const COLOR_OPTIONS = [
  { name: 'Yellow', hex: '#FFE600' },
  { name: 'Mint', hex: '#A6FF96' },
  { name: 'Sky', hex: '#70D6FF' },
  { name: 'Pink', hex: '#FF90E8' },
  { name: 'Lavender', hex: '#D4BBFF' },
  { name: 'Peach', hex: '#FFC06E' },
  { name: 'White', hex: '#FFFFFF' },
];

export default function AddLinkModal({ isOpen, onClose, onAdd }: AddLinkModalProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('dev');
  const [emoji, setEmoji] = useState('⚡');
  const [bgColor, setBgColor] = useState('#FFE600');
  const [isFeatured, setIsFeatured] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      alert('제목과 URL은 필수 입력 항목입니다.');
      return;
    }

    onAdd({
      title: title.trim(),
      url: url.trim(),
      description: description.trim() || '링크에 대한 간단한 소개가 없습니다.',
      category,
      emoji,
      bgColor,
      isFeatured,
    });

    // Reset and close
    setTitle('');
    setUrl('');
    setDescription('');
    setCategory('dev');
    setEmoji('⚡');
    setBgColor('#FFE600');
    setIsFeatured(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white border-4 border-black p-6 sm:p-7 shadow-[8px_8px_0_0_#000] animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b-3 border-black">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-[#FFE600] border-2 border-black font-black text-sm">
              NEW
            </span>
            <h2 className="text-2xl font-black tracking-tight text-black">
              새 링크 등록하기
            </h2>
          </div>
          <button
            onClick={onClose}
            className="neo-btn bg-white p-1 hover:bg-[#FF6584] hover:text-white"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1 text-black">
              링크 제목 *
            </label>
            <input
              type="text"
              required
              placeholder="예: Next.js 공식 도큐먼트"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-2 border-black p-2.5 font-bold text-sm bg-[#FDFBF7] shadow-[2px_2px_0_0_#000] focus:outline-none focus:bg-white"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1 text-black">
              URL 주소 *
            </label>
            <input
              type="url"
              required
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border-2 border-black p-2.5 font-bold text-sm bg-[#FDFBF7] shadow-[2px_2px_0_0_#000] focus:outline-none focus:bg-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1 text-black">
              카테고리
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { key: 'dev', label: '💻 개발' },
                { key: 'design', label: '🎨 디자인' },
                { key: 'tools', label: '🛠️ 툴' },
                { key: 'star', label: '⭐ 즐겨찾기' },
              ].map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setCategory(c.key as CategoryType)}
                  className={`neo-btn py-1.5 px-2 text-xs font-black text-center ${
                    category === c.key
                      ? 'bg-black text-white shadow-none translate-x-0.5 translate-y-0.5'
                      : 'bg-white text-black'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Emoji Picker */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1 text-black">
              아이콘 이모지
            </label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setEmoji(em)}
                  className={`w-9 h-9 border-2 border-black text-lg flex items-center justify-center transition-all ${
                    emoji === em
                      ? 'bg-black text-white scale-110 shadow-[2px_2px_0_0_#000]'
                      : 'bg-white hover:bg-zinc-100 shadow-[1px_1px_0_0_#000]'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1 text-black">
              카드 배경 컬러
            </label>
            <div className="flex flex-wrap gap-2.5">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setBgColor(c.hex)}
                  style={{ backgroundColor: c.hex }}
                  className={`w-8 h-8 border-2 border-black transition-all ${
                    bgColor === c.hex ? 'scale-115 ring-2 ring-black neo-shadow-sm' : ''
                  }`}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1 text-black">
              한 줄 설명
            </label>
            <textarea
              rows={2}
              placeholder="링크에 대한 간단한 설명을 남겨보세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-2 border-black p-2.5 font-bold text-sm bg-[#FDFBF7] shadow-[2px_2px_0_0_#000] focus:outline-none focus:bg-white resize-none"
            />
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 border-2 border-black accent-black cursor-pointer"
            />
            <label htmlFor="isFeatured" className="text-xs font-bold text-zinc-900 cursor-pointer">
              추천 링크(RECOMMENDED) 뱃지 달기
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full neo-btn py-3 bg-[#A6FF96] text-black text-base font-black flex items-center justify-center gap-2 hover:bg-[#85f771]"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
              <span>새 링크 추가 완료</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
