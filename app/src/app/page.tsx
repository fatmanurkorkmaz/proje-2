import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Mail } from 'lucide-react';
import { products } from '@/data/products';

export default function Home() {
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/20 z-10" />
          <img
            src="https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Jewelry"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-4xl space-y-6">
          <span className="text-white font-bold tracking-[0.2em] uppercase animate-fade-in-up">Yeni Koleksiyon</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white font-medium leading-tight animate-fade-in-up delay-100">
            Kendi Tarzınızda<br />Mükemmel Zarafet
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Avcı Kuyumculuk'u keşfedin. Modern kadın için tasarlanmış, geleneksel işçilikle üretilmiş mücevherler.
          </p>
          <div className="pt-8 animate-fade-in-up delay-300">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-secondary-foreground px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-secondary transition-colors duration-300"
            >
              Koleksiyonu Keşfet <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals - Dynamic */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Yeni Gelenler</h2>
            <p className="text-muted-foreground">En yeni ve en özel parçalarımızı keşfedin.</p>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-secondary hover:text-primary transition-colors">
            Tümünü Gör <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="bg-secondary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[4/5] group overflow-hidden cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=1000"
                alt="Gelin Koleksiyonu"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-sm font-bold tracking-widest uppercase mb-2">Ölümsüz Aşk</span>
                <h3 className="text-4xl font-serif">Gelin Koleksiyonu</h3>
                <Link href="/products?category=Rings" className="mt-6 border-b border-white pb-1 hover:text-primary hover:border-primary transition-colors">Şimdi Alışveriş Yap</Link>
              </div>
            </div>
            <div className="space-y-8">
              <div className="relative aspect-[16/9] group overflow-hidden cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb052254?auto=format&fit=crop&q=80&w=1000"
                  alt="Günlük Lüks"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-serif mb-2">Günlük Lüks</h3>
                  <Link href="/products?category=Necklaces" className="text-sm font-bold tracking-wider uppercase flex items-center gap-2 hover:text-primary transition-colors">
                    Keşfet <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="bg-white p-12 text-center border border-primary/10 h-full flex flex-col justify-center items-center">
                <h3 className="text-3xl font-serif mb-4 text-foreground">Özel Tasarım Servisi</h3>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                  Hayalinizdeki mücevheri gerçeğe dönüştürün. Usta zanaatkarlarımızla size özel tasarımlar yapın.
                </p>
                <Link href="/about" className="bg-secondary text-secondary-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-secondary/90 transition-colors">
                  Randevu Al
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 max-w-3xl text-center">
        <Mail className="w-8 h-8 mx-auto mb-6 text-primary" />
        <h2 className="text-3xl font-serif font-bold mb-4">AVCI Kuyumculuk Dünyasına Katılın</h2>
        <p className="text-muted-foreground mb-8">Yeni koleksiyonlar, özel etkinlikler ve stil önerilerinden ilk siz haberdar olun.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="E-posta adresiniz"
            className="flex-1 bg-gray-50 border border-gray-200 px-6 py-4 outline-none focus:border-primary transition-colors"
          />
          <button className="bg-secondary text-secondary-foreground px-8 py-4 font-bold uppercase tracking-wider hover:bg-secondary/90 transition-colors">
            Abone Ol
          </button>
        </div>
      </section>
    </div>
  );
}
