import RequestOptions from "./config";
export default class setKey<T> {
    key: string;
    dataSchemaInstace: T | null;
    constructor(key: string, dataSchemaInstace?: T | null);
    ConcatKey(...fields: any[]): setKey<T>;
    sIsMember: (Member: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    sScan: (Cursor: number, Match: string, Count?: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    sCard: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
}
