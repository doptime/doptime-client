export default class RequestOptions {
    urlParams: {
        [key: string]: string;
    };
    headers: {
        [key: string]: string;
    };
    withHeader: (key: string, value: string) => RequestOptions;
    primaryErrorHandler: Function;
    private copyOptionsFromDefault;
    withUrlParam: (key: string, value: string) => RequestOptions;
    responseTypeJson: () => RequestOptions;
    responseTypeJpeg: () => RequestOptions;
    responseTypeOgg: () => RequestOptions;
    responseTypeMpeg: () => RequestOptions;
    responseTypeMp4: () => RequestOptions;
    responseTypeText: () => RequestOptions;
    responseTypeStream: () => RequestOptions;
    responseTypeMsgpack: () => RequestOptions;
    responseTypeCustom: (customType: string) => RequestOptions;
    withDataSource: (dataSourceName: string) => RequestOptions;
    throwSecondaryPromiseError: boolean;
    setThrowSecondaryPromiseError: (allowed: boolean) => RequestOptions;
    baseUrl: string;
    withUrlbase: (urlbase: string) => RequestOptions;
    paramString: () => string;
    constructor();
}
export declare const Option: RequestOptions;
export declare const configure: (UrlBase?: string, JWT?: string, PrimaryErrorHandler?: Function) => void;
export declare const setDefaultSUToken: (sutoken: string) => void;
