/** Lightweight fallback for lazy route chunks — avoids layout shift (CLS). */
export function PageLoadingFallback() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-3 bg-white px-4"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-brand-header"
        aria-hidden
      />
      <p className="text-sm text-gray-600">Loading…</p>
    </div>
  );
}
