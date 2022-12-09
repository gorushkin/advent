import { getData, splitData } from '../utils.js';
import { System } from './system.js';

const func = async (data) => {
  try {
    const splittedData = data.split('$ ');
    const system = new System();
    splittedData.forEach((element) => {
      system.addCommand(element);
    });
    system.print();
    // system.getSize();
    const size = system.getSize();
    // console.log('size: ', size);
    const sizes = system.getDirSizes(100000);
    // console.log(sizes);
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
