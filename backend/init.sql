CREATE DATABASE IF NOT EXISTS task;
USE task;
CREATE TABLE IF NOT EXISTS products (
    id INT auto_increment,
    name VARCHAR(255),
    price DECIMAL(18, 2),
    email VARCHAR(255),
    count INT,
    PRIMARY KEY (id)
);

INSERT INTO products (name, price, email, count) VALUES
('Product 1', 10.99, 'email1@example.com', 5),
('Product 2', 24.99, 'email2@example.com', 5),
('Product 3', 32.50, 'email3@example.com', 5),
('Product 4', 15.75, 'email4@example.com', 5);