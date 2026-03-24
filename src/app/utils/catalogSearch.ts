import type { CatalogProduct } from '../data/catalog';
import { CATEGORY_SLUG_TITLE } from '../data/catalog';

/** Lowercase text safe for matching: drop punctuation, keep letters/digits as word boundaries. */
export function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(text: string): string[] {
  return normalizeForMatch(text)
    .split(' ')
    .filter((t) => t.length > 0);
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const temp = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
      prev = temp;
    }
  }
  return row[b.length];
}

function maxFuzzyDistance(len: number): number {
  if (len < 4) return 0;
  if (len <= 6) return 1;
  return 2;
}

function tokenMatchesQueryWord(queryWord: string, productTokens: string[]): boolean {
  if (queryWord.length <= 2) {
    return productTokens.some((t) => t === queryWord || t.includes(queryWord) || queryWord.includes(t));
  }
  if (queryWord.length === 3) {
    return productTokens.some(
      (t) => t.includes(queryWord) || queryWord.includes(t) || levenshtein(queryWord, t) <= 1
    );
  }
  const maxD = maxFuzzyDistance(queryWord.length);
  for (const t of productTokens) {
    if (t.length < 2) continue;
    if (t.includes(queryWord) || queryWord.includes(t)) return true;
    if (Math.abs(t.length - queryWord.length) > maxD) continue;
    if (levenshtein(queryWord, t) <= maxD) return true;
  }
  return false;
}

function productHaystackParts(p: CatalogProduct): { rawLower: string; normalized: string; tokenList: string[] } {
  const rawLower = [p.name, p.description, p.itemNumber, p.category].join(' ').toLowerCase();
  const normalized = normalizeForMatch(rawLower);
  const tokenList = tokens(rawLower);
  return { rawLower, normalized, tokenList };
}

/** Whether a catalog product matches the user search string (substring, sanitized, light fuzzy). */
export function productMatchesSearch(product: CatalogProduct, rawQuery: string): boolean {
  const q = rawQuery.trim();
  if (!q) return false;

  const { rawLower, normalized, tokenList } = productHaystackParts(product);

  const qLower = q.toLowerCase();
  if (rawLower.includes(qLower)) return true;

  const qNorm = normalizeForMatch(q);
  if (!qNorm) return false;
  if (normalized.includes(qNorm)) return true;

  const qToks = tokens(q);
  if (qToks.length === 0) return normalized.includes(qNorm);

  return qToks.every((qw) => tokenMatchesQueryWord(qw, tokenList));
}

/** Category row matches (label, slug, or internal key) with same normalization/fuzzy rules. */
export function categoryRowMatches(
  categoryKey: string,
  label: string,
  slug: string,
  rawQuery: string
): boolean {
  const q = rawQuery.trim();
  if (!q) return false;
  const qLower = q.toLowerCase();
  const fields = [categoryKey, label, slug].map((s) => s.toLowerCase());
  if (fields.some((f) => f.includes(qLower) || qLower.includes(f))) return true;

  const qToks = tokens(q);
  if (qToks.length === 0) return false;

  for (const qw of qToks) {
    const fieldTokens = fields.flatMap((f) => tokens(f));
    if (!tokenMatchesQueryWord(qw, fieldTokens)) return false;
  }
  return true;
}

export type SearchSuggestion = { label: string; href: string; kind: 'search' | 'category' };

const POPULAR_FALLBACK_COUNT = 8;

/** Vocabulary from product names for “Did you mean” search links. */
function buildCatalogVocabulary(products: CatalogProduct[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of products) {
    for (const w of tokens(p.name)) {
      if (w.length < 4) continue;
      if (seen.has(w)) continue;
      seen.add(w);
      out.push(w);
    }
  }
  return out;
}

export type EmptySearchRecovery = {
  didYouMean: SearchSuggestion[];
  relatedDepartments: SearchSuggestion[];
  browseDepartments: { label: string; href: string }[];
  popularProducts: CatalogProduct[];
};

/**
 * When there are zero results: spelling-style hints, related aisles, full department list, popular SKUs.
 */
export function getEmptySearchRecovery(rawQuery: string, products: CatalogProduct[]): EmptySearchRecovery {
  const qNorm = normalizeForMatch(rawQuery);
  const qToks = tokens(rawQuery);
  const primaryTerm = qToks.length ? [...qToks].sort((a, b) => b.length - a.length)[0] : qNorm;

  const didYouMean: SearchSuggestion[] = [];
  const seenHref = new Set<string>();
  const add = (list: SearchSuggestion[], s: SearchSuggestion) => {
    if (seenHref.has(s.href)) return;
    seenHref.add(s.href);
    list.push(s);
  };

  if (primaryTerm.length >= 3) {
    const vocab = buildCatalogVocabulary(products);
    const ranked = vocab
      .map((word) => ({ word, d: levenshtein(primaryTerm, word) }))
      .filter(
        ({ word, d }) =>
          d > 0 && d <= maxFuzzyDistance(Math.max(primaryTerm.length, word.length)) + 1
      )
      .sort((a, b) => a.d - b.d || a.word.length - b.word.length)
      .slice(0, 3);

    for (const { word } of ranked) {
      add(didYouMean, {
        label: word,
        href: `/search?q=${encodeURIComponent(word)}`,
        kind: 'search',
      });
    }
  }

  const relatedDepartments: SearchSuggestion[] = [];
  if (qNorm.length >= 2) {
    const slugScored = Object.entries(CATEGORY_SLUG_TITLE).map(([slug, title]) => {
      const titleNorm = normalizeForMatch(title);
      const titleToks = tokens(title);
      const distances = [
        levenshtein(qNorm, titleNorm),
        ...titleToks.map((t) => (t.length >= 3 ? levenshtein(primaryTerm || qNorm, t) : 99)),
      ];
      const d = Math.min(...distances);
      return { slug, title, d };
    });

    slugScored
      .filter((e) => e.d > 0 && e.d <= 4)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .forEach((e) => {
        add(relatedDepartments, {
          label: e.title,
          href: `/category/${e.slug}`,
          kind: 'category',
        });
      });
  }

  const browseDepartments = Object.entries(CATEGORY_SLUG_TITLE).map(([slug, title]) => ({
    label: title,
    href: `/category/${slug}`,
  }));

  return {
    didYouMean,
    relatedDepartments,
    browseDepartments,
    popularProducts: products.slice(0, POPULAR_FALLBACK_COUNT),
  };
}
