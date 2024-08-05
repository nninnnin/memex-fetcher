var axios = require("axios");
var _a = require("./utils"), deconstructLanguageMap = _a.deconstructLanguageMap, mapListItems = _a.mapListItems, mapObjectProps = _a.mapObjectProps, pipe = _a.pipe, pluckData = _a.pluckData, pluckDataList = _a.pluckDataList, pluckList = _a.pluckList;
var MemexFetcher = /** @class */ (function () {
    function MemexFetcher(token) {
        this.fetcher = axios.create({
            headers: {
                "Access-Token": token,
            },
        });
    }
    MemexFetcher.prototype.post = function (url, data) {
        return this.fetcher.post(url, data);
    };
    return MemexFetcher;
}());
var createMemexFetcher = function (token) {
    return new MemexFetcher(token);
};
module.exports = {
    createMemexFetcher: createMemexFetcher,
    deconstructLanguageMap: deconstructLanguageMap,
    mapListItems: mapListItems,
    mapObjectProps: mapObjectProps,
    pipe: pipe,
    pluckData: pluckData,
    pluckDataList: pluckDataList,
    pluckList: pluckList,
};
