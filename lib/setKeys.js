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
var config_1 = require("./config");
var setKey = /** @class */ (function () {
    function setKey(key, dataSchemaInstace) {
        if (dataSchemaInstace === void 0) { dataSchemaInstace = null; }
        var _this = this;
        this.key = key;
        this.dataSchemaInstace = dataSchemaInstace;
        this.sIsMember = function (Member, opt) {
            if (opt === void 0) { opt = config_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/SISMEMBER-").concat(_this.key, "?Member=").concat(Member));
        };
        this.sScan = function (Cursor, Match, Count, opt) {
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = config_1.Opt.WithResponseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/SSCAN-").concat(_this.key, "?Cursor=").concat(Cursor, "&Match=").concat(encodeURIComponent(Match), "&Count=").concat(Count));
        };
        this.sCard = function (opt) {
            if (opt === void 0) { opt = config_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/SCARD-").concat(_this.key));
        };
    }
    setKey.prototype.ConcatKey = function () {
        var fields = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fields[_i] = arguments[_i];
        }
        var newKey = __spreadArray([this.key], fields, true).filter(function (v) { return !!v; }).join(":");
        return new setKey(newKey, this.dataSchemaInstace);
    };
    return setKey;
}());
exports.default = setKey;
