import Address from "../value_objects/address";

export default interface ICustomer {
  get id(): string;
  get name(): string;
  get address(): Address;
}
