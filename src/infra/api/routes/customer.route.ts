import express, { Request, Response } from "express";

import CreateCustomerUseCase from "../../../usecases/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repositories/sequelize/customer.repository";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip,
      },
    };
    const output = await usecase.execute(customerDto);

    res.status(201).send(output);
  } catch (error) {
    res.status(500).json(error);
  }
});
