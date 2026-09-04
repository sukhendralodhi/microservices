
// 5 request user can send in 30 seconds

import { NextFunction, Request, Response } from "express";
import redisClient from "../config/redis";

export async function productRateLimiter(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        // each ip will gate it's own counter in redis 
        // rate_limit:product:127.0.5.5 
        // rate_limit:products:::1

        // let's say one user crossing the limit - it will not going to block everyone
        // real production  - behind a proxy or load balancer

        const ip = req.ip || "unknown";
        const rateLimiterKey = `rate_limit:products:${ip}`;

        // check how many request user made 
        // if you have multiple backend server at that place redis can share only one redis counter
        const requestCount = await redisClient.incr(rateLimiterKey);

        

        next();
    } catch (error) {
        console.log("rate limit redis error", error);
        next(error);
    }
}