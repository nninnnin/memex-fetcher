import { pipe } from "fxjs";

const pluckData = (obj) => {
  return obj.data;
};

const pluckList = (obj) => {
  return obj.list;
};

const pluckDataList = (obj) => {
  return pipe(obj, utils.pluckData, utils.pluckList);
};

const deconstructLanguageMap = (obj, language) => {
  return obj.languageMap[language];
};

const utils = {
  pluckData,
  pluckList,
  pluckDataList,
  deconstructLanguageMap,
};

export default utils;
