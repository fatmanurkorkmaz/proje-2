import { NextResponse } from 'next/server';

let cachedPrice: { price: number; updatedAt: string } | null = null;
let lastFetch = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export async function GET() {
    const now = Date.now();

    // Return cached if still valid
    if (cachedPrice && (now - lastFetch) < CACHE_DURATION) {
        return NextResponse.json(cachedPrice);
    }

    try {
        const res = await fetch('https://www.haremaltin.com/dashboard/ajax/doviz', {
            headers: {
                'x-requested-with': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            },
            next: { revalidate: 300 } // 5 min for Harem Altın
        });

        if (!res.ok) throw new Error('Harem Altin API error');

        const root = await res.json();

        // Harem API structure: data.ALTIN.HAS_ALTIN.satis
        const hasAltinData = root.data?.ALTIN?.HAS_ALTIN;

        if (hasAltinData) {
            // Harem API returns price as string with dots/commas or number
            let price = 0;
            const sellingStr = hasAltinData.satis;

            if (typeof sellingStr === 'number') {
                price = sellingStr;
            } else {
                price = parseFloat(sellingStr.replace(/\./g, '').replace(',', '.'));
            }

            cachedPrice = {
                price,
                updatedAt: new Date().toISOString()
            };
            lastFetch = now;

            return NextResponse.json(cachedPrice);
        }

        throw new Error('Has Altın not found in Harem API response');
    } catch (error) {
        console.error('Gold price fetch error:', error);

        // Fallback: return cached even if expired, or a reasonable default
        if (cachedPrice) {
            return NextResponse.json({ ...cachedPrice, stale: true });
        }

        // Last resort fallback value
        return NextResponse.json({
            price: 3200,
            updatedAt: new Date().toISOString(),
            fallback: true
        });
    }
}
