import { Snowflake } from 'lucide-react';

export function WeatherAlert() {
  return (
    <div className="bg-[#d4dff5] border-l-4 border-[#5b7fc7]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-start gap-3 sm:items-center">
          <Snowflake className="w-5 h-5 text-[#5b7fc7] flex-shrink-0 mt-0.5 sm:mt-0" aria-hidden />
          <p className="text-sm text-gray-800 leading-snug">
            <span className="font-semibold">WEATHER ALERT:</span> Snow is forecasted. Check back for updates as conditions develop.
          </p>
        </div>
      </div>
    </div>
  );
}
