"use server";

import axios from "axios";
import { getMyToken } from "@/utilities/token";
import { CheckoutData, checkoutSchema } from "@/schemas/checkoutschema";

export async function onlinePaymentAction(
  cartId: string,
  shippingAddress: CheckoutData,
) {
  const token = await getMyToken();
  if (!token) return { ok: false, message: "Please sign in first", url: null };

  const parsed = checkoutSchema.safeParse(shippingAddress);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0].message, url: null };
  }

  try {
    const { data } = await axios.post(
      `${process.env.API}/orders/checkout-session/${cartId}`,
      { shippingAddress: parsed.data },
      {
        headers: { token: token as string },
        params: { url: `${process.env.SITE_URL}/allorders` },
      },
    );

    return {
      ok: true,
      message: "Redirecting to payment...",
      url: data.session.url as string,
    };
  } catch (error) {
    console.log(
      axios.isAxiosError(error) ? error.response?.data ?? error.message : error,
    );

    const message = axios.isAxiosError(error)
      ? error.response?.data?.message ?? "Failed to start online payment"
      : "Failed to start online payment";
    return { ok: false, message, url: null };
  }
}