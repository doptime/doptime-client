"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var http_1 = __importDefault(require("./http")); // Assuming Req is a function that handles HTTP requests and returns Promises
var Option_1 = require("./Option"); // Assuming RequestOptions and a default Opt instance
var hashKey = /** @class */ (function () {
    /**
     * Creates an instance of hashKey.
     * @param key The base key for the hash in the data store.
     * @param dataSchemaInstance An instance or representation of the schema for type T, potentially used for validation or transformation.
     */
    function hashKey(key, dataSchemaInstance) {
        if (dataSchemaInstance === void 0) { dataSchemaInstance = null; }
        var _this = this;
        this.key = key;
        this.dataSchemaInstance = dataSchemaInstance;
        /**
         * (HEXISTS) Checks if a field exists in the hash.
         * @param Field The field name to check.
         * @param opt Optional request options.
         * @returns Promise resolving to true if the field exists, or false if the field does not exist or the key does not exist.
    
         */
        this.hExists = function (Field, opt) {
            if (Field === void 0) { Field = ""; }
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/HEXISTS-").concat(_this.key, "?f=").concat(encodeURIComponent(Field)));
        };
        /**
         * (HSET) Sets the specified field to its respective value in the hash stored at key.
         * If field already exists in the hash, it is overwritten.
         * The type of `data` is `T`, implying the value stored for the field is an object conforming to `T`.
         * @param Field The field name to set.
         * @param data The value to set for the field, expected to be of type `T`.
         * @param opt Optional request options.
         * @returns Promise resolving to the number of fields that were added (1 if field is new, 0 if field was updated).
         */
        this.hSet = function (Field, data, opt) {
            if (Field === void 0) { Field = ""; }
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/HSET-").concat(_this.key, "?f=").concat(encodeURIComponent(Field)), data);
        };
        /**
         * (HGET) Gets the value of a field in the hash.
         * Assumes the value stored is of type `T` and will be deserialized.
         * @param Field The field name to retrieve.
         * @param opt Optional request options.
         * @returns Promise resolving to the value of the field (as `T`), or null if the field or key does not exist.
         */
        this.hGet = function (Field, opt) {
            if (Field === void 0) { Field = ""; }
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/HGET-").concat(_this.key, "?f=").concat(encodeURIComponent(Field)));
        };
        /**
         * (HDEL) Removes the specified field from the hash.
         * @param Field The field name to delete.
         * @param opt Optional request options.
         * @returns Promise resolving to the number of fields that were removed from the hash (0 or 1).
         */
        this.hDel = function (Field, opt) {
            if (Field === void 0) { Field = ""; }
            if (opt === void 0) { opt = Option_1.Opt; }
            return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/HDEL-").concat(this.key, "?f=").concat(encodeURIComponent(Field)))];
            }); });
        };
        /**
         * (HGETALL) Gets all fields and values in the hash.
         * Assumes values are of type `T` and will be deserialized.
         * @param opt Optional request options.
         * @returns Promise resolving to an object where keys are field names and values are of type `T`, or null if the key does not exist.
         */
        this.hGetAll = function (opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/HGETALL-").concat(_this.key));
        };
        /**
         * (HVALS) Gets all values in the hash.
         * Assumes values are of type `T` and will be deserialized.
         * @param opt Optional request options.
         * @returns Promise resolving to an array of values (each as `T`) from the hash.
         */
        this.hVals = function (opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/HVALS-").concat(_this.key));
        };
        /**
         * (HKEYS) Gets all field names in the hash.
         * @param opt Optional request options.
         * @returns Promise resolving to an array of field names.
         */
        this.hKeys = function (opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/HKEYS-").concat(_this.key));
        };
        /**
         * (HRANDFIELD) Gets one or more random field names from the hash.
         * @param Count The number of random fields to return. If positive, returns distinct fields.
         * @param opt Optional request options.
         * @returns Promise resolving to an array of random field names, or null/empty array if the key doesn't exist or count is zero.
         */
        this.hRandField = function (Count, opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/HRANDFIELD-").concat(_this.key, "?Count=").concat(Count));
        };
        /**
         * (HMGET) Gets the values of multiple fields in the hash.
         * Assumes values are of type `T` and will be deserialized.
         * @param Fields An array of field names to retrieve.
         * @param opt Optional request options.
         * @returns Promise resolving to an array of values (each as `T` or null if the field does not exist) corresponding to the specified fields.
         */
        this.hMGet = function (Fields, opt) {
            if (Fields === void 0) { Fields = []; }
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/HMGET-").concat(_this.key, "?f=").concat(encodeURIComponent(Fields.join(","))));
        };
        /**
         * (HMSET) Sets multiple fields to their respective values in a hash.
         * Each value is assumed to be of type `T`.
         * @param data An object where each key is a field name and each value is the value (of type `T`) to set for that field.
         * @param opt Optional request options.
         * @returns Promise resolving when the operation is successful (e.g., with void or a status string like "OK" from the API).
         */
        this.hMSet = function (data, opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/HMSET-").concat(_this.key), data);
        };
        /**
         * (HINCRBY) Atomically increments the integer value of a hash field by the given number.
         * If the field does not exist, it is set to 0 before performing the operation.
         * An error is returned if the field contains a value of the wrong type or a string that cannot be represented as an integer.
         * @param Field The field name in the hash.
         * @param Increment The amount to increment the field's value by.
         * @param opt Optional request options.
         * @returns Promise resolving to the value of the field after the increment.
         */
        this.hIncrBy = function (Field, Increment, opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/HINCRBY-").concat(_this.key, "?Field=").concat(Field, "&Increment=").concat(Increment));
        };
        /**
         * (HINCRBYFLOAT) Atomically increments the float value of a hash field by the given number.
         * If the field does not exist, it is set to 0 before performing the operation.
         * An error is returned if the field contains a value of the wrong type or a string that cannot be represented as a float.
         * @param Field The field name in the hash.
         * @param Increment The amount to increment the field's value by (can be a float).
         * @param opt Optional request options.
         * @returns Promise resolving to the value of the field after the increment (as a number).
         */
        this.hIncrByFloat = function (Field, Increment, opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/HINCRBYFLOAT-").concat(_this.key, "?Field=").concat(Field, "&Increment=").concat(Increment));
        };
        /**
         * (HSCAN) Incrementally iterates over fields and values of a hash.
         * @param Cursor The cursor for the iteration. Start with 0 for the first call.
         * @param Match A glob-style pattern to filter fields.
         * @param Count An optional hint for the number of elements to return per scan. Default is 4096.
         * @param NOVALUES If true, values are not returned, only field names. Default is false.
         * @param opt Optional request options.
         * @returns Promise resolving to a tuple: `[newCursor: string, elements: string[] | Record<string, T>]`.
         * `newCursor` is the cursor for the next iteration (a "0" string means iteration is complete).
         * `elements` is an array of field names if `NOVALUES` is true,
         * or a Record of field-value pairs (where values are `T`) if `NOVALUES` is false.
         * The exact structure returned by `Req` for `elements` needs to match this type.
         */
        this.hScan = function (Cursor, Match, Count, NOVALUES, opt) {
            if (Count === void 0) { Count = 4096; }
            if (NOVALUES === void 0) { NOVALUES = false; }
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/HSCAN-").concat(_this.key, "?Cursor=").concat(Cursor, "&Match=").concat(encodeURIComponent(Match), "&Count=").concat(Count).concat(NOVALUES ? "&NOVALUES=true" : ""));
        };
        /**
         * (HLEN) Gets the number of fields contained in the hash stored at key.
         * @param opt Optional request options.
         * @returns Promise resolving to the number of fields in the hash, or 0 if the key does not exist.
         */
        this.hLen = function (opt) {
            if (opt === void 0) { opt = Option_1.Opt; }
            return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/HLEN-").concat(_this.key));
        };
    }
    /**
     * Concatenates additional fields to the current key to form a new key.
     * @param fields Additional string segments to append to the key.
     * @returns A new hashKey instance with the concatenated key.
     */
    hashKey.prototype.ConcatKey = function () {
        var fields = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fields[_i] = arguments[_i];
        }
        var newKey = __spreadArray([this.key], fields, true).filter(function (v) { return !!v; }).join(":");
        return new hashKey(newKey, this.dataSchemaInstance);
    };
    return hashKey;
}());
exports.default = hashKey;
