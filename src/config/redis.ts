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

export default redisClient;