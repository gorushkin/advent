import { getData } from '../utils.js';

const getCharPriority = (char) => {
  const smallOffset = 96;
  const bigOffset = 64 - 26;

  const code = char.charCodeAt(0);
  if (code >= 97 && code <= 122) return code - smallOffset;
  if (code >= 65 && code <= 90) return code - bigOffset;
};

const getUniqValues = (data) => [...new Set(data.split(''))];

const getCommonValues = (string) => {
  const length = string.length;
  const part1 = string.slice(0, length / 2);
  const part2 = string.slice(length / 2);
  const uniqLetters1 = getUniqValues(part1);
  const uniqLetters2 = getUniqValues(part2);
  return uniqLetters1.filter((item) => uniqLetters2.includes(item));
};

const splitData = (data) => data.split('\n').filter((item) => !!item);

const getAllPriority = (values) => {
  const priorities = values.map(getCharPriority);
  return priorities.reduce((acc, item) => acc + item, 0);
};

const func = (data) => {
  const splittedData = splitData(data);
  const commonValues = splittedData.reduce((acc, item) => [...acc, ...getCommonValues(item)], []);

  return getAllPriority(commonValues);
};

const temp = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

const func2 = (data) => {
  const splittedData = splitData(data);
  const groupedItems = splittedData.reduce((acc, item, index, array) => {
    if (index % 3 !== 0) return acc;
    const group = [item, array[index + 1], array[index + 2]];
    return [...acc, group];
  }, []);

  const uniqValuesInGroup = groupedItems.reduce((acc, item) => {
    const uniqValuesInRuk1 = getUniqValues(item[0]);
    const uniqValuesInRuk2 = getUniqValues(item[1]);
    const uniqValuesInRuk3 = getUniqValues(item[2]);
    const res = uniqValuesInRuk1.filter(
      (item) => uniqValuesInRuk2.includes(item) && uniqValuesInRuk3.includes(item)
    );
    return [...acc, ...res];
  }, []);

  return getAllPriority(uniqValuesInGroup);
};

const app = async () => {
  const filename = './data.txt';
  const data = await getData(filename);
  const result = func(data);
  console.log('result: ', result);

  const result2 = func2(data);
  console.log('result2: ', result2);
};

app();
