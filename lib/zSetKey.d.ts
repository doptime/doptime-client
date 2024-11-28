import RequestOptions from "./Option";
export default class zSetKey<T> {
    key: string;
    dataSchemaInstace: T | null;
    private dataSchema;
    constructor(key: string, dataSchemaInstace?: T | null);
    ConcatKey(...fields: any[]): zSetKey<T>;
    zRange: (Start: number, Stop: number, WITHSCORES?: boolean, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    zRevRange: (Start: number, Stop: number, WITHSCORES: boolean, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    zRank: (Member: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    zScore: (Member: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    zRangeByScore: (Min: number | string, Max: number | string, WITHSCORES: boolean, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    zRevRangeByScore: (Min: number | string, Max: number | string, WITHSCORES?: boolean, Offset?: Number, Count?: Number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    zAdd: (Score: number, Member: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    zRem: (Member: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    zRemRangeByScore: (Min: number, Max: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    zCount: (Min: number, Max: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    zCard: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    zScan: (Cursor: number, Match: string, Count?: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    zIncrBy: (Increment: number, Member: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
}
