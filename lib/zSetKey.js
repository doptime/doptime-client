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
var zSetKey = /** @class */ (function () {
    function zSetKey(key, dataSchemaInstace) {
        if (dataSchemaInstace === void 0) { dataSchemaInstace = null; }
        var _this = this;
        this.key = key;
        this.dataSchemaInstace = dataSchemaInstace;
        this.dataSchema = null;
        this.zRange = function (Start, Stop, WITHSCORES, opt) {
            if (WITHSCORES === void 0) { WITHSCORES = false; }
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZRANGE-").concat(_this.key, "?Start=").concat(Start, "&Stop=").concat(Stop, "&WITHSCORES=").concat(WITHSCORES));
        };
        this.zRevRange = function (Start, Stop, WITHSCORES, opt) {
            if (opt === void 0) { opt = (Option_1.Opt); }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZREVRANGE-").concat(_this.key, "?Start=").concat(Start, "&Stop=").concat(Stop, "&WITHSCORES=").concat(WITHSCORES));
        };
        this.zRank = function (Member, opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZRANK-").concat(_this.key, "?Member=").concat(Member));
        };
        this.zScore = function (Member, opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZSCORE-").concat(_this.key, "?Member=").concat(Member));
        };
        //if withscores is true, return [member, score, member, score, ...]
        //if withscores is false, return [member, member, ...]
        this.zRangeByScore = function (Min, Max, WITHSCORES, opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZRANGEBYSCORE-").concat(_this.key, "?Min=").concat(encodeURIComponent(Min), "&Max=").concat(encodeURIComponent(Max), "&WITHSCORES=").concat(WITHSCORES));
        };
        //if withscores is true, return [member, score, member, score, ...]
        //if withscores is false, return [member, member, ...]
        this.zRevRangeByScore = function (Min, Max, WITHSCORES, Offset, Count, opt) {
            if (WITHSCORES === void 0) { WITHSCORES = true; }
            if (Offset === void 0) { Offset = 0; }
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZREVRANGEBYSCORE-").concat(_this.key, "?Min=").concat(encodeURIComponent(Min), "&Max=").concat(encodeURIComponent(Max), "&WITHSCORES=").concat(WITHSCORES, "&Offset=").concat(Offset, "&Count=").concat(Count));
        };
        this.zAdd = function (Score, Member, opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/ZADD-").concat(_this.key, "?Score=").concat(Score), Member);
        };
        this.zRem = function (Member, opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/ZREM-").concat(_this.key, "?Member=").concat(Member));
        };
        this.zRemRangeByScore = function (Min, Max, opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/ZREMRANGEBYSCORE-").concat(_this.key, "?Min=").concat(encodeURIComponent(Min), "&Max=").concat(encodeURIComponent(Max)));
        };
        this.zCount = function (Min, Max, opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZCOUNT-").concat(_this.key, "?Min=").concat(encodeURIComponent(Min), "&Max=").concat(encodeURIComponent(Max)));
        };
        this.zCard = function (opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZCARD-").concat(_this.key));
        };
        this.zScan = function (Cursor, Match, Count, opt) {
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = Option_1.Opt.WithResponseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/ZSCAN-").concat(_this.key, "?Cursor=").concat(Cursor, "&Match=").concat(encodeURIComponent(Match), "&Count=").concat(Count));
        };
        this.zIncrBy = function (Increment, Member, opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/ZINCRBY-").concat(_this.key, "?Increment=").concat(Increment), Member);
        };
    }
    zSetKey.prototype.ConcatKey = function () {
        var fields = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fields[_i] = arguments[_i];
        }
        var newKey = __spreadArray([this.key], fields, true).filter(function (v) { return !!v; }).join(":");
        return new zSetKey(newKey, this.dataSchemaInstace);
    };
    return zSetKey;
}());
exports.default = zSetKey;
