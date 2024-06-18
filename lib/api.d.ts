import RequestOptions from "./Option";
export default function newApi(serviceName: string, paramSchemaInstace?: any, option?: RequestOptions): (data?: any, opt?: RequestOptions) => Promise<any>;
