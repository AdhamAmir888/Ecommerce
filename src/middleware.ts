import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const authPage = ["/login", "/register"];
  const routes = ["/", "/shop", "/brands", "/categories", "/cart","/checkout","/allorders"];

  const isProtected =
    routes.includes(pathname) ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/categories/") ||
    pathname.startsWith("/brands/");
    pathname.startsWith("/shop/");

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && authPage.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/shop",
    "/cart",
    "/checkout",
    "/allorders",
    "/products/:path*",
    "/categories/:path*",
    "/brands/:path*",
    "/login",
    "/register",
  ],
};