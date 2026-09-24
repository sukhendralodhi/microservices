import { createClient } from "redis";
import { env } from "../src/config/env";

const channel = "demo:notifications";

async function run() {
    // Two separate Redis clients:
    // one for publishing
    // one for subscribing

    const publisher = createClient({
        url: env.redisUrl
    });

    const subscriber = createClient({
        url: env.redisUrl
    });

    // Connect both clients
    await publisher.connect();
    await subscriber.connect();

    console.log("publisher connected");
    console.log("subscriber connected");

    console.log(
        "ping ->",
        await publisher.ping()
    );

    console.log("subscriber listens");

    // Subscriber starts listening first
    await subscriber.subscribe(channel, (message) => {
        const data = JSON.parse(message);

        console.log("subscriber received");
        console.log("title:", data.title);
        console.log("message:", data.message);
    });

    console.log(
        "subscribed to channel:",
        channel
    );

    console.log(
        "publisher now sending the event"
    );

    const event = {
        title: "Redis course",
        message: "pub/sub demo message"
    };

    // Publisher sends the message
    const receivers = await publisher.publish(
        channel,
        JSON.stringify(event)
    );

    console.log("published event");
    console.log("active subscribers:", receivers);

    // Give subscriber callback time to execute
    await new Promise((resolve) =>
        setTimeout(resolve, 300)
    );

    await subscriber.unsubscribe(channel);
    await subscriber.quit();
    await publisher.quit();

    console.log("pub/shub demo done");
}

run();