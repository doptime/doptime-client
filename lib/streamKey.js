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
var streamKey = /** @class */ (function () {
    function streamKey(key, dataSchemaInstace) {
        if (dataSchemaInstace === void 0) { dataSchemaInstace = null; }
        var _this = this;
        this.key = key;
        this.dataSchemaInstace = dataSchemaInstace;
        this.dataSchema = null;
        //xrange xadd xlen xdel
        this.xAdd = function (Key, ID, Data, opt) {
            if (ID === void 0) { ID = ""; }
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/XADD-").concat(_this.key, "?ID=").concat(ID), Data);
        };
        this.xDel = function (Key, ID, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/XDEL-").concat(_this.key, "?ID=").concat(ID));
        };
        this.xLen = function (Key, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/XLEN-").concat(_this.key));
        };
        this.xRange = function (Key, Start, Stop, opt) {
            if (Start === void 0) { Start = "-"; }
            if (Stop === void 0) { Stop = "+"; }
            if (opt === void 0) { opt = Option_1.Option.responseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/XRANGE-").concat(_this.key, "?Start=").concat(encodeURIComponent(Start), "&Stop=").concat(encodeURIComponent(Stop)));
        };
        this.xRangeN = function (Key, Start, Stop, Count, opt) {
            if (Start === void 0) { Start = "-"; }
            if (Stop === void 0) { Stop = "+"; }
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = Option_1.Option.responseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/XRANGEN-").concat(_this.key, "?Start=").concat(encodeURIComponent(Start), "&Stop=").concat(encodeURIComponent(Stop), "&Count=").concat(Count));
        };
        this.xRevRange = function (Key, Start, Stop, opt) {
            if (Start === void 0) { Start = "+"; }
            if (Stop === void 0) { Stop = "-"; }
            if (opt === void 0) { opt = Option_1.Option.responseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/XREVRANGE-").concat(_this.key, "?Start=").concat(encodeURIComponent(Start), "&Stop=").concat(encodeURIComponent(Stop)));
        };
        this.xRevRangeN = function (Key, Start, Stop, Count, opt) {
            if (Start === void 0) { Start = "+"; }
            if (Stop === void 0) { Stop = "-"; }
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = Option_1.Option.responseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/XREVRANGEN-").concat(_this.key, "?Start=").concat(encodeURIComponent(Start), "&Stop=").concat(encodeURIComponent(Stop), "&Count=").concat(Count));
        };
        //bloack string: 10h20m30s100ms
        this.xRead = function (Key, Count, Block, opt) {
            if (Count === void 0) { Count = 4096; }
            if (Block === void 0) { Block = "0ms"; }
            if (opt === void 0) { opt = Option_1.Option.responseAsMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.baseUrl, "/XREAD-").concat(_this.key, "?Count=").concat(Count, "&Block=").concat(Block));
        };
        if (!!this.dataSchemaInstace)
            this.dataSchema = (0, dataschema_1.dataObjectToSchema)(this.dataSchemaInstace);
    }
    streamKey.prototype.ConcatKey = function () {
        var fields = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fields[_i] = arguments[_i];
        }
        var newKey = __spreadArray([this.key], fields, true).filter(function (v) { return !!v; }).join(":");
        var _key = new streamKey(newKey);
        _key.dataSchema = this.dataSchema;
        return _key;
    };
    return streamKey;
}());
exports.default = streamKey;
