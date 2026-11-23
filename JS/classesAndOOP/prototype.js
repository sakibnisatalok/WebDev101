



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

// now we can add properties and methods to a function previously
// but now we want it for all types of objects.



Object.prototype.me = function () {
  console.log(`Im in all types of objects`);
}

heroPower.me(); // returns 'Im in all types of objects'. 'Object' is top-level(parent);so adding here
//means adding all childs. ****



function add(num1, num2) {
  return num1 + num2;
}
console.log(add(2, 10)) // 12

add.me() // returns 'Im in all types of objects'. [function]
heros.me(); // returns 'Im in all types of objects'. [array]




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



