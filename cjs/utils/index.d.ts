import Curry from "@fxts/core/dist/types/types/Curry";
type ObjectWithData<Data = {
    [key: string]: unknown;
}> = {
    [key: string]: unknown;
    data: Data;
};
type ListItem = {
    uid: string;
    data: Record<string, unknown>;
    createdAt: string;
    updateAt: string;
};
type List = Array<ListItem>;
type ObjectWithList = {
    [key: string]: any;
    list: List;
};
export declare const pluckData: <Data>(obj: ObjectWithData<Data>) => Data;
export declare const pluckList: (obj: ObjectWithList) => List;
export declare const pluckDataList: (obj: ObjectWithData<ObjectWithList>) => any;
export declare const flattenListItem: (listItem: {
    uid: string;
    data: Record<string, unknown>;
    createdAt: string;
    updateAt: string;
}) => {
    createdAt: string;
    updateAt: string;
    uid: string;
};
type MapListItemsFn = Curry<(<ListItem, MappedItem>(cb: (item: ListItem) => MappedItem, list: Array<ListItem>) => Array<MappedItem>)>;
export declare const mapListItems: MapListItemsFn;
export declare const mapListItemsAsync: Curry<(cb: any, list: any) => Promise<typeof list>>;
export declare const deconstructLanguageMap: (obj: any, language: any) => any;
export declare const mapObjectProps: (obj: any, keys: any, cb: any) => any;
type ExtractStringValuesFn = Curry<(<PropKeys = Array<string>>(propKeys: PropKeys, language: "KO", item: Record<string, unknown>) => {
    [K in keyof PropKeys]: PropKeys[K] extends string ? string : unknown;
})>;
export declare const extractStringValues: ExtractStringValuesFn;
export declare const populateRelations: Curry<(item: Record<string, any>, keys: string[], memexFetcher: any) => Promise<{
    [x: string]: any;
}>>;
export declare const pipe: any;
export {};
