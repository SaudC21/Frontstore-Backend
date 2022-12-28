import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
   POSTGRES_HOST,
   POSTGRES_DB,
   POSTGRES_USER,
   POSTGRES_PASS,
   POSTGRES_TEST_DB,
   ENV,
} = process.env

let client: Pool = new Pool();

if (ENV === 'test') {
   client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_TEST_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASS,
   })
}

if (ENV === 'dev') {
   client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASS,
   })
}

export default client