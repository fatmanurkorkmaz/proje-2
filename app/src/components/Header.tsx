'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';

const Header = () => {
    const { items } = useCart();
    const { siteTitle } = useSettings();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const navLinks = [
        { label: 'Anasayfa', href: '/' },
        { label: 'Koleksiyonlar', href: '/products' },
        { label: 'Hakkımızda', href: '/about' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 -ml-2 hover:bg-secondary/5 rounded-full transition-colors"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu className="w-6 h-6 text-secondary" />
                </button>

                <Link href="/" className="flex items-center gap-3 group">
                    <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                    <div className="flex flex-col -space-y-1">
                        <span className="text-xl md:text-2xl font-serif font-black tracking-tighter leading-none bg-gradient-to-r from-[#D4AF37] via-[#F1C40F] to-[#B8860B] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                            AVCI
                        </span>
                        <span className="text-[8px] md:text-[9px] font-bold tracking-[0.3em] text-secondary/70 uppercase">
                            Kuyumculuk
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="text-xs font-bold hover:text-primary transition-colors uppercase tracking-widest text-secondary/80"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="relative hidden lg:block">
                        <input
                            type="text"
                            placeholder="Ara..."
                            className="pl-9 pr-4 py-2 bg-secondary/5 border-none rounded-full text-sm focus:ring-1 focus:ring-primary outline-none w-40 transition-all focus:w-56"
                        />
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    </div>

                    <Link href="/login" className="p-2 hover:bg-secondary/5 rounded-full transition-colors">
                        <User className="w-5 h-5 text-secondary" />
                    </Link>

                    <Link href="/cart" className="p-2 hover:bg-secondary/5 rounded-full transition-colors relative group">
                        <ShoppingBag className="w-5 h-5 text-secondary" />
                        {itemCount > 0 && (
                            <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] md:hidden">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-background shadow-2xl animate-in slide-in-from-left duration-300">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-3 group">
                                <img src="/logo.png" alt="Logo" className="h-12 w-auto object-contain" />
                                <div className="flex flex-col -space-y-1">
                                    <span className="text-2xl font-serif font-black tracking-tighter text-secondary leading-none group-hover:text-primary transition-colors uppercase">AVCI</span>
                                    <span className="text-[10px] font-medium tracking-[0.3em] text-muted-foreground uppercase ml-0.5">Kuyumculuk</span>
                                </div>
                            </Link>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <nav className="p-6 space-y-4">
                            {navLinks.map(({ label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-xl font-serif font-bold text-secondary hover:text-primary transition-colors border-b border-gray-50 pb-4"
                                >
                                    {label}
                                </Link>
                            ))}
                            <Link
                                href="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-xl font-serif font-bold text-secondary hover:text-primary transition-colors border-b border-gray-50 pb-4"
                            >
                                Giriş Yap
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
