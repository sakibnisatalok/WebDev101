

//check all the methods provided by 'Number' and 'Math' objects.*****

const score = 300
console.log(score)

const newscore= new Number(40011)
console.log(newscore)
console.log(newscore.toString().length) 
console.log(newscore.toFixed(3))

const frac = 23.4676
console.log(frac.toPrecision(3))// 3 digits from 'left' to 'right'

const hundreds= 10000000
console.log(hundreds.toLocaleString('en-IN'))

console.log(Number.MAX_VALUE)

//###################### maths ################

console.log(Math)

const minvalue=10
const maxvalue=25

const generated = minvalue + Math.floor(Math.random()*(maxvalue-minvalue+1))
console.log(generated)



Number.MAX_SAFE_INTEGER  // 9007199254740991
Number.MIN_SAFE_INTEGER  // -9007199254740991
Number.EPSILON           // ~2.22e-16 (smallest floating point difference)
Number.POSITIVE_INFINITY // Infinity
Number.NaN               // NaN


// Static Methods :::::

// Number.isInteger() - checks if value is a whole number
Number.isInteger(42);       // true
Number.isInteger(42.5);     // false

// Number.isFinite() - checks if value is finite
Number.isFinite(100);       // true
Number.isFinite(Infinity);  // false

// Number.isNaN() - checks if value is NaN
Number.isNaN(NaN);          // true
Number.isNaN(42);           // false

// Number.parseInt() - parses string to integer
Number.parseInt("42px");    // 42
Number.parseInt("3.99");    // 3

// Number.parseFloat() - parses string to float
Number.parseFloat("3.14abc"); // 3.14
Number.parseFloat("3.99");    // 3.99




// Instance Methods :::::

const num = 3.14159;

// .toFixed(n) - rounds to n decimal places (returns string)
num.toFixed(2);           // "3.14"
num.toFixed(0);           // "3"

// .toPrecision(n) - n significant digits (returns string)
num.toPrecision(4);       // "3.142"
num.toPrecision(2);       // "3.1"

// .toString(base) - converts to string, optional base/radix
(255).toString();         // "255"
(255).toString(16);       // "ff"  (hex)
(255).toString(2);        // "11111111" (binary)

// .toLocaleString() - locale-aware formatting
(1000000).toLocaleString();          // "1,000,000"
(3.5).toLocaleString("de-DE");       // "3,5" (German format)

// .valueOf() - returns the primitive number value
const numObj = new Number(99);
numObj.valueOf();         // 99









































