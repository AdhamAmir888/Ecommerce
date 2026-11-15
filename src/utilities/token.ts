import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const cookieStore = await cookies();

  const x =
    cookieStore.get("__Secure-next-auth.session-token")?.value ||
    cookieStore.get("next-auth.session-token")?.value;

  const token = await decode({
    token: x,
    secret: process.env.AUTH_SECRET!,
  });

  return token?.token ?? null;
}