import Req from "./http"
import RequestOptions, { Option } from "./Option"
import { checkSchema, dataObjectToSchema } from "./dataschema"
import keyClass from "./key"

export default class listKey extends keyClass {
    private dataSchema: any = null
    constructor(public key: string, public dataSchemaInstace: any = null) {
        super(key)
        if (!!this.dataSchemaInstace) this.dataSchema = dataObjectToSchema(this.dataSchemaInstace)
    }
    public lIndex = (Index: number, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/LINDEX-${this.getkey()}?Index=${Index}`)
    public lPop = (opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/LPOP-${this.getkey()}`)
    public lPush = (data: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema) {
            var errors = checkSchema(this.dataSchema, data)
            if (errors.length > 0) {
                return Promise.reject("shema unmatch of listkey: " + this.key + " " + JSON.stringify(errors))
            }
        }

        return Req(opt).post(`${opt.baseUrl}/LPUSH-${this.getkey()}`, data)
    }

    public lRem = (Count: number, data: any, opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/LREM-${this.getkey()}?Count=${Count}`, data)
    public lSet = (Index: number, data: any, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/LSET-${this.getkey()}?Index=${Index}`, data)
    public lTrim = (Start: number, Stop: number, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/LTRIM-${this.getkey()}?Start=${Start}&Stop=${Stop}`)
    public rPop = (opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/RPOP-${this.getkey()}`)
    public rPush = (data: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema) {
            var errors = checkSchema(this.dataSchema, data)
            if (errors.length > 0) {
                return Promise.reject("shema unmatch of listkey: " + this.key + " " + JSON.stringify(errors))
            }
        }
        return Req(opt).post(`${opt.baseUrl}/RPUSH-${this.getkey()}`, data)
    }
    public rPushX = (data: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema) {
            var errors = checkSchema(this.dataSchema, data)
            if (errors.length > 0) {
                return Promise.reject("shema unmatch of listkey: " + this.key + " " + JSON.stringify(errors))
            }
        }
        return Req(opt).post(`${opt.baseUrl}/RPUSHX-${this.getkey()}`, data)
    }

    public lLen = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/LLEN-${this.getkey()}`)

    public lRange = (Start: number, Stop: number, opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/LRANGE-${this.getkey()}?Start=${Start}&Stop=${Stop}`)

}