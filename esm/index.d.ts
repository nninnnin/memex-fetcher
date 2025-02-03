interface PostBody {
    size: number;
    page: number;
    direction?: "ASC" | "DESC";
    orderCond?: {
        type: "COMPONENT" | "DATE_CREATE" | "DATE_UPDATE" | "ID";
        condition?: Record<string, unknown>;
    };
    searchConds?: Array<{}>;
}
interface Headers {
    [key: string]: string;
}
interface PostItemBody {
    publish: boolean;
    data: unknown;
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
    post(url: string, body: PostBody | PostItemBody | string): any;
    getList(projectId: string, modelKey: string, body: PostBody | string, headers?: Headers): any;
    getListLength(projectId: string, modelKey: string, body?: PostBody | string, headers?: Headers): any;
    getItem(projectId: string, modelKey: string, itemUid: string, headers?: Headers): any;
    postItem(projectId: string, modelKey: string, body: PostItemBody | string, headers?: Headers): any;
    updateItem(projectId: string, modelKey: string, body: (PostItemBody & {
        uid: string;
    }) | string, headers?: Headers): any;
    getCategories(projectId: string, modelKey: string, headers?: Record<string, unknown>): any;
    postMedia(projectId: string, file: File): Promise<MediaCreationResult>;
    private _presignUrl;
    private _uploadPresignedUrl;
    private saveFile;
    private createMedia;
}
type ObjectWithData<Data = {
    [key: string]: any;
}> = {
    [key: string]: any;
    data: Data;
};
type ObjectWithList = {
    [key: string]: any;
    list: any[];
};
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
