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


CREATE TABLE purchases (
id  TEXT PRIMARY KEY UNIQUE NOT NULL,
total_price REAL UNIQUE NOT NULL,
paid INTEGER NOT NULL,
delivered_at TEXT,
buyer_id TEXT UNIQUE NOT NULL,
FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO purchases (id,total_price,paid,delivered_at,buyer_id)
VALUES
("pu01","56", "1", "NULL","23"),
("pu02","65", "0", "NULL","24"),
("pu03","67", "1", "NULL","25"),
("pu04","23", "0", "NULL","26");

DROP TABLE purchases;
SELECT * FROM purchases;
UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = "pu04";

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_ID = users.id
WHERE users.id = "24";

CREATE TABLE purchases_products (
	purchase_id TEXT NOT NULL,
	product_id TEXT NOT NULL, 
    quantity INTEGER NOT NULL,
	FOREIGN KEY (purchase_id) REFERENCES purchases(id),
	FOREIGN KEY (product_id) REFERENCES products(id)
);

DROP TABLE  purchases_products;
SELECT * FROM  purchases_products;

INSERT INTO purchases_products (purchase_id,product_id, quantity)
VALUES
	("pu01","25","2"),
	("pu03","27","4"), 
	("pu02", "28","7");

    SELECT *
     FROM purchases_products
    INNER JOIN purchases
    ON purchases_products.purchase_id = purchases.id
     INNER JOIN products
    ON purchases_products.product_id = products.id;