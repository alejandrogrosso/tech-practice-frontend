"use client"

import { useState } from "react"
import { Heart, Star, Truck, Shield, Store } from "lucide-react"
import { Product } from "@/types/product"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  // Estado para la imagen seleccionada
  const [selectedImage, setSelectedImage] = useState(product.pictures[0])
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="bg-[#f5f6fa] min-h-screen w-full py-0">
      <div className="flex justify-center">
        <div className="w-full max-w-[1200px] flex flex-col gap-0">
          {/* Breadcrumbs */}
          <nav className="text-xs text-[#3483fa] mb-2 flex flex-wrap gap-1 pt-6 pl-6">
            <a href="#" className="hover:underline">Volver al listado</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:underline">Celulares y Teléfonos</a>
            <span className="text-gray-400">&gt;</span>
            <a href="#" className="hover:underline">Celulares y Smartphones</a>
            <span className="text-gray-400">&gt;</span>
            <a href="#" className="hover:underline">{product.brand}</a>
          </nav>

          {/* Main content: galería + detalles + sidebar */}
          <div className="flex flex-row gap-6 items-start">
            {/* Galería y detalles */}
            <div className="flex flex-row gap-6 flex-1">
              {/* Galería */}
              <div className="w-[440px] flex-shrink-0 pt-2">
                <div className="grid grid-cols-[56px_1fr] h-[440px]">
                  {/* Thumbnails */}
                  <div className="flex flex-col gap-1 items-center py-0 overflow-y-auto">
                    {product.pictures.map((img) => (
                      <button
                        key={img.id}
                        onClick={() => setSelectedImage(img)}
                        className={`w-11 h-11 border ${selectedImage.id === img.id ? "border-[#3483fa]" : "border-gray-200"} bg-white flex items-center justify-center cursor-pointer transition-colors rounded-[4px]`}
                        style={{ outline: selectedImage.id === img.id ? '2px solid #3483fa' : 'none' }}
                      >
                        <img
                          src={img.url.startsWith('http') ? img.url.replace('http://localhost:3000', '') : img.url}
                          alt={product.title}
                          className="object-contain w-8 h-8"
                        />
                      </button>
                    ))}
                  </div>
                  {/* Imagen principal */}
                  <div className="flex items-start justify-center bg-white h-[440px] pt-0">
                    <img
                      src={selectedImage.url.startsWith('http') ? selectedImage.url.replace('http://localhost:3000', '') : selectedImage.url}
                      alt={product.title}
                      className="object-contain max-h-[420px] w-auto h-auto"
                      style={{ maxWidth: 340 }}
                    />
                  </div>
                </div>
              </div>

              {/* Detalles principales */}
              <div className="flex-1 max-w-[420px] w-full pt-2">
                {/* Link a tienda oficial y estado */}
                <div className="mb-1 flex items-center gap-2 flex-wrap">
                  <a href="#" className="text-[#3483fa] text-xs font-semibold hover:underline">Visita la Tienda oficial de Samsung</a>
                  <span className="text-gray-300">|</span>
                  <span className="text-xs text-gray-500">Nuevo</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-xs text-gray-500">+{product.sold_quantity} vendidos</span>
                </div>
                {/* Badge y categoría */}
                <div className="mb-1 flex items-center gap-2">
                  <span className="bg-[#ffe600] text-[#333] text-[10px] font-bold px-2 py-[2px] rounded-[3px] mr-2">MÁS VENDIDO</span>
                  <span className="text-xs text-gray-500">en Celulares y Smartphones</span>
                </div>
                {/* Título */}
                <h1 className="text-[1.45rem] font-bold text-gray-900 mb-1 leading-tight">{product.title}</h1>
                {/* Estrellas y reviews */}
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-[#3483fa] font-semibold text-base">4.8</span>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#3483fa] fill-[#3483fa]" />
                  ))}
                  <span className="text-xs text-gray-500">(759)</span>
                </div>
                {/* Precio y cuotas */}
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-base text-gray-700">US$</span>
                  <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                  {product.original_price && (
                    <span className="text-gray-400 line-through text-base ml-2">US$ {product.original_price}</span>
                  )}
                  {product.original_price && (
                    <span className="text-green-600 font-semibold text-xs ml-2">
                      {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                    </span>
                  )}
                </div>
                <div className="text-green-600 font-semibold mb-1 text-xs">Mismo precio en 3 cuotas de $313.333 sin interés</div>
                <div className="text-xs text-gray-500 mb-3">Precio sin impuestos nacionales: $776.859</div>
                {/* Color */}
                <div className="mb-2">
                  <span className="font-semibold">Color: </span>
                  <span className="text-gray-700">Azul oscuro</span>
                  <div className="mt-2">
                    <span className="inline-block w-6 h-6 rounded border border-gray-400 bg-gray-100"></span>
                  </div>
                </div>
                {/* Highlights */}
                <div className="mb-2">
                  <h2 className="font-semibold mb-2 text-base">Lo que tenés que saber de este producto</h2>
                  <ul className="list-disc pl-5 text-[15px] text-gray-800 space-y-1">
                    <li>Memoria RAM: 8 GB</li>
                    <li>Dispositivo desbloqueado para que elijas tu compañía telefónica preferida.</li>
                    <li>Compatible con redes 5G.</li>
                    <li>Pantalla Super AMOLED de 6.6 pulgadas.</li>
                    <li>Batería de 5000 mAh.</li>
                    <li>Memoria interna de 128 GB.</li>
                    <li>Con reconocimiento facial y sensor de huellas dactilares.</li>
                  </ul>
                  <a href="#" className="text-[#3483fa] text-sm mt-2 inline-block hover:underline">Ver características</a>
                </div>
                {/* Opciones de compra */}
                <div className="text-xs text-gray-500">Opciones de compra: <a href="#" className="text-[#3483fa] hover:underline">3 productos nuevos desde $699.000</a></div>
              </div>
            </div>

            {/* Sidebar derecha */}
            <aside className="w-[320px] flex flex-col gap-3 md:sticky md:top-6 h-fit pt-2">
              {/* Card de envío y stock */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-green-600 font-semibold text-xs mb-1">
                  <Truck className="w-4 h-4" />
                  Llega gratis el miércoles
                </div>
                <div className="text-xs text-gray-500 mb-1">Comprando dentro de las próximas 10 h 39 min <a href="#" className="text-[#3483fa] hover:underline">Más formas de entrega</a></div>
                <div className="text-xs text-gray-500 mb-1">Retirá gratis el miércoles y el sábado 24/mayo en correo y otros puntos <a href="#" className="text-[#3483fa] hover:underline">Ver en el mapa</a></div>
                <div className="text-xs text-gray-700 font-semibold mt-2">Stock disponible</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs">Cantidad:</span>
                  <select value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="border border-gray-300 rounded px-2 py-1 text-xs">
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} unidad{n>1?"es":""}</option>)}
                  </select>
                  <span className="text-xs text-gray-400">(4 disponibles)</span>
                </div>
              </div>
              {/* Botones de compra */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
                <button className="w-full bg-[#3483fa] hover:bg-[#2968c8] text-white font-semibold py-3 rounded text-base">Comprar ahora</button>
                <button className="w-full bg-[#e3edfb] text-[#3483fa] font-semibold py-3 rounded text-base border border-[#3483fa]">Agregar al carrito</button>
              </div>
              {/* Card de vendedor */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <img src={product.seller.logo.startsWith('http') ? product.seller.logo.replace('http://localhost:3000', '') : product.seller.logo} alt={product.seller.name} className="w-8 h-8 object-contain rounded-full border" />
                  <div>
                    <div className="font-semibold text-xs">{product.seller.name}</div>
                    <div className="text-xs text-gray-500">+{product.seller.seller_reputation.transactions.completed} ventas</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <Store className="w-4 h-4 text-[#3483fa]" />
                  Tienda oficial
                </div>
                <button className="w-full border border-[#3483fa] text-[#3483fa] font-semibold py-2 rounded text-xs hover:bg-[#f2f7fd]">Ir a la tienda oficial</button>
              </div>
              {/* Card de medios de pago */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
                <div className="text-green-600 font-semibold text-xs mb-1">¡Pagá en hasta 12 cuotas sin interés!</div>
                <div className="text-xs text-gray-700 mb-2">Tarjetas de crédito <span className="text-gray-400">|</span> <span className="text-[#3483fa] hover:underline cursor-pointer">Ver promociones</span></div>
                <div className="flex gap-2 mb-2">
                  <img src="/images/brands/visa.png" alt="Visa" className="h-5" />
                  <img src="/images/brands/mastercard.png" alt="Mastercard" className="h-5" />
                  <img src="/images/brands/amex.png" alt="Amex" className="h-5" />
                  <img src="/images/brands/oca.png" alt="OCA" className="h-5" />
                </div>
                <div className="text-xs text-gray-700 mb-1">Efectivo <span className="text-gray-400">|</span> <span className="text-[#3483fa] hover:underline cursor-pointer">Ver más</span></div>
                <div className="flex gap-2 mb-2">
                  <img src="/images/brands/pagofacil.png" alt="Pago Fácil" className="h-5" />
                  <img src="/images/brands/rapipago.png" alt="Rapipago" className="h-5" />
                </div>
                <a href="#" className="text-[#3483fa] text-xs hover:underline">Conocé otros medios de pago</a>
              </div>
              {/* Card de protección y garantía */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                  <Shield className="w-4 h-4 text-[#3483fa]" />
                  <span>Devolución gratis. Tenés 30 días desde que lo recibís.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                  <Shield className="w-4 h-4 text-[#3483fa]" />
                  <span>Compra Protegida, recibí el producto que esperabas o te devolvemos tu dinero.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <Shield className="w-4 h-4 text-[#3483fa]" />
                  <span>12 meses de garantía de fábrica.</span>
                </div>
              </div>
              {/* Sidebar: Productos relacionados */}
              <div className="bg-white border border-gray-200 rounded-lg p-0 mt-2">
                <div className="px-4 pt-4 pb-2 border-b border-gray-200">
                  <h2 className="text-base font-bold text-gray-900 mb-1">Productos relacionados</h2>
                  <span className="text-xs text-gray-500">Promocionado</span>
                </div>
                <div className="px-2 py-2 flex flex-col gap-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="flex gap-2 items-center border-b last:border-b-0 border-gray-100 pb-2 last:pb-0">
                      <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded">
                        <img src="/images/products/galaxy-a55/front.jpg" alt="Producto relacionado" className="object-contain h-9" />
                      </div>
                      <div className="flex-1">
                        <div className="text-green-600 font-semibold text-xs">US$ 421<sup className="text-[10px]">15</sup></div>
                        <div className="text-[10px] text-green-600 font-semibold">13% OFF</div>
                        <div className="text-[10px] text-gray-500">en 10 cuotas de $1.839 sin interés</div>
                        <div className="text-[10px] text-green-600">Envío gratis</div>
                        <div className="text-[10px] text-gray-700 mt-1 line-clamp-2">Samsung Galaxy M55 5G 8/256GB Dual Sim Titanium Gray</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Sección inferior: Características del producto y descripción */}
          <div className="flex flex-col gap-6 max-w-[900px] mx-auto mt-8 mb-8">
            {/* Características del producto */}
            <div className="bg-white border border-gray-200 rounded-lg p-0">
              <div className="px-5 pt-5 pb-2 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Características del producto</h2>
              </div>
              <div className="px-5 py-5">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Columna izquierda */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700 font-semibold text-sm">Tamaño de la pantalla: 6.6"</span>
                      <span className="text-xs text-gray-500">(16.71 cm x 77.4 cm x 8.2 mm)</span>
                    </div>
                    {/* Barra de tamaño */}
                    <div className="w-full h-1 bg-gray-100 rounded mt-1 mb-2 flex items-center">
                      <div className="h-1 bg-blue-500 rounded" style={{ width: '80%' }}></div>
                    </div>
                    <div className="text-xs text-gray-500">GRANDE</div>
                  </div>
                  {/* Columna derecha */}
                  <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-800">
                    <div className="flex items-center gap-1"><span className="font-semibold">Memoria interna:</span> 256 GB</div>
                    <div className="flex items-center gap-1"><span className="font-semibold">Cámara frontal principal:</span> 32 Mpx</div>
                    <div className="flex items-center gap-1"><span className="font-semibold">Cámara trasera principal:</span> 50 Mpx</div>
                    <div className="flex items-center gap-1"><span className="font-semibold">Desbloqueo:</span> Huella dactilar y reconocimiento facial</div>
                    <div className="flex items-center gap-1"><span className="font-semibold">Con NFC:</span> Sí</div>
                  </div>
                </div>
                <div className="mt-3">
                  <a href="#" className="text-[#3483fa] text-xs hover:underline">Ver todas las características</a>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-bold mb-3 text-gray-900">Descripción</h2>
              <h3 className="text-sm font-semibold mb-1 text-gray-800">Capacidad y eficiencia</h3>
              <p className="text-gray-700 mb-3 text-sm">Con su potente procesador y 8 GB de RAM, su computadora logrará un alto rendimiento con una alta velocidad de transmisión de contenido y ejecutará varias aplicaciones al mismo tiempo, sin demoras.</p>
              <h3 className="text-sm font-semibold mb-1 text-gray-800">Capacidad de almacenamiento ilimitada</h3>
              <p className="text-gray-700 text-sm">Olvídate de borrar. Con su memoria interna de 256 GB puedes descargar todos los archivos y aplicaciones que necesites, guardar fotos y almacenar tus películas, series y videos favoritos para reproducirlos cuando quieras.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
