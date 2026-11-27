

// reading seq : classES6.js -> inheritance.js -> staticprop -> bind.html -> objectsandmathpi.js -> getter_setter.js




class User{
  constructor(username, email, password) {
    this.username = username;
    this.email = email
    this.password =password
  }

  encryptedPass() {
    return `encryptedpass : ${this.password}`
  }

  changeUserName() {
    return `new name : ${this.username.toUpperCase()}`
  }
}

const userA = new User('feifeili', 'feifeili@dawg.gmail', '1234');
console.log(userA);

console.log(userA.changeUserName());
console.log(userA.encryptedPass());


// using funcitonal method ::


function Userr(username, email, password) {
  this.username = username;
  this.email = email
  this.password =password
}

Userr.prototype.encryptedPass = function (){
  return  `encryptedpass : ${this.password}`;
}

Userr.prototype.changeUserName = function () {
  return `new name : ${this.username.toUpperCase()}`;
}

const userB = new Userr('illiayasutskever', 'illiayasutskever@yandex.gmail', '1234321')

console.log(userB)
console.log(userB.changeUserName())
console.log(userB.encryptedPass())






















