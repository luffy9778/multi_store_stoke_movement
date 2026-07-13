import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "email is required")
    .email("please provide a valid email"),
  password: z.string().min(1, "password is required"),
});
export const signUpSchema = z.object({
  name: z.string().trim().min(3,"name must be atleast 3 character"),
  email: z
    .string()
    .trim()
    .min(1, "email is required")
    .email("please provide a valid email"),
  password: z.string().min(1, "password is required"),
});
