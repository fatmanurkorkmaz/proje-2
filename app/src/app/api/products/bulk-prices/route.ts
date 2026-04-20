import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { updates } = body; // Array of { id: string, price: number }

        if (!updates || !Array.isArray(updates)) {
            return NextResponse.json({ error: 'Invalid updates format' }, { status: 400 });
        }

        const result = await prisma.$transaction(
            updates.map((u) =>
                prisma.product.update({
                    where: { id: u.id },
                    data: { price: Number(u.price) }
                })
            )
        );

        return NextResponse.json({
            message: `${result.length} ürün fiyatı başarıyla güncellendi.`,
            count: result.length
        });
    } catch (error) {
        console.error('Bulk price update error:', error);
        return NextResponse.json({ error: 'Toplu fiyat güncellemesi başarısız oldu.' }, { status: 500 });
    }
}
