import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const payload = await response.json();

        // fetch doesn't throw on 401/404, so check response.ok yourself
        if (!response.ok) {
          throw new Error(payload.message || "Login failed");
        }
        const { id }: { id: string } = jwtDecode(payload.token);
        return {
          id: id,
          user: payload.user,
          token: payload.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user?.token;
        token.user = user?.user;
      }
      return token;
    },
    // Controls what useSession() returns
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};
