"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keyClass = /** @class */ (function () {
    function keyClass(key) {
        this.key = key;
        this.key = key;
        this.concatedKey = "";
    }
    keyClass.prototype.cat = function (subKey) {
        if (!subKey)
            return;
        this.concatedKey = "".concat(this.key, ":").concat(subKey);
    };
    keyClass.prototype.getkey = function () {
        var retkey = this.concatedKey || this.key;
        if (!!this.concatedKey) {
            this.concatedKey = "";
        }
        return retkey;
    };
    return keyClass;
}());
exports.default = keyClass;
