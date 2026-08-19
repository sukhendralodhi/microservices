import { pool } from "../lib/db";
import { Task, TaskFilters } from "../types/task";

type TaskRow = Task;

export async function createTask(userId: string, title: string): Promise<Task> {
    const result = await pool.query<TaskRow>(
        `
        INSERT INTO support_tasks (title, user_id)
        VALUES ($1, $2)
        RETURNING id, title, status, user_id, created_at, updated_at
        `,
        [title, userId]
    );

    return result.rows[0];
}

export async function getTask(
    userId: string,
    filters: TaskFilters
) {
    const {
        page,
        limit,
        query,
        status,
        order,
    } = filters;

    const offset = (page - 1) * limit;

    const conditions: string[] = [
        `user_id = $1`,
    ];

    const values: unknown[] = [userId];

    let paramIndex = 2;

    // Search by title
    if (query) {
        conditions.push(
            `title ILIKE $${paramIndex}`
        );

        values.push(`%${query}%`);
        paramIndex++;
    }

    // Filter by status
    if (status) {
        conditions.push(
            `status = $${paramIndex}`
        );

        values.push(status);
        paramIndex++;
    }

    const whereClause = conditions.join(" AND ");

    // Values for COUNT query
    const countValues = [...values];

    // Pagination parameters
    const limitParam = paramIndex;
    values.push(limit);
    paramIndex++;

    const offsetParam = paramIndex;
    values.push(offset);

    const sortOrder =
        order === "asc"
            ? "ASC"
            : "DESC";

    // Get tasks
    const taskResult = await pool.query<TaskRow>(
        `
        SELECT
            id,
            title,
            status,
            user_id,
            created_at,
            updated_at
        FROM support_tasks
        WHERE ${whereClause}
        ORDER BY created_at ${sortOrder}
        LIMIT $${limitParam}
        OFFSET $${offsetParam}
        `,
        values
    );

    // Get total
    const countResult = await pool.query<{ total: number }>(
        `
        SELECT COUNT(*)::int AS total
        FROM support_tasks
        WHERE ${whereClause}
        `,
        countValues
    );

    const total = countResult.rows[0].total;

    const totalPages = Math.ceil(total / limit);

    return {
        tasks: taskResult.rows,

        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
    };
}


export async function getById(userId: string, taskId: string): Promise<Task | null> {
    const result = await pool.query<TaskRow>(
        `
        SELECT id, title, status, user_id, created_at
        FROM support_tasks
        WHERE id = $1
        AND user_id = $2
        `,
        [taskId, userId]
    );
    return result.rows[0] ?? null;
}

export async function updateTaskTitle(
    taskId: string,
    userId: string,
    title: string
): Promise<Task | null> {
    const result = await pool.query<TaskRow>(
        `
        UPDATE support_tasks
        SET title = $1, updated_at = NOW()
        WHERE id = $2 AND user_id = $3
        RETURNING id, title, user_id, status, created_at, updated_at
        `,
        [title, taskId, userId]
    );

    return result.rows[0] ?? null;
}