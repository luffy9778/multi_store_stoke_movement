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

const transferStockSchema = z.object({
  body: z
    .object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),

      sourseStoreId: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid Sourse Store ID"),

      destinationStoreId: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid Destination Store ID"),

      quantity: z
        .number()
        .int("Quantity must be an integer")
        .positive("Quantity must be greater than zero"),
    })
    .refine((data) => data.sourseStoreId !== data.destinationStoreId, {
      message: "sourse and destination canot be the same",
      path: ["destinationStoreId"],
    }),
});

module.exports = {
  adjustStockSchema,
  transferStockSchema,
};
