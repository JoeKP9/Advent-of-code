const fs = require('fs')
const regex = /^[^0-9]*$/m;
const allVals = []
let sum = 0;

try {
  var input = fs.readFileSync('1-input.txt', 'utf8')
} catch (err) {
  console.error(err)
}

function isNumber(str) {
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

var datas = input.split("\n")

console.log(datas)

for (const data in datas){
    const currentData = datas[data].split("")
    allVals.push([])

    for (const char in currentData){
        const currentChar = currentData[char];

        if (isNumber(currentChar)){

            allVals[data].push(currentChar)

        }
    }
}

for (const groupNums in allVals){
    let FL = allVals[groupNums][0] + allVals[groupNums][allVals[groupNums].length-1]
    // console.log(FL)
    sum += Number(FL);
}

console.log(sum)
// console.log(allVals)

