import { NextResponse } from 'next/server';
import { getUsers, addUser, findUserByEmail } from '@/lib/db';

export async function GET() {
    try {
        const users = await getUsers();
        // Remove passwords for security
        const safeUsers = users.map(({ password, ...user }) => user);
        return NextResponse.json(safeUsers);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, password, role, isVerified } = body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return NextResponse.json({ error: 'Bu e-posta adresi zaten kullanımda' }, { status: 400 });
        }

        const newUser = await addUser({
            firstName,
            lastName,
            email,
            password,
            role: role || 'customer',
            isVerified: isVerified || false
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Kullanıcı oluşturulamadı' }, { status: 500 });
    }
}
