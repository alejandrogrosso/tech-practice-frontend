import { Product } from '@/types/product';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ImageGallery from './ImageGallery';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Galería de imágenes */}
      <ImageGallery pictures={product.pictures} title={product.title} />

      {/* Información del producto */}
      <div className="space-y-6">
        {/* Vendedor */}
        <div className="flex items-center space-x-2">
          <Image
            src={product.seller.logo}
            alt={product.seller.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-sm text-gray-600">{product.seller.name}</span>
        </div>

        {/* Título y detalles básicos */}
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-sm text-gray-600">
              {product.sold_quantity} vendidos
            </span>
            {product.condition === 'new' && (
              <span className="text-sm text-gray-600">• Nuevo</span>
            )}
          </div>
        </div>

        {/* Precio */}
        <div>
          <span className="text-3xl font-semibold">
            {product.price.currency} {product.price.amount}
          </span>
          {product.free_shipping && (
            <p className="text-green-600 text-sm mt-1">Envío gratis</p>
          )}
        </div>

        {/* Características */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Características principales</h2>
            <div className="space-y-2">
              {product.attributes.map((attr) => (
                <div key={attr.id} className="grid grid-cols-2">
                  <span className="text-gray-600">{attr.name}</span>
                  <span>{attr.value_name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Métodos de pago */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Medios de pago</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Tarjetas de crédito</h3>
                <div className="flex flex-wrap gap-2">
                  {product.payment_methods.credit_card.map((card) => (
                    <span key={card} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {card}
                    </span>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Tarjetas de débito</h3>
                <div className="flex flex-wrap gap-2">
                  {product.payment_methods.debit_card.map((card) => (
                    <span key={card} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {card}
                    </span>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Otros medios de pago</h3>
                <div className="flex flex-wrap gap-2">
                  {product.payment_methods.other.map((method) => (
                    <span key={method} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Descripción */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Descripción</h2>
            <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
          </CardContent>
        </Card>

        {/* Garantía */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Garantía</h2>
            <p className="text-gray-600">{product.warranty}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 