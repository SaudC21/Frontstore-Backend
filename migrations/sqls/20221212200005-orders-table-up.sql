CREATE TABLE IF NOT EXISTS orders (
   id INTEGER PRIMARY KEY,
   product_id INTEGER REFERENCES products (id),
   quantity INTEGER,
   user_id INTEGER REFERENCES users (id),
   status VARCHAR(150) NOT NULL
);