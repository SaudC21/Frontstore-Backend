import client from "../database";

export type Order = {
   product_id: string;
   quantity: number;
   user_id: string;
   status: string;
}

export class orderStore {
   async index(): Promise<Order[]> {
      try {
         const conn = await client.connect();
         const sql = 'SELECT * FROM orders';
         const result = await conn.query(sql);
         const orders = result.rows;
         conn.release();
         return orders;
      } catch (error) {
         throw new Error(`Can't get all orders. Error: ${error}`);
      }
   }

   async show(id: number): Promise<Order> {
      try {
         const conn = await client.connect();
         const sql = 'SELECT order FROM orders WHERE id=($1)';
         const result = await conn.query(sql, [id]);
         const order = result.rows[0];
         conn.release();
         return order;
      } catch (error) {
         throw new Error(`Can't get order ${id}. Error: ${error}`);
      }
   }

   async create(order: Order): Promise<Order> {
      try {
         const conn = await client.connect();
         const sql = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *';
         const result = await conn.query(sql, [order.product_id, order.quantity, order.user_id, order.status]);
         const orderRecord = result.rows[0];
         conn.release();
         return orderRecord;
      } catch (error) {
         throw new Error(`Couldn't add new order ${order}. Error: ${error}`);
      }
   }

   async delete(id: number): Promise<Order> {
      try {
         const conn = await client.connect();
         const sql = 'DELETE FROM orders WHERE id=($1)';
         const result = await conn.query(sql, [id]);
         const order = result.rows[0];
         conn.release();
         return order;
      } catch (error) {
         throw new Error(`Couldn't delete order ${id}. Error: ${error}`);
      }
   }
}