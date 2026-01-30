import { NextResponse } from 'next/server';
import { getVerificationToken, deleteVerificationTokens } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { email, code } = await request.json();

        if (!email || !code) {
            return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
        }

        const token = await getVerificationToken(email, code);

        if (!token) {
            return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 });
        }

        // Code is valid, delete it so it can't be used again
        await deleteVerificationTokens(email);

        return NextResponse.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        console.error('Verify Check Error:', error);
        return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
    }
}
