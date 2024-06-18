"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultSUToken = exports.configure = exports.Option = void 0;
//set multiple feature of the requst, such as response type and redis database name
var RequestOptions = /** @class */ (function () {
    function RequestOptions() {
        var _this = this;
        this.urlParams = {};
        this.headers = {};
        this.withHeader = function (key, value) {
            var ret = _this.copyOptionsFromDefault();
            ret.headers[key] = value;
            return ret;
        };
        //primaryErrorHandler: used like to handle 401 error, redirect to login page. i.g.: !e.response && e.response.status === 401&&...
        //  if you want's to further handle the error using Promise, you can set AllowThrowErr to true in Option of each request
        this.primaryErrorHandler = function () { return null; };
        this.copyOptionsFromDefault = function () {
            if (_this != exports.Option)
                return _this;
            var ret = new RequestOptions();
            ret.urlParams = Object.assign({}, _this.urlParams);
            ret.headers = Object.assign({}, _this.headers);
            ret.primaryErrorHandler = _this.primaryErrorHandler;
            ret.throwSecondaryPromiseError = _this.throwSecondaryPromiseError;
            ret.baseUrl = _this.baseUrl;
            return ret;
        };
        this.withUrlParam = function (key, value) {
            var ret = _this.copyOptionsFromDefault();
            ret.urlParams[key] = "-!" + encodeURIComponent(key) + "~" + encodeURIComponent(value);
            return ret;
        };
        // Set Content-Type in response header: 
        // json is server default
        this.responseTypeJson = function () { return _this.withUrlParam("rt", "application/json"); };
        this.responseTypeJpeg = function () { return _this.withUrlParam("rt", "image/jpeg"); };
        this.responseTypeOgg = function () { return _this.withUrlParam("rt", "audio/ogg"); };
        this.responseTypeMpeg = function () { return _this.withUrlParam("rt", "video/mpeg"); };
        this.responseTypeMp4 = function () { return _this.withUrlParam("rt", "video/mp4"); };
        this.responseTypeText = function () { return _this.withUrlParam("rt", "text/plain"); };
        this.responseTypeStream = function () { return _this.withUrlParam("rt", "application/octet-stream"); };
        this.responseTypeMsgpack = function () { return _this.withUrlParam("rt", "application/msgpack"); };
        this.responseTypeCustom = function (customType) { return _this.withUrlParam("rt", customType); };
        //set redis DataSource of the request
        this.withDataSource = function (dataSourceName) { return _this.withUrlParam("ds", dataSourceName); };
        this.throwSecondaryPromiseError = false;
        //default value false, if true, return error
        this.setThrowSecondaryPromiseError = function (allowed) {
            var ret = _this.copyOptionsFromDefault();
            ret.throwSecondaryPromiseError = allowed;
            return ret;
        };
        //default urlbase:  set http host of the doptime server
        //the urlbase can be an empty string, which has same domain & port of the web page
        this.baseUrl = "";
        this.withUrlbase = function (urlbase) {
            var ret = _this.copyOptionsFromDefault();
            ret.baseUrl = urlbase;
            return ret;
        };
        this.paramString = function () { var _a; return (_a = Object.values(_this.urlParams)) === null || _a === void 0 ? void 0 : _a.join(""); };
    }
    return RequestOptions;
}());
exports.default = RequestOptions;
exports.Option = new RequestOptions();
//DefaultHost:  set the host of the doptime server
//JWT: set the JWT in header["Authorization"]
//PrimaryErrorHandler: used like to handle 401 error, redirect to login page. i.g.: !e.response && e.response.status === 401&&...
//  if you want's to further handle the error using Promise, you can set AllowThrowErr to true in Option of each request
var configure = function (UrlBase, JWT, PrimaryErrorHandler) {
    if (UrlBase === void 0) { UrlBase = ""; }
    if (JWT === void 0) { JWT = ""; }
    if (PrimaryErrorHandler === void 0) { PrimaryErrorHandler = function () { return null; }; }
    exports.Option.baseUrl = UrlBase;
    if (!JWT)
        delete exports.Option.headers["Authorization"];
    else {
        if (JWT.startsWith("Bearer "))
            exports.Option.headers["Authorization"] = JWT;
        else
            exports.Option.headers["Authorization"] = "Bearer " + JWT;
    }
    exports.Option.primaryErrorHandler = PrimaryErrorHandler;
};
exports.configure = configure;
var setDefaultSUToken = function (sutoken) {
    if (!!sutoken)
        exports.Option.urlParams["su"] = "-!su~" + encodeURIComponent(sutoken);
    else
        delete exports.Option.urlParams["su"];
};
exports.setDefaultSUToken = setDefaultSUToken;
