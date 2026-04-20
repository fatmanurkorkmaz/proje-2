import { NextResponse } from 'next/server';
import { products as staticProducts } from '@/data/products';

async function tryGetProductFromDB(id: string) {
    try {
        const { getProduct } = await import('@/lib/db');
        const product = await getProduct(id);
        return product;
    } catch (error) {
        console.warn('Database unavailable for product lookup, using static data');
        return null;
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    
    // Try database first
    const dbProduct = await tryGetProductFromDB(id);
    if (dbProduct) {
        return NextResponse.json(dbProduct);
    }
    
    // Fallback to static data
    const product = staticProducts.find(p => p.id === id);
    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const { updateProduct } = await import('@/lib/db');
        const updated = await updateProduct(id, body);

        if (!updated) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const { deleteProduct } = await import('@/lib/db');
        await deleteProduct(id);
    } catch (error) {
        console.warn('Database unavailable for delete');
    }
    return NextResponse.json({ success: true });
}
