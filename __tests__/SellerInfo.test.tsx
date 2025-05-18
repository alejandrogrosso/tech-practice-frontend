import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SellerInfo from '../components/product/SellerInfo';

describe('SellerInfo', () => {
  const seller = {
    id: 'SAMSUNG-OFFICIAL',
    name: 'Samsung Tienda Oficial',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    seller_reputation: {
      transactions: { total: 1000, completed: 990, canceled: 10 },
      power_seller_status: 'platinum'
    }
  };

  it('muestra el nombre y logo del vendedor', () => {
    render(<SellerInfo seller={seller} />);
    expect(screen.getByText(/Samsung Tienda Oficial/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Samsung Tienda Oficial/i)).toBeInTheDocument();
  });

  it('muestra la reputación del vendedor', () => {
    render(<SellerInfo seller={seller} />);
    expect(screen.getByText(/platinum/i)).toBeInTheDocument();
    expect(screen.getByText(/990/i)).toBeInTheDocument();
  });

  it('renderiza correctamente sin reputación', () => {
    const sellerSinReputacion = { id: 'ID', name: 'Vendedor', logo: '/logo.png', seller_reputation: { transactions: { total: 0, completed: 0, canceled: 0 }, power_seller_status: '' } };
    render(<SellerInfo seller={sellerSinReputacion} />);
    expect(screen.getAllByText(/Vendedor/i)).toHaveLength(3);
    expect(screen.getByText(/Nivel del vendedor:/i)).toBeInTheDocument();
    expect(screen.getByText(/Vendedor oficial/i)).toBeInTheDocument();
  });
}); 