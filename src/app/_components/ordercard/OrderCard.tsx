"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FiBox,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiFileText,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { OrderType } from "@/types/order.t";

const OrderCard = ({
  order,
  defaultOpen = false,
}: {
  order: OrderType;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  const firstItem = order.cartItems[0];
  const extraItems = order.cartItems.length - 1;
  const itemsCount = order.cartItems.reduce((sum, item) => sum + item.count, 0);
  const subtotal = order.cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );

  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-green-200 bg-white shadow-sm">
      {/* Top part */}
      <div className="flex gap-5 p-5">
        <div className="relative size-24 shrink-0 rounded-2xl border border-gray-100 bg-white">
          {firstItem && (
            <Image
              src={firstItem.product.imageCover}
              alt={firstItem.product.title}
              fill
              sizes="96px"
              unoptimized
              className="object-contain p-2"
            />
          )}
          {extraItems > 0 && (
            <span className="absolute -right-2 -top-2 grid size-8 place-items-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              +{extraItems}
            </span>
          )}
        </div>

        <div className="flex-1">
          {order.isDelivered ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              <FiCheckCircle />
              Delivered
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-3 py-1 text-xs font-medium text-orange-600">
              <FiClock />
              Processing
            </span>
          )}

          <h3 className="mt-2 text-xl font-semibold text-gray-900">
            <span className="me-2 text-gray-400">#</span>
            {order.id}
          </h3>

          <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <FiCalendar />
              {date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FiBox />
              {itemsCount} {itemsCount === 1 ? "item" : "items"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FiMapPin />
              {order.shippingAddress.city}
            </span>
          </div>

          <p className="mt-3 text-2xl font-semibold text-gray-900">
            {order.totalOrderPrice.toLocaleString("en-US")}{" "}
            <span className="text-sm font-normal text-gray-500">EGP</span>
          </p>
        </div>

        <div className="flex flex-col items-end justify-between">
          <span
            title={order.paymentMethodType === "card" ? "Paid online" : "Cash on delivery"}
            className="grid size-10 place-items-center rounded-lg bg-gray-100 text-gray-600"
          >
            {order.paymentMethodType === "card" ? <FaCreditCard /> : <FaMoneyBillWave />}
          </span>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition duration-500 hover:bg-brand-dark"
          >
            {open ? "Hide" : "Show"}
            {open ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
      </div>

      {/* Details */}
      {open && (
        <div className="border-t border-gray-100 bg-gray-50 p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-800">
            <span className="grid size-6 place-items-center rounded-md bg-green-100 text-brand">
              <FiFileText className="size-3.5" />
            </span>
            Order Items
          </div>

          <div className="space-y-3">
            {order.cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4"
              >
                <div className="relative size-14 shrink-0 rounded-lg bg-gray-50">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    fill
                    sizes="56px"
                    unoptimized
                    className="object-contain p-1.5"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-gray-900">{item.product.title}</p>
                  <p className="text-sm text-gray-500">
                    {item.count} × {item.price.toLocaleString("en-US")} EGP
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {(item.count * item.price).toLocaleString("en-US")}
                  </p>
                  <p className="text-xs text-gray-400">EGP</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-5 gap-5">
            {/* Delivery address */}
            <div className="col-span-3 rounded-xl border border-gray-100 bg-white p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
                <span className="grid size-6 place-items-center rounded-md bg-blue-100 text-blue-600">
                  <FiMapPin className="size-3.5" />
                </span>
                Delivery Address
              </div>
              <p className="text-lg text-gray-900">{order.shippingAddress.city}</p>
              <p className="mt-2 text-sm text-gray-500">{order.shippingAddress.details}</p>
              <p className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                <FiPhone />
                {order.shippingAddress.phone}
              </p>
            </div>

            {/* Order summary */}
            <div className="col-span-2 rounded-xl border border-amber-200 bg-amber-100/70 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
                <span className="grid size-6 place-items-center rounded-md bg-orange-500 text-white">
                  <FiClock className="size-3.5" />
                </span>
                Order Summary
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString("en-US")} EGP</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>
                  {order.shippingPrice === 0
                    ? "Free"
                    : `${order.shippingPrice.toLocaleString("en-US")} EGP`}
                </span>
              </div>
              <div className="mt-4 flex justify-between border-t border-amber-200 pt-3 font-semibold text-gray-900">
                <span>Total</span>
                <span>{order.totalOrderPrice.toLocaleString("en-US")} EGP</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;