import Product from "../entities/product";
import ProductService from "./product.service";

describe("#ProductService", () => {
  it("should change the proces of all products", () => {
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("1", "Product 1", 20);
    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(200);
    expect(product2.price).toBe(40);
  });
});
