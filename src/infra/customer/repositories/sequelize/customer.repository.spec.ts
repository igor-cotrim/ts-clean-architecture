import { Sequelize } from "sequelize-typescript";

import Customer from "../../../../domain/customer/entities/customer";
import Address from "../../../../domain/customer/value_objects/address";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("#CustomerRepository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "12345");

    customer.address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "12345");
    const address2 = new Address("Street 2", 2, "City 2", "123456");

    customer.address = address;

    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    customer.changeAddress(address2);

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      street: address2.street,
      number: address2.number,
      zip: address2.zip,
      city: address2.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "12345");

    customer.address = address;

    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(foundCustomer);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("12341");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all products", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("1", "Customer 1");
    const address1 = new Address("Street 1", 1, "City 1", "12345");

    customer1.address = address1;
    customer1.addRewardPoints(100);
    customer1.activate();

    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Street 2", 2, "City 2", "123456");
    customer2.address = address2;
    customer2.addRewardPoints(100);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
