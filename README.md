# Node.js Core Modules & Support Desk API

A learning project that combines Node.js and TypeScript fundamentals with a layered Express API. The API provides authentication, user task management, admin task management, PostgreSQL persistence, and Redis caching for products.

## What this project teaches

- Node.js core modules: `process`, `crypto`, `os`, `path`, `timers`, `fs`, `events`, `http`, `streams`, buffers, and URLs
- Asynchronous JavaScript: callbacks, promises, `async`/`await`, and external API calls with timeouts
- TypeScript fundamentals: types, interfaces, generics, unions, narrowing, and utility types
- Express APIs: routing, JSON request handling, HTTP status codes, middleware, and error handling
- PostgreSQL: tables, constraints, joins, indexes, pagination, filtering, and transactions
- Redis: strings, hashes, lists, sets, sorted sets, TTLs, cache-aside caching, invalidation, and counters
- Backend organization: routes, services, repositories, shared types, configuration, and utilities

The standalone exercises are in [`src/practice`](src/practice). PostgreSQL learning queries are in [`src/practice/PSQL/psql.md`](src/practice/PSQL/psql.md).

## Tech stack

- Node.js + TypeScript
- Express 5
- PostgreSQL with `pg`
- Redis with `redis`
- JWT authentication with `jsonwebtoken`
- Password hashing with `bcryptjs`
- Pino logging
- Docker Compose for Redis

## Project structure

```text
src/
├── app.ts                  # Express application and global middleware
├── server.ts               # Application startup and graceful shutdown
├── config/                 # Environment and Redis configuration
├── constants/              # Validation limits, statuses, cache TTLs
├── errors/                 # Application error class
├── lib/                    # PostgreSQL pool, JWT helpers, logger
├── middlewares/            # Authentication, admin guard, errors, 404s
├── repositories/           # SQL/data-access layer
├── routes/                 # HTTP endpoints
├── services/               # Business rules and validation
├── types/                  # Shared TypeScript types
├── utils/                  # Reusable helpers
└── scripts/migrate.ts      # Custom SQL migration runner

migrations/                 # PostgreSQL schema migrations
examples/                   # Redis demonstrations
```

## Architecture

Requests follow this flow:

```text
Client → Route → Middleware → Service → Repository → PostgreSQL / Redis
```

- **Routes** receive HTTP requests and return responses.
- **Middleware** authenticates JWTs, restricts admin-only actions, handles errors, and returns 404s.
- **Services** validate inputs and apply business logic.
- **Repositories** execute parameterized PostgreSQL queries.

## Authentication and authorization

Users register with an email and password. Passwords are hashed with `bcryptjs`; plaintext passwords are never stored. On login, the API returns a signed JWT access token.

Protected endpoints require this header:

```http
Authorization: Bearer <access-token>
```

The `authenticate` middleware verifies the JWT and places its payload (`userId`, `email`, and `role`) on `req.user`. The `requiredAdmin` middleware permits only users whose role is `ADMIN`.

## Database

PostgreSQL migrations create these main tables:

| Table | Purpose |
| --- | --- |
| `users` | User credentials, role, and profile fields |
| `support_tasks` | Tasks owned by users; task records are deleted when their owner is deleted |
| `products` | Product catalog used by the cached product endpoints |
| `banners` | Banner image metadata |
| `migrations` | Tracks migrations already executed |

The migration runner executes SQL files in sorted filename order and records each successful migration in the `migrations` table.

## Redis caching

Redis is used for product endpoints:

- Product lists use cache-aside keys based on search and category filters.
- Individual products use `product:<id>` keys.
- Cached product data expires after 60 seconds.
- Updating a product invalidates its individual product cache.
- Product views are counted with `product:<id>:views`.

The Redis examples can be run separately to learn data structures and cache invalidation.

## Setup

### Prerequisites

- Node.js 20 or later
- PostgreSQL with a database created for this project
- Redis, either local or through Docker

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=4000
NODE_ENV=development
LOG_LEVEL=info
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/support_desk
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1h
JWT_TOKEN_MAX_AGE=3600000
REDIS_URL=redis://localhost:6379
```

Do not commit real credentials or JWT secrets.

### 3. Start Redis

```bash
docker compose up -d redis
```

### 4. Run migrations

```bash
npm run migrate
```

### 5. Start the API

```bash
npm run dev
```

The API runs at `http://localhost:4000` by default.

## API functionality

All API routes begin with `/api`. Successful responses use a consistent envelope containing `success`, `message`, and, when applicable, `data`. Expected validation and authorization errors are returned through the central error handler with the appropriate HTTP status code.

### Health

| Method | Path | What it does |
| --- | --- | --- |
| GET | `/health` | Confirms that the Express API is responding. |

### Authentication

| Method | Path | What it does |
| --- | --- | --- |
| POST | `/auth/register` | Validates the user's email and password, checks for an existing account, hashes the password with bcrypt, and creates a `USER` account. |
| POST | `/auth/login` | Verifies email/password credentials and returns a signed JWT access token. |
| GET | `/auth/me` | Verifies the bearer token and returns the authenticated token payload (`userId`, `email`, and `role`). |

Register request:

```json
{
  "first_name": "Asha",
  "last_name": "Sharma",
  "email": "asha@example.com",
  "password": "secure-password",
  "address": "Optional address",
  "city": "Bhopal",
  "state": "Madhya Pradesh"
}
```

Login request:

```json
{
  "email": "asha@example.com",
  "password": "secure-password"
}
```

The registration flow normalizes and validates email addresses, requires first and last names, and enforces a minimum password length of six characters.

### User task management

Every task endpoint requires a bearer token. A user can access or change only tasks whose `user_id` matches the authenticated JWT user ID; this ownership rule is enforced in the database queries.

| Method | Path | What it does |
| --- | --- | --- |
| POST | `/tasks` | Creates a task for the authenticated user. The title is trimmed, required, and limited to 100 characters. |
| GET | `/tasks` | Returns the current user's paginated task list and pagination metadata. |
| GET | `/tasks/:id` | Returns one task only when the authenticated user owns it. Validates the UUID. |
| PATCH | `/tasks/:taskId` | Updates the title of an owned task. |
| PATCH | `/tasks/:taskId/status` | Changes the status of an owned task. |
| DELETE | `/tasks/:taskId` | Deletes an owned task and returns the deleted record. |

Create or update a task:

```json
{
  "title": "Investigate customer login issue"
}
```

Update a task status:

```json
{
  "status": "IN_PROGRESS"
}
```

`GET /tasks` supports these query parameters:

| Parameter | Example | Function |
| --- | --- | --- |
| `page` | `?page=2` | Requested page; defaults to `1`. |
| `limit` | `?limit=20` | Results per page; defaults to `10` and is capped at `100`. |
| `query` | `?query=login` | Case-insensitive title search. |
| `status` | `?status=OPEN` | Filter by task status. |
| `order` | `?order=asc` | Sort by creation time in ascending or descending order. |

Valid task statuses are `OPEN`, `IN_PROGRESS`, and `RESOLVED`.

### Admin operations

Admin routes require both a valid bearer token and the `ADMIN` role. This demonstrates role-based access control separately from ordinary authentication.

| Method | Path | What it does |
| --- | --- | --- |
| GET | `/admin/users` | Lists all users, newest first. |
| DELETE | `/admin/users/:id` | Deletes a user. PostgreSQL cascades the deletion to that user's tasks. |
| GET | `/admin/tasks` | Lists tasks from every user, with server-side searching, filtering, and sorting. |
| PATCH | `/admin/tasks/:taskId` | Changes the status of any task, regardless of task owner. |

`GET /admin/tasks` accepts `search`, `status`, `sortBy`, and `sortOrder`. Allowed sort fields are `title`, `status`, `created_at`, and `updated_at`; `sortOrder` defaults to descending. Admin task status updates use the same three valid statuses as user tasks.

### Product catalog and caching

The product routes are public in the current implementation. They demonstrate PostgreSQL filtering and updates alongside Redis cache-aside behavior.

| Method | Path | What it does |
| --- | --- | --- |
| GET | `/products` | Lists products, optionally filtered by name and category. The filtered result is cached in Redis for 60 seconds. |
| GET | `/products/:id` | Validates the UUID, reads a product from Redis when available, otherwise loads it from PostgreSQL and caches it. A database-loaded product also increments its Redis view counter. |
| PUT | `/products/:id` | Updates one or more mutable product fields in PostgreSQL and invalidates that product's Redis cache key. |
| GET | `/products/:id/views` | Returns the current Redis view-counter value, or `0` when no view key exists. |

`GET /products` query parameters:

| Parameter | Example | Function |
| --- | --- | --- |
| `search` | `?search=keyboard` | Case-insensitive product-name search. |
| `category` | `?category=Electronics` | Exact category filter. |

Product update request (send at least one field):

```json
{
  "name": "Mechanical Keyboard",
  "description": "Hot-swappable mechanical keyboard",
  "price": 4999,
  "stock": 25
}
```

### Route summary

| Area | Endpoints | Main concepts demonstrated |
| --- | --- | --- |
| Health | 1 | Health checks and JSON responses |
| Authentication | 3 | Password hashing, JWTs, protected routes |
| User tasks | 6 | CRUD, authorization by resource ownership, validation, pagination |
| Admin | 4 | Role-based access control, global task management, deletion cascades |
| Products | 4 | Filtering, partial updates, Redis cache-aside pattern, cache invalidation, counters |

## Useful commands

```bash
npm run dev                       # Start with file watching
npm run build                     # Compile TypeScript to dist/
npm start                         # Run compiled application
npm run migrate                   # Apply pending SQL migrations
npm run example:redis-data-types  # Run Redis data-type example
npm run example:redis-chaching    # Run cache-aside example
```
