import { getData } from '../utils.js';

const func = (data, amount) => {
  const splittedData = data.split('\n');

  const elfs = splittedData.reduce((acc, n) => {
    const value = Number(n);
    if (!value) return [...acc, 0];
    const currentIndex = acc.length - 1;
    const currentElf = acc[acc.length - 1];
    const countedValue = currentElf ? currentElf + value : value;
    acc[currentIndex] = countedValue;
    return acc;
  }, []);

  const filteredElfs = elfs.filter((item) => !!item);

  const sortedElfs = filteredElfs.sort((a, b) => b - a);

  const result = sortedElfs.slice(0, amount).reduce((acc, item) => acc + item, 0);

  return result;
};

const app = async () => {
  const filename = './data.txt';
  const data = await getData(filename);
  const result = func(data, 3);
  console.log('result: ', result);
};

app();
