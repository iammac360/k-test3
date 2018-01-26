import test from 'ava';
import run, { ENTER } from 'inquirer-test';

const cliPath = __dirname + '/readInputFile.js';

test('it must return the proper output', async t => {
  const file = './input.in.test';

  const result = await run([cliPath], [file, ENTER]);

  console.log(result);

  const expectedResponse = 'Case 1: 3';
  t.regex(result, new RegExp(expectedResponse, 'g'));

  const expectedResponse2 = 'Case 2: 4';
  t.regex(result, new RegExp(expectedResponse2, 'g'));
});
