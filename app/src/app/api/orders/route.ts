import { NextResponse } from 'next/server';
import { getOrders, createOrder } from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        const orders = await getOrders();

        if (email) {
            const userOrders = orders.filter((o: any) =>
                o.user?.email === email || o.customer?.email === email
            );
            return NextResponse.json(userOrders);
        }

        return NextResponse.json(orders);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const order = await request.json();
        const newOrder = await createOrder(order);
        return NextResponse.json(newOrder);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
