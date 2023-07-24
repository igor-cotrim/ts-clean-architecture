import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import CustomerModel from "../customer/repositories/sequelize/customer.model";
import { customerRoute } from "./routes/customer.route";

export const app: Express = express();

app.use(express.json());
app.use("/customer", customerRoute);

export let sequilize: Sequelize;

async function setupDb() {
  sequilize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequilize.addModels([CustomerModel]);

  await sequilize.sync();
}

setupDb();
