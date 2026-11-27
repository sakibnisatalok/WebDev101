
/*
   review global execution context with stackframes.
   'this' keyword has issues when dealing with nested functions in stackframes.
   s
*/



function setUserName(username) {
  //complex DB calls
  this.username = username;
  console.log("called");
}

function createUser(username, email, password) {
  // setUserName.call(username); used to hold the reference of the function. still doesnt hold the variables in setUserName().To access the parts of the called function, we must send this in .call() function.
   setUserName.call(this,username); // now it shows username.
  

  this.email = email;
  this.password = password;
}

const newuser = new createUser("fei fei li", "feifeili@gmail.com", "123456feifei");
console.log(newuser);












