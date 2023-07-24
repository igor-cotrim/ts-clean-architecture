import Customer from "../../../domain/customer/entities/customer";
import Address from "../../../domain/customer/value_objects/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("Street", 123, "city", "zip");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("#UnitFindCustomerUseCase", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

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
