"use server";

import axios from "axios";
import { getMyToken } from "@/utilities/token";
import { errorMessage } from "./errorMessage";

export async function updateCartItemAction(productId: string, count: number) {
  const token = await getMyToken();
  if (!token) return { ok: false, message: "Please sign in first", data: null };

  try {
    const { data } = await axios.put(
      `${process.env.API}/cart/${productId}`,
      { count },
      { headers: { token: token as string } },
    );
    return { ok: true, message: "Cart updated", data };
  } catch (error) {
    return { ok: false, message: errorMessage(error), data: null };
  }
}