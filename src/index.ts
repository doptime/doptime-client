import axios from "axios";
var msgpack = require('@ygoe/msgpack');

//set multiple feature of the requst, such as response type and redis database name
class OptionClass {
    private UrlItems: { [key: string]: string } = {};
    public Header: { [key: string]: string } = {};

    public ThrowPromiseError: boolean = false;
    public Host: string = "";
    private optionObject = (): OptionClass => (this == Option ? JSON.parse(JSON.stringify(Option)) as OptionClass : this)
    private WithUrlValue = (key: string, value: string) => {
        if (!value.startsWith("-!")) value = "-!" + value;
        var ret = this.optionObject();
        ret.UrlItems[key] = value;
        return ret;
    }
    //set Content-Type in reponsed header : 
    //json is server default
    public RspTypeJson = () => this.WithUrlValue("rsb", "-!JSON");
    public RspTypeJpeg = () => this.WithUrlValue("rsb", "-!JPG");
    public RspTypeOgg = () => this.WithUrlValue("rsb", "-!OGG");
    public RspTypeMpeg = () => this.WithUrlValue("rsb", "-!MPEG");
    public RspTypeMp4 = () => this.WithUrlValue("rsb", "-!MP4");
    public RspTypeText = () => this.WithUrlValue("rsb", "-!TEXT");
    public RspTypeStream = () => this.WithUrlValue("rsb", "-!STREAM");
    //set redis DataSource of the request
    public WithDataSource = (dataSourceName: string) => this.WithUrlValue("ds", encodeURIComponent("-!" + dataSourceName));
    public WithHost = (host: string) => {
        var ret = this.optionObject();
        ret.Host = host;
        return ret;
    }

    //default value false, if true, return error
    public ThrowSecondaryPromiseError = (allowed: boolean) => {
        var ret = this.optionObject();
        ret.ThrowPromiseError = allowed;
        return ret;
    }
    public ToHostString = () => {
        var host = this.Host ?? defaultHost
        if (!host.startsWith("http")) throw new Error("host should start with http or https")
        return host
    }

    public ToParamString = () => Object.values(this.UrlItems).join("")

    constructor() {
        this.UrlItems = {};
    }
}
export const Option = new OptionClass();
//defaultHost:  set http host of the goflow server
var defaultHost = ""
//primaryErrorHandler: used like to handle 401 error, redirect to login page. i.g.: !e.response && e.response.status === 401&&...
//  if you want's to further handle the error using Promise, you can set AllowThrowErr to true in Option of each request
var primaryErrorHandler: Function = () => null;

//DefaultHost:  set the host of the goflow server
//JWT: set the JWT in header["Authorization"]
//PrimaryErrorHandler: used like to handle 401 error, redirect to login page. i.g.: !e.response && e.response.status === 401&&...
//  if you want's to further handle the error using Promise, you can set AllowThrowErr to true in Option of each request
export const GlobalConfig = (DefaultHost: string, JWT: string = "", PrimaryErrorHandler: Function = () => null) => {
    if (!DefaultHost.startsWith("http")) throw new Error("host should start with http or https")
    else defaultHost = DefaultHost;

    if (!JWT) delete Option.Header["Authorization"];
    else Option.Header["Authorization"] = JWT;

    primaryErrorHandler = PrimaryErrorHandler;
}

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
export enum urlGetCmd { HEXISTS = "HEXISTS", GET = "GET", HGET = "HGET", HGETALL = "HGETALL", HMGET = "HMGET" }
export const urlGet = (cmd = urlGetCmd.HGET, Key: string, Field: string = "", opt: OptionClass = Option) => {
    var url = `${opt.ToHostString()}/${cmd}-!${Key}${opt.ToParamString()}?F=${encodeURIComponent(Field)}`;
    return url
}
export const time = (opt: OptionClass = Option.WithDataSource("default")) =>
    Req(opt).get(`${opt.ToHostString()}/TIME-!null${opt.ToParamString()}?t=${new Date().getTime()}`)

export const hExists = (Key: string, Field: string = "", opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/HEXISTS-!${Key}${opt.ToParamString()}?F=${encodeURIComponent(Field)}`)

export const hset = (Key: string, Field: string = "", data: any, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.ToHostString()}/HSET-!${Key}${opt.ToParamString()}?F=${encodeURIComponent(Field)}`, data)

export const get = (Key: string, Field: string = "", opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/GET-!${Key}${opt.ToParamString()}?F=${encodeURIComponent(Field)}`)

export const hGet = (Key: string, Field: string = "", opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/HGET-!${Key}${opt.ToParamString()}?F=${encodeURIComponent(Field)}`)

export const hDel = async (Key: string, Field: string = "", opt: OptionClass = Option) =>
    Req(opt).delete(`${opt.ToHostString()}/HDEL-!${Key}${opt.ToParamString()}?F=${Field}`)

export const hGetAll = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/HGETALL-!${Key}${opt.ToParamString()}`)

export const hVals = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/HVALS-!${Key}${opt.ToParamString()}`)

export const hKeys = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/HKEYS-!${Key}${opt.ToParamString()}`)

export const hRandField = (Key: string, Count: number, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/HRANDFIELD-!${Key}${opt.ToParamString()}?Count=${Count}`)

export const hMGet = (Key: string, Fields: any[] = [], opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/HMGET-!${Key}${opt.ToParamString()}?F=${encodeURIComponent(Fields.join(","))}`)

export const zRange = (Key: string, Start: number, Stop: number, WITHSCORES: boolean = false, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/ZRANGE-!${Key}${opt.ToParamString()}?Start=${Start}&Stop=${Stop}&WITHSCORES=${WITHSCORES}`)

export const zRevRange = (Key: string, Start: number, Stop: number, WITHSCORES: boolean, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/ZREVRANGE-!${Key}${opt.ToParamString()}?Start=${Start}&Stop=${Stop}&WITHSCORES=${WITHSCORES}`)

export const zRank = (Key: string, Member: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/ZRANK-!${Key}${opt.ToParamString()}?Member=${Member}`)

export const zScore = (Key: string, Member: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/ZSCORE-!${Key}${opt.ToParamString()}?Member=${Member}`)

export const zRangeByScore = (Key: string, Min: number | string, Max: number | string, WITHSCORES: boolean, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/ZRANGEBYSCORE-!${Key}${opt.ToParamString()}?Min=${Min}&Max=${Max}&WITHSCORES=${WITHSCORES}`)

export const zRevRangeByScore = (Key: string, Max: number | string, Min: number | string, WITHSCORES: boolean, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/ZREVRANGEBYSCORE-!${Key}${opt.ToParamString()}?Min=${Min}&Max=${Max}&WITHSCORES=${WITHSCORES}`)

export const zAdd = (Key: string, Score: number, Member: any, opt: OptionClass = Option) =>
    Req(opt).post(`${opt.ToHostString()}/ZADD-!${Key}${opt.ToParamString()}?Score=${Score}`, Member)

export const zRem = (Key: string, Member: any, opt: OptionClass = Option) =>
    Req(opt).delete(`${opt.ToHostString()}/ZREM-!${Key}${opt.ToParamString()}?Member=${Member}`)

export const zRemRangeByScore = (Key: string, Min: number, Max: number, opt: OptionClass = Option) =>
    Req(opt).delete(`${opt.ToHostString()}/ZREMRANGEBYSCORE-!${Key}${opt.ToParamString()}?Min=${Min}&Max=${Max}`)

export const zCount = (Key: string, Min: number, Max: number, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/ZCOUNT-!${Key}${opt.ToParamString()}?Min=${Min}&Max=${Max}`)

export const zCard = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/ZCARD-!${Key}${opt.ToParamString()}`)

export const sIsMember = (Key: string, Member: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.ToHostString()}/SISMEMBER-!${Key}${opt.ToParamString()}?Member=${Member}`)

export const API = async (serviceName: string, data: any = {}, opt: OptionClass = Option) => {
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
    return Req(opt).post(`${opt.ToHostString()}/API-!${serviceName}${opt.ToParamString()}`, data)
}