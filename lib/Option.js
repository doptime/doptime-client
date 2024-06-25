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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
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
        this.setUrlbase = function (urlbase) {
            var ret = _this.updateOptions();
            ret.baseUrl = urlbase;
            return ret;
        };
        this.addParam = function (name, value) {
            var _a;
            return _this.updateOptions({ params: (_a = {}, _a[name] = value, _a) });
        };
        //set redis DataSource of the request
        this.setDataSource = function (dataSourceName) { return _this.updateOptions({ params: { ds: dataSourceName } }); };
        this.responseAs = function (type) { return _this.updateOptions({ headers: { rt: type } }); };
        this.responseAsJson = function () { return _this.responseAs("application/json"); };
        this.responseAsJpeg = function () { return _this.responseAs("image/jpeg"); };
        this.responseAsOgg = function () { return _this.responseAs("audio/ogg"); };
        this.responseAsMpeg = function () { return _this.responseAs("video/mpeg"); };
        this.responseAsMp4 = function () { return _this.responseAs("video/mp4"); };
        this.responseAsText = function () { return _this.responseAs("text/plain"); };
        this.responseAsStream = function () { return _this.responseAs("application/octet-stream"); };
        this.responseAsMsgpack = function () { return _this.responseAs("application/msgpack"); };
        this.setHeader = function (key, value) {
            var _a;
            return _this.updateOptions({ headers: (_a = {}, _a[key] = value, _a) });
        };
        // Set global options
        this.setDefaults = function (options) {
            if (options === void 0) { options = {}; }
            if (options.urlBase !== undefined) {
                _this.updateOptions({ baseUrl: options.urlBase });
            }
            if (options.JWT !== undefined) {
                var authorizationHeader = options.JWT.startsWith("Bearer ") ? options.JWT : "Bearer ".concat(options.JWT);
                _this.updateOptions({ headers: { Authorization: authorizationHeader } });
            }
            if (options.sutoken !== undefined) {
                _this.updateOptions({ params: { su: options.sutoken } });
            }
            if (options.primaryErrorHandler !== undefined) {
                _this.primaryErrorHandler = options.primaryErrorHandler;
            }
            if (options.allowThrowError !== undefined) {
                _this.updateOptions({ throwSecondaryPromiseError: options.allowThrowError });
            }
            return _this;
        };
        this.updateOptions = function (options) {
            var _a;
            if (options === void 0) { options = {}; }
            if (_this !== exports.Option)
                return _this;
            var ret = new RequestOptions();
            ret.params = __assign(__assign({}, _this.params), options.params);
            ret.headers = __assign(__assign({}, _this.headers), options.headers);
            ret.baseUrl = options.baseUrl || _this.baseUrl;
            ret.primaryErrorHandler = _this.primaryErrorHandler;
            ret.throwSecondaryPromiseError = (_a = options.throwSecondaryPromiseError) !== null && _a !== void 0 ? _a : _this.throwSecondaryPromiseError;
            return ret;
        };
        this.allowThrowError = function (allowed) { return _this.updateOptions({ throwSecondaryPromiseError: allowed }); };
    }
    return RequestOptions;
}());
exports.default = RequestOptions;
exports.Option = new RequestOptions();
