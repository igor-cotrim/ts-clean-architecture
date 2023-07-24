import Address from "../value_objects/address";
import CustomerFactory from "./customer.factory";

describe("#CustomerFactory", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Igor Cotrim");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Igor Cotrim");
    expect(customer.constructor.name).toBe("Customer");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const address = new Address("Street 1", 123, "City 1", "45005088");
    const customer = CustomerFactory.createWithAddress("Igor Cotrim", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Igor Cotrim");
    expect(customer.constructor.name).toBe("Customer");
    expect(customer.address).toBe(address);
  });
});
