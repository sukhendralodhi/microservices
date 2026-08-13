
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

SELECT SUM(stipend) AS total_stipend
FROM trainees;

SELECT ROUND(AVG(stipend), 2) AS avg_stipend
FROM trainees;

SELECT MAX(stipend) AS highest_stipend FROM trainees;

SELECT MIN(stipend) AS highest_stipend FROM trainees;

SELECT COUNT(trainee_id) AS total_trainees 
FROM trainees;
```

```sql

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'PostgresSQL joins Explanation', 'published', 100
FROM users
WHERE name = 'Mohan Sharma';

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'Indexes for beginers', 'draft', 40
FROM users
WHERE name = 'Mohan Sharma';



SELECT * FROM users;

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'React js for beginers', 'published', 50
FROM users
WHERE name = 'Deepak Gupta';



INSERT INTO comments (post_id, body)
SELECT id , 'good blog for starting journey with react js'
FROM posts
WHERE title = 'React js for beginers';

SELECT * FROM comments;

INSERT INTO tags (name)
VALUES ('sql'),
('backend');

INSERT INTO tags (name)
VALUES ('frontend');

SELECT * FROM tags;


SELECT * FROM posts;

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'React js for beginers' 
AND t.name = 'frontend';

SELECT * FROM post_tags;
```


```sql

-- foreign key is a column that points to the primary key of another table
-- user.id => primary key in user table
-- posts.user_id => foreign key in posts table 


-- one to many relationship 
-- one parent rows can have many child rows

-- users => is your parent table
-- posts => is your child table
SELECT * FROM posts;

SELECT
	users.name AS user_name,
	posts.title AS post_title,
	posts.status
FROM users
INNER JOIN posts
ON users.id = posts.user_id
ORDER BY users.name, posts.title;

```

```sql
-- inner join returns only the matching rows from both tables
SELECT 
	users.name AS author_name,
	posts.title AS post_title,
	posts.status,
	posts.views
FROM posts
INNER JOIN users
-- matching rules 
	ON posts.user_id = users.id
WHERE posts.status = 'published'
ORDER BY posts.views DESC;

SELECT * FROM employees;

INSERT INTO employees (name)
VALUES ('Sanju'), ('Mohan'), ('Gopal');
SELECT * FROM employees;

CREATE TABLE employees (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50)
);

CREATE TABLE departments(
	department_id SERIAL PRIMARY KEY,
	employee_id INT NOT NULL REFERENCES employees(id),
	department VARCHAR(100) NOT NULL
);

INSERT INTO departments (employee_id, department)
VALUES
    (1, 'IT'),
    (2, 'HR'),
    (3, 'Finance');

SELECT * FROM departments;
```

```sql
-- A LEFT JOIN returns all rows from the left table, plus matching rows from the right table. If there is no match, PostgreSQL puts NULL for the right-table columns.

-- left join keeps all the rowsfrom the left table
-- if the right table has matching data then postgresSQL going to include that
-- if dont have any matching data it returns null 
-- post table = left table
-- comments table = right table

-- because not every posts is going have comments
-- some posts will have 100 comments and some will have 0


SELECT 
	c.name,
	o.product
FROM customers AS c
LEFT JOIN orders AS o
ON c.customer_id = o.customer_id;

SELECT c.name, o.product
FROM customers c
INNER JOIN orders o
    ON c.customer_id = o.customer_id;

	SELECT c.name
FROM customers c
LEFT JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;
```

```sql
-- many to many relationships 

SELECT
    s.name AS student,
    c.name AS course
FROM students AS s
INNER JOIN student_courses AS sc
    ON s.id = sc.student_id
INNER JOIN courses AS c
    ON c.id = sc.course_id;

	SELECT * FROM tags;
SELECT * FROM posts;


SELECT 
	posts.title AS post_title,
	tags.name AS tag_name
FROM posts
INNER JOIN post_tags
	ON posts.id = post_tags.post_id
INNER JOIN tags
	ON post_tags.tag_id = 
```

## Yes bro. In PostgreSQL, aliases are temporary names you give to tables or columns to make SQL queries shorter and easier to read.

```sql
SELECT
	COUNT(*) AS total_posts,
	COUNT(*) FILTER (WHERE status = 'published') AS published_posts,
	SUM(views) AS total_views,
	AVG(views) AS avg_views
FROM posts;
```

- group by create group of rows
- WHERE = filters normal rows before grouping
- HAVING = filters groups after grouping

```sql

SELECT 
	u.name AS author_name,
	COUNT(p.id) AS total_posts,
	SUM(p.views) AS total_views
FROM users AS u
LEFT JOIN posts AS p
	ON u.id = p.user_id
GROUP BY u.id, u.name
HAVING COUNT(p.id) >= 2
ORDER BY total_posts DESC;
```

## DISTINCT
- count unique values
- count how many uniques posts are connected to each tag


```sql
SELECT * FROM trainees;

SELECT MAX(stipend)
FROM trainees;

SELECT *
FROM trainees
WHERE stipend = (
	SELECT MAX(stipend)
	FROM trainees
);

SELECT AVG(stipend)
FROM trainees;

SELECT *
FROM trainees
WHERE stipend > (
    SELECT AVG(stipend)
    FROM trainees
);

SELECT * FROM users
WHERE id IN (
	SELECT user_id FROM posts
);

SELECT user_id FROM posts;


SELECT * FROM users
WHERE id NOT IN (
	SELECT user_id FROM posts
);

SELECT
    user_id,
    COUNT(*) AS total_posts
FROM posts
GROUP BY user_id;

```
```sql
SELECT 
	title, status, views
FROM posts
WHERE views > (SELECT AVG(views) FROM posts)
ORDER BY views DESC;
```

## indexing
index = help psql find rows faster
SELECT - speed it up this perticular process

```sql
SELECT 
	id,
	title,
	status,
	views,
	user_id
FROM posts;

-- /posts?status=published

SELECT
	id,
	title,
	status,
	views
FROM posts
WHERE status = 'published';

-- idx_posts_status
-- idx - index
-- posts - table name
-- status - column name

CREATE INDEX IF NOT EXISTS idx_posts_status
ON posts(status);

SELECT
	title,
	status,
	views
FROM posts
WHERE status = 'published'
ORDER BY views DESC;


-- composite index 
CREATE INDEX IF NOT 
EXISTS idx_posts_status_views
ON posts(status, views DESC);

-- /users/:id/posts

SELECT title, status, views
FROM posts
WHERE user_id = (
	SELECT id FROM users
	WHERE name = 'rahul'
)

-- creting index for this
CREATE INDEX IF NOT EXISTS
idx_posts_user_id
ON posts(user_id);

```

## What is an Index?
An index is a database data structure that helps PostgreSQL find rows faster without scanning the entire table.

GOOD FOR
=
>
>=
<
<=
BETWEEN
ORDER BY

```sql

CREATE TABLE employees(
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	department TEXT NOT NULL,
	salary INTEGER NOT NULL,
	city TEXT NOT NULL
);

INSERT INTO employees (
	name, department, salary, city
)
VALUES
('Mohan Sharma', 'IT', 60000, 'Bhopal'),
    ('Rahul Singh', 'HR', 45000, 'Delhi'),
    ('Sukhendra Lodhi', 'IT', 75000, 'Bhopal'),
    ('Amit Verma', 'Finance', 55000, 'Indore'),
    ('Priya Sharma', 'IT', 80000, 'Delhi'),
    ('Neha Gupta', 'HR', 50000, 'Bhopal'),
    ('Ravi Kumar', 'Finance', 65000, 'Delhi'),
    ('Ankit Jain', 'IT', 70000, 'Indore');

	SELECT * FROM employees


	INSERT INTO employees (name, department, salary, city)
SELECT
    'Employee ' || generate_series,
    CASE
        WHEN generate_series % 3 = 0 THEN 'IT'
        WHEN generate_series % 3 = 1 THEN 'HR'
        ELSE 'Finance'
    END,
    30000 + (generate_series % 70000),
    CASE
        WHEN generate_series % 3 = 0 THEN 'Bhopal'
        WHEN generate_series % 3 = 1 THEN 'Delhi'
        ELSE 'Indore'
    END
FROM generate_series(1, 100000);

CREATE INDEX IF NOT EXISTS
idx_employees_city
ON employees(city);

EXPLAIN
SELECT * FROM employees
WHERE city = 'Bhopal';


SELECT *
FROM employees
WHERE department = 'IT';

CREATE INDEX IF NOT EXISTS
idx_employees_department
ON employees(department);

EXPLAIN ANALYZE
SELECT *
FROM employees
WHERE department = 'IT';

EXPLAIN ANALYZE
SELECT *
FROM employees
WHERE name = 'Employee 50000';

CREATE INDEX IF NOT EXISTS idx_employees_name
ON employees(name);
```
1. Create table
       ↓
2. Insert data
       ↓
3. Write query
       ↓
4. EXPLAIN query
       ↓
5. See Seq Scan
       ↓
6. Create index
       ↓
7. EXPLAIN again
       ↓
8. Compare query plans