import React from 'react'
import { FaHeadset, FaShieldAlt, FaTruck, FaUndoAlt } from 'react-icons/fa'

const PreFooter = () => {
  return (
      <section className="border-t border-green-100 bg-green-50 px-5 py-8">
        <div className="grid grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="grid size-15 place-items-center rounded-xl bg-green-100 text-green-600">
              <FaTruck className="size-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Free Shipping</h3>
              <p className="text-sm text-gray-500">On orders over 500 EGP</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="grid size-15 place-items-center rounded-xl bg-green-100 text-green-600">
              <FaUndoAlt className="size-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Easy Returns</h3>
              <p className="text-sm text-gray-500">14-day return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="grid size-15 place-items-center rounded-xl bg-green-100 text-green-600">
              <FaShieldAlt className="size-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Secure Payment</h3>
              <p className="text-sm text-gray-500">100% secure checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="grid size-15 place-items-center rounded-xl bg-green-100 text-green-600">
              <FaHeadset className="size-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">24/7 Support</h3>
              <p className="text-sm text-gray-500">Contact us anytime</p>
            </div>
          </div>
        </div>
      </section>  )
}

export default PreFooter