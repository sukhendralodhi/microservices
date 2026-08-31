import { pool } from "../lib/db";
import { Task } from "../types/task";

type AdminTaskListFilters = {
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
}

type TaskRow = Task;

export async function findAllTasks(
    filters: AdminTaskListFilters
): Promise<Task[]> {
    const conditions: string[] = [];
    const values: unknown[] = [];

    let paramIndex = 1;

    if (filters.search) {
        conditions.push(`title ILIKE $${paramIndex}`);
        values.push(`%${filters.search}%`);
        paramIndex++;
    }

    if (filters.status) {
        conditions.push(`status = $${paramIndex}`);
        values.push(filters.status.toUpperCase());
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // default soring 
    const sortBy = filters.sortBy || "created_at";
    const orderBy = filters.sortOrder || "DESC";

    const result = await pool.query<TaskRow>(
        `
        SELECT id, title, status, user_id, created_at, updated_at
        FROM support_tasks
        ${whereClause}
        ORDER BY ${sortBy} ${orderBy}
        `,
        values
    );

    return result.rows;
}