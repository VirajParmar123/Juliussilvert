import type { CatalogProduct } from '../data/catalog';
import { getProductFacets } from '../data/catalog';

export type SortByValue = 'position' | 'name' | 'sku' | 'price' | 'brand';

export function sortProducts(
  list: CatalogProduct[],
  sortBy: SortByValue,
  positionOrder: Map<string, number>
): CatalogProduct[] {
  const copy = [...list];
  switch (sortBy) {
    case 'position':
      return copy.sort(
        (a, b) => (positionOrder.get(a.id) ?? 0) - (positionOrder.get(b.id) ?? 0)
      );
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'sku':
      return copy.sort((a, b) =>
        a.itemNumber.localeCompare(b.itemNumber, undefined, { numeric: true })
      );
    case 'price':
      return copy.sort((a, b) => a.casePrice - b.casePrice);
    case 'brand':
      return copy.sort((a, b) =>
        getProductFacets(a).brand.localeCompare(getProductFacets(b).brand)
      );
    default:
      return copy;
  }
}
