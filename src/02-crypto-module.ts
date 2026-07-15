import crypto from "node:crypto";

// built in node js module

// security related tasks 
// creating random UUIDs , IDs
// creating secure token  
// hashing data 
// to verify of the data was not changed 
// encrypt/decrypt 

// crypto.randomUUID
// UUID => universally unique indentifier 

// user_id, order_id, session_id 

// const requestId = crypto.randomUUID();
// console.log(requestId);

// const randomBytes = crypto.randomBytes(16).toString("hex");
// console.log(randomBytes.length);

// const text = "Hello Node";

// const createHash = crypto.createHash("sha256").update(text).digest("hex");
// console.log(createHash);

const secret = "my-super-secret-key";
const message = "user_id=1";

const signature = crypto.createHmac("sha256", secret).update(message).digest("hex");
console.log(signature);



