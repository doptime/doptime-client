import RequestOptions from "./Option";
export default function newApi(serviceName: string, paramIn?: any, paramOut?: any, option?: RequestOptions): (data?: any, opt?: RequestOptions) => Promise<any>;
