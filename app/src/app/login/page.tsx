'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Diamond } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CustomerLoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || 'Giriş yapılamadı.');
                return;
            }

            login(data.user);
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
                    <h1 className="text-2xl font-serif font-bold text-gray-900">Müşteri Girişi</h1>
                    <p className="text-gray-500 text-sm">Hesabınıza erişmek için giriş yapın.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">E-posta</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            placeholder="ornek@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Şifre</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            placeholder="******"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-secondary-foreground py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
                    >
                        Giriş Yap
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Hesabınız yok mu? <Link href="/register" className="text-primary font-bold hover:underline">Üye Ol</Link>
                </div>
            </div>
        </div>
    );
}
