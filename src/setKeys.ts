import Req from "./http"
import RequestOptions, { Option } from "./Option"


export default class setKey<T> {
    constructor(public key: string, public dataSchemaInstace: T | null = null) {
    }

    public ConcatKey(...fields: any[]): setKey<T> {
        const newKey = [this.key, ...fields].filter((v) => !!v).join(":")
        return new setKey<T>(newKey, this.dataSchemaInstace);
    }

    public sIsMember = (Member: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/SISMEMBER-${this.key}?Member=${Member}`)

    public sScan = (Cursor: number, Match: string, Count = 4096, opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/SSCAN-${this.key}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)
    public sCard = (opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/SCARD-${this.key}`)

}