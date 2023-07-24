import Order from "./order";
import OrderItem from "./order_item";

describe("#OrderEntity", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrowError(new Error("id is required"));
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("123", "", []);
    }).toThrowError(new Error("customerId is required"));
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("123", "123", []);
    }).toThrowError(new Error("items are required"));
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 100, "1", 2);
    const item2 = new OrderItem("1", "Item 1", 200, "2", 2);
    const order = new Order("1", "123", [item1, item2]);

    expect(order.total()).toBe(600);
  });

  it("should throw error if the item qtd is less or equal 0", () => {
    const item = new OrderItem("1", "Item 1", 100, "1", 0);

    expect(() => {
      new Order("1", "123", [item]);
    }).toThrowError(new Error("item price must be greater than 0"));
  });
});
