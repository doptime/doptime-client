"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("./http"));
var Option_1 = require("./Option");
function createApi(serviceName, options) {
    if (options === void 0) { options = Option_1.Opt; }
    if (!serviceName) {
        throw new Error("API service name cannot be empty");
    }
    // 注意：data 的默认值 {} as TIn 在 TIn 为 any 时也是安全的
    return function (data, opt) {
        if (data === void 0) { data = {}; }
        if (opt === void 0) { opt = options; }
        return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/").concat(serviceName), data);
    };
}
exports.default = createApi;
