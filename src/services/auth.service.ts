import bcrypt from "bcryptjs";
import { MINIMUM_PASSWORD_LENGTH, SALT } from "../constants/constant";
import { AppError } from "../errors/AppError";
import { signAccessToken } from "../lib/jwt";
import { createUser, findUserByEmail, findUserByEmailWithPassword } from "../repositories/user.repository";

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

export async function loginUser(email: string, password: string): Promise<{ accessToken: string }> {

    if (!email || !password) {
        throw new AppError(400, "Email and Password are required");
    }

    const normalizeEmail = email.toLowerCase().trim();

    const user = await findUserByEmailWithPassword(normalizeEmail);

    if (!user?.password_hash) {
        throw new AppError(401, "Invalid email or password!");
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
        throw new AppError(401, "Invalid email or password!");
    }

    const accessToken = signAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role
    });

    return { accessToken };

}