import { dirname } from 'path';
import { promises } from 'fs';
import { fileURLToPath } from 'url';

export const getDirname = (object) => dirname(fileURLToPath(object));

export const getData = async (filepath) => {
  const data = await promises.readFile(filepath);
  return data.toString();
};

export const getSplitedData = async (filepath) => {
  const data = await getData(filepath);
  // return data.split('\n').filter((item) => !!item);
};

export const splitData = (rawData) => {
  console.log('rawData: ', rawData);
  return rawData.split('\n').filter((item) => !!item);
};
