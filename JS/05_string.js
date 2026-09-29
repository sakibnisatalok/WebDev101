
const name="sakib nisat alok"
let age=10;

//console.log(name+" : " + age + " some string") it's back-dated.

console.log(`My name is ${name} and my age is ${age}.`)

const str = new String("hello world") // obj type

console.log(str)
console.log(str[1])

console.log(typeof str)
console.log(typeof name)

console.log(str.length)
console.log(str.__proto__) //****

/*

__proto__ is legacy — prefer Object.getPrototypeOf(str) in modern code.
Primitive strings are auto-boxed into String objects when you access .__proto__,
which is why it works even though "hello" itself isn’t an object.
Mutating __proto__ is possible but strongly discouraged as it breaks engine optimizations.

*/

console.log(str.toUpperCase())//doesn't mutate original string of "str"
console.log(str.charAt(4))
console.log(str.indexOf("w"))
console.log(str.slice(0,4)) // [)

const url = "https://www.sakibnisatalok.com/home-car"
const cars="toyota-porsche-boyemw"

console.log(url.replace('-', '%'))
console.log(cars.split('-'))
console.log(url.includes('.com'))









