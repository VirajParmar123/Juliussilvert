import { ChevronRight } from 'lucide-react';

export function BrandSection() {
  // Mock brand names - in a real app these would be actual brand logos
  const brands = [
    'Scranton', 'Binders', 'Calabro', 'Rokbromm', 'Amata', 'Polar',
    'Hoff\'s', 'Wagner', 'Casa', 'Leona', 'Crema', 'CafeTraity',
    'MainHaus', 'Saporita', 'Alpine', 'Tower', 'Jade', 'Starcom'
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-900">Shop by Brand</h2>
          <button className="flex items-center gap-2 text-left text-sm text-gray-700 hover:text-gray-900">
            Stay up to date with the latest news.
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        <div className="text-xs text-gray-500 mb-4">
          All others No-Alex Use awards. ♥ ⭐
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 sm:gap-6">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="aspect-square bg-white rounded-lg border border-gray-200 flex items-center justify-center p-3 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="text-center text-xs font-semibold text-gray-700 uppercase">
                {brand}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
