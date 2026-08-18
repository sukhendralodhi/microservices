import { TITLE_MAX_CHARACTER } from "../constants/constant";
import { AppError } from "../errors/AppError";
import { createTask } from "../repositories/user.task.repository";
import { Task } from "../types/task";


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