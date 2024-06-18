import OptionClass from "./Option";
export default function newApi(serviceName: string, paramSchemaInstace?: any, option?: OptionClass): (data?: any, opt?: OptionClass) => Promise<any>;
