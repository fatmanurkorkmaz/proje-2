'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function ProductActions({ product }: { product: any }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <>
            <button
                onClick={handleAddToCart}
                className="flex-1 bg-secondary text-white py-4 font-medium hover:bg-secondary/90 transition-colors uppercase tracking-wider text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={!product.inStock}
            >
                {added ? 'Sepete Eklendi' : product.inStock ? 'Sepete Ekle' : 'Stok Tükendi'}
            </button>
            <button className="p-4 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                <span className="sr-only">Favorilere Ekle</span>
                <Heart className="w-6 h-6" />
            </button>
        </>
    );
}
