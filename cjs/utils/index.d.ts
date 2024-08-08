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
declare const Utils: {
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
export = Utils;
