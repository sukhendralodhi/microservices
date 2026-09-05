import { Router } from "express";
import { AppError } from "../errors/AppError";
import { handleAiChat } from "../services/aichat.service";
import { loadDocument, splitDocuments } from "../utils/aichat/document.utils";

export const aiRouter = Router();

aiRouter.get("/", async function (req, res, next) {
    try {

        if (!req.body) {
            throw new AppError(400, "Body is required")
        }

        const { question } = req.body;

        const response = await handleAiChat(question);

        res.status(200).json({
            message: "Api working",
            success: true,
            answer: response.content
        });

    } catch (error) {
        next(error)
    }
});

aiRouter.get("/documents", async function (_req, res, next) {
    try {
        const documents = await loadDocument();
        res.json({
            success: true,
            documents,
        });
    } catch (error) {
        next(error);
    }
});

aiRouter.get("/test-chunks", async function (_req, res, next) {
    try {
        const chunks = await splitDocuments();
        res.json({
            success: true,
            totalChunks: chunks.length,
            chunks,
        });
    } catch (error) {
        next(error);
    }
});