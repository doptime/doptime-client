export default class RequestOptions {
    baseUrl: string;
    params: {
        [key: string]: string;
    };
    headers: {
        [key: string]: string;
    };
    primaryErrorHandler: Function;
    throwSecondaryPromiseError: boolean;
    setUrlbase: (urlbase: string) => RequestOptions;
    addParam: (name: string, value: string) => RequestOptions;
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
    setHeader: (key: string, value: string) => RequestOptions;
    setDefaults: (options?: {
        urlBase?: string;
        JWT?: string;
        primaryErrorHandler?: Function;
        sutoken?: string;
        allowThrowError?: boolean;
    }) => this;
    private updateOptions;
    allowThrowError: (allowed: boolean) => RequestOptions;
    constructor();
}
export declare const Option: RequestOptions;
