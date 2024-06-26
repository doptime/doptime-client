"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcatKey = void 0;
var ConcatKey = function (key, fields) {
    var r = __spreadArray([key], fields, true).filter(function (v) { return !!v; }).join(":");
    return r;
};
exports.ConcatKey = ConcatKey;
