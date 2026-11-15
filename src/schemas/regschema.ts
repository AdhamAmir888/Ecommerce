import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(4, "Name must be at least 4 characters")
      .max(10, "Name must be at most 10 characters"),

    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        /^01[0125][0-9]{8}$/,
        "Please enter a valid Egyptian phone number",
      ),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms and Privacy Policy",
    }),
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

    rePassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegTypeSchema = z.infer<typeof registerSchema>;
