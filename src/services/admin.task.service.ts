import { VALID_STATUSES } from "../constants/constant";
import { AppError } from "../errors/AppError";
import { findAllTasks } from "../repositories/admin.task.repository";
import { Task } from "../types/task";

type AdminTaskListQuery = {
    search?: string;
    status?: string;
}

type AdminTaskListResponse = {
    tasks: Task[];
}

type TaskStatus = (typeof VALID_STATUSES)[number]

export async function getAdminTasks(
    query: AdminTaskListQuery
): Promise<AdminTaskListResponse> {
    const search = query.search?.trim() || undefined;
    const status = query.search?.trim() || undefined;

    if (status && VALID_STATUSES.includes(status as TaskStatus)) {
        throw new AppError(400, "status must be between open, inprogress or resolved");
    }

    const tasks = await findAllTasks({
        search,
        status
    });

    return {
        tasks
    }

}