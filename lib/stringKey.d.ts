import OptionClass from "./Option";
export default class stringKey {
    key: string;
    constructor(key: string);
    get: (Field?: string, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
}
