
let mydate=new Date()

console.log(typeof mydate)

console.log(mydate)
console.log(mydate.toString())
console.log(mydate.toDateString())
console.log(mydate.toISOString())
console.log(mydate.toJSON())
console.log(mydate.toLocaleDateString())
console.log(mydate.toTimeString())

console.log(mydate.getTime())//milliseconds count till now

console.log((new Date(2023,0,22,4,6)).toLocaleString())

const timestamp=Date.now()
console.log(timestamp)//returns in milliseconds

const currentdate= new Date()
console.log(currentdate.getMonth())//0-indexed
console.log(currentdate.getDay())//week day

// string interpolation

let weekday = currentdate.toLocaleString('default',{
  weekday : "long"
}) // ****
/*

'default' → uses the user’s local language/locale.
{ weekday: "long" } → tells it to only return the full weekday name.

If today is Sunday:
weekday // "Sunday"

If locale is French:
weekday // "dimanche"


*/

console.log(typeof weekday)
console.log(weekday)

//care about temporal version of 'date'
//read docs




































