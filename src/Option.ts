
//set multiple feature of the requst, such as response type and redis database name
export default class RequestOptions {
    //default urlbase:  set http host of the doptime server
    //the urlbase can be an empty string, which has same domain & port of the web page
    public baseUrl: string = "";
    public setUrlbase = (urlbase: string) => {
        var ret = this.updateOptions();
        ret.baseUrl = urlbase;
        return ret;
    }

    //http params, will be sent as query string
    public params: { [key: string]: string } = {};
    public setParam = (name: string, value: string) => this.updateOptions({ params: { [name]: value } });

    //set redis DataSource of the request
    public setDataSource = (dataSourceName: string) => this.updateOptions({ params: { ds: dataSourceName } });


    public responseAs = (type: string): RequestOptions => this.updateOptions({ headers: { rt: type } });
    public responseAsJson = () => this.responseAs("application/json");
    public responseAsJpeg = () => this.responseAs("image/jpeg");
    public responseAsOgg = () => this.responseAs("audio/ogg");
    public responseAsMpeg = () => this.responseAs("video/mpeg");
    public responseAsMp4 = () => this.responseAs("video/mp4");
    public responseAsText = () => this.responseAs("text/plain");
    public responseAsStream = () => this.responseAs("application/octet-stream");
    public responseAsMsgpack = () => this.responseAs("application/msgpack");



    //http headers, will be sent as http headers
    public headers: { [key: string]: string } = {};
    public setHeader = (key: string, value: string) => this.updateOptions({ headers: { [key]: value } });


    // Set global options
    public setDefaults = (urlBase: string = "", JWT: string = "", primaryErrorHandler: Function = () => null) => {
        Option.setDefaultBaseUrl(urlBase);
        Option.setDefaultJWT(JWT);
        Option.defaultPrimaryErrorHandler(primaryErrorHandler);
        return this;
    }

    public setDefaultSUToken = (sutoken: string) => {
        delete Option.params["su"];
        if (sutoken) Option.params["su"] = sutoken;
        return this;
    }
    public setDefaultBaseUrl = (urlBase: string) => this.updateOptions({ baseUrl: urlBase });
    public setDefaultJWT = (JWT: string) => {
        if (!JWT) delete Option.headers["Authorization"];
        else Option.headers["Authorization"] = JWT.startsWith("Bearer ") ? JWT : `Bearer ${JWT}`;
        return this;
    }

    // Primary error handler: used to handle 401 errors, redirect to login page, etc.
    public primaryErrorHandler: Function = () => null;
    public defaultPrimaryErrorHandler = (primaryErrorHandler: Function) => {
        Option.primaryErrorHandler = primaryErrorHandler;
        return this;
    }

    private updateOptions = (options: { params?: { [key: string]: string }, headers?: { [key: string]: string }, baseUrl?: string, throwSecondaryPromiseError?: boolean } = {}): RequestOptions => {
        if (this !== Option) return this;
        const ret = new RequestOptions();
        ret.params = { ...this.params, ...options.params };
        ret.headers = { ...this.headers, ...options.headers };
        ret.baseUrl = options.baseUrl || this.baseUrl;
        ret.primaryErrorHandler = this.primaryErrorHandler;
        ret.throwSecondaryPromiseError = options.throwSecondaryPromiseError ?? this.throwSecondaryPromiseError;
        return ret;
    }

    public throwSecondaryPromiseError: boolean = false;
    public allowThrowError = (allowed: boolean) => this.updateOptions({ throwSecondaryPromiseError: allowed });

    constructor() { }
}
export const Option = new RequestOptions();
