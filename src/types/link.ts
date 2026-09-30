export type CategoryType = 'all' | 'dev' | 'design' | 'tools' | 'star';

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  category: CategoryType;
  emoji: string;
  likes: number;
  clicks: number;
  bgColor: string; // Pastel/vivid neobrutalism color
  isFeatured?: boolean;
}
