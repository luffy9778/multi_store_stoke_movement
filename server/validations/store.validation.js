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

module.exports = { createStoreSchema };
