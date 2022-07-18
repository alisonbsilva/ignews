import { Client } from 'faunadb'

export const fauna = new Client({
  secret:'FAUNADB_KEY'
})