import * as yup from "yup";

import IValidator from "../../@shared/validators/validator.interface";
import ICustomer from "../entities/customer.interface";

export default class CustomerValidator implements IValidator<ICustomer> {
  validate(entity: ICustomer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("id is required"),
          name: yup.string().required("name is required"),
        })
        .validateSync(
          { id: entity.id, name: entity.name },
          { abortEarly: false }
        );
    } catch (error) {
      const e = error as yup.ValidationError;

      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "customer",
          message: error,
        });
      });
    }
  }
}
