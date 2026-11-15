import { z } from "zod";

export const checkoutSchema = z.object({
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .min(2, "Please enter your city"),

  details: z
    .string()
    .trim()
    .min(1, "Street address is required")
    .min(5, "Please enter your full street address"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian number, e.g. 01012345678"),
});

export type CheckoutData = z.infer<typeof checkoutSchema>;