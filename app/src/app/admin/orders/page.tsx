'use client';

import { useState } from 'react';
import { Eye, Truck, CheckCircle, Clock, Package } from 'lucide-react';

const mockOrders = [
    { id: 'ORD-2024-001', customer: 'Ayşe Yılmaz', email: 'ayse@example.com', items: 2, total: 45000, date: '2024-03-19', status: 'delivered' },
    { id: 'ORD-2024-002', customer: 'Mehmet Kaya', email: 'mehmet@example.com', items: 1, total: 28500, date: '2024-03-18', status: 'shipped' },
    { id: 'ORD-2024-003', customer: 'Fatma Demir', email: 'fatma@example.com', items: 3, total: 67000, date: '2024-03-17', status: 'preparing' },
    { id: 'ORD-2024-004', customer: 'Ali Çelik', email: 'ali@example.com', items: 1, total: 15200, date: '2024-03-16', status: 'delivered' },
    { id: 'ORD-2024-005', customer: 'Zeynep Arslan', email: 'zeynep@example.com', items: 2, total: 93000, date: '2024-03-15', status: 'shipped' },
    { id: 'ORD-2024-006', customer: 'Emre Yıldız', email: 'emre@example.com', items: 1, total: 12000, date: '2024-03-14', status: 'delivered' },
    { id: 'ORD-2024-007', customer: 'Selin Öz', email: 'selin@example.com', items: 4, total: 118000, date: '2024-03-13', status: 'delivered' },
    { id: 'ORD-2024-008', customer: 'Burak Aydın', email: 'burak@example.com', items: 1, total: 7500, date: '2024-03-12', status: 'preparing' },
    { id: 'ORD-2024-009', customer: 'Elif Koç', email: 'elif@example.com', items: 2, total: 55000, date: '2024-03-11', status: 'shipped' },
    { id: 'ORD-2024-010', customer: 'Deniz Şahin', email: 'deniz@example.com', items: 1, total: 38000, date: '2024-03-10', status: 'delivered' },
    { id: 'ORD-2024-011', customer: 'Gül Çetin', email: 'gul@example.com', items: 3, total: 82000, date: '2024-03-09', status: 'preparing' },
    { id: 'ORD-2024-012', customer: 'Hakan Bal', email: 'hakan@example.com', items: 1, total: 42000, date: '2024-03-08', status: 'delivered' },
];

const statusMap: Record<string, { label: string; icon: any; color: string }> = {
    preparing: { label: 'Hazırlanıyor', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
    shipped: { label: 'Kargoda', icon: Truck, color: 'bg-blue-100 text-blue-700' },
    delivered: { label: 'Teslim Edildi', icon: CheckCircle, color: 'bg-green-100 text-green-700' },
};

export default function AdminOrdersPage() {
    const [filter, setFilter] = useState('all');

    const filteredOrders = filter === 'all'
        ? mockOrders
        : mockOrders.filter(o => o.status === filter);

    const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold mb-1">Siparişler</h1>
                <p className="text-gray-500 text-sm">Toplam {mockOrders.length} sipariş — {totalRevenue.toLocaleString()} ₺ ciro</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-sm text-center">
                    <p className="text-2xl font-bold text-gray-900">{mockOrders.length}</p>
                    <p className="text-xs text-gray-500 font-medium">Toplam Sipariş</p>
                </div>
                <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-sm text-center">
                    <p className="text-2xl font-bold text-yellow-600">{mockOrders.filter(o => o.status === 'preparing').length}</p>
                    <p className="text-xs text-gray-500 font-medium">Hazırlanıyor</p>
                </div>
                <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-sm text-center">
                    <p className="text-2xl font-bold text-blue-600">{mockOrders.filter(o => o.status === 'shipped').length}</p>
                    <p className="text-xs text-gray-500 font-medium">Kargoda</p>
                </div>
                <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-sm text-center">
                    <p className="text-2xl font-bold text-green-600">{mockOrders.filter(o => o.status === 'delivered').length}</p>
                    <p className="text-xs text-gray-500 font-medium">Teslim Edildi</p>
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2">
                {[
                    { key: 'all', label: 'Tümü' },
                    { key: 'preparing', label: 'Hazırlanıyor' },
                    { key: 'shipped', label: 'Kargoda' },
                    { key: 'delivered', label: 'Teslim Edildi' },
                ].map(f => (
                    <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        className={`px-4 py-2 text-sm font-bold rounded-sm transition-colors ${filter === f.key ? 'bg-primary text-secondary-foreground' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-x-auto">
                <div className="min-w-[800px] md:min-w-0">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 font-bold text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="p-4">Sipariş ID</th>
                                <th className="p-4">Müşteri</th>
                                <th className="p-4">Ürün</th>
                                <th className="p-4">Tutar</th>
                                <th className="p-4">Tarih</th>
                                <th className="p-4">Durum</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map(order => {
                                const status = statusMap[order.status];
                                const StatusIcon = status.icon;
                                return (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-mono text-xs font-bold text-primary">{order.id}</td>
                                        <td className="p-4">
                                            <p className="font-bold text-secondary">{order.customer}</p>
                                            <p className="text-xs text-gray-400">{order.email}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className="flex items-center gap-1.5 text-gray-600">
                                                <Package className="w-3.5 h-3.5" /> {order.items} ürün
                                            </span>
                                        </td>
                                        <td className="p-4 font-bold">{order.total.toLocaleString()} ₺</td>
                                        <td className="p-4 text-gray-500">{new Date(order.date).toLocaleDateString('tr-TR')}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${status.color}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {status.label}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
