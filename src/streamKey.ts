import Req from "./http"
import RequestOptions, { Option } from "./Option"
import { checkSchema, dataObjectToSchema } from "./dataschema"

export default class streamKey {
    private dataSchema: any = null
    constructor(public key: string, public dataSchemaInstace: any = null) {
        if (!!this.dataSchemaInstace) this.dataSchema = dataObjectToSchema(this.dataSchemaInstace)
    }

    public ConcatKey(...fields: any[]): streamKey {
        const newKey = [this.key, ...fields].filter((v) => !!v).join(":")
        const _key = new streamKey(newKey);
        _key.dataSchema = this.dataSchema;
        return _key;
    }

    //xrange xadd xlen xdel
    public xAdd = (Key: string, ID = "", Data: any, opt: RequestOptions = Option) =>
        Req(opt).post(`${opt.baseUrl}/XADD-${this.key}?ID=${ID}`, Data)
    public xDel = (Key: string, ID: string, opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/XDEL-${this.key}?ID=${ID}`)

    public xLen = (Key: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/XLEN-${this.key}`)
    public xRange = (Key: string, Start = "-", Stop = "+", opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XRANGE-${this.key}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}`)
    public xRangeN = (Key: string, Start = "-", Stop = "+", Count = 4096, opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XRANGEN-${this.key}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}&Count=${Count}`)
    public xRevRange = (Key: string, Start = "+", Stop = "-", opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XREVRANGE-${this.key}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}`)
    public xRevRangeN = (Key: string, Start = "+", Stop = "-", Count = 4096, opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XREVRANGEN-${this.key}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}&Count=${Count}`)
    //bloack string: 10h20m30s100ms
    public xRead = (Key: string, Count = 4096, Block = "0ms", opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/XREAD-${this.key}?Count=${Count}&Block=${Block}`)


}