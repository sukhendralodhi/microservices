import { Router } from "express";
import { AppError } from "../errors/AppError";
import { authenticate } from "../middlewares/auth.middleware";
import { createUserTask } from "../services/user.task.service";

export const userTaskRouter = Router();

userTaskRouter.use(authenticate);

userTaskRouter.post("/", async (req, res, next) => {
    try {
        const { title } = req.body;
        //  console.log(title, status);
        // console.log(req?.user?.userId)

        if (!req.user) {
            throw new AppError(401, "Authentication required");
        }

        // const userId = req.user!.userId
        const userId = req.user.userId

        const task = await createUserTask(title, userId);

        res.status(201).json({
            success: true,
            message: "Task created successfully!",
            data: task,
        });

    } catch (error) {
        next(error)
    }
});