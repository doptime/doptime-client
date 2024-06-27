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
var streamKey = /** @class */ (function (_super) {
    __extends(streamKey, _super);
    function streamKey(key) {
        var _this = _super.call(this, key) || this;
        _this.key = key;
        //xrange xadd xlen xdel
        _this.xAdd = function (Key, ID, Data, opt) {
            if (ID === void 0) { ID = ""; }
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/XADD-").concat(_this.key, "?ID=").concat(ID), Data);
        };
        _this.xDel = function (Key, ID, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/XDEL-").concat(_this.key, "?ID=").concat(ID));
        };
        _this.xLen = function (Key, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/XLEN-").concat(_this.key));
        };
        _this.xRange = function (Key, Start, Stop, opt) {
            if (Start === void 0) { Start = "-"; }
            if (Stop === void 0) { Stop = "+"; }
            if (opt === void 0) { opt = Option_1.Option.responseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/XRANGE-").concat(_this.key, "?Start=").concat(encodeURIComponent(Start), "&Stop=").concat(encodeURIComponent(Stop)));
        };
        _this.xRangeN = function (Key, Start, Stop, Count, opt) {
            if (Start === void 0) { Start = "-"; }
            if (Stop === void 0) { Stop = "+"; }
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = Option_1.Option.responseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/XRANGEN-").concat(_this.key, "?Start=").concat(encodeURIComponent(Start), "&Stop=").concat(encodeURIComponent(Stop), "&Count=").concat(Count));
        };
        _this.xRevRange = function (Key, Start, Stop, opt) {
            if (Start === void 0) { Start = "+"; }
            if (Stop === void 0) { Stop = "-"; }
            if (opt === void 0) { opt = Option_1.Option.responseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/XREVRANGE-").concat(_this.key, "?Start=").concat(encodeURIComponent(Start), "&Stop=").concat(encodeURIComponent(Stop)));
        };
        _this.xRevRangeN = function (Key, Start, Stop, Count, opt) {
            if (Start === void 0) { Start = "+"; }
            if (Stop === void 0) { Stop = "-"; }
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = Option_1.Option.responseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/XREVRANGEN-").concat(_this.key, "?Start=").concat(encodeURIComponent(Start), "&Stop=").concat(encodeURIComponent(Stop), "&Count=").concat(Count));
        };
        //bloack string: 10h20m30s100ms
        _this.xRead = function (Key, Count, Block, opt) {
            if (Count === void 0) { Count = 4096; }
            if (Block === void 0) { Block = "0ms"; }
            if (opt === void 0) { opt = Option_1.Option.responseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/XREAD-").concat(_this.key, "?Count=").concat(Count, "&Block=").concat(Block));
        };
        return _this;
    }
    return streamKey;
}(Key));
exports.default = streamKey;
