import client from "../database";

export type Product = {
   name: String;
   price: number;
}

export class productStore {
   async index(): Promise<Product[]> { // SHOW ALL products
      try {
         const conn = await client.connect();
         const sql = 'SELECT * FROM products';
         const result = await conn.query(sql);
         const products = result.rows;
         conn.release();
         return products;
      } catch (error) {
         throw new Error(`Can't get all products. Error: ${error}`);
      }
   }

   async show(id: number): Promise<Product> { // SHOW one product
      try {
         const conn = await client.connect();
         const sql = 'SELECT * FROM products WHERE id=($1)';
         const result = await conn.query(sql, [id]);
         const product = result.rows[0];
         conn.release();
         return product;
      } catch (error) {
         throw new Error(`Can't get product ${id}. Error: ${error}`);
      }
   }

   async create(product: Product): Promise<Product> { // CREATE new product
      try {
         const conn = await client.connect();
         const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
         const result = await conn.query(sql, [product.name, product.price]);
         const productRecord = result.rows[0];
         conn.release();
         return productRecord;
      } catch (error) {
         throw new Error(`Couldn't add new product ${product}. Error: ${error}`);
      }
   }

   async update(product: any): Promise <Product | null> { // UPDATE product info
      try {
         const conn = await client.connect();
         const sql = 'UPDATE products SET name = $1, price = $2 WHERE id = $3';
         const result = await conn.query(sql, [
            product.name,
            product.price,
            product.id
         ]);
         conn.release();
         return result.rows[0];
      } catch (error) {
         throw new Error(`Could not update product ${product.name}. Error: ${error}`)
      }
   }

   async delete(id: number): Promise<Product> { // DELETE one product
      try {
         const conn = await client.connect();
         const sql = 'DELETE FROM products WHERE id=($1)';
         const result = await conn.query(sql, [id]);
         const product = result.rows[0];
         conn.release();
         return product;
      } catch (error) {
         throw new Error(`Couldn't delete product ${id}. Error: ${error}`);
      }
   }
}