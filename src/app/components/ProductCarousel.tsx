import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useRef } from 'react';

interface Product {
  id: string;
  image: string;
  name: string;
  itemNumber: string;
  wasmNumber: string;
  price: number;
  unit: string;
  priceLabel?: string;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export function ProductCarousel({ title, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const w = scrollRef.current.clientWidth || 360;
      const cardWidth = Math.min(280, w * 0.72);
      const gap = 16;
      const scrollAmount = cardWidth * 2 + gap;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-900">{title}</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="grid grid-flow-col auto-cols-[min(280px,calc(100vw-2.5rem))] sm:auto-cols-[280px] gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth items-stretch pb-1 -mx-1 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
