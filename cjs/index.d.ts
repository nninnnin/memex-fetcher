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
declare const Mf: {
    pluckData: <Data>(obj: {
        [key: string]: unknown;
        data: Data;
    }) => Data;
    pluckList: (obj: {
        [key: string]: any;
        list: {
            uid: string;
            data: Record<string, unknown>;
            createdAt: string;
            updateAt: string;
        }[];
    }) => {
        uid: string;
        data: Record<string, unknown>;
        createdAt: string;
        updateAt: string;
    }[];
    pluckDataList: (obj: {
        [key: string]: unknown;
        data: {
            [key: string]: any;
            list: {
                uid: string;
                data: Record<string, unknown>;
                createdAt: string;
                updateAt: string;
            }[];
        };
    }) => any;
    flattenListItem: (listItem: {
        uid: string;
        data: Record<string, unknown>;
        createdAt: string;
        updateAt: string;
    }) => {
        createdAt: string;
        updateAt: string;
        uid: string;
    };
    mapListItems: <T extends any[], G = import("@fxts/core/dist/types/types/Drop").default<import("@fxts/core/dist/types/types/Length").default<T>, [cb: (item: unknown) => unknown, list: unknown[]]>>(...args: import("@fxts/core/dist/types/types/Cast").default<T, [cb?: (item: unknown) => unknown, list?: unknown[]]>) => G extends [any, ...any[]] ? import("@fxts/core/dist/types/types/Curry").default<(...args: G) => unknown[]> : unknown[];
    mapListItemsAsync: import("@fxts/core/dist/types/types/Curry").default<(cb: any, list: any) => Promise<typeof list>>;
    deconstructLanguageMap: (obj: any, language: any) => any;
    mapObjectProps: (obj: any, keys: any, cb: any) => any;
    extractStringValues: <T extends any[], G = import("@fxts/core/dist/types/types/Drop").default<import("@fxts/core/dist/types/types/Length").default<T>, [propKeys: unknown, language: "KO", item: Record<string, unknown>]>>(...args: import("@fxts/core/dist/types/types/Cast").default<T, [propKeys?: {}, language?: "KO", item?: Record<string, unknown>]>) => G extends [any, ...any[]] ? import("@fxts/core/dist/types/types/Curry").default<(...args: G) => {}> : {};
    deconstructMedia: (mediaList: import("./types/memex").MediaInterface[]) => {
        mediaType: import("./types/memex").MediaType;
        filename: string;
        fileType: import("./types/memex").FileType;
        filePath: string;
        fileMeta: import("./types/memex").FileMetaInterface;
    }[];
    deconstructRelations: (relations: import("./types/memex").RelationInterface[]) => {
        relatedItemUid: string;
        relationKey: string;
    }[];
    pipe: any;
    createMemexFetcher: (token: string) => MemexFetcher;
};
export = Mf;
