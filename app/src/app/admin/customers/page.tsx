'use client';

import { useEffect, useState } from 'react';

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCustomers(data.filter(u => u.role === 'customer'));
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Müşteriler</h1>
            <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-x-auto">
                <div className="min-w-[600px] md:min-w-0">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 font-bold text-gray-500 uppercase">
                            <tr>
                                <th className="p-4">Ad Soyad</th>
                                <th className="p-4">E-posta</th>
                                <th className="p-4">Kayıt Tarihi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr><td colSpan={3} className="p-12 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div></td></tr>
                            ) : customers.length === 0 ? (
                                <tr><td colSpan={3} className="p-4 text-center text-gray-500">Henüz müşteri yok.</td></tr>
                            ) : customers.map((c: any) => (
                                <tr key={c.id} className="hover:bg-gray-50">
                                    <td className="p-4 font-bold uppercase tracking-tight text-secondary">
                                        {c.firstName} {c.lastName}
                                    </td>
                                    <td className="p-4 text-gray-600">{c.email}</td>
                                    <td className="p-4 text-gray-500">
                                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString('tr-TR') : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
