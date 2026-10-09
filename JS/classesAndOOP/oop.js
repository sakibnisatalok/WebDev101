

// js is primarily a prototype-based  lang, and its classes are essentially
// syntactical sugar over existing prototype-based inheritance mechanisms.




// object : collection of properties and methods.
// parts of double oop : object literal

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
  
  return this; // we can innore this line as it is implied.
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


//     array ---> object ---> null
//    string ---> object ---> null
//    is function  an object?



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

console.log(makeUser.prototype) // returns { increment: [Function (anonymous)], greeting: [Function (anonymous)] } **

userA.greeting() // says TypeError: Cannot read properties
//of undefined(reading 'greeting'). we need to add 'new' keyword
// before assigning makeUser() to userA and userB. ****



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











