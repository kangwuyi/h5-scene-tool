/**
 * url序列化
 * @param str
 * @returns {URL}
 * test:
 * console.log(new URL('http://zhidao.baidu.com/link?url=NVgk9HGmhaHaHFQ-20Scw9gtAonrEEms1JNRhPj0smvtQA3SdrU0M1fs_dtwT7EC926PsYZ6s64RTPCPpFe9xa'))
 * URL {href: "http://zhidao.baidu.com/link?url=NVgk9HGmhaHaHFQ-2…Pj0smvtQA3SdrU0M1fs_dtwT7EC926PsYZ6s64RTPCPpFe9xa", origin: "http://zhidao.baidu.com", protocol: "http:", username: "", password: ""…}hash: ""host: "zhidao.baidu.com"hostname: "zhidao.baidu.com"href: "http://zhidao.baidu.com/link?url=NVgk9HGmhaHaHFQ-20Scw9gtAonrEEms1JNRhPj0smvtQA3SdrU0M1fs_dtwT7EC926PsYZ6s64RTPCPpFe9xa"origin: "http://zhidao.baidu.com"password: ""pathname: "/link"port: ""protocol: "http:"search: "?url=NVgk9HGmhaHaHFQ-20Scw9gtAonrEEms1JNRhPj0smvtQA3SdrU0M1fs_dtwT7EC926PsYZ6s64RTPCPpFe9xa"username: ""__proto__: URLconstructor: URL()hash: (...)get hash: ()set hash: ()host: (...)get host: ()set host: ()hostname: (...)get hostname: ()set hostname: ()href: (...)get href: ()set href: ()origin: (...)get origin: ()password: (...)get password: ()set password: ()pathname: (...)get pathname: ()set pathname: ()port: (...)get port: ()set port: ()protocol: (...)get protocol: ()set protocol: ()search: (...)get search: ()set search: ()toString: toString()username: (...)get username: ()set username: ()Symbol(Symbol.toStringTag): "URL"__proto__: Object
 */
_k.urlParse = function urlParse(str) {
    return new URL(str);
};

/**
 * 将相对地址转换为绝对地址
 * @param url
 * @returns {*}
 */
_k.urlToAbsolute = function (url) {
    var a  = document.createElement('a');
    a.href = url;
    return a.href;
};


/**
 * 将对象转化问URI字符串
 * @param obj
 * @returns {string}
 */
_k.urlEncodeObject = function (obj) {
    var retVal = "", i = 0;
    _k.forEach(obj || {}, function (key, value) {
        if (value !== undefined) {
            i++ && ( retVal += "&" );
            retVal += encodeURIComponent(key);
            retVal += '=';
            retVal += encodeURIComponent(value);
        }
    });
    return retVal;
};

/**
 * 解析配对连接字符串,如name=tom&class=2&grade=3
 * @param str
 * @param split1
 * @param split2
 * @param callback
 */
_k.parsePairString = function (str, split1, split2, callback) {
    _k.forEach(str.split(split1), function (searchPair) {
        var keyValue = searchPair.split(split2);
        callback(keyValue[0], keyValue[1]);
    });
};

_k.concatArg = function (url, arg) {
    url           = _k.urlParse(url);
    var newSearch = _k.urlEncodeObject(_k.extend(url.arg, arg));
    return url.origin + url.pathname + ( newSearch ? "?" : "" ) + newSearch + url.hash;
};

_k.removeArg = function (url, argNameList) {
    url           = _k.urlParse(url);
    var newSearch = _k.urlEncodeObject(_k.exclude(url.arg, argNameList));
    return url.origin + url.pathname + ( newSearch ? "?" : "" ) + newSearch + url.hash;
};

_k.URL = function (str) {
    // 为字符串提供url解析功能
    var regUrl = /(?:((?:[^:/]*):)\/\/)?([^:/?#]*)(?::([0-9]*))?(\/[^?#]*)?(\?[^#]*)?(#.*)?/;
    if (regUrl.test(str)) {
        this.protocol = RegExp.$1;
        this.hostname = RegExp.$2;
        this.port     = RegExp.$3;
        this.pathname = RegExp.$4;
        this.search   = RegExp.$5;
        this.hash     = RegExp.$6;
    }
};

URL.prototype.inspect = URL.prototype.valueOf = URL.prototype.toString = URL.prototype.toJSON = function () {
    return this.href;
};

Object.defineProperties(URL.prototype, {
    href  : {
        get: function () {
            return this.origin + this.pathname + this.search + this.hash;
        }
    },
    host  : {
        get: function () {
            return this.hostname + ( this.port ? ":" + this.port : "" );
        }
    },
    origin: {
        get: function () {
            return this.protocol ? this.protocol + "//" + this.host : this.host;
        }
    },
    arg   : {
        get: function () {
            var arg = {};
            _k.parsePairString(this.search.substring(1), "&", "=", function (key, value) {
                key !== "" && ( arg[key] = decodeURIComponent(value) );
            });
            return arg;
        }
    }
});

_k.checkUrl = function (str_url) {// 验证url
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    return re.test(str_url);
};

/**
 * ajax
 * @param options
 * @param callback
 * @returns {XMLHttpRequest}
 * test:
 if (err) {
            callback && callback(err);
        }
 else {
            try {
                var data = JSON.parse(xhr.responseText);
            }
            catch (e) {
                callback && callback(e);
                return;
            }

            if (data.code === 200) {
                callback && callback(null, data.data);
            }
            else {
                callback && callback(data);
            }
        }
 */
_k.request = function (options, callback) {
    if (!options.method || !(/POST|PUT|PATCH|DELETE|GET/gi).test(options.method)) {
        throw new Error('method error');
    }

    if (!options.url && !_k.checkUrl(options.url)) {
        throw new Error('url error');
    }


    if (options.data == null && (options.method === 'create' || options.method === 'update' || options.method === 'patch')) {
        if (_k.isObject(options.data)) {
            options.data = JSON.stringify(options.data);
        }
    }

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        callback && callback(null, xhr);
    };

    xhr.onerror = function (err) {
        callback && callback(err, xhr);
    };

    xhr.open(options.method, options.url, true);

    if (options.emulateJSON || false) {
        xhr.setRequestHeader('contentType', 'application/x-www-form-urlencoded');
        options.data        = options.data || {};
    }else{
        xhr.setRequestHeader('contentType', 'application/json');
    }

    if (options.method === 'PUT' || options.method === 'DELETE' || options.method === 'PATCH') {
        options.method     = 'POST';
        var beforeSend     = options.beforeSend;
        options.beforeSend = function (xhr) {
            xhr.setRequestHeader('X-HTTP-Method-Override', options.method);
            if (beforeSend) return beforeSend.apply(this, arguments);
        };
    }

    // 添加额外的 headers
    options.setHeader && _k.forEach(options.setHeader, function (key, value) {
        xhr.setRequestHeader(key, value);
    });

    options.responseType && ( xhr.responseType = options.responseType );

    xhr.send(options.data || null);

    return xhr;
};

