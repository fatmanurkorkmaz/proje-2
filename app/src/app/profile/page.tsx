'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Package, User, ShoppingBag, ChevronRight, Clock } from 'lucide-react';

interface Order {
    id: string;
    date: string;
    total: number;
    items: any[];
    status: string;
    shippingInfo: any;
}

export default function ProfilePage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [activeTab, setActiveTab] = useState<'orders' | 'info'>('orders');

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        if (user) {
            // Fetch user's orders (Mock API call for now, can be replaced with real API)
            fetch('/api/orders?email=' + user.email)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setOrders(data.filter((o: any) => o.customerEmail === user.email || o.email === user.email));
                    }
                })
                .catch(err => console.error('Orders fetch error:', err));
        }
    }, [user]);

    if (isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Profile Header */}
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary border-2 border-primary/20">
                            <User className="w-10 h-10" />
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl font-serif font-black text-secondary uppercase tracking-tight">
                                {user.firstName} {user.lastName}
                            </h1>
                            <p className="text-gray-500 font-medium">{user.email}</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-center px-6 py-3 bg-secondary/5 rounded-lg border border-secondary/10">
                                <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Toplam Sipariş</p>
                                <p className="text-xl font-serif font-black text-secondary">{orders.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${activeTab === 'orders' ? 'border-primary text-secondary' : 'border-transparent text-gray-400 hover:text-secondary'
                            }`}
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Siparişlerim
                    </button>
                    <button
                        onClick={() => setActiveTab('info')}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${activeTab === 'info' ? 'border-primary text-secondary' : 'border-transparent text-gray-400 hover:text-secondary'
                            }`}
                    >
                        <User className="w-4 h-4" />
                        Profil Bilgilerim
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'orders' ? (
                    <div className="space-y-4">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 group hover:border-primary/30 transition-all">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                <Package className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-secondary">Sipariş No: #{order.id.slice(-6)}</p>
                                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(order.date).toLocaleDateString('tr-TR')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                            <div className="text-right">
                                                <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Durum</p>
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {order.status === 'Completed' ? 'Tamamlandı' : 'Alındı'}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Toplam</p>
                                                <p className="text-lg font-serif font-black text-secondary">
                                                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(order.total)}
                                                </p>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center bg-white py-16 rounded-lg border border-dashed border-gray-200">
                                <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                <h3 className="text-xl font-serif font-bold text-secondary mb-2">Henüz siparişiniz yok</h3>
                                <p className="text-gray-400 mb-8">Koleksiyonlarımızı keşfederek alışverişe başlayabilirsiniz.</p>
                                <button
                                    onClick={() => router.push('/products')}
                                    className="bg-primary text-secondary-foreground px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
                                >
                                    Alışverişe Başla
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 max-w-2xl">
                        <h2 className="text-xl font-serif font-bold text-secondary mb-6 border-b border-gray-100 pb-4">Kişisel Bilgiler</h2>
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Adınız</p>
                                <p className="text-secondary font-bold">{user.firstName}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Soyadınız</p>
                                <p className="text-secondary font-bold">{user.lastName}</p>
                            </div>
                        </div>
                        <div className="mb-8">
                            <p className="text-[10px] text-gray-400 uppercase font-black mb-1">E-posta Adresiniz</p>
                            <p className="text-secondary font-bold">{user.email}</p>
                        </div>
                        <button className="border border-secondary px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all">
                            Bilgileri Düzenle
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
