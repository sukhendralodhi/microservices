import { TITLE_MAX_CHARACTER } from "../constants/constant";
import { AppError } from "../errors/AppError";
import { createTask, getById, getTask, updateTaskTitle } from "../repositories/user.task.repository";
import { Task, TaskFilters, TaskListResponse } from "../types/task";


function validateTitle(title: unknown): string {
    if (typeof title !== 'string' || !title.trim()) {
        throw new AppError(400, "Title is required");
    }
    const trimmedTitle = title.trim();

    if (trimmedTitle.length > TITLE_MAX_CHARACTER) {
        throw new AppError(400, "Title must be 100 characters or less.");
    }

    return trimmedTitle;
}

export async function createUserTask(title: unknown, userId: string): Promise<Task> {
    const validTitle = validateTitle(title);
    return createTask(userId, validTitle);
}

export async function getAllTask(userId: string, filters: TaskFilters): Promise<TaskListResponse> {
    return getTask(userId, filters);
}

export async function getTaskById(userId: string, taskId: string): Promise<Task | null> {
    const task = await getById(userId, taskId);
    if (!task) {
        throw new AppError(404, "Task not found")
    }
    return task;
}

export async function updateUserTask(
    taskId: string,
    userId: string,
    title: string
): Promise<Task> {
    const validTitle = validateTitle(title);
    const task = await updateTaskTitle(taskId, userId, validTitle);
    if (!task) {
        throw new AppError(404, "Task is found!");
    }
    return task;
}