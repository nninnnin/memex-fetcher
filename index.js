"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
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
exports.default = __assign({ createMemexFetcher: createMemexFetcher }, utils_1.default);
