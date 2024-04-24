declare class OptionClass {
    UrlItems: {
        [key: string]: string;
    };
    Header: {
        [key: string]: string;
    };
    ThrowPromiseError: boolean;
    Urlbase: string;
    private optionObject;
    withUrlField: (key: string, value: string) => OptionClass;
    rspTypeJson: () => OptionClass;
    rspTypeJpeg: () => OptionClass;
    rspTypeOgg: () => OptionClass;
    rspTypeMpeg: () => OptionClass;
    rspTypeMp4: () => OptionClass;
    rspTypeText: () => OptionClass;
    rspTypeStream: () => OptionClass;
    rspTypeAny: (anyType: string) => OptionClass;
    withDataSource: (dataSourceName: string) => OptionClass;
    withUrlbase: (urlbase: string) => OptionClass;
    ThrowSecondaryPromiseError: (allowed: boolean) => OptionClass;
    paramString: () => string;
    constructor();
}
export declare const Option: OptionClass;
export declare const setDefaultSUToken: (sutoken: string) => void;
export declare const configure: (UrlBase?: string, JWT?: string, PrimaryErrorHandler?: Function) => void;
export default configure;
export declare enum urlGetCmd {
    HEXISTS = "HEXISTS",
    GET = "GET",
    HGET = "HGET",
    HGETALL = "HGETALL",
    HMGET = "HMGET"
}
export declare const urlGet: (cmd: urlGetCmd | undefined, Key: string, Field?: string, opt?: OptionClass) => string;
export declare const time: (opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const hExists: (Key: string, Field?: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const hset: (Key: string, Field: string | undefined, data: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const get: (Key: string, Field?: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const hGet: (Key: string, Field?: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const hDel: (Key: string, Field?: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const hGetAll: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const hVals: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const hKeys: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const hRandField: (Key: string, Count: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const hMGet: (Key: string, Fields?: any[], opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const zRange: (Key: string, Start: number, Stop: number, WITHSCORES?: boolean, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const zRevRange: (Key: string, Start: number, Stop: number, WITHSCORES: boolean, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const zRank: (Key: string, Member: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const zScore: (Key: string, Member: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const zRangeByScore: (Key: string, Min: number | string, Max: number | string, WITHSCORES: boolean, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const zRevRangeByScore: (Key: string, Min: number | string, Max: number | string, WITHSCORES?: boolean, Offset?: Number, Count?: Number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const zAdd: (Key: string, Score: number, Member: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const zRem: (Key: string, Member: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const zRemRangeByScore: (Key: string, Min: number, Max: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const zCount: (Key: string, Min: number, Max: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const zCard: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const sIsMember: (Key: string, Member: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const scan: (Cursor: number, Match: string, Count?: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const lRange: (Key: string, Start: number, Stop: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const lLen: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const lIndex: (Key: string, Index: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const lPop: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const lPush: (Key: string, Value: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const lRem: (Key: string, Count: number, Value: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const lSet: (Key: string, Index: number, Value: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const lTrim: (Key: string, Start: number, Stop: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const rPop: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const rPush: (Key: string, Value: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const rPushX: (Key: string, Value: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const type: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const del: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const exists: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const expire: (Key: string, Seconds: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const expireAt: (Key: string, Timestamp: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const persist: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const ttl: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const pttl: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const keys: (Pattern: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const rename: (Key: string, NewKey: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const renamenx: (Key: string, NewKey: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const sScan: (Key: string, Cursor: number, Match: string, Count?: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const hScan: (Key: string, Cursor: number, Match: string, Count?: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const zScan: (Key: string, Cursor: number, Match: string, Count?: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const zIncrBy: (Key: string, Increment: number, Member: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const hIncrBy: (Key: string, Field: string, Increment: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const hIncrByFloat: (Key: string, Field: string, Increment: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const api: (serviceName: string, data?: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
