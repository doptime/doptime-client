"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("./http"));
var Option_1 = require("./Option");
function newApi(serviceName, paramSchemaInstace, option) {
    if (paramSchemaInstace === void 0) { paramSchemaInstace = null; }
    if (option === void 0) { option = Option_1.Option; }
    var paramSchema = paramSchemaInstace;
    //ensure service name  is standardized
    //strip prefix "api:" if it exists
    if (serviceName.toLowerCase().startsWith("api:")) {
        serviceName = serviceName.slice(4);
    }
    //first character of Service should be lower case
    if (serviceName.length > 0) {
        serviceName = serviceName[0].toLowerCase() + serviceName.slice(1);
    }
    //error if service name is empty
    if (serviceName.length === 0) {
        console.error("API service name is empty, which is not allowed");
        //throw new Error("API service name is empty, which is not allowed")
        throw new Error("API service name is empty, which is not allowed");
    }
    return function (data, opt) {
        if (data === void 0) { data = {}; }
        if (opt === void 0) { opt = option; }
        return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/API-").concat(serviceName), data);
    };
}
exports.default = newApi;
