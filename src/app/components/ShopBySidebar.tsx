import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type FacetRow = { label: string; count: number };

type CollapsibleFacetProps = {
  title: string;
  items: FacetRow[];
  selected: Set<string>;
  onToggle: (label: string) => void;
};

function CollapsibleFacet({ title, items, selected, onToggle }: CollapsibleFacetProps) {
  const [open, setOpen] = useState(true);

  if (items.length === 0) return null;

  return (
    <div className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200/80 transition-colors"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-gray-600 transition-transform ${open ? 'rotate-0' : '-rotate-90'}`}
        />
      </button>
      {open && (
        <ul className="max-h-52 overflow-y-auto py-2 px-2 space-y-0.5 border-t border-gray-200 bg-white">
          {items.map(({ label, count }) => {
            const id = `facet-${title}-${label}`.replace(/\s+/g, '-');
            return (
              <li key={label}>
                <label
                  htmlFor={id}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-50"
                >
                  <input
                    id={id}
                    type="checkbox"
                    checked={selected.has(label)}
                    onChange={() => onToggle(label)}
                    className="h-4 w-4 rounded border-gray-300 text-brand-header focus:ring-brand-header"
                  />
                  <span className="min-w-0 flex-1 leading-snug">{label}</span>
                  <span className="shrink-0 tabular-nums text-gray-500">({count})</span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export type ShopBySidebarProps = {
  pageTitle: string;
  subcategories: FacetRow[];
  brands: FacetRow[];
  selectedSubcategories: Set<string>;
  selectedBrands: Set<string>;
  onToggleSubcategory: (label: string) => void;
  onToggleBrand: (label: string) => void;
  onClearAll?: () => void;
};

export function ShopBySidebar({
  pageTitle,
  subcategories,
  brands,
  selectedSubcategories,
  selectedBrands,
  onToggleSubcategory,
  onToggleBrand,
  onClearAll,
}: ShopBySidebarProps) {
  const hasActive = selectedSubcategories.size > 0 || selectedBrands.size > 0;

  return (
    <aside className="w-full lg:w-[280px] shrink-0 space-y-4">
      <div>
        <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight break-words">
          {pageTitle}
        </h2>
        <p className="mt-3 text-xs font-bold uppercase tracking-wider text-gray-700">Shop by</p>
      </div>

      {hasActive && onClearAll && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-sm font-medium text-[#6b8e6f] hover:underline"
        >
          Clear all filters
        </button>
      )}

      <CollapsibleFacet
        title="Category"
        items={subcategories}
        selected={selectedSubcategories}
        onToggle={onToggleSubcategory}
      />
      <CollapsibleFacet
        title="Brand"
        items={brands}
        selected={selectedBrands}
        onToggle={onToggleBrand}
      />
    </aside>
  );
}
