"use server";

import axios from "axios";
import { getMyToken } from "@/utilities/token";

import { CheckoutData, checkoutSchema } from "@/schemas/checkoutschema";
export async function cashPaymentAction(
  cartId: string,
  shippingAddress: CheckoutData,
) {
  const token = await getMyToken();
  if (!token) return { ok: false, message: "Please sign in first", data: null };

  // Server actions are public endpoints, so validate again on the server
  const parsed = checkoutSchema.safeParse(shippingAddress);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0].message, data: null };
  }

  try {
    const { data } = await axios.post(
      `${process.env.API}/orders/${cartId}`,
      { shippingAddress: parsed.data },
      { headers: { token: token as string } },
    );
    return { ok: true, message: "Order placed successfully", data };
  } catch (error) {
    console.log(
      axios.isAxiosError(error) ? error.response?.data ?? error.message : error,
    );

    const message = axios.isAxiosError(error)
      ? error.response?.data?.message ?? "Failed to place order"
      : "Failed to place order";
    return { ok: false, message, data: null };
  }
}