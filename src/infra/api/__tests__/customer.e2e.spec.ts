import request from "supertest";

import { app, sequilize } from "../express";

describe("#E2ECustomer", () => {
  beforeEach(async () => {
    await sequilize.sync({ force: true });
  });

  afterAll(async () => {
    await sequilize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Joe",
        address: {
          street: "Rua 1",
          number: 123,
          city: "São Paulo",
          zip: "12345",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John Joe");
    expect(response.body.address.street).toBe("Rua 1");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.city).toBe("São Paulo");
    expect(response.body.address.zip).toBe("12345");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John Joe",
    });

    expect(response.status).toBe(500);
  });
});
