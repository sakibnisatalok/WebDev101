
"use strict"

//alert() doesnt work on nopdejs, but does on browser

console.log("abc")
console.log(123)
// newline is embedded into console.log()


/*
Int(number.can have decimals.)= 2^53-1
bigInt
strin=""
boolean=true/false
null=standalone value (EMPTY)(type object)
undefined=basically expecting a value that is not yet given (uninitialized)(type=undefined)
symbol=unique;mostly used in react and figma

object

*/

console.log(typeof {})
console.log(typeof [])
console.log(typeof 123)
console.log(typeof BigInt)
console.log(typeof Number)






// Method 1: Appending 'n'
const bigNum1 = 9007199254740991n;
const hugeNum = 123456789012345678901234567890n;

// Method 2: Using the BigInt() function
const bigNum2 = BigInt(9007199254740991);

console.log(typeof bigNum1); // "bigint"


const maxSafe = 9007199254740991n;

console.log(maxSafe + 1n); // 9007199254740992n
console.log(maxSafe + 2n); // 9007199254740993n (Accurate!)
console.log(maxSafe + 3n); // 9007199254740994n (Accurate!)


// Division rounds down:  BigInts represent **integers**, division always truncates the decimal part (it rounds towards zero).
// BigInts can be evaluated in if statements or logical operations. 0n is falsy, while any non-zero BigInt is truthy.*****x 


// typeof returns bigint


// SYMBOLS in JS ::::::

// The primary practical use case for Symbols is creating unique object property keys.
// Imagine you are using a third-party library, or writing code where multiple developers add properties to the same user object.
// If two people happen to use the string "id" as a property key, one will accidentally overwrite the other.
// Symbols solve this because no two symbols are ever the same.******


// Two different parts of an app want to add an 'id' property
const user = {
  name: "Alice"
};

// Developer A's symbol
const idSymbol1 = Symbol("id");
user[idSymbol1] = 101;

// Developer B's symbol (even with the exact same description string)
const idSymbol2 = Symbol("id");
user[idSymbol2] = "USER-ABC";

// Both properties exist peacefully on the same object without overwriting each other!
console.log(user[idSymbol1]); // 101
console.log(user[idSymbol2]); // "USER-ABC"
console.log(user); 
// Output: { name: 'Alice', [Symbol(id)]: 101, [Symbol(id)]: 'USER-ABC' }



//Another useful feature of Symbol properties is that they are skipped by standard object iteration loops.
//This makes them great for adding internal metadata, temporary data, or semi-private properties
//  that shouldn't show up during routine data handling.******


const secretKey = Symbol("secret");

const product = {
  name: "Laptop",
  price: 999,
  [secretKey]: "internal-inventory-code-99"
};

// 1. Regular loops ignore symbols
for (let key in product) {
  console.log(key); // Prints only "name" and "price"
}

// 2. Object.keys() and Object.values() ignore symbols too
console.log(Object.keys(product)); // [ 'name', 'price' ]

// To access symbol keys explicitly, you must use specialized methods:
console.log(Object.getOwnPropertySymbols(product)); // [ Symbol(secret) ]




//Normally, symbols are completely isolated.
//However, if you want to share a symbol across different files or parts of your application,
//you can use the global symbol registry via Symbol.for() and Symbol.keyFor().****


// Creates a global symbol or retrieves it if it already exists
let globalSym = Symbol.for("app.id");
let sameGlobalSym = Symbol.for("app.id");

console.log(globalSym === sameGlobalSym); // true!

/*

*********

In Symbol.for("app.id"), the string "app.id" is just a key (or name) for the global registry.
Think of the global registry as a giant lookup table maintained by JavaScript.

"app.id" acts as a label for that specific symbol so that different
parts of your program can find and share the exact same symbol instance.

How it Works:

Symbol.for("app.id") (First call):
JavaScript checks its global symbol registry to see if a symbol with the key "app.id" already exists.
Since it doesn’t exist yet, JavaScript creates a new symbol, registers it under the key "app.id", and returns it.

Symbol.for("app.id") (Second call elsewhere in your code):
JavaScript checks the registry again for "app.id". This time, it finds the symbol that was created earlier.
Instead of creating a new one, it returns the exact same symbol reference.

This is why globalSym === sameGlobalSym evaluates to true—they both point to the exact same entry in the global registry,
unlike regular Symbol("app.id"), which always creates a brand new, isolated memory reference.*********

*/



