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

interface PostBody {
  size: number;
  page: number;
  direction: "ASC" | "DESC";
  orderCond?: {
    type: "COMPONENT" | "DATE_CREATE" | "DATE_UPDATE" | "ID";
    condition?: Record<string, unknown>;
  };
  searchConds?: Array<{}>;
}
interface LanguageMap {
  KO: string;
  EN: string;
}
interface PostItemBody {
  publish: boolean;
  data: {
    id: LanguageMap;
    tagid: string;
    name: LanguageMap;
    description: LanguageMap;
    longdescription: LanguageMap;
    eng: boolean;
  };
}
declare class MemexFetcher {
  fetcher: any;
  constructor(token: string);
  post(url: string, body: PostBody): any;
  getList(
    projectId: string,
    modelKey: string,
    body: PostBody,
    headers?: Record<string, unknown>
  ): any;
  getListLength(
    projectId: string,
    modelKey: string,
    body: PostBody,
    headers?: Record<string, unknown>
  ): any;
  getItem(
    projectId: string,
    modelKey: string,
    itemUid: string,
    headers?: Record<string, unknown>
  ): any;
  postItem(
    projectId: string,
    modelKey: string,
    body: PostItemBody,
    headers?: Record<string, unknown>
  ): any;
}

declare const Mf: {
  createMemexFetcher: (token: string) => MemexFetcher;
  pluckData: (obj: ObjectWithData) => {
    [key: string]: any;
  };
  pluckList: (obj: ObjectWithList) => any[];
  pluckDataList: (obj: ObjectWithData<ObjectWithList>) => any;
  mapListItems: any;
  deconstructLanguageMap: (obj: any, language: any) => any;
  mapObjectProps: (obj: any, keys: any, cb: any) => any;
  pipe: any;
};

export = Mf;
