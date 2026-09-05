import { Router } from "express";
import { AppError } from "../errors/AppError";
import { handleRagChat } from "../services/rag.service";


export const ragRouter = Router();


ragRouter.post("/", async function (req, res, next) {
    try {
        const { question } = req.body;

        if (!question) {
            throw new AppError(400, "Question is required");
        }

        // step 3 
        const answer = await handleRagChat(question);

        res.status(200).json({
            success: true,
            message: answer
        });

    } catch (error) {
        next(error);
    }
});