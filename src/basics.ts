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

interface Product {
    name: string;
    price: number;
    discount?: number
}

const product: Product = {
    name: "Banana",
    price: 200,
    discount: 10
}

const product1: Product = {
    name: "Macbook",
    price: 120000
}

// console.log(product1);


function getFirst<T>(arr: T[]): T[] {
    return arr;
}

const arrNumbers = getFirst<number>([1, 2, 3]);
const arrStrings = getFirst<string>(["sanju", "mohan"]);
// console.log(arrStrings)

enum Status {
    Pending,
    Active,
    Completed
}

let currentStatus: Status = Status.Active;
// console.log(currentStatus); // this return: 1
// console.log(Status[currentStatus]); // this will return: Active


// Type narrowing  
function printId(id: string | number): void {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id.toFixed(2));
    }
}

// printId(10.4567);
// printId("sanju");

// any vs unknown 

let a: any = "Hello"; // allowed, but TypeScript won't check anything - risky
// console.log(a.toUpperCase());

let b: unknown = "Mohan";

if (typeof b === "string") {
    console.log(b.toUpperCase()); // now it's allowed
}

// Utility types — TypeScript ships with handy built-in helpers:
interface UserDetails {
    name: string;
    age: number;
    email: string
}

type PartialUser = Partial<UserDetails>; // all properties become optional
type UserPreview = Pick<UserDetails, "name" | "email">; // only pick certain properties

function wrapInArray<T>(value: T): T[] {
    return [value]
}

// console.log(wrapInArray(5));        // [5]
// console.log(wrapInArray("hello"));  // ["hello"]
// console.log(wrapInArray(true));     // [true]

