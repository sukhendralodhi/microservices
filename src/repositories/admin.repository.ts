import { pool } from "../lib/db";
import { DBUserRow } from "../types/user";

export async function findAllUsers(): Promise<DBUserRow[]> {
    const result = await pool.query<DBUserRow>(
        `
        SELECT id, email, role, created_at
        FROM users
        ORDER BY created_at DESC
        `
    );

    return result.rows;
}