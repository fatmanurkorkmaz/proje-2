'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

const Footer = () => {
    const { siteTitle, footerText } = useSettings();

    return (
        <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-center md:text-left">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-3 group mb-6">
                            <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                            <div className="flex flex-col -space-y-1">
                                <span className="text-2xl font-serif font-black tracking-tighter bg-gradient-to-r from-[#D4AF37] to-[#F1C40F] bg-clip-text text-transparent uppercase">AVCI</span>
                                <span className="text-[9px] font-medium tracking-[0.3em] text-gray-400 uppercase">Kuyumculuk</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                            {footerText}
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="font-serif font-bold text-white mb-6">Mağaza</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/products" className="hover:text-primary transition-colors">Yeni Gelenler</Link></li>
                            <li><Link href="/products" className="hover:text-primary transition-colors">En Çok Satanlar</Link></li>
                            <li><Link href="/products" className="hover:text-primary transition-colors">Yüzükler</Link></li>
                            <li><Link href="/products" className="hover:text-primary transition-colors">Kolyeler</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-serif font-bold text-white mb-6">Kurumsal</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/about" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
                            <li><Link href="/sustainability" className="hover:text-primary transition-colors">Sürdürülebilirlik</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">Kariyer</Link></li>
                            <li><Link href="/stores" className="hover:text-primary transition-colors">Mağazalar</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-serif font-bold text-white mb-6">Bülten</h3>
                        <p className="text-gray-400 text-sm mb-4">Özel güncellemeler için bültenimize katılın.</p>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="E-posta..."
                                className="bg-white/10 border-none rounded-sm px-4 py-2 text-sm text-white placeholder:text-gray-500 flex-1 focus:ring-1 focus:ring-primary outline-none"
                            />
                            <button className="bg-primary text-secondary-foreground px-4 py-2 rounded-sm text-sm font-medium hover:bg-primary/90 transition-colors">
                                Katıl
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} AVCI Kuyumculuk. Tüm hakları saklıdır.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
                        <Link href="#" className="hover:text-white transition-colors">Hizmet Şartları</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
