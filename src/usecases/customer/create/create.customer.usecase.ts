import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer.interface";
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "./create.customer.dto";
import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import Address from "../../../domain/customer/value_objects/address";
import Customer from "../../../domain/customer/entities/customer";

export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.city,
        input.address.zip
      )
    );

    const test = await this.customerRepository.create(customer as Customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zip,
      },
    };
  }
}
