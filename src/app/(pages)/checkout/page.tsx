"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  FaArrowLeft,
  FaBagShopping,
  FaBuilding,
  FaCircleInfo,
  FaCreditCard,
  FaHouse,
  FaLocationDot,
  FaMoneyBill1Wave,
  FaPhone,
  FaReceipt,
  FaRotateLeft,
  FaShieldHalved,
  FaTruckFast,
} from "react-icons/fa6";
import { CartContext } from "@/Context/CartContext";
import { cashPaymentAction } from "@/paymentAction/cashpayment";
import { onlinePaymentAction } from "@/paymentAction/onlinepayment";
import { CheckoutData, checkoutSchema } from "@/schemas/checkoutschema";

const Checkout = () => {
  const router = useRouter();
  const { products, totalCartPrice, totalCartItem, cartId, clearCart } =
    useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues: { city: "", details: "", phone: "" },
  });

  async function cashPayment(data: CheckoutData) {
    if (!cartId) {
      toast.error(
        "Your cart could not be found. Go back to the cart and try again.",
        { position: "top-center" },
      );
      return;
    }

    try {
      const res = await cashPaymentAction(cartId, data);

      if (res.ok) {
        await clearCart();
        toast.success("Order placed successfully", { position: "top-center" });
        router.push("/allorders");
      } else {
        toast.error(res.message, { position: "top-center" });
      }
    } catch {
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
      });
    }
  }

  async function onlinePayment(data: CheckoutData) {
    if (!cartId) {
      toast.error(
        "Your cart could not be found. Go back to the cart and try again.",
        { position: "top-center" },
      );
      return;
    }

    try {
      const res = await onlinePaymentAction(cartId, data);

      if (res.ok && res.url) {
        window.location.assign(res.url);
      } else {
        toast.error(res.message, { position: "top-center" });
      }
    } catch {
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
      });
    }
  }

  const inputBase =
    "w-full rounded-xl border-2 bg-white py-3 pl-14 pr-4 text-gray-800 placeholder-gray-400 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-green-600">
          Cart
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-900">Checkout</span>
      </nav>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-xl text-white shadow-md shadow-green-600/30">
              <FaReceipt />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Complete Your Order
            </h1>
          </div>
          <p className="mt-2 text-gray-500">
            Review your items and complete your purchase
          </p>
        </div>

        <Link
          href="/cart"
          className="mt-4 flex items-center gap-2 font-medium text-green-600 hover:text-green-700"
        >
          <FaArrowLeft />
          Back to Cart
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <section className="h-fit overflow-hidden rounded-2xl bg-white shadow-md lg:col-span-2">
          <header className="bg-linear-to-r from-green-600 to-green-700 px-6 py-5 text-white">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <FaHouse />
              Shipping Address
            </h2>
            <p className="mt-1 text-sm text-green-50">
              Where should we deliver your order?
            </p>
          </header>

          <div className="space-y-6 p-6">
            <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FaCircleInfo />
              </div>
              <div>
                <p className="font-medium text-blue-900">
                  Delivery Information
                </p>
                <p className="text-sm text-blue-600">
                  Please ensure your address is accurate for smooth delivery
                </p>
              </div>
            </div>


            <div>
              <label
                htmlFor="city"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                  <FaBuilding />
                </span>
                <input
                  id="city"
                  type="text"
                  placeholder="e.g. Cairo, Alexandria, Giza"
                  className={`${inputBase} ${
                    errors.city ? "border-red-400" : "border-gray-200"
                  }`}
                  {...register("city")}
                />
              </div>
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="details"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Street Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                  <FaLocationDot />
                </span>
                <textarea
                  id="details"
                  rows={3}
                  placeholder="Street name, building number, floor, apartment..."
                  className={`${inputBase} resize-none ${
                    errors.details ? "border-red-400" : "border-gray-200"
                  }`}
                  {...register("details")}
                />
              </div>
              {errors.details && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.details.message}
                </p>
              )}
            </div>


            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                  <FaPhone />
                </span>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="01xxxxxxxxx"
                  className={`${inputBase} pr-36 ${
                    errors.phone ? "border-red-400" : "border-gray-200"
                  }`}
                  {...register("phone")}
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  Egyptian numbers only
                </span>
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="sticky top-28 overflow-hidden rounded-2xl bg-white shadow-md">
            <header className="bg-linear-to-r from-green-600 to-green-700 px-6 py-5 text-white">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <FaBagShopping />
                Order Summary
              </h2>
              <p className="mt-1 text-sm text-green-50">
                {totalCartItem} {totalCartItem === 1 ? "item" : "items"}
              </p>
            </header>

            <div className="p-5">
              <ul className="max-h-72 space-y-3 overflow-y-auto">
                {products.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 p-3"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        sizes="56px"
                        unoptimized
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-medium text-gray-900">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.count} × {item.price.toLocaleString()} EGP
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {(item.count * item.price).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{totalCartPrice.toLocaleString()} EGP</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <FaTruckFast className="text-gray-400" />
                    Shipping
                  </span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-green-600">
                  {totalCartPrice.toLocaleString()}{" "}
                  <span className="text-sm font-normal text-gray-500">EGP</span>
                </span>
              </div>

              {/* Cash payment */}
              <button
                type="button"
                onClick={handleSubmit(cashPayment)}
                disabled={isSubmitting || products.length === 0}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-green-700 py-4 font-semibold text-white shadow-lg shadow-green-600/30 transition hover:from-green-700 hover:to-green-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Placing order...
                  </>
                ) : (
                  <>
                    <FaMoneyBill1Wave />
                    Cash Payment
                  </>
                )}
              </button>

              {/* Online payment */}
              <button
                type="button"
                onClick={handleSubmit(onlinePayment)}
                disabled={isSubmitting || products.length === 0}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-green-600 bg-white py-4 font-semibold text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaCreditCard />
                Online Payment
              </button>

              <div className="mt-5 flex items-center justify-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <FaShieldHalved className="text-green-600" /> Secure
                </span>
                <span className="flex items-center gap-1">
                  <FaTruckFast className="text-blue-500" /> Fast Delivery
                </span>
                <span className="flex items-center gap-1">
                  <FaRotateLeft className="text-orange-500" /> Easy Returns
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
