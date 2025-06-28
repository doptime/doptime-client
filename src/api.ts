

import Req from "./http";
import RequestOptions, { Opt } from "./Option";

export default function createApi<TIn, TOut>(serviceName: string, options: RequestOptions = Opt) {
    if (!serviceName) {
        throw new Error("API service name cannot be empty");
    }

    return (data: TIn = {} as TIn, opt: RequestOptions = options): Promise<TOut> =>
        Req(opt).post(`${opt.baseUrl}/${serviceName}`, data);
}