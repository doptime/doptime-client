"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/LINDEX-").concat(_this.key, "?Index=").concat(Index));
        };
        this.lPop = function (opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/LPOP-").concat(_this.key));
        };
        this.lPush = function (data, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            if (!!_this.dataSchema) {
                var errors = (0, dataschema_1.checkSchema)(_this.dataSchema, data);
                if (errors.length > 0) {
                    return Promise.reject("shema unmatch of listkey: " + _this.key + " " + JSON.stringify(errors));
                }
            }
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/LPUSH-").concat(_this.key), data);
        };
        this.lRem = function (Count, data, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/LREM-").concat(_this.key, "?Count=").concat(Count), data);
        };
        this.lSet = function (Index, data, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/LSET-").concat(_this.key, "?Index=").concat(Index), data);
        };
        this.lTrim = function (Start, Stop, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/LTRIM-").concat(_this.key, "?Start=").concat(Start, "&Stop=").concat(Stop));
        };
        this.rPop = function (opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/RPOP-").concat(_this.key));
        };
        this.rPush = function (data, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            if (!!_this.dataSchema) {
                var errors = (0, dataschema_1.checkSchema)(_this.dataSchema, data);
                if (errors.length > 0) {
                    return Promise.reject("shema unmatch of listkey: " + _this.key + " " + JSON.stringify(errors));
                }
            }
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/RPUSH-").concat(_this.key), data);
        };
        this.rPushX = function (data, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            if (!!_this.dataSchema) {
                var errors = (0, dataschema_1.checkSchema)(_this.dataSchema, data);
                if (errors.length > 0) {
                    return Promise.reject("shema unmatch of listkey: " + _this.key + " " + JSON.stringify(errors));
                }
            }
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/RPUSHX-").concat(_this.key), data);
        };
        this.lLen = function (opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/LLEN-").concat(_this.key));
        };
        this.lRange = function (Start, Stop, opt) {
            if (opt === void 0) { opt = Option_1.Option.responseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/LRANGE-").concat(_this.key, "?Start=").concat(Start, "&Stop=").concat(Stop));
        };
        if (!!this.dataSchemaInstace)
            this.dataSchema = (0, dataschema_1.dataObjectToSchema)(this.dataSchemaInstace);
    }
    listKey.prototype.ConcatKey = function () {
        var fields = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fields[_i] = arguments[_i];
        }
        var newKey = __spreadArray([this.key], fields, true).filter(function (v) { return !!v; }).join(":");
        var _key = new listKey(newKey);
        _key.dataSchema = this.dataSchema;
        return _key;
    };
    return listKey;
}());
exports.default = listKey;
