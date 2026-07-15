import process from "node:process";

const nodeEnv = process.env.NODE_ENV ?? "development";

// process.env values are always string or undefined 
// const port = Number(process.env.PORT ?? 3000)

// env variables 
// command line arguments 
// exit code 
// process lifecycle events 

// read backend port from env 
// read secrets - db urls, api keys, passwords, google auth secrets 
// read cli arguments in script 

// process.argv -> 
// [
//     "Path to the Node.js executable",
//     "Path to your script",
//     "First argument provided by you"
//     "Second argument provided by you"
// ]


// | Index | Value                     | Description                     |
// | ----: | ------------------------- | ------------------------------- |
// |   `0` | `/usr/local/bin/node`     | Path to the Node.js executable  |
// |   `1` | `/Users/sukhendra/app.js` | Path to your script             |
// |   `2` | `hello`                   | First argument provided by you  |
// |   `3` | `world`                   | Second argument provided by you |


// console.log(process.argv)

const command = process.argv[2] ?? "start";

// fail flag 
// crash flag 

const shouldFail = process.argv.includes("--fail");
const shouldCrash = process.argv.includes("--crash");


// do not start sync here 
// node is alredy shutting down 
// final log, final cleanup 

process.on("exit", (code) => {
    console.log(`process finished with the exit code ${code}`)
});
// process.on("exit");

function runApp(): void {
    console.log({
        command,
    });

    if (shouldFail) {
        console.log("Manual failure triggred with --fail flag");
        process.exit(1);
    }
    if (shouldCrash) {
        console.log("Manual crash triggred with --crash flag");
        process.exit(1);
    }
}

runApp();