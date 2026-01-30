import { NextResponse } from 'next/server';
import { createOrder, readDB } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newOrder = await createOrder(body);
        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const db = await readDB();
        return NextResponse.json(db.orders);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
