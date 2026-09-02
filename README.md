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

## API routes

All API routes begin with `/api`.

| Method | Path | Access | Description |
| --- | --- | --- | --- |
| GET | `/health` | Public | Health check |
| POST | `/auth/register` | Public | Register a user |
| POST | `/auth/login` | Public | Log in and receive a JWT |
| GET | `/auth/me` | Authenticated | Get JWT payload/user identity |
| GET | `/tasks` | Authenticated | List the current user's tasks; supports pagination, search, status, and order |
| POST | `/tasks` | Authenticated | Create a task |
| GET | `/tasks/:id` | Authenticated | Get one owned task |
| PATCH | `/tasks/:taskId` | Authenticated | Update a task title |
| PATCH | `/tasks/:taskId/status` | Authenticated | Update a task status |
| DELETE | `/tasks/:taskId` | Authenticated | Delete a task |
| GET | `/admin/users` | Admin | List users |
| DELETE | `/admin/users/:id` | Admin | Delete a user |
| GET | `/admin/tasks` | Admin | List all tasks; supports search, status, sorting |
| PATCH | `/admin/tasks/:taskId` | Admin | Update any task's status |
| GET | `/products` | Public | List products; supports `search` and `category` |
| GET | `/products/:id` | Public | Get a product and increment its view counter |
| PUT | `/products/:id` | Public | Update name, description, price, or stock |
| GET | `/products/:id/views` | Public | Get the Redis view count |

Valid task statuses are `OPEN`, `IN_PROGRESS`, and `RESOLVED`.

## Useful commands

```bash
npm run dev                       # Start with file watching
npm run build                     # Compile TypeScript to dist/
npm start                         # Run compiled application
npm run migrate                   # Apply pending SQL migrations
npm run example:redis-data-types  # Run Redis data-type example
npm run example:redis-chaching    # Run cache-aside example
```
