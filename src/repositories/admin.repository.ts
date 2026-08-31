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

// export async function getAllTaskOfAllUsers(): Promise<AdminTaskRow[]> {
//     const result = await pool.query<AdminTaskRow>(
//         `
//         SELECT
//             t.id,
//             t.title,
//             t.status,
//             t.user_id,
//             u.first_name,
//             u.last_name,
//             u.email AS user_email,
//             u.role AS user_role,
//             u.address,
//             u.city,
//             u.state,
//             t.created_at,
//             t.updated_at
//             FROM support_tasks AS t
//             JOIN users AS u ON u.id = t.user_id
//             ORDER BY t.created_at DESC;
//         `
//     );
//     return result.rows;
// }