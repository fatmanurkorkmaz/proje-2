'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Diamond } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useAuth();
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

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
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
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-secondary/5 py-12">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Diamond className="w-6 h-6 fill-current" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-gray-900">Aramıza Katılın</h1>
                    <p className="text-gray-500 text-sm">AVCI Kuyumculuk ayrıcalıklarından yararlanın.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Ad</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Soyad</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">E-posta</label>
                        <input
                            type="email"
                            name="email"
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Şifre</label>
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Şifre Tekrar</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-secondary-foreground py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors mt-4"
                    >
                        Üye Ol
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Zaten hesabınız var mı? <Link href="/login" className="text-primary font-bold hover:underline">Giriş Yap</Link>
                </div>
            </div>
        </div>
    );
}
