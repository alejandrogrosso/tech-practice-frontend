import { render, screen, waitFor } from '@testing-library/react';
import ProductDetail from './product-detail';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        title: "Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM",
        price: 439,
        original_price: 499,
        pictures: [
          { id: "1", url: "https://example.com/image1.jpg" },
          { id: "2", url: "https://example.com/image2.jpg" }
        ],
        sold_quantity: 150,
        seller: {
          name: "Samsung",
          logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg"
        },
        brand: "Samsung"
      }),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('ProductDetail', () => {
  it('muestra el mensaje de carga y luego el título del producto', async () => {
    render(<ProductDetail />);
    expect(screen.getByText(/Cargando producto/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Samsung Galaxy A55 5G/i)).toBeInTheDocument();
    });
  });
});