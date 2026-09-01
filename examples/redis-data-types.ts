// STRING 
// HASH
// LIST 
// SET
// SORTED SET
// TTL

// STRING => stores one value under one key
// plain text, numbers stored as text, counters
import { createClient } from "redis";
import { env } from "../src/config/env.ts";

const redisUrl = env.redisUrl;

const redis = createClient({ url: redisUrl });

async function run() {
    // open connection to redis server 
    await redis.connect();
    console.log("connected to redis");
    console.log("ping", await redis.ping());

    const stringKey = "demo:page_views";

    await redis.set(stringKey, "100");

    const pageViews = await redis.get(stringKey);
    console.log(pageViews);

    // redis strings can also work like counter 
    const afterIncr = await redis.incr(stringKey);
    console.log(afterIncr);

    // hash => stores many small fields under one key - small object or map inside redis

    const hashKey = "demo:user:profile";
    await redis.hSet(hashKey, {
        name: "Sukhendra",
        email: "developer.sukhendra@gmail.com"
    });

    const profileInfo = await redis.hGetAll(hashKey);
    console.log(profileInfo);

    // list => ordred collection of values
    const listKey = "demo:messages";
    await redis.lPush(listKey, "Hello");
    await redis.lPush(listKey, "Hi Redis");

    const allTheMessages = await redis.lRange(listKey, 0, -1);
    console.log(allTheMessages);

    // lPush - add a new item at begining
    // lRange - reads items from the list
    // rPush - add a new item at end
    // lTrim - keeps only part of the list

    // set => only stored unique items if you want to try same item item again that will be ignored
    const setkey = "demo:tags";

    await redis.sAdd(setkey, "Nodejs");
    await redis.sAdd(setkey, "Reactjs");
    await redis.sAdd(setkey, "Nextjs");
    await redis.sAdd(setkey, "Nextjs");

    // getting count how many items is there in set 
    const tagCount = await redis.sCard(setkey);
    console.log("Items count from set: ", tagCount);

    // getting all items from set 
    const allTags = await redis.sMembers(setkey);
    console.log(allTags);

    // checking if the value exist or not inside set - if value is there then it return 1 else 0
    const isMember = await redis.sIsMember(setkey, "Nextjs");
    console.log(isMember);

    // getting 1 item randomly from set 
    const randomVal = await redis.sRandMember(setkey);
    console.log(randomVal);

    // getting item random  by passing a count
    const randomValCount = await redis.sRandMemberCount(setkey, 3);
    console.log(randomValCount);
}

run().catch((error) => {
    console.log("redis connection failed", error);
    process.exit(1);
});