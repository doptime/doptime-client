
// Import doptime-client
import { Option, newApi, hashKey, listKey, setKey, streamKey, stringKey, zSetKey } from "doptime-client";

// Initialize API with service name
const api = newApi("serviceName", { in: { "param": "value" }, out: { "param": "value" } });
// Example API call
api({ inputData: "value" }).then(callback);


const callback = (response: any) => console.log(response);

// HashKey operations supported: hExists, hSet, hGet, hDel, hGetAll, hVals, hKeys, hRandField, hMGet, hMSet, hIncrBy, hIncrByFloat, hScan
const hash = new hashKey("hashKeyName");
hash.hSet("field", { data: "value" }).then(callback);
hash.hGet("field").then(callback);
//other hash operations:

// ListKey operations supported: lPush, lRange, lPop, lIndex, lInsert, lLen, lRem, lTrim, lSet, lGet, lGetSet, lPopPush
const list = new listKey("listKeyName");
list.lPush({ data: "value" }).then(callback);
list.lRange(0, 10).then(callback);

// SetKey operations, supported: sAdd, sCard, sDiff, sInter, sIsMember, sMembers, sPop, sRandMember, sRem, sUnion
const set = new setKey("setKeyName");
set.sIsMember("member").then(callback);

// StreamKey operations, supported: xAdd, xLen, xRange, xRead, xReadGroup, xTrim
const stream = new streamKey("streamKeyName");
stream.xAdd("key", "id", { data: "value" }).then(callback);

// StringKey operations, supported: set, get, append, getRange, setRange, getSet, incr, incrBy, incrByFloat, decr, decrBy
const string = new stringKey("stringKeyName");
string.set("field", "value").then(callback);
string.get("field").then(callback);

// ZSetKey operations, supported: zAdd, zCard, zCount, zIncrBy, zInterStore, zRange, zRangeByScore, zRank, zRem, zRevRange, zRevRangeByScore, zRevRank, zScore, zUnionStore
const zSet = new zSetKey("zSetKeyName");
zSet.zAdd(1, "member").then(callback);
zSet.zRange(0, 10).then(callback);

// Global options
Option.Defaults({ urlBase: "http://example.com", token: "yourToken" });