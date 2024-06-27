import RequestOptions from "./Option";
import keyClass from "./key";
export default class listKey extends keyClass {
    key: string;
    dataSchemaInstace: any;
    private dataSchema;
    constructor(key: string, dataSchemaInstace?: any);
    lIndex: (Index: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    lPop: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    lPush: (data: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    lRem: (Count: number, data: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    lSet: (Index: number, data: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    lTrim: (Start: number, Stop: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    rPop: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    rPush: (data: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    rPushX: (data: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    lLen: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    lRange: (Start: number, Stop: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
}
