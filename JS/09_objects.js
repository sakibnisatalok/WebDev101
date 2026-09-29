
/*
singleton objects

object.create  using constructor 

*/

//object types : 1.literal 2.singleton ****



const myObj={} //empty literal object
console.log(typeof myObj)

const myobj= new Object() //singleton object. a constructor is called .
console.log(typeof myobj)


/*

Both objects:
- Are empty {}
- Inherit directly from Object.prototype
- Have the typeof "object"

*/

const symbolKey= Symbol("example")

const jsUser={
    name: "sakib nisat alok",
    "major name": "CS", 
    age: 100,
    [symbolKey]: "just for symbol", //symbol key:value pair****
    email: "idunno@google.com",
    phone:"01123456789",
    isLoggedIn: false,
    loggedDays: ["mon","sat","fri"]
}

console.log(jsUser.name)
console.log(jsUser["name"]) //internally name key is stored as "name" string.
console.log(jsUser["major name"]) //cant be accessed through dot operator as it's a string. console.log(jsUser.major name) returns ERROR.

console.log(typeof jsUser[symbolKey])
console.log(jsUser[symbolKey])


//value changing and freezing a key :::

/*
console.log(jsUser)
jsUser.email="idunno@outlook.com"
console.log(jsUser)
Object.freeze(jsUser)
jsUser.email="idunno@yandex.com"
console.log(jsUser)
*/

console.log(jsUser)

jsUser.greeting= function(){
    console.log("hello user")
}

console.log(jsUser.greeting) // returns the reference of that object function as it's expecting sth to print.**

console.log(jsUser.greeting()) //If you want only "hello user" printed, 
// call jsUser.greeting() by itself (without wrapping it in another console.log). 
// If you want console.log to show something else,
// have the function return a value (e.g., return "hello user") and then console.log(jsUser.greeting()) will print that returned value only.****



jsUser.greetingUser= function(){
    console.log(`hello ${this.name}`)// 'this' references the object itself.Using that, we can access the object elements.
}

console.log(jsUser.greetingUser())//inner funciton prints the value and outer function prints undefined*****



console.log("############# Object Literal ##################")


const singletonObj=new Object()

singletonObj.name= "sakib nisat alok"
singletonObj.age=44
singletonObj.email= "email@yandex.com"
singletonObj.id="123abc"

console.log(singletonObj)

console.log(Object.getOwnPropertySymbols(jsUser)) //reading sybol keys of an object.


const regularUser={
    email: "player@yandex.com",
    name: {
        fullname: {
            firstname: "Barood",
            lastname : "Khan"
        }
    },
    ID:"abcdef123",
    gender: "male",
    country: "Bangladesh"
}

console.log(regularUser)
console.log(regularUser.name)
console.log(regularUser.name.fullname)
console.log(regularUser.name.fullname.firstname)
console.log(regularUser.name.fullname.lastname)
console.log(regularUser?.info?.gender) // it's called optional chaining.
// it throws 'undefined' instead of error for '?.'.





const obj1={
    1: "a",
    2: "b"
}
const obj2={
    3: "c",
    4: "d"
}
const obj3={
    5: "e",
    6: "f"
}

//Object.assign(target,source) returns. Make sure there is no duplicate 'KEYS'

const objMerger=Object.assign({},obj1,obj2,obj3)
console.log(objMerger)
console.log(typeof objMerger)


const spreadMerge = { ...obj1, ...obj2, ...obj3 }
// If objects share the same key, the one on the right overrides the ones before it.

/*

const original = {
  name: "Sakib",         // top-level primitive
  address: {             // nested object!
    city: "Dhaka"
  }
};

 Shallow copy using spread:
const copy = { ...original };

 1. Changing top-level primitive -> Safe! Only changes `copy`
copy.name = "Alok";
console.log(original.name);  "Sakib" (original did NOT change)

 2. Changing nested object -> Mutates BOTH!
copy.address.city = "Chittagong";
console.log(original.address.city); "Chittagong" (original CHANGED too!)

Both original.address and copy.address point to the exact same object in memory.

const deepCopy = structuredClone(original); this perfectly copies
the object(true deep copy w/o shared references.)*****


*/

console.log(spreadMerge)
console.log(typeof spreadMerge)


/*

1. Shallow Copy ****

A shallow copy duplicates the first layer of properties.
If a property is a primitive, it gets copied.
If a property is a nested object or array, only the memory pointer is copied.

Common Ways to Shallow Copy:
-Spread operator: { ...obj } or [ ...arr ]
-Object.assign({}, obj)
-Array.prototype.slice(): arr.slice()
-Array.from(arr)



const user1 = {
  name: "Sakib",
  scores: [80, 90]
};

 const user2 = { ...user1 };  Shallow copy

 a. Mutating top-level primitive: SAFE
user2.name = "Alok";
console.log(user1.name);  "Sakib" (untouched)

 b. Mutating nested array/object: AFFECTS BOTH!
user2.scores.push(100);
console.log(user1.scores);  [ 80, 90, 100 ]  (corrupted the original!)



2. Deep Copy ****

A deep copy creates an entirely independent duplicate
of the original object along with
all nested objects, arrays, and properties at every level.
Nothing is shared in memory. Changes to the copy will never touch the original.


How to Deep Copy in Modern JS:

Method A: structuredClone() (Best & Recommended)
Built into modern browsers and Node.js (v17+).

const user1 = {
  name: "Sakib",
  scores: [80, 90],
  joined: new Date()
};

const user2 = structuredClone(user1); // Deep copy!

user2.scores.push(100);
console.log(user1.scores); // [ 80, 90 ] (original is safe!)
console.log(user2.scores); // [ 80, 90, 100 ]

- Handles nested objects & arrays
- Preserves Date, Map, Set, RegExp
- Does not copy functions or DOM nodes



Method B: JSON.parse(JSON.stringify(obj)) (The Classic Hack)
Used widely before structuredClone existed.

const deepCopy = JSON.parse(JSON.stringify(user1));

Gotchas:**

-Converts Date objects into plain strings.
-Drops undefined, Symbol, and functions completely.
-Throws an error on circular references (obj.self = obj).




Method C: External Library (lodash.cloneDeep)
Standard in large enterprise codebases:

import cloneDeep from 'lodash/cloneDeep';
const deepCopy = cloneDeep(user1);


*/




const arrObjects=[
    {
        id: "123",
        email: "sth@gmail.com"
    },
    {
        id: "abc123",
        email: "ath@gmail.com"
    }
]

console.log(arrObjects[1].email)
console.log()

console.log(regularUser)

console.log(Object.keys(regularUser))// returns an array
console.log()
console.log(Object.values(regularUser)) // returns an array
console.log()
console.log(Object.entries(regularUser)) // returns an array of arrays ***
console.log()

console.log(regularUser.hasOwnProperty('country'))
console.log()




const course={
    coursename: "JavaScript",
    price: 2223,
    duration: "5 hrs",
    practiceprobs: 33
}

const {coursename,duration:time} = course  // duration is renamed to 'time'.
//The syntax is keyInObject: newVariableName.
//  The property name before the colon (duration) is what to look for;
//  the identifier after (time) is the new variable that gets created.

console.log(coursename)
//console.log(name)
console.log(time)

 
//for json, keys are all in string format.**

//JSON-> javascript object notation is a data format used when dealing with APIs.

//APIs can come in two formats : raw object and array of objects.

{}

[
    {},
    {},
    {}
]










































































































































