import Req from "./http"
import OptionClass, { Option } from "./Option"

export default class streamKey {
    constructor(public key: string) {
    }

    //xrange xadd xlen xdel
    public xAdd = (Key: string, ID = "", Data: any, opt: OptionClass = Option) =>
        Req(opt).post(`${opt.Urlbase}/XADD-!${this.key}${opt.paramString()}?ID=${ID}`, Data)
    public xDel = (Key: string, ID: string, opt: OptionClass = Option) =>
        Req(opt).delete(`${opt.Urlbase}/XDEL-!${this.key}${opt.paramString()}?ID=${ID}`)

    public xLen = (Key: string, opt: OptionClass = Option) =>
        Req(opt).get(`${opt.Urlbase}/XLEN-!${this.key}${opt.paramString()}`)
    public xRange = (Key: string, Start = "-", Stop = "+", opt: OptionClass = Option.rspTypeMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.Urlbase}/XRANGE-!${this.key}${opt.paramString()}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}`)
    public xRangeN = (Key: string, Start = "-", Stop = "+", Count = 4096, opt: OptionClass = Option.rspTypeMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.Urlbase}/XRANGEN-!${this.key}${opt.paramString()}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}&Count=${Count}`)
    public xRevRange = (Key: string, Start = "+", Stop = "-", opt: OptionClass = Option.rspTypeMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.Urlbase}/XREVRANGE-!${this.key}${opt.paramString()}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}`)
    public xRevRangeN = (Key: string, Start = "+", Stop = "-", Count = 4096, opt: OptionClass = Option.rspTypeMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.Urlbase}/XREVRANGEN-!${this.key}${opt.paramString()}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}&Count=${Count}`)
    //bloack string: 10h20m30s100ms
    public xRead = (Key: string, Count = 4096, Block = "0ms", opt: OptionClass = Option.rspTypeMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.Urlbase}/XREAD-!${this.key}${opt.paramString()}?Count=${Count}&Block=${Block}`)


}