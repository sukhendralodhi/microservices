
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