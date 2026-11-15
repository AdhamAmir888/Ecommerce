import Image from "next/image";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiEye, FiHeart, FiRefreshCw } from "react-icons/fi";
import { ProductType } from "@/types/products.t";
import CarBtn from "@/app/_components/carbtn/CarBtn";

const iconButton =
  "grid size-10 place-items-center rounded-full bg-white text-gray-700 shadow-sm transition duration-500 hover:text-brand";

const ProductCard = ({ product }: { product: ProductType }) => {
  const finalPrice = product.priceAfterDiscount ?? product.price;
  const discount = Math.round(
    ((product.price - finalPrice) / product.price) * 100,
  );

  return (
    <div className="relative rounded-xl border border-gray-200 bg-white p-4 transition duration-500 hover:shadow-lg">
      {discount > 0 && (
        <span className="absolute left-4 top-4 z-10 rounded-md bg-red-500 px-2 py-1 text-sm font-semibold text-white">
          -{discount}%
        </span>
      )}

      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
        <button className={iconButton}>
          <FiHeart className="size-5" />
        </button>
        <button className={iconButton}>
          <FiRefreshCw className="size-5" />
        </button>
        <Link
          href={`/products/${product._id}`}
          aria-label="View product"
          className="grid size-12 place-items-center rounded-full bg-white shadow-md transition hover:text-3xl"
        >
          <FiEye className="text-brand" />
        </Link>
      </div>

      <Link href={`/products/${product._id}`}>
        <Image
          src={product.imageCover}
          alt={product.title}
          width={300}
          height={300}
          unoptimized
          className="h-64 w-full object-contain"
        />
      </Link>

      <div className="mt-4">
        <p className="text-sm text-gray-500">{product.category.name}</p>

        <Link href={`/products/${product._id}`}>
          <h3 className="line-clamp-1 text-lg font-medium text-gray-800">
            {product.title}
          </h3>
        </Link>

        <div className="mt-1 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) =>
            star <= Math.floor(product.ratingsAverage) ? (
              <FaStar key={star} className="text-yellow-400" />
            ) : (
              <FaRegStar key={star} className="text-yellow-400" />
            ),
          )}
          <span className="ms-2 text-sm text-gray-500">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-gray-900">
              {finalPrice} EGP
            </p>
            {discount > 0 && (
              <p className="text-sm text-gray-400 line-through">
                {product.price} EGP
              </p>
            )}
          </div>

          <CarBtn productId={product._id} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;