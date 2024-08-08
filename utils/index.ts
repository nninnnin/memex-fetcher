const { curry, go } = require("fxjs");

type ObjectWithData<
  Data = {
    [key: string]: any;
  }
> = {
  [key: string]: any;
  data: Data;
};

type ObjectWithList = {
  [key: string]: any;
  list: any[];
};

const pluckData = (obj: ObjectWithData) => {
  return obj.data;
};

const pluckList = (obj: ObjectWithList) => {
  return obj.list;
};

const pluckDataList = (obj: ObjectWithData<ObjectWithList>) => {
  return go(obj, pluckData, pluckList);
};

const mapListItems = curry((cb, list) => {
  return go(list, (list) => list.map(cb));
});

const deconstructLanguageMap = (obj, language) => {
  return obj.languageMap[language];
};

const mapObjectProps = (obj, keys, cb) => {
  const mappedProps = go(keys, (keys) =>
    keys.reduce((acc, key) => {
      acc[key] = cb(obj[key]);
      return acc;
    }, {})
  );

  return {
    ...obj,
    ...mappedProps,
  };
};

const pipe = go;

const Utils = {
  pluckData,
  pluckList,
  pluckDataList,
  mapListItems,
  deconstructLanguageMap,
  mapObjectProps,
  pipe,
};

module.exports = Utils;

// for noticing typescript
export = Utils;
