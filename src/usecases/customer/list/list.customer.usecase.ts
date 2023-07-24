import CustomerRepositoryInterface from "../../../domain/customer/repositories/customer.interface";
import Customer from "../../../domain/customer/entities/customer";
import { OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();

    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDto {
    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          city: customer.address.city,
          zip: customer.address.zip,
        },
      })),
    };
  }
}
