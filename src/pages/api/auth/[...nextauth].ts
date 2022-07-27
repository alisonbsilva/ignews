import GithubProvider from "next-auth/providers/github"
import { fauna } from '../../../services/fauna'
import NextAuth from 'next-auth'
import { Collection, query as q, Ref } from "faunadb"
import { ifError } from "assert"



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
  jwt: {
    secret: process.env.SIGNING_KEY
  },

  callbacks: {
    async signIn({ user, account, profile }) {    
      const { email } = user
      try {
        await fauna.query(
          q.Create(
            q.Collection('users'),
            { data: { email: email } }
            )
            )  
            return true  
          } catch(err) {
            return false
          } 
          
        },  
      }
    })
