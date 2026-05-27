

const arrNum=[200,12,33,4,35]
const arrStr=["batman","superman","baroodman","doctor boom"]
const arrObj= new Array(123,5,4,"hello","sup",55.6)

console.log(typeof arrNum)
console.log(typeof arrStr)
console.log(typeof arrObj)


console.log(arrNum)
console.log(arrStr)
console.log(arrObj)


console.log(arrStr[2])

//methods::

console.log(arrNum.includes(44))
console.log(arrNum.indexOf(44)) // if false, returns -1.

console.log(arrNum.join())
console.log(typeof arrNum.join())

//slice and splice ::*******

//splice :: this method manipulates the original array unlike "slice". ****

console.log("A : " + arrNum)//printed as a string*
console.log(arrNum.slice(1,3))// [1st index,last index)


console.log("Before splice : " + arrNum)
console.log(arrNum.splice(1,3))// [1st index,last index]
console.log("After splice : " + arrNum)//original array is now modified****

console.log()
console.log("################################")







console.log("Concatenate method : ")

const arrMarvel=["ironman","spiderman","hulk","punisher"]
const arrDc=["superman","batman","flash","darkseid"]
const arrLinear=arrMarvel.concat(arrDc)
console.log(arrLinear)

console.log("Spread operator : ")
const arrSpread=[...arrMarvel,...arrDc]
console.log(arrSpread)

console.log("Push method : ")
arrMarvel.push(arrDc)
console.log(arrMarvel)
console.log(arrMarvel[4][1])//*** */



const arrWeird=[11,3,2,4,[6,55,31],0,[1,[66,43,22]]]
console.log(arrWeird)
const arrflat=arrWeird.flat(Infinity)//depth is infinity
console.log(arrflat)








console.log(Array.isArray("abcdef"))//checking
console.log(Array.from("abcdef"))//converting into an array pf characters
console.log(Array.from({name : "abcdef"}))//returns empty array. Cant convert into an array. Must select from which it should create an array : keys or values


let value1=10
let value2=20
let value3=30
let value4=40

console.log(Array.of(value1,value2,value3,value4))

//'Array.of()' : create a new Array from its arguments (each argument becomes an element). 'Array.from()' : create a new Array from an array-like or iterable object (converts/Clones).**


console.log(Array(7))

const arrEmpty=Array(6)
console.log(arrEmpty)
























































