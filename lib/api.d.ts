import RequestOptions from "./Option";
export default function newApi(serviceName: string, param: {
    in?: any;
    out?: any;
}, option?: RequestOptions): (data?: any, opt?: RequestOptions) => Promise<any>;
