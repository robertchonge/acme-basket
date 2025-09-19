/**
 * Welcome to the  products.ts file.
 * Product catalogue for Acme Widget Co.
 * Each product has a code, a display name and a unit price in USD.
 */

export interface Product {
  code: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { code: "R01", name: "Red Widget",  price: 32.95 },
  { code: "G01", name: "Green Widget", price: 24.95 },
  { code: "B01", name: "Blue Widget",  price: 7.95 },
];

export { products };
