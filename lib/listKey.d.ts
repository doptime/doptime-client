import OptionClass from "./Option";
export default class listKey {
    key: string;
    constructor(key: string);
    lIndex: (Key: string, Index: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    lPop: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    lPush: (Key: string, Value: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    lRem: (Key: string, Count: number, Value: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    lSet: (Key: string, Index: number, Value: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    lTrim: (Key: string, Start: number, Stop: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    rPop: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    rPush: (Key: string, Value: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    rPushX: (Key: string, Value: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    lLen: (Key: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
    lRange: (Key: string, Start: number, Stop: number, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
}
