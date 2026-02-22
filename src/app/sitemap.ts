import { MetadataRoute } from 'next';
import { woo, WooProduct } from '@/lib/woocommerce';

/**
 * Dynamic Sitemap Generation
 * Automatically generates sitemap.xml for Google/Search Engines
 * Includes Homepage, all Categories, and all Product pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pcwalaonline.com';

    // 1. Static Routes (Homepage)
    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
    ];

    try {
        // 2. Dynamic Category Routes
        const categories = await woo.getCategories({ per_page: 100 });
        const categoryRoutes = categories.map((cat) => ({
            url: `${baseUrl}/category/${cat.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        // 3. Dynamic Product Routes
        // Fetch multiple pages to ensure we get a good amount of products (up to 300)
        let allProducts: WooProduct[] = [];
        try {
            const [p1, p2, p3] = await Promise.all([
                woo.getProducts({ per_page: 100, page: 1 }),
                woo.getProducts({ per_page: 100, page: 2 }),
                woo.getProducts({ per_page: 100, page: 3 }),
            ]);
            allProducts = [...p1, ...p2, ...p3];
        } catch (e) {
            console.error('Error fetching products for sitemap:', e);
            // Fallback to page 1 if parallel fails
            allProducts = await woo.getProducts({ per_page: 100, page: 1 });
        }

        const productRoutes = allProducts.map((prod) => ({
            url: `${baseUrl}/product/${prod.slug}`,
            lastModified: new Date(), // Ideally we use date_modified_gmt if available
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

        return [...staticRoutes, ...categoryRoutes, ...productRoutes];
    } catch (error) {
        console.error('Sitemap generation error:', error);
        // Return static routes at minimum if API fails
        return staticRoutes;
    }
}
