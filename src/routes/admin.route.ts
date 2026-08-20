import { Request, Router } from "express";
import { AppError } from "../errors/AppError";
import { requiredAdmin } from "../middlewares/admin.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { deleteUser, getAllUsers } from "../services/admin.service";


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

adminRouter.delete("/users/:id", authenticate, requiredAdmin, async (req: Request<{ id: string }>, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new AppError(400, "User id required")
        }
        const user = await deleteUser(id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: user,
        });
    } catch (error) {
        next(error)
    }
});