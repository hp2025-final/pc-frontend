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

  private async request<T>(endpoint: string, params: Record<string, string | number | boolean> = {}): Promise<T> {
    const url = new URL(`/wp-json/wc/v3/${endpoint}`, this.baseUrl);
    
    // Add auth params
    url.searchParams.set('consumer_key', this.consumerKey);
    url.searchParams.set('consumer_secret', this.consumerSecret);
    
    // Add query params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Cache for ISR
        next: { revalidate: 900 }, // 15 minutes default
      });

      if (!response.ok) {
        throw new Error(`WooCommerce API error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('WooCommerce API request failed:', error);
      throw error;
    }
  }

  /**
   * Get products with search/filter params
   */
  async getProducts(params: WooSearchParams = {}): Promise<WooProduct[]> {
    const queryParams: Record<string, string | number> = {
      status: 'publish',
      per_page: params.per_page || 20,
      page: params.page || 1,
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

    return this.request<WooProduct[]>('products', queryParams);
  }

  /**
   * Get single product by slug
   */
  async getProductBySlug(slug: string): Promise<WooProduct | null> {
    const products = await this.request<WooProduct[]>('products', { slug, status: 'publish' });
    return products[0] || null;
  }

  /**
   * Get single product by ID
   */
  async getProductById(id: number): Promise<WooProduct | null> {
    try {
      return await this.request<WooProduct>(`products/${id}`);
    } catch {
      return null;
    }
  }

  /**
   * Get all product categories
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

    return this.request<WooCategory[]>('products/categories', queryParams);
  }

  /**
   * Get single category by slug
   */
  async getCategoryBySlug(slug: string): Promise<WooCategory | null> {
    const categories = await this.request<WooCategory[]>('products/categories', { slug });
    return categories[0] || null;
  }

  /**
   * Get products by category slug
   */
  async getProductsByCategory(categorySlug: string, params: WooSearchParams = {}): Promise<WooProduct[]> {
    const category = await this.getCategoryBySlug(categorySlug);
    if (!category) {
      return [];
    }

    return this.getProducts({
      ...params,
      category: category.id.toString(),
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
  getProductBySlug: (slug: string) => getWooClient().getProductBySlug(slug),
  getProductById: (id: number) => getWooClient().getProductById(id),
  getCategories: (params?: { parent?: number; per_page?: number }) => getWooClient().getCategories(params),
  getCategoryBySlug: (slug: string) => getWooClient().getCategoryBySlug(slug),
  getProductsByCategory: (categorySlug: string, params?: WooSearchParams) => getWooClient().getProductsByCategory(categorySlug, params),
};

