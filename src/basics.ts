// let id: number = 5;
// let name: string = "John Doe";
// let age: number = 30;
// let active: boolean = true;
// let tags: string[] = ["a", "b"];
// let tuple: [string, number] = ["sanju", 20];

function greet(name: string) {
    console.log("Hello", name);
}

// greet("Sanju");

let username: string = "Alex";
let age: number = 20;
let isActive: boolean = true;

let scores: number[] = [90, 85, 66];
let names: string[] = ["sanju", "raju", "sardar"];

// Tuples (fixed-length array with specific types in order)

// let user: [string, number] = ["Alex", 25];

// using type 

// type User = {
//     name: string;
//     age: number;
// }

// interface IUser {
//     name: string;
//     age: number;
// }

// const user: User = {
//     name: "Alex",
//     age: 25
// }

// Optional properties

interface User {
    name: string;
    age?: number; // the ? means this is optional
}

const user1: User = { name: "Alex" }; // valid
const user2: User = { name: "Alex", age: 20 }; // also valid

let id: string | number;
id = "Sanju"; // valid 
id = 20; // also valid

// Funtion types 

function add(a: number, b: number): number {
    return a + b; //  the last number is return type 
}

