import Req from "./http"
import RequestOptions, { Option } from "./Option"

export default class setKey {
    constructor(public key: string) {
    }

    public sIsMember = (Key: string, Member: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/SISMEMBER-!${this.key}${opt.paramString()}?Member=${Member}`)

    public sScan = (Key: string, Cursor: number, Match: string, Count = 4096, opt: RequestOptions = Option.responseTypeMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/SSCAN-!${this.key}${opt.paramString()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)
    public sCard = (Key: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/SCARD-!${this.key}${opt.paramString()}`)

}