import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
    try {
        // Fetch current gold price
        const goldRes = await fetch(process.env.NEXT_PUBLIC_BASE_URL
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/gold-price`
            : 'http://localhost:3000/api/gold-price');
        const goldData = await goldRes.json();
        const goldPrice = goldData.price;

        if (!goldPrice || goldPrice <= 0) {
            return NextResponse.json({ error: 'Gold price not available' }, { status: 500 });
        }

        // Get all products with weight > 0
        const products = await prisma.product.findMany({
            where: { weight: { gt: 0 } }
        });

        let updatedCount = 0;
        for (const product of products) {
            const newPrice = Math.round(product.weight * goldPrice);
            if (newPrice !== product.price) {
                await prisma.product.update({
                    where: { id: product.id },
                    data: { price: newPrice }
                });
                updatedCount++;
            }
        }

        return NextResponse.json({
            message: `${updatedCount} ürün fiyatı güncellendi.`,
            goldPrice,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error('Price update error:', error);
        return NextResponse.json({ error: 'Fiyat güncellemesi başarısız.' }, { status: 500 });
    }
}
