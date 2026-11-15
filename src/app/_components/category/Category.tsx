import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { getAllCategories } from "@/apis/categories";
import { CategoryType } from "@/types/category.t";

const Category = async () => {
  const categories = await getAllCategories();

  return (
    <>
      <div className="ps-4 py-2 catgory-foo2 flex justify-between mb-5">
        <div className="leftpart flex">
          <div className="greencolumn w-2 h-9.5 bg-green-500 rounded-2xl"></div>
          <span className="text-4xl font-semibold mt-1 ms-3">
            Shop By <span className="text-brand">Category</span>
          </span>
        </div>

        <Link href="/categories" className="rightpart flex">
          <span className="text-lg font-semibold mt-1 text-brand">
            View All Categories
          </span>
          <FaLongArrowAltRight className="mt-2 ms-2 text-brand text-2xl me-3" />
        </Link>
      </div>

      <div>
        <div className="categorybox grid grid-cols-12 gap-5 ms-4">
          {categories.map((category: CategoryType) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="col-span-2 flex flex-col items-center gap-3 rounded-xl bg-white px-4 py-5 shadow-sm transition duration-500 hover:shadow-lg"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={100}
                height={100}
                unoptimized
                className="size-25 rounded-full object-cover"
              />
              <h3 className="text-lg text-gray-700">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;