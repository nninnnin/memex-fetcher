import cjsModule from "../cjs/index.js";

export default cjsModule;

export const {
  createMemexFetcher,
  deconstructLanguageMap,
  mapListItems,
  mapObjectProps,
  pipe,
  pluckData,
  pluckDataList,
  pluckList,
} = cjsModule;
