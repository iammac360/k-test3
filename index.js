const inquirer = require('inquirer');

function validateNumeric(maxNum = 100) {
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

    if (prevHash.valOfA !== undefined) {
      if (val > prevHash.valOfA) {
        return 'The entered value must be greater than the answer for the previous question';
      }
    }

    return true
  }
}

function handleNextQuestions({ numOfTestCase }) {
  for(let i = 0; i < numOfTestCase; i++) {
    inquirer
      .prompt([{
        type: 'input',
        name: 'valOfA',
        default: 1,
        message: 'Enter value for A: ',
        validate: validateNumeric(10000),
      }, {
        type: 'input',
        name: 'valOfB',
        default: 1,
        message: 'Enter value for B: ',
        validate: validateNumeric(10000),
      }])
      .then(answers => console.log(answers))
      .catch(error => console.log(error));
  }
}

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
