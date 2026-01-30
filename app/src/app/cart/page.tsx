'use client';

import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, cartTotal, discount, promoCode, setPromoCode, checkout } = useCart();
    const router = useRouter();
    const { t, locale } = useLanguage();

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        updateQuantity(id, newQuantity);
    };

    const handleProceedToCheckout = () => {
        router.push('/checkout');
    };

    const shipping = cartTotal > 5000 ? 0 : 250;
    const total = cartTotal - discount + shipping;

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                    <Trash2 className="w-8 h-8 text-secondary" />
                </div>
                <h1 className="text-3xl font-serif font-bold mb-4">Sepetiniz Boş</h1>
                <p className="text-gray-500 mb-8 max-w-md">
                    Henüz sepetinize bir ürün eklemediniz. Koleksiyonumuzu keşfedin ve zamansız parçaları bulun.
                </p>
                <Link
                    href="/products"
                    className="bg-primary text-secondary-foreground px-8 py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
                >
                    Alışverişe Başla
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-serif font-bold mb-8">Alışveriş Sepeti ({items.length} Ürün)</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items */}
                <div className="flex-1 space-y-6">
                    {items.map((item) => {
                        const name = locale === 'tr' ? item.nameTr : item.nameEn;
                        return (
                            <div key={item.id} className="flex gap-6 p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-white">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-secondary/5 rounded-md overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={name} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-serif font-bold text-lg text-foreground"><Link href={`/products/${item.id}`}>{name}</Link></h3>
                                            <p className="text-sm text-gray-500">{item.category}</p>
                                        </div>
                                        <p className="font-bold text-lg">{item.price.toLocaleString()} ₺</p>
                                    </div>

                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center gap-3 border border-gray-200 rounded-sm px-2 py-1">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                className="p-1 hover:text-primary transition-colors disabled:opacity-30"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                className="p-1 hover:text-primary transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 font-medium underline decoration-red-200 hover:decoration-red-500"
                                        >
                                            <Trash2 className="w-4 h-4" /> Kaldır
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="pt-6">
                        <Link href="/products" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                            <ArrowLeft className="w-4 h-4" /> Alışverişe Devam Et
                        </Link>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-96 space-y-6">
                    <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm">
                        <h2 className="text-xl font-serif font-bold mb-6 pb-4 border-b border-gray-100">Sipariş Özeti</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Ara Toplam</span>
                                <span>{cartTotal.toLocaleString()} ₺</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Kargo</span>
                                <span>{shipping === 0 ? 'Ücretsiz' : `${shipping} ₺`}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-600 font-medium">
                                    <span>İndirim</span>
                                    <span>-{discount.toLocaleString()} ₺</span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between text-xl font-bold border-t border-gray-100 pt-4 mb-6">
                            <span>Toplam</span>
                            <span>{total.toLocaleString()} ₺</span>
                        </div>

                        <button
                            onClick={handleProceedToCheckout}
                            className="w-full bg-secondary text-secondary-foreground py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/20"
                        >
                            Ödemeye Geç
                        </button>

                        <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Güvenli Ödeme
                        </p>
                    </div>

                    {/* Promo Code */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-sm mb-2">İndirim Kodu</h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Kodu giriniz"
                                className="flex-1 border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none uppercase"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <button className="bg-white border border-gray-300 px-4 py-2 rounded-sm text-sm font-bold hover:bg-gray-100 transition-colors">
                                Uygula
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-primary" />
                            Sigortalı Kargo
                        </div>
                        <div className="flex items-center gap-2">
                            <RefreshCw className="w-4 h-4 text-primary" />
                            30 Gün İade
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
