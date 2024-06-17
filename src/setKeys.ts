import Req from "./http"
import OptionClass, { Option } from "./Option"

export default class setKey {
    constructor(public key: string) {
    }

    public sIsMember = (Key: string, Member: string, opt: OptionClass = Option) =>
        Req(opt).get(`${opt.Urlbase}/SISMEMBER-!${this.key}${opt.paramString()}?Member=${Member}`)

    public sScan = (Key: string, Cursor: number, Match: string, Count = 4096, opt: OptionClass = Option.rspTypeMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.Urlbase}/SSCAN-!${this.key}${opt.paramString()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)
    public sCard = (Key: string, opt: OptionClass = Option) =>
        Req(opt).get(`${opt.Urlbase}/SCARD-!${this.key}${opt.paramString()}`)

}