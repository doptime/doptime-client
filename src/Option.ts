
//set multiple feature of the requst, such as response type and redis database name
export default class RequestOptions {
    //default urlbase:  set http host of the doptime server
    //the urlbase can be an empty string, which has same domain & port of the web page
    public baseUrl: string = "";

    //http params, will be sent as query string
    public params: { [key: string]: string } = {};

    //http headers, will be sent as http headers
    public headers: { [key: string]: string } = {};

    // Primary error handler: used to handle 401 errors, redirect to login page, etc.
    public primaryErrorHandler: Function = () => null;

    public throwSecondaryPromiseError: boolean = false;

    public WithUrlbase = (urlbase: string) => {

        var ret = this.updateOptions();
        ret.baseUrl = urlbase;
        ret.baseUrl = ret.baseUrl.replace(/\/+$/, "");
        return ret;
    }

    public WithParam = (name: string, value: string) => this.updateOptions({ params: { [name]: value } });

    //set redis DataSource of the request
    public WithDataSource = (dataSourceName: string) => this.updateOptions({ params: { ds: dataSourceName } });

    public WithResponseAs = (type: string): RequestOptions => this.updateOptions({ headers: { rt: type } });
    public WithResponseAsJson = () => this.WithResponseAs("application/json");
    public WithResponseAsJpeg = () => this.WithResponseAs("image/jpeg");
    public WithResponseAsOgg = () => this.WithResponseAs("audio/ogg");
    public WithResponseAsMpeg = () => this.WithResponseAs("video/mpeg");
    public WithResponseAsMp4 = () => this.WithResponseAs("video/mp4");
    public WithResponseAsText = () => this.WithResponseAs("text/plain");
    public WithResponseAsStream = () => this.WithResponseAs("application/octet-stream");
    public WithResponseAsMsgpack = () => this.WithResponseAs("application/msgpack");

    public WithHeader = (key: string, value: string) => this.updateOptions({ headers: { [key]: value } });

    private updateOptions = (options: { params?: { [key: string]: string }, headers?: { [key: string]: string }, baseUrl?: string, throwSecondaryPromiseError?: boolean } = {}): RequestOptions => {
        if (this !== Opt) return this;
        const ret = new RequestOptions();
        ret.params = { ...this.params, ...options.params };
        ret.headers = { ...this.headers, ...options.headers };
        ret.baseUrl = options.baseUrl || this.baseUrl;
        ret.primaryErrorHandler = this.primaryErrorHandler;
        ret.throwSecondaryPromiseError = options.throwSecondaryPromiseError ?? this.throwSecondaryPromiseError;
        return ret;
    }

    public WithThrowErrorEnabled = (enabled: boolean) => this.updateOptions({ throwSecondaryPromiseError: enabled });

    constructor() { }
}
export const Opt = new RequestOptions();

// Set global options
export const configure = (options: { urlBase?: string, token?: string | null | (() => string | null) | (() => Promise<string | null>), primaryErrorHandler?: Function, sutoken?: string, allowThrowError?: boolean } = {}) => {
    if (options.urlBase !== undefined) {
        Opt.baseUrl = options.urlBase;
        Opt.baseUrl = Opt.baseUrl.replace(/\/+$/, "");
    }

    if (options.token !== undefined) {
        const setAuth = (val: string | null) => {
            if (!val) delete Opt.headers["Authorization"];
            else Opt.headers["Authorization"] = val.startsWith("Bearer ") ? val : `Bearer ${val}`;
        };

        if (!options.token) {
            delete Opt.headers["Authorization"];
        } else if (typeof options.token === 'function') {
            try {
                const result = options.token();
                if (result instanceof Promise) {
                    result.then(setAuth).catch(err => console.warn("[doptime] Async token failed:", err));
                } else {
                    setAuth(result);
                }
            } catch (err) {
                console.warn("[doptime] Token function failed:", err);
            }
        } else {
            setAuth(options.token);
        }
    }

    if (options.sutoken !== undefined) {
        if (!options.sutoken) delete Opt.params["su"];
        else Opt.params["su"] = options.sutoken;
    }
    if (options.primaryErrorHandler !== undefined) {
        Opt.primaryErrorHandler = options.primaryErrorHandler;
    }
    if (options.allowThrowError !== undefined) {
        Opt.throwSecondaryPromiseError = options.allowThrowError;
    }
    return this;
}
