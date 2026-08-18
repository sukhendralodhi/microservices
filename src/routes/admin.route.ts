import { Router } from "express";
import { requiredAdmin } from "../middlewares/admin.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { getAllUsers } from "../services/admin.service";


export const adminRouter = Router()

adminRouter.get("/users", authenticate, requiredAdmin, async (_req, res, next) => {
    try {
        const users = await getAllUsers();

        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: users
        });
    } catch (error) {
        next(error)
    }
});