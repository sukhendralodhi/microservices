import { createClient } from "redis";
import { env } from "../src/config/env";



const redisClient = createClient({
    url: env.redisUrl,
});

// cache key is there 
const cacheKey = "demo:product";
const cacheKeyTtlSeconds = 60; // cache will expire after 60 seconds

let dbProducts = ["keyboard", "Mouse", "Laptops"];

async function run() {
    // connect to redis 
    await redisClient.connect();

    // first request = cache miss bcz at that time data is not present in redis
    let cached = await redisClient.get(cacheKey);

    // console.log(cached);

    // cache aside pattern
    if (cached) {
        console.log("Cache Hit");
        console.log("data:", JSON.parse(cached));
    } else {
        console.log("Cache Miss");
        // read the data from main db 
        const products = dbProducts;

        // set/save the roducts in redis cache 
        // setEx - also saves ttl so that your your cache does'nt live forever
        await redisClient.setEx(cacheKey, cacheKeyTtlSeconds, JSON.stringify(products));
    }

    dbProducts = ["keyboard", "Mouse", "Laptops", "Desktop"];
    console.log(dbProducts, "dbProducts");

    cached = await redisClient.get(cacheKey);
    console.log("cached data:", JSON.parse(cached!));

    // cache invalidation 
    // whenevr db changes - delete your old data from cache immidiaetly

    await redisClient.del(cacheKey);
    console.log("Cache deleted");

    cached = await redisClient.get(cacheKey);

    if (!cached) {
        console.log("Cache data after delete");
        // data from your db changes 
        const freshProducts = dbProducts;
        await redisClient.setEx(cacheKey, cacheKeyTtlSeconds, JSON.stringify(freshProducts));
        console.log("Fresh data: ", freshProducts);
    }

    // close redis
    await redisClient.quit();
}

run();