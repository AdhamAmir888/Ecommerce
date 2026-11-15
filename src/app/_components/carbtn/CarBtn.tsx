"use client";

import { useContext, useState } from "react";
import { toast } from "sonner";
import { FiPlus } from "react-icons/fi";
import { CartContext } from "@/Context/CartContext";

const AddToCartButton = ({ productId }: { productId: string }) => {
  const { addProductCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    setLoading(true);
    const res = await addProductCart(productId);
    setLoading(false);

    if (res.ok) {
      toast.success(res.message,{ position: "top-center" });
    } else {
      toast.error(res.message,{ position: "top-center" });
    }
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={loading}
      className="grid size-12 place-items-center rounded-full bg-brand text-white transition duration-500 hover:bg-brand-dark disabled:opacity-60"
    >
      <FiPlus className="size-6" />
    </button>
  );
};

export default AddToCartButton;