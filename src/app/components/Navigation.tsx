import { useState } from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import { Link } from 'react-router';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

type MenuCategory = { title?: string; items: string[] };

type MenuItem =
  | { label: string; hasDropdown: false }
  | { label: string; hasDropdown: true; categories: MenuCategory[] };

const menuItems: MenuItem[] = [
  {
    label: "WHAT'S NEW",
    hasDropdown: false,
  },
  {
    label: 'MEAT & POULTRY',
    hasDropdown: true,
    categories: [
      { items: ['Beef', 'Chicken', 'Pork', 'Lamb', 'Veal', 'Specialty Meats'] },
      { items: ['Ground Meats', 'Sausages', 'Bacon & Ham', 'Turkey', 'Duck'] },
      { items: ['Marinated Items', 'Ready to Cook', 'Organic Selections'] },
    ],
  },
  {
    label: 'DAIRY & EGGS',
    hasDropdown: true,
    categories: [
      { items: ['Milk & Cream', 'Butter', 'Eggs', 'Yogurt', 'Sour Cream'] },
      { items: ['Cottage Cheese', 'Cream Cheese', 'Plant-Based Dairy'] },
    ],
  },
  {
    label: 'CHEESE & CHARCUTERIE',
    hasDropdown: true,
    categories: [
      {
        title: 'Blue',
        items: ['Brie & Triple Creme', 'Cheddars & Jacks', 'Cream Cheese', 'Deli Style', 'Feta & Greek'],
      },
      {
        title: 'Fresh, Spreads & Crumbly',
        items: ['Goat', 'Goudas', 'Mexican Cheese', 'Italian Style', 'Mozzarella & Burrata'],
      },
      {
        title: 'Plant Based',
        items: [
          'Plant Based',
          'Smoked & Flavored',
          'Spanish Style',
          'Swiss & Alpine',
          'Charcuterie & Salumi',
        ],
      },
    ],
  },
  {
    label: 'OILS & VINEGARS',
    hasDropdown: true,
    categories: [
      { items: ['Olive Oils', 'Vegetable Oils', 'Specialty Oils', 'Cooking Sprays'] },
      { items: ['Balsamic Vinegar', 'Wine Vinegar', 'Flavored Vinegars', 'Rice Vinegar'] },
    ],
  },
  {
    label: 'BAKING & PASTRY',
    hasDropdown: true,
    categories: [
      { items: ['Flour & Baking Mixes', 'Sugar & Sweeteners', 'Chocolate & Cocoa', 'Extracts & Flavorings'] },
      { items: ['Yeast & Leavening', 'Decorations & Toppings', 'Pastry Shells', 'Frozen Dough'] },
    ],
  },
  {
    label: 'PRODUCE',
    hasDropdown: true,
    categories: [
      { items: ['Fresh Vegetables', 'Fresh Fruits', 'Herbs', 'Salad Mixes'] },
      { items: ['Organic Produce', 'Pre-Cut Vegetables', 'Specialty Items'] },
    ],
  },
  {
    label: 'FROZEN',
    hasDropdown: true,
    categories: [
      {
        items: [
          'Appetizers & Snacks',
          'Dough & Pastry',
          'French Fries',
          'Frozen Desserts',
          'Frozen Fruit',
          'Frozen Vegetables',
        ],
      },
      {
        items: [
          'Frozen Family Meals',
          'Frozen Fruit Puree',
          'Frozen Bread, Rolls, Bagels',
          'Frozen Pasta',
          'Frozen Meat',
          'Frozen Soup',
        ],
      },
      { items: ['Ice Cream', "Frozen Hors D'oeuvres"] },
    ],
  },
  {
    label: 'SEAFOOD',
    hasDropdown: true,
    categories: [
      { items: ['Fresh Fish', 'Fresh Shellfish', 'Frozen Fish', 'Frozen Shellfish'] },
      { items: ['Smoked Seafood', 'Prepared Seafood', 'Sushi Grade', 'Caviar & Roe'] },
    ],
  },
  {
    label: 'PANTRY',
    hasDropdown: true,
    categories: [
      { items: ['Canned Goods', 'Pasta & Grains', 'Sauces & Condiments', 'Spices & Seasonings'] },
      { items: ['Snacks', 'Beverages', 'International Foods'] },
    ],
  },
  {
    label: 'SUPPLIES',
    hasDropdown: true,
    categories: [
      { items: ['Kitchen Equipment', 'Disposables', 'Cleaning Supplies', 'Storage Containers'] },
      { items: ['Packaging', 'Serving Ware', 'Utensils'] },
    ],
  },
];

export function Navigation() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const createSlug = (text: string) => {
    return text.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-').replace(/'/g, '');
  };

  const activeMenu = hoveredItem
    ? menuItems.find((item) => item.label === hoveredItem && item.hasDropdown)
    : null;

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      className="relative bg-brand-header border-b border-white/10"
      aria-label="Main categories"
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 md:gap-0">
          {/* Mobile: hamburger + sheet */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors -ml-1"
                aria-expanded={mobileOpen}
                aria-controls="mobile-main-nav"
              >
                <Menu className="h-6 w-6" aria-hidden />
                <span className="sr-only">Open menu</span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              id="mobile-main-nav"
              className="w-[min(100vw-1rem,22rem)] border-r border-gray-200 bg-white p-0 text-gray-900 shadow-xl [&>button]:text-gray-700"
            >
              <SheetHeader className="border-b border-gray-100 px-4 py-4 text-left">
                <SheetTitle className="text-base font-semibold text-brand-header">
                  Categories
                </SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto overscroll-contain max-h-[calc(100dvh-5rem)] pb-8">
                <ul className="flex flex-col">
                  {menuItems.map((item, index) => (
                    <li key={item.label} className="border-b border-gray-100 last:border-b-0">
                      {!item.hasDropdown ? (
                        <Link
                          to="/"
                          onClick={closeMobile}
                          className="block px-4 py-3.5 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:bg-gray-50"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <details className="open:[&_.nav-chevron]:rotate-180">
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3.5 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
                            <span>{item.label}</span>
                            <ChevronDown className="nav-chevron h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200" />
                          </summary>
                          <div className="border-t border-gray-100 bg-gray-50/80 px-2 py-2">
                            {item.categories.map((category, catIndex) => (
                              <div key={catIndex} className="mb-3 last:mb-0">
                                {category.title && (
                                  <p className="px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                                    {category.title}
                                  </p>
                                )}
                                <ul className="space-y-0.5">
                                  {category.items.map((subItem) => (
                                    <li key={subItem}>
                                      <Link
                                        to={`/category/${createSlug(subItem)}`}
                                        onClick={closeMobile}
                                        className="block rounded-md px-2 py-2 text-sm text-gray-800 hover:bg-white hover:text-gray-900"
                                      >
                                        {subItem}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            <div className="mt-2 border-t border-gray-200 pt-2">
                              <Link
                                to={`/category/${createSlug(item.categories[0].items[0])}`}
                                onClick={closeMobile}
                                className="block px-2 py-2 text-xs font-semibold uppercase text-brand-header hover:underline"
                              >
                                View all {item.label} →
                              </Link>
                            </div>
                          </div>
                        </details>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop: horizontal nav */}
          <div className="hidden md:flex flex-1 items-stretch justify-between gap-0 overflow-visible">
            {menuItems.map((item, index) => (
              <div key={index} className="relative shrink-0">
                <button
                  type="button"
                  onMouseEnter={() => {
                    if (item.hasDropdown) setHoveredItem(item.label);
                    else setHoveredItem(null);
                  }}
                  className="flex h-full min-h-[44px] items-center gap-1.5 px-2.5 py-3.5 text-xs font-medium leading-snug whitespace-nowrap uppercase tracking-wide text-white/95 transition-colors hover:bg-white/10 hover:text-white lg:px-3"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop mega menu */}
      {activeMenu && activeMenu.categories && (
        <div className="absolute left-0 right-0 top-full z-[100] hidden pt-2 md:block">
          <div className="bg-white/95 backdrop-blur-sm shadow-2xl max-h-[min(75vh,720px)] overflow-y-auto overscroll-contain">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
              <div
                className={`grid gap-8 md:gap-10 lg:gap-12 ${
                  activeMenu.categories.length === 3
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 md:grid-cols-2'
                }`}
              >
                {activeMenu.categories.map((category, catIndex) => (
                  <div key={catIndex}>
                    {category.title && (
                      <h3 className="text-sm font-semibold mb-4 text-gray-800 uppercase tracking-wide">
                        {category.title}
                      </h3>
                    )}
                    <ul className="space-y-2">
                      {category.items.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={`/category/${createSlug(subItem)}`}
                            className="text-sm text-gray-700 hover:text-gray-900 hover:underline transition-colors block py-1"
                          >
                            {subItem}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 mt-6 pt-4">
                <Link
                  to={`/category/${createSlug(activeMenu.categories[0].items[0])}`}
                  className="text-sm font-semibold text-gray-900 hover:text-gray-700 uppercase inline-flex items-center gap-2"
                >
                  VIEW ALL {activeMenu.label} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
