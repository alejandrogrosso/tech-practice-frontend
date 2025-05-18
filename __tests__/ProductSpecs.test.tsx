import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductSpecs from '../components/product/ProductSpecs';

describe('ProductSpecs', () => {
  const specs = {
    "Tamaño de la pantalla": "6.6 pulgadas",
    "Memoria interna": "256 GB",
    "Cámara trasera principal": "50 Mpx",
    "Con NFC": "Sí",
    "Cámara frontal principal": "32 Mpx",
    "Desbloqueo": "Huella dactilar y reconocimiento facial"
  };

  it('renderiza los íconos y el layout correctamente', () => {
    render(<ProductSpecs specs={specs} />);
    expect(screen.getByText(/Tamaño de la pantalla/i)).toBeInTheDocument();
    expect(screen.getByText(/256 GB/i)).toBeInTheDocument();
    expect(screen.getByText(/50 Mpx/i)).toBeInTheDocument();
    expect(screen.getByText(/Huella dactilar/i)).toBeInTheDocument();
    // Verifica que existan los íconos SVG
    expect(document.querySelectorAll('svg').length).toBeGreaterThan(0);
  });
}); 