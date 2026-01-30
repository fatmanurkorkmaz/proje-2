'use client';

import Link from 'next/link';
import { Search, Plus, Filter, ArrowUpDown, MoreHorizontal, Edit, Trash2, Eye, Package } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { products } from '@/data/products'; // Keep for type fallback if needed but we use context

export default function AdminProductsPage() {
    const { products, deleteProduct } = useProducts();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Ürün Yönetimi</h1>
                    <p className="text-gray-500 text-sm">Katalohunuzu, envanterinizi ve fiyatlarınızı yönetin.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <input type="text" placeholder="Stok kodu, isim..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-sm w-64 focus:ring-1 focus:ring-primary outline-none" />
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <Link href="/admin/products/new" className="bg-primary text-secondary-foreground px-4 py-2 rounded-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors">
                        <Plus className="w-4 h-4" /> Yeni Ürün Ekle
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Toplam Ürün</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{products.length}</h3>
                        </div>
                        <span className="p-2 bg-yellow-50 text-yellow-600 rounded-md">
                            <Package className="w-5 h-5" />
                        </span>
                    </div>
                    <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                        +2.4% <span className="text-gray-400 font-normal">geçen aydan beri</span>
                    </p>
                </div>

                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Düşük Stok</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">2</h3>
                        </div>
                        <span className="p-2 bg-red-50 text-red-600 rounded-md">
                            <Filter className="w-5 h-5" />
                        </span>
                    </div>
                    <p className="text-red-500 text-sm font-medium">İlgi Gerektiriyor</p>
                </div>

                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Aylık Ciro</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">42.8k ₺</h3>
                        </div>
                        <span className="p-2 bg-green-50 text-green-600 rounded-md">
                            <BarChart3 className="w-5 h-5" />
                        </span>
                    </div>
                    <p className="text-green-600 text-sm font-medium">+12% <span className="text-gray-400 font-normal">geçen aydan beri</span></p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 p-4 border-b border-gray-100">
                    <button className="px-4 py-2 bg-yellow-400 text-secondary-foreground text-sm font-bold rounded-sm">Tüm Ürünler</button>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-sm hover:bg-gray-50">Yüzükler</button>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-sm hover:bg-gray-50">Kolyeler</button>

                    <div className="ml-auto flex gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-sm hover:bg-gray-50 flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Filtrele
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-sm hover:bg-gray-50 flex items-center gap-2">
                            <ArrowUpDown className="w-4 h-4" /> Sırala
                        </button>
                    </div>
                </div>

                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500 tracking-wider">
                        <tr>
                            <th className="p-4">Görsel</th>
                            <th className="p-4">Ürün Adı</th>
                            <th className="p-4">SKU</th>
                            <th className="p-4">Kategori</th>
                            <th className="p-4">Fiyat</th>
                            <th className="p-4">Durum</th>
                            <th className="p-4 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-sm overflow-hidden">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td className="p-4">
                                    <p className="font-bold text-gray-900">{product.name}</p>
                                    <p className="text-xs text-gray-400">Essential Collection</p>
                                </td>
                                <td className="p-4 font-mono text-xs text-yellow-700">JW-{product.id.padStart(4, '0')}</td>
                                <td className="p-4">{product.category}</td>
                                <td className="p-4 font-bold text-gray-900">{product.price.toLocaleString()} ₺</td>
                                <td className="p-4">
                                    {product.inStock ? (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                            Stokta
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                                            Tükendi
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><Edit className="w-4 h-4" /></button>
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            className="p-2 hover:bg-red-50 rounded-full text-red-500 hover:cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
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

function BarChart3(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
        </svg>
    )
}
