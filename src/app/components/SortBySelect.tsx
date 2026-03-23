import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import type { SortByValue } from '../utils/productSort';

const OPTIONS: { value: SortByValue; label: string }[] = [
  { value: 'position', label: 'Position' },
  { value: 'name', label: 'Product Name' },
  { value: 'sku', label: 'SKU' },
  { value: 'price', label: 'Price' },
  { value: 'brand', label: 'Brand' },
];

export type SortBySelectProps = {
  value: SortByValue;
  onValueChange: (value: SortByValue) => void;
};

export function SortBySelect({ value, onValueChange }: SortBySelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onValueChange(v as SortByValue)}
    >
      <SelectTrigger
        size="default"
        className="h-10 w-[min(100%,min(280px,100vw-3rem))] min-w-[220px] shrink-0 border border-gray-900/25 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50/80 data-[state=open]:border-gray-900/40"
      >
        <div className="flex min-w-0 flex-1 items-center gap-1.5 text-left">
          <span className="shrink-0 text-gray-600">Sort By:</span>
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent align="end" className="border border-gray-200 shadow-lg">
        {OPTIONS.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="cursor-pointer pl-2 focus:bg-blue-600 focus:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:text-white"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
