import { Sequelize } from "sequelize-typescript";

import CustomerModel from "../../../infra/customer/repositories/sequelize/customer.model";
import CustomerRepository from "../../../infra/customer/repositories/sequelize/customer.repository";
import Customer from "../../../domain/customer/entities/customer";
import Address from "../../../domain/customer/value_objects/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("#FindCustomerUseCase", () => {
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

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);
    const customer = new Customer("123", "John Doe");
    const address = new Address("Street", 123, "city", "zip");

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = { id: customer.id };
    const output = {
      id: customer.id,
      name: customer.name,
      address: {
        street: address.street,
        number: address.number,
        city: address.city,
        zip: address.zip,
      },
    };
    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
