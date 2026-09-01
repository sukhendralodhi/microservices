import { ALLOWED_SORT_FIELDS, VALID_STATUSES } from "../constants/constant";
import { AppError } from "../errors/AppError";
import { findAllTasks, handleUpdateTaskAdmin } from "../repositories/admin.task.repository";
import { Task } from "../types/task";

type AdminTaskListQuery = {
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

type AdminTaskListResponse = {
    tasks: Task[];
}

type TaskStatus = (typeof VALID_STATUSES)[number]
type SortField = (typeof ALLOWED_SORT_FIELDS)[number];

export async function getAdminTasks(
    query: AdminTaskListQuery
): Promise<AdminTaskListResponse> {
    const search = query.search?.trim() || undefined;
    const status = query.status?.trim().toUpperCase() || undefined;

    if (status && !VALID_STATUSES.includes(status as TaskStatus)) {
        throw new AppError(
            400,
            "status must be between OPEN, IN_PROGRESS or RESOLVED"
        );
    }

    // sorting 
    const sortBy = query.sortBy?.trim() || "created_at";
    const sortOrder = query.sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    if (!ALLOWED_SORT_FIELDS.includes(sortBy as SortField)) {
        throw new AppError(
            400,
            "Invalid sort field"
        );
    }

    const tasks = await findAllTasks({
        search,
        status,
        sortBy,
        sortOrder
    });

    return {
        tasks
    }

}

export async function handleUpdateTask(taskId: string, taskStatus: string): Promise<Task | null> {

    if (!taskId) {
        throw new AppError(400, "Task id is required");
    }

    if (!taskStatus) {
        throw new AppError(400, "Status is required");
    }

    const normalizedStatus = taskStatus.trim().toUpperCase();

    if (!VALID_STATUSES.includes(normalizedStatus as TaskStatus)) {
        throw new AppError(
            400,
            "Status must be OPEN, IN_PROGRESS or RESOLVED"
        );
    }

    const updatedTask = await handleUpdateTaskAdmin(
        taskId,
        normalizedStatus
    );

    if (!updatedTask) {
        throw new AppError(404, "Task is not found!");
    }

    return updatedTask;

}