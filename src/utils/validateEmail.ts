import { AppError } from "../errors/AppError";

export function validateEmail(email: string): string {

    const normalizedEmail = email.toLowerCase().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
        throw new AppError(400, "Please provide a valid email address");
    }

    return normalizedEmail;
}