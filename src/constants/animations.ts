// Animation Configuration Constants
export const ANIMATION_DURATIONS = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '1000ms',
} as const;

export const ANIMATION_DELAYS = {
  none: '0ms',
  short: '100ms',
  medium: '200ms',
  long: '300ms',
  longer: '500ms',
} as const;

export const STAGGER_DELAYS = [
  '0ms',
  '100ms',
  '200ms',
  '300ms',
  '400ms',
  '500ms',
  '600ms',
] as const;

export const SCROLL_THRESHOLDS = {
  early: 0.05,
  normal: 0.1,
  late: 0.2,
} as const;