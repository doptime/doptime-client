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
var zSetKey = /** @class */ (function (_super) {
    __extends(zSetKey, _super);
    function zSetKey(key) {
        var _this = _super.call(this, key) || this;
        _this.key = key;
        _this.zRange = function (Start, Stop, WITHSCORES, opt) {
            if (WITHSCORES === void 0) { WITHSCORES = false; }
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZRANGE-").concat(_this.getkey(), "?Start=").concat(Start, "&Stop=").concat(Stop, "&WITHSCORES=").concat(WITHSCORES));
        };
        _this.zRevRange = function (Start, Stop, WITHSCORES, opt) {
            if (opt === void 0) { opt = (Option_1.Option); }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZREVRANGE-").concat(_this.getkey(), "?Start=").concat(Start, "&Stop=").concat(Stop, "&WITHSCORES=").concat(WITHSCORES));
        };
        _this.zRank = function (Member, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZRANK-").concat(_this.getkey(), "?Member=").concat(Member));
        };
        _this.zScore = function (Member, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZSCORE-").concat(_this.getkey(), "?Member=").concat(Member));
        };
        //if withscores is true, return [member, score, member, score, ...]
        //if withscores is false, return [member, member, ...]
        _this.zRangeByScore = function (Min, Max, WITHSCORES, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZRANGEBYSCORE-").concat(_this.getkey(), "?Min=").concat(encodeURIComponent(Min), "&Max=").concat(encodeURIComponent(Max), "&WITHSCORES=").concat(WITHSCORES));
        };
        //if withscores is true, return [member, score, member, score, ...]
        //if withscores is false, return [member, member, ...]
        _this.zRevRangeByScore = function (Min, Max, WITHSCORES, Offset, Count, opt) {
            if (WITHSCORES === void 0) { WITHSCORES = true; }
            if (Offset === void 0) { Offset = 0; }
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZREVRANGEBYSCORE-").concat(_this.getkey(), "?Min=").concat(encodeURIComponent(Min), "&Max=").concat(encodeURIComponent(Max), "&WITHSCORES=").concat(WITHSCORES, "&Offset=").concat(Offset, "&Count=").concat(Count));
        };
        _this.zAdd = function (Score, Member, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/ZADD-").concat(_this.getkey(), "?Score=").concat(Score), Member);
        };
        _this.zRem = function (Member, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/ZREM-").concat(_this.getkey(), "?Member=").concat(Member));
        };
        _this.zRemRangeByScore = function (Min, Max, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/ZREMRANGEBYSCORE-").concat(_this.getkey(), "?Min=").concat(encodeURIComponent(Min), "&Max=").concat(encodeURIComponent(Max)));
        };
        _this.zCount = function (Min, Max, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZCOUNT-").concat(_this.getkey(), "?Min=").concat(encodeURIComponent(Min), "&Max=").concat(encodeURIComponent(Max)));
        };
        _this.zCard = function (Key, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/ZCARD-").concat(_this.getkey()));
        };
        _this.zScan = function (Key, Cursor, Match, Count, opt) {
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = Option_1.Option.responseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/ZSCAN-").concat(_this.getkey(), "?Cursor=").concat(Cursor, "&Match=").concat(encodeURIComponent(Match), "&Count=").concat(Count));
        };
        _this.zIncrBy = function (Key, Increment, Member, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/ZINCRBY-").concat(_this.getkey(), "?Increment=").concat(Increment), Member);
        };
        return _this;
    }
    return zSetKey;
}(Key));
exports.default = zSetKey;
