import { checkSchema, dataObjectToSchema } from "./dataschema"
import Req from "./http"
import RequestOptions, { Option } from "./Option"

export default class hashKey {
    private dataSchema: any = null
    constructor(public key: string, public dataSchemaInstace: any = null) {
        if (!!this.dataSchemaInstace) this.dataSchema = dataObjectToSchema(this.dataSchemaInstace)
    }


    public hExists = (Field: string = "", opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HEXISTS-!${this.key}${opt.paramString()}?F=${encodeURIComponent(Field)}`)

    public hset = (Field: string = "", data: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema && !checkSchema(this.dataSchema, data)) return Promise.reject("data not match shema of hashKey:" + this.key)
        Req(opt).put(`${opt.baseUrl}/HSET-!${this.key}${opt.paramString()}?F=${encodeURIComponent(Field)}`, data)
    }

    public hGet = (Field: string = "", opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HGET-!${this.key}${opt.paramString()}?F=${encodeURIComponent(Field)}`)

    public hDel = async (Field: string = "", opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/HDEL-!${this.key}${opt.paramString()}?F=${Field}`)

    public hGetAll = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HGETALL-!${this.key}${opt.paramString()}`)

    public hVals = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HVALS-!${this.key}${opt.paramString()}`)

    public hKeys = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HKEYS-!${this.key}${opt.paramString()}`)

    public hRandField = (Count: number, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HRANDFIELD-!${this.key}${opt.paramString()}?Count=${Count}`)

    public hMGet = (Fields: any[] = [], opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HMGET-!${this.key}${opt.paramString()}?F=${encodeURIComponent(Fields.join(","))}`)


    /**
     * Sets multiple fields in a hash.
     * Each value is checked against the schema if it is set.
     *
     * @param {Object} data - An object where each key is a field and each value is the value of the field.
     * @param {RequestOptions} [opt=Option] - Optional request options.
     * @returns {Promise} - Resolves if the operation is successful, rejects if the data does not match the schema.
     */
    public hMSet = (data: any, opt: RequestOptions = Option) => {
        //data is an object, each key is a field, each value is the value of the field
        //each value should check schema if schema is set
        if (!!this.dataSchema) for (var key in data) {
            if (!checkSchema(this.dataSchema, data[key])) return Promise.reject("data not match shema of hashKey:" + this.key)
        }

        Req(opt).put(`${opt.baseUrl}/HMSET-!${this.key}${opt.paramString()}`, data)
    }

    public hIncrBy = (Key: string, Field: string, Increment: number, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/HINCRBY-!${this.key}${opt.paramString()}?Field=${Field}&Increment=${Increment}`)
    public hIncrByFloat = (Key: string, Field: string, Increment: number, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/HINCRBYFLOAT-!${this.key}${opt.paramString()}?Field=${Field}&Increment=${Increment}`)
    public hScan = (Key: string, Cursor: number, Match: string, Count = 4096, opt: RequestOptions = Option.responseTypeMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/HSCAN-!${this.key}${opt.paramString()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)
    public hLen = (Key: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HLEN-!${this.key}${opt.paramString()}`)

}