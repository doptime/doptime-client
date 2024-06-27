import RequestOptions from "./Option";
import keyClass from "./key";
export default class stringKey extends keyClass {
    key: string;
    dataSchemaInstace: any;
    private dataSchema;
    constructor(key: string, dataSchemaInstace?: any);
    get: (Field?: string, opt?: RequestOptions) => Promise<import("axios").AxiosResponse<any, any>>;
    set: (Field: string | undefined, data: any, opt?: RequestOptions) => Promise<never> | undefined;
}
