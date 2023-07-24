import { v4 as uuid } from "uuid";

import IProduct from "../entities/product.interface";
import Product from "../entities/product";
import ProductB from "../entities/product_b";

export default class ProductFactory {
  public static create(type: string, name: string, price: number): IProduct {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "b":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("Invalid product type");
    }
  }
}
