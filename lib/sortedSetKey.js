"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("./http"));
var Option_1 = require("./Option");
var sortedSetKey = /** @class */ (function () {
    function sortedSetKey(key) {
        var _this = this;
        this.key = key;
        this.zRange = function (Start, Stop, WITHSCORES, opt) {
            if (WITHSCORES === void 0) { WITHSCORES = false; }
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZRANGE-!").concat(_this.key).concat(opt.paramString(), "?Start=").concat(Start, "&Stop=").concat(Stop, "&WITHSCORES=").concat(WITHSCORES));
        };
        this.zRevRange = function (Start, Stop, WITHSCORES, opt) {
            if (opt === void 0) { opt = (Option_1.Option); }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZREVRANGE-!").concat(_this.key).concat(opt.paramString(), "?Start=").concat(Start, "&Stop=").concat(Stop, "&WITHSCORES=").concat(WITHSCORES));
        };
        this.zRank = function (Member, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZRANK-!").concat(_this.key).concat(opt.paramString(), "?Member=").concat(Member));
        };
        this.zScore = function (Member, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZSCORE-!").concat(_this.key).concat(opt.paramString(), "?Member=").concat(Member));
        };
        //if withscores is true, return [member, score, member, score, ...]
        //if withscores is false, return [member, member, ...]
        this.zRangeByScore = function (Min, Max, WITHSCORES, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZRANGEBYSCORE-!").concat(_this.key).concat(opt.paramString(), "?Min=").concat(encodeURIComponent(Min), "&Max=").concat(encodeURIComponent(Max), "&WITHSCORES=").concat(WITHSCORES));
        };
        //if withscores is true, return [member, score, member, score, ...]
        //if withscores is false, return [member, member, ...]
        this.zRevRangeByScore = function (Min, Max, WITHSCORES, Offset, Count, opt) {
            if (WITHSCORES === void 0) { WITHSCORES = true; }
            if (Offset === void 0) { Offset = 0; }
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZREVRANGEBYSCORE-!").concat(_this.key).concat(opt.paramString(), "?Min=").concat(encodeURIComponent(Min), "&Max=").concat(encodeURIComponent(Max), "&WITHSCORES=").concat(WITHSCORES, "&Offset=").concat(Offset, "&Count=").concat(Count));
        };
        this.zAdd = function (Score, Member, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/ZADD-!").concat(_this.key).concat(opt.paramString(), "?Score=").concat(Score), Member);
        };
        this.zRem = function (Member, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/ZREM-!").concat(_this.key).concat(opt.paramString(), "?Member=").concat(Member));
        };
        this.zRemRangeByScore = function (Min, Max, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/ZREMRANGEBYSCORE-!").concat(_this.key).concat(opt.paramString(), "?Min=").concat(encodeURIComponent(Min), "&Max=").concat(encodeURIComponent(Max)));
        };
        this.zCount = function (Min, Max, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZCOUNT-!").concat(_this.key).concat(opt.paramString(), "?Min=").concat(encodeURIComponent(Min), "&Max=").concat(encodeURIComponent(Max)));
        };
        this.zCard = function (Key, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZCARD-!").concat(_this.key).concat(opt.paramString()));
        };
        this.zScan = function (Key, Cursor, Match, Count, opt) {
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = Option_1.Option.responseTypeMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/ZSCAN-!").concat(_this.key).concat(opt.paramString(), "?Cursor=").concat(Cursor, "&Match=").concat(encodeURIComponent(Match), "&Count=").concat(Count));
        };
        this.zIncrBy = function (Key, Increment, Member, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/ZINCRBY-!").concat(_this.key).concat(opt.paramString(), "?Increment=").concat(Increment), Member);
        };
    }
    return sortedSetKey;
}());
exports.default = sortedSetKey;
