const fs = require('fs')
const regex = /^[^0-9]*$/m;
const allVals = []
const numberStr = [['one',1], ['two',2], ['three',3], ['four',4], ['five',5], ['six',6], ['seven',7], ['eight',8], ['nine',9]];

const numberEl = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
}

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

// console.log(datas[0].indexOf('one'))

for (const data in datas){
    const currentData = datas[data].split("")
    allVals.push([],)
    let prevNumbers = []

    for (const char in currentData){
        const currentChar = currentData[char];

        if (isNumber(currentChar) & !prevNumbers.includes(Number(currentChar))){

            allVals[data].push([Number(currentChar), Number(char)])
            // console.log(allVals[data])
            // prevNumbers.push(Number(currentChar))
            // currentData[data].remove(datas[data].indexOf(currentChar))

        } 
        
        // else if (prevNumbers.includes(Number(currentChar))){
        //     console.log(prevNumbers, currentChar, 'index:',datas[data].indexOf(currentChar))



        // }
        // console.log(prevNumbers)
    }

    for (const stringIndex in numberStr){
        let fullSearch = false;
        let lastKnownInstance = 0;

        while (fullSearch == false) {
            // console.log(numberStr[stringIndex][0])
            if (datas[data].indexOf(numberStr[stringIndex][0], lastKnownInstance) >= lastKnownInstance){
                let currentNumber = numberStr[stringIndex][0]

                // console.log(datas[data].indexOf(numberStr[stringIndex][0]), currentNumber, numberStr[stringIndex], allVals[data], datas[data]);
                
                allVals[data].push([numberEl[currentNumber], Number(datas[data].indexOf(currentNumber, lastKnownInstance))])
                // console.log([String(numberEl[currentNumber]), datas[data].indexOf(currentNumber, lastKnownInstance)], datas[data])


                lastKnownInstance = Number(datas[data].indexOf(currentNumber, lastKnownInstance)+currentNumber.length);
            
            } else if (datas[data].indexOf(numberStr[stringIndex][0], lastKnownInstance) === -1){
                fullSearch = true;
                // console.log('searched whole string no more results', numberStr[stringIndex][0])
            } else {
                console.log('you fed up')
            }
        }
    }
}

for (const groupNums in allVals){
    // let FL = allVals[groupNums][0] + allVals[groupNums][allVals[groupNums].length-1]
    // console.log(FL)
    // sum += Number(FL);
    let biggestIndex = 0;
    let smallestIndex = 1000;
    let biggestIndexNumber = '';
    let smallestIndexNumber = '';
    let allToGetherNumber = '';

    for (const numIndex in allVals[groupNums]){
        let currentnumba = allVals[groupNums][numIndex][0]
        let currentnumbaIndex = allVals[groupNums][numIndex][1]

        currentnumbaIndex = Number(currentnumbaIndex)

        if (currentnumbaIndex <= smallestIndex){
            smallestIndex = currentnumbaIndex;
        }
        
        if (currentnumbaIndex >= biggestIndex){
            biggestIndex = currentnumbaIndex;
        }
        
    }
    // console.log(allVals[groupNums], smallestIndex, biggestIndex)

    for (const group in allVals[groupNums]){

        if (allVals[groupNums][group][1] === smallestIndex){
            // console.log(allVals[groupNums][group], groupNums)
            // console.log(Number(allVals[groupNums][group][0]))

            smallestIndexNumber = allVals[groupNums][group][0]
        }
        if (allVals[groupNums][group][1] === biggestIndex){
            
            biggestIndexNumber = allVals[groupNums][group][0]
        }
    }
    // console.log(smallestIndexNumber, biggestIndexNumber)


    allToGetherNumber += String(smallestIndexNumber);
    allToGetherNumber += String(biggestIndexNumber);
    // console.log(allToGetherNumber)

    if (allToGetherNumber.length == 2){        
        // console.log(allToGetherNumber, groupNums, allVals[groupNums])
        sum += Number(allToGetherNumber)
    }else (
        console.log("ERROR")
    )
    
    // console.log(smallestIndexNumber, biggestIndexNumber, allVals[groupNums])
    // console.log(allToGetherNumber)

    // console.log(allVals[groupNums], smallestIndex, biggestIndex)
    // console.log(allVals)

}

console.log(sum)