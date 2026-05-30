
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

jsUser.greeting=function(){
    console.log(`hello ${this.name}`)
}


jsUser.greeting()

jsUser.major=function(major){
    console.log(`${this.name}'s major is ${major}`)
}

jsUser.major('cse')







