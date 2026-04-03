/**
 * WooCommerce REST API client for server-side operations
 * All functions run on server only, never expose credentials to client
 */

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  sku: string;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  brands?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
  image?: {
    id: number;
    src: string;
    alt: string;
  };
}

export interface WooSearchParams {
  search?: string;
  category?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  orderby?: 'relevance' | 'date' | 'price' | 'popularity';
  order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
}

/**
 * Lightweight product fields for listing/card views.
 * Excludes description, short_description, and other heavy fields.
 */
const LISTING_FIELDS = [
  'id', 'name', 'slug', 'price', 'regular_price', 'sale_price',
  'stock_status', 'images', 'categories', 'brands', 'attributes',
].join(',');

class WooCommerceClient {
  private baseUrl: string;
  private consumerKey: string;
  private consumerSecret: string;

  constructor() {
    this.baseUrl = process.env.WOOCOMMERCE_BASE_URL || '';
    this.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
    this.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

    if (!this.baseUrl || !this.consumerKey || !this.consumerSecret) {
      throw new Error('WooCommerce environment variables not configured');
    }
  }

  private buildUrl(
    endpoint: string,
    params: Record<string, string | number | boolean> = {}
  ): URL {
    const url = new URL(`/wp-json/wc/v3/${endpoint}`, this.baseUrl);
    url.searchParams.set('consumer_key', this.consumerKey);
    url.searchParams.set('consumer_secret', this.consumerSecret);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
    return url;
  }

  private async request<T>(
    endpoint: string,
    params: Record<string, string | number | boolean> = {},
    cacheTtl: number = 900
  ): Promise<T> {
    const url = this.buildUrl(endpoint, params);

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: cacheTtl },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('WooCommerce API error response:', errorText);
        throw new Error(`WooCommerce API error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('WooCommerce API request failed for URL:', url.pathname);
      console.error('Error details:', error);
      throw error;
    }
  }

  /**
   * Like request(), but also returns x-wp-total and x-wp-totalpages headers
   */
  private async requestWithMeta<T>(
    endpoint: string,
    params: Record<string, string | number | boolean> = {},
    cacheTtl: number = 900
  ): Promise<{ data: T; total: number; totalPages: number }> {
    const url = this.buildUrl(endpoint, params);

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: cacheTtl },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('WooCommerce API error response:', errorText);
        throw new Error(`WooCommerce API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as T;
      const total = parseInt(response.headers.get('x-wp-total') || '0');
      const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '1');

      return { data, total, totalPages };
    } catch (error) {
      console.error('WooCommerce API request failed for URL:', url.pathname);
      console.error('Error details:', error);
      throw error;
    }
  }

  /**
   * Get products with search/filter params (lightweight: no descriptions)
   */
  async getProducts(params: WooSearchParams = {}): Promise<WooProduct[]> {
    const queryParams: Record<string, string | number> = {
      status: 'publish',
      per_page: params.per_page || 20,
      page: params.page || 1,
      _fields: LISTING_FIELDS,
    };

    if (params.search) {
      queryParams.search = params.search;
    }

    if (params.category) {
      queryParams.category = params.category;
    }

    if (params.min_price || params.max_price) {
      if (params.min_price) queryParams.min_price = params.min_price;
      if (params.max_price) queryParams.max_price = params.max_price;
    }

    if (params.orderby) {
      queryParams.orderby = params.orderby === 'relevance' ? 'relevance' : params.orderby;
      queryParams.order = params.order || 'desc';
    }

    return this.request<WooProduct[]>('products', queryParams, 1800);
  }

  /**
   * Get products with pagination metadata (total, totalPages)
   */
  async getProductsWithMeta(params: WooSearchParams = {}): Promise<{
    products: WooProduct[];
    total: number;
    totalPages: number;
  }> {
    const queryParams: Record<string, string | number> = {
      status: 'publish',
      per_page: params.per_page || 20,
      page: params.page || 1,
      _fields: LISTING_FIELDS,
    };

    if (params.search) queryParams.search = params.search;
    if (params.category) queryParams.category = params.category;
    if (params.min_price) queryParams.min_price = params.min_price;
    if (params.max_price) queryParams.max_price = params.max_price;

    if (params.orderby) {
      queryParams.orderby = params.orderby === 'relevance' ? 'relevance' : params.orderby;
      queryParams.order = params.order || 'desc';
    }

    const { data, total, totalPages } = await this.requestWithMeta<WooProduct[]>('products', queryParams, 1800);
    return { products: data, total, totalPages };
  }

  /**
   * Get single product by slug (full data including descriptions)
   */
  async getProductBySlug(slug: string): Promise<WooProduct | null> {
    const products = await this.request<WooProduct[]>('products', { slug, status: 'publish' }, 900);
    return products[0] || null;
  }

  /**
   * Get single product by ID (full data)
   */
  async getProductById(id: number): Promise<WooProduct | null> {
    try {
      return await this.request<WooProduct>(`products/${id}`, {}, 900);
    } catch {
      return null;
    }
  }

  /**
   * Get all product categories (cached for 1 hour)
   */
  async getCategories(params: { parent?: number; per_page?: number } = {}): Promise<WooCategory[]> {
    const queryParams: Record<string, string | number> = {
      per_page: params.per_page || 100,
      orderby: 'name',
      order: 'asc',
    };

    if (params.parent !== undefined) {
      queryParams.parent = params.parent;
    }

    return this.request<WooCategory[]>('products/categories', queryParams, 3600);
  }

  /**
   * Get all products for the data feed (full data: includes descriptions, attributes, etc.)
   * Fetches up to 500 products for performance safety.
   */
  async getAllProductsForFeed(): Promise<WooProduct[]> {
    try {
      const { data: p1, totalPages } = await this.requestWithMeta<WooProduct[]>('products', {
        status: 'publish',
        per_page: 100,
        page: 1,
      }, 3600);

      const all = [...(p1 || [])];

      if (totalPages > 1) {
        const fetchLimit = Math.min(totalPages, 10); // Fetch up to 1000 products
        for (let i = 2; i <= fetchLimit; i++) {
          const pageProducts = await this.request<WooProduct[]>('products', {
            status: 'publish',
            per_page: 100,
            page: i,
          }, 3600);
          if (Array.isArray(pageProducts)) {
            all.push(...pageProducts);
          }
        }
      }


      return all;
    } catch (error) {
      console.error('Error fetching all products for feed:', error);
      return [];
    }
  }

  /**
   * Get single category by slug (cached for 1 hour)
   */
  async getCategoryBySlug(slug: string): Promise<WooCategory | null> {
    const categories = await this.request<WooCategory[]>('products/categories', { slug }, 3600);
    return categories[0] || null;
  }

  /**
   * Get products by category slug.
   * Accepts optional categoryId to skip the extra slug lookup.
   */
  async getProductsByCategory(
    categorySlug: string,
    params: WooSearchParams = {},
    categoryId?: number
  ): Promise<WooProduct[]> {
    let id = categoryId;

    if (!id) {
      const category = await this.getCategoryBySlug(categorySlug);
      if (!category) return [];
      id = category.id;
    }

    return this.getProducts({
      ...params,
      category: id.toString(),
    });
  }
}

// Singleton instance
let wooClient: WooCommerceClient | null = null;

export function getWooClient(): WooCommerceClient {
  if (!wooClient) {
    wooClient = new WooCommerceClient();
  }
  return wooClient;
}

// Convenience exports
export const woo = {
  getProducts: (params?: WooSearchParams) => getWooClient().getProducts(params),
  getProductsWithMeta: (params?: WooSearchParams) => getWooClient().getProductsWithMeta(params),
  getProductBySlug: (slug: string) => getWooClient().getProductBySlug(slug),
  getProductById: (id: number) => getWooClient().getProductById(id),
  getCategories: (params?: { parent?: number; per_page?: number }) => getWooClient().getCategories(params),
  getCategoryBySlug: (slug: string) => getWooClient().getCategoryBySlug(slug),
  getProductsByCategory: (categorySlug: string, params?: WooSearchParams, categoryId?: number) =>
    getWooClient().getProductsByCategory(categorySlug, params, categoryId),
  getAllProductsForFeed: () => getWooClient().getAllProductsForFeed(),
};
