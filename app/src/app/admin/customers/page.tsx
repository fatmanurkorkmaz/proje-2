'use client';

import { useEffect, useState } from 'react';

export default function AdminCustomersPage() {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/orders')
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);

    // Derive unique customers from orders
    const customers = Array.from(new Set(orders.map(o => o.customer.email)))
        .map(email => {
            return orders.find(o => o.customer.email === email).customer;
        });

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Müşteriler</h1>
            <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 font-bold text-gray-500 uppercase">
                        <tr>
                            <th className="p-4">Ad Soyad</th>
                            <th className="p-4">E-posta</th>
                            <th className="p-4">Şehir</th>
                            <th className="p-4">İlk Sipariş</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {customers.length === 0 ? (
                            <tr><td colSpan={4} className="p-4 text-center text-gray-500">Henüz müşteri yok.</td></tr>
                        ) : customers.map((c: any, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="p-4 font-bold">{c.firstName} {c.lastName}</td>
                                <td className="p-4 text-gray-600">{c.email}</td>
                                <td className="p-4 text-gray-600">{c.city}</td>
                                <td className="p-4 text-gray-500">2026-01-30</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
