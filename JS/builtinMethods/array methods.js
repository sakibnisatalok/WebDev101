
/*

ARRAY METHODS — A JAVASCRIPT REVISION MODULE
===========================================
Run from the JS folder:
  node "builtinMethods/array methods.js"

Read one numbered section at a time. Each { ... } block has its own variables,
so you can run this whole file without repeated-variable errors. Expected results
are written beside console.log calls. Everything runs offline, without packages.
Use a modern JavaScript runtime for at(), findLast(), and the ES2023 copy methods.

CONTENTS
  Foundations: indexes, length, references, callbacks, sparse arrays
  01–04: push, pop, unshift, shift
  05–08: at, includes, indexOf, lastIndexOf
  09–12: find, findIndex, findLast, findLastIndex
  13–19: forEach, map, filter, reduce, reduceRight, some, every
  20–24: slice, splice, concat, join, toString
  25–28: sort, toSorted, reverse, toReversed
  29–34: flat, flatMap, fill, copyWithin, toSpliced, with
  35–37: keys, values, entries
  38–40: Array.isArray, Array.from, Array.of
  Closing examples: chaining, async callbacks, choosing a method

QUICK RULES
  Changes the original array:
    push, pop, unshift, shift, splice, sort, reverse, fill, copyWithin
  Creates a new array:
    map, filter, slice, concat, flat, flatMap,
    toSorted, toReversed, toSpliced, with, Array.from, Array.of
  Array methods do not automatically deep-copy objects or execute stored functions.
  A method that does not change the array can still run YOUR callback, which may
  change an object inside it. "New array" does not always mean "new elements".
  .length is a property; write items.length, not items.length().
  Plain objects do not have map/filter/slice methods. Examples below use ARRAYS
  containing objects. Use Object.values(object) or Object.entries(object) when
  you want to apply array methods to a plain object's properties.

Further reading (the examples and notes here are written for this module):
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  Individual method pages append /map, /filter, /reduce, etc. to that URL.
  
*/

// FOUNDATIONS A: indexes, length, and const.
{
  const names = ["Sakib", "Mina", "Rafi"];
  console.log(names[0]); // "Sakib": indexing starts at zero.
  console.log(names.length); // 3
  console.log(names[names.length - 1]); // "Rafi"
  console.log(names[99]); // undefined: reading past the end does not throw.
  names.push("Nila"); // Allowed: const keeps the variable's reference fixed.
  // names = []; // TypeError: reassignment of a const variable.
  console.log(names.length); // 4
}

// FOUNDATIONS B: objects and functions are compared by identity.
{
  const user = { name: "Sakib" };
  const greet = () => "hello";
  const items = [user, greet];
  const copy = items.slice();
  console.log(copy === items); // false: two different arrays.
  console.log(copy[0] === user); // true: the same object is in both arrays.
  console.log(copy[1] === greet); // true: the same function is in both arrays.
  copy[0].name = "Mina";
  console.log(items[0].name); // "Mina": the object was shared.
  console.log(copy[1]()); // "hello": YOU must call the stored function.
  const scores = { Sakib: 10, Mina: 20 };
  console.log(Object.values(scores).map(score => score * 2)); // [20, 40]
  console.log(Object.entries(scores).map(([name, score]) => `${name}: ${score}`));
  // ["Sakib: 10", "Mina: 20"]
}

// FOUNDATIONS C: callback means "a function passed to another function".
{
  function double(number) {
    return number * 2;
  }
  console.log([2, 4].map(double)); // [4, 8]: pass the function itself.
  // [2, 4].map(double()); // Wrong: double() runs now and returns NaN,
  //                       // which is not a callback function: TypeError.
  console.log([2, 4].map((value, index) => value + index)); // [2, 5]
  // Most iteration callbacks receive (value, index, originalArray).
  // reduce receives (accumulator, value, index, originalArray).
  // sort receives (a, b). Check the signature before reusing a function.
}

// FOUNDATIONS D: a hole (missing element) differs from an actual undefined value.
{
  const sparse = [10, , 30];
  console.log(sparse.length); // 3
  console.log(1 in sparse); // false: index 1 does not exist.
  console.log(1 in [10, undefined, 30]); // true
  console.log(sparse.map(value => value * 2)); // [20, <empty slot>, 60]
  console.log(sparse.filter(() => true)); // [10, 30]
  console.log(sparse.includes(undefined)); // true: includes treats a hole as undefined.
  console.log(sparse.indexOf(undefined)); // -1: indexOf skips holes.
  // forEach/map/filter/reduce/some/every skip missing indexes.
  // find/findIndex/findLast/findLastIndex visit holes as undefined.
  // Avoid accidentally creating holes with delete items[index]; use splice instead.
}

// 01. push(...items)
// Purpose: add one or more items to the END.
// Returns: the NEW LENGTH, not the array. Changes original: YES.
// Objects/functions: their references are added; functions are not called.
{
  const fruits = ["apple", "banana"];
  console.log(fruits.push("mango", "orange")); // 4
  console.log(fruits); // ["apple", "banana", "mango", "orange"]
  const user = { id: 1 };
  const greet = () => "hi";
  const queue = [];
  queue.push(user, greet);
  console.log(queue[0] === user, queue[1]()); // true, "hi"
  // queue.push([1, 2]) adds ONE nested array; queue.push(...[1, 2]) adds two items.
}

// 02. pop()
// Purpose: remove the LAST item. Returns: removed item. Changes original: YES.
// Empty array: returns undefined. An undefined element also returns undefined.
// Objects/functions: the returned item is the original reference.
{
  const numbers = [10, 20, 30];
  console.log(numbers.pop()); // 30
  console.log(numbers); // [10, 20]
  console.log([].pop()); // undefined
  const task = () => "task completed";
  const tasks = [task];
  const removed = tasks.pop();
  console.log(removed === task, removed()); // true, "task completed"
}

// 03. unshift(...items)
// Purpose: add items to the START. Returns: new length. Changes original: YES.
// Objects/functions: stores references. Existing items move to later indexes.
{
  const numbers = [3, 4];
  console.log(numbers.unshift(1, 2)); // 4
  console.log(numbers); // [1, 2, 3, 4]
  const users = [{ id: 2 }];
  users.unshift({ id: 1 });
  console.log(users.map(user => user.id)); // [1, 2]
  // unshift(1, 2) preserves that argument order.
  // unshift(1); unshift(2); would produce [2, 1, ...].
}

// 04. shift()
// Purpose: remove the FIRST item. Returns: removed item. Changes original: YES.
// Empty array: undefined. Objects/functions: returns the original reference.
{
  const waiting = ["Sakib", "Mina", "Rafi"];
  console.log(waiting.shift()); // "Sakib"
  console.log(waiting); // ["Mina", "Rafi"]
  console.log([].shift()); // undefined
  const jobs = [() => "first job", () => "second job"];
  const nextJob = jobs.shift();
  console.log(nextJob()); // "first job"
}

// 05. at(index)
// Purpose: read an item, including from the end using a negative index.
// Returns: item or undefined. Changes original: NO. No callback is accepted.
// Objects/functions: returns the stored reference.
{
  const numbers = [10, 20, 30];
  console.log(numbers.at(0), numbers.at(-1), numbers.at(-2)); // 10, 30, 20
  console.log(numbers.at(99)); // undefined
  console.log(numbers[-1]); // undefined: bracket notation does not count backwards.
  const users = [{ name: "Sakib" }, { name: "Mina" }];
  console.log(users.at(-1).name); // "Mina"
  // [].at(-1).name throws: at() gave undefined. Use ?.name when absence is allowed.
  console.log([].at(-1)?.name); // undefined
}

// 06. includes(value, fromIndex = 0)
// Purpose: ask whether a particular VALUE exists. Returns: boolean.
// Changes original: NO. Finds NaN; +0 and -0 count as equal.
// Objects/functions: compares identity, not matching properties or function code.
{
  console.log([1, 2, 3].includes(2)); // true
  console.log([1, 2, 3].includes("2")); // false: no string-to-number conversion.
  console.log([NaN].includes(NaN)); // true
  console.log([1, 2, 3].includes(1, -2)); // false: start at index 1.
  const user = { id: 1 };
  const greet = () => "hi";
  console.log([user].includes(user)); // true
  console.log([user].includes({ id: 1 })); // false: a different object.
  console.log([greet].includes(greet)); // true
  // To search an object's properties, use some() or find().
}

// 07. indexOf(value, fromIndex = 0)
// Purpose: get the FIRST index of a value. Returns: index or -1.
// Changes original: NO. Uses strict equality, so NaN is not found.
// Objects/functions: same-reference matching; no predicate callback.
{
  console.log(["a", "b", "a"].indexOf("a")); // 0
  console.log(["a", "b", "a"].indexOf("a", 1)); // 2
  console.log(["a", "b"].indexOf("z")); // -1
  console.log([NaN].indexOf(NaN)); // -1
  const user = { id: 1 };
  console.log([user].indexOf(user)); // 0
  // WRONG: if (items.indexOf(value)) ...
  // Index 0 is falsy, and -1 is truthy! Compare with !== -1 instead.
}

// 08. lastIndexOf(value, fromIndex = array.length - 1)
// Purpose: search BACKWARDS for a value. Returns: index or -1.
// Changes original: NO. Same identity/NaN rules as indexOf.
{
  const letters = ["a", "b", "a", "c"];
  console.log(letters.lastIndexOf("a")); // 2
  console.log(letters.lastIndexOf("a", 1)); // 0
  console.log(letters.lastIndexOf("z")); // -1
  const fn = () => "hello";
  console.log([fn, 1, fn].lastIndexOf(fn)); // 2
  // fromIndex sets the starting point; the search moves toward index 0.
}

// 09. find(callback, thisArg?)
// Purpose: get the FIRST item satisfying a condition.
// Returns: the item, or undefined if none matches. Changes original: NO.
// Callback: (value, index, array); return a truthy/falsy answer. Stops at a match.
// Objects: returns the original object. Functions: pass a predicate, or search
// an array of stored functions using a predicate; find does not invoke them for you.
{
  console.log([5, 12, 8].find(number => number > 10)); // 12
  console.log([5, 8].find(number => number > 10)); // undefined
  const users = [{ id: 1, active: false }, { id: 2, active: true }];
  const found = users.find(user => user.active);
  console.log(found === users[1]); // true
  found.active = false;
  console.log(users[1].active); // false: same object.
  // A found item might itself be undefined. findIndex can distinguish that case.
}

// 10. findIndex(callback, thisArg?)
// Purpose: get the INDEX of the first matching item.
// Returns: index or -1. Changes original: NO. Callback receives value/index/array.
// Objects/functions: your predicate defines the match; identity is optional.
{
  console.log([5, 12, 8].findIndex(number => number > 10)); // 1
  const users = [{ id: 1 }, { id: 2 }];
  const index = users.findIndex(user => user.id === 2);
  console.log(index); // 1
  console.log(users.findIndex(user => user.id === 99)); // -1
  // Before items.splice(index, 1), check index !== -1.
  // splice(-1, 1) removes the LAST item; it does not mean "no match".
}

// 11. findLast(callback, thisArg?)
// Purpose: get the LAST item satisfying a condition, searching from the end.
// Returns: item or undefined. Changes original: NO. Stops at its first match
// while going backwards. Object/function references are returned unchanged.
{
  console.log([4, 9, 12, 7].findLast(number => number % 2 === 0)); // 12
  const events = [{ type: "login", id: 1 }, { type: "logout", id: 2 },
                  { type: "login", id: 3 }];
  console.log(events.findLast(event => event.type === "login").id); // 3
  console.log(events.findLast(event => event.type === "purchase")); // undefined
}

// 12. findLastIndex(callback, thisArg?)
// Purpose: get the INDEX of the last matching item.
// Returns: index or -1. Changes original: NO. Same callback rules as findLast.
{
  console.log([4, 9, 12, 7].findLastIndex(number => number % 2 === 0)); // 2
  const users = [{ active: true }, { active: false }, { active: true }];
  console.log(users.findLastIndex(user => user.active)); // 2
  console.log([1, 3].findLastIndex(number => number % 2 === 0)); // -1
}

// 13. forEach(callback, thisArg?)
// Purpose: perform an ACTION for each existing item, such as logging.
// Returns: always undefined. Changes original: NO, unless YOUR callback changes it.
// Callback: (value, index, array). Its return value is ignored.
// Objects: callbacks can change their properties. Stored functions can be called
// by your callback. No normal break; return only leaves the current callback.
{
  const result = [10, 20].forEach((value, index) => console.log(index, value));
  // Above prints: 0 10, then 1 20.
  console.log(result); // undefined
  const users = [{ score: 1 }, { score: 2 }];
  users.forEach(user => { user.score += 10; });
  console.log(users.map(user => user.score)); // [11, 12]
  const tasks = [() => "saved", () => "sent"];
  tasks.forEach(task => console.log(task())); // "saved", then "sent"
  // forEach does not await an async callback. See the closing async examples.
}

// 14. map(callback, thisArg?)
// Purpose: TRANSFORM each existing item into a result.
// Returns: new array of results; length is preserved. Changes original: NO.
// Callback: (value, index, array). Whatever you return becomes the new item.
// Objects: return {...user, changedProperty: ...} to create a new outer object.
// That spread still shares nested objects. An async callback returns a Promise.
{
  console.log([1, 2, 3].map(number => number * 2)); // [2, 4, 6]
  const users = [{ name: "Sakib", score: 2 }, { name: "Mina", score: 4 }];
  console.log(users.map(user => user.name)); // ["Sakib", "Mina"]
  const upgraded = users.map(user => ({ ...user, score: user.score + 1 }));
  console.log(upgraded[0].score, users[0].score); // 3, 2
  console.log([1, 2].map(number => { number * 2; })); // [undefined, undefined]
  // Braces need return: number => { return number * 2; }
  // An object expression needs parentheses: user => ({ name: user.name }).
  console.log(["1", "2", "3"].map(parseInt)); // [1, NaN, NaN]
  // map passes index as argument 2; parseInt reads argument 2 as the numeric base.
  console.log(["1", "2", "3"].map(text => parseInt(text, 10))); // [1, 2, 3]
  console.log(["1", "2", "3"].map(Number)); // [1, 2, 3]
  const functions = [value => value + 1, value => value * 2];
  console.log(functions.map(fn => fn(5))); // [6, 10]
}

// 15. filter(callback, thisArg?)
// Purpose: KEEP all matching items. Returns: new array, possibly empty.
// Changes original: NO. Callback: (value, index, array), returns truthy/falsy.
// Objects/functions: matching items keep their original references.
{
  console.log([1, 2, 3, 4].filter(number => number % 2 === 0)); // [2, 4]
  const users = [{ name: "Sakib", active: true }, { name: "Mina", active: false }];
  const active = users.filter(user => user.active);
  console.log(active[0] === users[0]); // true
  console.log(users.filter(user => user.name === "Nobody")); // []
  console.log([0, 1, "", "hi", null, undefined, false].filter(Boolean)); // [1, "hi"]
  // filter(Boolean) removes ALL falsy values, including valid 0/false/empty strings.
  console.log([0, null, false, undefined].filter(value => value != null)); // [0, false]
  // Here != null intentionally excludes both null AND undefined.
  // filter(async ...) is wrong for async conditions: every Promise is truthy.
}

// 16. reduce(callback, initialValue?)
// Purpose: COMBINE items into one result (number, string, object, array, etc.).
// Returns: final accumulator. Changes original: NO, unless callback changes it.
// Callback: (accumulator, value, index, array). ALWAYS return the next accumulator.
// Without initialValue, the first existing item is used and iteration starts after it.
// Empty array without initialValue: TypeError. Prefer an explicit initial value.
{
  console.log([10, 20, 30].reduce((sum, number) => sum + number, 0)); // 60
  console.log([].reduce((sum, number) => sum + number, 0)); // 0
  const cart = [{ price: 10, quantity: 2 }, { price: 5, quantity: 3 }];
  console.log(cart.reduce((total, item) => total + item.price * item.quantity, 0)); // 35
  const counts = ["apple", "banana", "apple"].reduce((result, fruit) => {
    result[fruit] = (result[fruit] ?? 0) + 1;
    return result;
  }, {});
  console.log(counts); // { apple: 2, banana: 1 }
  const steps = [value => value + 2, value => value * 3];
  console.log(steps.reduce((value, fn) => fn(value), 1)); // 9: (1 + 2) * 3
  try {
    [].reduce((sum, number) => sum + number);
  } catch (error) {
    console.log(error.name); // "TypeError"
  }
  // Reducing strings with + joins them: ["10", "20"].reduce((a,b) => a+b) = "1020".
}

// 17. reduceRight(callback, initialValue?)
// Purpose: reduce from RIGHT to LEFT. Returns: final accumulator.
// Changes original: NO. Same empty-array and callback rules as reduce.
// Useful when function-composition order or another order-dependent result matters.
{
  console.log(["a", "b", "c"].reduceRight((result, letter) => result + letter, "")); // "cba"
  console.log([10, 3, 2].reduceRight((result, number) => result - number)); // -11: (2 - 3) - 10
  const steps = [value => value + 2, value => value * 3];
  console.log(steps.reduceRight((value, fn) => fn(value), 1)); // 5: (1 * 3) + 2
}

// 18. some(callback, thisArg?)
// Purpose: ask whether AT LEAST ONE item matches. Returns: boolean.
// Changes original: NO. Stops when callback returns truthy. Empty array: false.
// Objects/functions: predicate can inspect properties or explicitly call a function.
{
  console.log([1, 3, 4].some(number => number % 2 === 0)); // true
  console.log([].some(() => true)); // false
  const users = [{ role: "user" }, { role: "admin" }];
  console.log(users.some(user => user.role === "admin")); // true
  const checks = [() => false, () => true];
  console.log(checks.some(check => check())); // true
  // some(async ...) tests Promise objects, not the eventual boolean results.
}

// 19. every(callback, thisArg?)
// Purpose: ask whether ALL existing items match. Returns: boolean.
// Changes original: NO. Stops when callback returns falsy. Empty array: true.
// Objects/functions: same predicate rules as some; async predicates are a pitfall.
{
  console.log([2, 4, 6].every(number => number % 2 === 0)); // true
  console.log([2, 3, 6].every(number => number % 2 === 0)); // false
  console.log([].every(() => false)); // true: nothing fails the test.
  const users = [{ age: 20 }, { age: 17 }];
  console.log(users.every(user => user.age >= 18)); // false
  // If "all users are adults" also requires at least one user:
  console.log(users.length > 0 && users.every(user => user.age >= 18)); // false
}

// CALLBACK thisArg: applies to callback-based methods above except reduce/reduceRight.
// Arrow functions keep their surrounding this; thisArg will not change that.
{
  const rules = { minimum: 10 };
  const matches = [5, 15, 20].filter(function (value) {
    return value >= this.minimum;
  }, rules);
  console.log(matches); // [15, 20]
  // Equivalent without this: values.filter(value => value >= rules.minimum).
  // Avoid adding/removing elements in iteration callbacks. These methods read
  // the initial length once; later pushes beyond it are not visited, while changes
  // to existing later positions can affect what later callbacks observe.
}

// 20. slice(start = 0, end = length)
// Purpose: copy a portion. Start INCLUDED, end EXCLUDED. Returns: new array.
// Changes original: NO. Negative positions count from the end; bounds are clamped.
// Objects/functions: shallow copy, so existing references remain shared.
{
  const numbers = [10, 20, 30, 40];
  console.log(numbers.slice(1, 3)); // [20, 30]
  console.log(numbers.slice(-2)); // [30, 40]
  console.log(numbers.slice(3, 1)); // []: end is before start.
  console.log(numbers.slice(99)); // []
  const users = [{ name: "Sakib" }];
  const copied = users.slice();
  console.log(copied !== users, copied[0] === users[0]); // true, true
  // slice COPY; splice CHANGE. Their names look similar but their jobs differ.
}

// 21. splice(start, deleteCount?, ...newItems)
// Purpose: remove, insert, or replace items IN PLACE.
// Returns: a new array containing REMOVED items. Changes original: YES.
// Objects/functions: inserted/removed elements keep their references.
// Negative start counts from end. Omitted deleteCount removes through the end;
// explicit undefined deleteCount is converted to 0 when that argument is supplied.
{
  const letters = ["a", "b", "c", "d"];
  console.log(letters.splice(1, 2, "X")); // ["b", "c"]
  console.log(letters); // ["a", "X", "d"]
  console.log(letters.splice(1, 0, "Y")); // []: inserted without removing.
  console.log(letters); // ["a", "Y", "X", "d"]
  const users = [{ id: 1 }, { id: 2 }];
  const removed = users.splice(0, 1);
  console.log(removed[0].id, users[0].id); // 1, 2
  const a = [1, 2, 3];
  const b = [1, 2, 3];
  console.log(a.splice(1)); // [2, 3]
  console.log(b.splice(1, undefined)); // []
  console.log(a, b); // [1], [1, 2, 3]
}

// 22. concat(...items)
// Purpose: combine arrays/items. Returns: new array. Changes original: NO.
// Spreads ordinary array arguments by ONE level; nested arrays remain nested.
// Objects/functions: copied as references, never executed or deeply cloned.
{
  console.log([1, 2].concat([3, 4], 5)); // [1, 2, 3, 4, 5]
  console.log([1].concat([[2, 3]])); // [1, [2, 3]]
  const user = { id: 1 };
  const greet = () => "hi";
  const combined = [].concat(user, greet);
  console.log(combined[0] === user, combined[1] === greet); // true, true
  // concat accepts a value, not a callback. concat(greet) stores greet.
}

// 23. join(separator = ",")
// Purpose: turn array items into one string. Returns: string. Changes original: NO.
// Each item is converted to text; null/undefined/holes become empty pieces.
// Objects usually become "[object Object]"; functions become source text,
// so map useful properties or CALL functions first when you want their results.
{
  console.log(["JS", "HTML", "CSS"].join(" | ")); // "JS | HTML | CSS"
  console.log([1, 2, 3].join("")); // "123"
  console.log([1, null, undefined, 4].join("-")); // "1---4"
  console.log([].join("-")); // ""
  const users = [{ name: "Sakib" }, { name: "Mina" }];
  console.log(users.map(user => user.name).join(", ")); // "Sakib, Mina"
  console.log([[1, 2], [3, 4]].join(";")); // "1,2;3,4": inner arrays use their own commas.
}

// 24. toString()
// Purpose: quick comma-separated text. Returns: string. Changes original: NO.
// For ordinary arrays this uses join() with commas. No custom separator.
// Object/function text is not a useful data export; JSON.stringify is a different API.
{
  console.log([1, 2, 3].toString()); // "1,2,3"
  console.log([1, null, undefined].toString()); // "1,,"
  console.log([{ id: 1 }].toString()); // "[object Object]"
  console.log(JSON.stringify([{ id: 1 }])); // '[{"id":1}]': explicit JSON serialization.
}

// 25. sort(compareFn?)
// Purpose: reorder IN PLACE. Returns: the SAME array. Changes original: YES.
// Default: compares string forms in UTF-16 order, not numeric magnitude.
// compareFn(a, b): negative puts a before b; positive puts a after b; 0 ties them.
// Object arrays: supply a comparator for a property. Stored functions are not called
// automatically. Compare callbacks must be consistent; do not return just true/false.
{
  const numbers = [10, 2, 30];
  console.log(numbers.sort()); // [10, 2, 30]: "10" sorts before "2".
  const same = numbers.sort((a, b) => a - b);
  console.log(numbers, same === numbers); // [2, 10, 30], true
  console.log([10, 2, 30].sort((a, b) => b - a)); // [30, 10, 2]
  const users = [{ name: "Mina", age: 25 }, { name: "Sakib", age: 20 }];
  users.sort((a, b) => a.age - b.age);
  console.log(users.map(user => user.name)); // ["Sakib", "Mina"]
  // Ties preserve the earlier order in modern JS (stable sort).
  // undefined values go at the end; holes follow undefined values.
  // For human-language names: (a,b) => a.name.localeCompare(b.name, "en").
}

// 26. toSorted(compareFn?) — ES2023
// Purpose: sort a COPY. Returns: new array. Changes original: NO.
// Same comparison rules as sort. Object/function references are shared.
// Sparse input becomes dense: holes become undefined items in the result.
{
  const original = [30, 2, 10];
  console.log(original.toSorted((a, b) => a - b)); // [2, 10, 30]
  console.log(original); // [30, 2, 10]
  const users = [{ id: 2 }, { id: 1 }];
  const ordered = users.toSorted((a, b) => a.id - b.id);
  console.log(ordered[0] === users[1]); // true
  // Older-runtime alternative: [...original].sort((a, b) => a - b).
}

// 27. reverse()
// Purpose: reverse the order IN PLACE. Returns: same array. Changes original: YES.
// No callback; objects/functions move positions but retain their identities.
{
  const numbers = [1, 2, 3];
  console.log(numbers.reverse()); // [3, 2, 1]
  console.log(numbers); // [3, 2, 1]
  const users = [{ id: 1 }, { id: 2 }];
  const lastUser = users[1];
  users.reverse();
  console.log(users[0] === lastUser); // true
  // reverse does not sort by value: reversing [2, 9, 1] gives [1, 9, 2].
}

// 28. toReversed() — ES2023
// Purpose: reverse a COPY. Returns: new array. Changes original: NO.
// No callback; shallow copy. Holes become actual undefined items.
{
  const numbers = [1, 2, 3];
  console.log(numbers.toReversed()); // [3, 2, 1]
  console.log(numbers); // [1, 2, 3]
  const tasks = [() => "first", () => "last"];
  console.log(tasks.toReversed()[0]()); // "last"
  // Older-runtime alternative: [...numbers].reverse().
}

// 29. flat(depth = 1)
// Purpose: remove nesting from ARRAYS. Returns: new array. Changes original: NO.
// depth controls levels; Infinity flattens all levels. Removes holes at levels
// being flattened. Objects/functions are ordinary items, not flattened or executed.
{
  const nested = [1, [2, [3]]];
  console.log(nested.flat()); // [1, 2, [3]]
  console.log(nested.flat(Infinity)); // [1, 2, 3]
  console.log([1, , [2, , 3]].flat()); // [1, 2, 3]
  const user = { skills: ["JS", "CSS"] };
  console.log([user].flat()[0] === user); // true: not flattened into its properties.
  // flat does not traverse user.skills. You must select that property explicitly.
}

// 30. flatMap(callback, thisArg?)
// Purpose: map, then flatten the result by EXACTLY one array level.
// Returns: new array. Changes original: NO. Callback gets (value, index, array).
// Return [] to remove an item, [a,b] to produce two, or a plain value to produce one.
// Objects keep references unless you create new ones. Promises are not flattened.
{
  console.log([1, 2].flatMap(number => [number, number * 10])); // [1, 10, 2, 20]
  console.log([1, 2, 3].flatMap(number => number % 2 ? [] : [number])); // [2]
  const users = [{ skills: ["JS", "CSS"] }, { skills: ["HTML"] }];
  console.log(users.flatMap(user => user.skills)); // ["JS", "CSS", "HTML"]
  console.log([1, 2].flatMap(number => [[number]])); // [[1], [2]]: only one level.
  // flatMap(async ...) produces Promise items, not an awaited flat array.
}

// 31. fill(value, start = 0, end = length)
// Purpose: overwrite a range with ONE value. Returns: same array.
// Changes original: YES. End excluded; negative bounds count from the end.
// Objects/functions: the SAME reference is put in EVERY filled position.
{
  const numbers = [1, 2, 3, 4];
  console.log(numbers.fill(0, 1, 3)); // [1, 0, 0, 4]
  console.log(new Array(3).fill("ready")); // ["ready", "ready", "ready"]
  const shared = new Array(2).fill({ score: 0 });
  shared[0].score = 99;
  console.log(shared[1].score); // 99: both positions point at one object!
  const separate = Array.from({ length: 2 }, () => ({ score: 0 }));
  separate[0].score = 99;
  console.log(separate[1].score); // 0: mapper created a fresh object each time.
  const greet = () => "hello";
  console.log(new Array(2).fill(greet)[1] === greet); // true: fill does not call greet.
}

// 32. copyWithin(target, start = 0, end = length)
// Purpose: copy a range to another position WITHIN the same array.
// Returns: same array. Changes original: YES. Length stays the same.
// End excluded. Overlap is handled correctly. Objects/functions retain references.
{
  console.log([1, 2, 3, 4, 5].copyWithin(0, 3)); // [4, 5, 3, 4, 5]
  console.log([1, 2, 3, 4].copyWithin(1, 0, 2)); // [1, 1, 2, 4]
  const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
  users.copyWithin(1, 0, 1);
  console.log(users[0] === users[1]); // true: same object copied to index 1.
  // Unlike splice, this overwrites existing positions without inserting items.
}

// 33. toSpliced(start, deleteCount?, ...newItems) — ES2023
// Purpose: insert/remove/replace in a COPY. Returns: the entire new array,
// not the removed items. Changes original: NO. Bounds follow splice's rules.
// Retained object/function references are shared. Result has no holes.
{
  const numbers = [1, 2, 3, 4];
  console.log(numbers.toSpliced(1, 2, 99)); // [1, 99, 4]
  console.log(numbers); // [1, 2, 3, 4]
  console.log(numbers.toSpliced(1, 0, 8)); // [1, 8, 2, 3, 4]
  console.log(numbers.toSpliced(-1, 1)); // [1, 2, 3]
  const users = [{ id: 1 }, { id: 2 }];
  console.log(users.toSpliced(1, 1)[0] === users[0]); // true
}

// 34. with(index, value) — ES2023
// Purpose: replace ONE element in a COPY. Returns: new array.
// Changes original: NO. Negative indexes count from the end.
// Unlike at(), an out-of-range index throws RangeError, including on an empty array.
// Existing objects/functions keep references; replacement is stored without calling it.
{
  const numbers = [10, 20, 30];
  console.log(numbers.with(1, 99)); // [10, 99, 30]
  console.log(numbers.with(-1, 0)); // [10, 20, 0]
  console.log(numbers); // [10, 20, 30]
  const users = [{ name: "Sakib" }, { name: "Mina" }];
  const changed = users.with(0, { ...users[0], name: "Rafi" });
  console.log(changed[0].name, users[0].name); // "Rafi", "Sakib"
  try {
    numbers.with(99, 0);
  } catch (error) {
    console.log(error.name); // "RangeError"
  }
}

// 35. keys()
// Purpose: iterate over numeric INDEXES. Returns: iterator, not an array.
// Changes original: NO. Includes indexes for holes. Objects/functions do not matter
// because this method gives positions rather than values. Iterators are consumed.
{
  const numbers = [10, 20, 30];
  const iterator = numbers.keys();
  console.log([...iterator]); // [0, 1, 2]
  console.log([...iterator]); // []: the same iterator is now exhausted.
  console.log([...new Array(3).keys()]); // [0, 1, 2]
}

// 36. values()
// Purpose: iterate over ITEMS. Returns: iterator. Changes original: NO.
// Objects/functions are yielded by reference; holes are yielded as undefined.
// for...of on an array uses its value iterator automatically.
{
  console.log([...['a', 'b'].values()]); // ["a", "b"]
  console.log([...[, "b"].values()]); // [undefined, "b"]
  const users = [{ name: "Sakib" }];
  for (const user of users.values()) {
    console.log(user.name); // "Sakib"
  }
}

// 37. entries()
// Purpose: iterate over [index, value] PAIRS. Returns: iterator.
// Changes original: NO. Each pair contains the original element reference.
{
  console.log([...['a', 'b'].entries()]); // [[0, "a"], [1, "b"]]
  const users = [{ name: "Sakib" }, { name: "Mina" }];
  for (const [index, user] of users.entries()) {
    console.log(index, user.name); // 0 "Sakib", then 1 "Mina"
  }
  // Iterators are not arrays: call Array.from(iterator) or [...iterator] before map.
}

// 38. Array.isArray(value) — STATIC: called on Array, not on an instance.
// Purpose: reliably check whether a value is an actual array. Returns: boolean.
// Changes value: NO. A plain object, a function, or an array-like object is not an array.
{
  console.log(Array.isArray([1, 2])); // true
  console.log(Array.isArray({ 0: "a", length: 1 })); // false
  console.log(Array.isArray(() => [])); // false: function returns array, but is not one.
  console.log(typeof []); // "object": typeof cannot distinguish arrays from objects.
}

// 39. Array.from(iterableOrArrayLike, mapFn?, thisArg?) — STATIC.
// Purpose: create an array from an iterable (string, Set, iterator) or an array-like
// object (numeric properties plus length). Returns: new array. Changes input: NO.
// Optional mapper receives (value, index), NOT a third original-array argument.
// Objects/functions are copied as references unless the mapper creates new values.
{
  console.log(Array.from("JS")); // ["J", "S"]
  console.log(Array.from(new Set([1, 1, 2]))); // [1, 2]
  console.log(Array.from({ 0: "a", 1: "b", length: 2 })); // ["a", "b"]
  console.log(Array.from({ length: 4 }, (_, index) => index + 1)); // [1, 2, 3, 4]
  const users = Array.from({ length: 2 }, (_, index) => ({ id: index + 1 }));
  console.log(users); // [{ id: 1 }, { id: 2 }]: separate objects.
  console.log(Array.from({ name: "Sakib" })); // []: no length/iteration protocol.
  // Object.values(object) gives property values; Array.from(object) does not.
  console.log(Array.from("😀")); // ["😀"]: string iteration uses Unicode code points.
  // An async mapFn produces Promise elements; Array.from does not await them.
}

// 40. Array.of(...items) — STATIC.
// Purpose: create an array containing the arguments as items. Returns: new array.
// Changes inputs: NO. Objects/functions are stored by reference.
// Useful difference: Array.of(3) is [3], while new Array(3) has three empty slots.
{
  console.log(Array.of(3)); // [3]
  console.log(new Array(3)); // [<3 empty slots>]
  console.log(Array.of(1, 2, 3)); // [1, 2, 3]
  const user = { id: 1 };
  const greet = () => "hi";
  const items = Array.of(user, greet);
  console.log(items[0] === user, items[1]()); // true, "hi"
}

// PRACTICAL CHAIN: filter chooses items -> map transforms -> reduce combines.
{
  const cart = [
    { name: "Pen", price: 10, quantity: 2, available: true },
    { name: "Book", price: 50, quantity: 1, available: false },
    { name: "Pencil", price: 5, quantity: 3, available: true },
  ];
  const total = cart
    .filter(item => item.available)
    .map(item => item.price * item.quantity)
    .reduce((sum, price) => sum + price, 0);
  console.log(total); // 35
}

// ASYNC CALLBACKS: array methods generally do not wait for returned Promises.
// These examples use only local Promises, so they work without a network request.
async function demonstrateAsyncArrayCallbacks() {
  const values = [1, 2, 3];
  const completed = [];
  values.forEach(async value => {
    await Promise.resolve();
    completed.push(value);
  });
  console.log("Immediately after forEach:", completed.length); // 0
  // Even `await values.forEach(...)` awaits undefined, not the callback Promises.

  const pending = values.map(async value => value * 2);
  console.log("map returned Promises:", pending.every(item => item instanceof Promise)); // true
  console.log("Awaited map results:", await Promise.all(pending)); // [2, 4, 6]
  console.log("After awaited work:", completed); // [1, 2, 3]

  console.log("Wrong async filter:", values.filter(async value => value > 1)); // [1, 2, 3]
  // Promises are objects and therefore truthy, even if their eventual result is false.
  const decisions = await Promise.all(values.map(async value => value > 1));
  const filtered = values.filter((_, index) => decisions[index]);
  console.log("Correct async filter:", filtered); // [2, 3]

  const sequential = [];
  for (const value of values) {
    const result = await Promise.resolve(value * 10);
    sequential.push(result);
  }
  console.log("Sequential for...of:", sequential); // [10, 20, 30]
  // Use for...of + await for sequential work, or map + Promise.all to collect
  // concurrent work. Promise.all rejects if any input Promise rejects.
}

demonstrateAsyncArrayCallbacks().catch(error => console.error(error));

/*
CHOOSING A METHOD DURING REVISION
  Need every item transformed?              map
  Need only matching items?                 filter
  Need one matching item / its position?    find / findIndex
  Need latest matching item / its position? findLast / findLastIndex
  Need a yes/no condition?                  some / every
  Need a total or other combined result?    reduce
  Need actions but no result array?         forEach (sync), for...of (await/break)
  Need value membership / its index?        includes / indexOf / lastIndexOf
  Need a copy of part / an in-place edit?   slice / splice
  Need a last item without removing it?     at(-1)
  Need ordered copies?                     toSorted / toReversed

FINAL PITFALLS
  [] is truthy: a filter result should be checked with result.length.
  Mutating methods often do NOT return an array: push returns a length; pop an item.
  Equality checks on objects/functions require the same reference.
  Copying an array does not deep-copy its objects.
  Return values matter in map/filter/reduce callbacks.
  Functions inside an array are just values until something explicitly calls them.
  Modern copying methods do not mutate the container; your callbacks still can.
*/
