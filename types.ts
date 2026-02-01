
export type CategoryID = 'icebreaker' | 'deep' | 'romance' | 'work' | 'funny' | 'bold' | 'favorites';

export interface Question {
  id: string;
  text: string;
  category: CategoryID;
  isCustom?: boolean;
}

export interface Category {
  id: CategoryID;
  name: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface UserSettings {
  language: 'pt' | 'en';
  theme: 'dark' | 'light';
  favorites: string[];
}
