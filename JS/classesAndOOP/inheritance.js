


// reading seq : classES6.js -> inheritance.js -> staticprop -> bind.html -> objectsandmathpi.js -> getter_setter.js




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
}


class Teacher extends User {
  constructor(username, email, password, dept, courseName) {
    super(username, email, password);
    this.dept = dept;
    this.courseName = courseName;  
  }

  displayMyCredentials() {
    console.log(`Department: ${this.dept}, Course: ${this.courseName}, Name: ${this.username}`);
  }
}


const teacherA = new Teacher('bobmoler', 'bobmoler@gmail.com', '12312', 'cse', 'DSA');
const teacherB = new Teacher('dobmoler', 'dobmoler@gmail.com', '123312', 'cse', 'OS');


console.log(teacherA);
console.log(teacherB);

console.log(teacherA === teacherB); //false
console.log(teacherA instanceof Teacher); //true
console.log(teacherA instanceof User); //true
console.log(Teacher instanceof User); //false 

 



















