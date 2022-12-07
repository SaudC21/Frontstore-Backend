CREATE TABLE IF NOT EXISTS orders (
   id INTEGER PRIMARY KEY,
   product_id INTEGER REFERENCES product (id),
   quantity INTEGER,
   user_id INTEGER REFERENCES user (id),
   status VARCHAR(150) NOT NULL,
);