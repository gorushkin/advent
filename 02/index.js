import { getData } from '../utils.js';

const scoreMapping = {
  A: 1,
  B: 2,
  C: 3,
};

const shapeMapping = {
  X: 'A',
  Y: 'B',
  Z: 'C',
};

const mapping1 = (b) => ({
  A: scoreMapping[b] + (b === 'B' ? 6 : 0),
  B: scoreMapping[b] + (b === 'C' ? 6 : 0),
  C: scoreMapping[b] + (b === 'A' ? 6 : 0),
});

const getScore = (a, b) => {
  if (a === b) return scoreMapping[b] + 3;
  return mapping1(b)[a];
};

const mapping2 = {
  A: {
    X: scoreMapping.C,
    Z: scoreMapping.B + 6,
  },
  B: {
    X: scoreMapping.A,
    Z: scoreMapping.C + 6,
  },
  C: {
    X: scoreMapping.B,
    Z: scoreMapping.A + 6,
  },
};

const getScore2 = (a, b) => {
  if (b === 'Y') return scoreMapping[a] + 3;
  return mapping2[a][b];
};

const func = (data) => {
  const splittedData = data.split('\n');

  const modifiedData = splittedData
    .filter((item) => !!item)
    .map((item) => {
      const [a, b] = item.split(' ');
      return { a, b, c: shapeMapping[b] };
    });

  const scores1 = modifiedData.map(({ a, b, c }) => ({
    a,
    b,
    c,
    res1: getScore(a, c),
    res2: getScore2(a, b),
  }));

  const result = scores1.reduce(
    (acc, item) => {
      console.log(item);
      return { res1: acc.res1 + item.res1, res2: acc.res2 + item.res2 };
    },
    { res1: 0, res2: 0 }
  );

  return result;
};

const temp = `
A Y
B X
C Z
`;

const app = async () => {
  const filename = './data.txt';
  const data = await getData(filename);
  const result = func(data);
  console.log('result: ', result);
};

app();
