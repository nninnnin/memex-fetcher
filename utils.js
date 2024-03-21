import { pipe } from "fxjs";

const utils = {
  pluckData(obj) {
    return obj.data;
  },

  pluckList(obj) {
    return obj.list;
  },

  pluckDataList(obj) {
    return pipe(obj, utils.pluckData, utils.pluckList);
  },

  deconstructLanguageMap(obj, language) {
    return obj.languageMap[language];
  },
};

export default utils;
