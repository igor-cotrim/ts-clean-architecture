import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import Address from "../../../domain/customer/value_objects/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Street", 123, "City", "Zip")
);
const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "Street Updated",
    number: 1234,
    city: "City Updated",
    zip: "Zip Updated",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("#UnitUpdateCustomerUseCase", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);
    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});
