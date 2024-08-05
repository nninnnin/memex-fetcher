"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var utils_1 = require("./utils");
var MemexFetcher = /** @class */ (function () {
    function MemexFetcher(token) {
        this.fetcher = axios_1.default.create({
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
exports.default = {
    createMemexFetcher: createMemexFetcher,
    deconstructLanguageMap: utils_1.deconstructLanguageMap,
    mapListItems: utils_1.mapListItems,
    mapObjectProps: utils_1.mapObjectProps,
    pipe: utils_1.pipe,
    pluckData: utils_1.pluckData,
    pluckDataList: utils_1.pluckDataList,
    pluckList: utils_1.pluckList,
};
