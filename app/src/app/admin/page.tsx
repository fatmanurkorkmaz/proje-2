'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ShoppingBag, Users, DollarSign, ArrowRight, TrendingUp, Clock, RefreshCw } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';

// Mock recent orders for dashboard
const mockRecentOrders = [
    { id: 'ORD-2024-001', customer: 'Ayşe Yılmaz', amount: 45000, date: '2024-03-19', status: 'Teslim Edildi' },
    { id: 'ORD-2024-002', customer: 'Mehmet Kaya', amount: 28500, date: '2024-03-18', status: 'Kargoda' },
    { id: 'ORD-2024-003', customer: 'Fatma Demir', amount: 67000, date: '2024-03-17', status: 'Hazırlanıyor' },
    { id: 'ORD-2024-004', customer: 'Ali Çelik', amount: 15200, date: '2024-03-16', status: 'Teslim Edildi' },
    { id: 'ORD-2024-005', customer: 'Zeynep Arslan', amount: 93000, date: '2024-03-15', status: 'Kargoda' },
];

const mockActivities = [
    { text: 'Yeni sipariş: #ORD-2024-005 — 93.000 ₺', time: '2 saat önce', type: 'order' },
    { text: 'Stok uyarısı: Safir Bileklik — 1 adet kaldı', time: '4 saat önce', type: 'warning' },
    { text: '"Stellar Rose Gold Tektaş" favorilere 12 kez eklendi', time: '6 saat önce', type: 'info' },
    { text: 'Yeni müşteri kaydı: Zeynep Arslan', time: '8 saat önce', type: 'user' },
    { text: 'Fiyatlar güncellendi (Has altın: 3.245 ₺/gr)', time: '12 saat önce', type: 'price' },
];

export default function AdminDashboardPage() {
    const { products } = useProducts();
    const [priceUpdating, setPriceUpdating] = useState(false);

    const handleUpdatePrices = async () => {
        setPriceUpdating(true);
        try {
            const res = await fetch('/api/update-prices', { method: 'POST' });
            const data = await res.json();
            alert(data.message || 'Fiyatlar güncellendi!');
            window.location.reload();
        } catch (err) {
            alert('Fiyat güncellemesi başarısız.');
        } finally {
            setPriceUpdating(false);
        }
    };

    // Mock stats
    const totalRevenue = 248700;
    const totalCustomers = 47;
    const pendingOrders = 3;
    const monthlyGrowth = 18.5;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Yönetim Paneli</h1>
                    <p className="text-gray-500 text-sm">Mağazanızın performansı ve kısa yollar.</p>
                </div>
                <button
                    onClick={handleUpdatePrices}
                    disabled={priceUpdating}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-sm font-bold text-sm hover:bg-amber-600 transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${priceUpdating ? 'animate-spin' : ''}`} />
                    {priceUpdating ? 'Güncelleniyor...' : 'Fiyatları Güncelle'}
                </button>
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
                    <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> +2 bu ay
                    </p>
                </div>

                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Bekleyen Sipariş</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{pendingOrders}</h3>
                        </div>
                        <span className="p-2 bg-yellow-50 text-yellow-600 rounded-md">
                            <ShoppingBag className="w-5 h-5" />
                        </span>
                    </div>
                    <p className="text-yellow-600 text-sm font-medium">Aksiyon bekleniyor</p>
                </div>

                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Toplam Müşteri</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalCustomers}</h3>
                        </div>
                        <span className="p-2 bg-purple-50 text-purple-600 rounded-md">
                            <Users className="w-5 h-5" />
                        </span>
                    </div>
                    <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> +8 bu ay
                    </p>
                </div>

                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Toplam Ciro</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1 text-emerald-600">
                                {totalRevenue.toLocaleString()} ₺
                            </h3>
                        </div>
                        <span className="p-2 bg-emerald-50 text-emerald-600 rounded-md">
                            <DollarSign className="w-5 h-5" />
                        </span>
                    </div>
                    <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> +{monthlyGrowth}% bu ay
                    </p>
                </div>

                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Düşük Stok</p>
                            <h3 className="text-3xl font-bold text-red-600 mt-1">
                                {products.filter((p: any) => p.stock > 0 && p.stock < 5).length}
                            </h3>
                        </div>
                        <span className="p-2 bg-red-50 text-red-600 rounded-md">
                            <Clock className="w-5 h-5" />
                        </span>
                    </div>
                    <p className="text-red-500 text-sm font-medium">İlgi gerektiriyor</p>
                </div>
            </div>

            {/* Two columns: Recent Orders + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Son Siparişler</h3>
                        <Link href="/admin/orders" className="text-xs text-primary font-bold flex items-center gap-1 hover:underline">
                            Tümünü Gör <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {mockRecentOrders.map(order => (
                            <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-sm">
                                <div>
                                    <p className="text-sm font-bold text-secondary">{order.customer}</p>
                                    <p className="text-[10px] text-gray-400 font-mono">{order.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold">{order.amount.toLocaleString()} ₺</p>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.status === 'Teslim Edildi' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Kargoda' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Son Aktiviteler</h3>
                    <div className="space-y-4">
                        {mockActivities.map((activity, i) => (
                            <div key={i} className="flex items-start gap-3 border-b border-gray-50 pb-3 last:border-0">
                                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activity.type === 'order' ? 'bg-green-500' :
                                        activity.type === 'warning' ? 'bg-red-500' :
                                            activity.type === 'price' ? 'bg-amber-500' :
                                                'bg-blue-500'
                                    }`} />
                                <div>
                                    <p className="text-sm text-gray-700">{activity.text}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Hızlı İşlemler</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/admin/products/new" className="flex items-center justify-between p-4 bg-gray-50 rounded-sm hover:bg-gray-100 transition-colors group">
                        <span className="font-medium">Yeni Ürün Ekle</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/admin/orders" className="flex items-center justify-between p-4 bg-gray-50 rounded-sm hover:bg-gray-100 transition-colors group">
                        <span className="font-medium">Siparişleri Yönet</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/admin/analytics" className="flex items-center justify-between p-4 bg-gray-50 rounded-sm hover:bg-gray-100 transition-colors group">
                        <span className="font-medium">Analitik Raporları</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
