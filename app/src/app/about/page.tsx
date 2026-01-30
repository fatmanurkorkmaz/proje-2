'use client';

import { Diamond, Hammer, Heart, Leaf } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
    const { t } = useLanguage();
    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[60vh] bg-secondary flex items-center justify-center text-center px-4">
                {/* Background Image/Overlay */}
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1626017004128-4903333e6604?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />

                <div className="relative z-10 max-w-3xl space-y-6">
                    <span className="text-primary font-bold tracking-[0.2em] uppercase">{t('about.hero.tag')}</span>
                    <h1 className="text-5xl md:text-6xl font-serif text-white font-medium">{t('about.hero.title')}</h1>
                    <p className="text-xl text-gray-300">
                        {t('about.hero.subtitle')}
                    </p>
                </div>
            </section>

            {/* Heritage Story */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-serif font-bold text-foreground">{t('about.story.title')}</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {t('about.story.p1')}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            {t('about.story.p2')}
                        </p>
                        <div className="pt-4">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png"
                                alt="Kurucunun İmzası"
                                className="h-12 opacity-50"
                            />
                            <p className="text-sm font-bold mt-2">{t('about.story.founder')}</p>
                        </div>
                    </div>
                    <div className="relative h-[500px] bg-secondary/5 rounded-sm overflow-hidden p-8">
                        <img
                            src="https://images.unsplash.com/photo-1596704017260-843372c382a8?auto=format&fit=crop&q=80&w=800"
                            alt="Atölye"
                            className="w-full h-full object-cover shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-700"
                        />
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-secondary/5 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif font-bold text-center mb-16">{t('about.values.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white p-8 rounded-sm shadow-sm hover:-translate-y-1 transition-transform duration-300 border border-transparent hover:border-primary/20">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{t('about.values.ethics.title')}</h3>
                            <p className="text-gray-500 text-sm">
                                {t('about.values.ethics.desc')}
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-sm shadow-sm hover:-translate-y-1 transition-transform duration-300 border border-transparent hover:border-primary/20">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <Hammer className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{t('about.values.craft.title')}</h3>
                            <p className="text-gray-500 text-sm">
                                {t('about.values.craft.desc')}
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-sm shadow-sm hover:-translate-y-1 transition-transform duration-300 border border-transparent hover:border-primary/20">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{t('about.values.custom.title')}</h3>
                            <p className="text-gray-500 text-sm">
                                {t('about.values.custom.desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20 container mx-auto px-4 text-center">
                <div className="max-w-xl mx-auto space-y-8">
                    <Diamond className="w-10 h-10 text-primary mx-auto" />
                    <h2 className="text-4xl font-serif font-bold">{t('about.visit.title')}</h2>
                    <p className="text-gray-600">
                        {t('about.visit.desc')}
                    </p>
                    <div className="bg-gray-50 p-6 rounded-sm inline-block text-left w-full border border-gray-100">
                        <div className="space-y-4">
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-bold">{t('about.visit.store')}</span>
                                <span className="text-gray-500">{t('about.visit.hours')}</span>
                            </div>
                            <div className="text-gray-500 text-sm">
                                Abdi İpekçi Cad. No: 42<br />
                                Şişli, İstanbul
                            </div>
                            <a href="mailto:hello@avcikuyumculuk.com" className="block text-primary font-bold hover:underline">hello@avcikuyumculuk.com</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
