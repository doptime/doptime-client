import Req from "./http"
import RequestOptions, { Option } from "./Option"
import { checkSchema, dataObjectToSchema } from "./dataschema"

export default class listKey extends Key {
    private dataSchema: any = null
    constructor(public key: string, public dataSchemaInstace: any = null) {
        super(key)
        if (!!this.dataSchemaInstace) this.dataSchema = dataObjectToSchema(this.dataSchemaInstace)
    }
    public lIndex = (Index: number, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/LINDEX-${this.getkey()}?Index=${Index}`)
    public lPop = (opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/LPOP-${this.getkey()}`)
    public lPush = (Value: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema && !checkSchema(this.dataSchema, Value)) return Promise.reject("data not match shema of listKey:" + this.key)
        return Req(opt).post(`${opt.baseUrl}/LPUSH-${this.getkey()}`, Value)
    }

    public lRem = (Count: number, Value: any, opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/LREM-${this.getkey()}?Count=${Count}`, Value)
    public lSet = (Index: number, Value: any, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/LSET-${this.getkey()}?Index=${Index}`, Value)
    public lTrim = (Start: number, Stop: number, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/LTRIM-${this.getkey()}?Start=${Start}&Stop=${Stop}`)
    public rPop = (opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/RPOP-${this.getkey()}`)
    public rPush = (Value: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema && !checkSchema(this.dataSchema, Value)) return Promise.reject("data not match shema of listKey:" + this.key)
        return Req(opt).post(`${opt.baseUrl}/RPUSH-${this.getkey()}`, Value)
    }
    public rPushX = (Value: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema && !checkSchema(this.dataSchema, Value)) return Promise.reject("data not match shema of listKey:" + this.key)
        return Req(opt).post(`${opt.baseUrl}/RPUSHX-${this.getkey()}`, Value)
    }

    public lLen = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/LLEN-${this.getkey()}`)

    public lRange = (Start: number, Stop: number, opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/LRANGE-${this.getkey()}?Start=${Start}&Stop=${Stop}`)

}