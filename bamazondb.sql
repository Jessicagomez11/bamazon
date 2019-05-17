DROP DATABASE IF EXISTS bamazondb;

CREATE DATABASE bamazondb;

USE bamazondb;

CREATE TABLE products(
item_id INTEGER(10) auto_increment Not null,
product_name VARCHAR(50),
department_name VARCHAR(50),
price INTEGER(10),
stock_quantity INTEGER(10),
primary key(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity )
VALUES('beanie baby','misc',10,14),('phone wig','misc',18,20),('doggie Sweatshirt','tops',36,15),('sailor pants','bottoms', 231, 10),
();

SELECT * FROM products;


