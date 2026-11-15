import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaTags } from "react-icons/fa";
import { getAllBrands } from "@/apis/brands";

const Brands = async () => {
  const brands = await getAllBrands();

  return (
    <>
      <section className="bg-linear-to-br from-purple-600 to-purple-400 px-5 pb-16 pt-20 text-white">
        <nav className="mb-6 flex gap-2 text-sm">
          <Link href="/" className="opacity-80 hover:opacity-100">
            Home
          </Link>
          <span className="opacity-80">/</span>
          <span>Brands</span>
        </nav>

        <div className="flex items-center gap-4">
          <div className="grid size-20 place-items-center rounded-2xl bg-white/25 shadow-lg">
            <FaTags className="size-8" />
          </div>
          <div>
            <h1 className="text-5xl font-bold">Top Brands</h1>
            <p className="mt-1 text-lg">Shop from your favorite brands</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-5 py-12">
        <div className="grid grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="group rounded-2xl border border-transparent bg-white p-6 shadow-sm transition duration-500 hover:border-purple-200 hover:shadow-lg"
            >
              <div className="rounded-xl bg-gray-50 p-4">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={200}
                  height={200}
                  unoptimized
                  className="aspect-square w-full object-contain"
                />
              </div>

              <h3 className="mt-4 text-center font-semibold text-gray-900 transition duration-500 group-hover:text-purple-600">
                {brand.name}
              </h3>

              <div className="mt-2 hidden items-center justify-center gap-2 text-sm text-purple-600 group-hover:flex">
                View Products
                <FaArrowRight />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Brands;
