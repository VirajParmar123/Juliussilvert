import { Toaster } from 'sonner';
import { Check } from 'lucide-react';

export function CartToaster() {
  return (
    <Toaster
      position="bottom-right"
      theme="light"
      closeButton={false}
      duration={2000}
      gap={12}
      offset={{ right: 16, bottom: 16 }}
      className="!z-[2147483647]"
      toastOptions={{
        style: {
          background: '#ffffff',
          color: '#111827',
          border: '1px solid #e5e7eb',
          boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
        },
        classNames: {
          toast:
            'group flex w-full max-w-[min(100vw-2rem,24rem)] items-start gap-3 rounded-xl !bg-white !p-4 ' +
            '!border !border-gray-200 !shadow-xl border-l-[6px] !border-l-brand-header',
          title: '!text-base !font-semibold !text-gray-900',
          description: '!text-sm !font-normal !text-gray-600 !mt-0.5',
          icon: '!mt-0.5 !size-auto',
          success: '!bg-transparent !border-0 !p-0',
        },
      }}
      icons={{
        success: (
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-gray-900 bg-white"
            aria-hidden
          >
            <Check className="h-4 w-4 text-gray-900" strokeWidth={2.5} />
          </span>
        ),
      }}
    />
  );
}
