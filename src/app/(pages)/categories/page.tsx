import Image from "next/image";
import Link from "next/link";
import {
  FaLayerGroup,
} from "react-icons/fa";
import { getAllCategories } from "@/apis/categories";

const Categories = async () => {
  const categories = await getAllCategories();

  return (
    <>
      <section className="bg-linear-to-br from-green-600 to-green-400 px-5 pb-16 pt-20 text-white">
        <nav className="mb-6 flex gap-2 text-sm">
          <Link href="/" className="opacity-80 hover:opacity-100">
            Home
          </Link>
          <span className="opacity-80">/</span>
          <span>Categories</span>
        </nav>

        <div className="flex items-center gap-4">
          <div className="grid size-20 place-items-center rounded-2xl bg-white/25 shadow-lg">
            <FaLayerGroup className="size-8" />
          </div>
          <div>
            <h1 className="text-5xl font-bold">All Categories</h1>
            <p className="mt-1 text-lg">
              Browse our wide range of product categories
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-5 py-12">
        <div className="grid grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="rounded-2xl bg-white p-6 shadow-sm transition duration-500 hover:shadow-lg"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={300}
                unoptimized
                className="aspect-square w-full rounded-xl object-cover"
              />
              <h3 className="mt-4 text-center text-lg font-semibold text-gray-900">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Categories;
