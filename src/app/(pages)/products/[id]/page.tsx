import ProductView from "@/app/_components/productview/ProductView";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaHome } from "react-icons/fa";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${process.env.API}/products/${id}`);
  if (!res.ok) notFound();

  const { data: product } = await res.json();

  return (
    <section className="mx-auto max-w-375 px-6 py-6">
      <nav className="flex items-center gap-3 text-gray-600">
        <Link href="/" className="flex items-center gap-2">
          <FaHome /> Home
        </Link>
        <span>&gt;</span>
        <span>{product.category?.name}</span>
        <span>&gt;</span>
        <span className="text-gray-900">{product.title}</span>
      </nav>

      <ProductView product={product} />
    </section>
  );
}
