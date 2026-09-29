

function addnum(num1 , num2){
    return num1+num2
}

//console.log(addnum())//returns NaN
console.log(addnum(2,8))


function addnum2(num1 , num2){
    console.log(num1 + num2)
}

addnum2(3 ,10)
//console.log(addnum2(22,8)) prints 30 and returns "undefined" reference.



function loggedinUserText(usrname){
    return `${usrname} is logged in.`
}

console.log(loggedinUserText('Barood Khan'))
console.log(loggedinUserText()) //if argument is not passed , usrname is undefined.****

function loggedinUserText1(usrname="Boom Khan"){
    return` ${usrname} is logged in.`
}
console.log(loggedinUserText1())//default parameter value



// parameter types ::: 1.REST type and 2.Destructure type 


function calcCartprice(val1 ,...prices){
    return prices
}

console.log(calcCartprice(10,20,30,44,300,1))// all arguments will be bundled into an array that is iterable.****



const jsUser={
    name: "sakib nisat alok",
    "major name": "CS", 
    age: 100,
    email: "idunno@google.com",
    phone:"01123456789",
    isLoggedIn: false,
    loggedDays: ["mon","sat","fri"],
    printName : function(){ return `name is ${this.name}`}
}
//console.log(jsUser.printName())


function printNameEmail({name,email}){
    return `Name is ${name} and email is ${email}`
}

console.log(printNameEmail(jsUser))

console.log(printNameEmail({
    name : "Barood Khan",
    email : "barood@yandex.com"
}))

const arrPrices = [220, 300, 400, 100, 3]

function printarr(anyarray){
    return anyarray[3]
}

console.log(printarr(arrPrices))


function printarr1(anyarray){
    return anyarray //pass by reference ****
}

console.log(printarr1(arrPrices))

function printarr11(anyarray){
    return anyarray[3] //pass by reference
}

console.log(printarr11([11,3,4,44,0,5,9])) // anonymous array









let a = 1000 // outer a as well as 'global'.

d = 222

// d is neither var nor let.
// Because it was assigned without any declaration keyword (let, const, or var),
// JavaScript creates it as an 'undeclared global object property'
// attached directly to the global object (globalThis / window).



{
  let a // inner a which shadows outer 'a' inside this block.
  // it's a brand new variable.When the block ends, the inner a is destroyed.
  a = 100; // only mutates inner a
  
 c=999
 let u= 888

 var f=333 // var is function-scoped, NOT 'block-scoped'.
 // Since {} is just a standalone block (not inside a function), 
 // var f leaks right out of the block into the surrounding scope.
 // Therefore, f is accessible outside the braces.

}

console.log("a: " + a) // answer 1000 not 100

console.log("c: "+c)   // In strict mode "use strict", 
console.log("d: " + d) // both d = 222 and c = 999 throw a ReferenceError.

console.log("f: "+f)
// console.log("u: "+u) gives reference error



// global scope on NODE environment is different from BROWSER console environment.*****










console.log(addone(6))

function addone(num){    // Function Declaration (Works before definition).
    return num+1
}

/*
When the JavaScript engine runs code, it does two passes:
-Creation / Memory phase
-Execution phase
During the creation phase,
Function Declarations are fully hoisted — both the function name and its entire body
are loaded into memory before any line executes.
That means calling addone(6) works even before the line where it is written.
*/







//console.log(addvar(60)) throws a reference error. *****
//hoisting concept ,final tree 
const addvar= function addtwo(num){   // Function Expression with "const/let" (Fails before definition)
    return num+1
}

/*
-Here, addvar is a variable declared with const.
-Variables declared with const and let are hoisted into memory,
but "they are not initialized".***
-From the start of the scope until the
line where const addvar = ... runs, the variable is trapped in the Temporal Dead Zone (TDZ).
-Trying to access or call it while it’s in the TDZ throws a ReferenceError.
*/

console.log(addvar(60)) //works fine

// const addvar = function addtwo(num) { ... }

/*
-This is a Named Function Expression.
-The name addtwo is only accessible inside the function
itself (useful for recursion or stack traces in debugging).***
-Outside the function, addtwo does not exist:

" console.log(addtwo(5)); ReferenceError: addtwo is not defined. "

 Must call it via the variable: addvar(5).***

*/








const user ={
    name : "Doctor Boom",
    age : 1000,
    welcomeMessage : function(){
        console.log(`hello ${this.name}, welcome on board `)
        console.log(this)// this denotes the current context. **
    } 
   
}

user.welcomeMessage()
user.name="Doctor Larry"
user.welcomeMessage()

// 'console.log(this)' this statement returns {} in 'NODE' environment
// unlike 'BROWSER' environment where 'this' points to "window" object. ****





// arrow functions ::::

function printt(){
  let varr = "js stack"
  // console.log(this.varr) prints undefined.  ****
  console.log(this) // important
}

printt() //console.log(typeof printt); "function". 
// Under the hood in JavaScript’s specification, functions are
// actually Objects (often termed “callable objects” or Function Objects).
//They inherit from "Function.prototype" which inherits from "Object.prototype".*****

/*  ******
1. Why does console.log(this) print that weird global collection? :::

-The caller is the runtime environment itself.
By default (in non-strict mode),
when a regular function has no specific object calling it:
--In Node.js: this defaults to the Node global object
(which holds things like setTimeout, clearTimeout, performance,
process, etc. — that massive object you saw printed!).**
--In Browsers: this defaults to the window object.
( If we enable "use strict", 
this will be "undefined" instead of polluting or pointing to global).***


2. Why did this.varr print undefined? :::

Variables declared with let or const inside
a function are local block-scoped variables stored
on the function’s Execution Context / Lexical Environment.
They never get attached to this. Since this is pointing to global,
looking for "this.varr" looks for a property named varr on
the global object, which does not exist shows undefined.**



2. Why is the this keyword used in a function? :::

The purpose of "this" is ""context-sharing"": it allows a
function to refer to the object that is
executing it, making code reusable across multiple objects.****

---When a function is called as an object method, "this" points
to that object:

const user1 = {
  name: "Sakib",
  greet() {
    console.log(`Hello, my name is ${this.name}`); // 'this' points to user1
  }
};

const user2 = {
  name: "Alok",
  greet: user1.greet // Reusing the same function
};

user1.greet(); // "Hello, my name is Sakib"
user2.greet(); // "Hello, my name is Alok"


--- ******
-Constructor Functions / Classes: To assign properties
to the newly created instance (this.name = name).
-DOM Event Listeners: In the browser, "this" points
to the HTML element that received the event.
-Rule of thumb: In a standalone regular
function like printt(), you almost never need this.
"this" is designed for object-oriented patterns.
---


*/









const y = () => {
    let varr = "js user"
    console.log(this.varr)// prints undefined**
    console.log(this)//returns empty parenthesis**
}

y()

// const add2= (num1 ,num2) => {
//     return num1 + num2
// }

// implicit return :: Implicit return is a shorthand syntax in arrow functions
// where you omit the return keyword and curly braces {} and only (function_body).
// The function automatically returns the result of the expression.

const sss = () => {} // arrow funciton syntax

//const add2= (num1 ,num2) =>  num1 + num2
const add2= (num1 ,num2) =>  (num1 + num2)
console.log(add2(4,8))

const ob = () => ({ name : "sakib nisat"}) // for returning object.
console.log(ob());



const fcheck = (num1, num2) => (num1 * num2); // implicit return.
console.log(fcheck(3, 6));

const arrowfunc = () => {
  console.log("hello guys. i'm inside the arrow function");
};
arrowfunc();



//ASI issue : Automatic Semicolon Insertion.***




// Immediately Invoked Function Expression(IIFE) ::

//first pair is for function expression and second pair is for function execution signal.

(function () {
    console.log("Instant IIFE code")
})();

(() => {
    console.log("Instant IIFE arrow function code")
})();

(function (name) {
    console.log(`username is ${name}`)
})('Barood Khan');

// always add semicolons before and after writing IFFE function. ****
// variable of any types(var,let,const) are
//  scoped only inside the first parentheses.****

((name, age) => {
  console.log(`${name} is ${age} years old.`);
})("Alex", 30);


const result = (() => {
  const a = 10;
  const b = 20;
  return a + b;
})();

console.log(result); // 30




//Variables defined inside an IIFE exist only within its lexical scope. 
//This prevents variables from leaking into the global window or globalThis scope and
//clashing with other scripts.**

(function () {
  var tempKey = "12345"; // Isolated to this function
})();

console.log(typeof tempKey); // "undefined"


//In modern ES6+ JavaScript, IIFEs are needed less frequently because:

//Block Scoping: let and const provide block-level
//scope using standard curly braces { ... }, eliminating the
//need for an IIFE just to isolate standard variables.
//ES Modules: JavaScript files run as ES modules (import/export) have
//their own module scope by default, so variables never leak globally.****



function checkin() {
  var checkvar = 'function var varable'
  console.log(checkvar)
}

checkin();
//console.log(checkvar);


/*
Comparing lexical scope to function or block scope is comparing
how scope is determined versus where scope boundaries are created.

Lexical scope is the overarching mechanism that dictates
variable visibility based on code layout, while function
and block scopes are the actual physical
boundaries defined in your code.

1. Lexical Scope (The "How" / Rules of Lookup) :::

Lexical scope (also called static scope) means that variable
access is determined entirely by where functions
and blocks are physically written in your source
code during compilation, not by how or where they
are called at runtime.

Direction: Scope lookup flows inside-out
along the scope chain. Inner functions can read
variables from their outer enclosing scopes, but outer
scopes cannot reach inside inner scopes.****

Static: The lookup path is locked in
when you write the code. It does not change based
on who calls the function or what the call stack looks like.****


const globalVar = "Global";

function outer() {
  const outerVar = "Outer";

  function inner() {
    // Lexical scope allows inner() to look up the chain to outer() and global
    console.log(outerVar, globalVar); 
  }

  inner();
}

outer(); // Logs: "Outer Global"




2. Function Scope & Block Scope (The Boundaries) :::
While lexical scope dictates the rule system, function
scope and block scope define where the actual walls are built.

Function Scope :
A function scope is created inside any function
declaration or expression.
Variables declared with var are function-scoped.
A var variable is accessible anywhere inside
its enclosing function, completely ignoring
curly brace {} blocks like if statements or loops.****

Block Scope :
A block scope is created by any
pair of curly braces {} (such as if,
for, while, or plain standalone {}).****


function scopeTest() {
  if (true) {
    var functionScoped = "I am function-scoped";
    let blockScoped = "I am block-scoped";
  }

  console.log(functionScoped);  Works! ("I am function-scoped")
  console.log(blockScoped);    ReferenceError: blockScoped is not defined
} ****
scopeTest();


Variables declared with let and const are block-scoped.
They are strictly confined to the
immediate {} block in which they are defined.


-----*****
Think of Lexical Scope as the general law of gravity
in JavaScript: inner scopes can always see upward to outer scopes.

Function Scope and Block Scope are just the specific
structural containers that create those inner and outer rooms.
-----

*/











// call stack :::

/*

When js code is fed to the interpreter, it creates a execution context
and executes in three phases : Global execution context,
Memory execution phase and Execution phase. In the process,
it constructs sandboxes to deal with functions. 
This is how generally js handles its code.

misc : function and eval execution context. *****

*/









































































































