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
var config_1 = require("./config");
/**
 * @template T
 */
var ListKey = /** @class */ (function () {
    function ListKey(key, dataSchemaInstance) {
        if (dataSchemaInstance === void 0) { dataSchemaInstance = null; }
        var _this = this;
        this.key = key;
        this.dataSchemaInstance = dataSchemaInstance;
        /**
         * (LINDEX) Gets the element at the specified index in the list.
         * @param index Index of the element to retrieve.
         * @param opt Optional request options.
         * @returns Promise resolving to the element at the index, or null if index is out of bounds.
         */
        this.lIndex = function (index, opt) {
            if (opt === void 0) { opt = config_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/LINDEX-").concat(_this.key, "?Index=").concat(index));
        };
        /**
         * (LPOP) Removes and returns the first element of the list.
         * @param opt Optional request options.
         * @returns Promise resolving to the removed element, or null if the list is empty.
         */
        this.lPop = function (opt) {
            if (opt === void 0) { opt = config_1.Opt; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/LPOP-").concat(_this.key));
        };
        /**
         * (LPUSH) Inserts one or more values at the beginning of the list.
         * @param data The value(s) to insert. Should be a single value or an array for multiple values.
         * @param opt Optional request options.
         * @returns Promise resolving to the length of the list after the push operation.
         */
        this.lPush = function (data, opt) {
            if (opt === void 0) { opt = config_1.Opt; }
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/LPUSH-").concat(_this.key), data);
        };
        /**
         * (LREM) Removes elements equal to the provided value based on count.
         * @param count Number of occurrences to remove (sign indicates direction).
         * @param data The value to match for removal.
         * @param opt Optional request options.
         * @returns Promise resolving to the number of removed elements.
         */
        this.lRem = function (count, data, opt) {
            if (opt === void 0) { opt = config_1.Opt; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/LREM-").concat(_this.key, "?Count=").concat(count), data);
        };
        /**
         * (LSET) Sets the value of an element at the specified index.
         * @param index Index of the element to update.
         * @param data New value to set.
         * @param opt Optional request options.
         * @returns Promise resolving to "OK" if successful.
         */
        this.lSet = function (index, data, opt) {
            if (opt === void 0) { opt = config_1.Opt; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/LSET-").concat(_this.key, "?Index=").concat(index), data);
        };
        /**
         * (LTRIM) Trims the list to the specified range.
         * @param start Start index (inclusive).
         * @param stop End index (inclusive).
         * @param opt Optional request options.
         * @returns Promise resolving to "OK" if successful.
         */
        this.lTrim = function (start, stop, opt) {
            if (opt === void 0) { opt = config_1.Opt; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/LTRIM-").concat(_this.key, "?Start=").concat(start, "&Stop=").concat(stop));
        };
        /**
         * (RPOP) Removes and returns the last element of the list.
         * @param opt Optional request options.
         * @returns Promise resolving to the removed element, or null if the list is empty.
         */
        this.rPop = function (opt) {
            if (opt === void 0) { opt = config_1.Opt; }
            return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/RPOP-").concat(_this.key));
        };
        /**
         * (RPUSH) Appends one or more values at the end of the list.
         * @param data The value(s) to append.
         * @param opt Optional request options.
         * @returns Promise resolving to the length of the list after the push operation.
         */
        this.rPush = function (data, opt) {
            if (opt === void 0) { opt = config_1.Opt; }
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/RPUSH-").concat(_this.key), data);
        };
        /**
         * (RPUSHX) Appends the value at the end of the list only if it exists.
         * @param data The value to append.
         * @param opt Optional request options.
         * @returns Promise resolving to the length of the list after the push, or 0 if the list doesn't exist.
         */
        this.rPushX = function (data, opt) {
            if (opt === void 0) { opt = config_1.Opt; }
            return (0, http_1.default)(opt).post("".concat(opt.baseUrl, "/RPUSHX-").concat(_this.key), data);
        };
        /**
         * (LLEN) Gets the length of the list.
         * @param opt Optional request options.
         * @returns Promise resolving to the length of the list.
         */
        this.lLen = function (opt) {
            if (opt === void 0) { opt = config_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/LLEN-").concat(_this.key));
        };
        /**
         * (LRANGE) Gets a range of elements from the list.
         * @param start Start index (inclusive).
         * @param stop End index (inclusive).
         * @param opt Optional request options (defaulting to binary/msgpack response handling).
         * @returns Promise resolving to an array of elements in the specified range.
         */
        this.lRange = function (start, stop, opt) {
            if (opt === void 0) { opt = config_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/LRANGE-").concat(_this.key, "?Start=").concat(start, "&Stop=").concat(stop));
        };
    }
    /**
     * Concatenates additional fields to the current key to form a new key.
     * @param fields Additional fields to append to the key.
     * @returns A new ListKey instance with the concatenated key.
     */
    ListKey.prototype.concatKey = function () {
        var fields = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fields[_i] = arguments[_i];
        }
        var newKey = __spreadArray([this.key], fields, true).filter(function (v) { return !!v; }).join(":");
        return new ListKey(newKey, this.dataSchemaInstance);
    };
    return ListKey;
}());
exports.default = ListKey;
