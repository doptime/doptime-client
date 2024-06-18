import Req from "./http"
import RequestOptions, { Option } from "./Option"


export default class sortedSetKey {
    constructor(public key: string) {
    }

    public zRange = (Start: number, Stop: number, WITHSCORES: boolean = false, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/ZRANGE-!${this.key}${opt.paramString()}?Start=${Start}&Stop=${Stop}&WITHSCORES=${WITHSCORES}`)

    public zRevRange = (Start: number, Stop: number, WITHSCORES: boolean, opt: RequestOptions = (Option)) =>
        Req(opt).get(`${opt.baseUrl}/ZREVRANGE-!${this.key}${opt.paramString()}?Start=${Start}&Stop=${Stop}&WITHSCORES=${WITHSCORES}`)

    public zRank = (Member: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/ZRANK-!${this.key}${opt.paramString()}?Member=${Member}`)

    public zScore = (Member: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/ZSCORE-!${this.key}${opt.paramString()}?Member=${Member}`)

    //if withscores is true, return [member, score, member, score, ...]
    //if withscores is false, return [member, member, ...]
    public zRangeByScore = (Min: number | string, Max: number | string, WITHSCORES: boolean, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/ZRANGEBYSCORE-!${this.key}${opt.paramString()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}&WITHSCORES=${WITHSCORES}`)

    //if withscores is true, return [member, score, member, score, ...]
    //if withscores is false, return [member, member, ...]
    public zRevRangeByScore = (Min: number | string, Max: number | string, WITHSCORES: boolean = true, Offset: Number = 0, Count: Number = 4096, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/ZREVRANGEBYSCORE-!${this.key}${opt.paramString()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}&WITHSCORES=${WITHSCORES}&Offset=${Offset}&Count=${Count}`)

    public zAdd = (Score: number, Member: any, opt: RequestOptions = Option) =>
        Req(opt).post(`${opt.baseUrl}/ZADD-!${this.key}${opt.paramString()}?Score=${Score}`, Member)

    public zRem = (Member: any, opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/ZREM-!${this.key}${opt.paramString()}?Member=${Member}`)

    public zRemRangeByScore = (Min: number, Max: number, opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/ZREMRANGEBYSCORE-!${this.key}${opt.paramString()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}`)

    public zCount = (Min: number, Max: number, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/ZCOUNT-!${this.key}${opt.paramString()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}`)

    public zCard = (Key: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/ZCARD-!${this.key}${opt.paramString()}`)

    public zScan = (Key: string, Cursor: number, Match: string, Count = 4096, opt: RequestOptions = Option.responseTypeMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/ZSCAN-!${this.key}${opt.paramString()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)


    public zIncrBy = (Key: string, Increment: number, Member: any, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/ZINCRBY-!${this.key}${opt.paramString()}?Increment=${Increment}`, Member)

}