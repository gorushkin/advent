import { getData, splitData } from '../utils.js';
import { Schema } from './Shema.js';

const sliceMovementString = (str) => {
  const substrings = ['move ', 'from ', 'to '];
  const [amount, from, to] = substrings
    .reduce((acc, item) => acc.replace(item, ''), str)
    .split(' ');
  if (!amount || !from || !to) return null;
  return { amount, from, to };
};

const func = (data) => {
  const [rawSchema, rawMovements] = data.split('---');
  const schema1 = new Schema(rawSchema);
  const schema2 = new Schema(rawSchema);
  const movements = rawMovements
    .split('\n')
    .map(sliceMovementString)
    .filter((item) => !!item);
  movements.forEach((movement) => {
    schema1.oldMove(movement);
    schema2.newMove(movement);
  });
  const result1 = schema1.getlastBoxes();
  console.log('result1: ', result1);
  const result2 = schema2.getlastBoxes();
  console.log('result2: ', result2);
};

const app = async () => {
  const filename = './data.txt';
  const data = await getData(filename);
  const result = func(data);
};

app();
