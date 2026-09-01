// entry file for express 
// express related logic 
import cookieParser from "cookie-parser";
import cors from 'cors';
import express from "express";
import redisClient from "./config/redis";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import { apiRouter } from './routes';

export function createApp() {
    const app = express();

    redisClient.connect();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use("/api", apiRouter);

    app.use(errorHandler);
    app.use(notFound);

    return app;
}