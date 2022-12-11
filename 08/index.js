import { getData, getDirname, getPath } from '../utils.js';
import { Forest } from './model.js';
const dirname = getDirname(import.meta.url);

const func = async (data) => {
  try {
    const forest = new Forest();
    forest.parseMap(data);
    forest.getVisibleTrees();
    forest.getScenicScores();
  } catch (error) {
    console.log('error: ', error);
  }
};

const app = async () => {
  const filename = './data.txt';
  const soursePath = getPath(dirname, filename);
  const data = await getData(soursePath);
  const result = func(data);
};

app();
