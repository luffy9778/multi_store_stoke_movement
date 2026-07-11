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

module.exports = { createProductSchema };
