import { getData, getDirname, getPath, getAbsolutPath } from '../utils.js';
import { Forest } from './model.js';
const dirname = getDirname(import.meta.url);

const func = async (data) => {
  const forest = new Forest();
  forest.parseMap(data);
  // forest.checkTreeVisibility()
  forest.getVisibleTrees();
};

const app = async () => {
  const filename = './data.txt';
  const soursePath = getPath(dirname, filename);
  const data = await getData(soursePath);
  const result = func(data);
};

app();
