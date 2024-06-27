import { checkSchema, dataObjectToSchema } from "./dataschema"
import Req from "./http"
import RequestOptions, { Option } from "./Option"


export default class stringKey {
    private dataSchema: any = null
    constructor(public key: string, public dataSchemaInstace: any = null) {
        if (!!this.dataSchemaInstace) this.dataSchema = dataObjectToSchema(this.dataSchemaInstace)
    }

    public ConcatKey(...fields: any[]): stringKey {
        const newKey = [this.key, ...fields].filter((v) => !!v).join(":")
        const _key = new stringKey(newKey);
        _key.dataSchema = this.dataSchema;
        return _key;
    }

    public get = (Field: string = "", opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/GET-${this.key}?f=${encodeURIComponent(Field)}`)

    public set = (Field: string = "", data: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema) {
            var errors = checkSchema(this.dataSchema, data)
            if (errors.length > 0) {
                return Promise.reject("shema unmatch of stringkey: " + this.key + " " + JSON.stringify(errors))
            }
        }
        Req(opt).put(`${opt.baseUrl}/SET-${this.key}?f=${encodeURIComponent(Field)}`, data)
    }

}