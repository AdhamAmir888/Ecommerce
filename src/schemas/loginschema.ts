// src/schemas/login.schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/^[A-Z]/, "Password must start with an uppercase English letter")
    .regex(/\d/, "Password must contain at least one digit")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character (@, #, $, !)",
    ),
  rememberMe: z.boolean(),
});

export type LoginTypeSchema = z.infer<typeof loginSchema>;
