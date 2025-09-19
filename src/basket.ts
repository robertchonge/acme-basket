
/**
 *Welcome to the basket..ts file.
 * Implements a shopping basket with:
 *  - Product catalogue lookup
 *  - Special offer: Buy one Red Widget (R01), get the second at half price
 *  - Delivery rules based on order value
 */
import type { Product } from "./products.js";

interface DeliveryRule {
  /** Spend below this threshold to pay this charge */
  threshold: number;
  charge: number;
}

class Basket {
  private catalogue: Product[];
  private deliveryRules: DeliveryRule[];
  private items: string[] = [];

  constructor(catalogue: Product[], deliveryRules: DeliveryRule[]) {
    this.catalogue = catalogue;
    this.deliveryRules = deliveryRules;
  }

  /**
   * Add a product to the basket by product code.
   * Throws if the code is unknown.
   */
  add(code: string): void {
    const exists = this.catalogue.find(p => p.code === code);
    if (!exists) {
      throw new Error(`Unknown product code: ${code}`);
    }
    this.items.push(code);
  }

  /**
   * Calculate the total cost of the basket,
   * including special offers and delivery rules.
   */
  total(): number {
    const subtotal = this.calculateSubtotal();
    const discount = this.calculateRedWidgetDiscount();
    const discounted = subtotal - discount;
    const delivery = this.calculateDeliveryCharge(discounted);
    return this.round(discounted + delivery);
  }

  /** Sum of all item prices before discounts */
  private calculateSubtotal(): number {
    return this.items.reduce((sum, code) => {
      const product = this.catalogue.find(p => p.code === code)!;
      return sum + product.price;
    }, 0);
  }

  /**
   * Offer: "Buy one Red Widget, get the second half price".
   * For every pair of R01 items, discount half the price of one.
   */
  private calculateRedWidgetDiscount(): number {
    const redPrice = this.catalogue.find(p => p.code === "R01")!.price;
    const redCount = this.items.filter(code => code === "R01").length;
    const pairs = Math.floor(redCount / 2);
    return pairs * (redPrice / 2);
  }

  /**
   * Delivery:
   *  - Orders < $50  : $4.95
   *  - Orders < $90  : $2.95
   *  - Orders >= $90 : free
   */
  private calculateDeliveryCharge(amount: number): number {
    const sorted = [...this.deliveryRules].sort((a, b) => a.threshold - b.threshold);
    for (const rule of sorted) {
      if (amount < rule.threshold) return rule.charge;
    }
    return 0; // free delivery above the highest threshold
  }

  /** Round to two decimal places to represent cents accurately */
  private round(val: number): number {
    return Math.round(val * 100) / 100;
  }
}

export { Basket };
