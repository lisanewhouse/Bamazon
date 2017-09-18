DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  item_id int(11) NOT NULL AUTO_INCREMENT,
  product_name varchar(100) NOT NULL,
  department_name varchar(50) DEFAULT NULL,
  price decimal(8,2) NOT NULL,
  stock_quantity int(8) DEFAULT NULL,
  PRIMARY KEY (item_id)
) 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 	("Leg Lamp", "Seasonal", 300.00, 12),
		("Floral Dress", "Clothing", 34.90, 138),
		("Scientific Calculator", "Electronics", 120.00, 52),
		("Coffee Beans", "Grocery", 12.90, 584),
		("Saga", "Books", 33.96, 598),
		("Tire Gauge", "Automotive", 4.55, 1274),
		("Leather Reclining Couch", "Home", 365.50, 3),
		("Super Mario Odyssey", "Entertainment", 59.99, 497),
		("Toothpaste(2pk)", "Health/Beauty", 4.96, 74),
		("Slinky", "Toys/Kids", 3.85, 631)	
			
SELECT * FROM products 

