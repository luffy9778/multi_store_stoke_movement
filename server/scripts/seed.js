require("dotenv").config();
const connectDB = require("../config/db");
const Product = require("../models/Product");
const Store = require("../models/Store");
const Stock = require("../models/Stock");
const mongoose = require("mongoose");

const seed = async () => {
  try {
    await connectDB();

    await Promise.all([
      Product.deleteMany(),
      Store.deleteMany(),
      Stock.deleteMany(),
    ]);

    console.log("data deleted");

    const stores = await Store.insertMany([
      {
        name: "store1",
        location: "location1",
      },
      {
        name: "store2",
        location: "location2",
      },
      {
        name: "store3",
        location: "location3",
      },
      {
        name: "store4",
        location: "location4",
      },
    ]);
    console.log("stores created");

    const products = await Product.insertMany([
      { name: "product1", sku: "sku1" },
      { name: "product2", sku: "sku2" },
      { name: "product3", sku: "sku3" },
      { name: "product4", sku: "sku4" },
      { name: "product5", sku: "sku5" },
    ]);
    console.log("products creted");

    const stocks = [];
    for (const product of products) {
      for (const store of stores) {
        stocks.push({
          product: product._id,
          store: store._id,
          quantity: Math.floor(Math.random()*50),
        });
      }
    }
    await Stock.insertMany(stocks);
    console.log("stocks created");
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB Disconnected");
  }
};
seed();
