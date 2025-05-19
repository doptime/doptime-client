import axios, { Axios, ResponseType } from "axios";
import OptionClass, { Opt, OptDefaults } from "./Option"
import Req from "./http"
import streamKey from "./streamKey"
import setKey from "./setKeys"
import stringKey from "./stringKey"
import listKey from "./listKey"
import hashKey from "./hashkey"
import zSetKey from "./zSetKey"
import newApi from "./api"
var msgpack = require('@ygoe/msgpack');

export const msgpackDecode = (data: any) => msgpack.decode(data);


//const Url = "https://jp.voiceofai.cc"
// all functions should have a commands & key , seperated by "-"
// other parameters should be key-value pairs, seperated by "~", and key always 2chars
export enum urlGetCmd { HEXISTS = "HEXISTS", GET = "GET", HGET = "HGET", HGETALL = "HGETALL", HMGET = "HMGET" }
export const urlGet = (cmd = urlGetCmd.HGET, Key: string, Field: string = "", opt: OptionClass = Opt) => {
    var url = `${opt.baseUrl}/${cmd}-${Key}?f=${encodeURIComponent(Field)}`;
    return url
}
export const time = (opt: OptionClass = Opt.WithDataSource("default")) =>
    Req(opt).get(`${opt.baseUrl}/TIME?t=${new Date().getTime()}`)

export const scan = (Cursor: number, Match: string, Count = 4096, opt: OptionClass = Opt) =>
    Req(opt).get(`${opt.baseUrl}/SCAN?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)

export const keys = (Pattern: string, opt: OptionClass = Opt) =>
    Req(opt).get(`${opt.baseUrl}/KEYS?Pattern=${Pattern}`)

export const type = (Key: string, opt: OptionClass = Opt) =>
    Req(opt).get(`${opt.baseUrl}/TYPE-${Key}`)
export const del = (Key: string, opt: OptionClass = Opt) =>
    Req(opt).delete(`${opt.baseUrl}/DEL-${Key}`)
export const exists = (Key: string, opt: OptionClass = Opt) =>
    Req(opt).get(`${opt.baseUrl}/EXISTS-${Key}`)
export const expire = (Key: string, Seconds: number, opt: OptionClass = Opt) =>
    Req(opt).put(`${opt.baseUrl}/EXPIRE-${Key}?Seconds=${Seconds}`)
export const expireAt = (Key: string, Timestamp: number, opt: OptionClass = Opt) =>
    Req(opt).put(`${opt.baseUrl}/EXPIREAT-${Key}?Timestamp=${Timestamp}`)
export const persist = (Key: string, opt: OptionClass = Opt) =>
    Req(opt).put(`${opt.baseUrl}/PERSIST-${Key}`)
export const ttl = (Key: string, opt: OptionClass = Opt) =>
    Req(opt).get(`${opt.baseUrl}/TTL-${Key}`)
export const pttl = (Key: string, opt: OptionClass = Opt) =>
    Req(opt).get(`${opt.baseUrl}/PTTL-${Key}`)
export const rename = (Key: string, NewKey: string, opt: OptionClass = Opt) =>
    Req(opt).put(`${opt.baseUrl}/RENAME-${Key}?NewKey=${NewKey}`)
export const renamenx = (Key: string, NewKey: string, opt: OptionClass = Opt) =>
    Req(opt).put(`${opt.baseUrl}/RENAMENX-${Key}?NewKey=${NewKey}`)


export default Opt;
// export { streamKey, setKey, stringKey, listKey, hashKey, zSetKey }
export { setKey, streamKey, stringKey, listKey, hashKey, zSetKey }
export { streamKey as xKey, listKey as lKey, hashKey as hKey, zSetKey as zKey }
export { Opt, OptDefaults, OptionClass }
export { newApi }