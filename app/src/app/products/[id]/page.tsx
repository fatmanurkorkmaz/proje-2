'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Share2, Shield, Truck, Scale, BadgeCheck, RotateCcw } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import ProductActions from '@/components/ProductActions';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductPage() {
    const params = useParams();
    const { t, locale } = useLanguage();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${params.id}`);
                if (!res.ok) throw new Error('Not found');
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        if (params.id) fetchProduct();
    }, [params.id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) return notFound();

    const name = locale === 'tr' ? product.nameTr : product.nameEn;
    const description = locale === 'tr' ? product.descriptionTr : product.descriptionEn;

    return (
        <div className="bg-[#FCFBFA]">
            {/* Breadcrumb / Back Navigation */}
            <div className="border-b border-secondary/5 bg-white">
                <div className="container mx-auto px-4 py-4">
                    <Link href="/products" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" /> {locale === 'tr' ? 'Koleksiyona Dön' : 'Back to Collection'}
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Image Gallery - Reimagined */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="aspect-[4/5] bg-white border border-secondary/5 overflow-hidden group relative shadow-sm">
                            <img
                                src={product.image}
                                alt={name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            {product.isNew && (
                                <span className="absolute top-6 left-6 z-10 bg-primary text-white text-[10px] font-black px-4 py-2 uppercase tracking-widest shadow-2xl">
                                    {t('sections.new_arrivals')}
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`aspect-square bg-white border cursor-pointer transition-all duration-300 ${i === 1 ? 'border-primary ring-1 ring-primary/20' : 'border-secondary/10 hover:border-primary/50 grayscale hover:grayscale-0'}`}>
                                    <img
                                        src={product.image}
                                        alt={`${name} view ${i}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Details - Reimagined */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary bg-primary/5 px-3 py-1.5 rounded-full">
                                    {t(`db.categories.${product.category}`)}
                                </span>
                                {product.weight > 0 && (
                                    <span className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase text-muted-foreground/80">
                                        <Scale className="w-3.5 h-3.5" /> {product.weight} G
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-serif font-medium text-secondary mb-6 leading-[1.1]">
                                {name}
                            </h1>

                            <div className="flex items-center gap-6 mb-8">
                                <span className="text-3xl font-bold text-secondary tracking-tighter">
                                    {product.price.toLocaleString()} ₺
                                </span>
                                <div className="h-6 w-px bg-secondary/10" />
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`flex h-2.5 w-2.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${product.stock > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                                            {product.stock > 0 ? (locale === 'tr' ? 'STOKTA MEVCUT' : 'IN STOCK') : (locale === 'tr' ? 'TÜKENDİ' : 'OUT OF STOCK')}
                                        </span>
                                    </div>
                                    {product.stock > 0 && product.stock < 5 && (
                                        <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm animate-bounce">
                                            {locale === 'tr' ? `SON ${product.stock} ADET!` : `ONLY ${product.stock} LEFT!`}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <p className="text-sm lg:text-base text-secondary/70 leading-[1.8] font-medium mb-10 border-l-2 border-primary/20 pl-6 italic">
                                {description}
                            </p>
                        </div>

                        <div className="space-y-8 mb-12">
                            {/* Actions Component Hooked to Context */}
                            <div className="p-1 bg-white border border-secondary/5 shadow-sm">
                                <ProductActions product={product} />
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-t border-b border-secondary/5">
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center">
                                        <Truck className="w-5 h-5 text-secondary/60" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-secondary/70">
                                        {locale === 'tr' ? 'Hızlı Kargo' : 'Fast Shipping'}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-3 border-x border-secondary/5">
                                    <div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center">
                                        <BadgeCheck className="w-5 h-5 text-secondary/60" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-secondary/70">
                                        {locale === 'tr' ? 'Sertifikalı Ürün' : 'Certified Quality'}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center">
                                        <RotateCcw className="w-5 h-5 text-secondary/60" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-secondary/70">
                                        {locale === 'tr' ? 'Kolay İade' : 'Easy Return'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Extra Assurance */}
                        <div className="bg-primary/5 p-6 border border-primary/10">
                            <div className="flex items-start gap-4">
                                <Shield className="w-6 h-6 text-primary mt-1" />
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-secondary mb-1">
                                        {locale === 'tr' ? 'Ömür Boyu Garanti' : 'Lifetime Warranty'}
                                    </h4>
                                    <p className="text-[10px] text-secondary/60 font-medium leading-relaxed">
                                        {locale === 'tr'
                                            ? 'Tüm ürünlerimiz tasarım ve işçilik hatalarına karşı AVCI Kuyumculuk garantisi altındadır.'
                                            : 'All our products are under AVCI Jewelry warranty against design and workmanship defects.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
