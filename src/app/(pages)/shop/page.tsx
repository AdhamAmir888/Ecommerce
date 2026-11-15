import ProductCard from "@/app/_components/productcard/ProductCard";
import { getAllProducts } from "@/apis/products";
import { ProductType } from "@/types/products.t";
import Link from "next/link";
import { FaBoxOpen  } from "react-icons/fa";

const Shop = async () => {
  const products = await getAllProducts();

  return (
    <>
          <section className="bg-linear-to-br from-green-600 to-green-400 px-5 pb-16 pt-20 text-white">
        <nav className="mb-6 flex gap-2 text-sm">
          <Link href="/" className="opacity-80 hover:opacity-100">
            Home
          </Link>
          <span className="opacity-80">/</span>
          <span>All Products</span>
        </nav>

        <div className="flex items-center gap-4">
          <div className="grid size-20 place-items-center rounded-2xl bg-white/25 shadow-lg">
            <FaBoxOpen  className="size-8" />
          </div>
          <div>
            <h1 className="text-5xl font-bold">All Products</h1>
            <p className="mt-1 text-lg">
              Explore our complete product collection
            </p>
          </div>
        </div>
      </section>
      <section className="px-10 py-10">
        <div className="grid grid-cols-5 gap-5">
          {products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Shop;
