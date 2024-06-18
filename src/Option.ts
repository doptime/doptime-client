
//set multiple feature of the requst, such as response type and redis database name
export default class RequestOptions {
    public urlParams: { [key: string]: string } = {};
    public headers: { [key: string]: string } = {};
    public withHeader = (key: string, value: string) => {
        var ret = this.copyOptionsFromDefault();
        ret.headers[key] = value;
        return ret;
    }

    //primaryErrorHandler: used like to handle 401 error, redirect to login page. i.g.: !e.response && e.response.status === 401&&...
    //  if you want's to further handle the error using Promise, you can set AllowThrowErr to true in Option of each request
    public primaryErrorHandler: Function = () => null;
    private copyOptionsFromDefault = (): RequestOptions => {
        if (this != Option) return this;
        var ret = new RequestOptions()
        ret.urlParams = Object.assign({}, this.urlParams);
        ret.headers = Object.assign({}, this.headers);
        ret.primaryErrorHandler = this.primaryErrorHandler;
        ret.throwSecondaryPromiseError = this.throwSecondaryPromiseError;
        ret.baseUrl = this.baseUrl;
        return ret;
    }

    public withUrlParam = (key: string, value: string) => {
        var ret = this.copyOptionsFromDefault();
        ret.urlParams[key] = "-!" + encodeURIComponent(key) + "~" + encodeURIComponent(value);
        return ret;
    }
    // Set Content-Type in response header: 
    // json is server default
    public responseTypeJson = () => this.withUrlParam("rt", "application/json");
    public responseTypeJpeg = () => this.withUrlParam("rt", "image/jpeg");
    public responseTypeOgg = () => this.withUrlParam("rt", "audio/ogg");
    public responseTypeMpeg = () => this.withUrlParam("rt", "video/mpeg");
    public responseTypeMp4 = () => this.withUrlParam("rt", "video/mp4");
    public responseTypeText = () => this.withUrlParam("rt", "text/plain");
    public responseTypeStream = () => this.withUrlParam("rt", "application/octet-stream");
    public responseTypeMsgpack = () => this.withUrlParam("rt", "application/msgpack");
    public responseTypeCustom = (customType: string) => this.withUrlParam("rt", customType);

    //set redis DataSource of the request
    public withDataSource = (dataSourceName: string) => this.withUrlParam("ds", dataSourceName);

    public throwSecondaryPromiseError: boolean = false;
    //default value false, if true, return error
    public setThrowSecondaryPromiseError = (allowed: boolean) => {
        var ret = this.copyOptionsFromDefault();
        ret.throwSecondaryPromiseError = allowed;
        return ret;
    }

    //default urlbase:  set http host of the doptime server
    //the urlbase can be an empty string, which has same domain & port of the web page
    public baseUrl: string = "";
    public withUrlbase = (urlbase: string) => {
        var ret = this.copyOptionsFromDefault();
        ret.baseUrl = urlbase;
        return ret;
    }

    public paramString = () => Object.values(this.urlParams)?.join("");

    constructor() { }
}
export const Option = new RequestOptions();

//DefaultHost:  set the host of the doptime server
//JWT: set the JWT in header["Authorization"]
//PrimaryErrorHandler: used like to handle 401 error, redirect to login page. i.g.: !e.response && e.response.status === 401&&...
//  if you want's to further handle the error using Promise, you can set AllowThrowErr to true in Option of each request
export const configure = (UrlBase: string = "", JWT: string = "", PrimaryErrorHandler: Function = () => null) => {
    Option.baseUrl = UrlBase;

    if (!JWT) delete Option.headers["Authorization"];
    else {
        if (JWT.startsWith("Bearer ")) Option.headers["Authorization"] = JWT;
        else Option.headers["Authorization"] = "Bearer " + JWT;
    }

    Option.primaryErrorHandler = PrimaryErrorHandler;
}
export const setDefaultSUToken = (sutoken: string) => {
    if (!!sutoken) Option.urlParams["su"] = "-!su~" + encodeURIComponent(sutoken);
    else delete Option.urlParams["su"];
}