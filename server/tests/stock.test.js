const request = require("supertest");

const app = require("../app");

const Product = require("../models/Product");
const Store = require("../models/Store");
const Stock = require("../models/Stock");
const { createAdminAndLogin } = require("./helper");

describe("Stock API", () => {
  let token;
  let product;
  let storeA;
  let storeB;

  beforeEach(async () => {
    token = await createAdminAndLogin();

    product = await Product.create({
      name: "product1",
      sku: "pr01",
    });

    storeA = await Store.create({
      name: "Store A",
      location: "location A",
    });

    storeB = await Store.create({
      name: "Store B",
      location: "location B",
    });
  });


  test("should transfer stock", async () => {
    await Stock.create({
      product: product._id,
      store: storeA._id,
      quantity: 100,
    });

    const response = await request(app)
      .post("/stock/transfer")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: product._id,
        sourseStoreId: storeA._id,
        destinationStoreId: storeB._id,
        quantity: 30,
      });

    expect(response.statusCode).toBe(200);

    const source = await Stock.findOne({
      product: product._id,
      store: storeA._id,
    });

    const destination = await Stock.findOne({
      product: product._id,
      store: storeB._id,
    });

    expect(source.quantity).toBe(70);

    expect(destination.quantity).toBe(30);
  });

  test("should reject transfer when stock is insufficient", async () => {
    await Stock.create({
      product: product._id,
      store: storeA._id,
      quantity: 10,
    });

    const response = await request(app)
      .post("/stock/transfer")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: product._id,
        sourseStoreId: storeA._id,
        destinationStoreId: storeB._id,
        quantity: 50,
      });

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);

    const source = await Stock.findOne({
      product: product._id,
      store: storeA._id,
    });

    expect(source.quantity).toBe(10);
  });

  test("concurrent requests should never create negative stock", async () => {
    await Stock.create({
      product: product._id,
      store: storeA._id,
      quantity: 10,
    });

    await Promise.allSettled([
      request(app)
        .patch("/stock/adjust")
        .set("Authorization", `Bearer ${token}`)
        .send({
          productId: product._id,
          storeId: storeA._id,
          quantity: -10,
        }),

      request(app)
        .patch("/stock/adjust")
        .set("Authorization", `Bearer ${token}`)
        .send({
          productId: product._id,
          storeId: storeA._id,
          quantity: -10,
        }),
    ]);

    const stock = await Stock.findOne({
      product: product._id,
      store: storeA._id,
    });

    expect(stock.quantity).toBeGreaterThanOrEqual(0);
  });
});
