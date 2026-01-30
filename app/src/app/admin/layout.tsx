'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingBag, BarChart3, Users, Settings, LogOut, Menu, X } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navLinks = [
        { icon: LayoutDashboard, label: 'Panel', href: '/admin' },
        { icon: Package, label: 'Ürünler', href: '/admin/products' },
        { icon: ShoppingBag, label: 'Siparişler', href: '/admin/orders' },
        { icon: BarChart3, label: 'Analitik', href: '/admin/analytics' },
        { icon: Users, label: 'Müşteriler', href: '/admin/customers' },
        { icon: Settings, label: 'Site Ayarları (CMS)', href: '/admin/settings', extraClass: 'mt-6 border-t border-gray-100 pt-6' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-[100] px-4 flex items-center justify-between">
                <Link href="/admin" className="flex items-center gap-3 group">
                    <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                    <div className="flex flex-col -space-y-0.5">
                        <span className="text-xl font-serif font-black tracking-tighter bg-gradient-to-r from-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent uppercase">AVCI</span>
                        <span className="text-[8px] font-medium tracking-[0.2em] text-gray-400 uppercase">Kuyumculuk Admin</span>
                    </div>
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-secondary"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                w-64 bg-white border-r border-gray-200 fixed h-full z-[120] transition-transform duration-300
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                flex flex-col
            `}>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-3 group">
                        <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                        <div className="flex flex-col -space-y-0.5">
                            <span className="text-xl font-serif font-black tracking-tighter bg-gradient-to-r from-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent uppercase">AVCI</span>
                            <span className="text-[8px] font-medium tracking-[0.2em] text-gray-400 uppercase">Kuyumculuk Admin</span>
                        </div>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="p-4 space-y-1 flex-1">
                    {navLinks.map(({ icon: Icon, label, href, extraClass }) => (
                        <Link
                            key={label}
                            href={href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-sm transition-colors ${extraClass || ''}`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-red-500 w-full transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Siteye Dön</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
                {children}
            </main>
        </div>
    );
}
