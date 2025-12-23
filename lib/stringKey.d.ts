import RequestOptions from "./config";
export default class stringKey<T> {
    key: string;
    dataSchemaInstace: T | null;
    constructor(key: string, dataSchemaInstace?: T | null);
    ConcatKey(...fields: any[]): stringKey<T>;
    get: (Field?: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    set: (Field: string | undefined, data: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
}
