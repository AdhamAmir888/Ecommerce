import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaFolderOpen } from "react-icons/fa";
import { getCategory, getSubcategories } from "@/apis/categories";

const CategoryDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const category = await getCategory(id);
  const subcategories = await getSubcategories(id);

  if (!category) {
    notFound();
  }

  return (
    <>
      <section className="bg-linear-to-br from-green-600 to-green-400 px-5 pb-16 pt-20 text-white">
        <nav className="mb-6 flex gap-2 text-sm">
          <Link href="/" className="opacity-80 hover:opacity-100">
            Home
          </Link>
          <span className="opacity-80">/</span>
          <Link href="/categories" className="opacity-80 hover:opacity-100">
            Categories
          </Link>
          <span className="opacity-80">/</span>
          <span>{category.name}</span>
        </nav>

        <div className="flex items-center gap-4">
          <div className="grid size-20 place-items-center rounded-2xl bg-white/25 shadow-lg">
            <Image
              src={category.image}
              alt={category.name}
              width={56}
              height={56}
              unoptimized
              className="size-14 rounded-lg bg-white object-cover"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold">{category.name}</h1>
            <p className="mt-1 text-lg">Choose a subcategory to browse products</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-5 py-10">
        <Link
          href="/categories"
          className="mb-8 flex w-fit items-center gap-3 text-lg text-gray-700 transition duration-500 hover:text-brand"
        >
          <FaArrowLeft />
          Back to Categories
        </Link>

        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          {subcategories.length} Subcategories in {category.name}
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {subcategories.map((sub) => (
            <Link
              key={sub._id}
              href={`/categories/${category._id}`}
              className="group rounded-2xl border border-transparent bg-white p-8 shadow-sm transition duration-500 hover:border-green-200 hover:shadow-lg"
            >
              <div className="grid size-16 place-items-center rounded-xl bg-green-50 text-2xl text-brand">
                <FaFolderOpen />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-gray-900 group-hover:text-brand">
                {sub.name}
              </h3>

              <div className="mt-3 hidden items-center gap-2 text-brand group-hover:flex">
                Browse Products
                <FaArrowRight />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default CategoryDetails;