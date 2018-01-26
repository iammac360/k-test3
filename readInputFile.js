const inquirer = require('inquirer');
const fs = require('fs');

// Main Entry
inquirer
  .prompt({
    type: 'input',
    name: 'filePath',
    default: 'input.in',
    message: 'Please Enter the path of the file you want to read',
  })
  .then(handleFileRead)
  .catch(error => console.log(error));

function handleFileRead({ filePath }) {
  const input = fs.createReadStream(filePath);

  fs.readFileAsync(filePath)
    .then(res => String(res).split('\n'))
    .then(numbers => {
      const [head, ...tail] = numbers;

      const grouped = createGroupedArray(tail, 3)

      //console.log(grouped)
      grouped.forEach((val, index) => {
        const num = getNumberOfDivisibleByK(val)
        console.log(`Case ${index + 1}: ${num}`);
      });
    });
}

function getNumberOfDivisibleByK([ valOfA, valOfB, valOfK]) {
  const a = Number(valOfA);
  const b = Number(valOfB);
  const k = Number(valOfK);

  // Get Number range from a to b
  const numbers = Array.from({length: (b + 1) - a}, (val, key) => key + a);

  return numbers
    .filter(num => (num % k) === 0)
    .length
}

const createGroupedArray = (arr, chunkSize) => {
    var groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
}


// promisify fs.readFile()
fs.readFileAsync = function (filename) {
    return new Promise(function (resolve, reject) {
        try {
            fs.readFile(filename, function(err, buffer){
                if (err) reject(err); else resolve(buffer);
            });
        } catch (err) {
            reject(err);
        }
    });
};
