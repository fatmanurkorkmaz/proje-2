'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, Lock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const { items, cartTotal, discount, checkout } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    if (items.length === 0) {
        return <div className="p-20 text-center">Sepetiniz boş. Yönlendiriliyorsunuz...</div>; // Could use useEffect to redirect
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Process backend order
        const success = await checkout();

        if (success) {
            alert('Siparişiniz başarıyla alındı! Teşekkür ederiz.');
            router.push('/');
        } else {
            alert('Ödeme sırasında bir hata oluştu.');
        }
        setIsProcessing(false);
    };

    const shipping = cartTotal > 5000 ? 0 : 250;
    const total = cartTotal - discount + shipping;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex items-center gap-2 mb-8">
                <Link href="/cart" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> Sepete Dön
                </Link>
                <span className="text-gray-300">|</span>
                <h1 className="text-2xl font-serif font-bold">Güvenli Ödeme</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Forms */}
                <div className="space-y-8">
                    <form id="checkout-form" onSubmit={handlePayment} className="space-y-8">
                        {/* Shipping */}
                        <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 bg-primary text-secondary-foreground rounded-full flex items-center justify-center text-xs">1</span>
                                Teslimat Bilgileri
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Ad</label>
                                    <input required name="firstName" onChange={handleInputChange} type="text" className="w-full border border-gray-200 p-3 rounded-sm outline-none focus:border-primary" />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Soyad</label>
                                    <input required name="lastName" onChange={handleInputChange} type="text" className="w-full border border-gray-200 p-3 rounded-sm outline-none focus:border-primary" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">E-posta</label>
                                    <input required name="email" onChange={handleInputChange} type="email" className="w-full border border-gray-200 p-3 rounded-sm outline-none focus:border-primary" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Adres</label>
                                    <input required name="address" onChange={handleInputChange} type="text" className="w-full border border-gray-200 p-3 rounded-sm outline-none focus:border-primary" />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Şehir</label>
                                    <input required name="city" onChange={handleInputChange} type="text" className="w-full border border-gray-200 p-3 rounded-sm outline-none focus:border-primary" />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Posta Kodu</label>
                                    <input required name="zip" onChange={handleInputChange} type="text" className="w-full border border-gray-200 p-3 rounded-sm outline-none focus:border-primary" />
                                </div>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 bg-primary text-secondary-foreground rounded-full flex items-center justify-center text-xs">2</span>
                                Ödeme Bilgileri
                            </h2>
                            <div className="space-y-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Kart Üzerindeki İsim</label>
                                    <input required name="cardName" onChange={handleInputChange} type="text" className="w-full border border-gray-200 p-3 rounded-sm outline-none focus:border-primary" />
                                </div>
                                <div className="col-span-2 relative">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Kart Numarası</label>
                                    <input required name="cardNumber" onChange={handleInputChange} type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-200 p-3 rounded-sm outline-none focus:border-primary pl-10" />
                                    <CreditCard className="absolute left-3 top-8 text-gray-400 w-5 h-5" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Son Kullanma (AA/YY)</label>
                                        <input required name="expiry" onChange={handleInputChange} type="text" placeholder="MM/YY" className="w-full border border-gray-200 p-3 rounded-sm outline-none focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">CVC</label>
                                        <input required name="cvc" onChange={handleInputChange} type="text" placeholder="123" className="w-full border border-gray-200 p-3 rounded-sm outline-none focus:border-primary" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-sm">
                                <Lock className="w-3 h-3 text-green-600" />
                                Ödemeniz 256-bit SSL sertifikası ile korunmaktadır.
                            </div>
                        </div>
                    </form>
                </div>

                {/* Summary (Sticky) */}
                <div>
                    <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                        <h3 className="font-serif font-bold text-xl mb-6">Siparişiniz</h3>
                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 text-sm">
                                    <div className="w-16 h-16 bg-white rounded-sm overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-gray-500">{item.quantity} x {item.price.toLocaleString()} ₺</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Ara Toplam</span>
                                <span>{cartTotal.toLocaleString()} ₺</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>İndirim</span>
                                    <span>-{discount.toLocaleString()} ₺</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span>Kargo</span>
                                <span>{shipping === 0 ? 'Ücretsiz' : `${shipping} ₺`}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mt-4 mb-6 flex justify-between font-bold text-lg">
                            <span>Toplam Tutar</span>
                            <span>{total.toLocaleString()} ₺</span>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={isProcessing}
                            className="w-full bg-primary text-secondary-foreground py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-70"
                        >
                            {isProcessing ? 'Ödeme Alınıyor...' : `Ödemeyi Tamamla (${total.toLocaleString()} ₺)`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
