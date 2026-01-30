'use client';

import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Mail } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const { products } = useProducts();
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
          <span className="text-white font-bold tracking-[0.2em] uppercase animate-fade-in-up">
            {t('hero.new_collection')}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white font-medium leading-tight animate-fade-in-up delay-100 whitespace-pre-line">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto animate-fade-in-up delay-200">
            {t('hero.subtitle')}
          </p>
          <div className="pt-8 animate-fade-in-up delay-300">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-secondary-foreground px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-secondary transition-colors duration-300"
            >
              {t('hero.cta')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals - Dynamic */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-2">{t('sections.new_arrivals')}</h2>
            <p className="text-muted-foreground">{t('sections.new_arrivals_sub')}</p>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-secondary hover:text-primary transition-colors">
            {t('sections.view_all')} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Bridal Collection */}
            <div className="relative aspect-[4/5] lg:aspect-[3/4] group overflow-hidden cursor-pointer shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=1000"
                alt={t('sections.bridal_title')}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-x-0 bottom-0 p-12 text-center text-white">
                <span className="text-sm font-bold tracking-[0.4em] uppercase mb-4 block animate-fade-in">{t('sections.bridal_tag')}</span>
                <h3 className="text-4xl md:text-5xl font-serif mb-6">{t('sections.bridal_title')}</h3>
                <Link
                  href="/products?category=Rings"
                  className="inline-block border border-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                >
                  {t('sections.shop_now')}
                </Link>
              </div>
            </div>

            {/* Everyday Luxury */}
            <div className="relative aspect-[4/5] lg:aspect-[3/4] group overflow-hidden cursor-pointer shadow-2xl">
              <img
                src="/images/collections/everyday_luxury.png"
                alt={t('sections.everyday_title')}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-x-0 bottom-0 p-12 text-center text-white">
                <span className="text-sm font-bold tracking-[0.4em] uppercase mb-4 block animate-fade-in">{t('sections.everyday_tag')}</span>
                <h3 className="text-4xl md:text-5xl font-serif mb-6">{t('sections.everyday_title')}</h3>
                <Link
                  href="/products?category=Necklaces"
                  className="inline-block border border-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                >
                  {t('sections.shop_now')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 max-w-3xl text-center">
        <Mail className="w-8 h-8 mx-auto mb-6 text-primary" />
        <h2 className="text-3xl font-serif font-bold mb-4">{t('sections.newsletter_title')}</h2>
        <p className="text-muted-foreground mb-8">{t('sections.newsletter_sub')}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder={t('sections.newsletter_placeholder')}
            className="flex-1 bg-gray-50 border border-gray-200 px-6 py-4 outline-none focus:border-primary transition-colors"
          />
          <button className="bg-secondary text-secondary-foreground px-8 py-4 font-bold uppercase tracking-wider hover:bg-secondary/90 transition-colors">
            {t('sections.newsletter_button')}
          </button>
        </div>
      </section>
    </div>
  );
}
