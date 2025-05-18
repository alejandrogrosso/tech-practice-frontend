import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PaymentMethods from '../components/product/PaymentMethods';

describe('PaymentMethods', () => {
  it('muestra los métodos de pago correctos', () => {
    render(<PaymentMethods acceptsCredit acceptsDebit acceptsTransfer />);
    expect(screen.getByText(/Tarjeta de crédito/i)).toBeInTheDocument();
    expect(screen.getByText(/Tarjeta de débito/i)).toBeInTheDocument();
    expect(screen.getByText(/Transferencia bancaria/i)).toBeInTheDocument();
  });

  it('no muestra métodos no aceptados', () => {
    render(<PaymentMethods acceptsCredit acceptsDebit={false} acceptsTransfer={false} />);
    expect(screen.getByText(/Tarjeta de crédito/i)).toBeInTheDocument();
    expect(screen.queryByText(/Tarjeta de débito/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Transferencia bancaria/i)).not.toBeInTheDocument();
  });

  it('no muestra nada si no hay métodos aceptados', () => {
    render(<PaymentMethods acceptsCredit={false} acceptsDebit={false} acceptsTransfer={false} />);
    expect(screen.queryByText(/Tarjeta de crédito/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Tarjeta de débito/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Transferencia bancaria/i)).not.toBeInTheDocument();
  });
}); 