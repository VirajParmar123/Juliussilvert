import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { HERO_CAROUSEL_SRCS } from '../constants/heroCarousel';

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_CAROUSEL_SRCS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const src = HERO_CAROUSEL_SRCS[currentImage];

  return (
    <section
      className="relative bg-gray-900 text-white overflow-hidden min-h-[320px] sm:min-h-[400px]"
      aria-label="Featured professional kitchen imagery"
    >
      {/* Single image — avoids loading 5 full hero assets on first paint */}
      <div className="absolute inset-0">
        <img
          key={src}
          src={src}
          alt=""
          width={1920}
          height={1080}
          sizes="100vw"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover motion-safe:transition-opacity motion-safe:duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 flex flex-wrap justify-end gap-2 max-w-[calc(100%-2rem)]">
        {HERO_CAROUSEL_SRCS.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentImage(index)}
            className={`h-2 rounded-full transition-all motion-reduce:transition-none ${
              index === currentImage ? 'bg-white w-8' : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1} of ${HERO_CAROUSEL_SRCS.length}`}
            aria-pressed={index === currentImage}
          />
        ))}
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight text-white">
            Built for Professional Kitchens.
          </h2>
          <p className="text-lg text-gray-100 mb-8">
            Fast ordering. ERP-integrated pricing. Reliable inventory.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/category/beef"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#6b8e6f] hover:bg-[#5a7a5e] text-white rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Shop Center of Plate
              <ChevronRight className="w-4 h-4" aria-hidden />
            </Link>
            <Link
              to="/account?tab=order-guide"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View Order Guide
              <ChevronRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
