// run after some delay
// repeatedly after some interval - 2 seconds

// setTimeout
// setInterval
// clearTimeout
// clearInterval
// setImmediate

import { setTimeout as sleep } from "node:timers/promises";

function runSetTimeOutExample(): void {
    console.log("1. setTimeout example started");

    setTimeout(() => {
        console.log("2. This will run after one second");
    }, 1000);

    console.log("3. This will run immidiately because node does not wait for setTimeout");
}

function runClearTimeOutExample(): void {
    const timerId = setTimeout(() => {
        console.log("This message will not run");
    }, 2000);
    clearTimeout(timerId);
    console.log("4. clearTimeout cancelled the 2 seconds timer");
}

// setInterval => it is a going to run a callback again and again after the fixed delay

function runSetInterval(): void {
    let count = 0;
    const intervalId = setInterval(() => {
        count++;
        console.log("Setinterval tick", count);

        if (count === 5) {
            clearInterval(intervalId);
            console.log("interval stopped");
        }
    }, 500);

}

// setImmediate => Use when you want to execute work as soon as the current operation finishes, without specifying a delay.

function setImmediateExmaple(): void {
    setImmediate(() => {
        console.log("Request completed");
    });

    console.log("Synchronous code ");

}

async function runPromiseExmaple(): Promise<void> {
    console.log("Waiting for promise based timer");
    await sleep(5000);
    console.log("Promise based timer finished");
}

function runTimerDemo(): void {
    runSetTimeOutExample();
    runClearTimeOutExample();
    runSetInterval();
    setImmediateExmaple();
    runPromiseExmaple();
}

runTimerDemo();