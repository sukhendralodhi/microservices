// combine all your routes
import { Router } from "express";
import { adminRouter } from "./admin.route";
import { authRouter } from "./auth.route";
import { healthRouter } from "./health.routes";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/admin", adminRouter);