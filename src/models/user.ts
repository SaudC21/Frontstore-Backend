import client from "../database";
import bcrypt from 'bcrypt'

const { 
   BCRYPT_PASS,
   SALT_ROUNDS
} = process.env

export type User = {
   first_name: String;
   last_name: String;
   username: String;
   password: String;
}

export class userStore {
   async index(): Promise<User[]> {
      try {
         const conn = await client.connect();
         const sql = 'SELECT * FROM users';
         const result = await conn.query(sql);
         const users = result.rows;
         conn.release();
         return users;
      } catch (error) {
         throw new Error(`Can't get all users. Error: ${error}`);
      }
   }

   async show(id: number): Promise<User> {
      try {
         const conn = await client.connect();
         const sql = 'SELECT user FROM users WHERE id=($1)';
         const result = await conn.query(sql, [id]);
         const user = result.rows[0];
         conn.release();
         return user;
      } catch (error) {
         throw new Error(`Can't get user ${id}. Error: ${error}`);
      }
   }

   async create(user: User): Promise<User> {
      try {
         const conn = await client.connect();
         const sql = 'INSERT INTO users (first_name, last_name, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
         const result = await conn.query(sql, [user.first_name, user.last_name, user.username, user.password]);
         const userRecord = result.rows[0];
         conn.release();
         return userRecord;
      } catch (error) {
         throw new Error(`Couldn't add new user ${user}. Error: ${error}`);
      }
   }

   async authenticate (username: string, password: string): Promise<User | null> {
      try {
         const conn = await client.connect();
         const sql = 'SELECT * FROM users WHERE username=($1)';
         const result = await conn.query(sql, [username]);

         if(result.rows.length) {
            const userRecord = result.rows[0];

            if(bcrypt.compareSync(password + BCRYPT_PASS, userRecord.password_digest)){
               return userRecord;
            }
         }

         conn.release();
      } catch (error) {
         throw new Error(`unable to authenticate user ${username}. Error: ${error}`);
      }
      return null;
   }

   async delete(id: number): Promise<User> {
      try {
         const conn = await client.connect();
         const sql = 'DELETE FROM users WHERE id=($1)';
         const result = await conn.query(sql, [id]);
         const user = result.rows[0];
         conn.release();
         return user;
      } catch (error) {
         throw new Error(`Couldn't delete user ${id}. Error: ${error}`);
      }
   }
}