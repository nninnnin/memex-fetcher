import { curry, go } from "fxjs";

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

const utils = {
  pluckData,
  pluckList,
  pluckDataList,
  mapListItems,
  deconstructLanguageMap,
  pipe: go,
};

export default utils;
