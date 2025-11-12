// Animation utility functions
export const getStaggerDelay = (index: number, baseDelay: number = 100): number => {
  return index * baseDelay;
};

export const getAnimationClass = (
  isVisible: boolean, 
  animationType: 'fade-in' | 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale-in' = 'fade-in-up'
): string => {
  return isVisible ? `animate-${animationType}` : 'opacity-0';
};

export const getStaggerAnimationClass = (
  isVisible: boolean, 
  index: number, 
  animationType: string = 'fade-in-up'
): string => {
  if (!isVisible) return 'opacity-0';
  return `animate-${animationType} animate-stagger-${Math.min(index + 1, 6)}`;
};

// Platform-specific utilities
export const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'pc':
      return 'Monitor';
    case 'ps5':
      return 'Gamepad2';
    case 'xbox':
      return 'Trophy';
    default:
      return 'Gamepad2';
  }
};

export const getPlatformColor = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'pc':
      return 'bg-blue-600/20 text-blue-400 border-blue-600/30';
    case 'ps5':
      return 'bg-indigo-600/20 text-indigo-400 border-indigo-600/30';
    case 'xbox':
      return 'bg-green-600/20 text-green-400 border-green-600/30';
    default:
      return 'bg-red-600/20 text-red-400 border-red-600/30';
  }
};

// Price formatting utilities
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDuration = (hours: number): string => {
  return hours === 1 ? '1 hour' : `${hours} hours`;
};

// URL utilities
export const buildBookingUrl = (gameSlug: string): string => {
  return `/booking?game=${gameSlug}`;
};

export const getGameFromUrl = (searchParams: URLSearchParams): string | null => {
  return searchParams.get('game');
};