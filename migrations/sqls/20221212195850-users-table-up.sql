CREATE TABLE IF NOT EXISTS users (
   id SERIAL PRIMARY KEY,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL,
   username VARCHAR(255) NOT NULL,
   password_digest VARCHAR(255) NOT NULL
);

INSERT INTO users (first_name, last_name, username, password_digest) VALUES ('Admin', 'Saud', 'Administ', '$2b$10$t1jBb9LYSXTgowj0A.gQ1OdOK3/2X13NmEdgTikDHaWfoEAPdCPWK');
INSERT INTO users (first_name, last_name, username, password_digest) VALUES ('Saud', 'Albest', 'Saudc21', '$2b$10$Z0Bg1gSVAWX4yh2Gu4h/Te9E4lVT7T9rU1sviL0TKBvtVx1ttq9L6');
INSERT INTO users (first_name, last_name, username, password_digest) VALUES ('AboDa7m', '3TB', '3TB_511', '$2b$10$3oT39YJDwzxiAk/WxeP.HO75dp8ndFj.Wa9OvwI7q6RGwOLcV0Cni');
