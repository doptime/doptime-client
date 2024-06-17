import OptionClass from "./Option";
export default class streamKey {
    key: string;
    constructor(key: string);
    xAdd: (Key: string, ID: string | undefined, Data: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    xDel: (Key: string, ID: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    xLen: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    xRange: (Key: string, Start?: string, Stop?: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    xRangeN: (Key: string, Start?: string, Stop?: string, Count?: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    xRevRange: (Key: string, Start?: string, Stop?: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    xRevRangeN: (Key: string, Start?: string, Stop?: string, Count?: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    xRead: (Key: string, Count?: number, Block?: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
}
