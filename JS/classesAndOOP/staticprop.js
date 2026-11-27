


// reading seq : classES6.js -> inheritance.js -> staticprop.js -> bind.html -> objectsandmathpi.js -> getter_setter.js




class User{
  constructor(username, email, password) {
    this.username = username;
    this.email = email
    this.password =password
  }

  logMe() {
    console.log(`Username is ${this.username}`);
  }

  encryptedPass() {
    return `encryptedpass : ${this.password}`;
  }

  changeUserName() {
    return `new name : ${this.username.toUpperCase()}`;
  }

  static createID() {
    return `abcd1234`;
  }
}

// if we dont want the instances of the object to inherit certain methods, we use static before those restricted methods like we did in User{} class's createId() method.****

const userA = new User('Davidching', 'Davidching@example.com', 'pas12sword');

console.log(userA);
console.log(userA.changeUserName());


// console.log(userA.createID()); TypeError: userA.createID is not a function
// console.log(User.prototype);






















