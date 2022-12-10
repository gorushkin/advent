import { getData, splitData } from '../utils.js';
import { System } from './system.js';

const DIR_SIZE_LIMIT = 100000;
const SPACE_NEED = 30000000;

const func = async (data) => {
  try {
    const splittedData = data.split('$ ');
    const system = new System();
    splittedData.forEach((element) => {
      system.addCommand(element);
    });
    // system.print();
    const size = system.getSize();
    console.log('size: ', size);
    const sizes = system.getDirSizes();
    const summSizes = sizes.reduce((acc, item) => acc + item.size, 0);
    const sortesSizes = sizes.sort((a, b) => a.size - b.size);
    // console.log('sortesSizes: ', sortesSizes);

    const unusedSpace = system.getFreeSpace();
    console.log('currentFreeSpace: ', unusedSpace);

    const need = SPACE_NEED - unusedSpace;
    console.log('need: ', need);

    let result;

    for (let dir of sizes) {
      if (dir.size > need) {
        result = dir;
        break;
      }
    }

    console.log(result);
  } catch (error) {
    console.log('error: ', error);
  }
};

const app = async () => {
  const filename = './data.txt';
  const data = await getData(filename);
  const result = func(data);
};

app();
