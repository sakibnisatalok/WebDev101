



// reading seq : classES6.js -> inheritance.js -> staticprop.js -> bind.html -> objectsandmathpi.js -> getter_setter.js



/*

two types of getter-setter :
- properties based (in some legacy codebase)
- class based (most common)
- object based (rare)

*/

// getters and setters are special methods that stay over the properties. The keyword work on the immediate named property. what we do in the process of getting or setting that property, getter() and setter() dont care about it. So get <propery_name>(){} and set <propery_name>(value){} treat  <propery_name> as properties, not as methods. 





// class based ::     -----


class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  get password() {
    return this._password.toUpperCase();
  }

  set password(value) {
    this._password = value;
  }

  get email() {
    return this._email.toUpperCase();
  }

  set email(value) {
    this._email = value;
  }

  logMe() {
    console.log(`Username is ${this.username}`);
  }

  changeUserName() {
    return `new name : ${this.username.toUpperCase()}`;
  }
}

const userA = new User("Trumpbinladen", "trump@yandex.com", "123abc");

console.log(userA);

// RangeError: Maximum call stack size exceeded. this issue arises due to race condition b/w constructor() and setter().X  .[ error is infinite recursion (the setter calling itself), not a race condition.] **

console.log(userA.password);

userA.password = "zxcvb";

console.log(userA.password);







// using properties based ::: -----

function Userr(username, email, password) {
  this._username = username;
  this._email = email;
  this._password = password;

  /*
  Object.defineProperty(obj, "key", descriptor);          // singular: (object, name, descriptor)
  Object.defineProperties(obj, { key: descriptor, ... }); // plural:   (object, { many descriptors })

  */

  Object.defineProperty(this, "email", {
    get: function () {
      return this._email;
    },
    set: function (value) {
      this._email = value;
    }
  });

  Object.defineProperty(this, "password", {
    get: function () {
      return this._password;
    },
    set: function (value) {
      this._password = value;
    }  
  });

  Object.defineProperty(this, "username", {
    get: function () {
      return this._username;
    },
    set: function (value) {
      this._username = value;
    }
  });
}

const userB = new Userr('abcmahmud', 'abcmahmud@yahoo.com', 'mnbv');

console.log(userB);



// Hiding a getter doesn’t hide the property its value is stored in. console.log only lists enumerable properties, so it skips email, password and username and shows the _ ones. ***
// To hide the values, we can make the _ properties non-enumerable too:
// Object.defineProperty(this, "_password", { value: password, writable: true, enumerable: false });
// this approach is probably not the standard. ****









// object based :::   -----


class Userrr {
    constructor(email, password){
        this.email = email;
        this.password = password
    }

    get email(){
        return this._email.toUpperCase()
    }
    set email(value){
        this._email = value
    }

    get password(){
        return `${this._password}salt`
    }

    set password(value){
        this._password = value
    }
}

const userC = new Userrr("abc@j.com", "abc12")
console.log(userC.email);





// adding underscore doesnt solve the hidding-the-properties issue. it is still accessible. Newer version of js/es22+ actually provides a way to hide the properties using '#' . ************



