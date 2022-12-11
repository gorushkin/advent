import { getData, getDirname, getPath } from '../utils.js';
import { Bridge } from './model.js';
const dirname = getDirname(import.meta.url);

const func = (data) => {
  const motions = data.split('\n').filter((n) => !!n);
  const bridge = new Bridge();
  motions.forEach((motion) => {
    bridge.addMotion(motion);
  });
  bridge.reccur()
  // bridge.showTailPositions();
  // bridge.getDiagram();
  // bridge.getAllDiagramms();
};

const wrongAnswers = [1789];

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
