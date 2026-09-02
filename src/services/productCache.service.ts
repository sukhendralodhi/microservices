import redisClient from "../config/redis";

export async function invalidateProductsCache(): Promise<void> {
    const keys: string[] = [];

    for await (const batch of redisClient.scanIterator({
        MATCH: "products:*"
    })) {
        keys.push(...batch);
    }

    for (const key of keys) {
        await redisClient.del(key);
    }

    console.log(`Invalidated ${keys.length} product cache keys`);
}

export async function invalidateProductsCacheById(productId: string): Promise<void> {
    const cacheKey = `product:${productId}`;
    await redisClient.del(cacheKey);
}