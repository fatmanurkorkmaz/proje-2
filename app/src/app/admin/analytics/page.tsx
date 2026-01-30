'use client';

export default function AdminAnalyticsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Analitik</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm h-64 flex items-center justify-center">
                    <p className="text-gray-400">Satış Grafiği (Demo)</p>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm h-64 flex items-center justify-center">
                    <p className="text-gray-400">Trafik Kaynakları (Demo)</p>
                </div>
            </div>
        </div>
    );
}
