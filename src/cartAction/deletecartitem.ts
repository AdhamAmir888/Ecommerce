"use server";

import axios from "axios";
import { getMyToken } from "@/utilities/token";
import { errorMessage } from "./errorMessage";

export async function deleteCartItemAction(productId: string) {
  const token = await getMyToken();
  if (!token) return { ok: false, message: "Please sign in first", data: null };

  try {
    const { data } = await axios.delete(
      `${process.env.API}/cart/${productId}`,
      { headers: { token: token as string } },
    );
    return { ok: true, message: "Item removed", data };
  } catch (error) {
    return { ok: false, message: errorMessage(error), data: null };
  }
}