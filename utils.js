import { dirname } from 'path';
import { promises } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

export const getDirname = (object) => dirname(fileURLToPath(object));

export const getData = async (filepath) => {
  try {
    const data = await promises.readFile(filepath);
    return data.toString();
  } catch (error) {
    console.log('error: ', error);
    return null;
  }
};

export const getSplitedData = async (filepath) => {
  const data = await getData(filepath);
  // return data.split('\n').filter((item) => !!item);
};

export const splitData = (rawData) => {
  console.log('rawData: ', rawData);
  return rawData.split('\n').filter((item) => !!item);
};

export const getPath = (...args) => {
  const getReccurPath = (list) => {
    if (list.length === 1) return list[0];
    const [head, ...tail] = list;
    return path.join(head, getReccurPath(tail));
  };

  return getReccurPath(args);
};

export const getAbsolutPath = (...args) => getPath(path.resolve(), getPath.apply(null, args));
