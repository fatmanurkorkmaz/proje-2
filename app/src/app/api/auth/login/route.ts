import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Special case for admin
        if (email === 'admin@avcikuyumculuk.com' && password === 'admin') {
            return NextResponse.json({
                user: {
                    firstName: 'Admin',
                    lastName: '',
                    email: 'admin@avcikuyumculuk.com',
                    role: 'admin'
                }
            });
        }

        const user = await findUserByEmail(email);
        if (!user || user.password !== password) {
            return NextResponse.json({ error: 'Geçersiz e-posta veya şifre' }, { status: 401 });
        }

        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json({ user: userWithoutPassword });
    } catch (error) {
        return NextResponse.json({ error: 'Giriş yapılamadı' }, { status: 500 });
    }
}
