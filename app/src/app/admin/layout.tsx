'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingBag, BarChart3, Users, Settings, LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
    const { user, logout } = useAuth();

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
            {/* Desktop & Mobile Header */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-[100] px-4 md:px-8 flex items-center justify-between md:ml-64">
                <div className="md:hidden">
                    <Link href="/admin" className="flex items-center gap-3 group">
                        <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                        <div className="flex flex-col -space-y-0.5">
                            <span className="text-xl font-serif font-black tracking-tighter bg-gradient-to-r from-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent uppercase">AVCI</span>
                            <span className="text-[8px] font-medium tracking-[0.2em] text-gray-400 uppercase">Kuyumculuk Admin</span>
                        </div>
                    </Link>
                </div>

                <div className="flex-1 md:flex items-center justify-between">
                    <h2 className="hidden md:block text-sm font-bold text-gray-400 uppercase tracking-widest">Yönetim Paneli</h2>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="relative">
                            <button
                                onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                                className="flex items-center gap-3 p-1.5 hover:bg-gray-50 rounded-full transition-colors group"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <User className="w-4 h-4" />
                                </div>
                                <div className="hidden sm:block text-left mr-2">
                                    <p className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">Yönetici</p>
                                    <p className="text-xs font-bold text-secondary">{user?.firstName} {user?.lastName}</p>
                                </div>
                            </button>

                            {isAdminMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-sm shadow-2xl py-2 animate-in fade-in zoom-in duration-200">
                                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                        <p className="text-[10px] text-gray-400 uppercase font-black">Admin Hesabı</p>
                                        <p className="text-xs font-bold truncate text-secondary">{user?.email}</p>
                                    </div>
                                    <Link href="/admin/settings" className="block px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors" onClick={() => setIsAdminMenuOpen(false)}>
                                        Ayarlar
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            window.location.href = '/admin/login';
                                        }}
                                        className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                    >
                                        <LogOut className="w-3.5 h-3.5" />
                                        Güvenli Çıkış
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-secondary"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
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

                <div className="p-4 border-t border-gray-100 space-y-2">
                    <Link href="/" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-primary w-full transition-colors text-sm">
                        <LogOut className="w-4 h-4 rotate-180" />
                        <span className="font-medium">Siteye Dön</span>
                    </Link>
                    <button
                        onClick={() => {
                            logout();
                            window.location.href = '/admin/login';
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full rounded-sm transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Güvenli Çıkış</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-24">
                {children}
            </main>
        </div>
    );
}
