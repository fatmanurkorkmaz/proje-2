'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductActions({ product }: { product: any }) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { t, locale } = useLanguage();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <button
                onClick={handleAddToCart}
                className="flex-1 bg-secondary text-white py-4 font-medium hover:bg-secondary/90 transition-colors uppercase tracking-wider text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={product.stock === 0}
            >
                {added ? t('cart.added') : product.stock > 0 ? t('cart.add') : t('cart.out_of_stock')}
            </button>
            <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 border transition-all duration-300 ${isInWishlist(product.id) ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200'}`}
                title={isInWishlist(product.id) ? t('favorites.remove') : t('favorites.add')}
            >
                <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </button>
        </div>
    );
}
