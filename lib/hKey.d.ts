import OptionClass from "./Option";
export declare class hKey {
    key: string;
    urlbase: string;
    constructor(key: string, urlbase?: string);
    hExists: (Field?: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    hset: (Field: string | undefined, data: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    hGet: (Field?: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    hDel: (Field?: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    hGetAll: (opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    hVals: (opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    hKeys: (opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    hRandField: (Count: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    hMGet: (Fields?: any[], opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
}
