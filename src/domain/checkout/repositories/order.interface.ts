import RepositoryInterface from "../../@shared/repositories/repository.interface";
import Order from "../entities/order";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
