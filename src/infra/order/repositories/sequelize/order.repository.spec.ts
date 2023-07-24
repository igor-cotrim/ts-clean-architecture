import { Sequelize } from "sequelize-typescript";

import Order from "../../../../domain/checkout/entities/order";
import Customer from "../../../../domain/customer/entities/customer";
import Address from "../../../../domain/customer/value_objects/address";
import Product from "../../../../domain/product/entities/product";
import OrderItem from "../../../../domain/checkout/entities/order_item";
import CustomerModel from "../../../customer/repositories/sequelize/customer.model";
import ProductModel from "../../../product/repositories/sequelize/product.model";
import CustomerRepository from "../../../customer/repositories/sequelize/customer.repository";
import ProductRepository from "../../../product/repositories/sequelize/product.repository";
import OrderModel from "./order.model";
import OrderItemModel from "./order_item.model";
import OrderRepository from "./order.repository";

describe("#OrderRepository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "12345");

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const orderRepository = new OrderRepository();
    const order = new Order("1", customer.id, [orderItem]);

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [OrderItemModel],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
      ],
    });
  });
});
