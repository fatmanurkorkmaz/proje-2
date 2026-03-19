'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
    const pathname = usePathname();
    const { siteTitle, footerText } = useSettings();
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 5000);
        }
    };

    if (pathname.startsWith('/admin')) return null;

    return (
        <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-center md:text-left">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-3 group mb-6">
                            <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                            <div className="flex flex-col -space-y-1">
                                <span className="text-2xl font-serif font-bold tracking-tighter bg-gradient-to-r from-[#D4AF37] to-[#F1C40F] bg-clip-text text-transparent uppercase">AVCI</span>
                                <span className="text-[9px] font-bold tracking-[0.3em] text-gray-400 uppercase">Kuyumculuk</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                            {footerText}
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="font-serif font-bold text-white mb-6 uppercase tracking-widest text-xs">{t('footer.shop')}</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/products" className="hover:text-primary transition-colors font-bold">{t('footer.new_arrivals')}</Link></li>
                            <li><Link href="/products" className="hover:text-primary transition-colors font-bold">{t('footer.best_sellers')}</Link></li>
                            <li><Link href="/products?category=Rings" className="hover:text-primary transition-colors font-bold">{t('footer.rings')}</Link></li>
                            <li><Link href="/products?category=Necklaces" className="hover:text-primary transition-colors font-bold">{t('footer.necklaces')}</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-serif font-bold text-white mb-6 uppercase tracking-widest text-xs">{t('footer.company')}</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/about" className="hover:text-primary transition-colors font-bold">{t('footer.about')}</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-serif font-bold text-white mb-6 uppercase tracking-widest text-xs">{t('footer.newsletter')}</h3>
                        <p className="text-gray-400 text-sm mb-4">{t('footer.newsletter_sub')}</p>
                        {subscribed ? (
                            <div className="bg-primary/20 border border-primary/30 text-primary p-3 rounded-sm text-sm font-bold">
                                {t('footer.newsletter_success') || 'Tebrikler! Bültene kaydoldunuz.'}
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('footer.newsletter_placeholder')}
                                    className="bg-white/10 border-none rounded-sm px-4 py-2 text-sm text-white placeholder:text-gray-500 flex-1 focus:ring-1 focus:ring-primary outline-none"
                                />
                                <button type="submit" className="bg-primary text-secondary-foreground px-4 py-2 rounded-sm text-sm font-bold hover:bg-primary/90 transition-colors">
                                    {t('footer.newsletter_button')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
                    <div className="flex gap-6">
                        <Link href="/about" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
                        <Link href="/about" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
