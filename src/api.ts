

import Req from "./http";
import RequestOptions, { Opt } from "./Option";

export default function createApi<TIn = any, TOut = any>(serviceName: string, options: RequestOptions = Opt) {
    if (!serviceName) {
        throw new Error("API service name cannot be empty");
    }

    // 注意：data 的默认值 {} as TIn 在 TIn 为 any 时也是安全的
    return (data: TIn = {} as TIn, opt: RequestOptions = options): Promise<TOut> =>
        Req(opt).post(`${opt.baseUrl}/${serviceName}`, data);
}