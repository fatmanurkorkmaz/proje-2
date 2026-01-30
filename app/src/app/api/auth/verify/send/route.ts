import { NextResponse } from 'next/server';
import { createVerificationToken, deleteVerificationTokens } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Generate a 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        // Clear previous tokens for this email
        await deleteVerificationTokens(email);

        // Save new token
        await createVerificationToken(email, code);

        // MOCK: Send email (log to console)
        console.log('------------------------------------------');
        console.log(`VERIFICATION CODE FOR ${email}: ${code}`);
        console.log('------------------------------------------');

        return NextResponse.json({ message: 'Verification code sent' });
    } catch (error) {
        console.error('Verify Send Error:', error);
        return NextResponse.json({ error: 'Failed to send verification code' }, { status: 500 });
    }
}
