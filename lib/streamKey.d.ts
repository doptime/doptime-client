import RequestOptions from "./Option";
import keyClass from "./key";
export default class streamKey extends keyClass {
    key: string;
    constructor(key: string);
    xAdd: (Key: string, ID: string | undefined, Data: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    xDel: (Key: string, ID: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    xLen: (Key: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    xRange: (Key: string, Start?: string, Stop?: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    xRangeN: (Key: string, Start?: string, Stop?: string, Count?: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    xRevRange: (Key: string, Start?: string, Stop?: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    xRevRangeN: (Key: string, Start?: string, Stop?: string, Count?: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    xRead: (Key: string, Count?: number, Block?: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
}
