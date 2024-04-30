import axios from "axios";
var msgpack = require('@ygoe/msgpack');

//set multiple feature of the requst, such as response type and redis database name
class OptionClass {
    public UrlItems: { [key: string]: string } = {};
    public Header: { [key: string]: string } = {};

    public ThrowPromiseError: boolean = false;
    public Urlbase: string = "";
    private optionObject = (): OptionClass => {
        if (this != Option) return this;
        var ret = new OptionClass()
        ret.UrlItems = Object.assign({}, this.UrlItems);
        ret.Header = Object.assign({}, this.Header);
        ret.ThrowPromiseError = this.ThrowPromiseError;
        ret.Urlbase = this.Urlbase;
        return ret;
    }

    public withUrlField = (key: string, value: string) => {
        var ret = this.optionObject();
        ret.UrlItems[key] = "-!" + encodeURIComponent(key) + "~" + encodeURIComponent(value);
        return ret;
    }
    //set Content-Type in reponsed header : 
    //json is server default
    public rspTypeJson = () => this.withUrlField("rt", "application/json");
    public rspTypeJpeg = () => this.withUrlField("rt", "image/jpeg");
    public rspTypeOgg = () => this.withUrlField("rt", "audio/ogg");
    public rspTypeMpeg = () => this.withUrlField("rt", "video/mpeg");
    public rspTypeMp4 = () => this.withUrlField("rt", "video/mp4");
    public rspTypeText = () => this.withUrlField("rt", "text/plain");
    public rspTypeStream = () => this.withUrlField("rt", "application/octet-stream");
    public rspTypeMsgpack = () => this.withUrlField("rt", "application/msgpack");
    public rspTypeAny = (anyType: string) => this.withUrlField("rt", anyType);
    //set redis DataSource of the request
    public withDataSource = (dataSourceName: string) => this.withUrlField("ds", dataSourceName);
    public withUrlbase = (urlbase: string) => {
        var ret = this.optionObject();
        ret.Urlbase = urlbase;
        return ret;
    }

    //default value false, if true, return error
    public ThrowSecondaryPromiseError = (allowed: boolean) => {
        var ret = this.optionObject();
        ret.ThrowPromiseError = allowed;
        return ret;
    }

    public paramString = () => Object.values(this.UrlItems)?.join("");

    constructor() { }
}
export const Option = new OptionClass();
export const setDefaultSUToken = (sutoken: string) => {
    if (!!sutoken) Option.UrlItems["su"] = "-!su~" + encodeURIComponent(sutoken);
    else delete Option.UrlItems["su"];
}
//default urlbase:  set http host of the doptime server
//the urlbase can be an empty string, which has same domain & port of the web page
var urlbase = ""
//primaryErrorHandler: used like to handle 401 error, redirect to login page. i.g.: !e.response && e.response.status === 401&&...
//  if you want's to further handle the error using Promise, you can set AllowThrowErr to true in Option of each request
var primaryErrorHandler: Function = () => null;

//DefaultHost:  set the host of the doptime server
//JWT: set the JWT in header["Authorization"]
//PrimaryErrorHandler: used like to handle 401 error, redirect to login page. i.g.: !e.response && e.response.status === 401&&...
//  if you want's to further handle the error using Promise, you can set AllowThrowErr to true in Option of each request
export const configure = (UrlBase: string = "", JWT: string = "", PrimaryErrorHandler: Function = () => null) => {
    urlbase = UrlBase;

    if (!JWT) delete Option.Header["Authorization"];
    else Option.Header["Authorization"] = JWT;

    primaryErrorHandler = PrimaryErrorHandler;
}
export default configure;

const Req = (option: OptionClass) => {
    let req = axios.create({ headers: option.Header });
    req.interceptors.request.use(
        (config: any) => {
            if (config.method === "post" || config.method === "put") {
                //if type of data is Object ,convert to object
                if (typeof config.data === "object" && !(config.data instanceof Array)) config.data = Object.assign({}, config.data);
                config.data = msgpack.encode(config.data);
                //if config.data is uint8 array ,create new buffer of it's length and copy it to new buffer
                if (config.data instanceof Uint8Array) {
                    let buf = new ArrayBuffer(config.data.length);
                    let view = new Uint8Array(buf);
                    for (let i = 0; i < config.data.length; ++i) {
                        view[i] = config.data[i];
                    }
                    config.data = buf;
                }
                config.headers["Content-Type"] = "application/octet-stream";
            }
            return config;
        },
        (error: any) => {
            return Promise.reject(error);
        }
    );
    req.interceptors.response.use(
        (response: any) => {
            if ("data" in response) return response.data;
            if (option.UrlItems["rt"] === "application/msgpack") {
                return msgpack.decode(new Uint8Array(response.data));
            }
            return response
        },
        (error: any) => {
            if (!!primaryErrorHandler) primaryErrorHandler(error);
            if (!!option.ThrowPromiseError) return Promise.reject(error);
        }
    );
    return req
};


//const Url = "https://jp.voiceofai.cc"
// all functions should have a commands & key , seperated by "-!"
// other parameters should be key-value pairs, seperated by "~", and key always 2chars
export enum urlGetCmd { HEXISTS = "HEXISTS", GET = "GET", HGET = "HGET", HGETALL = "HGETALL", HMGET = "HMGET" }
export const urlGet = (cmd = urlGetCmd.HGET, Key: string, Field: string = "", opt: OptionClass = Option) => {
    var url = `${opt.Urlbase || urlbase}/${cmd}-!${Key}${opt.paramString()}?F=${encodeURIComponent(Field)}`;
    return url
}
export const time = (opt: OptionClass = Option.withDataSource("default")) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/TIME-!null${opt.paramString()}?t=${new Date().getTime()}`)

export const hExists = (Key: string, Field: string = "", opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/HEXISTS-!${Key}${opt.paramString()}?F=${encodeURIComponent(Field)}`)

export const hset = (Key: string, Field: string = "", data: any, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase || urlbase}/HSET-!${Key}${opt.paramString()}?F=${encodeURIComponent(Field)}`, data)

export const get = (Key: string, Field: string = "", opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/GET-!${Key}${opt.paramString()}?F=${encodeURIComponent(Field)}`)

export const hGet = (Key: string, Field: string = "", opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/HGET-!${Key}${opt.paramString()}?F=${encodeURIComponent(Field)}`)

export const hDel = async (Key: string, Field: string = "", opt: OptionClass = Option) =>
    Req(opt).delete(`${opt.Urlbase || urlbase}/HDEL-!${Key}${opt.paramString()}?F=${Field}`)

export const hGetAll = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/HGETALL-!${Key}${opt.paramString()}`)

export const hVals = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/HVALS-!${Key}${opt.paramString()}`)

export const hKeys = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/HKEYS-!${Key}${opt.paramString()}`)

export const hRandField = (Key: string, Count: number, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/HRANDFIELD-!${Key}${opt.paramString()}?Count=${Count}`)

export const hMGet = (Key: string, Fields: any[] = [], opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/HMGET-!${Key}${opt.paramString()}?F=${encodeURIComponent(Fields.join(","))}`)

export const zRange = (Key: string, Start: number, Stop: number, WITHSCORES: boolean = false, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/ZRANGE-!${Key}${opt.paramString()}?Start=${Start}&Stop=${Stop}&WITHSCORES=${WITHSCORES}`)

export const zRevRange = (Key: string, Start: number, Stop: number, WITHSCORES: boolean, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/ZREVRANGE-!${Key}${opt.paramString()}?Start=${Start}&Stop=${Stop}&WITHSCORES=${WITHSCORES}`)

export const zRank = (Key: string, Member: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/ZRANK-!${Key}${opt.paramString()}?Member=${Member}`)

export const zScore = (Key: string, Member: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/ZSCORE-!${Key}${opt.paramString()}?Member=${Member}`)

//if withscores is true, return [member, score, member, score, ...]
//if withscores is false, return [member, member, ...]
export const zRangeByScore = (Key: string, Min: number | string, Max: number | string, WITHSCORES: boolean, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/ZRANGEBYSCORE-!${Key}${opt.paramString()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}&WITHSCORES=${WITHSCORES}`)

//if withscores is true, return [member, score, member, score, ...]
//if withscores is false, return [member, member, ...]
export const zRevRangeByScore = (Key: string, Min: number | string, Max: number | string, WITHSCORES: boolean = true, Offset: Number = 0, Count: Number = 4096, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/ZREVRANGEBYSCORE-!${Key}${opt.paramString()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}&WITHSCORES=${WITHSCORES}&Offset=${Offset}&Count=${Count}`)

export const zAdd = (Key: string, Score: number, Member: any, opt: OptionClass = Option) =>
    Req(opt).post(`${opt.Urlbase || urlbase}/ZADD-!${Key}${opt.paramString()}?Score=${Score}`, Member)

export const zRem = (Key: string, Member: any, opt: OptionClass = Option) =>
    Req(opt).delete(`${opt.Urlbase || urlbase}/ZREM-!${Key}${opt.paramString()}?Member=${Member}`)

export const zRemRangeByScore = (Key: string, Min: number, Max: number, opt: OptionClass = Option) =>
    Req(opt).delete(`${opt.Urlbase || urlbase}/ZREMRANGEBYSCORE-!${Key}${opt.paramString()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}`)

export const zCount = (Key: string, Min: number, Max: number, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/ZCOUNT-!${Key}${opt.paramString()}?Min=${encodeURIComponent(Min)}&Max=${encodeURIComponent(Max)}`)


export const sIsMember = (Key: string, Member: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/SISMEMBER-!${Key}${opt.paramString()}?Member=${Member}`)

export const scan = (Cursor: number, Match: string, Count = 4096, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/SCAN-!null${opt.paramString()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)

export const lIndex = (Key: string, Index: number, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/LINDEX-!${Key}${opt.paramString()}?Index=${Index}`)
export const lPop = (Key: string, opt: OptionClass = Option) =>
    Req(opt).delete(`${opt.Urlbase || urlbase}/LPOP-!${Key}${opt.paramString()}`)
export const lPush = (Key: string, Value: any, opt: OptionClass = Option) =>
    Req(opt).post(`${opt.Urlbase || urlbase}/LPUSH-!${Key}${opt.paramString()}`, Value)
export const lRem = (Key: string, Count: number, Value: any, opt: OptionClass = Option) =>
    Req(opt).delete(`${opt.Urlbase || urlbase}/LREM-!${Key}${opt.paramString()}?Count=${Count}`, Value)
export const lSet = (Key: string, Index: number, Value: any, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase || urlbase}/LSET-!${Key}${opt.paramString()}?Index=${Index}`, Value)
export const lTrim = (Key: string, Start: number, Stop: number, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase || urlbase}/LTRIM-!${Key}${opt.paramString()}?Start=${Start}&Stop=${Stop}`)
export const rPop = (Key: string, opt: OptionClass = Option) =>
    Req(opt).delete(`${opt.Urlbase || urlbase}/RPOP-!${Key}${opt.paramString()}`)
export const rPush = (Key: string, Value: any, opt: OptionClass = Option) =>
    Req(opt).post(`${opt.Urlbase || urlbase}/RPUSH-!${Key}${opt.paramString()}`, Value)
export const rPushX = (Key: string, Value: any, opt: OptionClass = Option) =>
    Req(opt).post(`${opt.Urlbase || urlbase}/RPUSHX-!${Key}${opt.paramString()}`, Value)
export const type = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/TYPE-!${Key}${opt.paramString()}`)
export const del = (Key: string, opt: OptionClass = Option) =>
    Req(opt).delete(`${opt.Urlbase || urlbase}/DEL-!${Key}${opt.paramString()}`)
export const exists = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/EXISTS-!${Key}${opt.paramString()}`)
export const expire = (Key: string, Seconds: number, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase || urlbase}/EXPIRE-!${Key}${opt.paramString()}?Seconds=${Seconds}`)
export const expireAt = (Key: string, Timestamp: number, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase || urlbase}/EXPIREAT-!${Key}${opt.paramString()}?Timestamp=${Timestamp}`)
export const persist = (Key: string, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase || urlbase}/PERSIST-!${Key}${opt.paramString()}`)
export const ttl = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/TTL-!${Key}${opt.paramString()}`)
export const pttl = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/PTTL-!${Key}${opt.paramString()}`)
export const keys = (Pattern: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/KEYS-!null${opt.paramString()}?Pattern=${Pattern}`)
export const rename = (Key: string, NewKey: string, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase || urlbase}/RENAME-!${Key}${opt.paramString()}?NewKey=${NewKey}`)
export const renamenx = (Key: string, NewKey: string, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase || urlbase}/RENAMENX-!${Key}${opt.paramString()}?NewKey=${NewKey}`)
export const zIncrBy = (Key: string, Increment: number, Member: any, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase || urlbase}/ZINCRBY-!${Key}${opt.paramString()}?Increment=${Increment}`, Member)
export const hIncrBy = (Key: string, Field: string, Increment: number, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase || urlbase}/HINCRBY-!${Key}${opt.paramString()}?Field=${Field}&Increment=${Increment}`)
export const hIncrByFloat = (Key: string, Field: string, Increment: number, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase || urlbase}/HINCRBYFLOAT-!${Key}${opt.paramString()}?Field=${Field}&Increment=${Increment}`)
//xrange xadd xlen xdel
export const xAdd = (Key: string, ID = "", Data: any, opt: OptionClass = Option) =>
    Req(opt).post(`${opt.Urlbase || urlbase}/XADD-!${Key}${opt.paramString()}?ID=${ID}`, Data)
export const xDel = (Key: string, ID: string, opt: OptionClass = Option) =>
    Req(opt).delete(`${opt.Urlbase || urlbase}/XDEL-!${Key}${opt.paramString()}?ID=${ID}`)

export const hLen = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/HLEN-!${Key}${opt.paramString()}`)
export const lLen = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/LLEN-!${Key}${opt.paramString()}`)
export const xLen = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/XLEN-!${Key}${opt.paramString()}`)
export const sCard = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/SCARD-!${Key}${opt.paramString()}`)
export const zCard = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/ZCARD-!${Key}${opt.paramString()}`)


export const sScan = (Key: string, Cursor: number, Match: string, Count = 4096, opt: OptionClass = Option.rspTypeMsgpack()) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/SSCAN-!${Key}${opt.paramString()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)
export const hScan = (Key: string, Cursor: number, Match: string, Count = 4096, opt: OptionClass = Option.rspTypeMsgpack()) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/HSCAN-!${Key}${opt.paramString()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)
export const zScan = (Key: string, Cursor: number, Match: string, Count = 4096, opt: OptionClass = Option.rspTypeMsgpack()) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/ZSCAN-!${Key}${opt.paramString()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)
export const lRange = (Key: string, Start: number, Stop: number, opt: OptionClass = Option.rspTypeMsgpack()) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/LRANGE-!${Key}${opt.paramString()}?Start=${Start}&Stop=${Stop}`)
export const xRange = (Key: string, Start = "-", Stop = "+", opt: OptionClass = Option.rspTypeMsgpack()) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/XRANGE-!${Key}${opt.paramString()}?Start=${encodeURIComponent(Start)}&Stop=${encodeURIComponent(Stop)}`)
//bloack string: 10h20m30s100ms
export const xRead = (Key: string, Count = 4096, Block = "0ms", opt: OptionClass = Option.rspTypeMsgpack()) =>
    Req(opt).get(`${opt.Urlbase || urlbase}/XREAD-!${Key}${opt.paramString()}?Count=${Count}&Block=${Block}`)




export const api = async (serviceName: string, data: any = {}, opt: OptionClass = Option) => {
    //ensure service name  is standardized
    //strip prefix "api:" if it exists
    if (serviceName.toLowerCase().startsWith("api:")) {
        serviceName = serviceName.slice(4)
    }
    //first character of Service should be lower case
    if (serviceName.length > 0) {
        serviceName = serviceName[0].toLowerCase() + serviceName.slice(1)
    }
    //error if service name is empty
    if (serviceName.length === 0) {
        console.error("API service name is empty, which is not allowed")
        //throw new Error("API service name is empty, which is not allowed")
        throw new Error("API service name is empty, which is not allowed")
    }
    return Req(opt).post(`${opt.Urlbase || urlbase}/API-!${serviceName}${opt.paramString()}`, data)
}