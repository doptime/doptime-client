"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("./http"));
var Option_1 = require("./Option");
var stringKey = /** @class */ (function () {
    function stringKey(key) {
        var _this = this;
        this.key = key;
        this.get = function (Field, opt) {
            if (Field === void 0) { Field = ""; }
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.Urlbase, "/GET-!").concat(_this.key).concat(opt.paramString(), "?F=").concat(encodeURIComponent(Field)));
        };
    }
    return stringKey;
}());
exports.default = stringKey;
