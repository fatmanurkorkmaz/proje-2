'use client';

import { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function ProductsPage() {
    const { products } = useProducts();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number>(50000); // Updated for TL range

    const categories = ['Rings', 'Necklaces', 'Bracelets', 'Earrings'];
    const categoryLabels: Record<string, string> = {
        'Rings': 'Yüzükler',
        'Necklaces': 'Kolyeler',
        'Bracelets': 'Bileklikler',
        'Earrings': 'Küpeler'
    };

    const materials = ['Yellow Gold', 'White Gold', 'Rose Gold', 'Silver'];
    const materialLabels: Record<string, string> = {
        'Yellow Gold': 'Sarı Altın',
        'White Gold': 'Beyaz Altın',
        'Rose Gold': 'Rose Altın',
        'Silver': 'Gümüş'
    };

    const toggleFilter = (item: string, current: string[], set: (v: string[]) => void) => {
        if (current.includes(item)) {
            set(current.filter(i => i !== item));
        } else {
            set([...current, item]);
        }
    };

    const filteredProducts = products.filter((product: any) => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const materialMatch = selectedMaterials.length === 0 || (!product.material || selectedMaterials.includes(product.material));
        const priceMatch = product.price <= priceRange;
        return categoryMatch && materialMatch && priceMatch;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb & Header */}
            <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-2">Anasayfa &gt; Özel Koleksiyon</p>
                <h1 className="text-4xl font-serif font-bold mb-2">Özel Mücevher Koleksiyonu</h1>
                <p className="text-gray-500">{products.length} parça, sonsuzluk için tasarlandı.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
                    {/* Categories */}
                    <div>
                        <h3 className="font-bold mb-4 flex justify-between items-center">
                            Kategoriler <ChevronDown className="w-4 h-4" />
                        </h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded-sm border-gray-300 text-primary focus:ring-primary"
                                    checked={selectedCategories.length === 0}
                                    onChange={() => setSelectedCategories([])}
                                />
                                <span className="text-sm">Tüm Koleksiyonlar</span>
                            </label>
                            {categories.map(cat => (
                                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded-sm border-gray-300 text-primary focus:ring-primary"
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                                    />
                                    <span className="text-sm">{categoryLabels[cat]}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Materials */}
                    <div>
                        <h3 className="font-bold mb-4 flex justify-between items-center">
                            Materyal <ChevronDown className="w-4 h-4" />
                        </h3>
                        <div className="space-y-2">
                            {materials.map(mat => (
                                <label key={mat} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded-sm border-gray-300 text-primary focus:ring-primary"
                                        checked={selectedMaterials.includes(mat)}
                                        onChange={() => toggleFilter(mat, selectedMaterials, setSelectedMaterials)}
                                    />
                                    <span className="text-sm">{materialLabels[mat]}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <h3 className="font-bold mb-4">Fiyat Aralığı</h3>
                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="1000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full text-primary"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>0₺</span>
                            <span>{priceRange.toLocaleString()}₺+</span>
                        </div>
                    </div>

                    <button
                        className="w-full bg-primary text-secondary-foreground py-3 rounded-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        Filtreleri Uygula
                    </button>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <button className="lg:hidden flex items-center gap-2 text-sm font-medium border px-4 py-2 rounded-sm">
                            <SlidersHorizontal className="w-4 h-4" /> Filtreler
                        </button>
                        <div className="ml-auto flex items-center gap-2">
                            <span className="text-sm text-gray-500">Sırala:</span>
                            <select className="border-none text-sm font-medium focus:ring-0 cursor-pointer bg-transparent">
                                <option>En Çok Satanlar</option>
                                <option>Fiyat: Düşükten Yükseğe</option>
                                <option>Fiyat: Yüksekten Düşüğe</option>
                                <option>En Yeniler</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500">Kriterlerinize uygun ürün bulunamadı.</p>
                            <button
                                onClick={() => { setSelectedCategories([]); setSelectedMaterials([]); setPriceRange(100000); }}
                                className="mt-4 text-primary underline"
                            >
                                Tüm filtreleri temizle
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
