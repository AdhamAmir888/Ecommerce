// src/app/(pages)/home/page.tsx
import Category from "@/app/_components/category/Category";
import Swipery from "@/app/_components/theswiper/Swipery";
import { FaTruck, FaShieldAlt, FaUndoAlt, FaHeadset } from "react-icons/fa";
import ProductCard from "../_components/productcard/ProductCard";
import { getAllProducts } from "@/apis/products";
import { ProductType } from "@/types/products.t";

const Home = async () => {
    const products= await getAllProducts()
  return (
    <>
      <Swipery />

      <section className="bg-gray-50 px-10 py-10">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-3 flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm hover:shadow-lg transition duration-300">
            <div className="grid size-14 place-items-center rounded-full bg-blue-50 text-blue-500">
              <FaTruck className="size-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Free Shipping</h3>
              <p className="text-sm text-gray-500">On orders over 500 EGP</p>
            </div>
          </div>

          <div className="col-span-3 flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm hover:shadow-lg transition duration-300">
            <div className="grid size-14 place-items-center rounded-full bg-green-50 text-green-500">
              <FaShieldAlt className="size-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Secure Payment</h3>
              <p className="text-sm text-gray-500">100% secure transactions</p>
            </div>
          </div>

          <div className="col-span-3 flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm hover:shadow-lg transition duration-300">
            <div className="grid size-14 place-items-center rounded-full bg-orange-50 text-orange-500">
              <FaUndoAlt className="size-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Easy Returns</h3>
              <p className="text-sm text-gray-500">14-day return policy</p>
            </div>
          </div>

          <div className="col-span-3 flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm hover:shadow-lg transition duration-300">
            <div className="grid size-14 place-items-center rounded-full bg-purple-50 text-purple-500">
              <FaHeadset className="size-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">24/7 Support</h3>
              <p className="text-sm text-gray-500">Dedicated support team</p>
            </div>
          </div>
        </div>
      </section>
      <Category />
      <div className="ps-4 py-2 catgory-foo2 flex justify-between mt-20 mb-5">
        <div className="leftpart flex">
          <div className="greencolumn w-2 h-9.5 bg-green-500 rounded-2xl"></div>
          <span className="text-4xl font-semibold  ms-3">
            Featured <span className="text-brand">Products</span>
          </span>
        </div>
      </div>
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

export default Home;
