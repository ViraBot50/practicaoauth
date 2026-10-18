import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";

const providers: Provider[] = [
  GitHub,
  Discord({
    issuer: "https://discord.com",
  }),
];

export const providerList = providers.map((p) => {
  const provider = typeof p === "function" ? p() : p;

  return {
    id: provider.id,
    name: provider.name,
  };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
      }

      return token;
    },
    session({ session, token }) {
      session.provider = token.provider as string | undefined;
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    provider?: string;
  }
}