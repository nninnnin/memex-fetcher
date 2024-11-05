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
  direction?: "ASC" | "DESC";
  orderCond?: {
    type:
      | "COMPONENT"
      | "DATE_CREATE"
      | "DATE_UPDATE"
      | "ID";
    condition?: Record<string, unknown>;
  };
  searchConds?: Array<{}>;
}
interface Headers {
  [key: string]: string;
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
interface MediaCreationResult {
  id: number;
  file: {
    id: number;
    name: string;
    path: string;
  };
  languageMap: {
    KO: {
      name: string;
    };
  };
  mediaType: string;
  value: string;
}
declare class MemexFetcher {
  fetcher: any;
  constructor(token: string);
  post(
    url: string,
    body:
      | PostBody
      | PostItemBody
      | string
  ): any;
  getList(
    projectId: string,
    modelKey: string,
    body: PostBody | string,
    headers?: Headers
  ): any;
  getListLength(
    projectId: string,
    modelKey: string,
    headers?: Headers
  ): any;
  getItem(
    projectId: string,
    modelKey: string,
    itemUid: string,
    headers?: Headers
  ): any;
  postItem(
    projectId: string,
    modelKey: string,
    body: PostItemBody | string,
    headers?: Headers
  ): any;
  updateItem(
    projectId: string,
    modelKey: string,
    body:
      | (PostItemBody & {
          uid: string;
        })
      | string,
    headers?: Headers
  ): any;
  getCategories(
    projectId: string,
    modelKey: string,
    headers?: Record<string, unknown>
  ): any;
  postMedia(
    projectId: string,
    file: File
  ): Promise<MediaCreationResult>;
  private _presignUrl;
  private _uploadPresignedUrl;
  private saveFile;
  private createMedia;
}

declare module "Mf" {
  const createMemexFetcher: (
    token: string
  ) => MemexFetcher;
  const pluckData: (
    obj: ObjectWithData
  ) => {
    [key: string]: any;
  };
  const pluckList: (
    obj: ObjectWithList
  ) => any[];
  const pluckDataList: (
    obj: ObjectWithData<ObjectWithList>
  ) => any;
  const mapListItems: any;
  const deconstructLanguageMap: (
    obj: any,
    language: any
  ) => any;
  const mapObjectProps: (
    obj: any,
    keys: any,
    cb: any
  ) => any;
  const pipe: any;
}

export default Mf;

export {
  createMemexFetcher,
  pluckData,
  pluckList,
  pluckDataList,
  mapListItems,
  deconstructLanguageMap,
  mapObjectProps,
  pipe,
};
