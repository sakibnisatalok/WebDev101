
/*
singleton objects

object.create  using constructor 

*/

//object types : 1.literal 2.singleton ****


const myObj={} //empty literal object
console.log(typeof myObj)

const myobj= new Object() //singleton object
console.log(typeof myobj)




const symbolKey= Symbol("example")

const jsUser={
    name: "sakib nisat alok",
    "major name": "CS", 
    age: 100,
    [symbolKey]: "just for symbol", //symbol key:value pair****
    email: "idunno@google.com",
    phone:"01123456789",
    isLoggedIn: false,
    loggedDays: ["mon","sat","fri"]
}

console.log(jsUser.name)
console.log(jsUser["name"]) //internally name key is stored as "name" string.
console.log(jsUser["major name"]) //cant be accessed through dot operator as i'ts a string. console.log(jsUser.major name) returns ERROR.

console.log(typeof jsUser[symbolKey])
console.log(jsUser[symbolKey])


//value changing and freezing a key :::

/*
console.log(jsUser)
jsUser.email="idunno@outlook.com"
console.log(jsUser)
Object.freeze(jsUser)
jsUser.email="idunno@yandex.com"
console.log(jsUser)
*/

console.log(jsUser)

jsUser.greeting= function(){
    console.log("hello user")
}

console.log(jsUser.greeting) // returns the reference of that object function.**

console.log(jsUser.greeting()) //If you want only "hello user" printed, call jsUser.greeting() by itself (without wrapping it in another console.log). If you want console.log to show something else, have the function return a value (e.g., return "hello user") and then console.log(jsUser.greeting()) will print that returned value only.****



jsUser.greetingUser= function(){
    console.log(`hello ${this.name}`)//this references the object itself.Using that, we can access the object elements.
}

console.log(jsUser.greetingUser())//inner funciton prints the value and outer function prints undefined*****



console.log("############# Object Literal ##################")


const singletonObj=new Object()

singletonObj.name= "sakib nisat alok"
singletonObj.age=44
singletonObj.email= "email@yandex.com"
singletonObj.id="123abc"

console.log(singletonObj)



const regularUser={
    email: "player@yandex.com",
    name: {
        fullname: {
            firstname: "Barood",
            lastname : "Khan"
        }
    },
    ID:"abcdef123",
    gender: "male",
    country: "Bangladesh"
}

console.log(regularUser)
console.log(regularUser.name)
console.log(regularUser.name.fullname)
console.log(regularUser.name.fullname.firstname)





const obj1={
    1: "a",
    2: "b"
}
const obj2={
    3: "c",
    4: "d"
}
const obj3={
    5: "e",
    6: "f"
}

//Object.assign(target,source) returns. Make sure there is no duplicate 'KEYS'

const objMerger=Object.assign({},obj1,obj2,obj3)
console.log(objMerger)
console.log(typeof objMerger)


const spreadMerge= {...obj1,...obj2,...obj3}
console.log(spreadMerge)
console.log(typeof spreadMerge)






const arrObjects=[
    {
        id: "123",
        email: "sth@gmail.com"
    },
    {
        id: "abc123",
        email: "ath@gmail.com"
    }
]

console.log(arrObjects[1].email)
console.log()

console.log(regularUser)

console.log(Object.keys(regularUser))// returns an array
console.log()
console.log(Object.values(regularUser)) // returns an array
console.log()
console.log(Object.entries(regularUser)) // returns an array of arrays ***
console.log()

console.log(regularUser.hasOwnProperty('country'))
console.log()




const course={
    coursename: "JavaScript",
    price: 2223,
    duration: "5 hrs",
    practiceprobs: 33
}

const {coursename,duration:time} = course

console.log(coursename)
//console.log(name)
console.log(time)

 
//for json, keys are all in string format.**

//JSON-> javascript object notation is a data format used when dealing with APIs.


//APIs can come in two formats : raw object and array of objects.

{}

[
    {},
    {},
    {}
]










































































































































