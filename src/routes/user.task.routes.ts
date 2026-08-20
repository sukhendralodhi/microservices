import { Router } from "express";
import { validate as isUUID } from "uuid";
import { AppError } from "../errors/AppError";
import { authenticate } from "../middlewares/auth.middleware";
import { createUserTask, deleteUserTask, getAllTask, getTaskById, updateTaskStatus, updateUserTask } from "../services/user.task.service";
import { TaskStatus } from "../types/task";

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

        const page = Math.max(
            Number(req.query.page) || 1, 1
        );

        const limit = Math.min(
            Math.max(Number(req.query.limit) || 10, 1), 100
        );

        const query = typeof req.query.query === "string" ? req.query.query.trim() : undefined;

        const status = typeof req.query.status === "string" ? req.query.status as TaskStatus : undefined;

        const order =
            req.query.order === "asc"
                ? "asc"
                : "desc";

        const tasks = await getAllTask(userId, {
            page,
            limit,
            query,
            status,
            sortBy: "created_at",
            order,
        });

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

userTaskRouter.patch("/:taskId", async (req, res, next) => {
    try {

        const { taskId } = req.params;

        if (!isUUID(taskId)) {
            throw new AppError(400, "Invalid task ID");
        }

        if (!req.user) {
            throw new AppError(401, "Authentication required");
        }

        const { title } = req.body;

        if (typeof title !== "string" || !title.trim()) {
            throw new AppError(400, "Title is required");
        }

        const task = await updateUserTask(
            taskId,
            req.user.userId,
            title
        );

        res.status(200).json({
            success: true,
            message: "Task Updated successfully!",
            data: task
        });
    } catch (error) {
        next(error)
    }
});

// update status 
userTaskRouter.patch("/:taskId/status", async (req, res, next) => {
    try {
        const taskId = req.params.taskId;
        const status = req.body.status;

        if (!status) {
            throw new AppError(400, "Status required");
        }

        if (!isUUID(taskId)) {
            throw new AppError(400, "Invalid task ID");
        }
        if (!req.user) {
            throw new AppError(401, "Authentication required");
        }

        const updatedTask = await updateTaskStatus(
            status, taskId, req.user.userId
        );

        res.status(200).json({
            success: true,
            message: "Status updated successfully!",
            data: updatedTask
        });
    } catch (error) {
        next(error);
    }

});

userTaskRouter.delete("/:taskId", async (req, res, next) => {
    try {
        const taskId = req.params.taskId;

        if (!isUUID(taskId)) {
            throw new AppError(400, "Invalid task ID");
        }

        if (!req.user) {
            throw new AppError(401, "Authentication required");
        }

        const task = await deleteUserTask(taskId, req.user.userId);

        res.status(200).json({
            success: true,
            message: "Task deleted successfully!",
            data: task
        });

    } catch (error) {
        next(error);
    }
});