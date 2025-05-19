import Req from "./http"
import RequestOptions, { Opt } from "./Option"
export default function newApi(serviceName: string, param: { in?: any, out?: any }, option: RequestOptions = Opt) {
    //error if service name is empty
    if (serviceName.length === 0) {
        console.error("API service name is empty, which is not allowed")
        //throw new Error("API service name is empty, which is not allowed")
        throw new Error("API service name is empty, which is not allowed")
    }
    return function (data: any = {}, opt: RequestOptions = option): Promise<any> {
        return Req(opt).post(`${opt.baseUrl}/${serviceName}`, data)
    }
}
