import RequestOptions from "./Option";
export default class stringKey {
    key: string;
    dataSchemaInstace: any;
    constructor(key: string, dataSchemaInstace?: any);
    ConcatKey(...fields: any[]): stringKey;
    get: (Field?: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    set: (Field: string | undefined, data: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
}
