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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("./http"));
var Option_1 = require("./Option");
var hashKey = /** @class */ (function () {
    function hashKey(key) {
        var _this = this;
        this.key = key;
        this.hExists = function (Field, opt) {
            if (Field === void 0) { Field = ""; }
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.urlbase, "/HEXISTS-!").concat(_this.key).concat(opt.paramString(), "?F=").concat(encodeURIComponent(Field)));
        };
        this.hset = function (Field, data, opt) {
            if (Field === void 0) { Field = ""; }
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).put("".concat(opt.urlbase, "/HSET-!").concat(_this.key).concat(opt.paramString(), "?F=").concat(encodeURIComponent(Field)), data);
        };
        this.hGet = function (Field, opt) {
            if (Field === void 0) { Field = ""; }
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.urlbase, "/HGET-!").concat(_this.key).concat(opt.paramString(), "?F=").concat(encodeURIComponent(Field)));
        };
        this.hDel = function (Field, opt) {
            if (Field === void 0) { Field = ""; }
            if (opt === void 0) { opt = Option_1.Option; }
            return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, (0, http_1.default)(opt).delete("".concat(opt.urlbase, "/HDEL-!").concat(this.key).concat(opt.paramString(), "?F=").concat(Field))];
            }); });
        };
        this.hGetAll = function (opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.urlbase, "/HGETALL-!").concat(_this.key).concat(opt.paramString()));
        };
        this.hVals = function (opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.urlbase, "/HVALS-!").concat(_this.key).concat(opt.paramString()));
        };
        this.hKeys = function (opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.urlbase, "/HKEYS-!").concat(_this.key).concat(opt.paramString()));
        };
        this.hRandField = function (Count, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.urlbase, "/HRANDFIELD-!").concat(_this.key).concat(opt.paramString(), "?Count=").concat(Count));
        };
        this.hMGet = function (Fields, opt) {
            if (Fields === void 0) { Fields = []; }
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.urlbase, "/HMGET-!").concat(_this.key).concat(opt.paramString(), "?F=").concat(encodeURIComponent(Fields.join(","))));
        };
        this.hIncrBy = function (Key, Field, Increment, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).put("".concat(opt.Urlbase, "/HINCRBY-!").concat(_this.key).concat(opt.paramString(), "?Field=").concat(Field, "&Increment=").concat(Increment));
        };
        this.hIncrByFloat = function (Key, Field, Increment, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).put("".concat(opt.Urlbase, "/HINCRBYFLOAT-!").concat(_this.key).concat(opt.paramString(), "?Field=").concat(Field, "&Increment=").concat(Increment));
        };
        this.hScan = function (Key, Cursor, Match, Count, opt) {
            if (Count === void 0) { Count = 4096; }
            if (opt === void 0) { opt = Option_1.Option.rspTypeMsgpack(); }
            return (0, http_1.default)(opt, "arraybuffer").get("".concat(opt.Urlbase, "/HSCAN-!").concat(_this.key).concat(opt.paramString(), "?Cursor=").concat(Cursor, "&Match=").concat(encodeURIComponent(Match), "&Count=").concat(Count));
        };
        this.hLen = function (Key, opt) {
            if (opt === void 0) { opt = Option_1.Option; }
            return (0, http_1.default)(opt).get("".concat(opt.Urlbase, "/HLEN-!").concat(_this.key).concat(opt.paramString()));
        };
    }
    return hashKey;
}());
exports.default = hashKey;