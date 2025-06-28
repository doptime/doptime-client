import RequestOptions from "./Option";
export default function createApi<TIn, TOut>(serviceName: string, options?: RequestOptions): (data?: TIn, opt?: RequestOptions) => Promise<TOut>;
