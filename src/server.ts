// console.log("hello")
// main root file  

import { createApp } from "./app";
import { env } from "./config/env";
import { connectRedis, disconnectRedis } from "./config/redis";
import { logger } from "./lib/logger";


async function startServer() {
    try {
        // connect redis 
        await connectRedis();
        // create express app 
        const app = createApp();

        // Start server
        const server = app.listen(env.port, () => {
            logger.info(
                `Server is running on http://localhost:${env.port}`
            );
        });

        // Graceful shutdown
        async function shutdown(signal: string) {
            logger.info(`${signal} received. Shutting down gracefully...`);

            server.close(async () => {
                try {
                    await disconnectRedis();
                    logger.info("Redis disconnected");
                    logger.info("Server closed");
                    process.exit(0);
                } catch (error) {
                    logger.error(error);
                    process.exit(1);
                }
            })
        }

        process.on("SIGINT", () => shutdown("SIGINT"));
        process.on("SIGTERM", () => shutdown("SIGTERM"));

    } catch (error) {
        logger.error("Failed to start server");
        logger.error(error);
        process.exit(1);
    }
}

startServer();