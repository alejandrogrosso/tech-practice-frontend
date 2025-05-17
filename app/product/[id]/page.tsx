import { fetchApi } from '@/lib/api';
import { Product } from '@/types/product';
import ProductDetail from '@/components/ProductDetail';

async function getProduct(id: string): Promise<Product> {
  return fetchApi<Product>(`/api/products/${id}`);
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <main className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </main>
  );
} 