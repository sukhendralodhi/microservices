import bcrypt from "bcryptjs";
import { MINIMUM_PASSWORD_LENGTH, SALT } from "../constants/constant";
import { AppError } from "../errors/AppError";
import { signAccessToken } from "../lib/jwt";
import { createUser, findUserByEmail, findUserByEmailWithPassword } from "../repositories/user.repository";
import { RegisterUserInput } from "../types/user";
import { validateEmail } from "../utils/validateEmail";

export async function registerUser(
    data: RegisterUserInput
): Promise<void> {

    const {
        first_name,
        last_name,
        email,
        password,
        address,
        city,
        state,
    } = data;

    if (!first_name?.trim() || !last_name?.trim()) {
        throw new AppError(
            400,
            "First name and Last name are required"
        );
    }

    if (!email?.trim() || !password) {
        throw new AppError(
            400,
            "Email and Password are required"
        );
    }

    if (password.length < MINIMUM_PASSWORD_LENGTH) {
        throw new AppError(
            400,
            "Password must be at least 6 characters long."
        );
    }

    const normalizedEmail = validateEmail(email);

    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
        throw new AppError(
            409,
            "Email already exists!"
        );
    }

    const passwordHash = await bcrypt.hash(
        password,
        SALT
    );

    await createUser({
        email: normalizedEmail,
        passwordHash,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        address: address?.trim() || null,
        city: city?.trim() || null,
        state: state?.trim() || null,
    });
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