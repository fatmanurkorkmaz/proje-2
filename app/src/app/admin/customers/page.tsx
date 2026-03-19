'use client';

import { useState } from 'react';
import { Search, Mail, Calendar } from 'lucide-react';

const mockCustomers = [
    { id: '1', firstName: 'Ayşe', lastName: 'Yılmaz', email: 'ayse@example.com', orders: 5, totalSpent: 142000, createdAt: '2024-01-15' },
    { id: '2', firstName: 'Mehmet', lastName: 'Kaya', email: 'mehmet@example.com', orders: 3, totalSpent: 85500, createdAt: '2024-02-03' },
    { id: '3', firstName: 'Fatma', lastName: 'Demir', email: 'fatma@example.com', orders: 7, totalSpent: 267000, createdAt: '2023-11-22' },
    { id: '4', firstName: 'Ali', lastName: 'Çelik', email: 'ali@example.com', orders: 2, totalSpent: 30400, createdAt: '2024-03-01' },
    { id: '5', firstName: 'Zeynep', lastName: 'Arslan', email: 'zeynep@example.com', orders: 4, totalSpent: 186000, createdAt: '2024-01-28' },
    { id: '6', firstName: 'Emre', lastName: 'Yıldız', email: 'emre@example.com', orders: 1, totalSpent: 12000, createdAt: '2024-03-14' },
    { id: '7', firstName: 'Selin', lastName: 'Öz', email: 'selin@example.com', orders: 8, totalSpent: 354000, createdAt: '2023-09-05' },
    { id: '8', firstName: 'Burak', lastName: 'Aydın', email: 'burak@example.com', orders: 1, totalSpent: 7500, createdAt: '2024-03-12' },
    { id: '9', firstName: 'Elif', lastName: 'Koç', email: 'elif@example.com', orders: 3, totalSpent: 110000, createdAt: '2024-02-19' },
    { id: '10', firstName: 'Deniz', lastName: 'Şahin', email: 'deniz@example.com', orders: 2, totalSpent: 76000, createdAt: '2024-02-08' },
];

export default function AdminCustomersPage() {
    const [search, setSearch] = useState('');

    const filteredCustomers = mockCustomers.filter(c =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    const totalSpentAll = mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Müşteriler</h1>
                    <p className="text-gray-500 text-sm">{mockCustomers.length} kayıtlı müşteri — {totalSpentAll.toLocaleString()} ₺ toplam harcama</p>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Müşteri ara..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-sm w-64 focus:ring-1 focus:ring-primary outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-x-auto">
                <div className="min-w-[700px] md:min-w-0">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 font-bold text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="p-4">Ad Soyad</th>
                                <th className="p-4">E-posta</th>
                                <th className="p-4">Sipariş</th>
                                <th className="p-4">Toplam Harcama</th>
                                <th className="p-4">Kayıt Tarihi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCustomers.map(c => (
                                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                                {c.firstName[0]}{c.lastName[0]}
                                            </div>
                                            <span className="font-bold text-secondary">{c.firstName} {c.lastName}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="flex items-center gap-1.5 text-gray-600">
                                            <Mail className="w-3.5 h-3.5 text-gray-400" /> {c.email}
                                        </span>
                                    </td>
                                    <td className="p-4 font-bold">{c.orders}</td>
                                    <td className="p-4 font-bold text-emerald-600">{c.totalSpent.toLocaleString()} ₺</td>
                                    <td className="p-4 text-gray-500">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                            {new Date(c.createdAt).toLocaleDateString('tr-TR')}
                                        </span>
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
