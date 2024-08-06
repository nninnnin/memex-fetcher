import { AxiosInstance, AxiosResponse } from "axios";

interface ObjectWithList {
  [key: string]: any;
  list: any;
}

interface ObjectWithData {
  [key: string]: any;
  data: any;
}

interface Utils {
  deconstructLanguageMap: (arg: any) => any;
  mapListItems: (arg: any) => any;
  mapObjectProps: (arg: any) => any;
  pipe: (arg: any) => any;
  pluckData: (arg: ObjectWithData) => any;
  pluckDataList: (arg: { [key: string]: any; data: ObjectWithList }) => any;
  pluckList: (arg: ObjectWithList) => any;
}

declare class MemexFetcher {
  fetcher: AxiosInstance;

  constructor(token: string);

  post(url: string, data: Record<string, unknown>): Promise<AxiosResponse<any>>;
}

declare const createMemexFetcher: (
  token: string,
  headers?: Record<string, unknown>
) => MemexFetcher;

declare const deconstructLanguageMap: Utils["deconstructLanguageMap"];
declare const mapListItems: Utils["mapListItems"];
declare const mapObjectProps: Utils["mapObjectProps"];
declare const pipe: Utils["pipe"];
declare const pluckData: Utils["pluckData"];
declare const pluckDataList: Utils["pluckDataList"];
declare const pluckList: Utils["pluckList"];

export {
  createMemexFetcher,
  deconstructLanguageMap,
  mapListItems,
  mapObjectProps,
  pipe,
  pluckData,
  pluckDataList,
  pluckList,
};
