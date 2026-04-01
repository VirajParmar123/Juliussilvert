const STORAGE_KEY = 'julius-silvert-recent-searches';
const MAX_RECENT = 8;
const MIN_LENGTH = 2;

export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s): s is string => typeof s === 'string' && s.trim().length >= MIN_LENGTH).slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

export function addRecentSearch(raw: string): void {
  if (typeof window === 'undefined') return;
  const q = raw.trim();
  if (q.length < MIN_LENGTH) return;
  try {
    const prev = getRecentSearches().filter((s) => s.toLowerCase() !== q.toLowerCase());
    const next = [q, ...prev].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota */
  }
}

export function clearRecentSearches(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
