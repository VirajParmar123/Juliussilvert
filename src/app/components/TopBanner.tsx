import { Truck } from 'lucide-react';

export function TopBanner() {
  return (
    <div className="bg-[#e8e5f7] text-gray-900 py-2">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-start sm:items-center justify-center gap-2 text-center text-xs sm:text-sm">
          <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 shrink-0 mt-0.5 sm:mt-0" aria-hidden />
          <p className="leading-snug">
            <span className="font-medium">Order cut off is 6:00PM on 3/03/26 for 3/4/26 delivery.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
