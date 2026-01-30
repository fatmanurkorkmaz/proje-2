'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Diamond, Lock } from 'lucide-react';
import Cookies from 'js-cookie';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin') {
            Cookies.set('admin_auth', 'true', { expires: 1, path: '/' }); // 1 day session
            window.location.href = '/admin';
        } else {
            setError('Hatalı şifre.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/5">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Diamond className="w-8 h-8 fill-current" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-gray-900">Admin Girişi</h1>
                    <p className="text-gray-500">Lütfen panele erişmek için şifrenizi girin.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Şifre</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none pl-10"
                                placeholder="******"
                            />
                            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                        </div>
                        {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-secondary-foreground py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
                    >
                        Giriş Yap
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">Demo Şifre: <strong>admin</strong></p>
                </div>
            </div>
        </div>
    );
}
