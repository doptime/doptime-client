import Req from "./http"
import OptionClass, { Option } from "./Option"

export default function newApi(serviceName: string, option: OptionClass = Option) {
    //ensure service name  is standardized
    //strip prefix "api:" if it exists
    if (serviceName.toLowerCase().startsWith("api:")) {
        serviceName = serviceName.slice(4)
    }
    //first character of Service should be lower case
    if (serviceName.length > 0) {
        serviceName = serviceName[0].toLowerCase() + serviceName.slice(1)
    }
    //error if service name is empty
    if (serviceName.length === 0) {
        console.error("API service name is empty, which is not allowed")
        //throw new Error("API service name is empty, which is not allowed")
        throw new Error("API service name is empty, which is not allowed")
    }
    return function (data: any = {}, opt: OptionClass = option): Promise<any> {
        return Req(opt).post(`${opt.Urlbase}/API-!${serviceName}${opt.paramString()}`, data)
    }
}
