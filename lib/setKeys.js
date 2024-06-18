"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("./http"));
var Option_1 = require("./Option");
var setKey = /** @class */ (function () {
    function setKey(key) {
        var _this = this;
        this.key = key;
        this.sIsMember = function (Key, Member, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/SISMEMBER-!").concat(_this.key).concat(opt.paramString(), "?Member=").concat(Member));
        };
        this.sScan = function (Key, Cursor, Match, Count, opt) {
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = Option_1.Option.responseTypeMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/SSCAN-!").concat(_this.key).concat(opt.paramString(), "?Cursor=").concat(Cursor, "&Match=").concat(encodeURIComponent(Match), "&Count=").concat(Count));
        };
        this.sCard = function (Key, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/SCARD-!").concat(_this.key).concat(opt.paramString()));
        };
    }
    return setKey;
}());
exports.default = setKey;
