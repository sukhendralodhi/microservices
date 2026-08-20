import { AppError } from "../errors/AppError";
import { findAllUsers, getAllTaskOfAllUsers, userDelete } from "../repositories/admin.repository";
import { AdminTask } from "../types/admin";
import { DBUserRow } from "../types/user";

export async function getAllUsers(): Promise<DBUserRow[]> {
    const users = await findAllUsers();
    if (!users) {
        throw new AppError(400, "There are no users");
    }
    return users;
}

export async function deleteUser(id: string): Promise<DBUserRow> {
    const user = await userDelete(id);
    if (!user) {
        throw new AppError(400, "User not found");
    }
    return user;
}

// get all the users task 
export async function getAllUserTasks(): Promise<AdminTask[]> {
    const tasks = await getAllTaskOfAllUsers();

    return tasks.map((task) => ({
        id: task.id,
        title: task.title,
        status: task.status,
        user_id: task.user_id,
        created_at: task.created_at,
        updated_at: task.updated_at,

        user: {
            first_name: task.first_name,
            last_name: task.last_name,
            email: task.user_email,
            role: task.user_role,
            address: task.address,
            city: task.city,
            state: task.state,
        },
    }));
}