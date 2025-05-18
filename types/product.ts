export interface Product {
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
  pictures: Picture[];
  seller: Seller;
  specs: { [key: string]: string | number };
  warranty: string;
  warranty_time?: string;
  accepts_mercadopago: boolean;
  related_products?: {
    id: string;
    title: string;
    price: number;
    old_price?: number;
    off?: string;
    image: string;
    cuotas?: string;
    envio?: string;
  }[];
  sidebar_related_products?: {
    id: string;
    title: string;
    price: number;
    old_price?: number;
    off?: string;
    image: string;
    cuotas?: string;
    envio?: string;
  }[];
  highlights?: string[];
  available_quantity?: number;
}

export interface Picture {
  id: string;
  url: string;
}

export interface Seller {
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
}

export interface Attribute {
  id: string;
  name: string;
  value_name: string;
}

export interface PaymentMethods {
  credit_card: string[];
  debit_card: string[];
  other: string[];
} 