import Address from "../value_objects/address";
import Customer from "./customer";

describe("#CustomerEntity", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "Igor Cotrim");
    }).toThrowError(new Error("customer: id is required"));
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError(new Error("customer: name is required"));
  });

  it("should throw error when name and id is empty", () => {
    expect(() => {
      let customer = new Customer("", "");
    }).toThrowError(
      new Error("customer: id is required, customer: name is required")
    );
  });

  it("should change name", () => {
    const customer = new Customer("123", "Igor Cotrim");

    customer.changeName("Igor Cotrim Santos");

    expect(customer.name).toBe("Igor Cotrim Santos");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "Igor Cotrim");
    const address = new Address("Rua 1", 123, "São Paulo", "12345678");

    customer.address = address;
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    const customer = new Customer("123", "Igor Cotrim");

    expect(() => {
      customer.activate();
    }).toThrowError(new Error("address is required"));
  });

  it("should deactivate customer", () => {
    const customer = new Customer("123", "Igor Cotrim");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("123", "Igor Cotrim");

    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
