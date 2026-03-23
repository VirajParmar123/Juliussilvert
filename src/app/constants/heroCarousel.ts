/**
 * Optimized Unsplash URLs (fixed width/quality) for LCP and bandwidth.
 * Keep index.html <link rel="preload"> href in sync with HERO_CAROUSEL_SRCS[0].
 */
export const HERO_CAROUSEL_SRCS = [
  'https://images.unsplash.com/photo-1592498546551-222538011a27?auto=format&fit=crop&w=1920&q=75',
  'https://images.unsplash.com/photo-1755811248324-3c9b7c8865fc?auto=format&fit=crop&w=1920&q=75',
  'https://images.unsplash.com/photo-1749478072094-d21cb929490c?auto=format&fit=crop&w=1920&q=75',
  'https://images.unsplash.com/photo-1772329375454-ac4f170e57a0?auto=format&fit=crop&w=1920&q=75',
  'https://images.unsplash.com/photo-1766232315004-25980447bb19?auto=format&fit=crop&w=1920&q=75',
] as const;
