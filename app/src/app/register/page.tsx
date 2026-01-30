'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Diamond } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Şifreler eşleşmiyor!');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    isVerified: true
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || 'Üyelik oluşturulamadı.');
                return;
            }

            // Automatically login
            login({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: 'customer'
            });
            router.push('/');
        } catch (error) {
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-secondary/5 py-12 px-4">
            <div className="w-full max-w-md bg-white p-10 rounded-sm shadow-xl border border-secondary/5 relative overflow-hidden">
                <div className="text-center mb-10">
                    <div className="w-14 h-14 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-primary/10">
                        <Diamond className="w-7 h-7 fill-current" />
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-secondary mb-2 tracking-tight">
                        Hemen Başlayın
                    </h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em]">
                        AVCI KUYUMCULUK AYRICALIĞI
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Ad</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Adınız"
                                className="w-full px-4 py-3.5 border border-gray-100 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Soyad</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Soyadınız"
                                className="w-full px-4 py-3.5 border border-gray-100 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">E-posta</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ornek@mail.com"
                            className="w-full px-4 py-3.5 border border-gray-100 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Şifre Belirleyin</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="******"
                            className="w-full px-4 py-3.5 border border-gray-100 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Şifre Tekrar</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="******"
                            className="w-full px-4 py-3.5 border border-gray-100 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-secondary text-white py-4 rounded-sm font-black text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-secondary transition-all shadow-xl active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? 'KAYDEDİLİYOR...' : 'ÜYELİĞİ TAMAMLA'}
                    </button>
                </form>

                <div className="mt-10 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Zaten hesabınız var mı? <Link href="/login" className="text-primary hover:underline ml-1">GİRİŞ YAP</Link>
                </div>
            </div>
        </div>
    );
}
