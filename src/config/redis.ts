import { createClient } from "redis";
import { env } from "./env";


const redisClient = createClient({
    url: env.redisUrl,
});

redisClient.on("error", (error) => {
    console.error("Redis Client Error:", error);
});

redisClient.on("connect", () => {
    console.log("Redis connecting...");
});

redisClient.on("ready", () => {
    console.log("Redis connected successfully");
});

redisClient.on("end", () => {
    console.log("Redis client connection closed");
});

export default redisClient;

export async function connectRedis(): Promise<void> {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    const pong = await redisClient.ping();
    console.log("redis ping response", pong);
}

export async function disconnectRedis(): Promise<void> {
    if (redisClient.isOpen) {
        await redisClient.quit();
    }
}