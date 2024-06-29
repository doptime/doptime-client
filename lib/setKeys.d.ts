import RequestOptions from "./Option";
export default class setKey {
    key: string;
    dataSchemaInstace: any;
    constructor(key: string, dataSchemaInstace?: any);
    ConcatKey(...fields: any[]): setKey;
    sIsMember: (Member: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    sScan: (Cursor: number, Match: string, Count?: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    sCard: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
}
