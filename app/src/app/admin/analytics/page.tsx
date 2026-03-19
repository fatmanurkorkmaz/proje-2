'use client';

const monthlySales = [
    { month: 'Eki', revenue: 145000 },
    { month: 'Kas', revenue: 198000 },
    { month: 'Ara', revenue: 312000 },
    { month: 'Oca', revenue: 187000 },
    { month: 'Şub', revenue: 224000 },
    { month: 'Mar', revenue: 248700 },
];

const categorySales = [
    { name: 'Yüzükler', percentage: 38, color: 'bg-amber-500' },
    { name: 'Kolyeler', percentage: 28, color: 'bg-blue-500' },
    { name: 'Bileklikler', percentage: 20, color: 'bg-emerald-500' },
    { name: 'Küpeler', percentage: 14, color: 'bg-purple-500' },
];

const topProducts = [
    { name: 'Stellar Rose Gold Tektaş', sales: 23, revenue: 1265000 },
    { name: '18k Altın Sonsuzluk Yüzüğü', sales: 18, revenue: 810000 },
    { name: 'Zümrüt Damla Kolye', sales: 15, revenue: 570000 },
    { name: 'Safir Elmas Bileklik', sales: 12, revenue: 504000 },
    { name: 'Klasik Pırlanta Küpe', sales: 31, revenue: 372000 },
];

const trafficSources = [
    { source: 'Google Arama', visitors: 1240, percentage: 42 },
    { source: 'Instagram', visitors: 890, percentage: 30 },
    { source: 'Doğrudan', visitors: 520, percentage: 18 },
    { source: 'Facebook', visitors: 180, percentage: 6 },
    { source: 'Diğer', visitors: 120, percentage: 4 },
];

export default function AdminAnalyticsPage() {
    const maxRevenue = Math.max(...monthlySales.map(m => m.revenue));

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold">Analitik</h1>
                <p className="text-gray-500 text-sm">Son 6 aylık performans raporu (Demo veriler)</p>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg mb-6">Aylık Ciro</h3>
                <div className="flex items-end gap-4 h-48">
                    {monthlySales.map(m => (
                        <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-500">
                                {(m.revenue / 1000).toFixed(0)}k ₺
                            </span>
                            <div
                                className="w-full bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-sm transition-all hover:from-amber-600 hover:to-amber-400"
                                style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                            />
                            <span className="text-xs font-bold text-gray-600">{m.month}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Distribution */}
                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-lg mb-6">Kategori Dağılımı</h3>
                    <div className="space-y-4">
                        {categorySales.map(cat => (
                            <div key={cat.name} className="space-y-1.5">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-700">{cat.name}</span>
                                    <span className="font-bold text-gray-900">%{cat.percentage}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div className={`h-2.5 rounded-full ${cat.color} transition-all`} style={{ width: `${cat.percentage}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-lg mb-6">Trafik Kaynakları</h3>
                    <div className="space-y-3">
                        {trafficSources.map(t => (
                            <div key={t.source} className="flex items-center justify-between p-3 bg-gray-50 rounded-sm">
                                <div>
                                    <p className="text-sm font-bold text-secondary">{t.source}</p>
                                    <p className="text-xs text-gray-400">{t.visitors.toLocaleString()} ziyaretçi</p>
                                </div>
                                <span className="text-sm font-bold text-primary">%{t.percentage}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Products */}
            <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg mb-6">En Çok Satan Ürünler</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 font-bold text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="p-4">#</th>
                                <th className="p-4">Ürün Adı</th>
                                <th className="p-4">Satış Adedi</th>
                                <th className="p-4">Toplam Ciro</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {topProducts.map((p, i) => (
                                <tr key={p.name} className="hover:bg-gray-50">
                                    <td className="p-4 font-bold text-primary">{i + 1}</td>
                                    <td className="p-4 font-bold text-secondary">{p.name}</td>
                                    <td className="p-4">{p.sales} adet</td>
                                    <td className="p-4 font-bold text-emerald-600">{p.revenue.toLocaleString()} ₺</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
