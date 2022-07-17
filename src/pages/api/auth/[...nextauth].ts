import NextAuth from "next-auth/next";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user,'
    }),
  ],
})

function GithubProvider(arg0: { clientId: string | undefined; clientSecret: string | undefined; scope: string; }): import("next-auth/providers").Provider {
  throw new Error("Function not implemented.");
}

