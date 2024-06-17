import Req from "./http"
import OptionClass, { Option } from "./Option"

export default class sortedSetKey {
    constructor(public key: string) {
    }

    public zRange = (Start: number, Stop: number, WITHSCORES: boolean = false, opt: OptionClass = Option) =>
        Req(opt).get(`${opt.Urlbase}/ZRANGE-!${this.key}${opt.paramString()}?Start=${Start}&Stop=${Stop}&WITHSCORES=${WITHSCORES}`)

    public zRevRange = (Start: number, Stop: number, WITHSCORES: boolean, opt: OptionClass = (Option)) =>
        Req(opt).get(`${opt.Urlbase}/ZREVRANGE-!${this.key}${opt.paramString()}?Start=${Start}&Stop=${Stop}&WITHSCORES=${WITHSCORES}`)

    public zRank = (Member: string, opt: OptionClass = Option) =>
        Req(opt).get(`${opt.Urlbase}/ZRANK-!${this.key}${opt.paramString()}?Member=${Member}`)

    public zScore = (Member: string, opt: OptionClass = Option) =>
        Req(opt).get(`${opt.Urlbase}/ZSCORE-!${this.key}${opt.paramString()}?Member=${Member}`)

    //if withscores is true, return [member, score, member, score, ...]
    //if withscores is false, return [member, member, ...]
    public zRangeByScore = (Min: number | string, Max: number | string, WITHSCORES: boolean, opt: OptionClass = Option) =>
        Req(opt).get(`${opt.Urlbase}/ZRANGEBYSCORE-!${this.key}${opt.paramString()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}&WITHSCORES=${WITHSCORES}`)

    //if withscores is true, return [member, score, member, score, ...]
    //if withscores is false, return [member, member, ...]
    public zRevRangeByScore = (Min: number | string, Max: number | string, WITHSCORES: boolean = true, Offset: Number = 0, Count: Number = 4096, opt: OptionClass = Option) =>
        Req(opt).get(`${opt.Urlbase}/ZREVRANGEBYSCORE-!${this.key}${opt.paramString()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}&WITHSCORES=${WITHSCORES}&Offset=${Offset}&Count=${Count}`)

    public zAdd = (Score: number, Member: any, opt: OptionClass = Option) =>
        Req(opt).post(`${opt.Urlbase}/ZADD-!${this.key}${opt.paramString()}?Score=${Score}`, Member)

    public zRem = (Member: any, opt: OptionClass = Option) =>
        Req(opt).delete(`${opt.Urlbase}/ZREM-!${this.key}${opt.paramString()}?Member=${Member}`)

    public zRemRangeByScore = (Min: number, Max: number, opt: OptionClass = Option) =>
        Req(opt).delete(`${opt.Urlbase}/ZREMRANGEBYSCORE-!${this.key}${opt.paramString()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}`)

    public zCount = (Min: number, Max: number, opt: OptionClass = Option) =>
        Req(opt).get(`${opt.Urlbase}/ZCOUNT-!${this.key}${opt.paramString()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}`)

    public zCard = (Key: string, opt: OptionClass = Option) =>
        Req(opt).get(`${opt.Urlbase}/ZCARD-!${this.key}${opt.paramString()}`)

    public zScan = (Key: string, Cursor: number, Match: string, Count = 4096, opt: OptionClass = Option.rspTypeMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.Urlbase}/ZSCAN-!${this.key}${opt.paramString()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)


    public zIncrBy = (Key: string, Increment: number, Member: any, opt: OptionClass = Option) =>
        Req(opt).put(`${opt.Urlbase}/ZINCRBY-!${this.key}${opt.paramString()}?Increment=${Increment}`, Member)

}