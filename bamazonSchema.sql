/* Build Bamazon schema */
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER NOT NULL UNIQUE,
    product_name VARCHAR(50) Not NULL,
    department_name VARCHAR(50) NOT NULL,
    price DEC(12,2) NOT NULL,
    stock_quantity INTEGER NOT NULL, 
    PRIMARY KEY (item_id)
);


-- USE bamazon;


/* insert into products (item_id, product_name, department_name, price, stock_quantity)
values (1, 'Trek Mountain Bike 550', 'recreation', 539.99, 20);
*/

