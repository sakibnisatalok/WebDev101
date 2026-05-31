

if(true) console.log("hello world"), console.log("hello world"),console.log("hello world");


const score = 500

if(score<100){
    console.log("less than 100");
}
else if(score<300){
    console.log("less than 300");
}
else if(score<400){
    console.log("less than 400");
}
else{
    console.log("equal or greater than 400");
}


// switch uses strict comparison.

switch(new Date().getDay()){
    case 0 :
        console.log("Sunday");
        break
    case 1 :
        console.log("Monday");
        break
    case 2 :
        console.log("Tuesday");
        break    
    case 3 :
        console.log("Wednesday");
        break 
    case 4 :
        console.log("Thursday");
        break
    case 5 :
        console.log("Friday");
        break
    case 6 :
        console.log("Saturday");
        break   
    default:
        console.log("Invalid day")        
}


// falsy values
// false, 0, -0, BigInt 0n, "", null, undefined, NaN

//truthy values
// "0", 'false', " ", [], {}, function(){}

const username = []

if(username.length===0){
    console.log("Array is empty")
}

const userobj = {}

if(Object.keys(userobj).length===0){
    console.log("Object is empty")

}

/*

false==0
false==''
0==''

all there are true
*/


// nullish coalescing operator(??) : null and undefined

// let value = null ?? 100
//let value = undefined ?? 1000
let value = undefined ?? 33 ?? 400
//takes the left most value after null or undefined. **

console.log(value)


let scores = 1000

scores < 1000 ? console.log("less than 1000") : console.log("greater or equal to 1000")



















































