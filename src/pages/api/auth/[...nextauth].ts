import GithubProvider from "next-auth/providers/github"
import { fauna } from '../../../services/fauna'
import NextAuth from 'next-auth'
import { query as q } from "faunadb"
import { signIn } from "next-auth/react"



export default NextAuth({
  providers: [
    GithubProvider({
      clientId: 'GITHUB_CLIENT_ID',
      clientSecret: 'GITHUB_CLIENT_SECRET',
      authorization: {
        params: {
          scope: "read:user",
        },
      },
      
    }),
  ],
  jwt: {
    secret: 'SIGNING_KEY'
  },

  callbacks: {
    async signIn({ user, account, profile }) {    
      console.log(user)
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
            console.log(err)
            return false
          } 
          
        },  
      }
    })
function err(err: any) {
  throw new Error("Function not implemented.")
}

