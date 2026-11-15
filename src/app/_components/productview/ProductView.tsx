"use client";
// da m3mool client 34an fih clickaya 34an kda 3mlto lw7do
// da m3mool client 34an fih clickaya 34an kda 3mlto lw7do
// da m3mool client 34an fih clickaya 34an kda 3mlto lw7do
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { FaBolt, FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { ProductType } from "@/types/products.t";
import { addToCartAction } from "@/cartAction/addcart";

export default function ProductView({ product }: { product: ProductType }) {
  const gallery = [product.imageCover, ...product.images];
  const [selected, setSelected] = useState(gallery[0]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    setLoading(true);
    const res = await addToCartAction(product._id, count);
    setLoading(false);

    if (res.ok) {
      toast.success("Added to cart", { position: "top-center" });
    } else {
      toast.error(res.message, { position: "top-center" });
    }
  }

  return (
    <div className="mt-8 grid grid-cols-[420px_1fr] gap-8">
      {/* Images */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <Image
          src={selected}
          alt={product.title}
          width={400}
          height={400}
          unoptimized
          className="mx-auto h-100 w-full object-contain"
          priority
        />
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {gallery.map((img) => (
            <button
              key={img}
              type="button"
              onClick={() => setSelected(img)}
              className={`shrink-0 rounded-lg border-2 ${
                selected === img ? "border-brand" : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt=""
                width={90}
                height={90}
                unoptimized
                className="size-22 object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
        <div className="flex gap-2 text-sm">
          {product.category && (
            <span className="rounded-full bg-green-50 px-3 py-1 text-brand">
              {product.category.name}
            </span>
          )}
          {product.brand && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
              {product.brand.name}
            </span>
          )}
        </div>

        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          {product.title}
        </h1>

        <div className="mt-3 flex items-center gap-2 text-yellow-400">
          {[1, 2, 3, 4, 5].map((n) =>
            n <= Math.round(product.ratingsAverage) ? (
              <FaStar key={n} />
            ) : (
              <FaRegStar key={n} />
            ),
          )}
          <span className="text-gray-600">
            {product.ratingsAverage} ({product.ratingsQuantity} reviews)
          </span>
        </div>

        <p className="mt-5 text-4xl font-bold text-gray-900">
          {product.price} EGP
        </p>

        <span
          className={`mt-5 inline-block rounded-full px-4 py-2 text-sm ${
            product.quantity > 0
              ? "bg-green-50 text-brand"
              : "bg-red-50 text-red-500"
          }`}
        >
          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
        </span>

        <p className="mt-6 border-t border-gray-100 pt-6 text-gray-700">
          {product.description}
        </p>

        <p className="mt-6 text-gray-700">Quantity</p>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center rounded-lg border border-gray-200">
            <button
              type="button"
              onClick={() => setCount((c) => Math.max(1, c - 1))}
              className="grid size-12 place-items-center"
              aria-label="Decrease quantity"
            >
              <FiMinus />
            </button>
            <span className="w-12 text-center">{count}</span>
            <button
              type="button"
              onClick={() => setCount((c) => Math.min(product.quantity, c + 1))}
              className="grid size-12 place-items-center  cursor-pointer"
              aria-label="Increase quantity"
            >
              <FiPlus />
            </button>
          </div>
          <span className="text-gray-600">{product.quantity} available</span>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-lg bg-gray-50 px-5 py-5">
          <span className="text-gray-700">Total Price:</span>
          <span className="text-2xl font-bold text-brand">
            {(product.price * count).toFixed(2)} EGP
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={handleAdd}
            disabled={loading || product.quantity === 0}
            className="flex h-14 items-center justify-center gap-2 rounded-lg bg-brand font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
          >
            <FaShoppingCart />
            {loading ? "Adding..." : "Add to Cart"}
          </button>
          <button
            type="button"
            className="flex h-14 items-center justify-center gap-2 rounded-lg bg-gray-900 font-semibold text-white"
          >
            <FaBolt />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
