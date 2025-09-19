/**
 *This is the index.ts file.
 * Simple demonstration of the Basket in action.
 */

import { type Product, products } from "./products.js";
import { Basket } from "./basket.js";

// Delivery charges: sorted by threshold ascending
const deliveryRules = [
  { threshold: 50, charge: 4.95 },
  { threshold: 90, charge: 2.95 },
];

const basket = new Basket(products, deliveryRules);
basket.add("B01");
basket.add("G01");

console.log("Basket total is:", basket.total()); // -> 37.85
