import Link from 'next/link';
import Image from 'next/image';
import { woo } from '@/lib/woocommerce';

// ISR: revalidate every 2 hours
export const revalidate = 7200;

export default async function HomePage() {
  // Fetch featured categories and latest products
  const [categories, latestProducts] = await Promise.all([
    woo.getCategories({ parent: 0, per_page: 8 }), // Top-level categories only
    woo.getProducts({ per_page: 8, orderby: 'date', order: 'desc' }),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tech Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Premium computers, components, and accessories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/category/prebuilt-pcs"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Prebuilt PCs
              </Link>
              <Link
                href="/category/components"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Browse Components
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Shop by Category
          </h2>
          
          {categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 text-center"
                >
                  {category.image && (
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <Image
                        src={category.image.src}
                        alt={category.image.alt || category.name}
                        fill
                        className="object-cover rounded-lg"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.count} products
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No categories available yet.</p>
            </div>
          )}
        </section>

        {/* Latest Products Section */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Latest Products
            </h2>
            <Link
              href="/search"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All →
            </Link>
          </div>

          {latestProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square">
                    {product.images.length > 0 ? (
                      <Image
                        src={product.images[0].src}
                        alt={product.images[0].alt || product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {/* Price */}
                    <div className="mb-2">
                      {product.sale_price && product.sale_price !== product.regular_price ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-red-600">
                            ${product.sale_price}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${product.regular_price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price}
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock_status === 'instock' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No products available yet.</p>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="mt-20 py-16 bg-white rounded-lg shadow-sm">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Why Choose Us?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Quality Products
                </h3>
                <p className="text-gray-600">
                  Only the best brands and latest technology for your needs.
                </p>
              </div>

              <div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  WhatsApp Support
                </h3>
                <p className="text-gray-600">
                  Get instant support and place orders directly through WhatsApp.
                </p>
              </div>

              <div>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Fast Service
                </h3>
                <p className="text-gray-600">
                  Quick responses and efficient order processing for your convenience.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}