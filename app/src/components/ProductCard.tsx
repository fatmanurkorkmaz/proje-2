'use client';

import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useWishlist } from '@/context/WishlistContext';

interface Product {
    id: string;
    nameTr: string;
    nameEn: string;
    descriptionTr?: string;
    descriptionEn?: string;
    price: number;
    weight?: number;
    image: string;
    category: string;
    isNew?: boolean;
    stock: number;
}

const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { t, locale } = useLanguage();

    const name = locale === 'tr' ? product.nameTr : product.nameEn;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product as any);
    };

    return (
        <div className="group flex flex-col h-full">
            <div className="relative aspect-square overflow-hidden bg-secondary/5 mb-4 border border-secondary/5">
                {product.isNew && product.stock > 0 && (
                    <span className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest shadow-xl">
                        {t('sections.new_arrivals')}
                    </span>
                )}

                {product.stock === 0 && (
                    <div className="absolute inset-0 z-20 bg-white/40 backdrop-blur-[2px] flex items-center justify-center p-4">
                        <span className="bg-red-600 text-white text-[10px] font-black px-4 py-2 uppercase tracking-widest shadow-2xl">
                            {locale === 'tr' ? 'STOKTA YOK' : 'OUT OF STOCK'}
                        </span>
                    </div>
                )}

                {product.stock > 0 && product.stock < 5 && (
                    <span className="absolute top-4 right-4 z-10 bg-orange-500 text-white text-[8px] font-bold px-2 py-1 uppercase tracking-widest shadow-lg">
                        {locale === 'tr' ? `SON ${product.stock} ADET` : `ONLY ${product.stock} LEFT`}
                    </span>
                )}

                {product.weight && (
                    <span className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-secondary text-[9px] font-black px-2 py-1 uppercase tracking-tighter border border-gray-100">
                        {product.weight}G
                    </span>
                )}

                <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(product as any); }}
                    className={`absolute top-4 right-4 z-30 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${isInWishlist(product.id) ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-white/80 text-secondary hover:bg-white hover:text-primary'}`}
                    title={isInWishlist(product.id) ? t('favorites.remove') : t('favorites.add')}
                >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>

                <Link href={`/products/${product.id}`} className="block w-full h-full">
                    <img
                        src={product.image}
                        alt={name}
                        className={`object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 ${product.stock === 0 ? 'grayscale' : ''}`}
                    />
                </Link>
            </div>

            <div className="flex flex-col flex-1 space-y-2">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/60">{t(`db.categories.${product.category}`)}</span>
                <h3 className="text-base font-serif font-medium text-secondary group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    <Link href={`/products/${product.id}`}>
                        {name}
                    </Link>
                </h3>
                <div className="flex items-center justify-between mt-auto pt-2">
                    <p className="text-lg font-bold text-secondary">{product.price.toLocaleString()} ₺</p>
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="flex items-center justify-center p-2.5 bg-secondary/5 hover:bg-primary hover:text-white text-secondary rounded-full transition-all duration-300 group/btn disabled:opacity-30 disabled:cursor-not-allowed"
                        title={product.stock === 0 ? (locale === 'tr' ? 'Tükendi' : 'Out of Stock') : t('cart.add')}
                    >
                        <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
