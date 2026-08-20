import { AppError } from "../errors/AppError";
import { findAllUsers, userDelete } from "../repositories/admin.repository";
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