import Req from "./http"
import RequestOptions, { Option } from "./Option"

export default class streamKey extends Key {
    constructor(public key: string) {
        super(key)
    }

    //xrange xadd xlen xdel
    public xAdd = (Key: string, ID = "", Data: any, opt: RequestOptions = Option) =>
        Req(opt).post(`${opt.baseUrl}/XADD-${this.getkey()}?ID=${ID}`, Data)
    public xDel = (Key: string, ID: string, opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/XDEL-${this.getkey()}?ID=${ID}`)

    public xLen = (Key: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/XLEN-${this.getkey()}`)
    public xRange = (Key: string, Start = "-", Stop = "+", opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XRANGE-${this.getkey()}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}`)
    public xRangeN = (Key: string, Start = "-", Stop = "+", Count = 4096, opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XRANGEN-${this.getkey()}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}&Count=${Count}`)
    public xRevRange = (Key: string, Start = "+", Stop = "-", opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XREVRANGE-${this.getkey()}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}`)
    public xRevRangeN = (Key: string, Start = "+", Stop = "-", Count = 4096, opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XREVRANGEN-${this.getkey()}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}&Count=${Count}`)
    //bloack string: 10h20m30s100ms
    public xRead = (Key: string, Count = 4096, Block = "0ms", opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XREAD-${this.getkey()}?Count=${Count}&Block=${Block}`)


}