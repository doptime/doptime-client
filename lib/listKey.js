"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("./http"));
var Option_1 = require("./Option");
var dataschema_1 = require("./dataschema");
var key_1 = __importDefault(require("./key"));
var listKey = /** @class */ (function (_super) {
    __extends(listKey, _super);
    function listKey(key, dataSchemaInstace) {
        if (dataSchemaInstace === void 0) { dataSchemaInstace = null; }
        var _this = _super.call(this, key) || this;
        _this.key = key;
        _this.dataSchemaInstace = dataSchemaInstace;
        _this.dataSchema = null;
        _this.lIndex = function (Index, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/LINDEX-").concat(_this.getkey(), "?Index=").concat(Index));
        };
        _this.lPop = function (opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/LPOP-").concat(_this.getkey()));
        };
        _this.lPush = function (data, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            if (!!_this.dataSchema) {
                var errors = (0, dataschema_1.checkSchema)(_this.dataSchema, data);
                if (errors.length > 0) {
                    return Promise.reject("shema unmatch of listkey: " + _this.key + " " + JSON.stringify(errors));
                }
            }
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/LPUSH-").concat(_this.getkey()), data);
        };
        _this.lRem = function (Count, data, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/LREM-").concat(_this.getkey(), "?Count=").concat(Count), data);
        };
        _this.lSet = function (Index, data, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/LSET-").concat(_this.getkey(), "?Index=").concat(Index), data);
        };
        _this.lTrim = function (Start, Stop, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/LTRIM-").concat(_this.getkey(), "?Start=").concat(Start, "&Stop=").concat(Stop));
        };
        _this.rPop = function (opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/RPOP-").concat(_this.getkey()));
        };
        _this.rPush = function (data, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            if (!!_this.dataSchema) {
                var errors = (0, dataschema_1.checkSchema)(_this.dataSchema, data);
                if (errors.length > 0) {
                    return Promise.reject("shema unmatch of listkey: " + _this.key + " " + JSON.stringify(errors));
                }
            }
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/RPUSH-").concat(_this.getkey()), data);
        };
        _this.rPushX = function (data, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            if (!!_this.dataSchema) {
                var errors = (0, dataschema_1.checkSchema)(_this.dataSchema, data);
                if (errors.length > 0) {
                    return Promise.reject("shema unmatch of listkey: " + _this.key + " " + JSON.stringify(errors));
                }
            }
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/RPUSHX-").concat(_this.getkey()), data);
        };
        _this.lLen = function (opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/LLEN-").concat(_this.getkey()));
        };
        _this.lRange = function (Start, Stop, opt) {
            if (opt === void 0) { opt = Option_1.Option.responseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/LRANGE-").concat(_this.getkey(), "?Start=").concat(Start, "&Stop=").concat(Stop));
        };
        if (!!_this.dataSchemaInstace)
            _this.dataSchema = (0, dataschema_1.dataObjectToSchema)(_this.dataSchemaInstace);
        return _this;
    }
    return listKey;
}(key_1.default));
exports.default = listKey;
