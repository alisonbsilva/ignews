import { Client } from 'faunadb'

export const fauna = new Client({
    secret: 'FAUNADB_KEY',
  domain: 'db.us.fauna.com',
  port: 443,
  scheme: 'https',
})

