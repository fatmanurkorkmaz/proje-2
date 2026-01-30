'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    isNew?: boolean;
    description?: string;
    material?: string;
    inStock?: boolean;
}

const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product as any);
    };

    return (
        <div className="group flex flex-col h-full">
            <div className="relative aspect-square overflow-hidden bg-secondary/5 mb-4">
                {product.isNew && (
                    <span className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                        Sınırlı Üretim
                    </span>
                )}
                <Link href={`/products/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
            </div>

            <div className="flex flex-col flex-1 space-y-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">{product.category}</span>
                <h3 className="text-base font-serif font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/products/${product.id}`}>
                        {product.name}
                    </Link>
                </h3>
                <p className="text-lg font-medium text-foreground">{product.price.toLocaleString()} ₺</p>

                <button
                    onClick={handleAddToCart}
                    className="mt-auto w-full flex items-center justify-center gap-2 bg-secondary/5 hover:bg-primary hover:text-primary-foreground text-secondary font-medium py-3 rounded-sm transition-all duration-300 cursor-pointer"
                >
                    <ShoppingCart className="w-4 h-4" /> Sepete Ekle
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
