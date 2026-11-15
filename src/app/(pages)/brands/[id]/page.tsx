import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFilter, FaTags } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { getBrand } from "@/apis/brands";
import ProductCard from "@/app/_components/productcard/ProductCard";
import { getProductsByBrand } from "@/apis/products";

const BrandDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const brand = await getBrand(id);
  const products = await getProductsByBrand(id);
  if (!brand) {
    notFound();
  }

  return (
    <>
      <section className="bg-linear-to-br from-green-600 to-green-400 px-5 pb-16 pt-12 text-white">
        <nav className="mb-6 flex gap-2 text-sm">
          <Link href="/" className="opacity-80 hover:opacity-100">
            Home
          </Link>
          <span className="opacity-80">/</span>
          <Link href="/brands" className="opacity-80 hover:opacity-100">
            Brands
          </Link>
          <span className="opacity-80">/</span>
          <span>{brand.name}</span>
        </nav>

        <div className="flex items-center gap-4">
          <div className="grid size-20 place-items-center rounded-2xl bg-white/25 shadow-lg">
            <Image
              src={brand.image}
              alt={brand.name}
              width={56}
              height={56}
              unoptimized
              className="h-10 w-14 rounded-md bg-white object-contain p-1"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold">{brand.name}</h1>
            <p className="mt-1 text-lg">Shop {brand.name} products</p>
          </div>
        </div>
      </section>

    
      <section className="bg-gray-50 px-5 py-10">
        <div className="flex items-center gap-3">
          <FaFilter className="text-gray-700" />
          <span className="text-gray-700">Active Filters:</span>

          <span className="flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-purple-700">
            <FaTags className="size-3" />
            {brand.name}
            <Link href="/brands" aria-label="Remove filter">
              <FiX />
            </Link>
          </span>

          <Link href="/brands" className="text-gray-600 underline">
            Clear all
          </Link>
        </div>

        <p className="mb-6 mt-6 text-gray-500">
          Showing {products.length} products
        </p>

        {products.length === 0 && (
          <p className="text-lg text-gray-600">
            No products found for this brand.
          </p>
        )}

        <div className="grid grid-cols-5 gap-5">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default BrandDetails;
