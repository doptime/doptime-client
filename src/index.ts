import axios, { Axios, ResponseType } from "axios";
import OptionClass, { Option, configure, setDefaultSUToken } from "./Option"
import Req from "./http"
import streamKey from "./streamKey"
import setKey from "./setKeys"
import stringKey from "./stringKey"
import listKey from "./listKey"
import hashKey from "./hashkey"
import sortedSetKey from "./sortedSetKey"
import newApi from "./api"
var msgpack = require('@ygoe/msgpack');

export const msgpackDecode = (data: any) => msgpack.decode(data);


//const Url = "https://jp.voiceofai.cc"
// all functions should have a commands & key , seperated by "-!"
// other parameters should be key-value pairs, seperated by "~", and key always 2chars
export enum urlGetCmd { HEXISTS = "HEXISTS", GET = "GET", HGET = "HGET", HGETALL = "HGETALL", HMGET = "HMGET" }
export const urlGet = (cmd = urlGetCmd.HGET, Key: string, Field: string = "", opt: OptionClass = Option) => {
    var url = `${opt.Urlbase}/${cmd}-!${Key}${opt.paramString()}?F=${encodeURIComponent(Field)}`;
    return url
}
export const time = (opt: OptionClass = Option.withDataSource("default")) =>
    Req(opt).get(`${opt.Urlbase}/TIME-!null${opt.paramString()}?t=${new Date().getTime()}`)

export const scan = (Cursor: number, Match: string, Count = 4096, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase}/SCAN-!null${opt.paramString()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)

export const type = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase}/TYPE-!${Key}${opt.paramString()}`)
export const del = (Key: string, opt: OptionClass = Option) =>
    Req(opt).delete(`${opt.Urlbase}/DEL-!${Key}${opt.paramString()}`)
export const exists = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase}/EXISTS-!${Key}${opt.paramString()}`)
export const expire = (Key: string, Seconds: number, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase}/EXPIRE-!${Key}${opt.paramString()}?Seconds=${Seconds}`)
export const expireAt = (Key: string, Timestamp: number, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase}/EXPIREAT-!${Key}${opt.paramString()}?Timestamp=${Timestamp}`)
export const persist = (Key: string, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase}/PERSIST-!${Key}${opt.paramString()}`)
export const ttl = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase}/TTL-!${Key}${opt.paramString()}`)
export const pttl = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase}/PTTL-!${Key}${opt.paramString()}`)
export const keys = (Pattern: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.Urlbase}/KEYS-!null${opt.paramString()}?Pattern=${Pattern}`)
export const rename = (Key: string, NewKey: string, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase}/RENAME-!${Key}${opt.paramString()}?NewKey=${NewKey}`)
export const renamenx = (Key: string, NewKey: string, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.Urlbase}/RENAMENX-!${Key}${opt.paramString()}?NewKey=${NewKey}`)


export default configure;
export { streamKey, setKey, stringKey, listKey, hashKey, sortedSetKey }
export { setDefaultSUToken }
export { Option, OptionClass }
export { newApi }