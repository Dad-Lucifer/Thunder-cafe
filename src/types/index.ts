// Game Type Definitions
export interface Game {
  id: string;
  title: string;
  platform: string;
  
  slug: string;
  description?: string;
}

export interface Snack {
  id: string;
  name: string;
  price: number;
  icon?: string;
}

// Navigation Type Definitions
export interface NavLink {
  name: string;
  href: string;
}

// Form Type Definitions
export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  gameSlug: string;
  timeSlot: string;
  duration: number;
  snacks: Record<string, number>;
  notes: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  gameSlug?: string;
  timeSlot?: string;
  duration?: string;
}

// Component Props Type Definitions
export interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  slug: string;
}

export interface GameCardProps {
  game: Game;
  index?: number;
}

export interface FacilityCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  index?: number;
}

// API Type Definitions
export interface FormspreeResponse {
  ok: boolean;
  status: number;
  statusText: string;
}

export interface OGImageResponse {
  data: Array<{
    base64: string;
  }>;
}

// Utility Type Definitions
export type PlatformFilter = 'all' | 'pc' | 'ps5' | 'xbox' | 'multi';
export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'night';
export type Duration = 1 | 2 | 3;