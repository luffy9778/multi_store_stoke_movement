const { z } = require("zod");
const createProductSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "name must be at least 3 charecters")
      .max(100),
    sku: z.string().trim().min(3, "SKU must be at least 3 characters").max(30),
  }),
});

const getProductsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  }),
});
module.exports = { createProductSchema, getProductsSchema };
