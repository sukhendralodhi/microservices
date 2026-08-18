import { findAllUsers } from "../repositories/admin.repository";
import { DBUserRow } from "../types/user";

export async function getAllUsers(): Promise<DBUserRow[]> {
    return findAllUsers();
}