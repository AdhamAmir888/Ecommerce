import axios from "axios";
import { getMyToken } from "@/utilities/token";
import { OrderType } from "@/types/order.t";

// The Route API needs the user id, which is inside the token
function getUserId(token: string): string | null {
  try {
    const payload = token.split(".")[1];
    const json = Buffer.from(payload, "base64url").toString("utf-8");
    return JSON.parse(json).id ?? null;
  } catch {
    return null;
  }
}

export async function getUserOrders(): Promise<OrderType[]> {
  const token = await getMyToken();
  if (!token) return [];

  const userId = getUserId(token as string);
  if (!userId) return [];

  try {
    const { data } = await axios.get(
      `${process.env.API}/orders/user/${userId}`,
      { headers: { token: token as string } },
    );

    const orders: OrderType[] = Array.isArray(data) ? data : data.data ?? [];

    return orders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } catch (error) {
    console.log(
      axios.isAxiosError(error) ? error.response?.data ?? error.message : error,
    );
    return [];
  }
}