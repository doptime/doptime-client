import RequestOptions from "./Option";
export default class hashKey {
    key: string;
    dataSchemaInstace: any;
    constructor(key: string, dataSchemaInstace?: any);
    ConcatKey(...fields: any[]): hashKey;
    hExists: (Field?: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hSet: (Field: string | undefined, data: any, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hGet: (Field?: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hDel: (Field?: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hGetAll: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hVals: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hKeys: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hRandField: (Count: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hMGet: (Fields?: any[], opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Sets multiple fields in a hash.
     * Each value is checked against the schema if it is set.
     *
     * @param {Object} data - An object where each key is a field and each value is the value of the field.
     * @param {RequestOptions} [opt=Option] - Optional request options.
     * @returns {Promise} - Resolves if the operation is successful, rejects if the data does not match the schema.
     */
    hMSet: (data: any, opt?: RequestOptions) => void;
    hIncrBy: (Field: string, Increment: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hIncrByFloat: (Field: string, Increment: number, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hScan: (Cursor: number, Match: string, Count?: number, NOVALUES?: boolean, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    hLen: (opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
}
