import { checkSchema, dataObjectToSchema } from "./dataschema"
import Req from "./http"
import RequestOptions, { Option } from "./Option"

export default class stringKey extends Key {
    private dataSchema: any = null
    constructor(public key: string, public dataSchemaInstace: any = null) {
        super(key)
        if (!!this.dataSchemaInstace) this.dataSchema = dataObjectToSchema(this.dataSchemaInstace)
    }
    public get = (Field: string = "", opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/GET-${this.getkey()}?f=${encodeURIComponent(Field)}`)

    public set = (Field: string = "", data: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema && !checkSchema(this.dataSchema, data)) return Promise.reject("data not match shema of stringKey:" + this.key)
        Req(opt).put(`${opt.baseUrl}/SET-${this.getkey()}?f=${encodeURIComponent(Field)}`, data)
    }

}