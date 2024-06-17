"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("./http"));
var Option_1 = require("./Option");
var listKey = /** @class */ (function () {
    function listKey(key) {
        var _this = this;
        this.key = key;
        this.lIndex = function (Key, Index, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.Urlbase, "/LINDEX-!").concat(_this.key).concat(opt.paramString(), "?Index=").concat(Index));
        };
        this.lPop = function (Key, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.Urlbase, "/LPOP-!").concat(_this.key).concat(opt.paramString()));
        };
        this.lPush = function (Key, Value, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).post("".concat(opt.Urlbase, "/LPUSH-!").concat(_this.key).concat(opt.paramString()), Value);
        };
        this.lRem = function (Key, Count, Value, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.Urlbase, "/LREM-!").concat(_this.key).concat(opt.paramString(), "?Count=").concat(Count), Value);
        };
        this.lSet = function (Key, Index, Value, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).put("".concat(opt.Urlbase, "/LSET-!").concat(_this.key).concat(opt.paramString(), "?Index=").concat(Index), Value);
        };
        this.lTrim = function (Key, Start, Stop, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).put("".concat(opt.Urlbase, "/LTRIM-!").concat(_this.key).concat(opt.paramString(), "?Start=").concat(Start, "&Stop=").concat(Stop));
        };
        this.rPop = function (Key, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.Urlbase, "/RPOP-!").concat(_this.key).concat(opt.paramString()));
        };
        this.rPush = function (Key, Value, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).post("".concat(opt.Urlbase, "/RPUSH-!").concat(_this.key).concat(opt.paramString()), Value);
        };
        this.rPushX = function (Key, Value, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).post("".concat(opt.Urlbase, "/RPUSHX-!").concat(_this.key).concat(opt.paramString()), Value);
        };
        this.lLen = function (Key, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.Urlbase, "/LLEN-!").concat(_this.key).concat(opt.paramString()));
        };
        this.lRange = function (Key, Start, Stop, opt) {
            if (opt === void 0) { opt = Option_1.Option.rspTypeMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.Urlbase, "/LRANGE-!").concat(_this.key).concat(opt.paramString(), "?Start=").concat(Start, "&Stop=").concat(Stop));
        };
    }
    return listKey;
}());
exports.default = listKey;
