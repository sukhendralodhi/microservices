import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../errors/AppError";
import { TokenPayload } from "../types/user";

export function signAccessToken(payload: TokenPayload): string {
    const options: SignOptions = {
        expiresIn: env.jwtExpiresIn as SignOptions['expiresIn']
    }

    return jwt.sign(payload, env.jwtSecret, options);
}

export function verifyAccessToken(token: string): TokenPayload {
    try {
        const decoded = jwt.verify(token, env.jwtSecret);

        if (typeof decoded === "string") {
            throw new AppError(401, "Invalid access token!");
        }

        return decoded as TokenPayload;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        if (error instanceof jwt.TokenExpiredError) {
            throw new AppError(401, "Access token expired!");
        }

        if (error instanceof jwt.JsonWebTokenError) {
            throw new AppError(401, "Invalid access token!");
        }

        throw error;
    }
}