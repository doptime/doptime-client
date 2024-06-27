"use strict";
var Key = /** @class */ (function () {
    function Key(key) {
        this.key = key;
        this.key = key;
        this.concatedKey = "";
    }
    Key.prototype.cat = function (subKey) {
        if (!subKey)
            return;
        this.concatedKey = "".concat(this.key, ":").concat(subKey);
    };
    Key.prototype.getkey = function () {
        var retkey = this.concatedKey || this.key;
        if (!!this.concatedKey) {
            this.concatedKey = "";
        }
        return retkey;
    };
    return Key;
}());
