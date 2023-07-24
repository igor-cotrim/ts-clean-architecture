import Product from "./product";

describe("#ProductEntity", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrowError(new Error("id is required"));
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrowError(new Error("name is required"));
  });

  it("should throw error when price is less than 0", () => {
    expect(() => {
      new Product("123", "product 1", -10);
    }).toThrowError(new Error("price must be greater than 0"));
  });

  it("should change name", () => {
    const product = new Product("123", "product 1", 100);
    product.changeName("product 2");

    expect(product.name).toBe("product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "product 1", 100);
    product.changePrice(150);

    expect(product.price).toBe(150);
  });
});
