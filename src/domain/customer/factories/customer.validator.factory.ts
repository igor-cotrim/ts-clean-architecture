import IValidator from "../../@shared/validators/validator.interface";
import ICustomer from "../entities/customer.interface";
import CustomerValidator from "../validators/customer.validator";

export default class CustomerValidatorFactory {
  static create(): IValidator<ICustomer> {
    return new CustomerValidator();
  }
}
