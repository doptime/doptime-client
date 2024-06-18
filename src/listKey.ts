import Req from "./http"
import RequestOptions, { Option } from "./Option"
import { checkSchema, dataObjectToSchema } from "./dataschema"

export default class listKey {
    private dataSchema: any = null
    constructor(public key: string, public dataSchemaInstace: any = null) {
        if (!!this.dataSchemaInstace) this.dataSchema = dataObjectToSchema(this.dataSchemaInstace)
    }
    public lIndex = (Index: number, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/LINDEX-!${this.key}${opt.paramString()}?Index=${Index}`)
    public lPop = (opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/LPOP-!${this.key}${opt.paramString()}`)
    public lPush = (Value: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema && !checkSchema(this.dataSchema, Value)) return Promise.reject("data not match shema")
        return Req(opt).post(`${opt.baseUrl} /LPUSH-!${this.key}${opt.paramString()}`, Value)
    }

    public lRem = (Count: number, Value: any, opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/LREM-!${this.key}${opt.paramString()}?Count=${Count}`, Value)
    public lSet = (Index: number, Value: any, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/LSET-!${this.key}${opt.paramString()}?Index=${Index}`, Value)
    public lTrim = (Start: number, Stop: number, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/LTRIM-!${this.key}${opt.paramString()}?Start=${Start}&Stop=${Stop}`)
    public rPop = (opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/RPOP-!${this.key}${opt.paramString()}`)
    public rPush = (Value: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema && !checkSchema(this.dataSchema, Value)) return Promise.reject("data not match shema")
        return Req(opt).post(`${opt.baseUrl}/RPUSH-!${this.key}${opt.paramString()}`, Value)
    }
    public rPushX = (Value: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema && !checkSchema(this.dataSchema, Value)) return Promise.reject("data not match shema")
        return Req(opt).post(`${opt.baseUrl}/RPUSHX-!${this.key}${opt.paramString()}`, Value)
    }

    public lLen = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/LLEN-!${this.key}${opt.paramString()}`)

    public lRange = (Start: number, Stop: number, opt: RequestOptions = Option.responseTypeMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/LRANGE-!${this.key}${opt.paramString()}?Start=${Start}&Stop=${Stop}`)

}