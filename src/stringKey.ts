import { checkSchema, dataObjectToSchema } from "./dataschema"
import Req from "./http"
import RequestOptions, { Option } from "./Option"
import keyClass from "./key"

export default class stringKey extends keyClass {
    private dataSchema: any = null
    constructor(public key: string, public dataSchemaInstace: any = null) {
        super(key)
        if (!!this.dataSchemaInstace) this.dataSchema = dataObjectToSchema(this.dataSchemaInstace)
    }
    public get = (Field: string = "", opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/GET-${this.getkey()}?f=${encodeURIComponent(Field)}`)

    public set = (Field: string = "", data: any, opt: RequestOptions = Option) => {
            if (!!this.dataSchema) {
                var errors = checkSchema(this.dataSchema, data)
                if (errors.length > 0) {
                    return Promise.reject("shema unmatch of stringkey: " + this.key + " " + JSON.stringify(errors))
                }
            }
        Req(opt).put(`${opt.baseUrl}/SET-${this.getkey()}?f=${encodeURIComponent(Field)}`, data)
    }

}