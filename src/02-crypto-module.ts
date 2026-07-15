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

const randomBytes = crypto.randomBytes(16).toString("hex");
console.log(randomBytes.length);

const createHash = crypto.createHash

