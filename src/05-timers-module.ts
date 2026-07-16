// run after some delay
// repeatedly after some interval - 2 seconds

// setTimeout
// setInterval
// clearTimeout
// clearInterval
// setImmediate

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

function runTimerDemo(): void {
    runSetTimeOutExample();
    runClearTimeOutExample();
}

runTimerDemo();