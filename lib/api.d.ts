import OptionClass from "./Option";
export default function api(serviceName: string, opt?: OptionClass): (data?: any, opt?: OptionClass) => Promise<import("axios").AxiosResponse<any, any>>;
