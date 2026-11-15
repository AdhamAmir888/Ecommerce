"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaShieldAlt, FaStar, FaTruck, FaUserPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { registerSchema, RegTypeSchema } from "@/schemas/regschema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Register = () => {
  const form = useForm<RegTypeSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;
  const router = useRouter();

  async function signup(values: RegTypeSchema) {
    try {
      const data = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values,
      );
      router.push("/login");
      toast.success("Your Account is Created", { position: "top-center" });
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Something went wrong. Please try again.";

      toast.error(message, { position: "top-center" });
    }
  }

  return (
    <section className="mx-auto grid max-w-300 grid-cols-2 items-start gap-16 px-5 py-12">
      {/* Left side */}
      <div>
        <h1 className="text-5xl font-bold text-gray-800">
          Welcome to <span className="text-brand">FreshCart</span>
        </h1>
        <p className="mt-3 text-xl text-gray-700">
          Join thousands of happy customers who enjoy fresh groceries delivered
          right to their doorstep.
        </p>

        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="grid size-14 place-items-center rounded-full bg-green-100 text-brand">
              <FaStar className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Premium quality products sourced from trusted suppliers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="grid size-14 place-items-center rounded-full bg-green-100 text-brand">
              <FaTruck className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Same-day delivery available in most areas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="grid size-14 place-items-center rounded-full bg-green-100 text-brand">
              <FaShieldAlt className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Secure Shopping
              </h3>
              <p className="text-gray-600">
                Your data and payments are completely secure
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid size-14 place-items-center rounded-full bg-green-400 font-semibold text-white">
              SJ
            </div>
            <div>
              <p className="text-gray-800">Sarah Johnson</p>
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
          </div>
          <p className="mt-4 italic text-gray-600">
            &quot;FreshCart has transformed my shopping experience. The quality
            of the products is outstanding, and the delivery is always on time.
            Highly recommend!&quot;
          </p>
        </div>
      </div>

      {/* Right side: form card */}
      <div className="rounded-2xl bg-white p-8 shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-gray-700">
          Start your fresh journey with us today
        </p>

        <form onSubmit={handleSubmit(signup)} noValidate>
          <FieldGroup>
            {/* Name */}
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Name*</FieldLabel>
              <Input
                id="name"
                placeholder="Ali"
                autoComplete="off"
                aria-invalid={!!errors.name}
                className="h-12 px-4 text-base"
                {...register("name")}
              />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>

            {/* Email */}
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email*</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="ali@example.com"
                autoComplete="off"
                aria-invalid={!!errors.email}
                className="h-12 px-4 text-base"
                {...register("email")}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            {/* Password */}
            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">Password*</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="create a strong password"
                aria-invalid={!!errors.password}
                className="h-12 px-4 text-base"
                {...register("password")}
              />

              <p className="text-xs text-gray-500">
                Must be at least 8 characters with numbers and symbols
              </p>
              <FieldError>{errors.password?.message}</FieldError>
            </Field>

            {/* Confirm password */}
            <Field data-invalid={!!errors.rePassword}>
              <FieldLabel htmlFor="rePassword">Confirm Password*</FieldLabel>
              <Input
                id="rePassword"
                type="password"
                placeholder="confirm your password"
                aria-invalid={!!errors.rePassword}
                className="h-12 px-4 text-base"
                {...register("rePassword")}
              />
              <FieldError>{errors.rePassword?.message}</FieldError>
            </Field>

            {/* Phone */}
            <Field data-invalid={!!errors.phone}>
              <FieldLabel htmlFor="phone">Phone Number*</FieldLabel>
              <Input
                id="phone"
                type="tel"
                placeholder="01012345678"
                aria-invalid={!!errors.phone}
                className="h-12 px-4 text-base"
                {...register("phone")}
              />
              <FieldError>{errors.phone?.message}</FieldError>
            </Field>

            <Field data-invalid={!!errors.terms}>
              <div className="flex items-center gap-3">
                <Controller
                  control={control}
                  name="terms"
                  render={({ field }) => (
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <FieldLabel htmlFor="terms" className="font-normal">
                  <span>
                    I agree to the
                    <Link href="/terms" className="text-brand">
                      Terms of Service
                    </Link>
                    and
                    <Link href="/privacy" className="text-brand">
                      Privacy Policy
                    </Link>
                    *
                  </span>
                </FieldLabel>
              </div>
              <FieldError>{errors.terms?.message}</FieldError>
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand font-semibold text-white transition duration-500 hover:bg-brand-dark disabled:opacity-60"
            >
              <FaUserPlus />
              Create My Account
            </button>
          </FieldGroup>
        </form>

        <div className="mt-6 border-t border-gray-100 pt-6 text-center text-gray-700">
          Already have an account?
          <Link href="/signin" className="text-brand">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
