"use server";

import axios from "axios";
import { getMyToken } from "@/utilities/token";
import { errorMessage } from "./errorMessage";

export async function addToCartAction(productId: string, count: number = 1) {
  const token = await getMyToken();
  if (!token) return { ok: false, message: "Please sign in first", data: null };

  const headers = { token: token as string };

  try {
    let { data } = await axios.post(
      `${process.env.API}/cart`,
      { productId },
      { headers },
    );

    // The add endpoint adds 1, so set the chosen quantity afterwards
    if (count > 1) {
      ({ data } = await axios.put(
        `${process.env.API}/cart/${productId}`,
        { count },
        { headers },
      ));
    }

    return { ok: true, message: "Added to cart", data };
  } catch (error) {
    return { ok: false, message: errorMessage(error), data: null };
  }
}