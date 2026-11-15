import Link from "next/link";
import {
  FaCreditCard,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="bg-slate-900">
      <div className="mx-auto max-w-375 px-10 py-12">
        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-2 pe-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2"
            >
              <LuShoppingCart className="size-8 text-brand" />
              <span className="text-3xl font-bold tracking-tight text-gray-900">
                FreshCart
              </span>
            </Link>
         
            <p className="mt-6 leading-relaxed text-gray-400">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            <div className="mt-6 space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-brand" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-brand" />
                <span>support@freshcart.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-brand" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="grid size-11 place-items-center rounded-full bg-slate-800 text-gray-300 transition duration-500 hover:bg-brand hover:text-white"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="grid size-11 place-items-center rounded-full bg-slate-800 text-gray-300 transition duration-500 hover:bg-brand hover:text-white"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="grid size-11 place-items-center rounded-full bg-slate-800 text-gray-300 transition duration-500 hover:bg-brand hover:text-white"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="grid size-11 place-items-center rounded-full bg-slate-800 text-gray-300 transition duration-500 hover:bg-brand hover:text-white"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Shop</h3>
            <div className="space-y-4">
              <Link href="/shop" className="block text-gray-400 transition duration-500 hover:text-brand">
                All Products
              </Link>
              <Link href="/categories" className="block text-gray-400 transition duration-500 hover:text-brand">
                Categories
              </Link>
              <Link href="/brands" className="block text-gray-400 transition duration-500 hover:text-brand">
                Brands
              </Link>
              <Link href="/shop" className="block text-gray-400 transition duration-500 hover:text-brand">
                Electronics
              </Link>
              <Link href="/shop" className="block text-gray-400 transition duration-500 hover:text-brand">
                Men&apos;s Fashion
              </Link>
              <Link href="/shop" className="block text-gray-400 transition duration-500 hover:text-brand">
                Women&apos;s Fashion
              </Link>
            </div>
          </div>

    
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Account</h3>
            <div className="space-y-4">
              <Link href="/account" className="block text-gray-400 transition duration-500 hover:text-brand">
                My Account
              </Link>
              <Link href="/orders" className="block text-gray-400 transition duration-500 hover:text-brand">
                Order History
              </Link>
              <Link href="/wishlist" className="block text-gray-400 transition duration-500 hover:text-brand">
                Wishlist
              </Link>
              <Link href="/cart" className="block text-gray-400 transition duration-500 hover:text-brand">
                Shopping Cart
              </Link>
              <Link href="/signin" className="block text-gray-400 transition duration-500 hover:text-brand">
                Sign In
              </Link>
              <Link href="/signup" className="block text-gray-400 transition duration-500 hover:text-brand">
                Create Account
              </Link>
            </div>
          </div>

         
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Support</h3>
            <div className="space-y-4">
              <Link href="/contact" className="block text-gray-400 transition duration-500 hover:text-brand">
                Contact Us
              </Link>
              <Link href="/help" className="block text-gray-400 transition duration-500 hover:text-brand">
                Help Center
              </Link>
              <Link href="/shipping" className="block text-gray-400 transition duration-500 hover:text-brand">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-gray-400 transition duration-500 hover:text-brand">
                Returns &amp; Refunds
              </Link>
              <Link href="/track" className="block text-gray-400 transition duration-500 hover:text-brand">
                Track Order
              </Link>
            </div>
          </div>

    
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Legal</h3>
            <div className="space-y-4">
              <Link href="/privacy" className="block text-gray-400 transition duration-500 hover:text-brand">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-400 transition duration-500 hover:text-brand">
                Terms of Service
              </Link>
              <Link href="/cookies" className="block text-gray-400 transition duration-500 hover:text-brand">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-375 items-center justify-between px-10 py-3 text-gray-500">
          <p>© 2026 FreshCart. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <FaCreditCard /> Visa
            </span>
            <span className="flex items-center gap-2">
              <FaCreditCard /> Mastercard
            </span>
            <span className="flex items-center gap-2">
              <FaCreditCard /> PayPal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;