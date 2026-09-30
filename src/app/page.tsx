'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import ProfileHeader from '@/components/ProfileHeader';
import LinkCard from '@/components/LinkCard';
import AddLinkModal from '@/components/AddLinkModal';
import { INITIAL_LINKS } from '@/data/initialLinks';
import { LinkItem, CategoryType } from '@/types/link';
import { Search, Plus, SlidersHorizontal, Check, RefreshCw, X } from 'lucide-react';

const STORAGE_KEY = 'mylink_items_v1';

export default function Home() {
  const [links, setLinks] = useState<LinkItem[]>(INITIAL_LINKS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [sortBy, setSortBy] = useState<'default' | 'likes' | 'clicks'>('default');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLinks(parsed);
        }
      }
    } catch {
      // Ignore parse error
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
      } catch {
        // Storage full or unavailable
      }
    }
  }, [links, isLoaded]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  // Actions
  const handleLike = (id: string) => {
    setLinks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const handleClickCount = (id: string) => {
    setLinks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, clicks: item.clicks + 1 } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setLinks((prev) => prev.filter((item) => item.id !== id));
    showToast('링크가 삭제되었습니다.');
  };

  const handleAddLink = (newLinkData: Omit<LinkItem, 'id' | 'likes' | 'clicks'>) => {
    const newItem: LinkItem = {
      ...newLinkData,
      id: `link-${Date.now()}`,
      likes: 0,
      clicks: 0,
    };
    setLinks((prev) => [newItem, ...prev]);
    showToast('새 링크가 성공적으로 추가되었습니다! 🎉');
  };

  const handleResetData = () => {
    if (confirm('기본 샘플 데이터로 복원하시겠습니까?')) {
      setLinks(INITIAL_LINKS);
      localStorage.removeItem(STORAGE_KEY);
      showToast('기본 데이터로 복원되었습니다.');
    }
  };

  // Filter & Sort
  const filteredLinks = useMemo(() => {
    return links
      .filter((item) => {
        const matchCategory =
          selectedCategory === 'all' || item.category === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchSearch =
          !q ||
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.url.toLowerCase().includes(q);
        return matchCategory && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'likes') return b.likes - a.likes;
        if (sortBy === 'clicks') return b.clicks - a.clicks;
        return 0; // Default
      });
  }, [links, selectedCategory, searchQuery, sortBy]);

  // Aggregate stats
  const totalLikes = useMemo(
    () => links.reduce((sum, item) => sum + item.likes, 0),
    [links]
  );
  const totalClicks = useMemo(
    () => links.reduce((sum, item) => sum + item.clicks, 0),
    [links]
  );

  const categories: { key: CategoryType; label: string; count: number }[] = [
    { key: 'all', label: '전체', count: links.length },
    { key: 'dev', label: '💻 개발', count: links.filter((l) => l.category === 'dev').length },
    { key: 'design', label: '🎨 디자인', count: links.filter((l) => l.category === 'design').length },
    { key: 'tools', label: '🛠️ 툴', count: links.filter((l) => l.category === 'tools').length },
    { key: 'star', label: '⭐ 즐겨찾기', count: links.filter((l) => l.category === 'star').length },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-black selection:text-[#FFE600]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FFE600] text-black border-3 border-black p-3.5 neo-shadow font-black text-sm flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <Check className="w-5 h-5 stroke-[3] bg-black text-[#FFE600] p-0.5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 flex-1">
        {/* Profile Section */}
        <ProfileHeader
          totalLinks={links.length}
          totalLikes={totalLikes}
          totalClicks={totalClicks}
        />

        {/* Action & Filter Toolbar */}
        <div className="neo-card bg-[#FFE600] p-4 sm:p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-3 items-stretch justify-between mb-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-black pointer-events-none stroke-[2.5]" />
              <input
                type="text"
                placeholder="제목, 설명, 주소로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-black pl-11 pr-10 py-2.5 font-bold text-sm neo-shadow-sm focus:outline-none focus:ring-2 focus:ring-black placeholder:text-zinc-500 placeholder:font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:scale-110"
                >
                  <X className="w-4 h-4 stroke-[3]" />
                </button>
              )}
            </div>

            {/* Add Link Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="neo-btn bg-black text-[#FFE600] px-5 py-2.5 flex items-center justify-center gap-2 text-sm shrink-0 hover:bg-zinc-900"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
              <span>새 링크 추가</span>
            </button>
          </div>

          {/* Category Chips and Sort Options */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t-2 border-black/20">
            {/* Category Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setSelectedCategory(c.key)}
                  className={`neo-btn px-3 py-1.5 text-xs font-black transition-all ${
                    selectedCategory === c.key
                      ? 'bg-black text-white shadow-none translate-x-0.5 translate-y-0.5'
                      : 'bg-white text-black hover:bg-zinc-100'
                  }`}
                >
                  <span>{c.label}</span>
                  <span className="ml-1.5 opacity-75">({c.count})</span>
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-white border-2 border-black px-2.5 py-1 neo-shadow-sm self-end sm:self-auto">
              <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2.5]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-black focus:outline-none cursor-pointer"
              >
                <option value="default">기본순</option>
                <option value="likes">추천순 🔥</option>
                <option value="clicks">조회순 👀</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-6 bg-black inline-block"></span>
            <h2 className="font-black text-xl sm:text-2xl uppercase tracking-tight text-black">
              LINKS COLLECTION ({filteredLinks.length})
            </h2>
          </div>

          <button
            onClick={handleResetData}
            title="초기 샘플 데이터 복원"
            className="flex items-center gap-1 text-xs font-bold text-zinc-700 hover:text-black underline"
          >
            <RefreshCw className="w-3 h-3" />
            <span>샘플 복원</span>
          </button>
        </div>

        {/* Links Grid */}
        {filteredLinks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredLinks.map((item) => (
              <LinkCard
                key={item.id}
                item={item}
                onLike={handleLike}
                onClickCount={handleClickCount}
                onDelete={handleDelete}
                onCopySuccess={() => showToast('클립보드에 링크가 복사되었습니다!')}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="neo-card bg-white p-12 text-center my-8">
            <div className="w-16 h-16 bg-[#FFE600] border-3 border-black neo-shadow mx-auto flex items-center justify-center text-3xl mb-4">
              🔍
            </div>
            <h3 className="font-black text-2xl text-black mb-2">검색 결과가 없습니다</h3>
            <p className="font-medium text-zinc-700 mb-6 text-sm">
              입력하신 검색어나 필터 조건에 맞는 링크를 찾을 수 없습니다.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="neo-btn bg-[#A6FF96] text-black px-5 py-2.5 text-sm"
            >
              필터 초기화하기
            </button>
          </div>
        )}
      </main>

      {/* Neobrutalism Footer */}
      <footer className="mt-16 bg-black text-white border-t-4 border-black py-8 px-4 text-center">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-lg text-[#FFE600]">MYLINK</span>
            <span className="text-xs text-zinc-400">© 2026 NEOBRUTALISM EDITION</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
            <span>POWERED BY</span>
            <span className="bg-[#FFE600] text-black px-2 py-0.5 border border-black font-black">
              NEXT.JS 16
            </span>
            <span className="bg-[#70D6FF] text-black px-2 py-0.5 border border-black font-black">
              TAILWIND CSS
            </span>
          </div>
        </div>
      </footer>

      {/* Add Link Modal */}
      <AddLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddLink}
      />
    </div>
  );
}
