import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        const db = await readDB();

        if (email) {
            const userOrders = db.orders.filter(o => o.customerEmail === email || o.email === email);
            return NextResponse.json(userOrders);
        }

        return NextResponse.json(db.orders);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
