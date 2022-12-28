CREATE TABLE IF NOT EXISTS order_products (
   id SERIAL PRIMARY KEY,
   quantity INTEGER NOT NULL,
   order_id BIGINT REFERENCES orders(id) NOT NULL,
   product_id BIGINT REFERENCES products(id) NOT NULL
);

INSERT INTO order_products (quantity, order_id, product_id) VALUES (5, 1, 3);
INSERT INTO order_products (quantity, order_id, product_id) VALUES (3, 2, 4);