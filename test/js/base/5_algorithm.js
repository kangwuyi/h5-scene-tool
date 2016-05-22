/**
 * base64
 * @param parameter
 * @returns {{decode: decode, encode: encode}}
 */
_k.base64 = function (parameter) {

    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var code     = [];
    for (var index = 0; index < alphabet.length; index++) {
        code[alphabet.charCodeAt(index)] = index;
    }
    return {
        decode: function () {
            if(_k.isString(parameter)){
                console.log('no string');
                return false;
            }
            var str          = parameter.replace(/[^A-Za-z0-9\+\/\=]/g, ""),
                stringLength = str.length;
            while (str.charAt(stringLength - 1) === "=") {
                stringLength--;
            }
            var result = new Uint8Array((stringLength / 4 * 3) << 0);
            for (var stringOffset = 0, byteOffset = 0; stringOffset < stringLength; stringOffset += 4, byteOffset += 3) {
                stringOffset + 1 < stringLength && (result[byteOffset + 0] = ((code[str.charCodeAt(stringOffset + 0)] & 0x3F) << 2) | ((code[str.charCodeAt(stringOffset + 1)] & 0x30) >> 4));
                stringOffset + 2 < stringLength && (result[byteOffset + 1] = ((code[str.charCodeAt(stringOffset + 1)] & 0x0F) << 4) | ((code[str.charCodeAt(stringOffset + 2)] & 0x3C) >> 2));
                stringOffset + 3 < stringLength && (result[byteOffset + 2] = ((code[str.charCodeAt(stringOffset + 2)] & 0x03) << 6) | ((code[str.charCodeAt(stringOffset + 3)] & 0x3F) << 0));
            }
            return result;
        },
        encode: function () {
            if(_k.isObject(parameter)){
                console.log('no object');
                return false;
            }
            var arr        = parameter,
                byteLength = arr.byteLength,
                result     = "";
            for (var byteOffset = 0; byteOffset < byteLength; byteOffset += 3) {
                result += alphabet.charAt((arr[byteOffset] & 0xFC) >> 2);
                result += alphabet.charAt(((arr[byteOffset] & 0x03) << 4) | (byteOffset + 1 < byteLength ? (arr[byteOffset + 1] & 0xF0) >> 4 : 0x00));
                result += byteOffset + 1 < byteLength ? alphabet.charAt(((arr[byteOffset + 1] & 0x0F) << 2) | (byteOffset + 2 < byteLength ? (arr[byteOffset + 2] & 0xC0) >> 6 : 0x00)) : "=";
                result += byteOffset + 2 < byteLength ? alphabet.charAt((arr[byteOffset + 2] & 0x3F) << 0) : "=";
            }
            return result;
        }
    }
};

