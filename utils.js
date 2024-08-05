import { curry, go } from "fxjs";

export const pluckData = (obj) => {
  return obj.data;
};

export const pluckList = (obj) => {
  return obj.list;
};

export const pluckDataList = (obj) => {
  return go(obj, pluckData, pluckList);
};

export const mapListItems = curry((cb, list) => {
  return go(list, (list) => list.map(cb));
});

export const deconstructLanguageMap = (obj, language) => {
  return obj.languageMap[language];
};

export const mapObjectProps = (obj, keys, cb) => {
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

export const pipe = go;
