import client from "../database";
import bcrypt from 'bcrypt'

const pepper: string = process.env.pepper as string;
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string);

export type User = {
   first_name: String;
   last_name: String;
   username: String;
   password_digest: String;
}

export class userStore {
   async index(): Promise<User[]> { // SHOW ALL users
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

   async show(id: number): Promise<User> { // SHOW one user
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

   async create(user: User): Promise<User> { // CREATE new user
      try {
         const conn = await client.connect();
         const sql = 'INSERT INTO users (first_name, last_name, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';

         // Password hashing
         const hash = bcrypt.hashSync(user.password_digest + pepper, saltRounds);

         const result = await conn.query(sql, [user.first_name, user.last_name, user.username, hash]);

         const userRecord = result.rows[0];
         conn.release();
         return userRecord;
      } catch (error) {
         throw new Error(`Couldn't add new user ${user}. Error: ${error}`);
      }
   }

   async authenticate (username: string, password: string): Promise<User | null> { // user authentication
      try {
         const conn = await client.connect();
         const sql = 'SELECT * FROM users WHERE username=($1)';
         const result = await conn.query(sql, [username]);

         if(result.rows.length) {
            const userRecord = result.rows[0];

            if(bcrypt.compareSync(password + pepper, userRecord.password_digest)){
               return userRecord;
            }
         }

         conn.release();
      } catch (error) {
         throw new Error(`unable to authenticate user ${username}. Error: ${error}`);
      }
      return null;
   }

   async update(user: User): Promise <User | null> { // UPDATE user info
      try {
         const conn = await client.connect();
         const sql = 'UPDATE users SET first_name = $1, last_name = $2, username = $3, password_digest = $4 WHERE id = $5';
         const result = await conn.query(sql, [
            user.first_name,
            user.last_name,
            user.username,
            user.password_digest,
         ]);
         conn.release();
         return result.rows[0];
      } catch (error) {
         throw new Error(`Could not update user ${user.first_name} ${user.first_name}. Error: ${error}`)
      }
   }

   async delete(id: number): Promise<User> { // DELETE one user
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