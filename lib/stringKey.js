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
var dataschema_1 = require("./dataschema");
var http_1 = __importDefault(require("./http"));
var Option_1 = require("./Option");
var key_1 = __importDefault(require("./key"));
var stringKey = /** @class */ (function (_super) {
    __extends(stringKey, _super);
    function stringKey(key, dataSchemaInstace) {
        if (dataSchemaInstace === void 0) { dataSchemaInstace = null; }
        var _this = _super.call(this, key) || this;
        _this.key = key;
        _this.dataSchemaInstace = dataSchemaInstace;
        _this.dataSchema = null;
        _this.get = function (Field, opt) {
            if (Field === void 0) { Field = ""; }
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/GET-").concat(_this.getkey(), "?f=").concat(encodeURIComponent(Field)));
        };
        _this.set = function (Field, data, opt) {
            if (Field === void 0) { Field = ""; }
            if (opt === void 0) { opt = Option_1.Option; }
            if (!!_this.dataSchema) {
                var errors = (0, dataschema_1.checkSchema)(_this.dataSchema, data);
                if (errors.length > 0) {
                    return Promise.reject("shema unmatch of stringkey: " + _this.key + " " + JSON.stringify(errors));
                }
            }
            (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/SET-").concat(_this.getkey(), "?f=").concat(encodeURIComponent(Field)), data);
        };
        if (!!_this.dataSchemaInstace)
            _this.dataSchema = (0, dataschema_1.dataObjectToSchema)(_this.dataSchemaInstace);
        return _this;
    }
    return stringKey;
}(key_1.default));
exports.default = stringKey;
