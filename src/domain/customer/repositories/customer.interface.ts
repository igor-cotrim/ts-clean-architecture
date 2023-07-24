import RepositoryInterface from "../../@shared/repositories/repository.interface";
import Customer from "../entities/customer";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
