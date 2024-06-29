import Req from "./http"
import RequestOptions, { Option } from "./Option"


export default class hashKey {
    constructor(public key: string, public dataSchemaInstace: any = null) {
    }

    public ConcatKey(...fields: any[]): hashKey {
        const newKey = [this.key, ...fields].filter((v) => !!v).join(":")
        return new hashKey(newKey, this.dataSchemaInstace);
    }

    public hExists = (Field: string = "", opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HEXISTS-${this.key}?f=${encodeURIComponent(Field)}`)


    public hSet = (Field: string = "", data: any, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/HSET-${this.key}?f=${encodeURIComponent(Field)}`, data)

    public hGet = (Field: string = "", opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HGET-${this.key}?f=${encodeURIComponent(Field)}`)

    public hDel = async (Field: string = "", opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/HDEL-${this.key}?f=${encodeURIComponent(Field)}`)

    public hGetAll = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HGETALL-${this.key}`)

    public hVals = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HVALS-${this.key}`)

    public hKeys = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HKEYS-${this.key}`)

    public hRandField = (Count: number, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HRANDFIELD-${this.key}?Count=${Count}`)

    public hMGet = (Fields: any[] = [], opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HMGET-${this.key}?f=${encodeURIComponent(Fields.join(","))}`)


    /**
     * Sets multiple fields in a hash.
     * Each value is checked against the schema if it is set.
     *
     * @param {Object} data - An object where each key is a field and each value is the value of the field.
     * @param {RequestOptions} [opt=Option] - Optional request options.
     * @returns {Promise} - Resolves if the operation is successful, rejects if the data does not match the schema.
     */
    public hMSet = (data: any, opt: RequestOptions = Option) => {
        Req(opt).put(`${opt.baseUrl}/HMSET-${this.key}`, data)
    }

    public hIncrBy = (Field: string, Increment: number, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/HINCRBY-${this.key}?Field=${Field}&Increment=${Increment}`)
    public hIncrByFloat = (Field: string, Increment: number, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/HINCRBYFLOAT-${this.key}?Field=${Field}&Increment=${Increment}`)
    public hScan = (Cursor: number, Match: string, Count = 4096, NOVALUES: boolean = false, opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/HSCAN-${this.key}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}&NOVALUES=${NOVALUES}`)
    public hLen = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/HLEN-${this.key}`)

}