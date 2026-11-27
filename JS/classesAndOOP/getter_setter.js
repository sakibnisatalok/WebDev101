



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

/*

The RangeError: Maximum call stack size exceeded is not a race condition. JavaScript runs code one step at a time, so there’s nothing racing. The error is ''infinite recursion''. It happens if the setter assigns to the same name: ******

set password(value) {
  this.password = value;   // (error) this calls set password again... and again... forever
}

Each this.password = ... calls the setter again, until the call stack runs out. The fix is what we already have: store the value under a different name (_password). So current code works because of this.*****

*/

console.log(userA.password);

userA.password = "zxcvb";

console.log(userA.password);


/*
A getter is a function that runs when you read a property. A setter is a function that runs when you assign to it. From outside, they look like a normal property: you write obj.prop and obj.prop = x, with no ().

How it works in getter_setter.js :

const userA = new User('Trumpbinladen', 'trump@yandex.com', '123abc');

- In the constructor, this.email = email does not create an email property. Because the class has set email, the setter runs instead (line 24), and it stores the value in this._email. ****

- this.password = password works the same way: it calls set password, which stores the value in this._password.

- console.log(userA) prints:

User { username: 'Trumpbinladen', _email: 'trump@yandex.com', _password: '123abc' }

You see _email and _password, not email and password. The real data lives in the underscore properties. The getters and setters live on User.prototype, not on the object itself.****

- userA.password (line 45) calls get password(), which returns '123ABC' (uppercased).

- userA.password = 'zxcvb' (line 47) calls the setter, which sets _password = 'zxcvb'.

- userA.password (line 49) calls the getter again and returns 'ZXCVB'.




flowchart LR : *****
  A["userA.password = 'x'"] --> B["set password(value)"] --> C["this._password = 'x'"]
  D["userA.password"] --> E["get password()"] --> F["returns this._password.toUpperCase()"]



Important Notes   :::::

-- Getter only, no setter: the property becomes read-only. Assigning to it does nothing (or throws a TypeError in strict mode, which class code always uses).

-- (_password) is still public. The underscore is just a naming habit, so userA._password still works. For truly private data, use #password:

class User {
  #password;
  set password(v) { this.#password = v; }
  get password() { return this.#password.toUpperCase(); }
} this is the new addition in es22+.**

-- Common uses: checking values in setters (e.g. “password must be 6+ characters”), formatting values in getters, and computed values like fullName.

-- Uppercasing a password in a getter is fine for practice, but in a real app you would never return or store a password in plain text. You’d store a hash.  




*/















// using properties based ::: -----


//[Data descriptor : Accessor descriptor] =
//[value, writable   : get, set]



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



