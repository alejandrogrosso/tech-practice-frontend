"use client"

import { useState, useEffect } from "react"
import { Heart, Star, Truck, Shield, Store } from "lucide-react"
import { Product } from "@/types/product"
import ProductSpecs from "./ProductSpecs"
import { ArrowPathRoundedSquareIcon, ShieldCheckIcon, BookmarkSquareIcon, ChatBubbleLeftRightIcon, ClockIcon } from "@heroicons/react/24/outline"

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [samsungProducts, setSamsungProducts] = useState<any[]>([])
  const [loadingSamsung, setLoadingSamsung] = useState(true)
  const [errorSamsung, setErrorSamsung] = useState<string | null>(null)

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`${API_BASE}/products/SAMGA55-256`)
      .then(res => {
        if (!res.ok) throw new Error('Producto no encontrado')
        return res.json()
      })
      .then(data => {
        setProduct(data)
        setSelectedImage(data.pictures[0])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setLoadingSamsung(true)
    setErrorSamsung(null)
    fetch(`${API_BASE}/products/brand/Samsung/showcase`)
      .then(res => {
        if (!res.ok) throw new Error('No se pudieron cargar los productos de Samsung')
        return res.json()
      })
      .then(data => setSamsungProducts(data))
      .catch(err => setErrorSamsung(err.message))
      .finally(() => setLoadingSamsung(false))
  }, [])

  // Sugerencias de ejemplo
  const suggestions = [
    'funda samsung a54',
    'samsung galaxy',
    'celulares',
    'samsung a54',
    'celulares libres',
    'samsung',
    'samsung galaxy s54',
  ];

  if (loading) return <div className="p-8 text-center text-gray-500">Cargando producto...</div>;
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#f7f7f7]">
      <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#f87171" strokeWidth="2" fill="#fee2e2"/><path d="M9.17 9.17a4 4 0 0 1 5.66 5.66M9 15h.01M15 15h.01" stroke="#f87171" strokeWidth="2" strokeLinecap="round"/></svg>
      <h2 className="text-2xl font-bold text-red-500 mb-2">Producto no encontrado</h2>
      <p className="text-gray-600 mb-4">El producto que buscas no existe, fue eliminado o el enlace es incorrecto.</p>
      <a href="/" className="px-4 py-2 bg-[#3483fa] text-white rounded hover:bg-blue-700 transition">Volver al inicio</a>
    </div>
  );
  if (!product) return null;

  return (
    <>
      {/* Franja superior gris para sugerencias y navegación */}
      <div className="w-full bg-[#f7f7f7] border-b border-gray-200 px-6 py-2">
        {/* Línea 1: Sugerencias */}
        <div className="text-xs text-gray-700 mb-1">
          <span className="font-normal text-gray-600 mr-1">También puede interesarte:</span>
          {suggestions.map((s, i) => (
            <span key={s}>
              <a href="#" className="text-[#3483fa] hover:underline">{s}</a>
              {i < suggestions.length - 1 && <span className="mx-1 text-gray-400">-</span>}
            </span>
          ))}
        </div>
        {/* Línea 2: Volver al listado y breadcrumbs */}
        <div className="flex items-center text-xs text-[#3483fa]">
          <a href="#" className="hover:underline">Volver al listado</a>
          <span className="mx-2 text-gray-400">|</span>
          <nav className="flex flex-wrap gap-1">
            <a href="#" className="hover:underline">Celulares y Telefonía</a>
            <span className="text-gray-400">›</span>
            <a href="#" className="hover:underline">Celulares y Smartphones</a>
            <span className="text-gray-400">›</span>
            <a href="#" className="hover:underline">Samsung</a>
          </nav>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full min-h-screen bg-white">
        {/* Columna principal */}
        <main className="flex-1 flex flex-col pt-4 pb-6 md:pb-0">
          {/* Galería + detalles (puede ser grid de 2 columnas) */}
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-4 lg:gap-6 items-start px-2 lg:px-6 max-w-[900px] mx-auto">
            {/* Galería */}
            <div className="w-full flex flex-col md:flex-row items-center md:items-start pt-2 gap-2 md:gap-4">
              {/* Thumbnails */}
              <div className="flex flex-row md:flex-col gap-2 items-center md:items-start mb-2 md:mb-0">
                {product.pictures.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 md:w-16 md:h-16 border ${selectedImage.id === img.id ? "border-[#3483fa]" : "border-gray-300"} bg-white flex items-center justify-center cursor-pointer transition-colors rounded-[4px]`}
                    style={{ outline: selectedImage.id === img.id ? '2px solid #3483fa' : 'none' }}
                  >
                    <img
                      src={img.url.startsWith('http') ? img.url.replace('http://localhost:3000', '') : img.url}
                      alt={product.title}
                      className="object-contain w-12 h-12 md:w-14 md:h-14"
                    />
                  </button>
                ))}
              </div>
              {/* Imagen principal */}
              <div className="flex items-center justify-center bg-white w-full lg:w-[400px] lg:h-[520px] md:ml-4">
                <img
                  src={selectedImage.url.startsWith('http') ? selectedImage.url.replace('http://localhost:3000', '') : selectedImage.url}
                  alt={product.title}
                  className="object-contain w-full h-full max-w-full max-h-full"
                />
              </div>
            </div>
            {/* Detalles principales */}
            <div className="pt-2 flex flex-col gap-0 min-w-0 w-full max-w-[480px] md:text-base sm:text-sm overflow-hidden">
              <div className="flex flex-col gap-2 mb-4">
                {/* Línea 1: Logo + link + tilde */}
                <div className="flex items-center gap-2 min-w-0">
                  <img src={product.seller.logo || 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg'} alt={product.seller.name} className="w-6 h-6 object-contain rounded border bg-white" />
                  <a href="#" className="text-[#3483fa] font-bold text-base hover:underline align-middle truncate" style={{ maxWidth: "100%" }}>Visita la Tienda oficial de Samsung</a>
                  <img src="https://http2.mlstatic.com/frontend-assets/vpp-frontend/cockade.svg" alt="Tienda oficial" className="w-5 h-5 align-middle" />
                </div>
                {/* Línea 2: Nuevo | vendidos | corazón */}
                <div className="flex items-center">
                  <span className="text-base text-gray-700">Nuevo</span>
                  <span className="text-gray-300 mx-2">|</span>
                  <span className="text-base text-gray-700">+{product.sold_quantity} vendidos</span>
                  <button className="ml-auto flex items-center" aria-label="Agregar a favoritos">
                    <svg className="w-5 h-5 text-[#3483fa]" fill="none" stroke="#3483fa" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6.5-5.5-9-9.5A5.5 5.5 0 0 1 12 5.5a5.5 5.5 0 0 1 9 6c-2.5 4-9 9.5-9 9.5z"/></svg>
                  </button>
                </div>
                {/* Línea 3: Badge y ranking */}
                <div className="flex items-center gap-2">
                  <span className="bg-[#ff7733] text-white text-[11px] font-bold px-2 py-[2px] rounded-[3px]">MÁS VENDIDO</span>
                  <span className="text-[#3483fa] text-xs font-normal">3° en Celulares y Smartphones</span>
                </div>
              </div>
              {/* Título */}
              <h1 className="text-lg md:text-[1.45rem] font-bold text-gray-900 mb-2 leading-tight break-words">{product.title}</h1>
              {/* Estrellas y reviews */}
              <div className="flex items-center gap-1 mb-1.5 flex-wrap">
                <span className="text-[#3483fa] font-semibold text-base">4.8</span>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#3483fa] fill-[#3483fa]" />
                ))}
                <span className="text-xs text-gray-500">(759)</span>
              </div>
              {/* Precio anterior tachado arriba */}
              {product.original_price && (
                <div className="text-base text-gray-400 line-through mb-0.5">US$ {product.original_price}</div>
              )}
              {/* Precio actual, descuento y signo de pregunta */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-gray-900">US$ {product.price}</span>
                {product.original_price && (
                  <span className="flex items-center text-base text-[#00a650] font-semibold ml-2">
                    {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                    {/* Signo de pregunta azul claro */}
                    <svg className="w-4 h-4 ml-1 align-middle" fill="#3483fa" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#e3edfb"/><text x="8" y="12" textAnchor="middle" fontSize="10" fill="#3483fa">?</text></svg>
                  </span>
                )}
              </div>
              <div className="text-[#00a650] font-semibold text-base mb-1">en 10 cuotas de $1.914<sup className='text-xs align-super'>00</sup> sin interés</div>
              {/* Bloque de promo */}
              <div className="inline-block bg-[#e3edfb] text-[#3483fa] text-xs font-semibold px-1.5 py-1 rounded mt-1 mb-1 max-w-max">10% OFF OCA Blue Visa</div>
              <div>
                <a href="#" className="text-[#3483fa] text-xs hover:underline">Ver medios de pago y promociones</a>
              </div>
              {/* Color */}
              <div className="mb-6">
                <span className="font-semibold">Color: </span>
                <span className="text-gray-700">Azul oscuro</span>
                <div className="mt-4 flex items-center gap-4">
                  <img
                    src="https://http2.mlstatic.com/D_Q_NP_777643-MLA75395342152_042024-R.webp"
                    alt="Azul oscuro"
                    className="w-10 h-10 md:w-12 md:h-12 rounded border border-gray-400 object-cover"
                  />
                </div>
              </div>
              {/* Highlights */}
              {product.highlights && product.highlights.length > 0 && (
                <div className="mb-2">
                  <h2 className="font-semibold mb-2 text-base">Lo que tenés que saber de este producto</h2>
                  <ul className="list-disc pl-4 md:pl-5 text-[15px] text-gray-800 space-y-1">
                    {product.highlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <a href="#" className="text-blue-600 text-sm mt-2 inline-block hover:underline">Ver características</a>
                </div>
              )}
              {/* Opciones de compra */}
              <div className="text-xs text-gray-500">Opciones de compra: <a href="#" className="text-blue-600 hover:underline">3 productos nuevos desde $699.000</a></div>
            </div>
          </div>

          {/* Línea de separación antes de productos relacionados */}
          <div className="px-2 md:px-6 w-full max-w-[1200px] mx-auto border-t border-gray-200 mt-8">
            <div className="pt-2 pb-2">
              <div className="mb-2">
                <h2 className="text-[1.35rem] font-bold leading-tight text-gray-900">Productos relacionados</h2>
                <div className="text-xs text-gray-400 mt-1">Promocionado</div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  {(product.related_products && product.related_products.length > 0 ? product.related_products: []).map((prod, i, arr) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg shadow-sm flex flex-col transition-all duration-200 p-3 md:p-4 h-full"
                    >
                      <div className="flex items-center justify-center mb-2 h-[150px]">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          width={120}
                          height={120}
                          className="object-contain rounded max-h-[120px]"
                        />
                      </div>
                      <a href={'#'} className="text-[15px] font-medium text-gray-900 hover:underline line-clamp-2 mb-1 min-h-[40px]">{prod.title}</a>
                      <div className="flex items-center justify-between mt-1 mb-1">
                        <div className="text-2xl font-bold text-gray-900">US$ {prod.price}</div>
                        <div className="text-xs text-green-600 font-semibold ml-2">{prod.off}</div>
                      </div>
                      <div className="text-xs text-gray-500 mb-1">{prod.cuotas}</div>
                      <div className="text-xs text-green-600 font-semibold">{prod.envio}</div>
                    </div>
                  ))}
                </div>
                {/* Flecha visual a la derecha */}
                <button
                  className="hidden md:flex items-center justify-center absolute right-[-24px] top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full w-10 h-10 shadow-md"
                  aria-label="Siguiente"
                  tabIndex={-1}
                  style={{ pointerEvents: 'none' }}
                >
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 32 32" fill="rgba(0, 0, 0, 0.9)"><path d="M11.943 6.99999L20.9383 15.9953L11.9336 25L12.9943 26.0607L23.0596 15.9953L13.0036 5.93933L11.943 6.99999Z" fill="rgba(0, 0, 0, 0.9)"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Línea de separación antes de productos de Samsung */}
          <div className="px-2 md:px-6 w-full max-w-[1200px] mx-auto border-t border-gray-200 mt-12">
            <div className="pt-2 pb-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Productos de Samsung</h2>
              <div className="relative">
                {/* Grid responsive: 1 columna en mobile, 2 en desktop */}
                {loadingSamsung ? (
                  <div className="text-center text-gray-500 py-8">Cargando productos de Samsung...</div>
                ) : errorSamsung ? (
                  <div className="text-center text-red-500 py-8">{errorSamsung}</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {samsungProducts.slice(0, 2).map((prod, i, arr) => (
                      <div key={i} className="relative">
                        <a
                          href={prod.link}
                          className="flex bg-white border border-gray-300 rounded-lg p-3 md:p-6 gap-3 md:gap-6 items-center hover:shadow-sm transition-shadow min-h-[90px] md:min-h-[160px] w-full"
                        >
                          <img
                            src={prod.img}
                            alt={prod.title}
                            className="object-contain rounded border bg-white w-16 h-16 md:w-24 md:h-24 md:w-28 md:h-28"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-base md:text-lg font-semibold text-gray-900 leading-tight mb-1 truncate">{prod.title}</div>
                            <div className="text-xs text-gray-400 line-through">US$ {prod.old}</div>
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-2xl font-bold text-gray-900">US$ {prod.price}</span>
                              <span className="text-base text-green-600 font-semibold">{prod.off}</span>
                            </div>
                            <div className="text-base text-green-600 font-semibold leading-tight">{prod.cuotas}</div>
                            <div className="text-base text-green-600 font-semibold leading-tight">{prod.envio}</div>
                          </div>
                        </a>
                        {/* Flecha visual solo en la última card en desktop, no tapa la card */}
                        {i === arr.length - 1 && (
                          <button
                            className="hidden md:flex items-center justify-center absolute right-[-32px] top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full w-10 h-10 shadow-md"
                            aria-label="Siguiente"
                            tabIndex={-1}
                            style={{ pointerEvents: 'none' }}
                          >
                            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 32 32" fill="rgba(0, 0, 0, 0.9)"><path d="M11.943 6.99999L20.9383 15.9953L11.9336 25L12.9943 26.0607L23.0596 15.9953L13.0036 5.93933L11.943 6.99999Z" fill="rgba(0, 0, 0, 0.9)"/></svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <a href="#" className="block text-blue-600 text-base font-semibold mt-4 hover:underline">Ver más productos de Samsung</a>
            </div>
          </div>

          {/* Línea de separación antes de características del producto */}
          <div className="flex flex-col gap-6 md:gap-8 max-w-[1200px] mx-auto px-2 md:px-6 mt-8 mb-12 border-t border-gray-200">
            {/* Características del producto - dinámico */}
            <div className="bg-white rounded-lg p-0">
              <div className="px-3 md:px-5 pt-4 md:pt-5 pb-2">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Características del producto</h2>
              </div>
              <div className="px-3 md:px-5 py-4 md:py-6">
                <ProductSpecs specs={product.specs} />
              </div>
            </div>

            {/* Línea de separación antes de descripción */}
            <div className="border-t border-gray-200" />
            {/* Descripción */}
            <div className="bg-white rounded-lg px-3 md:px-6 py-4 md:py-5">
              <h2 className="text-black font-bold text-lg mb-4">Descripción</h2>
              {Array.isArray(product.description) ? (
                product.description.map((block, i) => (
                  <div key={i} className="mb-3">
                    {block.subtitle && (
                      <h3 className="text-base font-semibold mb-1 text-gray-800">{block.subtitle}</h3>
                    )}
                    {block.text && (
                      <p className="text-gray-700 text-[15px]">{block.text}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-700 text-[15px] mb-3">{product.description}</p>
              )}
            </div>
          </div>
        </main>
        {/* Sidebar sticky */}
        <aside className="w-full md:w-[320px] flex flex-col gap-4 md:gap-6 pt-4">
          {/* Bloque: Envío, stock, botones, vendedor y protección */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-5 flex flex-col gap-3 md:gap-4 shadow-sm">
            {/* Envío gratis */}
            <div className="mb-3">
              <span className="text-[#00a650] font-bold text-lg">Envío gratis</span>
              <span className="text-gray-800 font-bold text-base"> a todo el país</span>
              <div className="text-xs text-gray-500 leading-tight">Conocé los tiempos y las formas de envío.</div>
              <a href="#" className="text-[#3483fa] text-xs leading-tight hover:underline">Calcular cuándo llega</a>
            </div>
            {/* Stock disponible */}
            <div className="mt-1">
              <div className="text-[15px] font-bold text-gray-800 mb-1">Stock disponible</div>
              <div className="text-[15px] text-gray-800 flex items-center gap-1">
                Cantidad:
                <div className="relative inline-block">
                  <select className="appearance-none bg-transparent font-bold text-[15px] focus:outline-none focus:ring-0 p-0 m-0 pr-6" defaultValue={1} style={{ minWidth: 70 }}>
                    {Array.from({ length: Math.min(product.available_quantity, 10) }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} unidad{n > 1 ? 'es' : ''}</option>
                    ))}
                  </select>
                  <svg className="w-4 h-4 text-gray-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-gray-400 text-xs align-middle">(+{product.available_quantity} disponibles)</span>
              </div>
            </div>
            {/* Botones de compra */}
            <div className="flex flex-col gap-2 mt-2">
              <button className="w-full bg-[#3483fa] hover:bg-[#2968c8] text-white font-semibold py-3 rounded text-base transition-colors">Comprar ahora</button>
              <button className="w-full bg-[#f5f6fa] text-[#3483fa] font-semibold py-3 rounded text-base border border-[#3483fa] transition-colors hover:bg-[#e3edfb]">Agregar al carrito</button>
            </div>
            {/* Vendedor y protección */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-start gap-2">
                <img src={product.seller.logo.startsWith('http') ? product.seller.logo.replace('http://localhost:3000', '') : product.seller.logo} alt={product.seller.name} className="w-9 h-6 object-contain rounded border bg-white mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-gray-700">Tienda oficial</span>
                    <a href="#" className="text-[#3483fa] ml-1 hover:underline">Samsung</a>
                  </div>
                  <div className="text-sm font-bold text-gray-900 leading-tight">+10mil ventas</div>
                  <div className="text-xs text-gray-400 leading-tight">Hace Factura A</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2 min-w-0 w-full">
                <div className="flex items-center gap-2 text-sm mt-1">
                  <ArrowPathRoundedSquareIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span>
                    <a href="#" className="text-[#3483fa] font-bold hover:underline">Devolución gratis.</a>
                    <span className="text-gray-500 font-normal"> Tenés 30 días desde que lo recibís.</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheckIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span>
                    <a href="#" className="text-[#3483fa] font-bold hover:underline">Compra Protegida,</a>
                    <span className="text-gray-500 font-normal"> recibí el producto que esperabas o te devolvemos tu dinero.</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <BookmarkSquareIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span>12 meses de garantía de fábrica.</span>
                </div>
              </div>
            </div>
          </div>
          {/* Bloque: Tienda Oficial (reputación) */}
          <div className="bg-white border border-gray-200 rounded-lg p-0 flex flex-col shadow-sm overflow-hidden">
            {/* Banner negro y logo */}
            <div className="relative h-16 bg-gradient-to-r from-[#222] to-[#444] flex items-center justify-start px-4">
              <img src="/images/brands/samsung-logo.png" alt="Samsung" className="absolute -bottom-4 left-4 w-12 h-12 object-contain bg-white rounded shadow border p-1" />
              <span className="text-white text-lg font-semibold ml-16">Tienda Oficial</span>
            </div>
            {/* Info tienda */}
            <div className="px-4 pt-6 pb-4 flex flex-col gap-1">
              <span className="text-lg font-bold text-gray-900 leading-tight">Samsung</span>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <svg className="w-4 h-4 text-[#3483fa]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#3483FA"/><path d="M12 6L7.25 10.75L5 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Tienda oficial de Mercado Libre
              </div>
              <span className="text-sm text-gray-500 font-semibold mt-1">+50 Productos</span>
            </div>
            {/* Barra de reputación */}
            <div className="flex gap-1 px-4 mt-2 mb-1">
              <div className="h-1 rounded w-1/5 bg-[#ffe0e0]"></div>
              <div className="h-1 rounded w-1/5 bg-[#fff4e0]"></div>
              <div className="h-1 rounded w-1/5 bg-[#fffbe0]"></div>
              <div className="h-1 rounded w-1/5 bg-[#f0ffe0]"></div>
              <div className="h-1 rounded w-1/5 bg-[#39b54a]"></div>
            </div>
            {/* Métricas */}
            <div className="flex justify-between px-4 py-2 text-xs text-gray-700">
              <div className="flex flex-col items-center">
                <span className="font-bold">+5mil</span>
                <span className="text-[11px] text-gray-500">Ventas concretadas</span>
              </div>
              <div className="flex flex-col items-center">
                <ChatBubbleLeftRightIcon className="w-5 h-5 mb-1 text-[#39b54a]" />
                <span className="text-[11px] text-gray-500">Brinda buena atención</span>
              </div>
              <div className="flex flex-col items-center">
                <ClockIcon className="w-5 h-5 mb-1 text-[#39b54a]" />
                <span className="text-[11px] text-gray-500">Entrega sus productos a tiempo</span>
              </div>
            </div>
            {/* Botón */}
            <div className="px-4 pb-4">
              <button className="w-full bg-[#f0f6ff] text-[#3483fa] font-semibold py-3 rounded text-base border border-[#d6eaff] hover:bg-[#e3edfb] transition-colors">Ir a la Tienda oficial</button>
            </div>
          </div>
          {/* Bloque otras opciones de compra */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 pt-4 pb-2 font-bold text-gray-800 text-base">Otras opciones de compra</div>
            <div className="border-t border-gray-200"></div>
            <a href="#" className="block px-4 py-3 text-[#3483fa] font-bold text-base hover:underline">Ver 3 opciones desde US$ 439</a>
          </div>
          {/* Bloque medios de pago */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 pt-4 pb-2 font-bold text-gray-800 text-base">Medios de pago</div>
            {/* Banner verde */}
            <div className="flex items-center gap-2 bg-[#39b54a] text-white rounded mx-4 my-2 px-4 py-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="#39b54a" stroke="white"/><rect x="6" y="11" width="4" height="2" rx="1" fill="white"/></svg>
              <span className="font-semibold">¡Paga en hasta 12 cuotas sin interés!</span>
            </div>
            {/* Tarjetas de crédito */}
            <div className="px-4 pt-2 pb-6">
              <div className="font-bold text-gray-800 text-base">Tarjetas de crédito</div>
              <div className="text-sm text-gray-500 mb-2">¡Cuotas sin interés con bancos seleccionados!</div>
              <div className="flex items-center gap-4 mb-3">
                {/* Mastercard */}
                <span className="inline-block w-12 h-4 align-middle"> <svg viewBox="0 0 48 16" width="48" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="8" r="8" fill="#EB001B"/><circle cx="30" cy="8" r="8" fill="#F79E1B"/><path d="M24 8a8 8 0 0 1 8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 1-8-8z" fill="#FF5F00"/></svg> </span>
                {/* Visa */}
                <span className="inline-block w-12 h-4 align-middle"> <svg viewBox="0 0 48 16" width="48" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fill="#1A1F71" d="M6.7 15.1L0.3 0.9h4.1c0.4 0 0.7 0.2 0.8 0.6l2.1 6.1 2-6.1c0.1-0.4 0.4-0.6 0.8-0.6h3.7l-6.1 14.2z"/><path fill="#1A1F71" d="M17.2 0.9c-0.4 0-0.7 0.2-0.8 0.6l-4.7 13.6h3.6l0.7-2.1h4.4l0.7 2.1h3.6l-4.7-13.6c-0.1-0.4-0.4-0.6-0.8-0.6zm-0.1 3.7l1.6 4.7h-3.2l1.6-4.7z"/><path fill="#1A1F71" d="M25.2 0.9c-0.4 0-0.7 0.2-0.8 0.6l-4.7 13.6h3.6l0.7-2.1h4.4l0.7 2.1h3.6l-4.7-13.6c-0.1-0.4-0.4-0.6-0.8-0.6zm-0.1 3.7l1.6 4.7h-3.2l1.6-4.7z"/></g></svg> </span>
                {/* Amex */}
                <span className="inline-block w-12 h-4 align-middle"> <svg viewBox="0 0 48 16" width="48" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="16" rx="2" fill="#2E77BC"/><text x="24" y="11" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="7" fill="#fff">AMEX</text></svg> </span>
                {/* OCA */}
                <span className="inline-block w-12 h-4 align-middle"> <svg viewBox="0 0 48 16" width="48" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="16" rx="2" fill="#2B3990"/><text x="24" y="11" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="8" fill="#fff">OCA</text></svg> </span>
              </div>
              <div className="font-bold text-gray-800 text-base mt-2">Tarjetas de débito</div>
              <div className="flex items-center gap-4 mb-3 mt-2">
                {/* Visa Débito */}
                <span className="inline-block w-12 h-4 align-middle"> <svg viewBox="0 0 48 16" width="48" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fill="#1A1F71" d="M6.7 15.1L0.3 0.9h4.1c0.4 0 0.7 0.2 0.8 0.6l2.1 6.1 2-6.1c0.1-0.4 0.4-0.6 0.8-0.6h3.7l-6.1 14.2z"/><path fill="#1A1F71" d="M17.2 0.9c-0.4 0-0.7 0.2-0.8 0.6l-4.7 13.6h3.6l0.7-2.1h4.4l0.7 2.1h3.6l-4.7-13.6c-0.1-0.4-0.4-0.6-0.8-0.6zm-0.1 3.7l1.6 4.7h-3.2l1.6-4.7z"/><path fill="#1A1F71" d="M25.2 0.9c-0.4 0-0.7 0.2-0.8 0.6l-4.7 13.6h3.6l0.7-2.1h4.4l0.7 2.1h3.6l-4.7-13.6c-0.1-0.4-0.4-0.6-0.8-0.6zm-0.1 3.7l1.6 4.7h-3.2l1.6-4.7z"/><path fill="#1A1F71" d="M36.2 0.9c-0.4 0-0.7 0.2-0.8 0.6l-4.7 13.6h3.6l0.7-2.1h4.4l0.7 2.1h3.6l-4.7-13.6c-0.1-0.4-0.4-0.6-0.8-0.6zm-0.1 3.7l1.6 4.7h-3.2l1.6-4.7z"/></g></svg> </span>
                {/* Mastercard Débito */}
                <span className="inline-block w-12 h-4 align-middle"> <svg viewBox="0 0 48 16" width="48" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="8" r="8" fill="#EB001B"/><circle cx="30" cy="8" r="8" fill="#F79E1B"/><path d="M24 8a8 8 0 0 1 8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 1-8-8z" fill="#FF5F00"/></svg> </span>
              </div>
              <div className="font-bold text-gray-800 text-base mt-2">Efectivo</div>
              <div className="flex items-center gap-4 mb-3 mt-2">
                {/* Abitab */}
                <span className="inline-block w-12 h-4 align-middle"> <svg viewBox="0 0 48 16" width="48" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="16" rx="2" fill="#002B6C"/><text x="24" y="11" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="8" fill="#fff">Abitab</text></svg> </span>
                {/* Redpagos */}
                <span className="inline-block w-12 h-4 align-middle"> <svg viewBox="0 0 48 16" width="48" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="16" rx="2" fill="#F7D600"/><text x="24" y="11" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="8" fill="#0033A0">Redpagos</text></svg> </span>
              </div>
              <a href="#" className="block text-[#3483fa] text-sm font-semibold mt-2 hover:underline">Conocé otros medios de pago</a>
            </div>
          </div>
          {/* Bloque productos relacionados (sidebar) */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 pt-4 pb-1 font-bold text-gray-800 text-base">Productos relacionados</div>
            <div className="px-4 text-xs text-gray-400 mb-2">Promocionado</div>
            <div className="flex flex-col gap-3 px-4 pb-4">
              {(product.sidebar_related_products && product.sidebar_related_products.length > 0 ? product.sidebar_related_products : []).map((prod, i) => (
                <a
                  key={i}
                  href={'#'}
                  className="flex gap-2 items-start group"
                >
                  <img
                    src={prod.image}
                    alt={prod.title}
                    width={56}
                    height={56}
                    className="object-contain rounded max-h-[56px] min-w-[56px] bg-white border"
                  />
                  <div className="flex-1 min-w-0">
                    {prod.old_price && <div className="text-xs text-gray-400 line-through">US$ {prod.old_price}</div>}
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-bold text-gray-900">US$ {prod.price}</span>
                      <span className="text-xs text-green-600 font-semibold">{prod.off}</span>
                    </div>
                    {prod.cuotas && <div className="text-xs text-green-600 font-semibold leading-tight">{prod.cuotas}</div>}
                    {prod.envio && <div className="text-xs text-green-600 font-semibold leading-tight">{prod.envio}</div>}
                    <div className="text-xs text-gray-800 mt-0.5 truncate group-hover:underline">{prod.title}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
