import { getData, getDirname, getPath } from '../utils.js';
import { Machine } from './model.js';
const dirname = getDirname(import.meta.url);

const func = (data) => {
  const splittedData = data.split('\n').filter((n) => !!n);
  const machine = new Machine();
  for (const element of splittedData) {
    machine.addCommanud(element);
  }
  machine.status();
  machine.getSignals();
  console.log(machine.signals);
};

const app = async () => {
  const filename = './data.txt';
  const soursePath = getPath(dirname, filename);
  const data = await getData(soursePath);

  try {
    const result = func(data);
  } catch (error) {
    console.log('error: ', error);
  }
};

app();
// 1 + 15 - 11 + 6 - 3 + 5 - 1 - 8 + 13 + 4
