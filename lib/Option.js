"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = exports.Opt = void 0;
//set multiple feature of the requst, such as response type and redis database name
var RequestOptions = /** @class */ (function () {
    function RequestOptions() {
        var _this = this;
        //default urlbase:  set http host of the doptime server
        //the urlbase can be an empty string, which has same domain & port of the web page
        this.baseUrl = "";
        //http params, will be sent as query string
        this.params = {};
        //http headers, will be sent as http headers
        this.headers = {};
        // Primary error handler: used to handle 401 errors, redirect to login page, etc.
        this.primaryErrorHandler = function () { return null; };
        this.throwSecondaryPromiseError = false;
        this.WithUrlbase = function (urlbase) {
            var ret = _this.updateOptions();
            ret.baseUrl = urlbase;
            ret.baseUrl = ret.baseUrl.replace(/\/+$/, "");
            return ret;
        };
        this.WithParam = function (name, value) {
            var _a;
            return _this.updateOptions({ params: (_a = {}, _a[name] = value, _a) });
        };
        //set redis DataSource of the request
        this.WithDataSource = function (dataSourceName) { return _this.updateOptions({ params: { ds: dataSourceName } }); };
        this.WithResponseAs = function (type) { return _this.updateOptions({ headers: { rt: type } }); };
        this.WithResponseAsJson = function () { return _this.WithResponseAs("application/json"); };
        this.WithResponseAsJpeg = function () { return _this.WithResponseAs("image/jpeg"); };
        this.WithResponseAsOgg = function () { return _this.WithResponseAs("audio/ogg"); };
        this.WithResponseAsMpeg = function () { return _this.WithResponseAs("video/mpeg"); };
        this.WithResponseAsMp4 = function () { return _this.WithResponseAs("video/mp4"); };
        this.WithResponseAsText = function () { return _this.WithResponseAs("text/plain"); };
        this.WithResponseAsStream = function () { return _this.WithResponseAs("application/octet-stream"); };
        this.WithResponseAsMsgpack = function () { return _this.WithResponseAs("application/msgpack"); };
        this.WithHeader = function (key, value) {
            var _a;
            return _this.updateOptions({ headers: (_a = {}, _a[key] = value, _a) });
        };
        this.updateOptions = function (options) {
            var _a;
            if (options === void 0) { options = {}; }
            if (_this !== exports.Opt)
                return _this;
            var ret = new RequestOptions();
            ret.params = __assign(__assign({}, _this.params), options.params);
            ret.headers = __assign(__assign({}, _this.headers), options.headers);
            ret.baseUrl = options.baseUrl || _this.baseUrl;
            ret.primaryErrorHandler = _this.primaryErrorHandler;
            ret.throwSecondaryPromiseError = (_a = options.throwSecondaryPromiseError) !== null && _a !== void 0 ? _a : _this.throwSecondaryPromiseError;
            return ret;
        };
        this.WithThrowErrorEnabled = function (enabled) { return _this.updateOptions({ throwSecondaryPromiseError: enabled }); };
    }
    return RequestOptions;
}());
exports.default = RequestOptions;
exports.Opt = new RequestOptions();
// Set global options
var configure = function (options) {
    if (options === void 0) { options = {}; }
    if (options.urlBase !== undefined) {
        exports.Opt.baseUrl = options.urlBase;
        exports.Opt.baseUrl = exports.Opt.baseUrl.replace(/\/+$/, "");
    }
    if (options.token !== undefined) {
        if (!options.token)
            delete exports.Opt.headers["Authorization"];
        else {
            var authorizationHeader = options.token.startsWith("Bearer ") ? options.token : "Bearer ".concat(options.token);
            exports.Opt.headers["Authorization"] = authorizationHeader;
        }
    }
    if (options.sutoken !== undefined) {
        if (!options.sutoken)
            delete exports.Opt.params["su"];
        else
            exports.Opt.params["su"] = options.sutoken;
    }
    if (options.primaryErrorHandler !== undefined) {
        exports.Opt.primaryErrorHandler = options.primaryErrorHandler;
    }
    if (options.allowThrowError !== undefined) {
        exports.Opt.throwSecondaryPromiseError = options.allowThrowError;
    }
    return _this;
};
exports.configure = configure;
