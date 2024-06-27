import RequestOptions from "./Option";
import keyClass from "./key";
export default class setKey extends keyClass {
    key: string;
    constructor(key: string);
    sIsMember: (Key: string, Member: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    sScan: (Key: string, Cursor: number, Match: string, Count?: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    sCard: (Key: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
}
