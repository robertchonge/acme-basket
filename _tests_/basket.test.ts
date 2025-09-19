/**
 * This is the Unit Test for the Basket class using Jest.
 * Validates example scenarios provided in the specification.
 */


import { products } from "../src/products.js";
import { Basket } from "../src/basket.js";
import { describe, expect, it, expect as jestExpect } from '@jest/globals';

const rules = [
  { threshold: 50, charge: 4.95 },
  { threshold: 90, charge: 2.95 },
];

describe("Basket totals", () => {
    it("B01, G01 => 37.85", () => {
        const b = new Basket(products, rules);
        b.add("B01");
        b.add("G01");
        expect(b.total()).toBe(37.85);
    });

    it("R01, R01 => 54.37", () => {
        const b = new Basket(products, rules);
        b.add("R01");
        b.add("R01");
        expect(b.total()).toBe(54.37);
    });

    it("R01, G01 => 60.85", () => {
        const b = new Basket(products, rules);
        b.add("R01");
        b.add("G01");
        expect(b.total()).toBe(60.85);
    });

    it("B01, B01, R01, R01 => 98.27", () => {
        const b = new Basket(products, rules);
        b.add("B01");
        b.add("B01");
        b.add("R01");
        b.add("R01");
        expect(b.total()).toBe(98.27);
    });
});

// Remove custom expect and export to avoid overriding Jest's expect

