import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { woo } from '@/lib/woocommerce';

interface CategoryPageProps {
  params: { slug: string };
  searchParams: { page?: string };
}

// ISR: revalidate every 60 minutes
export const revalidate = 3600;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await woo.getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - PC Wala Online`,
    description: category.description || `Browse our ${category.name} collection`,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const page = parseInt(searchParams.page || '1');
  const perPage = 20;

  const [category, products] = await Promise.all([
    woo.getCategoryBySlug(params.slug),
    woo.getProductsByCategory(params.slug, {
      page,
      per_page: perPage,
      orderby: 'date',
      order: 'desc',
    }),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <span className="text-gray-400">/</span>
            <li className="text-gray-900 font-medium">{category.name}</li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center">
            {category.image && (
              <div className="relative w-24 h-24 mr-6">
                <Image
                  src={category.image.src}
                  alt={category.image.alt || category.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-gray-600">{category.description}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                {category.count} products
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
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
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
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
                            Rs. {product.sale_price}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            Rs. {product.regular_price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          Rs. {product.price}
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

            {/* Pagination (basic) */}
            {products.length === perPage && (
              <div className="mt-8 flex justify-center">
                <Link
                  href={`/category/${params.slug}?page=${page + 1}`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load More Products
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h2>
            <p className="text-gray-600 mb-6">
              This category doesn&apos;t have any products yet.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse All Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

