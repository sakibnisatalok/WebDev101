

// js is primarily a prototype-based  lang, and its classes are essentially
// syntactical sugar over existing prototype-based inheritance mechanisms.




// object : collection of properties and methods.
// parts of OOP : object literal

// constructors
// prototypes
// classes
// instances (new, this).     'this' : this keyword basically provides the context


const user = {
  username: "apple khan",
  logincount: 4,
  signedIn: true,

  getUserInfo: function () {
    console.log(`username : ${this.username}`)
    console.log(this) // returns current context, which is user.
  }
}

user.getUserInfo();

console.log(this) // global context is {}. but if we do this in browser console. we get window
// object as global context.



function userr(userName, loginCount, isLoggedIn) {
  this.userName = userName
  this.loginCount = loginCount
  this.isLoggedIn = isLoggedIn

  this.greeting = function () {
    console.log(`hello ${this.userName}`)
  }

  return this; // we can ignore this line as it is implied.
} // our function creates objects when called with new. **

// const userone = userr('boomkhan', 5, true)
// const usertwo = userr('Gokukhan', 2, false)  here 'userone' becomes 'usertwo'. same context which is unintended.
//  constructor comes into play and provides new instances.
//
// console.log(userone);


const userone = new userr('boomkhan', 5, true)
const usertwo = new userr('Gokukhan', 2, false)

console.log(userone);
console.log(usertwo);


/*

For each call, 'new' creates a fresh object, makes 'this' refer to it, and runs
function to assign its properties.

 -user1 and user2 are separate objects.
 -They inherit from userr.prototype; an ordinary object literal inherits
 from Object.prototype. *****
 -'return this' is unnecessary—-new automatically returns the new object.

Important: Calling userr(...) without new does not create an
instance. Here, in 'non-strict mode' it would write
properties onto the ""global object""; in strict mode, this would be
"undefined", causing an error.

*/


console.log(userone.constructor); //  returns [Function: userr]  **

console.log(userone instanceof userr); // returns true.  **
console.log(userone instanceof Object); // returns true.  **


// js has a weird feature which is prototypal
// inheritance. it is easier to see this behaviour in browser console.


//    array ---> Array.prototype --> Object.prototype ---> null
//    string ---> String.prototype --> Object.prototype ---> null
//
//    is function  an object ?



function multiply(num) {
  //console.log(this)
  return num*5
}

multiply.testVariable = 10;

console.log(multiply(4))  // 20
console.log(multiply.testVariable) // 10
console.log(multiply.prototype)  //  returns {}. this prototype offers a default context
// where it can offer some properties and methods as well as of that function if it has any.  ****


// a function in js has both functional and object
// behaviour. If we want we can treat js function as an object.  ****
//     'function' ---> object ---> null



function makeUser(username, userage, score) {
  this.username = username
  this.userage = userage
  this.score=score
}

makeUser.prototype.increment = function () {
  this.score++;
}

makeUser.prototype.greeting = function () {
  console.log(`hello ${this.username}`)
}







const userA = new makeUser('doggo smith', 23, 10); // now it works unlike userB which has no 'new' keyword. **
const userB = makeUser('neko khan', 13, 20)

const userC = new makeUser('Trump Bin Jew', 55, 100);

console.log(makeUser.prototype) // returns { increment: [Function (anonymous)], greeting: [Function (anonymous)] } **

userA.greeting() // says TypeError: Cannot read properties
//of undefined(reading 'greeting'). we need to add 'new' keyword
// before assigning makeUser() to userA and userB.[ Also userA doesn't store .greeting(), it borrows it from makeUser.prototype.] *****

console.log(`checking makeuse()`);

/*

makeUser.randomvar = 444;
makeUser.randomfunc = function () {
  console.log(`just a random funciton of makeUse()`);
}

userA.randomfunc();

--------
 note :: 

 Adding the method with a plain . does work, but it puts the method on the function itself, and instances never look there. The key fact is that an instance’s prototype is makeUser.prototype, not makeUser itself.

 userA ──▶ makeUser.prototype ──▶ Object.prototype ──▶ null
 
 makeUser (the function object) is NOT in this chain.



 

The three places we can put a method :
 
1. makeUser.greeting = function () {} (the . operator on the function)

 
 makeUser.greeting = function () { console.log('hi') }
 makeUser.greeting()   // works: it's a property of the function object.
 userA.greeting()      // TypeError: userA.greeting is not a function.

 
 This is just like multiply.testVariable = 10 from earlier in your file. You attached a property to the function object. ""Instances"" aren’t linked to that object, so they can’t see it. This is what static methods are in classes. Inside it, this is makeUser, not a user.



 

2. this.greeting = function () {} inside the constructor :
 
 function makeUser(username) {
   this.username = username
   this.greeting = function () { console.log(`hello ${this.username}`) }
 }
 
 This works because new makes this the new object, so every instance gets its own copy of the function:
 
 userA.greeting === userB.greeting   // false: two separate functions
 
 It’s fine for learning, but 1,000 users means 1,000 identical functions in memory.



 

3. makeUser.prototype.greeting = function () {} :
 
 makeUser.prototype.greeting = function () { console.log(`hello ${this.username}`) }

 userA.greeting === userB.greeting   // true: one shared function
 
 There’s only one copy, and every instance finds it through the prototype chain. this still points to whichever user called it, so userA.greeting() prints hello doggo smith. You can also add or change a method later, and every existing instance sees the change.





How class maps onto this  ::
 
class MakeUser {
  constructor(username) {
     this.username = username          // per-instance data (option 2 location)
  }
  greeting() { ... }                  // goes on MakeUser.prototype (option 3)
  static create() { ... }             // goes on MakeUser itself (option 1)
 }


In short:
 Data goes on each instance with 'this' .
 Shared methods go on '.prototype' .






There’s only one greeting function in memory, and both users(userA and userC) can use it because they’re both linked to it.
 
 const userA = new makeUser('doggo smith', 23, 10);
 const userC = new makeUser('Trump Bin Jew', 55, 100);
 
 userA ──┐
         ├──▶ makeUser.prototype { greeting, increment }
 userC ──┘

 
 Memory: greeting and increment exist once, on makeUser.prototype. Neither user stores its own copy.
 Access: both were created with new, so both are linked to makeUser.prototype and can call its methods.
 this: the function is shared, but this is whoever calls it:
 
 userA.greeting()   // hello doggo smith
 userC.greeting()   // hello Trump Bin Jew


 So each user stores its own data (username, userage, score) but shares the methods.
 'userB' is the exception: it was created without new, so it’s undefined and isn’t linked to anything.
 


*/











/*

Here's what happens behind the scenes when the new keyword is used:

---A new object is created: The new keyword initiates the creation of a new JavaScript object.

---A prototype is linked: The newly created object gets linked to the prototype property of
the constructor function. This means that it has access to properties and methods defined on
the constructor's prototype.


---The constructor is called: The constructor function is called with the specified arguments and this is bound
to the newly created object. If no explicit return value is specified from the constructor, JavaScript assumes
this, the newly created object, to be the intended return value.

---The new object is returned: After the constructor function has been called, if it
doesn't return a non-primitive value (object, array, function, etc.), the newly created object is returned.

*/


// js doesnt give constructor through classes but ""new"" keyword. So classes in js
// are basically wrappers on top of prototype property of constructor function. here we have created
// makeUser() function. we make it a function with 'this' property(more like a constructor) and have added
// prototypal methods for common use of variables userA and userB, by calling makeUser() on them. As functions
// can be object, we can make userA and userB as objects. But when we access
// them using ' . operator', we get error. This means created objects are not connected to
// prototype property of makeUser(). SO to solve this we use "new" keyword. now userA acts
// like an object and greeting() is accessible. w/o classes, we have achieved
// class level features. That's why classes are wrappers in js. [So essentially when 'new' is
// added before, new object is created along with default and custom properties and methods of 'prototype'.]

// 'new' and 'this' keywords let us make a js function an object.  ****


















/*
==================== WRAP-UP: THREE ROLES OF makeUser() ====================

function makeUser(username, score) {
  // new.target is set only when the function is called with 'new'
  console.log(new.target ? '-> called WITH new (constructor)' : '-> called WITHOUT new (plain function)')
  this.username = username
  this.score = score
}
makeUser.prototype.greeting = function () { console.log(`hello ${this.username}`) }


// ROLE 1: plain function (no 'new')
const userB = makeUser('neko khan', 20)  // -> called WITHOUT new
console.log(userB)                       // undefined (nothing is returned)
console.log(globalThis.username)         // 'neko khan' (leaked onto the global object)


// ROLE 2: function as an object (properties added with '.')
makeUser.randomvar = 444
makeUser.randomfunc = function () { console.log('static: belongs to makeUser itself') }
console.log(typeof makeUser)             // 'function'
console.log(makeUser instanceof Object)  // true (functions are objects)
console.log(makeUser.randomvar)          // 444
makeUser.randomfunc()                    // static: belongs to makeUser itself


// ROLE 3: constructor (with 'new'), which creates instances
const userA = new makeUser('doggo smith', 10)   // -> called WITH new
const userC = new makeUser('goku khan', 100)    // -> called WITH new
userA.greeting()                                 // hello doggo smith
userC.greeting()                                 // hello goku khan
console.log(userA instanceof makeUser)                            // true
console.log(Object.getPrototypeOf(userA) === makeUser.prototype)  // true
console.log(userA.greeting === userC.greeting)                    // true (one shared copy)
console.log(userA.hasOwnProperty('username'))                     // true (own data)
console.log(userA.hasOwnProperty('greeting'))                     // false (borrowed from the prototype)
console.log(userA.randomfunc)                                     // undefined (static members aren't inherited)


// COMPARE: object literal
const user = { username: 'apple khan', greeting() { console.log(`hello ${this.username}`) } }
user.greeting()                                               // hello apple khan
console.log(Object.getPrototypeOf(user) === Object.prototype) // true
try { new user() } catch (e) { console.log(e.message) }       // user is not a constructor

const arrow = () => {}
try { new arrow() } catch (e) { console.log(e.message) }      // arrow is not a constructor


---------------------------------- SUMMARY ----------------------------------

                     | makeUser()          | makeUser.x         | new makeUser()      | { ... } literal
---------------------+---------------------+--------------------+---------------------+------------------
'this' is            | global obj          | makeUser (inside   | the new instance    | the object itself
                     | (undefined strict)  | static functions)  |                     | (in its methods)
returns              | undefined           | -                  | a new object        | -
prototype of result  | -                   | -                  | makeUser.prototype  | Object.prototype
uses .prototype      | NO                  | NO                 | YES                 | NO
methods?             |                     |                    |                     |
can make instances?  | NO                  | NO                 | YES                 | NO (not a constructor)


When is an instance possible? Only when BOTH are true:
  1. It is called with 'new'.
  2. The thing called is a regular 'function' (or a 'class').
     Object literals, arrow functions and object methods like greeting() {} can't be called with 'new'.
  -> 'new.target' tells, from inside the function, which way it was called.


Prototype chains:
  userA / userC  --> makeUser.prototype --> Object.prototype --> null
  user (literal) -----------------------> Object.prototype --> null
  makeUser       --> Function.prototype --> Object.prototype --> null

=============================================================================
*/




































