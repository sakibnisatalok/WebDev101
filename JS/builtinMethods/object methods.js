"use strict";

/*
OBJECT METHODS AND OBJECT LITERALS — A JAVASCRIPT REVISION MODULE
===============================================================
Run from the JS folder:
  node "builtinMethods/object methods.js"

Read one numbered section at a time. Independent { ... } blocks keep example
variables separate. Comments beside console.log show the expected values.
This file runs offline. Use a modern runtime for Object.hasOwn, Object.groupBy,
and structuredClone. "use strict" makes rejected assignments throw visibly;
each intentional error is caught so the remaining examples still run.

TWO DIFFERENT MEANINGS OF "OBJECT METHODS"
  user.greet()             A function YOU put on an object as a method.
  Object.keys(user)        A built-in STATIC utility supplied by JavaScript.
  user.hasOwnProperty(...) An inherited Object.prototype method (older style).
  Object.keys is not inherited by user; user.keys() normally does not exist.

CONTENTS
  Foundations: literals, keys, references, this, arrows, getters/setters
  01–07: keys, values, entries, fromEntries, assign, hasOwn, is
  08–13: freeze/isFrozen, seal/isSealed, preventExtensions/isExtensible
  14–16: create, getPrototypeOf, setPrototypeOf
  17–20: defineProperty, defineProperties, getOwnPropertyDescriptor(s)
  21–23: getOwnPropertyNames, getOwnPropertySymbols, groupBy
  24–29: hasOwnProperty, propertyIsEnumerable, isPrototypeOf,
         toString, valueOf, toLocaleString
  Companion APIs: Reflect.ownKeys, structuredClone, JSON.stringify/parse
  Modern syntax: spread/rest, destructuring, optional chaining, in/delete
  Closing examples: async object method, choosing methods, production style

PROPERTY VOCABULARY
  Own: belongs directly to this object.
  Inherited: comes from its prototype chain.
  Enumerable: eligible for operations such as Object.keys and object spread.
  Writable: a DATA property's value can be reassigned.
  Configurable: the property can be deleted or its descriptor changed, subject
    to descriptor rules. A non-configurable, writable data property can still
    have its value changed and can be made non-writable.
  Symbol key: a distinct key value; omitted by keys/values/entries and JSON keys.

DEFAULTS
  Literal data properties are normally writable, enumerable, and configurable.
  Built-in copying utilities copy references to objects/functions, not deep copies.
  Object.keys/values/entries inspect OWN, ENUMERABLE, STRING-KEYED properties.
  Object.assign and object spread copy OWN, ENUMERABLE STRING AND SYMBOL properties.
  Most Object utilities do not take callback functions. Object.groupBy does.
  Getters can execute during reads, including Object.values/entries/assign/spread.

Further reading (these examples and notes are written for this module):
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
  Individual utility pages append /keys, /hasOwn, /freeze, etc. to the Object URL.
*/

// FOUNDATION A: object literal syntax and property access.
{
  const name = "Sakib";
  const dynamicKey = "role";
  const user = {
    name, // Property shorthand: same as name: name.
    age: 20,
    [dynamicKey]: "student", // Computed property key.
    "favorite language": "JavaScript", // Quote keys that contain spaces.
    greet() { return `Hello ${this.name}`; }, // Modern method shorthand.
  };
  console.log(user.name, user["favorite language"]); // "Sakib", "JavaScript"
  console.log(user[dynamicKey]); // "student"
  console.log(user.greet()); // "Hello Sakib"
  console.log(typeof user.greet); // "function": a method is a function value.
  // user.greet gives the function; user.greet() CALLS that function.
  // Objects have named keys. Arrays have numeric indexes and array methods.
}

// FOUNDATION B: object identity, nested objects, and shallow copying.
{
  const user = { name: "Sakib", address: { city: "Dhaka" } };
  const alias = user;
  const copy = { ...user };
  console.log(alias === user, copy === user); // true, false
  console.log(copy.address === user.address); // true: nested reference is shared.
  copy.name = "Mina";
  copy.address.city = "Sylhet";
  console.log(user.name, user.address.city); // "Sakib", "Sylhet"
 // console.log({ id: 1 } === { id: 1 }); // false: two separate objects.
}

// FOUNDATION C: this depends on HOW an ordinary method is called.
// Arrow functions keep the surrounding this; they do not get this from user.greet().
{
  const user = {
    name: "Sakib",
    greet() { return `Hello ${this.name}`; },
  };
  const another = { name: "Mina", greet: user.greet };
  console.log(another.greet()); // "Hello Mina": receiver is another.
  const detached = user.greet;
  try {
    detached(); // Strict mode: this is undefined for this plain function call.
  } catch (error) {
    console.log(error.name); // "TypeError"
  }
  const bound = user.greet.bind(user); // bind is a FUNCTION method, not Object.*.
  console.log(bound()); // "Hello Sakib"
  console.log(user.greet.call({ name: "Rafi" })); // "Hello Rafi": call sets this.

  function buildExample() {
    return {
      name: "object name",
      regular() { return this.name; },
      arrow: () => this.name,
    };
  }
  const example = buildExample.call({ name: "outer name" });
  console.log(example.regular(), example.arrow()); // "object name", "outer name"
  // Use greet() { ... } for an object method needing the receiver's this.
  // Arrows are useful for callbacks that deliberately keep surrounding this.
}

// FOUNDATION D: getters and setters are accessed like properties, not methods.
{
  const user = {
    firstName: "Sakib",
    lastName: "Alok",
    get fullName() { return `${this.firstName} ${this.lastName}`; },
    set fullName(value) {
      const [firstName, ...rest] = value.trim().split(/\s+/);
      this.firstName = firstName;
      this.lastName = rest.join(" ");
    },
  };
  console.log(user.fullName); // "Sakib Alok": reading runs the getter.
  user.fullName = "Mina Rahman"; // Assignment runs the setter.
  console.log(user.firstName, user.lastName); // "Mina", "Rahman"
  // user.fullName() is wrong: the getter result is a string, not a function.
  // Reading a property can therefore execute code. Prefer getters without surprises.
}

// 01. Object.keys(object)
// Purpose: get own, enumerable, STRING keys. Returns: an ARRAY of strings.
// Changes object: NO. Does not include inherited/non-enumerable/symbol keys.
// Functions: an enumerable method name IS a key; the method is not called.
// null/undefined throw; strings are boxed and expose character indexes.
{
  const user = { name: "Sakib", age: 20, greet() { return "hi"; } };
  console.log(Object.keys(user)); // ["name", "age", "greet"]
  console.log(Object.keys({ 10: "ten", 2: "two", name: "label" })); // ["2", "10", "name"]
  // Array-index-like keys come first in ascending numeric order; other string keys
  // follow their property creation order. Do not use this as a general sorting API.
  console.log(Object.keys(["a", "b"])); // ["0", "1"]: arrays are objects too.
  console.log(Object.keys("hi")); // ["0", "1"]
  console.log(Object.keys({}).length); // 0
  try {
    Object.keys(null);
  } catch (error) {
    console.log(error.name); // "TypeError"
  }
}

// 02. Object.values(object)
// Purpose: get values corresponding to Object.keys. Returns: ARRAY.
// Changes object: NO. Nested objects/functions remain original references.
// A getter can run while its value is read; a function VALUE is not called.
{
  console.log(Object.values({ pen: 10, book: 50 })); // [10, 50]
  const item = { price: 10 };
  const greet = () => "hi";
  const values = Object.values({ item, greet });
  console.log(values[0] === item, values[1] === greet); // true, true
  console.log(values[1]()); // "hi": explicitly call the stored function.
  console.log(Object.values({ get double() { return 2 * 3; } })); // [6]
  // To total numeric values, use Object.values(prices).reduce((sum,n) => sum+n, 0).
}

// 03. Object.entries(object)
// Purpose: get [key, value] pairs for own enumerable string properties.
// Returns: ARRAY of pairs. Changes object: NO. Values preserve references.
// Useful with destructuring in for...of or array callbacks.
{
  const scores = { Sakib: 10, Mina: 20 };
  console.log(Object.entries(scores)); // [["Sakib", 10], ["Mina", 20]]
  console.log(Object.entries(scores).map(([name, score]) => `${name}=${score}`));
  // ["Sakib=10", "Mina=20"]
  const user = { name: "Sakib" };
  const pairs = Object.entries({ user });
  console.log(pairs[0][1] === user); // true
  // Entries omit symbol/non-enumerable/inherited keys just like keys and values.
}

// 04. Object.fromEntries(iterableOfPairs)
// Purpose: convert [key, value] pairs INTO an object. Returns: NEW plain object.
// Changes input: NO. Accepts a Map, pair array, or other iterable of pair objects.
// Duplicate keys: later pair wins. Symbol keys are supported. Values stay referenced.
// It expects pairs, not a callback; use map/filter on the entries first.
{
  console.log(Object.fromEntries([["name", "Sakib"], ["age", 20]])); // { name: "Sakib", age: 20 }
  console.log(Object.fromEntries([["id", 1], ["id", 2]])); // { id: 2 }
  const prices = { pen: 10, book: 50 };
  const increased = Object.fromEntries(
    Object.entries(prices).map(([key, value]) => [key, value * 2]),
  );
  console.log(increased); // { pen: 20, book: 100 }
  const user = { id: 1 };
  const greet = () => "hi";
  const result = Object.fromEntries(new Map([["user", user], ["greet", greet]]));
  console.log(result.user === user, result.greet()); // true, "hi"
  try {
    Object.fromEntries(["name"]); // An iterable of strings is not an iterable of entry objects.
  } catch (error) {
    console.log(error.name); // "TypeError"
  }
}

// 05. Object.assign(target, ...sources)
// Purpose: copy own enumerable string AND symbol properties into target.
// Returns: TARGET itself. Changes target: YES. Later sources overwrite earlier ones.
// It is SHALLOW: object/function values retain references. Source getters and
// target setters can execute. Assignment copies current values, not descriptors.
// null/undefined target throws; null/undefined sources are skipped.
{
  const target = { theme: "light" };
  const same = Object.assign(target, { theme: "dark", language: "en" });
  console.log(target); // { theme: "dark", language: "en" }
  console.log(same === target); // true
  const original = { nested: { score: 1 }, greet() { return "hi"; } };
  const copy = Object.assign({}, original);
  console.log(copy.nested === original.nested, copy.greet === original.greet); // true, true
  console.log(Object.assign({}, { a: 1 }, null, undefined, { a: 2 })); // { a: 2 }
  let captured = 0;
  const receiver = { set score(value) { captured = value; } };
  Object.assign(receiver, { score: 10 });
  console.log(captured); // 10: setter was called.
  // For a fresh object, {...original, changed: value} is often easier to read.
  // Object.assign is appropriate when you deliberately want to update a target.
}

// 06. Object.hasOwn(object, key)
// Purpose: test for an OWN property. Returns: boolean. Changes object: NO.
// Counts properties whose values are undefined/null and non-enumerable/symbol keys.
// Works with null-prototype objects and objects that override hasOwnProperty.
// Compare with `key in object`, which includes the prototype chain.
{
  const defaults = { theme: "light" };
  const settings = Object.create(defaults);
  settings.language = "en";
  settings.optional = undefined;
  console.log(Object.hasOwn(settings, "language")); // true
  console.log(Object.hasOwn(settings, "theme")); // false: inherited.
  console.log("theme" in settings); // true
  console.log(Object.hasOwn(settings, "optional")); // true: exists with undefined value.
  const dictionary = Object.create(null);
  dictionary.hasOwnProperty = "ordinary data";
  console.log(Object.hasOwn(dictionary, "hasOwnProperty")); // true
  // Checking object.key !== undefined cannot distinguish absence from an undefined value.
}

// 07. Object.is(valueA, valueB)
// Purpose: compare SAME VALUE, not deep contents. Returns: boolean.
// Changes values: NO. Unlike ===, NaN equals NaN and +0 differs from -0.
// Objects/functions: equal only when both values reference the same object/function.
{
  console.log(Object.is(NaN, NaN)); // true
  console.log(NaN === NaN); // false
  console.log(Object.is(0, -0), 0 === -0); // false, true
  const user = { id: 1 };
  const greet = () => "hi";
  console.log(Object.is(user, user), Object.is(user, { id: 1 })); // true, false
  console.log(Object.is(greet, greet)); // true
  // Object.is({id:1}, {id:1}) is not a deep-equality test.
}

// 08. Object.freeze(object)
// Purpose: prevent adding/deleting own properties and make DATA properties
// non-writable/non-configurable. Returns: SAME object. Changes object: YES.
// SHALLOW: nested objects remain mutable unless separately frozen.
// Functions: freezes their own properties, not the ability to call them.
// Accessor setters can still have effects; freeze is not a general deep-state lock.
{
  const user = Object.freeze({ name: "Sakib", address: { city: "Dhaka" } });
  try {
    user.name = "Mina";
  } catch (error) {
    console.log(error.name); // "TypeError": strict-mode write to frozen property.
  }
  user.address.city = "Sylhet";
  console.log(user.address.city); // "Sylhet": nested object was not frozen.
  const greet = Object.freeze(() => "hi");
  console.log(greet()); // "hi"
  const list = Object.freeze([1, 2]);
  try {
    list.push(3);
  } catch (error) {
    console.log(error.name); // "TypeError"
  }
  // Freezing a Map/Set object does not freeze entries kept in its internal storage.
}

// 09. Object.isFrozen(object)
// Purpose: inspect whether its own property structure satisfies freeze rules.
// Returns: boolean. Changes object: NO. Does not recursively inspect nested objects.
{
  const config = Object.freeze({ nested: { value: 1 } });
  console.log(Object.isFrozen(config)); // true
  console.log(Object.isFrozen(config.nested)); // false
  console.log(Object.isFrozen({})); // false: new plain object is extensible.
  console.log(Object.isFrozen(42)); // true: primitives cannot gain/change properties.
}

// 10. Object.seal(object)
// Purpose: stop adding/deleting own properties; make them non-configurable.
// Returns: SAME object. Changes object: YES. Existing writable values CAN change.
// Nested objects are unaffected. Functions remain callable; their own property
// structure is sealed. A sealed object is not necessarily frozen.
{
  const user = Object.seal({ name: "Sakib" });
  user.name = "Mina";
  console.log(user.name); // "Mina"
  try {
    user.age = 20;
  } catch (error) {
    console.log(error.name); // "TypeError": cannot add a new property.
  }
  try {
    delete user.name;
  } catch (error) {
    console.log(error.name); // "TypeError": cannot delete a non-configurable property.
  }
}

// 11. Object.isSealed(object)
// Purpose: inspect whether the object is non-extensible with non-configurable
// own properties. Returns: boolean. Changes object: NO. No deep inspection.
{
  const sealed = Object.seal({ value: 1 });
  console.log(Object.isSealed(sealed), Object.isFrozen(sealed)); // true, false
  console.log(Object.isSealed(Object.freeze({ value: 1 }))); // true: frozen implies sealed.
  console.log(Object.isSealed({ value: 1 })); // false
}

// 12. Object.preventExtensions(object)
// Purpose: stop NEW own properties from being added.
// Returns: SAME object. Changes object: YES. Existing properties may still be
// writable/deletable, depending on their descriptors. Does not affect nested objects.
// A non-extensible object's prototype cannot be changed to a different prototype.
{
  const user = Object.preventExtensions({ name: "Sakib", age: 20 });
  user.name = "Mina";
  delete user.age;
  console.log(user); // { name: "Mina" }
  try {
    user.active = true;
  } catch (error) {
    console.log(error.name); // "TypeError"
  }
  // You cannot undo preventExtensions/seal/freeze on the same object. Create a
  // fresh object if you need a normally writable/extensible container again.
}

// 13. Object.isExtensible(object)
// Purpose: ask whether NEW own properties can be added.
// Returns: boolean. Changes object: NO. Does not test individual property writability.
{
  const user = { name: "Sakib" };
  console.log(Object.isExtensible(user)); // true
  Object.preventExtensions(user);
  console.log(Object.isExtensible(user)); // false
  console.log(Object.isExtensible(42)); // false: primitive.
  console.log(Object.isExtensible(() => "hi")); // true: ordinary functions are objects.
}

// 14. Object.create(prototype, propertyDescriptors?)
// Purpose: create a NEW object with a chosen prototype (object or null).
// Returns: new object. Changes prototype object: NO. Does not call a constructor.
// Optional second argument contains DESCRIPTORS, not ordinary property values.
// Inherited methods remain shared; calling them uses the child as this.
{
  const shared = { greet() { return `Hi ${this.name}`; } };
  const user = Object.create(shared);
  user.name = "Sakib";
  console.log(user.greet()); // "Hi Sakib"
  console.log(Object.keys(user)); // ["name"]: greet is inherited.
  const dictionary = Object.create(null);
  dictionary.toString = "a key, not an inherited function";
  console.log(Object.hasOwn(dictionary, "toString")); // true
  console.log(Object.getPrototypeOf(dictionary)); // null
  // Null-prototype dictionaries do not inherit toString/hasOwnProperty, etc.
  // Use Object.hasOwn. A Map is also useful for collections with dynamic keys.
}

// 15. Object.getPrototypeOf(object)
// Purpose: read an object's immediate prototype. Returns: object or null.
// Changes object: NO. Prefer this to reading the legacy __proto__ property.
{
  console.log(Object.getPrototypeOf({}) === Object.prototype); // true
  console.log(Object.getPrototypeOf([]) === Array.prototype); // true
  console.log(Object.getPrototypeOf(() => "hi") === Function.prototype); // true
  const shared = { role: "student" };
  console.log(Object.getPrototypeOf(Object.create(shared)) === shared); // true
  // This does not give a snapshot/copy of the prototype; it returns the actual reference.
}

// 16. Object.setPrototypeOf(object, prototype)
// Purpose: change an existing object's prototype. Returns: SAME object.
// Changes object: YES. Prototype must be object/null; cycles and forbidden changes throw.
// Advanced: usually choose the prototype at creation with Object.create instead.
// Changing prototypes after creation can interfere with runtime optimizations.
{
  const shared = { greet() { return `Hi ${this.name}`; } };
  const user = { name: "Sakib" };
  console.log(Object.setPrototypeOf(user, shared) === user); // true
  console.log(user.greet()); // "Hi Sakib"
  try {
    Object.setPrototypeOf(Object.freeze({}), shared);
  } catch (error) {
    console.log(error.name); // "TypeError"
  }
  // Do not use prototype modification as a normal substitute for composing data.
}

// 17. Object.defineProperty(object, key, descriptor)
// Purpose: add/configure ONE property with precise flags or get/set functions.
// Returns: SAME object. Changes object: YES. For a NEW descriptor-defined property,
// writable/enumerable/configurable default to FALSE if omitted.
// Data descriptors use value/writable; accessors use get/set. Do not mix both kinds.
// Existing non-configurable properties have restrictions on permitted changes.
{
  const user = {};
  Object.defineProperty(user, "id", { value: 1 });
  console.log(user.id, Object.keys(user)); // 1, []: id is not enumerable.
  try {
    user.id = 2;
  } catch (error) {
    console.log(error.name); // "TypeError": not writable.
  }
  Object.defineProperty(user, "name", {
    value: "Sakib", writable: true, enumerable: true, configurable: true,
  });
  console.log(Object.keys(user)); // ["name"]
  Object.defineProperty(user, "greet", {
    value() { return `Hi ${this.name}`; }, enumerable: false,
  });
  console.log(user.greet()); // "Hi Sakib": function value stored, not executed during definition.
}

// 18. Object.defineProperties(object, descriptors)
// Purpose: add/configure MULTIPLE descriptor-defined properties.
// Returns: SAME object. Changes object: YES. Same descriptor rules as defineProperty.
// A getter is installed as a function and executed later when the property is read.
{
  const person = {};
  Object.defineProperties(person, {
    firstName: { value: "Sakib", writable: true, enumerable: true, configurable: true },
    lastName: { value: "Alok", writable: true, enumerable: true, configurable: true },
    fullName: { get() { return `${this.firstName} ${this.lastName}`; }, enumerable: true },
  });
  console.log(person.fullName); // "Sakib Alok"
  person.firstName = "Rafi";
  console.log(person.fullName); // "Rafi Alok": getter uses current properties.
}

// 19. Object.getOwnPropertyDescriptor(object, key)
// Purpose: inspect ONE own property's descriptor.
// Returns: descriptor OBJECT, or undefined if not own/present. Changes object: NO.
// Returns flags and value/get/set without executing the getter. Editing the
// returned descriptor does not change the original property until you define it again.
{
  const user = { name: "Sakib" };
  const info = Object.getOwnPropertyDescriptor(user, "name");
  console.log(info.value, info.writable, info.enumerable, info.configurable); // "Sakib", true, true, true
  info.value = "Mina";
  console.log(user.name); // "Sakib"
  console.log(Object.getOwnPropertyDescriptor(user, "missing")); // undefined
  let reads = 0;
  const sample = { get score() { reads += 1; return 10; } };
  const accessor = Object.getOwnPropertyDescriptor(sample, "score");
  console.log(typeof accessor.get, reads); // "function", 0: getter did not run.
}

// 20. Object.getOwnPropertyDescriptors(object)
// Purpose: inspect ALL own properties, including non-enumerable and symbol keys.
// Returns: object mapping keys to descriptors. Changes object: NO. No getter reads.
// Useful with Object.create to copy descriptors/prototype, rather than just values.
// This is still a SHALLOW copy: nested values and get/set functions are shared.
{
  const original = { nested: { score: 1 }, get name() { return "Sakib"; } };
  const descriptors = Object.getOwnPropertyDescriptors(original);
  console.log(typeof descriptors.name.get); // "function"
  const copy = Object.create(Object.getPrototypeOf(original), descriptors);
  console.log(copy.name, copy.nested === original.nested); // "Sakib", true
  // In contrast, {...original} reads name's getter and stores its current returned
  // value as a data property; the copy no longer has the original getter.
}

// 21. Object.getOwnPropertyNames(object)
// Purpose: get ALL own STRING keys, including non-enumerable ones.
// Returns: array of strings. Changes object: NO. Symbols still omitted.
// Function objects have own properties too, including name and length.
{
  const user = { name: "Sakib" };
  Object.defineProperty(user, "hidden", { value: 42 });
  console.log(Object.keys(user)); // ["name"]
  console.log(Object.getOwnPropertyNames(user)); // ["name", "hidden"]
  console.log(Object.getOwnPropertyNames([10, 20])); // ["0", "1", "length"]
  const greet = () => "hi";
  console.log(Object.getOwnPropertyNames(greet).includes("name")); // true
}

// 22. Object.getOwnPropertySymbols(object)
// Purpose: get ALL own SYMBOL keys, whether enumerable or not.
// Returns: array of symbols. Changes object: NO. Does not include string keys.
// Symbols with identical descriptions still have different identities.
{
  const token = Symbol("token");
  const user = { name: "Sakib", [token]: "abc" };
  const symbols = Object.getOwnPropertySymbols(user);
  console.log(symbols.length, symbols[0] === token); // 1, true
  console.log(user[symbols[0]]); // "abc"
  console.log(Object.keys(user)); // ["name"]
  console.log(Symbol("token") === token); // false
  // Symbol keys are not privacy/access-control mechanisms; this method discovers them.
}

// 23. Object.groupBy(iterable, callback) — ES2024
// Purpose: group items into arrays under keys chosen by the callback.
// Returns: NEW object with a NULL prototype. Changes input collection: NO.
// Callback: (item, index); return a string/symbol key (other values convert to keys).
// Items retain their original references. Callback is synchronous; async callbacks
// return Promises that become keys instead of awaited grouping decisions.
// For grouping with arbitrary object-identity keys, consider Map.groupBy instead.
{
  const users = [
    { name: "Sakib", role: "student" },
    { name: "Mina", role: "teacher" },
    { name: "Rafi", role: "student" },
  ];
  const grouped = Object.groupBy(users, user => user.role);
  console.log(Object.keys(grouped)); // ["student", "teacher"]
  console.log(grouped.student.map(user => user.name)); // ["Sakib", "Rafi"]
  console.log(grouped.student[0] === users[0]); // true
  console.log(Object.getPrototypeOf(grouped)); // null
  console.log(Object.hasOwn(grouped, "student")); // true
  console.log(Object.keys(Object.groupBy([], () => "empty"))); // []
  // grouped.hasOwnProperty(...) is not available on its null prototype; use hasOwn.
  // Check typeof Object.groupBy === "function" if your supported runtimes vary.
}

// 24. hasOwnProperty(key) — INHERITED instance method; learn to recognize older code.
// Purpose: test own properties. Returns: boolean. Changes object: NO.
// Can be shadowed and is absent on null-prototype objects. Prefer Object.hasOwn.
{
  const user = { name: "Sakib" };
  console.log(user.hasOwnProperty("name")); // true
  console.log(user.hasOwnProperty("toString")); // false: inherited.
  const data = { hasOwnProperty: "ordinary value", name: "Mina" };
  console.log(Object.hasOwn(data, "name")); // true
  console.log(Object.prototype.hasOwnProperty.call(data, "name")); // true: older safe pattern.
  // data.hasOwnProperty("name") would throw because the own property is a string.
}

// 25. propertyIsEnumerable(key) — inherited instance method.
// Purpose: ask whether a property is OWN AND ENUMERABLE, including symbol keys.
// Returns: boolean. Changes object: NO. Use the prototype method with .call if
// the receiver might shadow it or have no Object.prototype.
{
  const user = { name: "Sakib" };
  Object.defineProperty(user, "id", { value: 1 });
  console.log(Object.prototype.propertyIsEnumerable.call(user, "name")); // true
  console.log(Object.prototype.propertyIsEnumerable.call(user, "id")); // false
  console.log(Object.prototype.propertyIsEnumerable.call(user, "toString")); // false
  // Object.getOwnPropertyDescriptor(user, key)?.enumerable ?? false is another option.
}

// 26. isPrototypeOf(object) — inherited instance method.
// Purpose: test whether this object occurs ANYWHERE in another object's prototype chain.
// Returns: boolean. Changes objects: NO. An object is not its own prototype.
// Do not confuse this with getPrototypeOf, which only reads the immediate prototype.
{
  const shared = { greet() { return "hi"; } };
  const parent = Object.create(shared);
  const child = Object.create(parent);
  console.log(Object.prototype.isPrototypeOf.call(shared, child)); // true
  console.log(Object.getPrototypeOf(child) === shared); // false: direct prototype is parent.
  console.log(Object.prototype.isPrototypeOf.call(shared, shared)); // false
}

// 27. toString() / Object.prototype.toString.call(value)
// Purpose: ordinary object string conversion, or a broad type tag with .call.
// Returns: string. Changes object: NO. Plain-object default is "[object Object]".
// Arrays/functions override toString; function toString shows source, not its result.
// A type tag can be customized by Symbol.toStringTag; it is not a universal type test.
{
  console.log(({ name: "Sakib" }).toString()); // "[object Object]"
  console.log(Object.prototype.toString.call([])); // "[object Array]"
  console.log(Object.prototype.toString.call(null)); // "[object Null]"
  console.log(Object.prototype.toString.call(() => "hi")); // "[object Function]"
  const item = {
    name: "Pen",
    toString() { return this.name; },
  };
  console.log(String(item)); // "Pen": explicit string conversion uses custom method.
  // For actual object data in JSON format, use JSON.stringify instead.
}

// 28. valueOf()
// Purpose: participate in primitive conversion. Plain Object's default returns
// the object itself; wrapper/date objects have different implementations.
// Returns: depends on receiver's method. Changes object: NO unless custom code does.
// Usually implicit in conversion; define only when you deliberately need this behavior.
{
  const user = { name: "Sakib" };
  console.log(user.valueOf() === user); // true
  const amount = {
    value: 10,
    valueOf() { return this.value; },
  };
  console.log(Number(amount)); // 10
  console.log(amount + 5); // 15
  // Symbol.toPrimitive is a more explicit advanced conversion hook.
}

// 29. toLocaleString()
// Purpose: locale-oriented string conversion. Plain Object's default delegates
// to this.toString(). Returns: string. Changes object: NO unless custom code does.
// Number/Date/Array implementations provide different, more useful locale behavior.
{
  console.log(({ name: "Sakib" }).toLocaleString()); // "[object Object]"
  const item = { toString() { return "Pen"; } };
  console.log(item.toLocaleString()); // "Pen"
  console.log((1234).toLocaleString("en-US")); // "1,234": NUMBER method, not Object's default.
}

// COMPANION API A: Reflect.ownKeys(object) — not an Object.* method.
// Returns all own string AND symbol keys, including non-enumerable properties.
{
  const token = Symbol("token");
  const user = { name: "Sakib", [token]: "abc" };
  Object.defineProperty(user, "hidden", { value: 1 });
  const all = Reflect.ownKeys(user);
  console.log(all.length, all[0], all[1], all[2] === token); // 3, "name", "hidden", true
}

// COMPANION API B: structuredClone(value) — runtime API, not Object.*.
// Purpose: deep-copy supported data, including nested objects, arrays, Map, Set,
// Date, and cycles. Returns: independent clone. Does not clone functions; unsupported
// values throw DataCloneError. Does not generally preserve custom prototypes,
// descriptors, or accessor functions. A clone is not a copy of arbitrary object behavior.
// Getters may run when their current values are read for cloning.
{
  const original = { address: { city: "Dhaka" }, tags: ["JS"] };
  const copy = structuredClone(original);
  copy.address.city = "Sylhet";
  console.log(original.address.city, copy.address.city); // "Dhaka", "Sylhet"
  console.log(copy.tags === original.tags); // false
  const cyclic = {};
  cyclic.self = cyclic;
  const clonedCycle = structuredClone(cyclic);
  console.log(clonedCycle.self === clonedCycle); // true
  try {
    structuredClone({ greet() { return "hi"; } });
  } catch (error) {
    console.log(error.name); // "DataCloneError"
  }
}

// COMPANION API C: JSON.stringify / JSON.parse — serialization, not Object methods.
// stringify produces JSON TEXT; parse reads valid JSON text into JS data.
// JSON supports a restricted set of data; this is not a general deep-clone technique.
{
  const user = { name: "Sakib", age: 20 };
  const text = JSON.stringify(user);
  console.log(text); // '{"name":"Sakib","age":20}'
  console.log(JSON.parse(text)); // { name: "Sakib", age: 20 }
  console.log(JSON.stringify({ value: undefined, greet() {}, score: NaN })); // '{"score":null}'
  console.log(JSON.stringify([undefined, () => "hi", NaN])); // "[null,null,null]"
  // Object properties containing undefined/functions/symbol values are omitted.
  // Such array elements become null. NaN/Infinity become null. BigInt usually throws
  // unless a custom serialization path handles it. Symbol-keyed properties are omitted.
  const cycle = {};
  cycle.self = cycle;
  try {
    JSON.stringify(cycle);
  } catch (error) {
    console.log(error.name); // "TypeError": cyclic data.
  }
  try {
    JSON.parse("{name: 'Sakib'}");
  } catch (error) {
    console.log(error.name); // "SyntaxError": JSON requires double-quoted property names/strings.
  }
  // JSON has no methods/comments/undefined literals; an object literal is JS source,
  // not automatically valid JSON text. parse does not execute method/function code.
}

// MODERN SYNTAX A: object spread, rest, and destructuring — syntax, not methods.
{
  const user = { name: "Sakib", age: 20, address: { city: "Dhaka" } };
  const updated = { ...user, age: 21 }; // Later property wins.
  console.log(updated.age, user.age); // 21, 20
  console.log(updated.address === user.address); // true: shallow copy.
  const { name: displayName, role = "student", ...remaining } = user;
  console.log(displayName, role); // "Sakib", "student"
  console.log(Object.keys(remaining)); // ["age", "address"]
  // Rest copies remaining own enumerable properties; it does not delete from user.
  // A destructuring default applies to undefined, not null.
  console.log(({ role: null }).role ?? "student"); // "student": nullish coalescing handles null too.
  const replacement = { ...user, address: { ...user.address, city: "Sylhet" } };
  console.log(replacement.address.city, user.address.city); // "Sylhet", "Dhaka"
}

// MODERN SYNTAX B: optional chaining ?. and nullish coalescing ??.
{
  const user = { score: 0 };
  console.log(user.address?.city ?? "Unknown"); // "Unknown"
  console.log(user.score ?? 100); // 0: preserves valid zero.
  console.log(user.score || 100); // 100: || replaces every falsy value.
  console.log(user.greet?.()); // undefined: missing method is not called.
  // ?.() only guards null/undefined; if greet exists but is a number, calling still throws.
}

// MODERN SYNTAX C: in and delete — operators, not methods.
{
  const shared = { role: "student" };
  const user = Object.create(shared);
  user.name = "Sakib";
  user.optional = undefined;
  console.log("role" in user, Object.hasOwn(user, "role")); // true, false
  console.log(delete user.name); // true: own configurable property removed.
  console.log(Object.hasOwn(user, "name")); // false
  console.log(delete user.role); // true: no own property to remove.
  console.log(user.role); // "student": inherited property is still there.
  console.log(Object.hasOwn(user, "optional")); // true: undefined is not deletion.
  // `delete` on an array index creates a hole; use array.splice for list removal.
  // To omit a property without modifying source: const { omitted, ...rest } = source.
}

// ASYNC OBJECT METHOD: method shorthand can also use async/await.
const repositoryExample = {
  users: [{ id: 1, name: "Sakib" }, { id: 2, name: "Mina" }],
  async findById(id) {
    // A local Promise stands in for database/network work so this example is offline.
    const rows = await Promise.resolve(this.users);
    return rows.find(user => user.id === id);
  },
};

async function demonstrateObjectAsyncMethod() {
  const pending = repositoryExample.findById(1);
  console.log("Async method returns Promise:", pending instanceof Promise); // true
  const user = await pending;
  console.log("Awaited user name:", user.name); // "Sakib"
  console.log("Same stored object:", user === repositoryExample.users[0]); // true
  console.log("Missing user:", await repositoryExample.findById(99)); // undefined
  // async returns a Promise even though the successful value is an ordinary object.
}

demonstrateObjectAsyncMethod().catch(error => console.error(error));

/*
CHOOSING A METHOD DURING REVISION
  Need property names / values / both?     Object.keys / Object.values / Object.entries
  Need an object from key/value pairs?     Object.fromEntries
  Need own-property existence?             Object.hasOwn
  Need to merge into an existing target?   Object.assign
  Need a fresh shallow record?             {...object, changedProperty: value}
  Need to group array data?                Object.groupBy (check runtime support)
  Need to restrict own-property edits?      freeze / seal / preventExtensions
  Need property flags or getter functions? getOwnPropertyDescriptor(s)
  Need to define flags/accessors?          defineProperty / defineProperties
  Need all own keys, including symbols?    Reflect.ownKeys
  Need a prototype at creation time?       Object.create
  Need independent nested data?            structuredClone (supported data only)
  Need JSON text / data from JSON text?    JSON.stringify / JSON.parse

MODERN STYLE IN THIS FOLDER
  const/let, object method shorthand, arrow callbacks, destructuring, spread,
  template literals, optional chaining, ??, and async/await are modern syntax.
  Named function declarations are also current; arrows are not a universal replacement.
  Object.hasOwn is preferable for ordinary own-property checks; prototype utilities
  and older instance methods are included here so you understand existing code.
  These three files are executable revision notes, not reusable ES module exports.
  Production projects normally organize application behavior into focused functions
  and modules, use consistent formatting/linting, and test behavior separately.
  Runtime support matters independently of syntax: newer methods require that API
  to exist; a syntax transformation alone does not supply missing built-in methods.

Industry style references (teams choose their own conventions):
  https://google.github.io/styleguide/jsguide.html
  https://github.com/airbnb/javascript
*/
