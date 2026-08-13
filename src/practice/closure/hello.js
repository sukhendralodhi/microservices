// let n = 2;

// function square(n) {
//     // console.log(n * n);
//     return n * n;
// }

// // console.log(square(n));

// const square2 = square(n);
// console.log(square2);


// function Hello() {
//     console.log("Somakshi");
//     return;
//     let a = 10;
//     let b = 20;
//     console.log(a);
//     console.log(b);
//     return;
// }

// Hello();



function Outer() {
    let name = "Somakshi";
    return function Inner() {
        console.log(name);
    }
}

const outer = Outer();
const inner = outer();
console.log(inner);



