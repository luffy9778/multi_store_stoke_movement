const { z } = require("zod");

const adjustStockSchema = z.object({
  body: z.object({
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),

    storeId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Store ID"),

    quantity: z
      .number()
      .int("Quantity must be an integer")
      .refine((value) => value !== 0, {
        message: "Quantity cannot be zero",
      }),
  }),
});

module.exports = {
  adjustStockSchema,
};
