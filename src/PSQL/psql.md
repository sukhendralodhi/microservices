
```sql
CREATE TABLE products(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	price INT NOT NULL,
	stock INT DEFAULT 0,
	sku VARCHAR(10),
	description VARCHAR(100)
);

ALTER TABLE products
ADD COLUMN category VARCHAR(50);



SELECT category FROM products
WHERE category IS NULL;

```

```sql
UPDATE products SET category = 'Accessories'
WHERE sku IN ('MOU001', 'MOU002', 'KEY001', 'KEY002', 'HUB001', 'CAB001', 'CAB002');

UPDATE products SET category = 'Monitors'
WHERE sku IN ('MON001', 'MON002', 'MON003');

UPDATE products SET category = 'Audio'
WHERE sku IN ('CAM001', 'CAM002', 'SPK001', 'SPK002', 'HDP001', 'HDP002', 'EAR001', 'MIC001', 'MIC002');

UPDATE products SET category = 'Power'
WHERE sku IN ('PWB001', 'PWB002', 'CHG001', 'CHG002', 'CHG003', 'PST001', 'SUR001');

UPDATE products SET category = 'Smart Devices'
WHERE sku IN ('WAT001', 'BAN001', 'PLG001', 'BLB001');

UPDATE products SET category = 'Storage'
WHERE sku IN ('SSD001', 'SSD002', 'HDD001', 'HDD002', 'USB001', 'USB002');

UPDATE products SET category = 'Networking'
WHERE sku IN ('RTR001', 'RTR002');

UPDATE products SET category = 'Mobile'
WHERE sku IN ('PHN001', 'PHN002', 'CAS001');

UPDATE products SET category = 'Tablets'
WHERE sku IN ('TAB001', 'TAB002');

UPDATE products SET category = 'Office'
WHERE sku IN ('STA001', 'STA002', 'LMP001', 'FAN001');
```

```sql
SELECT name, category, price FROM products
WHERE category = 'Laptops';

SELECT * FROM products
WHERE price > 10000;

SELECT name, category, price FROM products
WHERE category = 'Laptops'
AND price > 1000;

-- SELECT name, category, price FROM products
-- WHERE category IN('Laptops', 'Audio');

SELECT name, category, price FROM products
WHERE category = 'Laptops' OR category = 'Audio';

SELECT name, category, price FROM products
WHERE category != 'Laptops';

SELECT name, category, price FROM products
WHERE NOT category = 'Laptops';

SELECT name, category, stock FROM products
WHERE (category = 'Laptops' OR category = 'Audio')
AND stock > 10;
```

<!-- like ilike pattern -->

1. like -> case sensitive pattern match
2. ilike -> case insebsitive pattern match
3. % -> amy no of character
exactly one char

```sql
-- the after % means anything can come

SELECT name, price FROM products
WHERE name LIKE 'Wireless%';

SELECT name, price FROM products
WHERE name ILIKE '%inch%';

SELECT name, description FROM products
WHERE name ILIKE '%gaming%'
OR description ILIKE '%hdmi%';


SELECT name, price, category FROM products
ORDER BY price ASC;

SELECT name, price, category FROM products
ORDER BY price DESC;

SELECT name, price, category
FROM products
ORDER BY category ASC, price DESC;
```


```sql

-- limit => how many rows you want to return 
-- offset => how many row we want to skip

SELECT name, price, category
FROM products
ORDER BY price ASC
LIMIT 10;

SELECT name, price, category
FROM products
ORDER BY price ASC
LIMIT 10 OFFSET 0;

SELECT name, price, category
FROM products
ORDER BY price ASC
LIMIT 10 OFFSET 10;

```


```sql

-- update single row



SELECT name, price, category
FROM products
ORDER BY price ASC
LIMIT 10;

SELECT name, price, category
FROM products
ORDER BY price ASC
LIMIT 10 OFFSET 0;

SELECT name, price, category
FROM products
ORDER BY price ASC
LIMIT 10 OFFSET 10;

```

```sql
-- updating column val
SELECT name, price, sku FROM products
WHERE sku = 'CAB002';


UPDATE products
SET price = 560,
name = 'USB-C Data Cable'
WHERE sku = 'CAB002';

-- updating multiple val
UPDATE products
SET price = ROUND(price * 1.10, 2)
WHERE category = 'Laptops';


SELECT name name, price, category
FROM products
WHERE category = 'Laptops';
```

```sql
-- <!-- delete data -->
-- first insert new data 

INSERT INTO products (name, price, stock, sku, description, category)
VALUES

('Coffee Mug', 280, 20, 'COFF0099', 
'This is coffe mug for hom coffe', 'Home Essentials');

-- then see the data inserted or not 
SELECT name name, price, category
FROM products
WHERE category = 'Home Essentials';

-- try to delete data 
DELETE FROM products
WHERE 
```

```sql
-- returning usually return back the rows imidietly after inser, update and delete
INSERT INTO products 
(name, price, stock, sku, description, category)
VALUES
(
'Webcam', 
4000, 
11, 
'WEB0099',
'Web camera for laptops and pcs',
'Electronics'
)
RETURNING id, name, price, sku, stock;

UPDATE products
SET price = 4056,
	name = 'Webcamera',
	sku = 'WEBC0099'
WHERE sku = 'WEB0099'
RETURNING name, price, sku;

DELETE FROM products
WHERE sku = 'WEBC0099'
RETURNING name, price, sku;
```

```sql
CREATE TABLE trainees(
	trainee_id SERIAL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(100),
	city VARCHAR(50),
	specialization VARCHAR(50),
	stipend DECIMAL(10,2)
);

INSERT INTO trainees
(first_name, last_name, email, city, specialization, stipend)
VALUES
('Arjun', 'Kapoor', 'arjun@gmail.com', 'Mumbai', 'Java', 18000),
('Sneha', 'Patel', 'sneha@yahoo.com', 'Ahmedabad', 'Python', 22000),
('Rohan', 'Sharma', 'rohan@gmail.com', 'Delhi', 'React', 20000),
('Kiran', 'Yadav', 'kiran@hotmail.com', 'Lucknow', 'NodeJS', 24000),
('Pooja', 'Mehta', 'pooja@gmail.com', 'Mumbai', 'React', 21000),
('Aniket', 'Joshi', 'aniket@yahoo.com', 'Pune', 'Java', 19000),
('Divya', 'Verma', 'divya@gmail.com', 'Delhi', 'Python', 25000),
('Mohit', 'Singh', 'mohit@gmail.com', 'Mumbai', 'NodeJS', 26000),
('Nisha', 'Gupta', 'nisha@yahoo.com', 'Delhi', 'React', 23000),
('Tarun', 'Mishra', 'tarun@gmail.com', 'Pune', 'Java', 17500),
('Komal', 'Soni', 'komal@gmail.com', 'Ahmedabad', 'Python', 21500),
('Deepak', 'Rathore', 'deepak@hotmail.com', 'Mumbai', 'React', 27000),
('Isha', 'Chauhan', 'isha@gmail.com', 'Delhi', 'NodeJS', 24500),
('Vivek', 'Pandey', 'vivek@yahoo.com', 'Lucknow', 'React', 20500),
('Aman', 'Tiwari', 'aman@gmail.com', 'Mumbai', 'Python', 23500);

-- Display all trainees.
SELECT * FROM trainees;

-- Show only first_name, email, and stipend.
SELECT first_name, email, stipend FROM trainees;

-- Find trainees from Mumbai.
SELECT first_name, email, stipend, city
FROM trainees
WHERE city = 'Mumbai';

-- Find trainees whose stipend is greater than ₹22,000.
SELECT first_name, email, stipend, city
FROM trainees
WHERE stipend > 22000;

-- Find trainees who are not learning React.
SELECT first_name, last_name, email, specialization 
FROM trainees
WHERE specialization != 'React';

-- Display trainees ordered by highest stipend.
SELECT first_name, email, stipend
FROM trainees
ORDER BY stipend DESC;

-- Display the lowest stipend trainee.
SELECT first_name, email, stipend
FROM trainees
ORDER BY stipend ASC;

-- Find emails ending with gmail.com.
SELECT first_name, email, stipend
FROM trainees
WHERE email LIKE '%gmail.com';

-- Find emails containing yahoo.
SELECT first_name, email, stipend
FROM trainees
WHERE email LIKE '%yahoo%';

-- Find first names starting with A.
SELECT first_name, email FROM trainees
WHERE first_name LIKE 'A%';

-- Find cities ending with i.
SELECT first_name, email, city
FROM trainees
WHERE city LIKE '%i';

-- Find names whose second letter is o.
SELECT first_name, email, city
FROM trainees
WHERE first_name LIKE '_o%';

-- Find specializations starting with P.
SELECT first_name, email, city, specialization
FROM trainees
WHERE specialization LIKE 'P%';
```