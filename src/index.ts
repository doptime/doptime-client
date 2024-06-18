import axios, { Axios, ResponseType } from "axios";
import RequestOptions, { Option, configure, setDefaultSUToken } from "./Option"
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
export const urlGet = (cmd = urlGetCmd.HGET, Key: string, Field: string = "", opt: RequestOptions = Option) => {
    var url = `${opt.baseUrl}/${cmd}-!${Key}${opt.paramString()}?F=${encodeURIComponent(Field)}`;
    return url
}
export const time = (opt: RequestOptions = Option.withDataSource("default")) =>
    Req(opt).get(`${opt.baseUrl}/TIME-!null${opt.paramString()}?t=${new Date().getTime()}`)

export const scan = (Cursor: number, Match: string, Count = 4096, opt: RequestOptions = Option) =>
    Req(opt).get(`${opt.baseUrl}/SCAN-!null${opt.paramString()}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)

export const keys = (Pattern: string, opt: RequestOptions = Option) =>
    Req(opt).get(`${opt.baseUrl}/KEYS-!null${opt.paramString()}?Pattern=${Pattern}`)

export const type = (Key: string, opt: RequestOptions = Option) =>
    Req(opt).get(`${opt.baseUrl}/TYPE-!${Key}${opt.paramString()}`)
export const del = (Key: string, opt: RequestOptions = Option) =>
    Req(opt).delete(`${opt.baseUrl}/DEL-!${Key}${opt.paramString()}`)
export const exists = (Key: string, opt: RequestOptions = Option) =>
    Req(opt).get(`${opt.baseUrl}/EXISTS-!${Key}${opt.paramString()}`)
export const expire = (Key: string, Seconds: number, opt: RequestOptions = Option) =>
    Req(opt).put(`${opt.baseUrl}/EXPIRE-!${Key}${opt.paramString()}?Seconds=${Seconds}`)
export const expireAt = (Key: string, Timestamp: number, opt: RequestOptions = Option) =>
    Req(opt).put(`${opt.baseUrl}/EXPIREAT-!${Key}${opt.paramString()}?Timestamp=${Timestamp}`)
export const persist = (Key: string, opt: RequestOptions = Option) =>
    Req(opt).put(`${opt.baseUrl}/PERSIST-!${Key}${opt.paramString()}`)
export const ttl = (Key: string, opt: RequestOptions = Option) =>
    Req(opt).get(`${opt.baseUrl}/TTL-!${Key}${opt.paramString()}`)
export const pttl = (Key: string, opt: RequestOptions = Option) =>
    Req(opt).get(`${opt.baseUrl}/PTTL-!${Key}${opt.paramString()}`)
export const rename = (Key: string, NewKey: string, opt: RequestOptions = Option) =>
    Req(opt).put(`${opt.baseUrl}/RENAME-!${Key}${opt.paramString()}?NewKey=${NewKey}`)
export const renamenx = (Key: string, NewKey: string, opt: RequestOptions = Option) =>
    Req(opt).put(`${opt.baseUrl}/RENAMENX-!${Key}${opt.paramString()}?NewKey=${NewKey}`)


export default configure;
export { streamKey, setKey, stringKey, listKey, hashKey, sortedSetKey }
export { setDefaultSUToken }
export { Option, RequestOptions as OptionClass }
export { newApi }