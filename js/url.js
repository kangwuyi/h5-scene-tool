_.url = {
// 将相对地址转换为绝对地址
    toAbsolute: function (url) {
        var a = document.createElement('a');
        a.href = url;
        return a.href;
    },

// 将对象转化问URI字符串
    encodeObject: function (obj) {
        var retVal = "", i = 0;
        _.each(obj || {}, function (value, key) {
            if (value !== undefined) {
                i++ && ( retVal += "&" );
                retVal += encodeURIComponent(key);
                retVal += '=';
                retVal += encodeURIComponent(value);
            }
        });
        return retVal;
    },

// 解析配对连接字符串,如name=tom&class=2&grade=3
    parsePairString: function (str, split1, split2, doPair) {
        _.each(str.split(split1), function (searchPair) {
            var keyValue = searchPair.split(split2);
            doPair(keyValue[0], keyValue[1]);
        });
    },

// 为字符串提供url解析功能
    regUrl: /(?:((?:[^:/]*):)\/\/)?([^:/?#]*)(?::([0-9]*))?(\/[^?#]*)?(\?[^#]*)?(#.*)?/,

    URL: function (str) {
        if (_.url.regUrl.test(str)) {
            this.protocol = RegExp.$1;
            this.hostname = RegExp.$2;
            this.port = RegExp.$3;
            this.pathname = RegExp.$4;
            this.search = RegExp.$5;
            this.hash = RegExp.$6;
        }
    },


    parse: function (str) {
        return new this.URL(str);
    },

    concatArg: function (url, arg) {
        url = this.parse(url);
        var newSearch = this.encodeObject(_.omit(_.extend(url.arg, arg), _.isUndefined));
        return url.origin + url.pathname + ( newSearch ? "?" : "" ) + newSearch + url.hash;
    },

    removeArg: function (url, argNameList) {
        url = this.parse(url);
        var newSearch = this.encodeObject(_.pick(url.arg, function (value, key) {
            return _.has(argNameList, key);
        }));
        return url.origin + url.pathname + ( newSearch ? "?" : "" ) + newSearch + url.hash;
    }
};
//noinspection JSUnusedGlobalSymbols
_.url.URL.prototype.inspect = _.url.URL.prototype.valueOf = _.url.URL.prototype.toString = _.url.URL.prototype.toJSON = function () {
    return this.href;
};

Object.defineProperties(_.url.URL.prototype, {
    href: {
        get: function () {
            return this.origin + this.pathname + this.search + this.hash;
        }
    },
    host: {
        get: function () {
            return this.hostname + ( this.port ? ":" + this.port : "" );
        }
    },
    origin: {
        get: function () {
            return this.protocol ? this.protocol + "//" + this.host : this.host;
        }
    },
    arg: {
        get: function () {
            var arg = {};
            _.url.parsePairString(this.search.substring(1), "&", "=", function (key, value) {
                key !== "" && ( arg[key] = decodeURIComponent(value) );
            });
            return arg;
        }
    }
});