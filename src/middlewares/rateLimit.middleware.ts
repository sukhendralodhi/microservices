import { NextFunction, Request, Response } from "express";
import redisClient from "../config/redis";
import { RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS } from "../constants/constant";


export async function productRateLimiter(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const ip = req.ip || "unknown";

        const rateLimiterKey = `rate_limit:products:${ip}`;

        const requestCount = await redisClient.incr(rateLimiterKey);

        // Start the 30-second window
        // when the first request is received.
        if (requestCount === 1) {
            await redisClient.expire(
                rateLimiterKey,
                RATE_LIMIT_WINDOW_MS
            );
        }

        res.setHeader(
            "X-RateLimit-Limit",
            RATE_LIMIT_MAX_REQUESTS
        );

        res.setHeader(
            "X-RateLimit-Remaining",
            Math.max(
                0,
                RATE_LIMIT_MAX_REQUESTS - requestCount
            )
        );

        if (requestCount > RATE_LIMIT_MAX_REQUESTS) {
            res.status(429).json({
                success: false,
                message: "Too many requests. Please try again later"
            });
        }

        next();

    } catch (error) {
        console.log("Rate limit Redis error:", error);
        next(error);
    }
}