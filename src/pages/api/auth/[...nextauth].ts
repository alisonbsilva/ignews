import GithubProvider from "next-auth/providers/github"
import { fauna } from '../../../services/fauna'
import NextAuth from 'next-auth'
import { Query as q } from "faunadb"


export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  callbacks: {
  async signIn({ user, account, profile }) {
    
    const { email } = user

    await fauna.query(
      q.Create(
        q.Collection('users'),
        { data: { email } }
      )
    )        
    return true
  },
  
  }
})