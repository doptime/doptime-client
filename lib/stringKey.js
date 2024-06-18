"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dataschema_1 = require("./dataschema");
var http_1 = __importDefault(require("./http"));
var Option_1 = require("./Option");
var stringKey = /** @class */ (function () {
    function stringKey(key, dataSchemaInstace) {
        if (dataSchemaInstace === void 0) { dataSchemaInstace = null; }
        var _this = this;
        this.key = key;
        this.dataSchemaInstace = dataSchemaInstace;
        this.dataSchema = null;
        this.get = function (Field, opt) {
            if (Field === void 0) { Field = ""; }
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/GET-!").concat(_this.key).concat(opt.paramString(), "?F=").concat(encodeURIComponent(Field)));
        };
        this.set = function (Field, data, opt) {
            if (Field === void 0) { Field = ""; }
            if (opt === void 0) { opt = Option_1.Option; }
            if (!!_this.dataSchema && !(0, dataschema_1.checkSchema)(_this.dataSchema, data))
                return Promise.reject("data not match shema of stringKey:" + _this.key);
            (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/SET-!").concat(_this.key).concat(opt.paramString(), "?F=").concat(encodeURIComponent(Field)), data);
        };
        if (!!this.dataSchemaInstace)
            this.dataSchema = (0, dataschema_1.dataObjectToSchema)(this.dataSchemaInstace);
    }
    return stringKey;
}());
exports.default = stringKey;
