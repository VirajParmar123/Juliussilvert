import { TopBanner } from '../components/TopBanner';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { WeatherAlert } from '../components/WeatherAlert';
import { ProductCarousel } from '../components/ProductCarousel';
import { OrderGuideSection } from '../components/OrderGuideSection';
import { PromoBanners } from '../components/PromoBanners';
import { BrandSection } from '../components/BrandSection';
import { Footer } from '../components/Footer';
import { centerOfPlate as centerRaw, recentPurchases as recentRaw } from '../data/catalog';
import type { CatalogProduct } from '../data/catalog';

function toCarouselProduct(p: CatalogProduct) {
  return {
    ...p,
    price: p.casePrice,
    wasmNumber: p.itemNumber,
  };
}

export function HomePage() {
  const recentPurchases = recentRaw.map(toCarouselProduct);
  const centerOfPlate = centerRaw.map(toCarouselProduct);

  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <div className="sticky top-0 z-50">
        <Header />
        <Navigation />
      </div>
      <main id="main-content" tabIndex={-1} className="outline-none">
      <HeroSection />
      <WeatherAlert />
      
      <ProductCarousel 
        title="Recent Purchases" 
        products={recentPurchases} 
      />
      
      <OrderGuideSection />
      
      <ProductCarousel 
        title="Center of the Plate Proteins" 
        products={centerOfPlate} 
      />
      
      <PromoBanners 
        deliveryImage="https://images.unsplash.com/photo-1646314231094-773a6d2822e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHRydWNrJTIwZm9vZHxlbnwxfHx8fDE3NzM4NTMyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
      />
      
      <BrandSection />
      </main>
      
      <Footer />
    </div>
  );
}