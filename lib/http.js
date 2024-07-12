"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var msgpack = require('@ygoe/msgpack');
var Req = function (option, responseType) {
    if (responseType === void 0) { responseType = "json"; }
    var req = axios_1.default.create({ headers: option.headers, responseType: responseType });
    req.interceptors.request.use(function (config) {
        if (config.method === "post" || config.method === "put") {
            //if type of data is Object ,convert to object
            if (typeof config.data === "object" && !(config.data instanceof Array))
                config.data = Object.assign({}, config.data);
            var datatype = typeof config.data;
            //use text format rather than msgpack format if datatype is either bigint, number, string, or boolean
            if (!(datatype === "bigint" || datatype === "number" || datatype === "string" || datatype === "boolean")) {
                config.data = msgpack.encode(config.data);
            }
            //if config.data is uint8 array ,create new buffer of it's length and copy it to new buffer
            if (config.data instanceof Uint8Array) {
                var buf = new ArrayBuffer(config.data.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i < config.data.length; ++i) {
                    view[i] = config.data[i];
                }
                config.data = buf;
            }
            config.headers["Content-Type"] = "application/octet-stream";
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    req.interceptors.response.use(function (response) {
        if ("data" in response) {
            if (responseType === "arraybuffer")
                return msgpack.decode(new Uint8Array(response.data));
            return response.data;
        }
        return response;
    }, function (error) {
        if (!!option.primaryErrorHandler)
            option.primaryErrorHandler(error);
        if (option.throwSecondaryPromiseError)
            return Promise.reject(error);
    });
    return req;
};
exports.default = Req;
