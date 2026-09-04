// combine all your routes
import { Router } from "express";
import { adminRouter } from "./admin.route";
import { adminTaskRouter } from "./admin.task.routes";
import { aiRouter } from "./aichat.route";
import { authRouter } from "./auth.route";
import { healthRouter } from "./health.routes";
import { productRouter } from "./product.route";
import { userTaskRouter } from "./user.task.routes";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/tasks", userTaskRouter);
apiRouter.use("/admin/tasks", adminTaskRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/chat", aiRouter);