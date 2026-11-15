"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  FaArrowLeft,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaTrash,
} from "react-icons/fa";
import { CartContext } from "@/Context/CartContext";

const Cart = () => {
  const {
    products,
    totalCartItem,
    totalCartPrice,
    updateCartItem,
    deleteCartItem,
    clearCart,
  } = useContext(CartContext);

  const [busy, setBusy] = useState(false);

  async function run (
    action: () => Promise<{ ok: boolean; message: string }>,
    showSuccess = false
  ) {
    setBusy(true);
    const res = await action();
    setBusy(false);

    if (!res.ok) {
      toast.error(res.message);
    } else if (showSuccess) {
      toast.success(res.message);
    }
  }

  const itemsText = totalCartItem === 1 ? "item" : "items";

  return (
    <section className="bg-gray-50 px-10 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900">Shopping Cart</span>
      </nav>

      {/* Title */}
      <div className="flex items-center gap-4">
        <div className="grid size-14 place-items-center rounded-xl bg-brand text-white">
          <FaShoppingCart className="size-7" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
      </div>
      <p className="mb-8 mt-3 text-gray-600">
        You have{" "}
        <span className="font-semibold text-brand">
          {totalCartItem} {itemsText}
        </span>{" "}
        in your cart
      </p>

      {/* Empty cart */}
      {products.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
          <p className="text-xl text-gray-700">Your cart is empty</p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-lg bg-brand px-8 py-3 font-semibold text-white transition duration-500 hover:bg-brand-dark"
          >
            Start Shopping
          </Link>
        </div>
      )}

      {products.length > 0 && (
        <div className="grid grid-cols-12 gap-6">
          {/* Items */}
          <div className="col-span-8">
            <div className="space-y-5">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-5 rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="grid size-36 shrink-0 place-items-center rounded-xl bg-gray-50">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={100}
                      height={100}
                      unoptimized
                      className="h-28 w-auto object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">
                        {item.product.title}
                      </h3>
                      <span className="mt-2 inline-block rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">
                        {item.product.category?.name}
                      </span>
                      <p className="mt-3 text-lg font-semibold text-brand">
                        {item.price.toLocaleString("en-US")} EGP
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="inline-flex w-fit items-center gap-1 rounded-lg border border-gray-200 p-1">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        disabled={busy || item.count <= 1}
                        onClick={() =>
                          run(() =>
                            updateCartItem(item.product._id, item.count - 1)
                          )
                        }
                        className="grid size-9 place-items-center rounded-md text-gray-500 transition duration-500 hover:bg-gray-100 disabled:opacity-40"
                      >
                        <FaMinus className="size-3" />
                      </button>
                      <span className="w-10 text-center font-medium text-gray-900">
                        {item.count}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        disabled={busy}
                        onClick={() =>
                          run(() =>
                            updateCartItem(item.product._id, item.count + 1)
                          )
                        }
                        className="grid size-9 place-items-center rounded-md bg-brand text-white transition duration-500 hover:bg-brand-dark disabled:opacity-60"
                      >
                        <FaPlus className="size-3" />
                      </button>
                    </div>
                  </div>

                  {/* Total + delete */}
                  <div className="flex items-end gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {(item.price * item.count).toLocaleString("en-US")}{" "}
                        <span className="text-sm font-normal text-gray-500">
                          EGP
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove item"
                      disabled={busy}
                      onClick={() =>
                        run(() => deleteCartItem(item.product._id), true)
                      }
                      className="grid size-11 place-items-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition duration-500 hover:bg-red-100 disabled:opacity-60"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
              <Link
                href="/shop"
                className="flex items-center gap-2 text-brand transition duration-500 hover:text-brand-dark"
              >
                <FaArrowLeft />
                Continue Shopping
              </Link>
              <button
                type="button"
                disabled={busy}
                onClick={() => run(() => clearCart(), true)}
                className="flex items-center gap-2 text-gray-500 transition duration-500 hover:text-red-500 disabled:opacity-60"
              >
                <FaTrash />
                Clear all items
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div className="col-span-4 self-start overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="bg-slate-900 px-6 py-5">
              <h2 className="text-xl font-semibold text-white">Order Summary</h2>
            </div>

            <div className="p-6">
              <div className="flex justify-between text-lg text-gray-700">
                <span>
                  Subtotal ({totalCartItem} {itemsText})
                </span>
                <span>{totalCartPrice.toLocaleString("en-US")} EGP</span>
              </div>
              <div className="mt-4 flex justify-between text-lg text-gray-700">
                <span>Shipping</span>
                <span className="text-brand">Calculated at checkout</span>
              </div>

              <div className="my-5 border-t border-gray-200"></div>

              <div className="flex justify-between text-xl font-semibold">
                <span className="text-gray-900">Estimated Total</span>
                <span className="text-brand">
                  {totalCartPrice.toLocaleString("en-US")} EGP
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 flex h-14 w-full items-center justify-center rounded-xl bg-brand text-lg font-semibold text-white transition duration-500 hover:bg-brand-dark"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;