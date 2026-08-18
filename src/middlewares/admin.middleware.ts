import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export function requiredAdmin(
    req: Request,
    _res: Response,
    next: NextFunction
): void {

    if (!req.user) {
        next(new AppError(401, "Authentication required!"));
        return;
    }

    const { role } = req.user;

    if (role !== "ADMIN") {
        next(new AppError(403, "Admin access required!"));
        return;
    }

    next();
}