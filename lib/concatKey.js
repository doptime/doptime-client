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
function concatKey(keyType, key, dataSchema) {
    var fields = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        fields[_i - 3] = arguments[_i];
    }
    var newKey = __spreadArray([key], fields, true).filter(function (v) { return !!v; }).join(":");
    var newInstance = new keyType(newKey);
    newInstance.dataSchema = dataSchema;
    return newInstance;
}
exports.default = concatKey;
