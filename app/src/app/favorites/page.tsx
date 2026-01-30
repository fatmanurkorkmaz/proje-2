'use client';

import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';

export default function FavoritesPage() {
    const { favorites } = useWishlist();
    const { t, locale } = useLanguage();

    return (
        <div className="container mx-auto px-4 py-12 lg:py-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                    <h1 className="text-4xl lg:text-5xl font-serif font-bold text-secondary mb-4">
                        {t('favorites.title')}
                    </h1>
                    <p className="text-muted-foreground max-w-xl">
                        {t('favorites.subtitle')}
                    </p>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/5 px-6 py-3 rounded-full">
                    {favorites.length} {t('favorites.items')}
                </div>
            </div>

            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {favorites.map((product) => (
                        <ProductCard key={product.id} product={product as any} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-32 bg-secondary/[0.02] border border-dashed border-secondary/10 rounded-sm">
                    <Heart className="w-12 h-12 mx-auto mb-6 text-secondary/20" />
                    <h3 className="text-xl font-serif font-medium text-secondary mb-3">
                        {t('favorites.empty')}
                    </h3>
                    <p className="text-muted-foreground mb-8 max-w-xs mx-auto text-sm">
                        {t('favorites.empty_sub')}
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors"
                    >
                        {t('favorites.explore')} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            )}
        </div>
    );
}
