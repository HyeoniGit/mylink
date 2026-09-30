'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Masthead from '@/components/nintendo/Masthead';
import DualNavbar from '@/components/nintendo/DualNavbar';
import LeftRailTabs from '@/components/nintendo/LeftRailTabs';
import HeroPanel from '@/components/nintendo/HeroPanel';
import ContentColumn from '@/components/nintendo/ContentColumn';
import RightActionRail from '@/components/nintendo/RightActionRail';
import FooterBar from '@/components/nintendo/FooterBar';
import NintendoAddModal from '@/components/nintendo/NintendoAddModal';
import { INITIAL_LINKS } from '@/data/initialLinks';
import { LinkItem, CategoryType } from '@/types/link';

const STORAGE_KEY = 'nintendo_mylink_2001_v1';

export default function Home() {
  const [links, setLinks] = useState<LinkItem[]>(INITIAL_LINKS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSort, setActiveSort] = useState<string>('default');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync with localStorage
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

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
      } catch {
        // Storage full
      }
    }
  }, [links, isLoaded]);

  // Handlers
  const handleOpenLink = (item: LinkItem) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === item.id ? { ...l, clicks: l.clicks + 1 } : l))
    );
    const targetUrl = item.url.startsWith('http') ? item.url : `https://${item.url}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLikeLink = (id: string) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, likes: l.likes + 1 } : l))
    );
  };

  const handleDeleteLink = (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const handleAddLink = (newLinkData: Omit<LinkItem, 'id' | 'likes' | 'clicks'>) => {
    const newItem: LinkItem = {
      ...newLinkData,
      id: `link-${Date.now()}`,
      likes: 1,
      clicks: 0,
    };
    setLinks((prev) => [newItem, ...prev]);
  };

  const handleResetData = () => {
    if (confirm('Restore default 2001 Nintendo.com link collection?')) {
      setLinks(INITIAL_LINKS);
      localStorage.removeItem(STORAGE_KEY);
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
        if (activeSort === 'clicks') return b.clicks - a.clicks;
        if (activeSort === 'likes') return b.likes - a.likes;
        return 0; // Default
      });
  }, [links, selectedCategory, searchQuery, activeSort]);

  return (
    <div className="min-h-screen py-4 px-2 sm:px-4 flex justify-center items-start">
      {/* Fixed-Width Machine Faceplate Canvas (~800px-860px wide, centered) */}
      <div className="w-full max-w-[840px] flex items-start gap-1">
        {/* Left Vertical Rotated Tabs Strip */}
        <LeftRailTabs
          activeSort={activeSort}
          onSelectSort={(sort) => setActiveSort(sort)}
        />

        {/* Main Console Chassis (Brushed Periwinkle Metal Body) */}
        <div className="flex-1 nin-plate p-1.5 sm:p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
          {/* Top Masthead */}
          <Masthead
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Dual Navigation Bars */}
          <div className="mb-2">
            <DualNavbar
              activeTab={selectedCategory}
              onSelectTab={(tab) => setSelectedCategory(tab)}
              onOpenAddModal={() => setIsModalOpen(true)}
            />
          </div>

          {/* Main Hero Panel */}
          <HeroPanel
            onExploreClick={() => {
              const el = document.getElementById('content-vault');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Two-Column Split (2/3 Content Column + 1/3 Right Action Rail) */}
          <div id="content-vault" className="flex flex-col lg:flex-row gap-2.5">
            {/* Content Column (~2/3) */}
            <ContentColumn
              links={filteredLinks}
              onOpenLink={handleOpenLink}
              onLikeLink={handleLikeLink}
              onDeleteLink={handleDeleteLink}
            />

            {/* Right Action Rail (~1/3) */}
            <RightActionRail
              onOpenAddModal={() => setIsModalOpen(true)}
              onResetData={handleResetData}
              totalLinks={links.length}
            />
          </div>

          {/* Footer Bar */}
          <FooterBar />
        </div>
      </div>

      {/* Nintendo Add Modal */}
      <NintendoAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddLink}
      />
    </div>
  );
}
