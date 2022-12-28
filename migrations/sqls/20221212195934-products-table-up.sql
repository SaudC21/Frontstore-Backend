CREATE TABLE IF NOT EXISTS products (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   price INTEGER NOT NULL
);

INSERT INTO products (name, price) VALUES ('PS2', 800);
INSERT INTO products (name, price) VALUES ('PS3', 1000);
INSERT INTO products (name, price) VALUES ('PS4', 1500);
INSERT INTO products (name, price) VALUES ('PS5', 2200);
INSERT INTO products (name, price) VALUES ('PC', 5000);