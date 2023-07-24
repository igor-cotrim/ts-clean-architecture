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

  it("should list all customers", async () => {
    const response1 = await request(app)
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

    expect(response1.status).toBe(201);

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "John Joe 2",
        address: {
          street: "Rua 2",
          number: 1234,
          city: "São Paulo 2",
          zip: "123456",
        },
      });

    expect(response2.status).toBe(201);

    const listResponse = await request(app).get("/customer").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);
    expect(listResponse.body.customers[0].name).toBe("John Joe");
    expect(listResponse.body.customers[0].address.street).toBe("Rua 1");
    expect(listResponse.body.customers[0].address.number).toBe(123);
    expect(listResponse.body.customers[0].address.city).toBe("São Paulo");
    expect(listResponse.body.customers[0].address.zip).toBe("12345");
    expect(listResponse.body.customers[1].name).toBe("John Joe 2");
    expect(listResponse.body.customers[1].address.street).toBe("Rua 2");
    expect(listResponse.body.customers[1].address.number).toBe(1234);
    expect(listResponse.body.customers[1].address.city).toBe("São Paulo 2");
    expect(listResponse.body.customers[1].address.zip).toBe("123456");
  });
});
