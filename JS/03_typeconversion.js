
let score = "123ab"

console.log(score)
console.log(typeof score)

let valueInt=Number(score)

console.log(typeof valueInt)
console.log(valueInt)

//valueInt is not a number yet it shows as one.Actually its NaN type.
console.log("NULL value : ")
console.log(Number(null))
console.log("undefined value : ")
console.log(Number(undefined))
console.log("NAN value : ")
console.log(Number(NaN))

// string to num conversion ::

/*

"33" -> 33 (type : number)
"33ab" -> NaN (type : number)
NaN -> 0
undefiend -> undefined
true -> 1
false -> 0

*/

console.log(Boolean(343))
console.log(Boolean(0))
console.log(Boolean(""))//empty string
console.log(Boolean(null))
console.log(Boolean(undefined))

//  ################Ops###########

//console.log(2+2)
//console.log(2-2)
//console.log(2-3)
//console.log(2/3)
//console.log(2%3)
//console.log(2**5)


console.log(1 + "2")
console.log("1" + 2)
console.log(1 + 1+ "2")
console.log("1"+ 1 + 2)

console.log(null>0)
console.log(null==0)
console.log(null>=0)

//equality and comparison work differently in js.
//null>0 and null>=0 are same case.

console.log(Number.MAX_SAFE_INTEGER)
console.log(typeof null)

//null: A well-known quirk in JavaScript is that typeof null returns "object".
//  This is a legacy bug from the very first days of JavaScript, 
// but null is actually a primitive value.






























