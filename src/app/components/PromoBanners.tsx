import { ChevronRight } from 'lucide-react';

interface PromoBannersProps {
  deliveryImage: string;
}

export function PromoBanners({ deliveryImage }: PromoBannersProps) {
  return (
    <section className="py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="relative bg-brand-header text-white rounded-lg overflow-hidden min-h-[220px] h-[220px] sm:h-[280px]">
            <img 
              src={deliveryImage} 
              alt="Silvert delivery" 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="relative p-5 sm:p-8 h-full flex flex-col justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-3xl font-semibold mb-2 sm:mb-3">SILVERT EXCLUSIVES</h3>
                <p className="text-gray-200 max-w-sm text-sm sm:text-base">
                  Exclusive, high-quality products curated just for our customers.
                </p>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-100 text-gray-900 rounded-md transition-colors self-start">
                SHOP
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
