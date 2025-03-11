import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { db } from "@/db/drizzle";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub, Google],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    }
  }
})