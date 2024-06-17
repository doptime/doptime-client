"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultSUToken = exports.configure = exports.Option = void 0;
//set multiple feature of the requst, such as response type and redis database name
var OptionClass = /** @class */ (function () {
    function OptionClass() {
        var _this = this;
        this.UrlItems = {};
        this.Header = {};
        this.WithHeader = function (key, value) {
            var ret = _this.optionCopiedFromDefault();
            ret.Header[key] = value;
            return ret;
        };
        //primaryErrorHandler: used like to handle 401 error, redirect to login page. i.g.: !e.response && e.response.status === 401&&...
        //  if you want's to further handle the error using Promise, you can set AllowThrowErr to true in Option of each request
        this.primaryErrorHandler = function () { return null; };
        this.Urlbase = "";
        this.optionCopiedFromDefault = function () {
            if (_this != exports.Option)
                return _this;
            var ret = new OptionClass();
            ret.UrlItems = Object.assign({}, _this.UrlItems);
            ret.Header = Object.assign({}, _this.Header);
            ret.primaryErrorHandler = _this.primaryErrorHandler;
            ret.throwSecondaryPromiseError = _this.throwSecondaryPromiseError;
            ret.Urlbase = _this.Urlbase;
            return ret;
        };
        this.withUrlField = function (key, value) {
            var ret = _this.optionCopiedFromDefault();
            ret.UrlItems[key] = "-!" + encodeURIComponent(key) + "~" + encodeURIComponent(value);
            return ret;
        };
        //set Content-Type in reponsed header : 
        //json is server default
        this.rspTypeJson = function () { return _this.withUrlField("rt", "application/json"); };
        this.rspTypeJpeg = function () { return _this.withUrlField("rt", "image/jpeg"); };
        this.rspTypeOgg = function () { return _this.withUrlField("rt", "audio/ogg"); };
        this.rspTypeMpeg = function () { return _this.withUrlField("rt", "video/mpeg"); };
        this.rspTypeMp4 = function () { return _this.withUrlField("rt", "video/mp4"); };
        this.rspTypeText = function () { return _this.withUrlField("rt", "text/plain"); };
        this.rspTypeStream = function () { return _this.withUrlField("rt", "application/octet-stream"); };
        this.rspTypeMsgpack = function () { return _this.withUrlField("rt", "application/msgpack"); };
        this.rspTypeAny = function (anyType) { return _this.withUrlField("rt", anyType); };
        //set redis DataSource of the request
        this.withDataSource = function (dataSourceName) { return _this.withUrlField("ds", dataSourceName); };
        this.withUrlbase = function (urlbase) {
            var ret = _this.optionCopiedFromDefault();
            ret.Urlbase = urlbase;
            return ret;
        };
        this.throwSecondaryPromiseError = false;
        //default value false, if true, return error
        this.ThrowSecondaryPromiseErrorSetter = function (allowed) {
            var ret = _this.optionCopiedFromDefault();
            ret.throwSecondaryPromiseError = allowed;
            return ret;
        };
        //default urlbase:  set http host of the doptime server
        //the urlbase can be an empty string, which has same domain & port of the web page
        this.urlbase = "";
        this.SetUrlbase = function (urlbase) {
            var ret = _this.optionCopiedFromDefault();
            ret.urlbase = urlbase;
            return ret;
        };
        this.paramString = function () { var _a; return (_a = Object.values(_this.UrlItems)) === null || _a === void 0 ? void 0 : _a.join(""); };
    }
    return OptionClass;
}());
exports.default = OptionClass;
exports.Option = new OptionClass();
//DefaultHost:  set the host of the doptime server
//JWT: set the JWT in header["Authorization"]
//PrimaryErrorHandler: used like to handle 401 error, redirect to login page. i.g.: !e.response && e.response.status === 401&&...
//  if you want's to further handle the error using Promise, you can set AllowThrowErr to true in Option of each request
var configure = function (UrlBase, JWT, PrimaryErrorHandler) {
    if (UrlBase === void 0) { UrlBase = ""; }
    if (JWT === void 0) { JWT = ""; }
    if (PrimaryErrorHandler === void 0) { PrimaryErrorHandler = function () { return null; }; }
    exports.Option.urlbase = UrlBase;
    if (!JWT)
        delete exports.Option.Header["Authorization"];
    else {
        if (JWT.startsWith("Bearer "))
            exports.Option.Header["Authorization"] = JWT;
        else
            exports.Option.Header["Authorization"] = "Bearer " + JWT;
    }
    exports.Option.primaryErrorHandler = PrimaryErrorHandler;
};
exports.configure = configure;
var setDefaultSUToken = function (sutoken) {
    if (!!sutoken)
        exports.Option.UrlItems["su"] = "-!su~" + encodeURIComponent(sutoken);
    else
        delete exports.Option.UrlItems["su"];
};
exports.setDefaultSUToken = setDefaultSUToken;
