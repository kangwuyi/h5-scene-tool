_.string = {
// 遍历字符串
    foreach: function (string, func) {
        var i, len;
        for (i = 0, len = string.length; i !== len; ++i) {
            func(string.charAt(i));
        }
    },

// 将一个元组转化为字符串
    tuple: function (tupleName, list) {
        return tupleName + "(" + list.join(",") + ")";
    },

// 驼峰连接
    camelcaseJoin: function (list) {
        var result = "";
        _.each(list, function (unit) {
            result += result === "" ? unit : unit.replace(/(.)/, function () {
                return RegExp.$1.toUpperCase();
            });
        });
        return result;
    }
};