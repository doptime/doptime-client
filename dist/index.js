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
exports.API = exports.sIsMember = exports.zCard = exports.zCount = exports.zRemRangeByScore = exports.zRem = exports.zAdd = exports.zRevRangeByScore = exports.zRangeByScore = exports.zScore = exports.zRank = exports.zRevRange = exports.zRange = exports.hMGet = exports.hRandField = exports.hKeys = exports.hVals = exports.hGetAll = exports.hDel = exports.hGet = exports.get = exports.hset = exports.hExists = exports.time = exports.urlGet = exports.urlGetCmd = exports.GlobalConfig = exports.Option = void 0;
var axios_1 = __importDefault(require("axios"));
var msgpack = require('@ygoe/msgpack');
//set multiple feature of the requst, such as response type and redis database name
var OptionClass = /** @class */ (function () {
    function OptionClass() {
        var _this = this;
        this.UrlItems = {};
        this.Header = {};
        this.ThrowPromiseError = false;
        this.Host = "";
        this.optionObject = function () { return (_this == exports.Option ? JSON.parse(JSON.stringify(exports.Option)) : _this); };
        this.WithUrlValue = function (key, value) {
            if (!value.startsWith("-!"))
                value = "-!" + value;
            var ret = _this.optionObject();
            ret.UrlItems[key] = value;
            return ret;
        };
        //set Content-Type in reponsed header : 
        //json is server default
        this.RspTypeJson = function () { return _this.WithUrlValue("rsb", "-!JSON"); };
        this.RspTypeJpeg = function () { return _this.WithUrlValue("rsb", "-!JPG"); };
        this.RspTypeOgg = function () { return _this.WithUrlValue("rsb", "-!OGG"); };
        this.RspTypeMpeg = function () { return _this.WithUrlValue("rsb", "-!MPEG"); };
        this.RspTypeMp4 = function () { return _this.WithUrlValue("rsb", "-!MP4"); };
        this.RspTypeText = function () { return _this.WithUrlValue("rsb", "-!TEXT"); };
        this.RspTypeStream = function () { return _this.WithUrlValue("rsb", "-!STREAM"); };
        //set redis DataSource of the request
        this.WithDataSource = function (dataSourceName) { return _this.WithUrlValue("ds", "-!" + encodeURIComponent(dataSourceName)); };
        this.WithHost = function (host) {
            var ret = _this.optionObject();
            ret.Host = host;
            return ret;
        };
        //default value false, if true, return error
        this.ThrowSecondaryPromiseError = function (allowed) {
            var ret = _this.optionObject();
            ret.ThrowPromiseError = allowed;
            return ret;
        };
        this.ToHostString = function () {
            var _a;
            var host = (_a = _this.Host) !== null && _a !== void 0 ? _a : defaultHost;
            if (!host.startsWith("http"))
                throw new Error("host should start with http or https");
            return host;
        };
        this.ToParamString = function () { return Object.values(_this.UrlItems).join(""); };
        this.UrlItems = {};
    }
    return OptionClass;
}());
exports.Option = new OptionClass();
//defaultHost:  set http host of the goflow server
var defaultHost = "";
//primaryErrorHandler: used like to handle 401 error, redirect to login page. i.g.: !e.response && e.response.status === 401&&...
//  if you want's to further handle the error using Promise, you can set AllowThrowErr to true in Option of each request
var primaryErrorHandler = function () { return null; };
//DefaultHost:  set the host of the goflow server
//JWT: set the JWT in header["Authorization"]
//PrimaryErrorHandler: used like to handle 401 error, redirect to login page. i.g.: !e.response && e.response.status === 401&&...
//  if you want's to further handle the error using Promise, you can set AllowThrowErr to true in Option of each request
var GlobalConfig = function (DefaultHost, JWT, PrimaryErrorHandler) {
    if (JWT === void 0) { JWT = ""; }
    if (PrimaryErrorHandler === void 0) { PrimaryErrorHandler = function () { return null; }; }
    if (!DefaultHost.startsWith("http"))
        throw new Error("host should start with http or https");
    else
        defaultHost = DefaultHost;
    if (!JWT)
        delete exports.Option.Header["Authorization"];
    else
        exports.Option.Header["Authorization"] = JWT;
    primaryErrorHandler = PrimaryErrorHandler;
};
exports.GlobalConfig = GlobalConfig;
var Req = function (option) {
    var req = axios_1.default.create({ headers: option.Header });
    req.interceptors.request.use(function (config) {
        if (config.method === "post" || config.method === "put") {
            //if type of data is Object ,convert to object
            if (typeof config.data === "object" && !(config.data instanceof Array))
                config.data = Object.assign({}, config.data);
            config.data = msgpack.encode(config.data);
            //if config.data is uint8 array ,create new buffer of it's length and copy it to new buffer
            if (config.data instanceof Uint8Array) {
                var buf = new ArrayBuffer(config.data.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i < config.data.length; ++i) {
                    view[i] = config.data[i];
                }
                config.data = buf;
            }
            config.headers["Content-Type"] = "application/octet-stream";
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    req.interceptors.response.use(function (response) {
        if ("data" in response)
            return response.data;
        return response;
    }, function (error) {
        if (!!primaryErrorHandler)
            primaryErrorHandler(error);
        if (!!option.ThrowPromiseError)
            return Promise.reject(error);
    });
    return req;
};
//const Url = "https://jp.voiceofai.cc"
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
    if (opt === void 0) { opt = exports.Option; }
    var url = "".concat(opt.ToHostString(), "/").concat(cmd, "-!").concat(Key).concat(opt.ToParamString(), "?F=").concat(encodeURIComponent(Field));
    return url;
};
exports.urlGet = urlGet;
var time = function (opt) {
    if (opt === void 0) { opt = exports.Option.WithDataSource("default"); }
    return Req(opt).get("".concat(opt.ToHostString(), "/TIME-!null").concat(opt.ToParamString(), "?t=").concat(new Date().getTime()));
};
exports.time = time;
var hExists = function (Key, Field, opt) {
    if (Field === void 0) { Field = ""; }
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/HEXISTS-!").concat(Key).concat(opt.ToParamString(), "?F=").concat(encodeURIComponent(Field)));
};
exports.hExists = hExists;
var hset = function (Key, Field, data, opt) {
    if (Field === void 0) { Field = ""; }
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).put("".concat(opt.ToHostString(), "/HSET-!").concat(Key).concat(opt.ToParamString(), "?F=").concat(encodeURIComponent(Field)), data);
};
exports.hset = hset;
var get = function (Key, Field, opt) {
    if (Field === void 0) { Field = ""; }
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/GET-!").concat(Key).concat(opt.ToParamString(), "?F=").concat(encodeURIComponent(Field)));
};
exports.get = get;
var hGet = function (Key, Field, opt) {
    if (Field === void 0) { Field = ""; }
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/HGET-!").concat(Key).concat(opt.ToParamString(), "?F=").concat(encodeURIComponent(Field)));
};
exports.hGet = hGet;
var hDel = function (Key, Field, opt) {
    if (Field === void 0) { Field = ""; }
    if (opt === void 0) { opt = exports.Option; }
    return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, Req(opt).delete("".concat(opt.ToHostString(), "/HDEL-!").concat(Key).concat(opt.ToParamString(), "?F=").concat(Field))];
    }); });
};
exports.hDel = hDel;
var hGetAll = function (Key, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/HGETALL-!").concat(Key).concat(opt.ToParamString()));
};
exports.hGetAll = hGetAll;
var hVals = function (Key, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/HVALS-!").concat(Key).concat(opt.ToParamString()));
};
exports.hVals = hVals;
var hKeys = function (Key, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/HKEYS-!").concat(Key).concat(opt.ToParamString()));
};
exports.hKeys = hKeys;
var hRandField = function (Key, Count, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/HRANDFIELD-!").concat(Key).concat(opt.ToParamString(), "?Count=").concat(Count));
};
exports.hRandField = hRandField;
var hMGet = function (Key, Fields, opt) {
    if (Fields === void 0) { Fields = []; }
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/HMGET-!").concat(Key).concat(opt.ToParamString(), "?F=").concat(encodeURIComponent(Fields.join(","))));
};
exports.hMGet = hMGet;
var zRange = function (Key, Start, Stop, WITHSCORES, opt) {
    if (WITHSCORES === void 0) { WITHSCORES = false; }
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/ZRANGE-!").concat(Key).concat(opt.ToParamString(), "?Start=").concat(Start, "&Stop=").concat(Stop, "&WITHSCORES=").concat(WITHSCORES));
};
exports.zRange = zRange;
var zRevRange = function (Key, Start, Stop, WITHSCORES, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/ZREVRANGE-!").concat(Key).concat(opt.ToParamString(), "?Start=").concat(Start, "&Stop=").concat(Stop, "&WITHSCORES=").concat(WITHSCORES));
};
exports.zRevRange = zRevRange;
var zRank = function (Key, Member, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/ZRANK-!").concat(Key).concat(opt.ToParamString(), "?Member=").concat(Member));
};
exports.zRank = zRank;
var zScore = function (Key, Member, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/ZSCORE-!").concat(Key).concat(opt.ToParamString(), "?Member=").concat(Member));
};
exports.zScore = zScore;
var zRangeByScore = function (Key, Min, Max, WITHSCORES, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/ZRANGEBYSCORE-!").concat(Key).concat(opt.ToParamString(), "?Min=").concat(Min, "&Max=").concat(Max, "&WITHSCORES=").concat(WITHSCORES));
};
exports.zRangeByScore = zRangeByScore;
var zRevRangeByScore = function (Key, Max, Min, WITHSCORES, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/ZREVRANGEBYSCORE-!").concat(Key).concat(opt.ToParamString(), "?Min=").concat(Min, "&Max=").concat(Max, "&WITHSCORES=").concat(WITHSCORES));
};
exports.zRevRangeByScore = zRevRangeByScore;
var zAdd = function (Key, Score, Member, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).post("".concat(opt.ToHostString(), "/ZADD-!").concat(Key).concat(opt.ToParamString(), "?Score=").concat(Score), Member);
};
exports.zAdd = zAdd;
var zRem = function (Key, Member, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).delete("".concat(opt.ToHostString(), "/ZREM-!").concat(Key).concat(opt.ToParamString(), "?Member=").concat(Member));
};
exports.zRem = zRem;
var zRemRangeByScore = function (Key, Min, Max, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).delete("".concat(opt.ToHostString(), "/ZREMRANGEBYSCORE-!").concat(Key).concat(opt.ToParamString(), "?Min=").concat(Min, "&Max=").concat(Max));
};
exports.zRemRangeByScore = zRemRangeByScore;
var zCount = function (Key, Min, Max, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/ZCOUNT-!").concat(Key).concat(opt.ToParamString(), "?Min=").concat(Min, "&Max=").concat(Max));
};
exports.zCount = zCount;
var zCard = function (Key, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/ZCARD-!").concat(Key).concat(opt.ToParamString()));
};
exports.zCard = zCard;
var sIsMember = function (Key, Member, opt) {
    if (opt === void 0) { opt = exports.Option; }
    return Req(opt).get("".concat(opt.ToHostString(), "/SISMEMBER-!").concat(Key).concat(opt.ToParamString(), "?Member=").concat(Member));
};
exports.sIsMember = sIsMember;
var API = function (serviceName, data, opt) {
    if (data === void 0) { data = {}; }
    if (opt === void 0) { opt = exports.Option; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            //ensure service name  is standardized
            //strip prefix "api:" if it exists
            if (serviceName.toLowerCase().startsWith("api:")) {
                serviceName = serviceName.slice(4);
            }
            //first character of Service should be lower case
            if (serviceName.length > 0) {
                serviceName = serviceName[0].toLowerCase() + serviceName.slice(1);
            }
            //error if service name is empty
            if (serviceName.length === 0) {
                console.error("API service name is empty, which is not allowed");
                //throw new Error("API service name is empty, which is not allowed")
                throw new Error("API service name is empty, which is not allowed");
            }
            return [2 /*return*/, Req(opt).post("".concat(opt.ToHostString(), "/API-!").concat(serviceName).concat(opt.ToParamString()), data)];
        });
    });
};
exports.API = API;
