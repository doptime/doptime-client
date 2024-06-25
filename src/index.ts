import axios, { Axios, ResponseType } from "axios";
import OptionClass, { Option } from "./Option"
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
// all functions should have a commands & key , seperated by "-"
// other parameters should be key-value pairs, seperated by "~", and key always 2chars
export enum urlGetCmd { HEXISTS = "HEXISTS", GET = "GET", HGET = "HGET", HGETALL = "HGETALL", HMGET = "HMGET" }
export const urlGet = (cmd = urlGetCmd.HGET, Key: string, Field: string = "", opt: OptionClass = Option) => {
    var url = `${opt.baseUrl}/${cmd}-${Key}?f=${encodeURIComponent(Field)}`;
    return url
}
export const time = (opt: OptionClass = Option.setDataSource("default")) =>
    Req(opt).get(`${opt.baseUrl}/TIME-null?t=${new Date().getTime()}`)

export const scan = (Cursor: number, Match: string, Count = 4096, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.baseUrl}/SCAN-null?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)

export const keys = (Pattern: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.baseUrl}/KEYS-null?Pattern=${Pattern}`)

export const type = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.baseUrl}/TYPE-${Key}`)
export const del = (Key: string, opt: OptionClass = Option) =>
    Req(opt).delete(`${opt.baseUrl}/DEL-${Key}`)
export const exists = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.baseUrl}/EXISTS-${Key}`)
export const expire = (Key: string, Seconds: number, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.baseUrl}/EXPIRE-${Key}?Seconds=${Seconds}`)
export const expireAt = (Key: string, Timestamp: number, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.baseUrl}/EXPIREAT-${Key}?Timestamp=${Timestamp}`)
export const persist = (Key: string, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.baseUrl}/PERSIST-${Key}`)
export const ttl = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.baseUrl}/TTL-${Key}`)
export const pttl = (Key: string, opt: OptionClass = Option) =>
    Req(opt).get(`${opt.baseUrl}/PTTL-${Key}`)
export const rename = (Key: string, NewKey: string, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.baseUrl}/RENAME-${Key}?NewKey=${NewKey}`)
export const renamenx = (Key: string, NewKey: string, opt: OptionClass = Option) =>
    Req(opt).put(`${opt.baseUrl}/RENAMENX-${Key}?NewKey=${NewKey}`)


export default Option;
export { streamKey, setKey, stringKey, listKey, hashKey, sortedSetKey }
export { Option, OptionClass }
export { newApi }