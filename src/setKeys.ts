import Req from "./http"
import RequestOptions, { Option } from "./Option"

export default class setKey extends Key {
    constructor(public key: string) {
        super(key)
    }

    public sIsMember = (Key: string, Member: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/SISMEMBER-${this.getkey()}?Member=${Member}`)

    public sScan = (Key: string, Cursor: number, Match: string, Count = 4096, opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/SSCAN-${this.getkey()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)
    public sCard = (Key: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/SCARD-${this.getkey()}`)

}