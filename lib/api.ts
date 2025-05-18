
const API_URL = process.env.NEXT_PUBLIC_API_URL;


const defaultOptions: RequestInit = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Clase para manejar errores de la API
 */
export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Función para hacer peticiones a la API
 * @param endpoint - Ruta del endpoint (sin incluir la URL base)
 * @param options - Opciones adicionales para fetch
 * @returns La respuesta procesada de la API
 * @throws {APIError} Si la respuesta no es exitosa
 */
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new APIError(
      response.status,
      data.message || 'Ocurrió un error en la petición'
    );
  }

  return data;
}

/**
 * Función para verificar el estado de la API
 * @returns El estado de salud de la API
 */
export async function checkApiHealth() {
  return fetchApi<{ status: string; message: string }>('/api/health');
}

/**
 * Función para obtener un producto por su ID
 * @param id - ID del producto
 * @returns Los datos del producto
 */
export async function getProduct(id: string) {
  return fetchApi<{
    id: string;
    title: string;
    brand: string;
    model: string;
    price: number;
    original_price?: number;
    condition: string;
    free_shipping: boolean;
    sold_quantity: number;
    description: string;
    pictures: Array<{
      id: string;
      url: string;
    }>;
    seller: {
      id: string;
      name: string;
      logo: string;
      seller_reputation: {
        transactions: {
          total: number;
          completed: number;
          canceled: number;
        };
        power_seller_status: string;
      };
    };
    specs: { [key: string]: string | number };
    warranty: string;
    warranty_time?: string;
    accepts_mercadopago: boolean;
  }>(`/api/products/${id}`);
} 