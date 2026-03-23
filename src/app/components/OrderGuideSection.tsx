import { Search } from 'lucide-react';
import { Link } from 'react-router';

export function OrderGuideSection() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
            <h2 className="text-xl sm:text-2xl font-medium text-gray-900">Shop Your Order Guide</h2>
            <span className="text-lg font-semibold text-gray-900">527</span>
            <span className="text-sm text-gray-600">items</span>
          </div>

          <div className="flex flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
            <Link
              to="/account?tab=order-guide"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#6b8e6f] hover:bg-[#5a7a5e] text-white rounded-md transition-colors text-sm font-medium"
            >
              View Guide
            </Link>
            <Link
              to="/account?tab=order-guide&new=1"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-md transition-colors text-sm font-medium"
            >
              Create Requisition List
            </Link>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search within your order guide"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm placeholder:text-gray-500"
          />
        </div>
      </div>
    </section>
  );
}