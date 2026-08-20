import { pool } from "../lib/db";
import { DBUserRow } from "../types/user";

export async function findAllUsers(): Promise<DBUserRow[] | null> {
    const result = await pool.query<DBUserRow>(
        `
        SELECT id, email, role, created_at
        FROM users
        ORDER BY created_at DESC
        `
    );

    return result.rows ?? null;
}

export async function userDelete(id: string): Promise<DBUserRow | null> {
    const result = await pool.query<DBUserRow>(
        `
        DELETE FROM users
        WHERE id = $1
        RETURNING id, email, role, created_at
        `,
        [id]
    );
    return result.rows[0] ?? null;
}