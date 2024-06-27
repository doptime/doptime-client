import RequestOptions from "./Option";
export default class listKey extends Key {
    key: string;
    dataSchemaInstace: any;
    private dataSchema;
    constructor(key: string, dataSchemaInstace?: any);
    lIndex: (Index: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    lPop: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    lPush: (Value: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    lRem: (Count: number, Value: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    lSet: (Index: number, Value: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    lTrim: (Start: number, Stop: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    rPop: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    rPush: (Value: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    rPushX: (Value: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    lLen: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    lRange: (Start: number, Stop: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
}
