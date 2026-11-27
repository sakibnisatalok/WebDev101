


// reading seq : classES6.js -> inheritance.js -> staticprop.js -> bind.html -> objectsandmathpi.js -> getter_setter.js

// this file provides deeper insights over descriptor in js. **



console.log(Math.PI);
const descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');
console.log(descriptor);


const student = {
  name: "sakibnisatalok",
  age: 333,
  major: "cs",
  isPennyLess: true,
  
  displayMe: function () {
    console.log(`It's me, ${this.name}`)
  }  
}

console.log(student);
console.log(Object.getOwnPropertyDescriptor(student, "name"));

Object.defineProperty(student, 'name', {
  writable: false,
  configurable: false,
  enumerable: false // deals with if any key will be iterable/enumerable when looping.
})
console.log(Object.getOwnPropertyDescriptor(student, "name"));



for (let [key,value]  of Object.entries(student)) {
  console.log(`${key} : ${value}`); // covers the functions as well.
}

console.log();


for (let [key,value]  of Object.entries(student)) {
  if (typeof value != 'function') {
    console.log(`${key} : ${value}`); // now it doesnt cover the functions.
  }
}

// if enumerable is false for any key, we wont see it when looping through the keys.**














// =====================================================================
//                OTHER USEFUL Object METHODS
// =====================================================================


// ---------------------------------------------------------------------
// 1. PROPERTY DESCRIPTORS (same family as getOwnPropertyDescriptor/defineProperty)
// ---------------------------------------------------------------------
console.log("\n----- 1. Property Descriptors -----");

// Object.getOwnPropertyDescriptors(obj) -> gets the descriptors of ALL properties at once.
console.log(Object.getOwnPropertyDescriptors(student));

// Object.defineProperties(obj, {...}) -> sets several properties' descriptors in one call.
const car = {};
Object.defineProperties(car, {
  brand: { value: "Toyota", writable: false, enumerable: true },
  year:  { value: 2020,     writable: true,  enumerable: false }
});
console.log(Object.getOwnPropertyDescriptors(car));


// ---------------------------------------------------------------------
// 2. LOOPING OVER KEYS AND VALUES (enumerable properties only)
// ---------------------------------------------------------------------
console.log("\n----- 2. Keys / Values / Entries -----");

// Object.keys(obj)   -> array of the keys
console.log(Object.keys(student));   // 'name' is missing (non-enumerable)

// Object.values(obj) -> array of the values
console.log(Object.values(student));

// Object.entries(obj) -> array of [key, value] pairs (already used above)

// Object.fromEntries(arr) -> the opposite of entries: turns [key, value] pairs back into an object
const dataOnly = Object.fromEntries(
  Object.entries(student).filter(([k, v]) => typeof v !== 'function')
);
console.log(dataOnly); // student without the functions


// ---------------------------------------------------------------------
// 3. CHECKING WHICH PROPERTIES EXIST
// ---------------------------------------------------------------------
console.log("\n----- 3. Checking Properties -----");

// Object.getOwnPropertyNames(obj) -> ALL string keys, INCLUDING non-enumerable ones
console.log(Object.getOwnPropertyNames(student)); // 'name' shows up!

// Object.getOwnPropertySymbols(obj) -> all keys that are Symbols
const id = Symbol("id");
const user = { [id]: 101, username: "alok" };
console.log(Object.getOwnPropertySymbols(user)); // [ Symbol(id) ]

// Object.hasOwn(obj, key) -> true if the object has that key itself (not inherited)
console.log(Object.hasOwn(student, 'name'));      // true
console.log(Object.hasOwn(student, 'toString'));  // false (inherited from Object.prototype)

// obj.propertyIsEnumerable(key) -> instance method that checks whether a key is enumerable
console.log(student.propertyIsEnumerable('name')); // false
console.log(student.propertyIsEnumerable('age'));  // true


// ---------------------------------------------------------------------
// 4. LOCKING OBJECTS (built on top of descriptors)
// ---------------------------------------------------------------------
//                       add?  delete?  change values?
// preventExtensions      NO     YES      YES
// seal                   NO     NO       YES
// freeze                 NO     NO       NO
// (outside strict mode, a blocked change does nothing and gives no error)
console.log("\n----- 4. Locking Objects -----");

// Object.preventExtensions(obj) / Object.isExtensible(obj)
const box1 = { a: 1 };
Object.preventExtensions(box1);
box1.b = 2;        // ignored
delete box1.a;     // allowed
console.log(box1, Object.isExtensible(box1)); // {} false

// Object.seal(obj) / Object.isSealed(obj)
const box2 = { a: 1 };
Object.seal(box2);
box2.a = 100;      // allowed
box2.b = 2;        // ignored
delete box2.a;     // ignored
console.log(box2, Object.isSealed(box2));     // { a: 100 } true

// Object.freeze(obj) / Object.isFrozen(obj)
const frozenStudent = Object.freeze({ ...dataOnly, address: { city: "Dhaka" } });
frozenStudent.age = 1;               // ignored
frozenStudent.address.city = "CTG";  // WORKS! freeze is SHALLOW (nested objects aren't frozen). *****
console.log(frozenStudent, Object.isFrozen(frozenStudent));


// ---------------------------------------------------------------------
// 5. CREATING AND COPYING OBJECTS
// ---------------------------------------------------------------------
console.log("\n----- 5. Creating & Copying -----");

// Object.assign(target, ...sources) -> copies enumerable properties into target (shallow copy / merge)
const copy = Object.assign({}, student);
console.log(copy); // 'name' NOT copied (non-enumerable)

const merged = Object.assign({}, { a: 1 }, { b: 2 }, { a: 99 });
console.log(merged); // { a: 99, b: 2 } -> later sources win

// Object.create(proto, descriptors?) -> new object with the prototype you choose
const child = Object.create(student);
child.displayMe();          // It's me, sakibnisatalok (inherited)
console.log(child.name);    // sakibnisatalok (found on the prototype)

// NOTE: for deep copies use the global structuredClone(obj) (not an Object method, can't copy functions)
const deep = structuredClone({ x: 1, inner: { y: 2 } });
console.log(deep);


// ---------------------------------------------------------------------
// 6. PROTOTYPES (useful for classes / OOP)
// ---------------------------------------------------------------------
console.log("\n----- 6. Prototypes -----");

// Object.getPrototypeOf(obj) -> returns the object's prototype
console.log(Object.getPrototypeOf(child) === student);          // true
console.log(Object.getPrototypeOf(student) === Object.prototype); // true

// Object.setPrototypeOf(obj, proto) -> changes the prototype (slow, prefer Object.create)
const animal = { speak() { console.log("Some sound..."); } };
const dog = { name: "Tommy" };
Object.setPrototypeOf(dog, animal);
dog.speak(); // Some sound...

// proto.isPrototypeOf(obj) -> is proto anywhere in obj's prototype chain?
console.log(animal.isPrototypeOf(dog));            // true
console.log(Object.prototype.isPrototypeOf(dog));  // true


// ---------------------------------------------------------------------
// 7. OTHER : not useful enough for now.**
// ---------------------------------------------------------------------
console.log("\n----- 7. Other -----");

// Object.is(a, b) -> like ===, but handles NaN and -0 differently
console.log(NaN === NaN, Object.is(NaN, NaN)); // false true
console.log(0 === -0, Object.is(0, -0));       // true false

// Object.groupBy(arr, fn) -> (ES2024, Node 21+) groups array items into an object, fn picks each group's key
const people = [
  { n: 'A', major: 'cs' },
  { n: 'B', major: 'math' },
  { n: 'C', major: 'cs' }
];
if (typeof Object.groupBy === 'function') {
  console.log(Object.groupBy(people, p => p.major)); // { cs: [A, C], math: [B] }
} else {
  console.log("Object.groupBy not supported in this Node version");
}










































