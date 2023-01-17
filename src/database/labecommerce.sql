-- Active: 1673874187784@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

PRAGMA table_info ('users');

PRAGMA table_info ('products');

DROP TABLE users;

DROP TABLE products;

SELECT * FROM users;

SELECT * FROM products;

INSERT INTO
    users (id, email, password)
VALUES (
        '22',
        'teste@teste.com.br',
        'teste'
    ), (
        '23',
        'teste44@teste.com.br',
        'teste2'
    ), (
        '24',
        'teste45@teste.com.br',
        'teste3'
    ), (
        '25',
        'teste46@teste.com.br',
        'teste4'
    );

INSERT INTO
    products (id, name, price, category)
VALUES (
        '24',
        'caneta',
        '43',
        'material escolar'
    ), (
        '25',
        'cortador de unha',
        '54',
        'farmacia'
    ), (
        '26',
        'macaco',
        '100',
        'automotivo'
    ), (
        '27',
        'serra',
        '150',
        'ferragem'
    ), (
        '28',
        'lona',
        '140',
        'material de construção'
    );

SELECT * FROM products
 WHERE id = '27';

 SELECT * FROM products
 WHERE name = 'serra';

DELETE FROM users
 WHERE id = '25';

UPDATE users 
SET password = "bananinha123" 
WHERE id = 25;

UPDATE products 
SET name = "bananinha",
price = '43'
WHERE id = 25;


SELECT * FROM users
ORDER BY email ASC;


SELECT * FROM products
ORDER BY price ASC
LIMIT 20 
OFFSET 1;

SELECT * FROM products
WHERE price >=20 AND price <=100
ORDER BY price ASC;
