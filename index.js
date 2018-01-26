const inquirer = require('inquirer');


// Main Entry
inquirer
  .prompt({
    type: 'input',
    name: 'numOfTestCase',
    default: 1,
    message: 'How many test cases you want to enter?',
    validate: validateNumeric(),
  })
  .then(handleNextQuestions)
  .catch(error => console.log(error));

function validateNumeric(maxNum = 100, checkValOfA = false) {
  return (val, prevHash) => {
    if (isNaN(val)) {
      return 'The entered value is not a number';
    }

    if (Number(val) < 1) {
      return 'The entered value must be greater than or equal to 1';
    }

    if (Number(val) > maxNum) {
      return `The entered value must be less than or equal to ${maxNum}`;
    }

    if (prevHash.valOfA !== undefined && checkValOfA) {
      if (Number(val) <= Number(prevHash.valOfA)) {
        return 'The entered value must be greater than the answer for the previous question';
      }
    }

    return true
  }
}

function handleResults(results = []) {
  return results.forEach((num, index) => {
    console.log(`Case ${index + 1}: ${num}`);
  });
}

function inquireNextQuestions(numOfTestCase, index = 1, results = []) {
  if (numOfTestCase < 1) return handleResults(results);

  inquirer
    .prompt([{
      type: 'input',
      name: 'valOfA',
      default: 1,
      message: `(Case ${index}) Enter value for A: `,
      validate: validateNumeric(10000),
    }, {
      type: 'input',
      name: 'valOfB',
      default: 1,
      message: `(Case ${index}) Enter value for B: `,
      validate: validateNumeric(10000, true),
    }, {
      type: 'input',
      name: 'valOfK',
      default: 1,
      message: `(Case ${index}) Enter value for K: `,
      validate: validateNumeric(10000),
    }])
    .then(getNumberOfDivisibleByK)
    .then(num => {
      inquireNextQuestions(numOfTestCase - 1, index + 1, results.concat(num))
    })
    .catch(error => console.log(error));
}

function handleNextQuestions({ numOfTestCase }) {
  return inquireNextQuestions(numOfTestCase);
}

function getNumberOfDivisibleByK({ valOfA, valOfB, valOfK}) {
  const a = Number(valOfA);
  const b = Number(valOfB);
  const k = Number(valOfK);

  // Get Number range from a to b
  const numbers = Array.from({length: (b + 1) - a}, (val, key) => key + a);

  return numbers
    .filter(num => (num % k) === 0)
    .length
}
