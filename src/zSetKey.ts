import Req from "./http"
import RequestOptions, { Opt } from "./Option"

export default class zSetKey<T> {
    private dataSchema: any = null
    constructor(public key: string, public dataSchemaInstace: T | null = null) {
    }

    public ConcatKey(...fields: any[]): zSetKey<T> {
        const newKey = [this.key, ...fields].filter((v) => !!v).join(":")
        return new zSetKey<T>(newKey, this.dataSchemaInstace);
    }

    public zRange = (Start: number, Stop: number, WITHSCORES: boolean = false, opt: RequestOptions = Opt) =>
        Req(opt).get(`${opt.baseUrl}/ZRANGE-${this.key}?Start=${Start}&Stop=${Stop}&WITHSCORES=${WITHSCORES}`)

    public zRevRange = (Start: number, Stop: number, WITHSCORES: boolean, opt: RequestOptions = (Opt)) =>
        Req(opt).get(`${opt.baseUrl}/ZREVRANGE-${this.key}?Start=${Start}&Stop=${Stop}&WITHSCORES=${WITHSCORES}`)

    public zRank = (Member: string, opt: RequestOptions = Opt) =>
        Req(opt).get(`${opt.baseUrl}/ZRANK-${this.key}?Member=${Member}`)

    public zScore = (Member: string, opt: RequestOptions = Opt) =>
        Req(opt).get(`${opt.baseUrl}/ZSCORE-${this.key}?Member=${Member}`)

    //if withscores is true, return [member, score, member, score, ...]
    //if withscores is false, return [member, member, ...]
    public zRangeByScore = (Min: number | string, Max: number | string, WITHSCORES: boolean, opt: RequestOptions = Opt) =>
        Req(opt).get(`${opt.baseUrl}/ZRANGEBYSCORE-${this.key}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}&WITHSCORES=${WITHSCORES}`)

    //if withscores is true, return [member, score, member, score, ...]
    //if withscores is false, return [member, member, ...]
    public zRevRangeByScore = (Min: number | string, Max: number | string, WITHSCORES: boolean = true, Offset: Number = 0, Count: Number = 4096, opt: RequestOptions = Opt) =>
        Req(opt).get(`${opt.baseUrl}/ZREVRANGEBYSCORE-${this.key}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}&WITHSCORES=${WITHSCORES}&Offset=${Offset}&Count=${Count}`)

    public zAdd = (Score: number, Member: any, opt: RequestOptions = Opt) =>
        Req(opt).post(`${opt.baseUrl}/ZADD-${this.key}?Score=${Score}`, Member)

    public zRem = (Member: any, opt: RequestOptions = Opt) =>
        Req(opt).delete(`${opt.baseUrl}/ZREM-${this.key}?Member=${Member}`)

    public zRemRangeByScore = (Min: number, Max: number, opt: RequestOptions = Opt) =>
        Req(opt).delete(`${opt.baseUrl}/ZREMRANGEBYSCORE-${this.key}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}`)

    public zCount = (Min: number, Max: number, opt: RequestOptions = Opt) =>
        Req(opt).get(`${opt.baseUrl}/ZCOUNT-${this.key}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}`)

    public zCard = (opt: RequestOptions = Opt) =>
        Req(opt).get(`${opt.baseUrl}/ZCARD-${this.key}`)

    public zScan = (Cursor: number, Match: string, Count = 4096, opt: RequestOptions = Opt.WithResponseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/ZSCAN-${this.key}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)


    public zIncrBy = (Increment: number, Member: any, opt: RequestOptions = Opt) =>
        Req(opt).put(`${opt.baseUrl}/ZINCRBY-${this.key}?Increment=${Increment}`, Member)

}