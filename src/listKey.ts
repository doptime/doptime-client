import Req from "./http"
import RequestOptions, { Option } from "./Option"
import { checkSchema, dataObjectToSchema } from "./dataschema"


export default class listKey  {
    private dataSchema: any = null
    constructor(public key: string, public dataSchemaInstace: any = null) {
        if (!!this.dataSchemaInstace) this.dataSchema = dataObjectToSchema(this.dataSchemaInstace)
    }

    public ConcatKey(...fields: any[]): listKey {
        const newKey = [this.key, ...fields].filter((v) => !!v).join(":")
        const _key = new listKey(newKey);
        _key.dataSchema = this.dataSchema;
        return _key;
    }

    public lIndex = (Index: number, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/LINDEX-${this.key}?Index=${Index}`)
    public lPop = (opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/LPOP-${this.key}`)
    public lPush = (data: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema) {
            var errors = checkSchema(this.dataSchema, data)
            if (errors.length > 0) {
                return Promise.reject("shema unmatch of listkey: " + this.key + " " + JSON.stringify(errors))
            }
        }

        return Req(opt).post(`${opt.baseUrl}/LPUSH-${this.key}`, data)
    }

    public lRem = (Count: number, data: any, opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/LREM-${this.key}?Count=${Count}`, data)
    public lSet = (Index: number, data: any, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/LSET-${this.key}?Index=${Index}`, data)
    public lTrim = (Start: number, Stop: number, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/LTRIM-${this.key}?Start=${Start}&Stop=${Stop}`)
    public rPop = (opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/RPOP-${this.key}`)
    public rPush = (data: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema) {
            var errors = checkSchema(this.dataSchema, data)
            if (errors.length > 0) {
                return Promise.reject("shema unmatch of listkey: " + this.key + " " + JSON.stringify(errors))
            }
        }
        return Req(opt).post(`${opt.baseUrl}/RPUSH-${this.key}`, data)
    }
    public rPushX = (data: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema) {
            var errors = checkSchema(this.dataSchema, data)
            if (errors.length > 0) {
                return Promise.reject("shema unmatch of listkey: " + this.key + " " + JSON.stringify(errors))
            }
        }
        return Req(opt).post(`${opt.baseUrl}/RPUSHX-${this.key}`, data)
    }

    public lLen = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/LLEN-${this.key}`)

    public lRange = (Start: number, Stop: number, opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/LRANGE-${this.key}?Start=${Start}&Stop=${Stop}`)

}