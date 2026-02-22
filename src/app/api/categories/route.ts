import { NextResponse } from 'next/server';
import { woo } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';
// Vercel/Next.js ISR - revalidate every hour since this is cached in woo client too
export const revalidate = 3600;

export async function GET() {
    try {
        const categories = await woo.getCategories({ per_page: 100 });
        const catCountMap: Record<string, number> = {};

        for (const cat of categories) {
            catCountMap[cat.slug] = cat.count;
        }

        return NextResponse.json(catCountMap);
    } catch (error) {
        console.error('Failed to fetch category counts API:', error);
        return NextResponse.json({}, { status: 500 });
    }
}
