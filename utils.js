import { curry, go, reduce } from "fxjs";

const pluckData = (obj) => {
  return obj.data;
};

const pluckList = (obj) => {
  return obj.list;
};

const pluckDataList = (obj) => {
  return go(obj, utils.pluckData, utils.pluckList);
};

const mapListItems = curry((cb, list) => {
  return go(list, (list) => list.map(cb));
});

const deconstructLanguageMap = (obj, language) => {
  return obj.languageMap[language];
};

const mapObjectProps = (obj, keys, cb) => {
  const mappedProps = go(
    keys,
    reduce((acc, key) => {
      if (!obj[key]) return acc;

      acc[key] = cb(obj[key]);
      return acc;
    }, {})
  );

  return {
    ...obj,
    ...mappedProps,
  };
};

const utils = {
  pluckData,
  pluckList,
  pluckDataList,
  mapListItems,
  deconstructLanguageMap,
  mapObjectProps,
  pipe: go,
};

export default utils;
