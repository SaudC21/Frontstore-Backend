CREATE TABLE IF NOT EXISTS orders (
   id SERIAL PRIMARY KEY,
   user_id BIGINT REFERENCES users(id) NOT NULL,
   status VARCHAR(150) NOT NULL
);

INSERT INTO orders (user_id, status) VALUES(2, 'Active');
INSERT INTO orders (user_id, status) VALUES(3, 'Waiting');
