


// For-of (values) for (const item of arr) { … }   **
// For-in (keys)	 for (const key in obj) { … }    ** 



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


  



// Higher-order array loops (or higher-order array methods) are built-in functions
// that iterate over arrays and accept another function (a callback) as an argument to handle the logic.





// for of ::::

// ["","","", ... ,""]
//[{}, {}, {}, ... ,{}]

const heroes = ["batman", "superman","flash","darkseid","green lantern"]

for (const hero of heroes) { // ** each iteration is a separate scope. so "hero" getting reassinged again and again.
  console.log(hero)
}

const numbers = [1,3,5,7,9]

for (let number of numbers) {
  number=number*10
  console.log(number)
}

// for..of doesnt iterate over objects. ****





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








// .filter() ::::

const nums=[2,51,6,9,3,20,54]

let filtereArr = nums.filter((num) => (num > 10)) // implicit return **

// argument funtion inside filter()
// is a selector.**

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

console.log(filteredBooks) //returns array of objects(science books).







// .map() ::::

const numss=[1,2,3,4,5,6,7,8,9]

//const filteredNums=numss.map( (num) => (num*10) )

const filteredNums = numss
.map( (num) => (num*100) )
.map( (num) => (num + 1) )
.filter( (num) => (num > 500) )

console.log(filteredNums)






// .reduce() ::::


// const result = array.reduce((accumulator, currentValue, index, array) => {
// return updatedAccumulator;
// }, initialValue);

// initialValue could be 0, {} or []. then accumulator is one of these. ****

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
console.log(totalPrice);







// freq count :::

const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];


const freq = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});

// If acc[fruit] is undefined (because the fruit hasn't been seen yet), it falls
// back to 0. If it already has a number (like 1), it uses 1

console.log(freq);








// filer(), map(), reduce() workflow :::

const products = [
  { name: 'Laptop', price: 1000, category: 'electronics', inStock: true },
  { name: 'Shoes', price: 80, category: 'apparel', inStock: true },
  { name: 'Monitor', price: 300, category: 'electronics', inStock: true },
  { name: 'Smartwatch', price: 250, category: 'electronics', inStock: false },
  { name: 'Keyboard', price: 100, category: 'electronics', inStock: true }
]; //Calculating the total revenue from in-stock electronics after applying a 10% clearance discount.


const revenue = products
  .filter((product) => (product.category === 'electronics' && product.inStock))
  .map((product) => (product.price * .9))
  .reduce((acc, price) => (acc + price), 0);

console.log(revenue);








// slice()  ::: doesnt mutate original array.**

// array.slice(startIndex, endIndex) where [startIndex, endIndex). ****

const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
const subArray = animals.slice(1, 4);

console.log(subArray); 
console.log(animals);  







// splice()   ::: does "mutate" the original array. ****


// array.splice(startIndex, deleteCount, item1, item2, ...) 

// startIndex: Where to start changing the array.
// deleteCount: How many elements to remove from startIndex.
// item1, item2, ... (optional): New elements to insert at startIndex.

const months = ['Jan', 'March', 'April', 'June'];
const removedd = months.splice(1, 2);
console.log(months);  // ['Jan', 'June'] (Original array changed!)
console.log(removedd); // ['March', 'April'] (Returned deleted items)


const numbersss = [1, 2, 5];
numbersss.splice(2, 0, 3, 4); // At index 2, delete 0 elements, insert 3 and 4
console.log(numbersss); // [1, 2, 3, 4, 5]


const colors = ['red', 'green', 'blue'];
colors.splice(1, 1, 'yellow'); // At index 1, delete 1 element ('green'), insert 'yellow'
console.log(colors); // ['red', 'yellow', 'blue']







// Actual Index = array.length + negativeIndex  for negative index. ** 

const letters = ['A', 'B', 'C', 'D', 'E']; // length = 5
const lastTwo = letters.slice(-2); // Start at index 5 + (-2) = 3 ('D') through the end
console.log(lastTwo); // ['D', 'E']

const result = letters.slice(-4, -1); //Start at index 5 + (-4) = 1 ('B') up to index 5 + (-1) = 4 ('E' excluded).
console.log(result); // ['B', 'C', 'D']




// In splice(start, deleteCount, ...items), only the start parameter accepts
// a negative index to locate where modification begins.
// The second parameter (deleteCount) is a count, not an index—if you pass
// a negative number for deleteCount, JavaScript evaluates it as 0 and deletes nothing. *****


//              0         1        2         3
const items = ['item1', 'item2', 'item3', 'item4']; // length = 4

const removed = items.splice(-2, 2);// Start at index 4 + (-2) = 2 ('item3'), delete 2 items
console.log(items);   // ['item1', 'item2']
console.log(removed); // ['item3', 'item4']






//  slice() vs substring()   ::::

/*

 Data Types: slice() works on both
 Strings and Arrays. substring() works only on Strings. **

 Negative Indices: slice(-2) counts
 backward from the end. substring(-2) treats any negative index as 0. **

*/






















