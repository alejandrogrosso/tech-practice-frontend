import ProductDetail from "@/components/product-detail"
import { getProduct, checkApiHealth, APIError } from "@/lib/api"

export default async function Home() {
  try {
    // Verificar que la API esté funcionando
    await checkApiHealth()

    // Obtener el producto
    const product = await getProduct("SAMGA55-256")

    if (!product) {
      return (
        <main className="min-h-screen bg-[#EBEBEB] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-2">Producto no encontrado</h1>
            <p className="text-gray-600">El producto que buscas no existe o no está disponible.</p>
          </div>
        </main>
      )
    }

    return (
      <main className="min-h-screen bg-[#EBEBEB]">
        <ProductDetail product={product} />
      </main>
    )
  } catch (error) {
    console.error("Error al cargar el producto:", error)
    
    let errorMessage = "Ocurrió un error al cargar el producto"
    if (error instanceof APIError) {
      if (error.status === 404) {
        errorMessage = "El producto no fue encontrado"
      } else if (error.status === 503) {
        errorMessage = "El servidor no está disponible en este momento"
      }
    }

    return (
      <main className="min-h-screen bg-[#EBEBEB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-2">Error</h1>
          <p className="text-gray-600">{errorMessage}</p>
          <p className="text-sm text-gray-500 mt-2">
            Por favor, verifica que el servidor esté corriendo en {process.env.NEXT_PUBLIC_API_URL}
          </p>
        </div>
      </main>
    )
  }
}
