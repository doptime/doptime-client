
//set multiple feature of the requst, such as response type and redis database name
export default class OptionClass {
    public UrlItems: { [key: string]: string } = {};
    public Header: { [key: string]: string } = {};
    public WithHeader = (key: string, value: string) => {
        var ret = this.optionCopiedFromDefault();
        ret.Header[key] = value;
        return ret;
    }

    //primaryErrorHandler: used like to handle 401 error, redirect to login page. i.g.: !e.response && e.response.status === 401&&...
    //  if you want's to further handle the error using Promise, you can set AllowThrowErr to true in Option of each request
    public primaryErrorHandler: Function = () => null;
    public Urlbase: string = "";
    private optionCopiedFromDefault = (): OptionClass => {
        if (this != Option) return this;
        var ret = new OptionClass()
        ret.UrlItems = Object.assign({}, this.UrlItems);
        ret.Header = Object.assign({}, this.Header);
        ret.primaryErrorHandler = this.primaryErrorHandler;
        ret.throwSecondaryPromiseError = this.throwSecondaryPromiseError;
        ret.Urlbase = this.Urlbase;
        return ret;
    }

    public withUrlField = (key: string, value: string) => {
        var ret = this.optionCopiedFromDefault();
        ret.UrlItems[key] = "-!" + encodeURIComponent(key) + "~" + encodeURIComponent(value);
        return ret;
    }
    //set Content-Type in reponsed header : 
    //json is server default
    public rspTypeJson = () => this.withUrlField("rt", "application/json");
    public rspTypeJpeg = () => this.withUrlField("rt", "image/jpeg");
    public rspTypeOgg = () => this.withUrlField("rt", "audio/ogg");
    public rspTypeMpeg = () => this.withUrlField("rt", "video/mpeg");
    public rspTypeMp4 = () => this.withUrlField("rt", "video/mp4");
    public rspTypeText = () => this.withUrlField("rt", "text/plain");
    public rspTypeStream = () => this.withUrlField("rt", "application/octet-stream");
    public rspTypeMsgpack = () => this.withUrlField("rt", "application/msgpack");
    public rspTypeAny = (anyType: string) => this.withUrlField("rt", anyType);
    //set redis DataSource of the request
    public withDataSource = (dataSourceName: string) => this.withUrlField("ds", dataSourceName);
    public withUrlbase = (urlbase: string) => {
        var ret = this.optionCopiedFromDefault();
        ret.Urlbase = urlbase;
        return ret;
    }

    public throwSecondaryPromiseError: boolean = false;
    //default value false, if true, return error
    public ThrowSecondaryPromiseErrorSetter = (allowed: boolean) => {
        var ret = this.optionCopiedFromDefault();
        ret.throwSecondaryPromiseError = allowed;
        return ret;
    }

    //default urlbase:  set http host of the doptime server
    //the urlbase can be an empty string, which has same domain & port of the web page
    public urlbase = ""
    public SetUrlbase = (urlbase: string) => {
        var ret = this.optionCopiedFromDefault();
        ret.urlbase = urlbase;
        return ret;
    }

    public paramString = () => Object.values(this.UrlItems)?.join("");

    constructor() { }
}
export const Option = new OptionClass();

//DefaultHost:  set the host of the doptime server
//JWT: set the JWT in header["Authorization"]
//PrimaryErrorHandler: used like to handle 401 error, redirect to login page. i.g.: !e.response && e.response.status === 401&&...
//  if you want's to further handle the error using Promise, you can set AllowThrowErr to true in Option of each request
export const configure = (UrlBase: string = "", JWT: string = "", PrimaryErrorHandler: Function = () => null) => {
    Option.urlbase = UrlBase;

    if (!JWT) delete Option.Header["Authorization"];
    else {
        if (JWT.startsWith("Bearer ")) Option.Header["Authorization"] = JWT;
        else Option.Header["Authorization"] = "Bearer " + JWT;
    }

    Option.primaryErrorHandler = PrimaryErrorHandler;
}
export const setDefaultSUToken = (sutoken: string) => {
    if (!!sutoken) Option.UrlItems["su"] = "-!su~" + encodeURIComponent(sutoken);
    else delete Option.UrlItems["su"];
}