// buffers = raw binary data
// binary. data = when you have your data in stored in bytes

// use cases 
// reading file
// receiving (https request body)
// working with streams
// handling images, pdf files and videos 
// encrypt hashing

const textBuffer = Buffer.from("Hello");
// console.log(textBuffer);
// console.log(textBuffer.length);

// N - 4e
// O - 6f
// D - 64
// E - 65

// console.log(textBuffer.toString("utf-8"));

// alloc. 

const fixedBuffer = Buffer.alloc(5);
// console.log(fixedBuffer);
// console.log(fixedBuffer.length)
// fixedBuffer.write("API");
// console.log(fixedBuffer);
// console.log(fixedBuffer.length);
// console.log(fixedBuffer.toString("utf-8"));

const chunks = [
    Buffer.from("Hello "),
    Buffer.from("Node "),
    Buffer.from("JS")
];

const combineBuffer = Buffer.concat(chunks);
console.log(combineBuffer);
console.log(combineBuffer.toString("utf-8"));