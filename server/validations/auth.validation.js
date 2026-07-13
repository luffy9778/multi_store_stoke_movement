const { z, email } = require("zod");

const signUpSchema = z.object({
  body: z.object({
    email: z.string().trim().email("please provide a valid email"),
    password: z.string().min(6, "password must be atleast 6 character long").max(30),
    name: z.string().trim().min(3, "name must be atleast 3 character long").max(30),
  }),
});
const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email("please provide a valid email"),
    password: z.string().min(1, "password is required"),
  }),
});
module.exports = { signUpSchema, loginSchema };
