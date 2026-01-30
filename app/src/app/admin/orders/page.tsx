'use client';

import { useEffect, useState } from 'react';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, []);

    if (loading) return <div className="p-8">Yükleniyor...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Siparişler</h1>
            <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 font-bold text-gray-500 uppercase">
                        <tr>
                            <th className="p-4">Sipariş ID</th>
                            <th className="p-4">Müşteri</th>
                            <th className="p-4">Tutar</th>
                            <th className="p-4">Tarih</th>
                            <th className="p-4">Durum</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.length === 0 ? (
                            <tr><td colSpan={5} className="p-4 text-center text-gray-500">Henüz sipariş yok.</td></tr>
                        ) : orders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="p-4 font-mono text-xs">#{order.id.slice(-6)}</td>
                                <td className="p-4">
                                    <p className="font-bold">{order.customer.firstName} {order.customer.lastName}</p>
                                    <p className="text-xs text-gray-500">{order.customer.email}</p>
                                </td>
                                <td className="p-4 font-bold">{order.total?.toLocaleString()} ₺</td>
                                <td className="p-4 text-gray-500">{new Date(order.date).toLocaleDateString('tr-TR')}</td>
                                <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Hazırlanıyor</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
