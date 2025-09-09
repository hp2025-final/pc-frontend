import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { woo } from '@/lib/woocommerce';
import WhatsAppButton from '@/components/WhatsAppButton';

interface ProductPageProps {
  params: { slug: string };
}

// ISR: revalidate every 30 minutes
export const revalidate = 1800;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await woo.getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - PC Wala Online`,
    description: product.short_description || product.description,
    openGraph: {
      title: product.name,
      description: product.short_description || product.description,
      images: product.images.length > 0 ? [product.images[0].src] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await woo.getProductBySlug(params.slug);

  if (!product) {
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
            {product.categories.length > 0 && (
              <>
                <span className="text-gray-400">/</span>
                <li>
                  <Link 
                    href={`/category/${product.categories[0].slug}`}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {product.categories[0].name}
                  </Link>
                </li>
              </>
            )}
            <span className="text-gray-400">/</span>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              {product.images.length > 0 ? (
                <div className="relative aspect-square">
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-6">
                {product.sale_price && product.sale_price !== product.regular_price ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-red-600">
                      ${product.sale_price}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.regular_price}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                )}
              </div>

              {/* SKU */}
              {product.sku && (
                <p className="text-sm text-gray-600 mb-4">
                  SKU: <span className="font-mono">{product.sku}</span>
                </p>
              )}

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock_status === 'instock' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Short Description */}
              {product.short_description && (
                <div 
                  className="text-gray-700 mb-6"
                  dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
              )}

              {/* WhatsApp Order Button */}
              <WhatsAppButton product={product} />
            </div>
          </div>

          {/* Full Description */}
          {product.description && (
            <div className="p-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <div 
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {/* Specifications */}
          {product.attributes.length > 0 && (
            <div className="p-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.attributes.map((attr) => (
                  <div key={attr.id} className="border-b border-gray-200 pb-2">
                    <dt className="font-medium text-gray-900">{attr.name}</dt>
                    <dd className="text-gray-700">{attr.options.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


