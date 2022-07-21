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
            .then((ret) => console.log(ret))
            .catch((err) => console.error(
              'Error: [%s] %s: %s',
              err.name,
              err.message,
              err.errors()[0].description,
              {
                ref: Ref(Collection("Posts"), "1"),
                ts: 1622574501060000,
                data: { title: 'The first post' }
              }
            ))    
            return true  
          } catch(err) {
            console.log(err)
            return false
          } 
          
        },  
      }
    })
