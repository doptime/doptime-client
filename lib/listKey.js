"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("./http"));
var Option_1 = require("./Option");
var dataschema_1 = require("./dataschema");
var listKey = /** @class */ (function () {
    function listKey(key, dataSchemaInstace) {
        if (dataSchemaInstace === void 0) { dataSchemaInstace = null; }
        var _this = this;
        this.key = key;
        this.dataSchemaInstace = dataSchemaInstace;
        this.dataSchema = null;
        this.lIndex = function (Index, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/LINDEX-!").concat(_this.key).concat(opt.paramString(), "?Index=").concat(Index));
        };
        this.lPop = function (opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/LPOP-!").concat(_this.key).concat(opt.paramString()));
        };
        this.lPush = function (Value, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            if (!!_this.dataSchema && !(0, dataschema_1.checkSchema)(_this.dataSchema, Value))
                return Promise.reject("data not match shema of listKey:" + _this.key);
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, " /LPUSH-!").concat(_this.key).concat(opt.paramString()), Value);
        };
        this.lRem = function (Count, Value, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/LREM-!").concat(_this.key).concat(opt.paramString(), "?Count=").concat(Count), Value);
        };
        this.lSet = function (Index, Value, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/LSET-!").concat(_this.key).concat(opt.paramString(), "?Index=").concat(Index), Value);
        };
        this.lTrim = function (Start, Stop, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/LTRIM-!").concat(_this.key).concat(opt.paramString(), "?Start=").concat(Start, "&Stop=").concat(Stop));
        };
        this.rPop = function (opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/RPOP-!").concat(_this.key).concat(opt.paramString()));
        };
        this.rPush = function (Value, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            if (!!_this.dataSchema && !(0, dataschema_1.checkSchema)(_this.dataSchema, Value))
                return Promise.reject("data not match shema of listKey:" + _this.key);
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/RPUSH-!").concat(_this.key).concat(opt.paramString()), Value);
        };
        this.rPushX = function (Value, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            if (!!_this.dataSchema && !(0, dataschema_1.checkSchema)(_this.dataSchema, Value))
                return Promise.reject("data not match shema of listKey:" + _this.key);
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/RPUSHX-!").concat(_this.key).concat(opt.paramString()), Value);
        };
        this.lLen = function (opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/LLEN-!").concat(_this.key).concat(opt.paramString()));
        };
        this.lRange = function (Start, Stop, opt) {
            if (opt === void 0) { opt = Option_1.Option.responseTypeMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/LRANGE-!").concat(_this.key).concat(opt.paramString(), "?Start=").concat(Start, "&Stop=").concat(Stop));
        };
        if (!!this.dataSchemaInstace)
            this.dataSchema = (0, dataschema_1.dataObjectToSchema)(this.dataSchemaInstace);
    }
    return listKey;
}());
exports.default = listKey;
