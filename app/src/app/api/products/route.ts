import { NextResponse } from 'next/server';
import { products as staticProducts } from '@/data/products';

let dbAvailable: boolean | null = null;

async function tryGetFromDB() {
    try {
        const { getProducts, migrateJsonToSql } = await import('@/lib/db');
        await migrateJsonToSql();
        const products = await getProducts();
        dbAvailable = true;
        return products;
    } catch (error) {
        console.warn('Database unavailable, using static product data:', (error as Error).message);
        dbAvailable = false;
        return null;
    }
}

export async function GET() {
    // Try database first, fall back to static data
    const dbProducts = await tryGetFromDB();
    
    if (dbProducts && dbProducts.length > 0) {
        return NextResponse.json(dbProducts);
    }
    
    // Fallback: return static products
    return NextResponse.json(staticProducts);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        if (dbAvailable === false) {
            // DB not available, return the body with a generated id
            const newProduct = {
                ...body,
                id: String(Date.now()),
                createdAt: new Date().toISOString(),
            };
            return NextResponse.json(newProduct, { status: 201 });
        }
        
        const { addProduct } = await import('@/lib/db');
        const newProduct = await addProduct(body);
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
