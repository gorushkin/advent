import { getData, splitData } from '../utils.js';

const getPosition = (str, markerLength) => {
  const list = str.split('');

  for (let i = 0; i < list.length - markerLength; i++) {
    const substring =  list.slice(i, markerLength + i);
    const marker = [...new Set(substring)];
    if (marker.length === markerLength) return {marker: marker.join(''), index: i + markerLength}
  }
}

const func = (data) => {
  const position1 = getPosition(data, 4);
  console.log('position1: ', position1);
  const position2 = getPosition(data, 14);
  console.log('position2: ', position2);

};

const temp = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';

const app = async () => {
  const filename = './data.txt';
  const data = await getData(filename);
  const result = func(data);
};

app();
