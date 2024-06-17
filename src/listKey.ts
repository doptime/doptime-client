import Req from "./http"
import OptionClass, { Option } from "./Option"

export default class listKey {
    constructor(public key: string) {
    }
    public lIndex = (Key: string, Index: number, opt: OptionClass = Option) =>
        Req(opt).get(`${opt.Urlbase}/LINDEX-!${this.key}${opt.paramString()}?Index=${Index}`)
    public lPop = (Key: string, opt: OptionClass = Option) =>
        Req(opt).delete(`${opt.Urlbase}/LPOP-!${this.key}${opt.paramString()}`)
    public lPush = (Key: string, Value: any, opt: OptionClass = Option) =>
        Req(opt).post(`${opt.Urlbase}/LPUSH-!${this.key}${opt.paramString()}`, Value)
    public lRem = (Key: string, Count: number, Value: any, opt: OptionClass = Option) =>
        Req(opt).delete(`${opt.Urlbase}/LREM-!${this.key}${opt.paramString()}?Count=${Count}`, Value)
    public lSet = (Key: string, Index: number, Value: any, opt: OptionClass = Option) =>
        Req(opt).put(`${opt.Urlbase}/LSET-!${this.key}${opt.paramString()}?Index=${Index}`, Value)
    public lTrim = (Key: string, Start: number, Stop: number, opt: OptionClass = Option) =>
        Req(opt).put(`${opt.Urlbase}/LTRIM-!${this.key}${opt.paramString()}?Start=${Start}&Stop=${Stop}`)
    public rPop = (Key: string, opt: OptionClass = Option) =>
        Req(opt).delete(`${opt.Urlbase}/RPOP-!${this.key}${opt.paramString()}`)
    public rPush = (Key: string, Value: any, opt: OptionClass = Option) =>
        Req(opt).post(`${opt.Urlbase}/RPUSH-!${this.key}${opt.paramString()}`, Value)
    public rPushX = (Key: string, Value: any, opt: OptionClass = Option) =>
        Req(opt).post(`${opt.Urlbase}/RPUSHX-!${this.key}${opt.paramString()}`, Value)

    public lLen = (Key: string, opt: OptionClass = Option) =>
        Req(opt).get(`${opt.Urlbase}/LLEN-!${this.key}${opt.paramString()}`)

    public lRange = (Key: string, Start: number, Stop: number, opt: OptionClass = Option.rspTypeMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.Urlbase}/LRANGE-!${this.key}${opt.paramString()}?Start=${Start}&Stop=${Stop}`)

}