import Req from "./http"
import RequestOptions, { Option } from "./Option"


export default class setKey {
    constructor(public key: string, public dataSchemaInstace: any = null) {
    }

    public ConcatKey(...fields: any[]): setKey {
        const newKey = [this.key, ...fields].filter((v) => !!v).join(":")
        return new setKey(newKey, this.dataSchemaInstace);
    }

    public sIsMember = (Member: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/SISMEMBER-${this.key}?Member=${Member}`)

    public sScan = (Cursor: number, Match: string, Count = 4096, opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/SSCAN-${this.key}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)
    public sCard = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/SCARD-${this.key}`)

}