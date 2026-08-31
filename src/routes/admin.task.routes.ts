import { Router } from "express";
import { requiredAdmin } from "../middlewares/admin.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { getAdminTasks } from "../services/admin.task.service";


export const adminTaskRouter = Router();

adminTaskRouter.use(authenticate, requiredAdmin);

adminTaskRouter.get("/", async function (req, res, next) {
    try {
        const data = await getAdminTasks(req.query);
        res.status(200).json({
            message: "All the task fetched!",
            success: true,
            data: data
        });
    } catch (error) {
        next(error)
    }
});