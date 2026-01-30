'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ShoppingBag, Users, DollarSign, ArrowRight, X } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';

export default function AdminDashboardPage() {
    const { products } = useProducts();
    const [stats, setStats] = useState({
        customers: 0,
        pendingOrders: 0,
        revenue: 0,
        loading: true
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [usersRes, ordersRes] = await Promise.all([
                    fetch('/api/users'),
                    fetch('/api/orders')
                ]);

                const users = await usersRes.json();
                const orders = await ordersRes.json();

                if (Array.isArray(users) && Array.isArray(orders)) {
                    const customers = users.filter(u => u.role === 'customer').length;
                    const pendingOrders = orders.filter(o => o.status === 'pending').length;
                    const revenue = orders.reduce((acc, o) => acc + o.total, 0);

                    setStats({
                        customers,
                        pendingOrders,
                        revenue,
                        loading: false
                    });
                }
            } catch (error) {
                console.error('Stats fetch error:', error);
                setStats(prev => ({ ...prev, loading: false }));
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Yönetim Paneli</h1>
                <p className="text-gray-500 text-sm">Mağazanızın performansı ve kısa yollar.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Toplam Ürün</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{products.length}</h3>
                        </div>
                        <span className="p-2 bg-blue-50 text-blue-600 rounded-md">
                            <Package className="w-5 h-5" />
                        </span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Biten Stok</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">
                                {products.filter(p => (p as any).stock === 0).length}
                            </h3>
                        </div>
                        <span className="p-2 bg-red-50 text-red-600 rounded-md">
                            <X className="w-5 h-5" />
                        </span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Bekleyen Sipariş</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">
                                {stats.loading ? '...' : stats.pendingOrders}
                            </h3>
                        </div>
                        <span className="p-2 bg-yellow-50 text-yellow-600 rounded-md">
                            <ShoppingBag className="w-5 h-5" />
                        </span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Toplam Müşteri</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">
                                {stats.loading ? '...' : stats.customers}
                            </h3>
                        </div>
                        <span className="p-2 bg-purple-50 text-purple-600 rounded-md">
                            <Users className="w-5 h-5" />
                        </span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Toplam Ciro</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1 text-emerald-600">
                                {stats.loading ? '...' : `${stats.revenue.toLocaleString()} ₺`}
                            </h3>
                        </div>
                        <span className="p-2 bg-emerald-50 text-emerald-600 rounded-md">
                            <DollarSign className="w-5 h-5" />
                        </span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Hızlı İşlemler</h3>
                    <div className="space-y-4">
                        <Link href="/admin/products/new" className="flex items-center justify-between p-4 bg-gray-50 rounded-sm hover:bg-gray-100 transition-colors group">
                            <span className="font-medium">Yeni Ürün Ekle</span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/admin/products" className="flex items-center justify-between p-4 bg-gray-50 rounded-sm hover:bg-gray-100 transition-colors group">
                            <span className="font-medium">Ürünleri Düzenle</span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/" className="flex items-center justify-between p-4 bg-gray-50 rounded-sm hover:bg-gray-100 transition-colors group">
                            <span className="font-medium">Mağazayı Görüntüle</span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Son Aktiviteler</h3>
                    <p className="text-sm text-gray-500">Henüz yeni bir aktivite yok.</p>
                </div>
            </div>
        </div>
    );
}
