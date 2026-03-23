export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
  itemNumber: string;
  caseInfo: string;
  stock: number;
  casePrice: number;
  pcPrice: number;
  perLb?: number;
  image: string;
  /** Optional extra photos for product detail gallery (otherwise URL variants of `image` are used). */
  gallery?: string[];
  unit: string;
  category: string;
  priceLabel?: string;
  keyFeatures?: string[];
  brandAbout?: string;
  rating?: number;
  reviewCount?: number;
};

/** Subcategory + brand for category-page “Shop by” filters (per product id). */
export type ProductFacets = { subcategory: string; brand: string };

const PRODUCT_FACETS: Record<string, ProductFacets> = {
  '1': { subcategory: 'Steaks & Chops', brand: 'Julius Silvert' },
  '2': { subcategory: 'Specialty & Cured', brand: 'B&M' },
  '3': { subcategory: 'Steaks & Chops', brand: 'Julius Silvert' },
  '4': { subcategory: 'Steaks & Chops', brand: 'Julius Silvert' },
  '5': { subcategory: 'Breast & Cuts', brand: 'Joyce Farms' },
  '6': { subcategory: 'Steaks & Chops', brand: 'Julius Silvert' },
  '7': { subcategory: 'Trim & Ends', brand: 'Julius Silvert' },
  '8': { subcategory: 'Pork', brand: 'B&M' },
  '9': { subcategory: 'Steaks & Chops', brand: 'Julius Silvert' },
  '10': { subcategory: 'Pork', brand: 'B&M' },
  'beef-1': { subcategory: 'Steaks & Chops', brand: 'Julius Silvert' },
  'beef-2': { subcategory: 'Steaks & Chops', brand: 'B&M' },
  'beef-3': { subcategory: 'Steaks & Chops', brand: 'B&M' },
  'beef-4': { subcategory: 'Roasts & Braising', brand: 'Julius Silvert' },
  'beef-5': { subcategory: 'Burgers & Grinds', brand: 'B&M' },
  'beef-6': { subcategory: 'Roasts & Braising', brand: 'Julius Silvert' },
  'chicken-1': { subcategory: 'Breast & Cuts', brand: 'Joyce Farms' },
  'chicken-2': { subcategory: 'Whole Bird', brand: 'Julius Silvert' },
  'chicken-3': { subcategory: 'Legs & Thighs', brand: 'Julius Silvert' },
  'chicken-4': { subcategory: 'Wings', brand: 'B&M' },
  'dairy-1': { subcategory: 'Milk & Cream', brand: 'Julius Silvert' },
  'dairy-2': { subcategory: 'Milk & Cream', brand: 'B&M' },
  'dairy-3': { subcategory: 'Milk & Cream', brand: 'Julius Silvert' },
  'fish-1': { subcategory: 'Salmon & Trout', brand: 'Julius Silvert' },
  'fish-2': { subcategory: 'Tuna & Sushi', brand: 'B&M' },
  'fish-3': { subcategory: 'White Fish', brand: 'Julius Silvert' },
  'oil-1': { subcategory: 'Olive Oil', brand: 'Julius Silvert' },
  'oil-2': { subcategory: 'Olive Oil', brand: 'B&M' },
};

export function getProductFacets(product: CatalogProduct): ProductFacets {
  return PRODUCT_FACETS[product.id] ?? { subcategory: 'Other', brand: 'Julius Silvert' };
}

export function countFacets(products: CatalogProduct[]) {
  const subcategory = new Map<string, number>();
  const brand = new Map<string, number>();
  for (const p of products) {
    const f = getProductFacets(p);
    subcategory.set(f.subcategory, (subcategory.get(f.subcategory) ?? 0) + 1);
    brand.set(f.brand, (brand.get(f.brand) ?? 0) + 1);
  }
  const sortEntries = (m: Map<string, number>) =>
    [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  return {
    subcategories: sortEntries(subcategory),
    brands: sortEntries(brand),
  };
}

/** Display title for /category/:slug pages */
export const CATEGORY_SLUG_TITLE: Record<string, string> = {
  beef: 'Beef',
  chicken: 'Chicken',
  'milk-cream': 'Milk & Cream',
  'fresh-fish': 'Fresh Fish',
  'olive-oils': 'Olive Oils',
};

const HOME_CATALOG: CatalogProduct[] = [
  {
    id: '1',
    name: 'High Choice Center Cut Filet',
    description: 'Premium center-cut beef tenderloin, trimmed for consistent portioning and exceptional tenderness.',
    itemNumber: '1238',
    caseInfo: '48 lb case',
    stock: 8,
    casePrice: 64.2,
    pcPrice: 12.5,
    perLb: 1.34,
    image: 'https://images.unsplash.com/photo-1677607219966-22fbfa433667?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    unit: 'lb',
    category: 'Beef',
  },
  {
    id: '2',
    name: 'Pillow Pack Thick Cut Bacon',
    description: 'Thick-cut bacon, pillow-packed for foodservice. Smoky flavor and consistent slice count.',
    itemNumber: 'TT234',
    caseInfo: '48 lb case',
    stock: 15,
    casePrice: 39,
    pcPrice: 8.5,
    perLb: 0.81,
    image: 'https://images.unsplash.com/photo-1608475861875-89c94a8dd8f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    unit: 'lb',
    category: 'Beef',
  },
  {
    id: '3',
    name: 'High Choice Beef Tenderloin',
    description: 'Whole beef tenderloin, high choice grade. Ideal for roasting or portioning into steaks.',
    itemNumber: 'T238',
    caseInfo: '10 lb case',
    stock: 3,
    casePrice: 565.5,
    pcPrice: 56.55,
    perLb: 56.55,
    image: 'https://images.unsplash.com/photo-1677607219966-22fbfa433667?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    unit: 'lb',
    category: 'Beef',
  },
  {
    id: '4',
    name: 'Striploin Steak',
    description: 'Center-cut striploin with balanced marbling. Great for grilling or broiling.',
    itemNumber: 'T238',
    caseInfo: '12 lb case',
    stock: 12,
    casePrice: 283.6,
    pcPrice: 28.36,
    perLb: 23.63,
    image: 'https://images.unsplash.com/photo-1677607219966-22fbfa433667?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    unit: 'lb',
    category: 'Beef',
  },
  {
    id: '5',
    name: 'Joyce Farms Bone-In Boneless Skinless Chicken Breast',
    description: 'Premium chicken breast from Joyce Farms. Raised with care for consistent quality.',
    itemNumber: 'T.B',
    caseInfo: '12 lb case',
    stock: 18,
    casePrice: 84.95,
    pcPrice: 8.5,
    perLb: 7.08,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    unit: 'lb',
    category: 'Chicken',
  },
  {
    id: '6',
    name: 'High Choice Ribeye',
    description: 'Well-marbled ribeye steaks for the center of the plate.',
    itemNumber: 'TT238',
    caseInfo: 'Sold by case',
    stock: 20,
    casePrice: 194.6,
    pcPrice: 24.99,
    perLb: 12.5,
    image: 'https://images.unsplash.com/photo-1690983321402-35ff91692b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    unit: 'EACH',
    category: 'Beef',
  },
  {
    id: '7',
    name: 'Beef Tenderloin Tips',
    description: 'Versatile tenderloin tips for stroganoff, kebabs, or quick-sear applications.',
    itemNumber: 'TT238',
    caseInfo: 'Case',
    stock: 18,
    casePrice: 128.4,
    pcPrice: 18.99,
    perLb: 8.2,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    unit: 'CASE',
    category: 'Beef',
  },
  {
    id: '8',
    name: 'Compact Duroc Pork',
    description: 'Duroc pork with rich flavor and fine marbling for premium menus.',
    itemNumber: 'TT23',
    caseInfo: 'Case',
    stock: 14,
    casePrice: 399.6,
    pcPrice: 45,
    perLb: 6.5,
    image: 'https://images.unsplash.com/photo-1592877186734-6e558cf0dfaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    unit: 'CWTH/LB',
    category: 'Beef',
    priceLabel: 'E-CWTH/LB',
  },
  {
    id: '9',
    name: 'Striploin Steak (CWTH)',
    description: 'Striploin graded for foodservice portion programs.',
    itemNumber: 'TT238',
    caseInfo: 'Case',
    stock: 10,
    casePrice: 365.98,
    pcPrice: 42,
    perLb: 18,
    image: 'https://images.unsplash.com/photo-1677607219966-22fbfa433667?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    unit: 'CWTH/LB',
    category: 'Beef',
    priceLabel: 'E-CWTH/LB',
  },
  {
    id: '10',
    name: 'Duroc Pork',
    description: 'Heritage Duroc pork for roasting and braising.',
    itemNumber: 'TT1',
    caseInfo: 'Case',
    stock: 12,
    casePrice: 365.98,
    pcPrice: 40,
    perLb: 7.2,
    image: 'https://images.unsplash.com/photo-1592877186734-6e558cf0dfaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    unit: 'CASE',
    category: 'Beef',
    priceLabel: 'EXC-UNO',
  },
];

export const ALL_CATALOG_PRODUCTS: CatalogProduct[] = [
  // Beef products
  {
    id: 'beef-1',
    name: 'Prime Ribeye Steaks, 4 x 12oz',
    description: 'USDA Prime grade ribeye steaks, well-marbled for maximum flavor and tenderness. Perfect for grilling or pan-searing.',
    itemNumber: 'JS-BEEF-0001',
    caseInfo: '48 lb case (4 × 12 lb)',
    stock: 5,
    casePrice: 64.99,
    pcPrice: 28.99,
    perLb: 1.083,
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500',
    unit: 'lb',
    category: 'Beef'
  },
  {
    id: 'beef-2',
    name: 'Angus Beef Tenderloin, 2 lb',
    description: 'Premium Angus beef tenderloin, the most tender cut. Ideal for filet mignon or beef wellington.',
    itemNumber: 'JS-BEEF-0002',
    caseInfo: '24 lb case (12 × 2 lb)',
    stock: 12,
    casePrice: 245.99,
    pcPrice: 22.99,
    perLb: 11.50,
    image: '/images/products/beef-2-angus-tenderloin.png',
    gallery: [
      '/images/products/beef-2-angus-tenderloin.png',
      '/images/products/beef-2-angus-tenderloin-alt.png',
    ],
    unit: 'lb',
    category: 'Beef'
  },
  {
    id: 'beef-3',
    name: 'Wagyu Beef Striploin, 12 oz',
    description: 'Japanese A5 Wagyu beef striploin with exceptional marbling. A luxury dining experience.',
    itemNumber: 'JS-BEEF-0003',
    caseInfo: '36 lb case (48 × 12 oz)',
    stock: 3,
    casePrice: 489.99,
    pcPrice: 89.99,
    perLb: 13.61,
    image: '/images/products/beef-3-wagyu-alt2.jpg',
    gallery: [
      '/images/products/beef-3-wagyu-alt2.jpg',
      '/images/products/beef-3-wagyu-hero.jpg',
    ],
    unit: 'lb',
    category: 'Beef'
  },
  {
    id: 'beef-4',
    name: 'Beef Short Ribs, 3 lb',
    description: 'Bone-in beef short ribs, perfect for braising or slow cooking. Rich, beefy flavor.',
    itemNumber: 'JS-BEEF-0004',
    caseInfo: '30 lb case (10 × 3 lb)',
    stock: 18,
    casePrice: 189.99,
    pcPrice: 24.99,
    perLb: 6.33,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500',
    unit: 'lb',
    category: 'Beef'
  },
  {
    id: 'beef-5',
    name: 'Ground Beef 80/20, 5 lb',
    description: 'Fresh ground beef with 80% lean meat, 20% fat ratio. Perfect for burgers, meatballs, and tacos.',
    itemNumber: 'JS-BEEF-0005',
    caseInfo: '50 lb case (10 × 5 lb)',
    stock: 25,
    casePrice: 179.99,
    pcPrice: 22.99,
    perLb: 3.60,
    image: 'https://images.unsplash.com/photo-1603729362753-f8162ac6c3df?w=500',
    unit: 'lb',
    category: 'Beef'
  },
  {
    id: 'beef-6',
    name: 'Beef Brisket, Whole',
    description: 'Whole beef brisket, perfect for smoking or slow roasting. Full of flavor and ideal for BBQ.',
    itemNumber: 'JS-BEEF-0006',
    caseInfo: '60 lb case (6 × 10 lb)',
    stock: 8,
    casePrice: 329.99,
    pcPrice: 65.99,
    perLb: 5.50,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500',
    unit: 'lb',
    category: 'Beef'
  },
  // Chicken products
  {
    id: 'chicken-1',
    name: 'Organic Chicken Breast, 3 lb',
    description: 'Boneless, skinless organic chicken breasts. Raised without antibiotics or hormones.',
    itemNumber: 'JS-CHKN-0001',
    caseInfo: '30 lb case (10 × 3 lb)',
    stock: 15,
    casePrice: 149.99,
    pcPrice: 18.99,
    perLb: 5.00,
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500',
    unit: 'lb',
    category: 'Chicken'
  },
  {
    id: 'chicken-2',
    name: 'Whole Roasting Chicken, 4.5 lb',
    description: 'Fresh whole chicken, perfect for roasting. Average weight 4-5 lbs.',
    itemNumber: 'JS-CHKN-0002',
    caseInfo: '45 lb case (10 × 4.5 lb)',
    stock: 20,
    casePrice: 119.99,
    pcPrice: 14.99,
    perLb: 2.67,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500',
    unit: 'lb',
    category: 'Chicken'
  },
  {
    id: 'chicken-3',
    name: 'Chicken Thighs, 2 lb',
    description: 'Bone-in, skin-on chicken thighs. Juicy and flavorful, great for grilling or braising.',
    itemNumber: 'JS-CHKN-0003',
    caseInfo: '20 lb case (10 × 2 lb)',
    stock: 22,
    casePrice: 79.99,
    pcPrice: 9.99,
    perLb: 4.00,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500',
    unit: 'lb',
    category: 'Chicken'
  },
  {
    id: 'chicken-4',
    name: 'Chicken Wings, 5 lb',
    description: 'Fresh chicken wings, perfect for buffalo wings, grilling, or baking.',
    itemNumber: 'JS-CHKN-0004',
    caseInfo: '50 lb case (10 × 5 lb)',
    stock: 10,
    casePrice: 139.99,
    pcPrice: 16.99,
    perLb: 2.80,
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500',
    unit: 'lb',
    category: 'Chicken'
  },
  // Dairy products
  {
    id: 'dairy-1',
    name: 'Whole Milk, 1 Gallon',
    description: 'Fresh whole milk, 3.25% milkfat. Rich and creamy, perfect for drinking or cooking.',
    itemNumber: 'JS-DRYA-0001',
    caseInfo: 'Case of 4 gallons',
    stock: 30,
    casePrice: 19.99,
    pcPrice: 5.99,
    perLb: 0.46,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500',
    unit: 'gal',
    category: 'Dairy'
  },
  {
    id: 'dairy-2',
    name: 'Heavy Cream, 1 Quart',
    description: 'Premium heavy whipping cream, 36% milkfat. Perfect for whipping, sauces, and desserts.',
    itemNumber: 'JS-DRYA-0002',
    caseInfo: 'Case of 12 quarts',
    stock: 18,
    casePrice: 69.99,
    pcPrice: 6.99,
    perLb: 0.87,
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500',
    unit: 'qt',
    category: 'Dairy'
  },
  {
    id: 'dairy-3',
    name: 'Half and Half, 1 Quart',
    description: 'Blend of milk and cream, perfect for coffee, tea, and cooking.',
    itemNumber: 'JS-DRYA-0003',
    caseInfo: 'Case of 12 quarts',
    stock: 25,
    casePrice: 49.99,
    pcPrice: 4.99,
    perLb: 0.62,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500',
    unit: 'qt',
    category: 'Dairy'
  },
  // Seafood products
  {
    id: 'fish-1',
    name: 'Atlantic Salmon Fillet, 6 oz portions',
    description: 'Fresh Atlantic salmon fillets, skin-on. Rich in omega-3 fatty acids. Perfect for grilling or baking.',
    itemNumber: 'JS-FISH-0001',
    caseInfo: '15 lb case (40 × 6 oz)',
    stock: 7,
    casePrice: 189.99,
    pcPrice: 5.99,
    perLb: 12.67,
    image: 'https://images.unsplash.com/photo-1574781330855-d0db70932b67?w=500',
    unit: 'lb',
    category: 'Seafood'
  },
  {
    id: 'fish-2',
    name: 'Yellowfin Tuna Steak, 8 oz',
    description: 'Sushi-grade yellowfin tuna steaks. Perfect for searing or sashimi.',
    itemNumber: 'JS-FISH-0002',
    caseInfo: '20 lb case (40 × 8 oz)',
    stock: 4,
    casePrice: 279.99,
    pcPrice: 8.99,
    perLb: 14.00,
    image: 'https://images.unsplash.com/photo-1580959375944-0b7b35089cff?w=500',
    unit: 'lb',
    category: 'Seafood'
  },
  {
    id: 'fish-3',
    name: 'Cod Fillets, 2 lb portions',
    description: 'Fresh Atlantic cod fillets, boneless. Mild flavor, perfect for fish and chips or baking.',
    itemNumber: 'JS-FISH-0003',
    caseInfo: '20 lb case (10 × 2 lb)',
    stock: 12,
    casePrice: 159.99,
    pcPrice: 19.99,
    perLb: 8.00,
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500',
    unit: 'lb',
    category: 'Seafood'
  },
  // Oil products
  {
    id: 'oil-1',
    name: 'Extra Virgin Olive Oil, 1 Liter',
    description: 'Premium Italian extra virgin olive oil, cold-pressed. Perfect for salads and finishing dishes.',
    itemNumber: 'JS-OILS-0001',
    caseInfo: 'Case of 12 bottles',
    stock: 20,
    casePrice: 189.99,
    pcPrice: 18.99,
    perLb: 0.54,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500',
    unit: 'L',
    category: 'Oils'
  },
  {
    id: 'oil-2',
    name: 'Spanish Olive Oil, 750ml',
    description: 'High-quality Spanish olive oil with fruity notes. Great for cooking and dipping.',
    itemNumber: 'JS-OILS-0002',
    caseInfo: 'Case of 12 bottles',
    stock: 15,
    casePrice: 149.99,
    pcPrice: 14.99,
    perLb: 0.51,
    image: 'https://images.unsplash.com/photo-1608181980355-2ae2d2d01dbd?w=500',
    unit: 'L',
    category: 'Oils'
  }
].concat(HOME_CATALOG);

export const categoryProducts: Record<string, CatalogProduct[]> = {
  beef: ALL_CATALOG_PRODUCTS.filter((p) => p.category === 'Beef'),
  chicken: ALL_CATALOG_PRODUCTS.filter((p) => p.category === 'Chicken'),
  'milk-cream': ALL_CATALOG_PRODUCTS.filter((p) => p.category === 'Dairy'),
  'fresh-fish': ALL_CATALOG_PRODUCTS.filter((p) => p.category === 'Seafood'),
  'olive-oils': ALL_CATALOG_PRODUCTS.filter((p) => p.category === 'Oils'),
};

export function getProductById(id: string): CatalogProduct | undefined {
  return ALL_CATALOG_PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(product: CatalogProduct, limit = 4): CatalogProduct[] {
  return ALL_CATALOG_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, limit);
}

export const DEPARTMENT_BY_CATEGORY: Record<string, { slug: string; label: string }> = {
  Beef: { slug: 'beef', label: 'Meat & Poultry' },
  Chicken: { slug: 'chicken', label: 'Meat & Poultry' },
  Dairy: { slug: 'milk-cream', label: 'Dairy & Eggs' },
  Seafood: { slug: 'fresh-fish', label: 'Seafood' },
  Oils: { slug: 'olive-oils', label: 'Oils & Vinegars' },
};

/** Home page carousels */
export const recentPurchases = ALL_CATALOG_PRODUCTS.filter((p) =>
  ['1', '2', '3', '4', '5'].includes(p.id)
);
export const centerOfPlate = ALL_CATALOG_PRODUCTS.filter((p) =>
  ['6', '7', '8', '9', '10'].includes(p.id)
);
