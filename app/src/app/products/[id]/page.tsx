import { products } from '@/data/products';
import Link from 'next/link';
import { ArrowLeft, Check, Share2, Shield, Truck } from 'lucide-react';
import { notFound } from 'next/navigation';
import ProductActions from '@/components/ProductActions';

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const product = products.find((p) => p.id === resolvedParams.id);

    if (!product) {
        notFound();
    }

    // Helper for simple translations just for display if needed, but data is already translated.
    // We still need to translate UI labels.

    return (
        <div className="container mx-auto px-4 py-12">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Koleksiyona Dön
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
                {/* Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square bg-secondary/5 overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={`aspect-square bg-secondary/5 cursor-pointer border ${i === 1 ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}>
                                <img
                                    src={product.image}
                                    alt={`${product.name} view ${i}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div>
                    <span className="text-secondary/60 text-sm font-bold tracking-widest uppercase mb-2 block">{product.category}</span>
                    <h1 className="text-4xl font-serif font-bold text-foreground mb-4">{product.name}</h1>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-2xl font-medium">{product.price.toLocaleString()} ₺</span>
                        {product.inStock ? (
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                <Check className="w-3 h-3" /> Stokta Var
                            </span>
                        ) : (
                            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">Stokta Yok</span>
                        )}
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

                    <div className="space-y-6 mb-8">
                        <div>
                            <label className="block text-sm font-bold mb-2">Materyal</label>
                            <div className="flex gap-2">
                                {['Yellow Gold', 'White Gold', 'Rose Gold', 'Silver'].map(m => (
                                    <button
                                        key={m}
                                        className={`px-4 py-2 border text-sm transition-all ${product.material === m ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        {m.replace('Yellow Gold', 'Sarı Altın').replace('White Gold', 'Beyaz Altın').replace('Rose Gold', 'Rose Altın').replace('Silver', 'Gümüş')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {product.category === 'Rings' && (
                            <div>
                                <label className="block text-sm font-bold mb-2">Yüzük Ölçüsü</label>
                                <select className="w-full md:w-1/2 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none">
                                    <option>Ölçü Seçiniz</option>
                                    {[5, 6, 7, 8, 9].map(s => <option key={s}>US {s} (TR {s * 2 + 1})</option>)}
                                </select>
                                <button className="text-xs text-primary underline mt-1">Ölçümü Nasıl Bulurum?</button>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 mb-10">
                        <ProductActions product={product} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500 pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4" /> Ücretsiz Kargo & İade
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" /> 2 Yıl Garanti
                        </div>
                        <div className="flex items-center gap-2">
                            <Share2 className="w-4 h-4" /> Çevre Dostu Paketleme
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
