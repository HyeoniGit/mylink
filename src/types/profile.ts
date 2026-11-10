export interface SocialLinks {
  github?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export interface UserProfile {
  id: string;
  slug: string;
  name: string;
  bio: string;
  avatarUrl: string;
  email: string;
  location?: string;
  socialLinks?: SocialLinks;
}

export type LinkCategory = 'portfolio' | 'design' | 'dev' | 'blog' | 'contact' | 'tools' | 'star';

export interface MyLinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  category?: LinkCategory;
  clicks: number;
  order?: number;
  isVisible?: boolean;
  createdAt?: string;
}

export interface MyLinkStorageData {
  user: UserProfile;
  links: MyLinkItem[];
}

export interface ProfileApiResponse {
  success: boolean;
  data: MyLinkStorageData;
}
