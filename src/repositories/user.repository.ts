import { pool } from "../lib/db";
import { CreateUserInput, DBUserRow, DBUserRowWithPasswordRow, User } from "../types/user";

// find user by email 
export async function findUserByEmail(email: string): Promise<User | null> {
    const result = await pool.query<DBUserRow>(
        "SELECT id, email, role, created_at FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0] ?? null;
}

// create user in db
export async function createUser(
    data: CreateUserInput
): Promise<DBUserRow> {

    const result = await pool.query<DBUserRow>(
        `
        INSERT INTO users (
            email,
            password_hash,
            first_name,
            last_name,
            address,
            city,
            state
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING
            id,
            email,
            role,
            first_name,
            last_name,
            address,
            city,
            state,
            created_at
        `,
        [
            data.email,
            data.passwordHash,
            data.first_name,
            data.last_name,
            data.address,
            data.city,
            data.state,
        ]
    );

    return result.rows[0];
}
export async function findUserByEmailWithPassword(email: string): Promise<DBUserRowWithPasswordRow | null> {
    const result = await pool.query<DBUserRowWithPasswordRow>(
        `
        SELECT id, email, role, password_hash, created_at FROM users
        WHERE email = $1
        `,
        [email]
    );
    return result.rows[0] ?? null;
}

