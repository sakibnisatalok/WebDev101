
function addnum(num1 , num2){
    return num1+num2
}

//console.log(addnum())//returns NaN
console.log(addnum(2,8))




function addnum2(num1 , num2){
    console.log(num1 + num2)
}

addnum2(3 ,10)
//console.log(addnum2(22,8)) returns 30 as well as "undefined"



function loggedinUserText(usrname){
    return `${usrname} is logged in.`
}

console.log(loggedinUserText('Barood Khan'))
console.log(loggedinUserText()) //if argument is not passed , usrname is undefined.****

function loggedinUserText1(usrname="Boom Khan"){
    return` ${usrname} is logged in.`
}
console.log(loggedinUserText1())//default parameter value



// parameter types ::: 1.REST type and 2.Destructure type 


function calcCartprice(val1 ,...prices){
    return prices
}

console.log(calcCartprice(10,20,30,44,300,1))// all arguments will be bundled into an array that is iterable.****



const jsUser={
    name: "sakib nisat alok",
    "major name": "CS", 
    age: 100,
    email: "idunno@google.com",
    phone:"01123456789",
    isLoggedIn: false,
    loggedDays: ["mon","sat","fri"],
    printName : function(){ return `name is ${this.name}`}
}
//console.log(jsUser.printName())


function printNameEmail({name,email}){
    return `Name is ${name} and email is ${email}`
}

console.log(printNameEmail(jsUser))

console.log(printNameEmail({
    name : "Barood Khan",
    email : "barood@yandex.com"
}))

const arrPrices = [220, 300, 400, 100, 3]

function printarr(anyarray){
    return anyarray[3]
}

console.log(printarr(arrPrices))


function printarr1(anyarray){
    return anyarray //pass by reference
}

console.log(printarr1(arrPrices))

function printarr11(anyarray){
    return anyarray[3] //pass by reference
}

console.log(printarr11([11,3,4,44,0,5,9]))





let a=1000
d=222
{
 let a
 a=100;
 c=999
 let u= 888

 var f=333

}

console.log("a: "+a)
console.log("c: "+c)
console.log("d: "+d)
console.log("f: "+f)
// console.log("u: "+u) gices refernce error



// global scope on NODE environment is different from BROWSER console environment.*****



console.log(addone(6))

function addone(num){
    return num+1
}




//console.log(addvar(60)) throws a reference error. *****
//hoisting concept ,final tree 
const addvar= function addtwo(num){
    return num+1
}

console.log(addvar(60)) //works fine




const user ={
    name : "Doctor Boom",
    age : 1000,
    welcomeMessage : function(){
        console.log(`hello ${this.name}, welcome on board `)
        console.log(this)// this denotes the current context. **
    } 
   
}

user.welcomeMessage()
user.name="Doctor Larry"
user.welcomeMessage()

// console.log(this) this statement returns {} in 'NODE' environment unlike 'BROWSER' environment where 'this' points to ''window'' object. ****



// arrow functions ::::


function printt(){
    let varr = "js stack"
    // console.log(this.varr) prints undefined.  ****
    console.log(this)
}

printt()



const y = () => {
    let varr = "js user"
    console.log(this.varr)// prints undefined**
    console.log(this)//returns empty parenthesis**
}

y()






// const add2= (num1 ,num2) => {
//     return num1 + num2
// }

// implicit return :: Implicit return is a shorthand syntax in arrow functions where you omit the return keyword and curly braces {}. The function automatically returns the result of the expression.

const sss= () => {}

//const add2= (num1 ,num2) =>  num1 + num2
const add2= (num1 ,num2) =>  (num1 + num2)

console.log(add2(4,8))

const ob = () => ({ name : "sakib nisat"}) // for returning object.

console.log(ob());








//ASI issue : Automatic Semicolon Insertion
// Immediately Invoked Function Expression(IIFE) ::

//first pair is for function expression and second pair is for function execution signal.

(function () {
    console.log("Instant IIFE code")
})();

(() => {
    console.log("Instant IIFE arrow function code")
})();

(function (name) {
    console.log(`username is ${name}`)
})('Barood Khan');

// always add semicolons before and after writing IFFE function. ****
// variable of any types(var,let,const) are scoped only inside the first parentheses.





// call stack ::::::

/*

When js code is fed to the interpreter it creates a execution context and executes in three phases : Global execution context , Memory execution phase and Execution phase. In the process it constructs sandboxes to deal with functions. This is how generally js handles its code.

misc : function and eval execution context. *****

*/









































































































