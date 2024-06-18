import Req from "./http"
import OptionClass, { Option } from "./Option"

export default class hashKey {
    constructor(public key: string, public shemaToCheck: any = null) {
        //if shema is not null, for each field in shema, convert it's value to the type 
        if (typeof shemaToCheck == "object") for (let field in this.shemaToCheck) {
            let v = this.shemaToCheck[field]
            this.shemaToCheck[field] = typeof v
        }
        else this.shemaToCheck = typeof shemaToCheck
    }
    private checkShema = (data: any) => {
        if (this.shemaToCheck == null) return true
        var typeofdata = typeof data
        //single value shema
        if (typeofdata != "object" && typeofdata == this.shemaToCheck) return true
        //case of object shema
        for (let field in this.shemaToCheck) {
            let v = this.shemaToCheck[field]
            if (typeof data[field] != v) return false
        }
        return true
    }


    public hExists = (Field: string = "", opt: OptionClass = Option) =>
        Req(opt).get(`${opt.urlbase}/HEXISTS-!${this.key}${opt.paramString()}?F=${encodeURIComponent(Field)}`)

    public hset = (Field: string = "", data: any, opt: OptionClass = Option) => {
        if (!this.checkShema(data)) return Promise.reject("data not match shema")
        Req(opt).put(`${opt.urlbase}/HSET-!${this.key}${opt.paramString()}?F=${encodeURIComponent(Field)}`, data)
    }

    public hGet = (Field: string = "", opt: OptionClass = Option) =>
        Req(opt).get(`${opt.urlbase}/HGET-!${this.key}${opt.paramString()}?F=${encodeURIComponent(Field)}`)

    public hDel = async (Field: string = "", opt: OptionClass = Option) =>
        Req(opt).delete(`${opt.urlbase}/HDEL-!${this.key}${opt.paramString()}?F=${Field}`)

    public hGetAll = (opt: OptionClass = Option) =>
        Req(opt).get(`${opt.urlbase}/HGETALL-!${this.key}${opt.paramString()}`)

    public hVals = (opt: OptionClass = Option) =>
        Req(opt).get(`${opt.urlbase}/HVALS-!${this.key}${opt.paramString()}`)

    public hKeys = (opt: OptionClass = Option) =>
        Req(opt).get(`${opt.urlbase}/HKEYS-!${this.key}${opt.paramString()}`)

    public hRandField = (Count: number, opt: OptionClass = Option) =>
        Req(opt).get(`${opt.urlbase}/HRANDFIELD-!${this.key}${opt.paramString()}?Count=${Count}`)

    public hMGet = (Fields: any[] = [], opt: OptionClass = Option) =>
        Req(opt).get(`${opt.urlbase}/HMGET-!${this.key}${opt.paramString()}?F=${encodeURIComponent(Fields.join(","))}`)

    public hIncrBy = (Key: string, Field: string, Increment: number, opt: OptionClass = Option) =>
        Req(opt).put(`${opt.Urlbase}/HINCRBY-!${this.key}${opt.paramString()}?Field=${Field}&Increment=${Increment}`)
    public hIncrByFloat = (Key: string, Field: string, Increment: number, opt: OptionClass = Option) =>
        Req(opt).put(`${opt.Urlbase}/HINCRBYFLOAT-!${this.key}${opt.paramString()}?Field=${Field}&Increment=${Increment}`)
    public hScan = (Key: string, Cursor: number, Match: string, Count = 4096, opt: OptionClass = Option.rspTypeMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.Urlbase}/HSCAN-!${this.key}${opt.paramString()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)
    public hLen = (Key: string, opt: OptionClass = Option) =>
        Req(opt).get(`${opt.Urlbase}/HLEN-!${this.key}${opt.paramString()}`)

}