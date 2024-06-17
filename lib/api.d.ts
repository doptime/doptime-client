import OptionClass from "./Option";
export default function newApi(serviceName: string, option?: OptionClass): (data?: any, opt?: OptionClass) => Promise<any>;
