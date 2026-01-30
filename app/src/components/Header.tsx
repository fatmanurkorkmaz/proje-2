'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingBag, User, Menu, X, LogOut, Package, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useWishlist } from '@/context/WishlistContext';

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { items } = useCart();
    const { favorites } = useWishlist();
    const { t, locale, setLocale } = useLanguage();

    if (pathname.startsWith('/admin')) return null;
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const langMenuRef = useRef<HTMLDivElement>(null);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    // Click outside handler for both menus
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setIsLangMenuOpen(false);
            }
        };

        if (isUserMenuOpen || isLangMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserMenuOpen, isLangMenuOpen]);

    const navLinks = [
        { label: t('nav.home'), href: '/' },
        { label: t('nav.collections'), href: '/products' },
        { label: t('nav.about'), href: '/about' },
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
                            placeholder={t('nav.search')}
                            className="pl-9 pr-4 py-2 bg-secondary/5 border-none rounded-full text-sm focus:ring-1 focus:ring-primary outline-none w-32 xl:w-40 transition-all focus:w-48 xl:focus:w-56"
                        />
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    </div>

                    {/* Language Switcher */}
                    <div className="relative" ref={langMenuRef}>
                        <button
                            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            className="flex items-center gap-2 px-2 py-1.5 hover:bg-secondary/5 rounded-full transition-colors"
                        >
                            <span className="text-lg">
                                {locale === 'tr' ? '🇹🇷' : '🇺🇸'}
                            </span>
                        </button>

                        {isLangMenuOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-sm shadow-2xl py-1 z-[60] animate-in fade-in zoom-in duration-200">
                                <button
                                    onClick={() => {
                                        setLocale('tr');
                                        setIsLangMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2 text-xs font-bold transition-colors ${locale === 'tr' ? 'text-primary bg-primary/5' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <span>🇹🇷</span> Türkçe
                                </button>
                                <button
                                    onClick={() => {
                                        setLocale('en');
                                        setIsLangMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2 text-xs font-bold transition-colors ${locale === 'en' ? 'text-primary bg-primary/5' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <span>🇺🇸</span> English
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="relative" ref={userMenuRef}>
                        <button
                            onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : router.push('/login')}
                            className="p-2 hover:bg-secondary/5 rounded-full transition-colors flex items-center gap-2"
                        >
                            <User className={`w-5 h-5 ${user ? 'text-primary' : 'text-secondary'}`} />
                            {user && (
                                <span className="hidden sm:block text-[11px] font-bold text-secondary uppercase tracking-wider">
                                    {user.firstName} {user.lastName}
                                </span>
                            )}
                        </button>

                        {/* User Dropdown */}
                        {isUserMenuOpen && user && (
                            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-sm shadow-2xl py-2 animate-in fade-in zoom-in duration-200 z-[60]">
                                <div className="px-4 py-3 border-b border-gray-50 mb-1 bg-gray-50/50">
                                    <p className="text-[10px] text-gray-400 uppercase font-black mb-1">
                                        {user.role === 'admin' ? t('nav.admin') : t('nav.customer')}
                                    </p>
                                    <p className="text-sm font-black truncate text-secondary uppercase">
                                        {user.firstName} {user.lastName}
                                    </p>
                                </div>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                                    onClick={() => setIsUserMenuOpen(false)}
                                >
                                    <User className="w-4 h-4" />
                                    {t('nav.profile')}
                                </Link>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                                    onClick={() => setIsUserMenuOpen(false)}
                                >
                                    <Package className="w-4 h-4" />
                                    {t('nav.orders')}
                                </Link>
                                <div className="h-px bg-gray-50 my-1 mx-2" />
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsUserMenuOpen(false);
                                        router.push('/');
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    {t('nav.logout')}
                                </button>
                            </div>
                        )}
                    </div>

                    <Link href="/favorites" className="p-2 hover:bg-secondary/5 rounded-full transition-colors relative group">
                        <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-primary' : 'text-secondary'}`} />
                        {favorites.length > 0 && (
                            <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {favorites.length}
                            </span>
                        )}
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
                    <div className="absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-background shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
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
                        <nav className="p-6 space-y-4 flex-1 overflow-y-auto">
                            {/* Language in Mobile Menu */}
                            <div className="flex gap-4 mb-8">
                                <button
                                    onClick={() => setLocale('tr')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border ${locale === 'tr' ? 'bg-primary/5 border-primary text-primary font-bold' : 'border-gray-100 text-gray-500'}`}
                                >
                                    <span>🇹🇷</span> Türkçe
                                </button>
                                <button
                                    onClick={() => setLocale('en')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border ${locale === 'en' ? 'bg-primary/5 border-primary text-primary font-bold' : 'border-gray-100 text-gray-500'}`}
                                >
                                    <span>🇺🇸</span> English
                                </button>
                            </div>

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
                                href="/favorites"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-xl font-serif font-bold text-secondary hover:text-primary transition-colors border-b border-gray-50 pb-4 flex items-center justify-between"
                            >
                                {locale === 'tr' ? 'Favorilerim' : 'My Favorites'}
                                <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-primary' : 'text-gray-300'}`} />
                            </Link>
                            {user ? (
                                <>
                                    <div className="border-b border-gray-50 pb-4 mb-4">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t('nav.profile')}</p>
                                        <p className="text-xl font-serif font-black text-secondary">{user.firstName} {user.lastName}</p>
                                    </div>
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block text-lg font-serif font-bold text-secondary hover:text-primary transition-colors border-b border-gray-50 pb-4"
                                    >
                                        {t('nav.orders')} & {t('nav.profile')}
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="block w-full text-left text-lg font-serif font-bold text-red-600 hover:text-red-700 transition-colors border-b border-gray-50 pb-4 pt-4"
                                    >
                                        {t('nav.logout')}
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-xl font-serif font-bold text-secondary hover:text-primary transition-colors border-b border-gray-50 pb-4"
                                >
                                    {t('nav.login')}
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
