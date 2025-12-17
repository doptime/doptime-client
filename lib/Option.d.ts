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
    WithUrlbase: (urlbase: string) => RequestOptions;
    WithParam: (name: string, value: string) => RequestOptions;
    WithDataSource: (dataSourceName: string) => RequestOptions;
    WithResponseAs: (type: string) => RequestOptions;
    WithResponseAsJson: () => RequestOptions;
    WithResponseAsJpeg: () => RequestOptions;
    WithResponseAsOgg: () => RequestOptions;
    WithResponseAsMpeg: () => RequestOptions;
    WithResponseAsMp4: () => RequestOptions;
    WithResponseAsText: () => RequestOptions;
    WithResponseAsStream: () => RequestOptions;
    WithResponseAsMsgpack: () => RequestOptions;
    WithHeader: (key: string, value: string) => RequestOptions;
    private updateOptions;
    WithThrowErrorEnabled: (enabled: boolean) => RequestOptions;
    constructor();
}
export declare const Opt: RequestOptions;
export declare const configure: (options?: {
    urlBase?: string;
    token?: string;
    primaryErrorHandler?: Function;
    sutoken?: string;
    allowThrowError?: boolean;
}) => undefined;
