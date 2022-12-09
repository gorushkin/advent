import { getData, splitData } from '../utils.js';

const checkCaseOne = (a, b) => {
  if (a.start <= b.start && a.end >= b.end) return 1;
  if (b.start <= a.start && b.end >= a.end) return 1;
  return false;
};

const checkCaseTwo = (a, b) => {
  if (a.end < b.start || a.start > b.end) return 0;
  return 1;
};

const temp = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

const func = (data) => {
  const splittedData = splitData(data);
  const res = splittedData.map((pair) => {
    const ranges = pair.split(',').map((range) => {
      const [start, end] = range.split('-');
      return { start: Number(start), end: Number(end) };
    });
    const isCaseOne = checkCaseOne(ranges[0], ranges[1]);
    const isCaseTwo = checkCaseTwo(ranges[0], ranges[1]);
    return { ranges, isCaseOne, isCaseTwo };
  });

  return res.reduce(
    (acc, { isCaseOne, isCaseTwo }) => ({ res1: acc.res1 + isCaseOne, res2: acc.res2 + isCaseTwo }),
    { res1: 0, res2: 0 }
  );
};

const app = async () => {
  const filename = './data.txt';
  const data = await getData(filename);
  const result = func(data);
  console.log('result: ', result);
};

app();
