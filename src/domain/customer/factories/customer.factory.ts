import { v4 as uuid } from "uuid";

import ICustomer from "../entities/customer.interface";
import Customer from "../entities/customer";
import Address from "../value_objects/address";

export default class CustomerFactory {
  public static create(name: string): ICustomer {
    return new Customer(uuid(), name);
  }

  public static createWithAddress(name: string, address: Address): ICustomer {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);

    return customer;
  }
}
