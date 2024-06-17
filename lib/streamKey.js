"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("./http"));
var Option_1 = require("./Option");
var streamKey = /** @class */ (function () {
    function streamKey(key) {
        var _this = this;
        this.key = key;
        //xrange xadd xlen xdel
        this.xAdd = function (Key, ID, Data, opt) {
            if (ID === void 0) { ID = ""; }
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).post("".concat(opt.Urlbase, "/XADD-!").concat(_this.key).concat(opt.paramString(), "?ID=").concat(ID), Data);
        };
        this.xDel = function (Key, ID, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.Urlbase, "/XDEL-!").concat(_this.key).concat(opt.paramString(), "?ID=").concat(ID));
        };
        this.xLen = function (Key, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.Urlbase, "/XLEN-!").concat(_this.key).concat(opt.paramString()));
        };
        this.xRange = function (Key, Start, Stop, opt) {
            if (Start === void 0) { Start = "-"; }
            if (Stop === void 0) { Stop = "+"; }
            if (opt === void 0) { opt = Option_1.Option.rspTypeMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.Urlbase, "/XRANGE-!").concat(_this.key).concat(opt.paramString(), "?Start=").concat(encodeURIComponent(Start), "&Stop=").concat(encodeURIComponent(Stop)));
        };
        this.xRangeN = function (Key, Start, Stop, Count, opt) {
            if (Start === void 0) { Start = "-"; }
            if (Stop === void 0) { Stop = "+"; }
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = Option_1.Option.rspTypeMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.Urlbase, "/XRANGEN-!").concat(_this.key).concat(opt.paramString(), "?Start=").concat(encodeURIComponent(Start), "&Stop=").concat(encodeURIComponent(Stop), "&Count=").concat(Count));
        };
        this.xRevRange = function (Key, Start, Stop, opt) {
            if (Start === void 0) { Start = "+"; }
            if (Stop === void 0) { Stop = "-"; }
            if (opt === void 0) { opt = Option_1.Option.rspTypeMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.Urlbase, "/XREVRANGE-!").concat(_this.key).concat(opt.paramString(), "?Start=").concat(encodeURIComponent(Start), "&Stop=").concat(encodeURIComponent(Stop)));
        };
        this.xRevRangeN = function (Key, Start, Stop, Count, opt) {
            if (Start === void 0) { Start = "+"; }
            if (Stop === void 0) { Stop = "-"; }
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = Option_1.Option.rspTypeMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.Urlbase, "/XREVRANGEN-!").concat(_this.key).concat(opt.paramString(), "?Start=").concat(encodeURIComponent(Start), "&Stop=").concat(encodeURIComponent(Stop), "&Count=").concat(Count));
        };
        //bloack string: 10h20m30s100ms
        this.xRead = function (Key, Count, Block, opt) {
            if (Count === void 0) { Count = 4096; }
            if (Block === void 0) { Block = "0ms"; }
            if (opt === void 0) { opt = Option_1.Option.rspTypeMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.Urlbase, "/XREAD-!").concat(_this.key).concat(opt.paramString(), "?Count=").concat(Count, "&Block=").concat(Block));
        };
    }
    return streamKey;
}());
exports.default = streamKey;
