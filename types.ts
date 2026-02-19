
export interface Activity {
  id: string;
  title: string;
  description: string;
  fullDescription?: string; // Detailed description for the view
  tips?: string[]; // Local tips
  openingHours?: string;
  category: 'nature' | 'food' | 'adventure' | 'culture' | 'relax' | 'services';
  location: string;
  address?: string; // For map query
  distance?: string; // e.g., "5 min"
  isRecommended?: boolean;
}

export interface CabinInfo {
  wifiSSID: string;
  wifiPass: string;
  checkoutTime: string;
  emergencyPhone: string;
  managerPhone: string;
  cleaningService: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface InventoryItem {
  id: string;
  title: string;
  authorOrType?: string; // Author for books, Type for games
  available: boolean;
}

export interface Therapy {
  id: string;
  title: string;
  duration: string;
  description: string;
  price?: string; // Optional price display
}

export type Tab = 'home' | 'explore' | 'info';
