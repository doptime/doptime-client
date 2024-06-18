import RequestOptions from "./Option";
export default class hashKey {
    key: string;
    dataSchemaInstace: any;
    private dataSchema;
    constructor(key: string, dataSchemaInstace?: any);
    hExists: (Field?: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hset: (Field: string | undefined, data: any, opt?: RequestOptions) => Promise<never> | undefined;
    hGet: (Field?: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hDel: (Field?: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hGetAll: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hVals: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hKeys: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hRandField: (Count: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hMGet: (Fields?: any[], opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hIncrBy: (Key: string, Field: string, Increment: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hIncrByFloat: (Key: string, Field: string, Increment: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hScan: (Key: string, Cursor: number, Match: string, Count?: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hLen: (Key: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
}
