

//  Primitive : Primitives represent single, simple values.
//  Because they are immutable, any operation that seems to "change" a primitive actually creates a brand-new value in memory.

//  7 types : String, Number, Boolearn, null, undefined, Symbol, BigInt -> all these go to stack
//non-primitives : array ,object and fuction -> all of these go to heap and send reference to the indentifier.

const score = 100
const scoreValue = 100.3

const isLoggedIn = false
const outsideTemp = null
let userEmail;

const id = Symbol('123')
const anotherId = Symbol('123')

console.log(id === anotherId);
//returns false as datatype matches but not the value.

// const bigNumber = 3456543576654356754n


// Reference (Non primitive)

// Array, Objects, Functions -> all are object type and fucntion is also an object type.

const heros = ["superman", "batman", "spoidermon","doctor boom"];
let myObj = {
    name: "Barood Khan",
    age: 22,
    isMale: true
}

const myFunction = function(){
    console.log("Hello bots");
}

myFunction()

// https://262.ecma-international.org/5.1/#sec-11.4.3