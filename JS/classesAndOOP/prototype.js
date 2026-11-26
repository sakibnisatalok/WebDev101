

//   *** To understand this file, it requires the understadning of oop.js file. ***



// methods added to a prototype are shared by everything below it in the chain, and that we can chain plain objects together.


const heros = ['spiderman', 'thor', 'ironman'] // Array literal (Preferred).
const numbers = new Array(1, 2, 3); // Array constructor.


let heroPower = {
  spiderman: 'slingshot',
  thor: 'lighting hammer',
  ironman: 'brain power',

  getSpidermanPower: function () {
    console.log(`Spiderman power is ${this.spiderman}`)
  }
}

// heroPower.me();  returns error.

// now we did add properties and methods to a function previously
// but now we want it for all types of objects.



Object.prototype.me = function () {
  console.log(`Im in all types of objects`);
}

heroPower.me(); // returns 'Im in all types of objects'. 'Object' is top-level(parent);so adding here
//means adding in all childs. ****



function add(num1, num2) {
  return num1 + num2;
}
console.log(add(2, 10)) // 12

add.me() // returns 'Im in all types of objects'. [function]
heros.me(); // returns 'Im in all types of objects'. [array]


// q: how this add() function different from a function having a this.<variable_name> inside it? how both having .me() as their property?****


Array.prototype.meforarr = function () {
  console.log(`Im in arrays only`);
}

numbers.meforarr(); // works fine. but 'Object' doesn't inherit Array's properties.
//heroPower.meforarr(); returns errors for objects. **



// if we want to drop the prototype ::::  use 'delete Object.prototype.me;'  **
// Can you use it in 09_objects.js? ::  Import/require prototype.js before calling .me() in 09_objects.js. In that way both
// will have the same js env. ****







const user = {
  name: "Stupid khan",
  email : "nothing@google.com"
}


const teacher = {
  makeVideo : true
}

const teacherSupport = {
  isAvailable : false
}

const TAsupport = {
  makeAssignments: 'Js Homeworks',
  fullTime: true,
  __proto__ : teacherSupport //oudated approach
}

// teacher, teacherSupport, TAsupport. All these objects are different instances. They only share
// the default properties. but we want to communicate or share info b/w these unique objects.
// we can do it using __proto__(). add it to TAsupport object. ****


teacher.__proto__ = user; //oudated approach

// modern syntax ::
Object.setPrototypeOf(teacherSupport, teacher) //  'teacherSupport' accesses all properties of 'teacher'.
// this is called prototypal inheritance. ******








// let lastUser = "whatdadawgdoing  e   "
//
// String.prototype.truelength = function () {
//   console.log(`${this}`)
//   console.log(`true length is ${this.trim().length}`)
// }
//
// lastUser.truelength(); // whatdadawgdoing__e___ \n true length is 18
// "valorantsucks ".truelength(); // valorantsucks \n true length is 13.
//






Object.getPrototypeOf([1, 2]) === Array.prototype                  // true
Object.getPrototypeOf(Array.prototype) === Object.prototype        // true
Object.getPrototypeOf('hello') === String.prototype                // true (auto-boxed)
Object.getPrototypeOf(String.prototype) === Object.prototype       // true
Object.getPrototypeOf(Object.prototype)                            // null (the end)
Object.getPrototypeOf(Array) === Function.prototype                // true
Object.getPrototypeOf(Function.prototype) === Object.prototype     // true
Array.prototype.constructor === Array                              // true




// Functional prototype (Function.prototype)  :::  ---

/*

Function.prototype is the object that holds the methods every function shares: call, apply, bind, toString, and so on. It does the same job for functions that Array.prototype does for arrays:

add.call(null, 2, 10)   // 12: call isn't on add, it's found on Function.prototype
add.hasOwnProperty('call')            // false

Object.getOwnPropertyNames(Function.prototype)
['length','name','arguments','caller','constructor','apply','bind','call','toString'] ***



Oddly, it’s a function itself: typeof Function.prototype is 'function', and calling it just returns undefined. ****





Every object has a hidden parent link (you can see it with Object.getPrototypeOf(x) or the old x.__proto__). Whenever JavaScript creates a function, it sets that link to 'Function.prototype' automatically, however the function was created:

writing a function ──▶ engine creates a function object ──▶ hidden link set to Function.prototype. ****


 Don’t confuse the two “prototypes” a function has :
 
 - makeUser appears twice in your second image. makeUser itself points to Function.prototype, while userA points to makeUser.prototype.
 - So makeuser(oop.js) points to both makeuser.prototype(made for makeuser's instances) and Function.prototype(made by 'hidden link') for sharing common methods of js function like bind,constructor, etc..

 ---



 
Everything whose parent is Function.prototype ::: ---


All of them return true for Object.getPrototypeOf(x) === Function.prototype ::

 // functions you write
 function add(a, b) { return a + b }         // plain function
 function makeUser(n) { this.username = n }  // constructor-style function
 const arrow = () => {}                      // arrow function
 const obj = { greet() {} }                  // obj.greet (object method)
 class Car {}                                // a class is a function too
 const bound = add.bind(null)                // bound function
 
 // built-in constructors
 Array, String, Object, Function, Number, Boolean, Date, Promise, Map
 // built-in utility functions
 console.log, Math.max



 Each of these is a function, so add.me(), Array.me() and Car.me() all work through this chain.
 Exceptions: *******
 
 - Async and generator functions have one extra step in between:
 async function af() {} ──▶ AsyncFunction.prototype ──▶ Function.prototype ──▶ ...
 function* gf() {}      ──▶ GeneratorFunction.prototype ──▶ Function.prototype ──▶ ...
 
 - Math isn’t a function, just a plain object, so its parent is Object.prototype directly. ***








 Function.prototype is itself an object, and the engine sets its parent to Object.prototype when it starts up. After that it’s an ordinary link, like any other :
 
 Object.getPrototypeOf(Function.prototype) === Object.prototype   // true
 Object.getPrototypeOf(Object.prototype)        // null

 
 So the full chain for any function is :
 add / Array / Object / Car ──▶ Function.prototype ──▶ Object.prototype ──▶ null.  ****

 




 In the image(part 4 in prototype_chains.pdf), Object → Function.prototype means the function Object, not Object.prototype :
 
 Object instanceof Function     // true: Object is a function, so its parent is Function.prototype
 
 Function instanceof Object     // true: Function.prototype's parent is Object.prototype
 
 Function.prototype.constructor === Function   // true
 
 These two links don’t form a loop. One is about the function Object, the other about the object Object.prototype. Every path still ends at Object.prototype and then null.
 
---




Function.prototype is a special function that acts as the parent of every other function. A regular function like add is a child that borrows its methods from it.

function add(a, b) { return a + b }
const FP = Function.prototype

Similarities :

Both are callable function objects with the same basic shape :

typeof add                     // 'function'
typeof FP                      // 'function'

add instanceof Object          // true: both are objects
FP instanceof Object           // true

add.name, add.length           // 'add', 2
FP.name, FP.length             // '', 0: both have name and length

Object.getPrototypeOf(FP) === Object.prototype   // true: both chains end at Object.prototype, then null


DIFFERENCES :

============ DIFFERENCES: a normal function (add) vs Function.prototype ============

                          | add (a normal function)         | Function.prototype
--------------------------+---------------------------------+----------------------------------
Parent (prototype)        | Function.prototype              | Object.prototype
call, apply, bind         | borrowed                        | owned (they live here)
Calling it                | add(2, 10) returns 12           | FP() returns undefined (does nothing)
Has a .prototype property | yes (an object, used for new)   | no (undefined)
Works with new            | yes, new add() (useless,        | no, TypeError: not a constructor
                          | but allowed)                    |
Who creates it            | you, when you write code        | the engine, once at startup
How many                  | as many as you write            | exactly one

Chain:  add --> Function.prototype --> Object.prototype --> null

===================================================================================


// owned vs borrowed
FP.hasOwnProperty('call')       // true
add.hasOwnProperty('call')      // false: add finds call on FP
add.call(null, 2, 10)           // 12

// the .prototype property
add.prototype                   // {}: the parent for objects made with new add()
FP.prototype                    // undefined 

// constructing
new add(2, 10)                  // add {}
new FP()                        // TypeError: Function.prototype is not a constructor

The chain :

add ──▶ Function.prototype ──▶ Object.prototype ──▶ null

In short, add uses the shared function methods and Function.prototype provides them. ""It’s a function only so that everything about functions behaves consistently. It isn’t meant to be called or used as a constructor"". *****



*/




/*
#####################################################################################
#                                                                                   #
#                    PROTOTYPES IN JS: THE COMPLETE SUM-UP                          #
#                (read this first if you come back after a while)                   #
#                                                                                   #
#####################################################################################


THE ESSENCE (in 3 lines)
------------------------
  1. Every object has a hidden link to ONE parent object, called its prototype.
  2. If a property is not found on the object, JS walks up that link (the prototype chain).
  3. Every chain ends at Object.prototype, and then null. That is all inheritance in JS is.



1) WHAT IS A PROTOTYPE?
-----------------------
  A prototype is just a normal object that another object is linked to.
  The child does not COPY the parent's properties; it BORROWS them through the link.

      const arr = [1, 2]
      arr.push(3)                     // push is NOT stored on arr
      arr.hasOwnProperty('push')      // false -> it is borrowed from Array.prototype

  How to see / change the link:
      Object.getPrototypeOf(x)        // read the parent   (modern, preferred)
      Object.setPrototypeOf(x, p)     // change the parent (modern)
      Object.create(p)                // make a NEW object whose parent is p (best way)
      x.__proto__                     // old way to read/write the parent (outdated, avoid)



2) HOW THE LOOKUP WORKS (the prototype chain)
---------------------------------------------
  When you write  obj.something :
      step 1: is 'something' on obj itself?            -> yes: use it
      step 2: no? look on obj's parent                 -> yes: use it
      step 3: no? look on the parent's parent ...      -> keep going up
      step 4: reached null?                            -> result is undefined
                                                          (calling it -> TypeError: not a function)

  Important behaviours:
    - READING goes up the chain. WRITING does not:  obj.x = 5  always creates x on obj itself.
    - SHADOWING: if obj has its own property with the same name as the parent's, obj's own wins.
    - LIVE LINK: add a method to a parent later, and every existing child sees it immediately.
    - 'this' inside a borrowed method = the object that CALLED it, not the prototype it lives on.



3) THE BUILT-IN CHAINS (where they begin and end)
-------------------------------------------------
      [1, 2]          --> Array.prototype    --> Object.prototype --> null
      "hello"         --> String.prototype   --> Object.prototype --> null   (auto-boxed, see below)
      { a: 1 }        --> Object.prototype   --> null
      any function    --> Function.prototype --> Object.prototype --> null

    - BEGIN: at the value itself (array, string, object, function).
    - END:   Object.prototype is the last real object; its parent is null.
             Object.getPrototypeOf(Object.prototype)   // null

  Strings / numbers / booleans are PRIMITIVES (not objects). When you call a method on them,
  e.g. "hello".toUpperCase(), JS briefly wraps them in an object (String) -> "auto-boxing".
  That wrapper's chain starts at String.prototype. That is why "abc".truelength() worked
  after adding String.prototype.truelength.



4) THE TWO MEANINGS OF "PROTOTYPE" (the #1 confusion)
-----------------------------------------------------
  Only FUNCTIONS have a .prototype property. A function therefore has TWO prototype-related things:

      Object.getPrototypeOf(makeUser)   -> Function.prototype   (makeUser's OWN parent)
      makeUser.prototype                -> makeUser.prototype   (the parent it GIVES to instances)

      makeUser  --> Function.prototype --> Object.prototype --> null     (the function itself)
      userA     --> makeUser.prototype --> Object.prototype --> null     (objects made by new makeUser())

  So:  "X.prototype" = what X's children inherit.
       "Object.getPrototypeOf(X)" = what X itself inherits from.

  Each built-in constructor and its prototype point at each other:
      Array.prototype.constructor === Array        // true
      Array  --.prototype-->  Array.prototype  --.constructor-->  Array



5) Function.prototype (the parent of all functions)
---------------------------------------------------
  - It is the object holding the methods EVERY function shares: call, apply, bind, toString ...
        add.call(null, 2, 10)              // 12 -> call is borrowed from Function.prototype
  - The engine automatically links EVERY function to it, however it was made:
        function add(){}, () => {}, obj.method(){}, class Car{}, add.bind(),
        Array, String, Object, Function, Number, Date, Promise, Map, console.log, Math.max ...
  - Exceptions: async functions and generator functions have one extra step
        (AsyncFunction.prototype / GeneratorFunction.prototype) before Function.prototype.
    Math is NOT a function (plain object) -> its parent is Object.prototype directly.
  - Oddly it is a function itself (typeof -> 'function'), but calling it does nothing,
    it has no .prototype, and it cannot be used with new. It is a function only so that
    "everything about functions" stays consistent.
  - Its own parent is Object.prototype -> that is how functions also get .me(), hasOwnProperty, etc.

  Functions are objects too: that is why  add.me()  and  multiply.testVariable = 10  work.



6) THE "Object vs Function" PUZZLE
----------------------------------
      Object instanceof Function     // true  -> the FUNCTION Object is a function
      Function instanceof Object     // true  -> Function.prototype's parent is Object.prototype

  Not a loop! "Object" (the constructor function) and "Object.prototype" (the top object) are
  two DIFFERENT things. Every path still ends at Object.prototype -> null.



7) ADDING METHODS TO BUILT-IN PROTOTYPES (what this file did)
-------------------------------------------------------------
      Object.prototype.me = function(){...}       -> available on EVERYTHING
                                                     (heroPower.me(), add.me(), heros.me())
                                                     because Object.prototype is at the top of every chain.
      Array.prototype.meforarr = function(){...}  -> available on arrays ONLY
                                                     (plain objects are not below Array.prototype)
      String.prototype.truelength = ...           -> available on every string

      delete Object.prototype.me                  -> removes it again from everything.

  It only exists in the SAME running program: another file sees it only if this file
  is require()d / imported first.

  WARNING (why real code avoids this, called "monkey patching"):
    - It affects every object in the whole program, including libraries.
    - A method added by assignment is enumerable, so it shows up in  for...in  loops of every object.
    - A future JS version may add a method with the same name -> conflicts.
    Fine for learning; in real projects use your own classes / helper functions instead.



8) LINKING PLAIN OBJECTS TOGETHER (prototypal inheritance)
----------------------------------------------------------
  In this file:
      TAsupport = { ..., __proto__: teacherSupport }       // outdated
      teacher.__proto__ = user                             // outdated
      Object.setPrototypeOf(teacherSupport, teacher)       // modern

  Resulting chain:
      TAsupport --> teacherSupport --> teacher --> user --> Object.prototype --> null

      TAsupport.makeAssignments   // own property
      TAsupport.isAvailable       // from teacherSupport
      TAsupport.makeVideo         // from teacher
      TAsupport.name              // "Stupid khan", from user

  Best modern way to create an already-linked object:
      const ta = Object.create(teacherSupport)     // ta's parent is teacherSupport



9) OWN vs INHERITED (how to tell)
---------------------------------
      obj.hasOwnProperty('x')     // true only if x is stored ON obj
      'x' in obj                  // true if x is on obj OR anywhere up the chain
      Object.keys(obj)            // own (enumerable) properties only

  Rule of thumb:  DATA lives on each object (own).  Shared METHODS live on the prototype (inherited).



10) WHERE THIS CONNECTS TO oop.js (constructors, new, class)
------------------------------------------------------------
      function makeUser(name){ this.username = name }      // data -> each instance
      makeUser.prototype.greeting = function(){...}        // method -> shared by all instances
      const userA = new makeUser('doggo')                  // new links userA to makeUser.prototype

  class syntax does exactly the same thing underneath ("syntactic sugar"):
      class User { constructor(n){ this.username = n }  greeting(){...} }
      // greeting goes on User.prototype, and User itself is a function -> Function.prototype



11) BIG MAP (everything in one picture)
---------------------------------------

   [1,2]   "hello"    userA        { }        add / Array / String / Object / makeUser / Car
     |        |         |           |                          |
     v        v         v           |                          v
  Array.   String.   makeUser.      |                  Function.prototype
  prototype prototype prototype     |                          |
     |        |         |           |                          |
     +--------+---------+-----------+--------------------------+
                                    |
                                    v
                            Object.prototype      <- add a method here = everyone gets it
                                    |
                                    v
                                  null            <- the end of every chain



12) QUICK CHECKS (paste in node / browser console)
--------------------------------------------------
      Object.getPrototypeOf([])  === Array.prototype                  // true
      Object.getPrototypeOf(Array.prototype) === Object.prototype     // true
      Object.getPrototypeOf(function(){}) === Function.prototype      // true
      Object.getPrototypeOf(Function.prototype) === Object.prototype  // true
      Object.getPrototypeOf(Object.prototype)                         // null
      [].hasOwnProperty('push')                                       // false (borrowed)



ONE-LINE RECAP
--------------
  "Objects don't copy, they borrow: JS looks up the prototype chain until it finds the
   property or hits null, and every chain passes through Object.prototype."

#####################################################################################
*/














































