import Address from "./domain/customer/value_objects/address";
import Customer from "./domain/customer/entities/customer";
import Order from "./domain/checkout/entities/order";
import OrderItem from "./domain/checkout/entities/order_item";

let customer = new Customer("123", "Igor Cotrim");

const address = new Address("Rua 1", 123, "São Paulo", "12345678");

customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "1", 1);
const item2 = new OrderItem("2", "Item 2", 20, "1", 1);

const order = new Order("1", customer.id, [item1, item2]);
