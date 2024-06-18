"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newApi = exports.OptionClass = exports.Option = exports.setDefaultSUToken = exports.sortedSetKey = exports.hashKey = exports.listKey = exports.stringKey = exports.setKey = exports.streamKey = exports.renamenx = exports.rename = exports.pttl = exports.ttl = exports.persist = exports.expireAt = exports.expire = exports.exists = exports.del = exports.type = exports.keys = exports.scan = exports.time = exports.urlGet = exports.urlGetCmd = exports.msgpackDecode = void 0;
var Option_1 = __importStar(require("./Option"));
exports.OptionClass = Option_1.default;
Object.defineProperty(exports, "Option", { enumerable: true, get: function () { return Option_1.Option; } });
Object.defineProperty(exports, "setDefaultSUToken", { enumerable: true, get: function () { return Option_1.setDefaultSUToken; } });
var http_1 = __importDefault(require("./http"));
var streamKey_1 = __importDefault(require("./streamKey"));
exports.streamKey = streamKey_1.default;
var setKeys_1 = __importDefault(require("./setKeys"));
exports.setKey = setKeys_1.default;
var stringKey_1 = __importDefault(require("./stringKey"));
exports.stringKey = stringKey_1.default;
var listKey_1 = __importDefault(require("./listKey"));
exports.listKey = listKey_1.default;
var hashkey_1 = __importDefault(require("./hashkey"));
exports.hashKey = hashkey_1.default;
var sortedSetKey_1 = __importDefault(require("./sortedSetKey"));
exports.sortedSetKey = sortedSetKey_1.default;
var api_1 = __importDefault(require("./api"));
exports.newApi = api_1.default;
var msgpack = require('@ygoe/msgpack');
var msgpackDecode = function (data) { return msgpack.decode(data); };
exports.msgpackDecode = msgpackDecode;
//const Url = "https://jp.voiceofai.cc"
// all functions should have a commands & key , seperated by "-!"
// other parameters should be key-value pairs, seperated by "~", and key always 2chars
var urlGetCmd;
(function (urlGetCmd) {
    urlGetCmd["HEXISTS"] = "HEXISTS";
    urlGetCmd["GET"] = "GET";
    urlGetCmd["HGET"] = "HGET";
    urlGetCmd["HGETALL"] = "HGETALL";
    urlGetCmd["HMGET"] = "HMGET";
})(urlGetCmd || (exports.urlGetCmd = urlGetCmd = {}));
var urlGet = function (cmd, Key, Field, opt) {
    if (cmd === void 0) { cmd = urlGetCmd.HGET; }
    if (Field === void 0) { Field = ""; }
    if (opt === void 0) { opt = Option_1.Option; }
    var url = "".concat(opt.baseUrl, "/").concat(cmd, "-!").concat(Key).concat(opt.paramString(), "?F=").concat(encodeURIComponent(Field));
    return url;
};
exports.urlGet = urlGet;
var time = function (opt) {
    if (opt === void 0) { opt = Option_1.Option.withDataSource("default"); }
    return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/TIME-!null").concat(opt.paramString(), "?t=").concat(new Date().getTime()));
};
exports.time = time;
var scan = function (Cursor, Match, Count, opt) {
    if (Count === void 0) { Count = 4096; }
    if (opt === void 0) { opt = Option_1.Option; }
    return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/SCAN-!null").concat(opt.paramString(), "?Cursor=").concat(Cursor, "&Match=").concat(encodeURIComponent(Match), "&Count=").concat(Count));
};
exports.scan = scan;
var keys = function (Pattern, opt) {
    if (opt === void 0) { opt = Option_1.Option; }
    return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/KEYS-!null").concat(opt.paramString(), "?Pattern=").concat(Pattern));
};
exports.keys = keys;
var type = function (Key, opt) {
    if (opt === void 0) { opt = Option_1.Option; }
    return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/TYPE-!").concat(Key).concat(opt.paramString()));
};
exports.type = type;
var del = function (Key, opt) {
    if (opt === void 0) { opt = Option_1.Option; }
    return (0, http_1.default)(opt).delete("".concat(opt.baseUrl, "/DEL-!").concat(Key).concat(opt.paramString()));
};
exports.del = del;
var exists = function (Key, opt) {
    if (opt === void 0) { opt = Option_1.Option; }
    return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/EXISTS-!").concat(Key).concat(opt.paramString()));
};
exports.exists = exists;
var expire = function (Key, Seconds, opt) {
    if (opt === void 0) { opt = Option_1.Option; }
    return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/EXPIRE-!").concat(Key).concat(opt.paramString(), "?Seconds=").concat(Seconds));
};
exports.expire = expire;
var expireAt = function (Key, Timestamp, opt) {
    if (opt === void 0) { opt = Option_1.Option; }
    return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/EXPIREAT-!").concat(Key).concat(opt.paramString(), "?Timestamp=").concat(Timestamp));
};
exports.expireAt = expireAt;
var persist = function (Key, opt) {
    if (opt === void 0) { opt = Option_1.Option; }
    return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/PERSIST-!").concat(Key).concat(opt.paramString()));
};
exports.persist = persist;
var ttl = function (Key, opt) {
    if (opt === void 0) { opt = Option_1.Option; }
    return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/TTL-!").concat(Key).concat(opt.paramString()));
};
exports.ttl = ttl;
var pttl = function (Key, opt) {
    if (opt === void 0) { opt = Option_1.Option; }
    return (0, http_1.default)(opt).get("".concat(opt.baseUrl, "/PTTL-!").concat(Key).concat(opt.paramString()));
};
exports.pttl = pttl;
var rename = function (Key, NewKey, opt) {
    if (opt === void 0) { opt = Option_1.Option; }
    return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/RENAME-!").concat(Key).concat(opt.paramString(), "?NewKey=").concat(NewKey));
};
exports.rename = rename;
var renamenx = function (Key, NewKey, opt) {
    if (opt === void 0) { opt = Option_1.Option; }
    return (0, http_1.default)(opt).put("".concat(opt.baseUrl, "/RENAMENX-!").concat(Key).concat(opt.paramString(), "?NewKey=").concat(NewKey));
};
exports.renamenx = renamenx;
exports.default = Option_1.configure;
