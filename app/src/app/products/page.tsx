'use client';

import { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductsPage() {
    const { products } = useProducts();
    const { t } = useLanguage();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number>(100000);

    const categories = ['Rings', 'Necklaces', 'Bracelets', 'Earrings'];
    const materials = ['Yellow Gold', 'White Gold', 'Rose Gold', 'Silver'];

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
                <p className="text-sm text-muted-foreground mb-2">{t('products.breadcrumb')}</p>
                <h1 className="text-4xl font-serif font-bold mb-2">{t('products.title')}</h1>
                <p className="text-gray-500">{t('products.stats').replace('{count}', products.length.toString())}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
                    {/* Categories */}
                    <div>
                        <h3 className="font-bold mb-4 flex justify-between items-center text-secondary uppercase tracking-widest text-xs">
                            {t('products.filters.categories')} <ChevronDown className="w-4 h-4" />
                        </h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded-sm border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                    checked={selectedCategories.length === 0}
                                    onChange={() => setSelectedCategories([])}
                                />
                                <span className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">{t('products.filters.all')}</span>
                            </label>
                            {categories.map(cat => (
                                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded-sm border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                                    />
                                    <span className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">{t(`db.categories.${cat}`)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Materials */}
                    <div>
                        <h3 className="font-bold mb-4 flex justify-between items-center text-secondary uppercase tracking-widest text-xs">
                            {t('products.filters.materials')} <ChevronDown className="w-4 h-4" />
                        </h3>
                        <div className="space-y-2">
                            {materials.map(mat => (
                                <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded-sm border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                        checked={selectedMaterials.includes(mat)}
                                        onChange={() => toggleFilter(mat, selectedMaterials, setSelectedMaterials)}
                                    />
                                    <span className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">{t(`db.materials.${mat}`)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <h3 className="font-bold mb-4 text-secondary uppercase tracking-widest text-xs">{t('products.filters.price')}</h3>
                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="1000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full accent-primary cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2 uppercase">
                            <span>0₺</span>
                            <span>{priceRange.toLocaleString()}₺+</span>
                        </div>
                    </div>

                    <button
                        className="w-full bg-secondary text-secondary-foreground py-3 font-bold uppercase tracking-widest text-xs hover:bg-secondary/90 transition-all shadow-lg hover:shadow-secondary/20"
                    >
                        {t('products.filters.apply')}
                    </button>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <button className="lg:hidden flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-gray-100 px-4 py-2 hover:bg-gray-50 transition-colors">
                            <SlidersHorizontal className="w-4 h-4" /> {t('products.filters.mobile_btn')}
                        </button>
                        <div className="ml-auto flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('products.sort.label')}</span>
                            <select className="border-none text-xs font-bold text-secondary focus:ring-0 cursor-pointer bg-transparent uppercase tracking-widest">
                                <option>{t('products.sort.bestsellers')}</option>
                                <option>{t('products.sort.price_low')}</option>
                                <option>{t('products.sort.price_high')}</option>
                                <option>{t('products.sort.newest')}</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {filteredProducts.map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-32 bg-gray-50/50 border border-dashed border-gray-200 rounded-sm">
                            <p className="text-gray-400 font-medium italic">{t('products.no_results')}</p>
                            <button
                                onClick={() => { setSelectedCategories([]); setSelectedMaterials([]); setPriceRange(100000); }}
                                className="mt-4 text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors underline underline-offset-4"
                            >
                                {t('products.clear_all')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
