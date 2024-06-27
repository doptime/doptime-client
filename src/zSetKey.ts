import Req from "./http"
import RequestOptions, { Option } from "./Option"
import keyClass from "./key"


export default class zSetKey extends keyClass {
    constructor(public key: string) {
        super(key)
    }

    public zRange = (Start: number, Stop: number, WITHSCORES: boolean = false, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/ZRANGE-${this.getkey()}?Start=${Start}&Stop=${Stop}&WITHSCORES=${WITHSCORES}`)

    public zRevRange = (Start: number, Stop: number, WITHSCORES: boolean, opt: RequestOptions = (Option)) =>
        Req(opt).get(`${opt.baseUrl}/ZREVRANGE-${this.getkey()}?Start=${Start}&Stop=${Stop}&WITHSCORES=${WITHSCORES}`)

    public zRank = (Member: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/ZRANK-${this.getkey()}?Member=${Member}`)

    public zScore = (Member: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/ZSCORE-${this.getkey()}?Member=${Member}`)

    //if withscores is true, return [member, score, member, score, ...]
    //if withscores is false, return [member, member, ...]
    public zRangeByScore = (Min: number | string, Max: number | string, WITHSCORES: boolean, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/ZRANGEBYSCORE-${this.getkey()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}&WITHSCORES=${WITHSCORES}`)

    //if withscores is true, return [member, score, member, score, ...]
    //if withscores is false, return [member, member, ...]
    public zRevRangeByScore = (Min: number | string, Max: number | string, WITHSCORES: boolean = true, Offset: Number = 0, Count: Number = 4096, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/ZREVRANGEBYSCORE-${this.getkey()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}&WITHSCORES=${WITHSCORES}&Offset=${Offset}&Count=${Count}`)

    public zAdd = (Score: number, Member: any, opt: RequestOptions = Option) =>
        Req(opt).post(`${opt.baseUrl}/ZADD-${this.getkey()}?Score=${Score}`, Member)

    public zRem = (Member: any, opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/ZREM-${this.getkey()}?Member=${Member}`)

    public zRemRangeByScore = (Min: number, Max: number, opt: RequestOptions = Option) =>
        Req(opt).delete(`${opt.baseUrl}/ZREMRANGEBYSCORE-${this.getkey()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}`)

    public zCount = (Min: number, Max: number, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/ZCOUNT-${this.getkey()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}`)

    public zCard = (Key: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/ZCARD-${this.getkey()}`)

    public zScan = (Key: string, Cursor: number, Match: string, Count = 4096, opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/ZSCAN-${this.getkey()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)


    public zIncrBy = (Key: string, Increment: number, Member: any, opt: RequestOptions = Option) =>
        Req(opt).put(`${opt.baseUrl}/ZINCRBY-${this.getkey()}?Increment=${Increment}`, Member)

}