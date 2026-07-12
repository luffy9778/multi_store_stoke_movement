const { z } = require("zod");
const createStoreSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "name must be at least 3 charecters")
      .max(100),
    location: z
      .string()
      .trim()
      .min(3, "location must be at least 3 characters")
      .max(150),
  }),
});

const getStoresSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  }),
});
module.exports = { createStoreSchema, getStoresSchema };
