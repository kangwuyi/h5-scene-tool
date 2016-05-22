_k.cookiesMap = {};
_k.forEach(document.cookie.split(";"), function (item) {
    var keyAndValueInArray                      = item.split("=");
    _k.cookiesMap[keyAndValueInArray[0].trim()] = keyAndValueInArray[1];
});
/**
 * 获取COOKIE
 * @param key
 * @returns {*}
 */
_k.getCookie = function (key) {
    return _k.cookiesMap[key];
};