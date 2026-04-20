'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

interface Product {
    id: string;
    nameTr: string;
    nameEn: string;
    price: number;
    weight: number;
}

export default function PriceManagementPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [newPrices, setNewPrices] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (Array.isArray(data)) {
                setProducts(data);
                // Initialize newPrices with current prices
                const prices: Record<string, string> = {};
                data.forEach(p => {
                    prices[p.id] = p.price.toString();
                });
                setNewPrices(prices);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePriceChange = (id: string, value: string) => {
        setNewPrices(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setStatus(null);
        try {
            const updates = Object.entries(newPrices).map(([id, price]) => ({
                id,
                price: parseFloat(price)
            })).filter(u => !isNaN(u.price));

            const res = await fetch('/api/products/bulk-prices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ updates })
            });

            if (res.ok) {
                const data = await res.json();
                setStatus({ type: 'success', msg: data.message });
                fetchProducts(); // Refresh list
            } else {
                throw new Error('Update failed');
            }
        } catch (err) {
            setStatus({ type: 'error', msg: 'Fiyatlar güncellenirken bir hata oluştu.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <Link href="/admin" className="text-xs text-gray-500 hover:text-primary flex items-center gap-1 mb-2">
                        <ArrowLeft className="w-3 h-3" /> Dashboard'a Dön
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Fiyat Yönetimi</h1>
                    <p className="text-gray-500 text-sm">Ürün fiyatlarını manuel olarak ve toplu bir şekilde güncelleyin.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-sm font-bold uppercase tracking-wider hover:bg-secondary/90 transition-colors disabled:opacity-50 shadow-lg shadow-secondary/20"
                >
                    {isSaving ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    Değişiklikleri Kaydet
                </button>
            </div>

            {status && (
                <div className={`p-4 rounded-sm flex items-center gap-3 animate-in fade-in duration-300 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span className="text-sm font-bold">{status.msg}</span>
                </div>
            )}

            <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500 tracking-wider">
                        <tr>
                            <th className="p-4">Ürün Adı</th>
                            <th className="p-4">Gram (Ağırlık)</th>
                            <th className="p-4">Mevcut Fiyat (TL)</th>
                            <th className="p-4 w-48">Yeni Fiyat (TL)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4">
                                    <p className="font-bold text-gray-900">{product.nameTr}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{product.nameEn}</p>
                                </td>
                                <td className="p-4 font-mono font-bold text-amber-600">
                                    {product.weight > 0 ? `${product.weight} gr` : '-'}
                                </td>
                                <td className="p-4 font-bold text-gray-900">
                                    {product.price.toLocaleString()} ₺
                                </td>
                                <td className="p-4">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={newPrices[product.id] || ''}
                                            onChange={(e) => handlePriceChange(product.id, e.target.value)}
                                            className="w-full border border-gray-200 p-2 rounded-sm focus:ring-1 focus:ring-secondary outline-none font-bold"
                                            placeholder="Yeni fiyat..."
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₺</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
