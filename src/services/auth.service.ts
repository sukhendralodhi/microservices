import bcrypt from "bcryptjs";
import { MINIMUM_PASSWORD_LENGTH, SALT } from "../constants/constant";
import { AppError } from "../errors/AppError";
import { createUser, findUserByEmail } from "../repositories/user.repository";

export async function registerUser(email: string, password: string): Promise<void> {
    if (!email || !password) {
        throw new AppError(400, "Email and Password are required");
    }

    if (password.length < MINIMUM_PASSWORD_LENGTH) {
        throw new AppError(400, "Password must be at least 6 characters long.");
    }

    const normalizeEmail = email.toLowerCase().trim();

    const existingUser = await findUserByEmail(normalizeEmail);

    if (existingUser) {
        throw new AppError(409, "Email already exist!");
    }

    const passwordHash = await bcrypt.hash(password, SALT);

    await createUser(normalizeEmail, passwordHash);

}