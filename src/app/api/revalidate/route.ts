import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * On-demand revalidation endpoint for WooCommerce webhooks
 * Called when products/categories are updated in WP
 */

export async function POST(request: NextRequest) {
  try {
    // Verify shared secret
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.REVALIDATE_SECRET;

    if (!expectedSecret) {
      console.error('REVALIDATE_SECRET not configured');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    if (!authHeader || authHeader !== `Bearer ${expectedSecret}`) {
      console.error('Invalid revalidation secret');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, slug, id } = body;

    console.log('Revalidation request:', { type, slug, id });

    // Revalidate based on type
    switch (type) {
      case 'product':
        if (slug) {
          // Revalidate specific product page
          await revalidatePath(`/product/${slug}`);
          console.log(`Revalidated product: /product/${slug}`);
        }
        // Revalidate home and search (might show this product)
        await revalidatePath('/');
        await revalidatePath('/search');
        break;

      case 'category':
        if (slug) {
          // Revalidate specific category page
          await revalidatePath(`/category/${slug}`);
          console.log(`Revalidated category: /category/${slug}`);
        }
        // Revalidate home (might show categories)
        await revalidatePath('/');
        break;

      case 'product_category':
        // Handle WooCommerce product_category taxonomy updates
        if (slug) {
          await revalidatePath(`/category/${slug}`);
          console.log(`Revalidated category: /category/${slug}`);
        }
        await revalidatePath('/');
        break;

      default:
        console.log('Unknown revalidation type:', type);
        // Revalidate home as fallback
        await revalidatePath('/');
        break;
    }

    return NextResponse.json({ 
      success: true, 
      message: `Revalidated ${type}${slug ? ` (${slug})` : ''}`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

