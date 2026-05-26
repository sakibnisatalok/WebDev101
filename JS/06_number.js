

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












































