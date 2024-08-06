var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var axios = require("axios");
var _a = require("./utils"), deconstructLanguageMap = _a.deconstructLanguageMap, mapListItems = _a.mapListItems, mapObjectProps = _a.mapObjectProps, pipe = _a.pipe, pluckData = _a.pluckData, pluckDataList = _a.pluckDataList, pluckList = _a.pluckList;
var MemexFetcher = /** @class */ (function () {
    function MemexFetcher(token, headers) {
        if (headers === void 0) { headers = {}; }
        this.fetcher = axios.create({
            headers: __assign({ "Access-Token": token }, headers),
        });
    }
    MemexFetcher.prototype.post = function (url, data) {
        return this.fetcher.post(url, data);
    };
    return MemexFetcher;
}());
/**
 * Create a MemexFetcher instance.
 * @param {string} token
 * @return {MemexFetcher}
 */
var createMemexFetcher = function (token, headers) {
    if (headers === void 0) { headers = {}; }
    return new MemexFetcher(token, headers);
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
