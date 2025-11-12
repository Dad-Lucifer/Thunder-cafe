// Data formatting utilities
export const getGameDescription = (title: string, platform: string): string => {
  const descriptions: Record<string, string> = {
    'Valorant': 'Tactical 5v5 character-based shooter',
    'FIFA 24': 'Ultimate football simulation experience',
    'GTA V': 'Open-world action-adventure gaming',
    'CS:GO 2': 'Competitive first-person shooter',
    'Fortnite': 'Battle royale building survival game',
    'Call of Duty': 'Intense military combat action',
    'Apex Legends': 'Fast-paced battle royale with legends',
    'Minecraft': 'Creative sandbox adventure game',
    'NBA 2K24': 'Professional basketball simulation',
    'Halo Infinite': 'Sci-fi first-person shooter',
    'League of Legends': 'Strategic MOBA gameplay',
    'Rocket League': 'High-octane soccer with cars'
  };
  return descriptions[title] || `Premium ${platform} gaming experience`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};