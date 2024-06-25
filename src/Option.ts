
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

    public setUrlbase = (urlbase: string) => {
        var ret = this.updateOptions();
        ret.baseUrl = urlbase;
        return ret;
    }

    public addParam = (name: string, value: string) => this.updateOptions({ params: { [name]: value } });

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

    public setHeader = (key: string, value: string) => this.updateOptions({ headers: { [key]: value } });

    // Set global options
    public setDefaults = (options: { urlBase?: string, JWT?: string, primaryErrorHandler?: Function, sutoken?: string, allowThrowError?: boolean } = {}) => {
        if (options.urlBase !== undefined) {
            this.updateOptions({ baseUrl: options.urlBase });
        }
        if (options.JWT !== undefined) {
            const authorizationHeader = options.JWT.startsWith("Bearer ") ? options.JWT : `Bearer ${options.JWT}`;
            this.updateOptions({ headers: { Authorization: authorizationHeader } });
        }
        if (options.sutoken !== undefined) {
            this.updateOptions({ params: { su: options.sutoken } });
        }
        if (options.primaryErrorHandler !== undefined) {
            this.primaryErrorHandler = options.primaryErrorHandler;
        }
        if (options.allowThrowError !== undefined) {
            this.updateOptions({ throwSecondaryPromiseError: options.allowThrowError });
        }
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

    public allowThrowError = (allowed: boolean) => this.updateOptions({ throwSecondaryPromiseError: allowed });

    constructor() { }
}
export const Option = new RequestOptions();
