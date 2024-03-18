"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var MemexFetcher = /** @class */ (function () {
    function MemexFetcher(token) {
        this.fetcher = axios_1.default.create({
            headers: {
                "Access-Token": token,
            },
        });
    }
    MemexFetcher.prototype.post = function (url, data) {
        this.fetcher.post(url, data);
    };
    return MemexFetcher;
}());
var createMemexFetcher = function (token) {
    return new MemexFetcher(token);
};
exports.default = {
    createMemexFetcher: createMemexFetcher,
};
