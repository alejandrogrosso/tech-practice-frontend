import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductDetail from '@/components/product/ProductDetail';

// Mock API_BASE
const API_BASE = 'http://localhost:3001/api';

// Mock fetch responses
global.fetch = jest.fn((url) => {
  const urlStr = typeof url === 'string' ? url : url.toString();
  if (urlStr.includes('/products/brand/Samsung/showcase')) {
    return Promise.resolve({ ok: true, json: () => Promise.resolve(mockSamsungProducts) }) as unknown as Promise<Response>;
  }
  return Promise.resolve({ ok: true, json: () => Promise.resolve(mockProduct) }) as unknown as Promise<Response>;
});

const mockProduct = {
  id: 'SAMGA55-256',
  title: 'Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM',
  specs: {
    'Tamaño de la pantalla': '6.6"',
    'Memoria interna': '256 GB',
    'Cámara trasera': '50 Mpx'
  },
  description: [
    { subtitle: 'Descripción', text: 'Texto de descripción' }
  ],
  pictures: [
    { id: 1, url: 'https://example.com/image1.jpg' },
    { id: 2, url: 'https://example.com/image2.jpg' }
  ],
  seller: {
    name: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg'
  },
  price: 699.99,
  original_price: 799.99,
  sold_quantity: 150
};

const mockSamsungProducts = [
  { id: 'SAMGS25-256', title: 'Samsung Galaxy S25 256 GB' },
  { id: 'SAMGS25-512', title: 'Samsung Galaxy S25 512 GB' }
];

describe('ProductDetail', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('muestra specs con íconos y layout', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProduct)
    });
    render(<ProductDetail />);
    await waitFor(() => {
      expect(screen.getByText(/Tamaño de la pantalla/i)).toBeInTheDocument();
      expect(screen.getAllByText(/256 GB/i).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('muestra la descripción con subtítulos y párrafos', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProduct)
    });
    render(<ProductDetail />);
    await waitFor(() => {
      expect(screen.getAllByText(/Descripción/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/Texto de descripción/i)).toBeInTheDocument();
    });
  });

  it('muestra solo 2 productos de Samsung', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProduct)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSamsungProducts)
      });
    render(<ProductDetail />);
    await waitFor(() => {
      expect(screen.getByText(/Samsung Galaxy S25 256 GB/i)).toBeInTheDocument();
      expect(screen.getByText(/Samsung Galaxy S25 512 GB/i)).toBeInTheDocument();
    });
  });

  it('muestra loading y error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    render(<ProductDetail />);
    await waitFor(() => {
      expect(screen.getByText(/Producto no encontrado/i)).toBeInTheDocument();
    });
  });

  it('muestra el precio y descuento correctamente', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProduct)
    });
    render(<ProductDetail />);
    await waitFor(() => {
      expect(screen.getByText(/US\$ 699.99/i)).toBeInTheDocument();
      expect(screen.getByText(/US\$ 799.99/i)).toBeInTheDocument();
      const offs = screen.getAllByText(/13% OFF/i);
      expect(offs.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('muestra la información del vendedor', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProduct)
    });
    render(<ProductDetail />);
    await waitFor(() => {
      expect(screen.getByText(/Visita la Tienda oficial de Samsung/i)).toBeInTheDocument();
      expect(screen.getByText(/\+150 vendidos/i)).toBeInTheDocument();
    });
  });

  it('permite cambiar la imagen seleccionada', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProduct)
    });
    render(<ProductDetail />);
    
    await waitFor(() => {
      const imageButtons = screen.getAllByRole('button');
      fireEvent.click(imageButtons[1]);
      const mainImages = screen.getAllByAltText('Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM');
      const principal = mainImages.find(img => img.className.includes('max-h-'));
      expect(principal).toHaveAttribute('src', expect.stringContaining('image2.jpg'));
    });
  });

  it('muestra las sugerencias de búsqueda', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProduct)
    });
    render(<ProductDetail />);
    
    await waitFor(() => {
      expect(screen.getByText(/También puede interesarte:/i)).toBeInTheDocument();
      expect(screen.getByText(/funda samsung a54/i)).toBeInTheDocument();
      expect(screen.getByText(/celulares libres/i)).toBeInTheDocument();
    });
  });

  it('muestra el breadcrumb de navegación', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProduct)
    });
    render(<ProductDetail />);
    
    await waitFor(() => {
      const breadcrumbLinks = screen.getAllByRole('link');
      const breadcrumbTexts = breadcrumbLinks.map(link => link.textContent);
      
      expect(breadcrumbTexts).toContain('Celulares y Telefonía');
      expect(breadcrumbTexts).toContain('Celulares y Smartphones');
      expect(breadcrumbTexts).toContain('Samsung');
    });
  });
}); 