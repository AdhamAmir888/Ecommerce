"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import {
  FaClock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,

  FaLock,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { loginSchema, LoginTypeSchema } from "@/schemas/loginschema";
;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginTypeSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;


async function signin(values: LoginTypeSchema) {
  const res = await signIn("credentials", {
    email: values.email,
    password: values.password,
    redirect: false,
    callbackUrl: "/",
  });

  if (res?.ok) {
    toast.success("Login successfully", { position: "top-center" });
    window.location.assign(res?.url || "/");
  } else {
    toast.error(res?.error || "Login failed", { position: "top-center" });
  }
}
//   async function signin(values: LoginTypeSchema) {
//     const { rememberMe, ...body } = values;

//     try {
//       const { data } = await axios.post(
//         "https://ecommerce.routemisr.com/api/v1/auth/signin",
//         body,
//       );

//       const storage = rememberMe ? localStorage : sessionStorage;
//       storage.setItem("token", data.token);

//       toast.success("Welcome Back to Freshcartg",{position:"top-center"});
//       router.push("/");
//     } catch (error) {
//       const message = axios.isAxiosError(error)
//         ? error.response?.data?.message || "Login failed. Please try again."
//         : "Something went wrong. Please try again.";

//       toast.error(message,{position:"top-center"});
//     }
//   }
  return (
    <section className="mx-auto grid max-w-300 grid-cols-2 items-center gap-16 px-5 py-12">
      {/* Left side */}
      <div className="text-center">
        <Image
          src="/images/basket.png"
          alt="Shopping cart full of fresh groceries"
          width={700}
          height={430}
          className="w-full rounded-2xl object-cover shadow-md"
          priority
        />
        <h2 className="mt-8 text-3xl font-bold text-gray-800">
          FreshCart - Your One-Stop Shop for Fresh Products
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Join thousands of happy customers who trust FreshCart for their daily
          grocery needs
        </p>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <FaTruck className="text-brand" /> Free Delivery
          </span>
          <span className="flex items-center gap-2">
            <FaShieldAlt className="text-brand" /> Secure Payment
          </span>
          <span className="flex items-center gap-2">
            <FaClock className="text-brand" /> 24/7 Support
          </span>
        </div>
      </div>

      {/* Right side: form card */}
      <div className="rounded-2xl bg-white p-8 shadow-md">
        <h1 className="text-center text-4xl font-bold text-gray-800">
          Fresh<span className="text-brand">Cart</span>
        </h1>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-800">
          Welcome Back!
        </h2>
        <p className="mt-2 text-center text-gray-700">
          Sign in to continue your fresh shopping experience
        </p>



        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200"></div>

          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        <form onSubmit={handleSubmit(signin)} noValidate>
          <FieldGroup>
            {/* Email */}
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className="h-12 pl-11 pr-4 text-base"
                  {...register("email")}
                />
              </div>
              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            {/* Password */}
            <Field data-invalid={!!errors.password}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  href="/forgot-password"
                  className="text-sm text-brand"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  className="h-12 pl-11 pr-11 text-base"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <FieldError>{errors.password?.message}</FieldError>
            </Field>

            {/* Keep me signed in */}
            <Field>
              <div className="flex items-center gap-3">
                <Controller
                  control={control}
                  name="rememberMe"
                  render={({ field }) => (
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <FieldLabel htmlFor="rememberMe" className="font-normal">
                  Keep me signed in
                </FieldLabel>
              </div>
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-brand font-semibold text-white transition duration-500 hover:bg-brand-dark disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </FieldGroup>
        </form>

        <div className="mt-6 border-t border-gray-100 pt-6 text-center text-gray-700">
          New to FreshCart?{" "}
          <Link href="/register" className="text-brand">
            Create an account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;