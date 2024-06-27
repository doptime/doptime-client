import { checkSchema, dataObjectToSchema } from "./dataschema"
import Req from "./http"
import RequestOptions, { Option } from "./Option"

export default class hashKey extends Key {
    private dataSchema: any = null
    constructor(public key: string, public dataSchemaInstace: any = null) {
        super(key)
        if (!!this.dataSchemaInstace) this.dataSchema = dataObjectToSchema(this.dataSchemaInstace)
    }


    public hExists = (Field: string = "", opt: RequestOptions = Option) => {
        return Req(opt).get(`${opt.baseUrl}/HEXISTS-${this.getkey()}?f=${encodeURIComponent(Field)}`)
    }

    public hSet = (Field: string = "", data: any, opt: RequestOptions = Option) => {
        if (!!this.dataSchema && !checkSchema(this.dataSchema, data)) return Promise.reject("data not match shema of hashKey:" + this.key)
        Req(opt).put(`${opt.baseUrl}/HSET-${this.getkey()}?f=${encodeURIComponent(Field)}`, data)
    }

    public hGet = (Field: string = "", opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HGET-${this.getkey()}?f=${encodeURIComponent(Field)}`)

    public hDel = async (Field: string = "", opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/HDEL-${this.getkey()}?f=${encodeURIComponent(Field)}`)

    public hGetAll = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HGETALL-${this.getkey()}`)

    public hVals = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HVALS-${this.getkey()}`)

    public hKeys = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HKEYS-${this.getkey()}`)

    public hRandField = (Count: number, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HRANDFIELD-${this.getkey()}?Count=${Count}`)

    public hMGet = (Fields: any[] = [], opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HMGET-${this.getkey()}?f=${encodeURIComponent(Fields.join(","))}`)


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

        Req(opt).put(`${opt.baseUrl}/HMSET-${this.getkey()}`, data)
    }

    public hIncrBy = (Key: string, Field: string, Increment: number, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/HINCRBY-${this.getkey()}?Field=${Field}&Increment=${Increment}`)
    public hIncrByFloat = (Key: string, Field: string, Increment: number, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/HINCRBYFLOAT-${this.getkey()}?Field=${Field}&Increment=${Increment}`)
    public hScan = (Key: string, Cursor: number, Match: string, Count = 4096, opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/HSCAN-${this.getkey()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)
    public hLen = (Key: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HLEN-${this.getkey()}`)

}