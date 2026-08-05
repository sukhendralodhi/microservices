// piece by piece, we will explore the core modules of Node.js, focusing on streams. Streams are a powerful way to handle data in Node.js, allowing for efficient reading and writing of data in chunks rather than loading everything into memory at once. This is particularly useful for working with large files or data sources.



// not loading the data everything at once 
// read large files 
// upload files 
// downloading files 
// video/audio processing 
// compression 


// CHUNKS

// there is my full 500MB file
// here chunk 1
// here chunk 2
// here chunk 3
// here chunk 4
// here chunk 5

// memory efficient

// STREAMS TYPES
// readable stream - source of data
// writable data - destination where the data is written
// transform stream - read the data, change it and pass that forward

import { Readable, Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

const readableStream = Readable.from([
    "hello ",
    "from ",
    "node js ",
    "stream"
]);

const uppercaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        const text = chunk.toString();
        callback(null, text.toUpperCase());
    }
});

const writableStream = new Writable({
    write(chunk, encoding, callback) {
        console.log("recieved chunks: ", chunk.toString());
        callback();
    },
});

async function mainFunction(): Promise<void> {
    try {

        await pipeline(readableStream, uppercaseTransform, writableStream);
        console.log("Streams completed...");

    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.log(message);
    }
}

mainFunction();