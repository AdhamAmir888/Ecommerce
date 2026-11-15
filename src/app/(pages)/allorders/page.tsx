import Link from "next/link";
import { FaBagShopping, FaBox } from "react-icons/fa6";
import { getUserOrders } from "@/apis/orders";
import OrderCard from "@/app/_components/ordercard/OrderCard";

const AllOrders = async () => {
  const orders = await getUserOrders();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-900">My Orders</span>
      </nav>

      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="grid size-14 place-items-center rounded-2xl bg-brand text-2xl text-white shadow-md shadow-green-600/30">
            <FaBox />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-500">
              Track and manage your {orders.length}{" "}
              {orders.length === 1 ? "order" : "orders"}
            </p>
          </div>
        </div>

        <Link
          href="/shop"
          className="flex items-center gap-2 text-sm font-medium text-brand transition duration-500 hover:text-brand-dark"
        >
          <FaBagShopping />
          Continue Shopping
        </Link>
      </div>

      {orders.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
          <p className="text-xl text-gray-700">You have no orders yet</p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-lg bg-brand px-8 py-3 font-semibold text-white transition duration-500 hover:bg-brand-dark"
          >
            Start Shopping
          </Link>
        </div>
      )}

      <div className="space-y-5">
        {orders.map((order, index) => (
          <OrderCard key={order._id} order={order} defaultOpen={index === 0} />
        ))}
      </div>
    </div>
  );
};

export default AllOrders;