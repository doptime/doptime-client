import Req from "./http"
import RequestOptions, { Opt } from "./Option"
export default class streamKey<T> {
    constructor(public key: string, public dataSchemaInstace: T | null = null) {
    }

    public ConcatKey(...fields: any[]): streamKey<T> {
        const newKey = [this.key, ...fields].filter((v) => !!v).join(":")
        return new streamKey<T>(newKey as string, this.dataSchemaInstace);
    }

    //xrange xadd xlen xdel
    public xAdd = (Key: string, ID = "", Data: any, opt: RequestOptions = Opt) =>
        Req(opt).post(`${opt.baseUrl}/XADD-${this.key}?ID=${ID}`, Data)
    public xDel = (Key: string, ID: string, opt: RequestOptions = Opt) =>
        Req(opt).delete(`${opt.baseUrl}/XDEL-${this.key}?ID=${ID}`)

    public xLen = (Key: string, opt: RequestOptions = Opt) =>
        Req(opt).get(`${opt.baseUrl}/XLEN-${this.key}`)
    public xRange = (Key: string, Start = "-", Stop = "+", opt: RequestOptions = Opt.WithResponseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XRANGE-${this.key}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}`)
    public xRangeN = (Key: string, Start = "-", Stop = "+", Count = 4096, opt: RequestOptions = Opt.WithResponseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XRANGEN-${this.key}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}&Count=${Count}`)
    public xRevRange = (Key: string, Start = "+", Stop = "-", opt: RequestOptions = Opt.WithResponseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XREVRANGE-${this.key}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}`)
    public xRevRangeN = (Key: string, Start = "+", Stop = "-", Count = 4096, opt: RequestOptions = Opt.WithResponseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XREVRANGEN-${this.key}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}&Count=${Count}`)
    //bloack string: 10h20m30s100ms
    public xRead = (Key: string, Count = 4096, Block = "0ms", opt: RequestOptions = Opt.WithResponseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XREAD-${this.key}?Count=${Count}&Block=${Block}`)


}