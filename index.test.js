// POSITIVE TEST
// SAMPLE INPUTS
// -----------------------------------------
// How many test cases you want to enter?: 2
// Enter value for A: 1
// Enter value for B: 10
// Enter value for K: 3
// Enter value for A: 8
// Enter value for B: 20
// Enter value for K: 4
//
// EXPECTED OUTPUT
// -----------------------------------------
// Case 1: 3
// Case 2: 4

import test from 'ava';
import run, { ENTER } from 'inquirer-test';
import fs from 'fs';

const cliPath = __dirname + '/index.js';

test('It must return the proper output', async t => {
  const t_input = '2';
  const a_input1 = '1';
  const b_input1 = '10';
  const k_input1 = '3';
  const a_input2 = '8';
  const b_input2 = '20';
  const k_input2 = '4';

  const result = await run([cliPath], [
    t_input,
    ENTER,
    a_input1,
    ENTER,
    b_input1,
    ENTER,
    k_input1,
    ENTER,
    a_input2,
    ENTER,
    b_input2,
    ENTER,
    k_input2,
    ENTER,
  ]);

  console.log(result);

  const expectedResponse = 'Case 1: 3';
  t.regex(result, new RegExp(expectedResponse, 'g'));

  const expectedResponse2 = 'Case 2: 4';
  t.regex(result, new RegExp(expectedResponse2, 'g'));
});
