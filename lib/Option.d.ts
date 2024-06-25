export default class RequestOptions {
    baseUrl: string;
    setUrlbase: (urlbase: string) => RequestOptions;
    params: {
        [key: string]: string;
    };
    setParam: (name: string, value: string) => RequestOptions;
    setDataSource: (dataSourceName: string) => RequestOptions;
    responseAs: (type: string) => RequestOptions;
    responseAsJson: () => RequestOptions;
    responseAsJpeg: () => RequestOptions;
    responseAsOgg: () => RequestOptions;
    responseAsMpeg: () => RequestOptions;
    responseAsMp4: () => RequestOptions;
    responseAsText: () => RequestOptions;
    responseAsStream: () => RequestOptions;
    responseAsMsgpack: () => RequestOptions;
    headers: {
        [key: string]: string;
    };
    setHeader: (key: string, value: string) => RequestOptions;
    setDefaults: (urlBase?: string, JWT?: string, primaryErrorHandler?: Function) => this;
    setDefaultSUToken: (sutoken: string) => this;
    setDefaultBaseUrl: (urlBase: string) => RequestOptions;
    setDefaultJWT: (JWT: string) => this;
    primaryErrorHandler: Function;
    defaultPrimaryErrorHandler: (primaryErrorHandler: Function) => this;
    private updateOptions;
    throwSecondaryPromiseError: boolean;
    allowThrowError: (allowed: boolean) => RequestOptions;
    constructor();
}
export declare const Option: RequestOptions;
