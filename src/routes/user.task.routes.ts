import { Router } from "express";
import { validate as isUUID } from "uuid";
import { AppError } from "../errors/AppError";
import { authenticate } from "../middlewares/auth.middleware";
import { createUserTask, getAllTask, getTaskById } from "../services/user.task.service";

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

userTaskRouter.get("/", async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError(401, "Authentication required");
        }

        // const userId = req.user!.userId
        const userId = req.user.userId;
        const tasks = await getAllTask(userId);

        res.status(200).json({
            success: true,
            message: "All tasks fetched successfully!",
            data: tasks
        });
    } catch (error) {
        next(error)
    }
});

userTaskRouter.get("/:id", async (req, res, next) => {
    try {
        const taskId = req.params.id;

        if (!req.user) {
            throw new AppError(401, "Authentication required");
        }

        // that will validate if task id is not valid UUID
        if (!isUUID(taskId)) {
            throw new AppError(400, "Invalid task ID");
        }
        // const userId = req.user!.userId
        const userId = req.user.userId;

        const task = await getTaskById(userId, taskId);

        res.status(200).json({
            success: true,
            message: "Task fetched successfully!",
            data: task
        });

    } catch (error) {
        next(error)
    }
});