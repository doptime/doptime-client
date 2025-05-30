"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("./http"));
var Option_1 = require("./Option");
function newApi(serviceName, param, option) {
    if (option === void 0) { option = Option_1.Opt; }
    //error if service name is empty
    if (serviceName.length === 0) {
        console.error("API service name is empty, which is not allowed");
        //throw new Error("API service name is empty, which is not allowed")
        throw new Error("API service name is empty, which is not allowed");
    }
    return function (data, opt) {
        if (data === void 0) { data = {}; }
        if (opt === void 0) { opt = option; }
        return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/").concat(serviceName), data);
    };
}
exports.default = newApi;
