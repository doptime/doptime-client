import RequestOptions from "./Option";
export default function createApi<TIn = any, TOut = any>(serviceName: string, options?: RequestOptions): (data?: TIn, opt?: RequestOptions) => Promise<TOut>;
