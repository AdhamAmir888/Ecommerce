"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHeadphones,
  FiHeart,
  FiLogOut,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiUserPlus,
} from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { useContext } from "react";
import { CartContext } from "@/Context/CartContext";
const authButton =
  "inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 font-semibold text-white transition hover:bg-brand-dark";

export default function Navbar() {
  const pathname = usePathname();
  const { status } = useSession();
  const { totalCartItem } = useContext(CartContext);
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-24 max-w-375 items-center gap-6 px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <LuShoppingCart className="size-9 text-brand" />
          <span className="text-3xl font-bold tracking-tight text-gray-900">
            FreshCart
          </span>
        </Link>

        <form
          action="/search"
          role="search"
          className="relative hidden min-w-0 max-w-3xl flex-1 md:block"
        >
          <input
            name="q"
            type="search"
            placeholder="Search for products, brands and more…"
            className="h-14 w-full rounded-full border border-gray-200 bg-gray-50 pl-6 pr-16 text-base text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-brand text-white transition hover:bg-brand-dark"
          >
            <FiSearch className="size-5" />
          </button>
        </form>

        {status === "authenticated" && (
          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className={pathname === "/home" ? "text-brand" : "text-gray-700"}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={pathname === "/shop" ? "text-brand" : "text-gray-700"}
            >
              Shop
            </Link>
            <Link
              href="/categories"
              className={
                pathname === "/categories" ? "text-brand" : "text-gray-700"
              }
            >
              Categories
            </Link>
            <Link
              href="/brands"
              className={
                pathname === "/brands" ? "text-brand" : "text-gray-700"
              }
            >
              Brands
            </Link>
          </nav>
        )}

        <div className="hidden items-center gap-3 border-r border-gray-200 pr-5 xl:flex">
          <span className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand">
            <FiHeadphones className="size-6" />
          </span>
          <div className="leading-tight">
            <p className="text-sm text-gray-500">Support</p>
            <p className="text-sm font-semibold text-gray-800">24/7 Help</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-5">
          {status === "authenticated" && (
            <>
              <Link
                href="/"
                aria-label="Wishlist"
                className="text-gray-600 transition hover:text-brand "
              >
                <FiHeart className="size-7" />
              </Link>
              <Link
                href="/cart"
                aria-label="Cart"
                className="relative text-gray-600 transition hover:text-brand"
              >
                <FiShoppingCart className="size-7" />
                {totalCartItem > 0 && (
                  <span className="absolute -right-3 -top-3 grid h-6 min-w-6 place-items-center rounded-full bg-brand px-1 text-xs font-semibold text-white">
                    {totalCartItem > 99 ? "99+" : totalCartItem}
                  </span>
                )}
              </Link>
            </>
          )}

          {status === "authenticated" && (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className={authButton}
            >
              <FiLogOut className="size-4" />
              Log Out
            </button>
          )}
          {status === "loading" && (
            <>
              <h1>Have some patience...</h1>
            </>
          )}
          {status === "unauthenticated" && (
            <>
              <Link href="/login" className={authButton}>
                <FiUser className="size-4" />
                Sign In
              </Link>
              <Link href="/register" className={authButton}>
                <FiUserPlus className="size-4" />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
