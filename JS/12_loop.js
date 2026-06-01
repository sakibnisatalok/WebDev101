

for (let i = 0; i < 10; i++) {
    const element = i;
    console.log(i)
}

let check=0

while(check<=10){
    console.log(`value of check is : ${check}`)
    check++
}

let score=1000
do {
    console.log(`score value is : ${score}`)
  
} while (score < 10);


  



// Higher-order array loops (or higher-order array methods) are built-in functions that iterate over arrays and accept another function (a callback) as an argument to handle the logic.



// for of ::::

// ["","","", ... ,""]
//[{}, {}, {}, ... ,{}]

const heroes = ["batman", "superman","flash","darkseid","green lantern"]

for (const hero of heroes) {
    console.log(hero)
}

const numbers = [1,3,5,7,9]

for (let number of numbers) {
    number=number*10
    console.log(number)
}

// for..of doesnt iterate over objects. **


// foreach() ::::


const langs=["js","c++","c","python","lua","zig"]

langs.forEach( function print(lang){
    console.log(lang + 'A')
})

langs.forEach( (lang)=>{
    console.log(lang + 'B')
} )

function printt(lang){
    console.log(lang + 'C')
}

langs.forEach(printt)//just send the name of the function as a "callback" . ***


console.log(langs)

console.log("filter begins : ")

// .filter() ::::


const nums=[2,51,6,9,3,20,54]

let filtereArr = nums.filter( (num) => (num>10) ) // implicit return **

console.log(filtereArr)

let filtereArrr = nums.filter( (num) => {
 return num>10
} ) //must type return keyword.otherwise returns empty array

console.log(filtereArrr)

// .filter() returns an array of filtered array elements.


const books = [
    { title: 'Book One', genre: 'Fiction', publish: 1981, edition: 2004 },
    { title: 'Book Two', genre: 'Non-Fiction', publish: 1992, edition: 2008 },
    { title: 'Book Three', genre: 'History', publish: 1999, edition: 2007 },
    { title: 'Book Four', genre: 'Non-Fiction', publish: 1989, edition: 2010 },
    { title: 'Book Five', genre: 'Science', publish: 2009, edition: 2014 },
    { title: 'Book Six', genre: 'Fiction', publish: 1987, edition: 2010 },
    { title: 'Book Seven', genre: 'History', publish: 1986, edition: 1996 },
    { title: 'Book Eight', genre: 'Science', publish: 2011, edition: 2016 },
    { title: 'Book Nine', genre: 'Non-Fiction', publish: 1981, edition: 1989 },
];

const filteredBooks= books.filter( (bookObj) => (bookObj.genre === 'Science') ) 

console.log(filteredBooks) //returns array of objects.



console.log("Map begins : ")

// .map() ::::

const numss=[1,2,3,4,5,6,7,8,9]

//const filteredNums=numss.map( (num) => (num*10) )

const filteredNums = numss
.map( (num) => (num*100) )
.map( (num) => (num + 1) )
.filter( (num) => (num > 500) )

console.log(filteredNums)


// .reduce() ::::

const numberss=[1,2,3,4,5,6,7,8,9]

// const filNums = numberss.reduce(
//     function(acc,currval){
//         console.log(`acc : ${acc} and current val ${currval}`)
//         return acc + currval 
//     },0
// )   

const filNums = numberss.reduce( (acc,currval) => (acc+currval), 0 )

console.log(filNums)

const shoppingCart = [
    {
        itemName: "js course",
        price: 2999
    },
    {
        itemName: "py course",
        price: 999
    },
    {
        itemName: "mobile dev course",
        price: 5999
    },
    {
        itemName: "data science course",
        price: 12999
    },
]

const totalPrice = shoppingCart.reduce( (acc,currval) => (currval.price + acc),0 )

console.log(totalPrice)


















