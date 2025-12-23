import RequestOptions from "./config";
export default function createApi<TIn = any, TOut = any>(serviceName: string, options?: RequestOptions): (data?: TIn, opt?: RequestOptions) => Promise<TOut>;
