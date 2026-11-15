"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { ProductType } from "@/types/products.t";
import { getUserCartAction } from "@/cartAction/getusercart";
import { updateCartItemAction } from "@/cartAction/updatecart";
import { clearCartAction } from "@/cartAction/clearcart";
import { addToCartAction } from "@/cartAction/addcart";
import { deleteCartItemAction } from "@/cartAction/deletecartitem";

export type CartItemType = {
  _id: string;
  count: number;
  price: number;
  product: ProductType;
};

type ActionResult = { ok: boolean; message: string };

type CartContextType = {
  products: CartItemType[];
  totalCartPrice: number;
  totalCartItem: number;
  cartId: string;
  addProductCart: (productId: string, count?: number) => Promise<ActionResult>;
  deleteCartItem: (productId: string) => Promise<ActionResult>;
  updateCartItem: (productId: string, count: number) => Promise<ActionResult>;
  clearCart: () => Promise<ActionResult>;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();

  const [products, setProducts] = useState<CartItemType[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartId, setCartId] = useState("");

  function resetCart() {
    setProducts([]);
    setTotalCartPrice(0);
    setTotalCartItem(0);
    setCartId("");
  }

  async function getUserCart() {
    try {
      const data = await getUserCartAction();

      if (!data) {
        resetCart();
        return;
      }

      setProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      setTotalCartItem(data.numOfCartItems);
      setCartId(data.cartId ?? data.data._id);
    } catch (error) {
      console.log(error);
    }
  }

  // Load the cart on login, clear it on logout
  useEffect(() => {
    if (status === "authenticated") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getUserCart();
    }
    if (status === "unauthenticated") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      resetCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function addProductCart(productId: string, count = 1) {
    const existing =
      products.find((item) => item.product._id === productId)?.count ?? 0;

    const res = await addToCartAction(productId, existing + count);

    if (res.ok) {
      setTotalCartItem(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setCartId(res.data.cartId ?? res.data.data._id);
      await getUserCart();
    }
    return { ok: res.ok, message: res.message };
  }

  async function updateCartItem(productId: string, count: number) {
    const res = await updateCartItemAction(productId, count);

    if (res.ok) {
      setProducts(res.data.data.products);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setTotalCartItem(res.data.numOfCartItems);
    }
    return { ok: res.ok, message: res.message };
  }

  async function deleteCartItem(productId: string) {
    const res = await deleteCartItemAction(productId);

    if (res.ok) {
      setProducts(res.data.data.products);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setTotalCartItem(res.data.numOfCartItems);
    }
    return { ok: res.ok, message: res.message };
  }

  async function clearCart() {
    const res = await clearCartAction();

    if (res.ok) {
      resetCart();
    }
    return { ok: res.ok, message: res.message };
  }

  return (
    <CartContext.Provider
      value={{
        products,
        totalCartPrice,
        totalCartItem,
        cartId,
        addProductCart,
        deleteCartItem,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
