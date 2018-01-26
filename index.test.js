import test from 'ava';
import run, { ENTER } from 'inquirer-test';

const cliPath = __dirname + '/index.js';

// NEGATIVE TESTS: Testing Constraints
test('throws error if the answer for the first question is not a number', async t => {
  const input = 'thisisnotanumber';
  const result = await run([cliPath], [input, ENTER]);

  console.log(result);

  const expectedResponse = 'The entered value is not a number';
  t.regex(result, new RegExp(expectedResponse, 'g'));
});

test('throws error if the answer for the first question is less than 1', async t => {
  const input = '0'
  const result = await run([cliPath], [input, ENTER]);

  console.log(result);

  const expectedResponse = 'The entered value must be greater than or equal to 1';
  t.regex(result, new RegExp(expectedResponse, 'g'));
});

test('throws error if the answer for the first question is greater than 100', async t => {
  const input = '299'
  const result = await run([cliPath], [input, ENTER]);

  console.log(result);

  const expectedResponse = 'The entered value must be less than or equal to 100';
  t.regex(result, new RegExp(expectedResponse, 'g'));
});

test('throws error if the answer for the second question(A) is not a number', async t => {
  const t_input = '1';
  const a_input = 'thisisnotanumber';
  const result = await run([cliPath], [t_input, ENTER, a_input, ENTER]);

  console.log(result);

  const expectedResponse = 'The entered value is not a number';
  t.regex(result, new RegExp(expectedResponse, 'g'));
});

test('throws error if the answer for the third question(B) is not a number', async t => {
  const t_input = '1';
  const a_input = '1';
  const b_input = 'thisisnotanumber';
  const result = await run([cliPath], [
    t_input,
    ENTER,
    a_input,
    ENTER,
    b_input,
    ENTER]
  );

  console.log(result);

  const expectedResponse = 'The entered value is not a number';
  t.regex(result, new RegExp(expectedResponse, 'g'));
});

test('throws error if the answer for the second question(A) is less than 1', async t => {
  const t_input = '1';
  const a_input = '0';
  const result = await run([cliPath], [t_input, ENTER, a_input, ENTER]);

  console.log(result);

  const expectedResponse = 'The entered value must be greater than or equal to 1';
  t.regex(result, new RegExp(expectedResponse, 'g'));
});

test('throws error if the answer for the third question(B) is less than 1', async t => {
  const t_input = '1';
  const a_input = '32';
  const b_input = '0';
  const result = await run([cliPath], [t_input, ENTER, a_input, ENTER, b_input, ENTER]);

  console.log(result);

  const expectedResponse = 'The entered value must be greater than or equal to 1';
  t.regex(result, new RegExp(expectedResponse, 'g'));
});

test('throws error if the answer for the second question(A) is greater than 10000', async t => {
  const t_input = '1';
  const a_input = '9933123';
  const result = await run([cliPath], [t_input, ENTER, a_input, ENTER]);

  console.log(result);

  const expectedResponse = 'The entered value must be less than or equal to 10000';
  t.regex(result, new RegExp(expectedResponse, 'g'));
});

test('throws error if the answer for the third question(B) is greater than 10000', async t => {
  const t_input = '1';
  const a_input = '1';
  const b_input = '122344123';
  const result = await run([cliPath], [t_input, ENTER, a_input, ENTER, b_input, ENTER]);

  console.log(result);

  const expectedResponse = 'The entered value must be less than or equal to 10000';
  t.regex(result, new RegExp(expectedResponse, 'g'));
});

test('throws error if the answer for third question(B) is less than the answer for the second question(A)', async t => {
  const t_input = '1';
  const a_input = '1';
  const b_input = '32';
  const result = await run([cliPath], [t_input, ENTER, a_input, ENTER, b_input, ENTER]);

  console.log(result);

  const expectedResponse = 'The entered value must be greater than the answer for the previous question';
  t.regex(result, new RegExp(expectedResponse, 'g'));
})
