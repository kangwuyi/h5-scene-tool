var _k = {
    /**
     * 判断是否是 Arguments
     * @param parameter
     * @returns {boolean}
     */
    isArguments  : function (parameter) {
        return toString.call(parameter) === '[object Arguments]';
    },
    /**
     * 判断是否是 Number
     * @param parameter
     * @returns {boolean}
     */
    isNumber     : function (parameter) {
        return toString.call(parameter) === '[object Number]';
    },
    /**
     * 判断是否是 String
     * @param parameter
     * @returns {boolean}
     */
    isString     : function (parameter) {
        return toString.call(parameter) === '[object String]';
    },
    /**
     * 判断是否是 Date
     * @param parameter
     * @returns {boolean}
     */
    isDate       : function (parameter) {
        return toString.call(parameter) === '[object Date]';
    },
    /**
     * 判断是否是 RegExp
     * @param parameter
     * @returns {boolean}
     */
    isRegExp     : function (parameter) {
        return toString.call(parameter) === '[object RegExp]';
    },
    /**
     * 判断是否是 Error
     * @param parameter
     * @returns {boolean}
     */
    isError      : function (parameter) {
        return toString.call(parameter) === '[object Error]';
    },
    /**
     * 判断是否是 Symbol
     * @param parameter
     * @returns {boolean}
     */
    isSymbol     : function (parameter) {
        return toString.call(parameter) === '[object Symbol]';
    },
    /**
     * 判断是否是 Map
     * @param parameter
     * @returns {boolean}
     */
    isMap        : function (parameter) {
        return toString.call(parameter) === '[object Map]';
    },
    /**
     * 判断是否是 WeakMap
     * @param parameter
     * @returns {boolean}
     */
    isWeakMap    : function (parameter) {
        return toString.call(parameter) === '[object WeakMap]';
    },
    /**
     * 判断是否是 Set
     * @param parameter
     * @returns {boolean}
     */
    isSet        : function (parameter) {
        return toString.call(parameter) === '[object Set]';
    },
    /**
     * 判断是否是 WeakSet
     * @param parameter
     * @returns {boolean}
     */
    isWeakSet    : function (parameter) {
        return toString.call(parameter) === '[object WeakSet]';
    },
    /**
     * 判断是否是 Array
     * @param parameter
     * @returns {boolean}
     */
    isArray      : function (parameter) {
        if (Array.isArray) {
            return Array.isArray(parameter);
        }
        return toString.call(parameter) === '[object Array]';
    },
    /**
     * 检查对象是否具有某属性
     * @param objectParameter
     * @param attributeName
     * @returns {boolean|*}
     */
    isHas        : function (objectParameter, attributeName) {
        return objectParameter != null && hasOwnProperty.call(objectParameter, attributeName);
    },
    /**
     * 获取对象的所有属性并放在数组中
     * @param objectParameter
     * @returns {Array}
     */
    isHasName    : function (objectParameter) {
        if (!this.isObject(objectParameter)) return [];
        if (Object.keys) {
            return Object.keys(objectParameter);
        }
        var attributeNameArray = [];
        for (var attributeName in objectParameter) {
            if (this.isHas(objectParameter, attributeName)) {
                attributeNameArray.push(attributeName);
            }
        }
        return attributeNameArray;
    },
    /**
     * 判断数据类型是否为 object
     * @param parameter
     * @returns {boolean}
     */
    isObject     : function (parameter) {
        var parameterType = typeof parameter;
        return parameterType === 'function' || parameterType === 'object' && !!parameter;
    },
    /**
     * // Is a given array, string, or object empty?
     // An "empty" object has no enumerable own-properties.
     * @param parameter
     * @returns {boolean}
     */
    isEmpty      : function (parameter) {
        if (parameter == null) return true;
        if (isArrayLike(parameter) && (this.isArray(parameter) || this.isString(parameter) || this.isArguments(parameter))) return parameter.length === 0;
        return this.isHasName(parameter).length === 0;
    },
    /**
     * 判断数据类型是否为 Function
     * @param parameter
     */
    isFunction   : function (parameter) {
        if (Object.prototype.toString.call(parameter) === '[object Function]') {
            return parameter;
        } else {
            console.log('parameter is no function ====> ' + parameter);
            return false;
        }
    },
    /**
     * 给对象添加属性
     * @param parameter
     * @returns {Function}
     */
    isAddProperty: function (parameter) {
        return function (objectParameter) {
            return objectParameter == null ? void 0 : objectParameter[parameter];
        }
    },
    /**
     * 判断是否具有 length 属性
     * @param parameter
     * @returns {boolean}
     */
    isArrayLength: function (parameter) {
        var length = this.isAddProperty('length')(parameter);
        return typeof length == 'number' && length >= 0 && length <= (Math.pow(2, 8) - 1);
    },
    /**
     * 是否是一个 dom 事件
     * @param parameter
     * @returns {boolean}
     */
    isElement    : function (parameter) {
        return !!(parameter && parameter.nodeType === 1);
    },
    /**
     * 是否是 Finite
     * @param parameter
     * @returns {boolean}
     */
    isFinite     : function (parameter) {
        return !this.isSymbol(parameter) && this.isFinite(parameter) && !this.isNaN(parseFloat(parameter));
    },
    /**
     * 是否是 NaN
     * @param parameter
     * @returns {boolean|*}
     */
    isNaN        : function (parameter) {
        return this.isNaN(parameter) && this.isNumber(parameter);
    },
    /**
     * 是否是 Boolean
     * @param parameter
     * @returns {boolean}
     */
    isBoolean    : function (parameter) {
        return parameter === true || parameter === false || toString.call(parameter) === '[object Boolean]';
    },
    /**
     * 是否是 Null
     * @param parameter
     * @returns {boolean}
     */
    isNull       : function (parameter) {
        return parameter === null;
    },
    /**
     * 是否是 Undefined
     * @param parameter
     * @returns {boolean}
     */
    isUndefined  : function (parameter) {
        return parameter === void 0;
    }
};

/**
 * 浏览器检测（Device/OS detection）
 * @param deviceFnc
 * @returns {{osType: (string|string|string), osName: (string|string|string|string|string), osVersion: (*|string), isWeiXin: (boolean|*), iswebView: (boolean|Array|{index: number, input: string}|*), support: {canTouch: (boolean|*), msPointer: *}}}
 */
function deviceDetection(deviceFnc) {
    var device = deviceFnc(navigator.userAgent, navigator.appVersion, navigator.platform);

    switch (true) {
        case device.android.length > 1:
            device.osType    = 'android';
            device.osName    = 'android';
            device.osVersion = device.android[2];
            break;
        case device.ios === true:
            device.osType = 'ios';
            switch (true) {
                case device.iphone.length > 1:
                    device.osVersion = device.iphone[2].replace(/_/g, '.');
                    device.osName    = 'iphone';
                    if (screen.height === 480) {
                        document.documentElement.classList.add("iphone4");
                    } else if (screen.height === 568) {
                        document.documentElement.classList.add("iphone5");
                    } else if (screen.height > 568) {
                        document.documentElement.classList.add("iphone6+");
                    }
                    break;
                case device.ipad.length > 1:
                    device.osVersion = device.ipad[2].replace(/_/g, '.');
                    device.osName    = 'ipad';
                    break;
                case device.ipod.length > 1:
                    device.osVersion = device.ipod[3] ? _this.ipod[3].replace(/_/g, '.') : null;
                    device.osName    = 'ipod';
                    break;
                default:
                    device.osVersion = 'undefined';
                    device.osName    = 'undefined';
            }
            // iOS 8+ changed UA
            if (device.ios && device.osVersion && navigator.userAgent.indexOf('Version/') >= 0) {
                if (device.osVersion.split('.')[0] === '10') {
                    device.osVersion = navigator.userAgent.toLowerCase().split('version/')[1].split(' ')[0];
                }
            }
            break;
        default:
            device.osType = 'undefined';
    }

    device.win32 && document.documentElement.classList.add("win32");

    if (device.osType !== 'undefined') {
        device.classNames.push(device.osType, device.osType + '-' + device.osVersion.split('.')[0], device.osType + '-' + device.osVersion.replace(/\./g, '-'));
        if (device.osType === 'ios') {
            var major = parseInt(device.osVersion.split('.')[0], 10);
            for (var i = major - 1; i >= 6; i--) {
                device.classNames.push('ios-gt-' + i);
            }
        }

    }
    device.classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio));
    if (device.pixelRatio >= 2) {
        device.classNames.push('retina');
    }
    if (device.classNames.length > 0) {
        for (var indexs = 0; indexs < device.classNames.length; indexs++) {
            document.documentElement.classList.add(device.classNames[indexs]);
        }
    }
    return {
        osType   : device.osType,
        osName   : device.osName,
        osVersion: device.osVersion,
        isWeiXin : device.MicroMessenger,
        //webview
        iswebView: (device.iphone || device.ipad || device.ipod) && navigator.userAgent.match(/.*AppleWebKit(?!.*Safari)/i) || false,
        support  : {
            // 触摸
            canTouch : device.canTouch,
            msPointer: device.msPointer
        }
    };
}
_k.deviceOs = deviceDetection(function (userAgent, appVersion, platform) {
    return {
        // win系列
        win32         : platform === "Win32",
        ie            : !!window.ActiveXObject || "ActiveXObject" in window,
        ieVersion     : Math.floor((/MSIE ([^;]+)/.exec(userAgent) || [0, "0"])[1]),
        // ios系列
        ios           : (/iphone|ipad|ipod/gi).test(appVersion),
        ipad          : userAgent.match(/(iPad).*OS\s([\d_]+)/) || false,
        ipod          : userAgent.match(/(iPod)(.*OS\s([\d_]+))?/) || false,
        iphone        : (!userAgent.match(/(iPad).*OS\s([\d_]+)/) && userAgent.match(/(iPhone\sOS)\s([\d_]+)/)) || false,
        safari        : /Version\//gi.test(appVersion) && /Safari/gi.test(appVersion),
        uiWebView     : /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent),
        // 安卓系列
        android       : userAgent.match(/(Android);?[\s\/]+([\d.]+)?/) || false,
        androidChrome : userAgent.toLowerCase().indexOf('chrome') >= 0,
        // chrome
        chrome        : /Chrome/gi.test(userAgent),
        chromeVersion : parseInt(( /Chrome\/([0-9]*)/gi.exec(userAgent) || [0, 0] )[1], 10),
        // 内核
        webkit        : /AppleWebKit/.test(appVersion),
        // 其他浏览器
        uc            : appVersion.indexOf("UCBrowser") !== -1,
        Browser       : / Browser/gi.test(appVersion),
        MiuiBrowser   : /MiuiBrowser/gi.test(appVersion),
        // 微信
        MicroMessenger: userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger",
        // pixelRatio
        pixelRatio    : window.devicePixelRatio || 1,
        // 触摸
        canTouch      : "ontouchstart" in document,
        msPointer     : window.navigator.msPointerEnabled,
        // 方法内用到的对象
        classNames    : [],
        osType        : '',
        osName        : '',
        osVersion     : [],
        mi4           : /Mi 4LTE/gi.test(navigator.userAgent)
    }
});

_k.optimizeCb = function (func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
        case 1:
            return function (value) {
                return func.call(context, value);
            };
        case 3:
            return function (value, index, collection) {
                return func.call(context, value, index, collection);
            };
        case 4:
            return function (accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
    }
    return function () {
        return func.apply(context, arguments);
    };
};


/**
 * 遍历
 * @param parameter
 * @param iteratee
 * @param context
 * @returns {*}
 * *
 * 测试
 var arr = [1, 2, 3];
 console.log(this);
 var newArr =_.forEach(arr,function(item){
    console.log(this);
    return item*3;
},arr);
 var arr = [1, 2, 3];
 console.log(this);
 var newArr =_.forEach(arr,function(item){
    console.log(this);
    return item*3;
});
 */
_k.forEach = function (parameter, iteratee, context) {
    if (context) {
        iteratee = _k.optimizeCb(iteratee, context);
    }
    var i,
        length;
    switch (true) {
        case _k.isString(parameter):
            /**
             * 遍历字符串（Traversal Sring）
             */
            for (i = 0, length = parameter.length; i !== length; ++i) {
                iteratee(parameter.charAt(i));
            }
            break;
        case _k.isArray(parameter):
            /**
             * 遍历数组（Traversal Array）
             */
            for (i = 0, length = parameter.length; i < length; i++) {
                iteratee(parameter[i], i, parameter);
            }
            break;
        case _k.isObject(parameter):
            /**
             * 遍历对象（Traversal Object）
             */
            var keys = _k.isHasName(parameter);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(parameter[keys[i]], keys[i], parameter);
            }
            break;
        default:
            console.error('forEach err !');
    }
};
// 根据函数字符串调用函数
_k.callFunctionByString = function (funcStr) {
    return new Function("return " + funcStr)().apply(null, _k.argumentsToArray(arguments, 1));
};
// 函数版with
_k.callFunctionByWith   = function (call, func) {
    return call(func);
};
/*
 * 两者的区别： 对于apply和call两者在作用上是相同的，但两者在参数上有区别的。
 对于第一个参数意义都一样，但对第二个参数：
 apply传入的是一个参数数组，也就是将多个参数组合成为一个数组传入，而call则作为call的参数传入（从第二个参数开始）。
 如 func.call(func1,var1,var2,var3)对应的apply写法为：func.apply(func1,[var1,var2,var3])
 同时使用apply的好处是可以直接将当前函数的arguments对象作为apply的第二个参数传入
 var a={length:2,0:'first',1:'second'};//类数组,有length属性，长度为2，第0个是first，第1个是second
 console.log(Array.prototype.slice.call(a,0));// ["first", "second"],调用数组的slice(0);
 var a={length:2,0:'first',1:'second'};
 console.log(Array.prototype.slice.call(a,1));//["second"]，调用数组的slice(1);
 var a={0:'first',1:'second'};//去掉length属性，返回一个空数组
 console.log(Array.prototype.slice.call(a,0));//[]

 function test(){
 console.log(Array.prototype.slice.call(arguments,0));//["a", "b", "c"]，slice(0)
 console.log(Array.prototype.slice.call(arguments,1));//["b", "c"],slice(1)
 }
 test("a","b","c");
 */
_k.recursion = function (func) {
    func.apply(null, _k.argumentsToArray(arguments, 1));
    return func;
};
/**
 * 函数containsAll可以检查一个字符串中是否包含若干个子串，例如：containsAll("banana", "b", "nan")返回true，
 * @param string
 * @returns {boolean}
 */
_k.containsAll = function (string) {
    _k.forEach(_k.argumentsToArray(arguments, 1), function (item) {
        if (string.indexOf(item) === -1) {
            return false;
        }
    });
    return true;
};

/**
 *
 * @param func
 * @param context
 * @returns {*}
 */
_k.bind = function bind(func, context) {
    var bound,
        args;
    var ctor = new Function;
    // 如果原生支持，就用原生的.bind()
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, _k.argumentsToArray(arguments, 1));

    // 如果没有传入function参数，抛出异常
    if (!_k.isFunction(func)) throw new TypeError;

    // 支持绑定 function 和 context 后面的参数 (所以用 .slice(2))
    args = argumentsToArray(arguments, 2);

    // 返回绑定后的函数
    return bound = function () {

        // 如果没有用new关键字，(this instanceof bound)就为假
        // 此时为正常的调用 bound()，bound 函数中的 `this` 和 arguments
        // 都已经绑定，传入参数，直接调用函数就可以了。
        if (!(this instanceof bound)) return func.apply(context, args.concat(_k.argumentsToArray(arguments)));

        // 如果使用了new关键字，`new bound()`
        // (this instanceof bound)为真，此时模拟函数的构造函数
        // (JavaScript中通过 new 关键字方式调用的函数都被认为是构造函数。)
        // 具体步骤就是：创建一个对象A，将A的prototype指向原函数的prototype
        // 执行原函数
        // 如果原函数没有显式的return一个对象，则隐式的返回A对象的实例
        ctor.prototype = func.prototype;

        // ctor是空函数，不进行任何操作
        // 只创建一个实例对象
        var self = new ctor;

        // 用这个新创建的实例作为 `this` 调用原函数，并传入相应的参数
        // 原函数作为新实例的构造函数执行
        var result = func.apply(self, args.concat(slice.call(arguments)));

        // 执行的结果是 object 就返回，不是的话返回这个实例对象
        // 因为标准规定 `new xxx` 操作必须返回对象
        if (Object(result) === result) return result;
        return self;
    };
};
//+ 无限参数的方法
/**
 *
 * @param string
 * @returns {string}
 * test
 * format("And the %1 want to know whose %2 you %3", "papers", "shirt", "wear");
 */
_k.formatString = function (string) {
    var args    = arguments;
    var pattern = new RegExp("%([1-" + arguments.length + "])", "g");
    return String(string).replace(pattern, function (match, index) {
        return args[index];
    });
};

/**
 * arguments转化成数组
 * @param arguments
 * @param indexes
 * Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组，除了IE下的节点集合（因为ie下的dom对象是以com对象的形式实现的，js对象与com对象不能进行转换）
 */
_k.argumentsToArray = function (arguments, indexes) {
    if (indexes) {
        return Array.prototype.slice.call(arguments, indexes);
    } else {
        return Array.prototype.slice.call(arguments);
    }
};
/**
 * function 创建模板事例
 * @returns {Function}
 *
 * test：
 var majorTom = makeFunc(formatString, "dfg,%1");
 majorTom('dddd');
 */
_k.makeFunc = function () {
    var args = _k.argumentsToArray(arguments),
        func = args.shift();//用于把数组的第一个元素从其中删除，并返回第一个元素的值。
    return function () {
        return func.apply(null, _k.arrayUnique(args.concat(_k.argumentsToArray(arguments))));
    };
};


/**
 * 定时器执行函数（timers to execute function）
 * @param fn
 * @param times
 * @param delay
 * @returns {Function}
 *
 Arguments.callee包括了一个函数的引用去创建一个argument对象
 Arguments.callee方法能让一个匿名函数很方便的指向本身

 test:
 var timersToExecuteFunctionCache = timersToExecuteFunction(formatString, 3, 2000);
 timersToExecuteFunctionCache("dfg,%1", 'ddddfdsf');
 */
_k.timersToExecuteFunction = function (fn, times, delay) {
    return function () {
        if (times >= 0) {
            fn.apply(null, arguments);
            var args = _k.argumentsToArray(arguments);
            var self = arguments.callee;//arguments.callee方法从变量self去获取一个引用
            setTimeout(function () {
                self.apply(null, args)
            }, delay);
        }
    };
};

/**
 * 将多个对象的字段加入到第一个字段中,并返回第一个对象
 * @param outObj
 * @param inObjList
 * @returns {*}
 */
_k.merge = function x(outObj, inObjList) {
    _k.forEach(inObjList, function (obj) {
        _k.forEach(obj, function (key, value) {
            if (value !== undefined) {
                _k.isObject(value) && _k.isObject(outObj[key]) ? _k.insert(outObj[key], value) : outObj[key] = value;
            }
        });
    });
    return outObj;
};

/**
 * 将若干个对象合并到第一个对象中,并返回第一个对象
 * @param obj
 * @returns {*}
 * test:
 * console.log(_k.insert({a:'aa'},{b:'bb'},{c:'cc'}));
 * {a: "aa", bb: "b", cc: "c"}
 */
_k.insert = function (obj) {
    return _k.merge(obj, _k.argumentsToArray(arguments, 1));
};

/**
 * 将若干个对象合并,返回合并后的新对象
 * @returns {*}
 */
_k.extend = function () {
    var retVal = {};
    return _k.merge(retVal, arguments);
};
/**
 * 定义自动对象
 * @param obj
 * @param arg1
 * @param arg2
 var wrapper = {};
 console.log(_k.defineAutoProperty(wrapper, "background", {
            value : "signString",
            set : function ( value ) {
                return value;
            }
        }));
 console.log(wrapper)
 */
_k.defineAutoProperty = function (obj, arg1, arg2) {
    _k.callFunctionByWith(function (def) {
        _k.isString(arg1) ? def(arg1, arg2) : _k.forEach(arg1, def);
    }, function (name, arg) {
        arg       = arg || {};
        var val   = arg.value,
            write = arg.set;
        val !== undefined && write(val);

        Object.defineProperty(obj, name, {
            enumerable: true,
            get       : function () {
                return val;
            },
            set       : function (tVal) {
                val = write ? (write(tVal) === undefined ? tVal : write(tVal)) : tVal;
            }
        });
    });
};

/**
 * 从obj中移除字段,返回移除后的新对象
 * @param obj
 * @param fieldList
 * @returns {{}}
 */
_k.exclude = function ( obj, fieldList ) {
    // 集合,根据一个数组构建一个集合,用来判断一个key是否属于集合
    function collection( arr ) {
        var dict = {};
        array.foreach( arr, function ( item ) {
            dict[item] = true;
        } );

        return {
            contains : function ( key ) {
                return dict[key] === true;
            }
        };
    }
    var fieldSet = collection( fieldList ),
        retVal = {};

    foreach( obj, function ( key, value ) {
        !fieldSet.contains( key ) && ( retVal[key] = value );
    } );

    return retVal;
};
/**
 * 数组去重复
 * @param arr
 * @returns {Array}
 */
_k.arrayUnique = function (arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
};


/**
 * 根据遍历,收集一个数组
 * @param func
 * @param identification
 * @returns {*}
 *
 * 默认收集数组
 */
_k.collect = function (func) {
    var retVal = [];
    func(function (val) {
        retVal.push(val);
    });
    return retVal;
};
/**
 * 收集对象
 * @param func
 * @returns {{}}
 */
_k.collect.prototype.object = function (func) {
    // 仍需要扩展才行
    var obj = {};
    func(function (key, value) {
        obj[key] = value;
    });
    return obj;
};
/**
 * 生成一个数组区间
 * @param arg1
 * @param arg2
 * @returns {*}
 *
 * test:
 * _k.creatArrayRange(2,9)  //[2,3,4,5,6,7,8]
 * _k.creatArrayRange(9)    //[0, 1, 2, 3, 4, 5, 6, 7, 8]
 */
_k.creatArrayRange = function (arg1, arg2) {
    function loop(arg1, arg2, arg3) {
        var start, end, block;
        if (arg3) {
            block = arg3;
            start = arg1;
            end   = arg2;
        } else {
            block = arg2;
            start = 0;
            end   = arg1;
        }
        for (; start !== end; ++start) {
            block(start);
        }
    }

    return _k.collect(function (func) {
        arg2 === undefined ? loop(arg1, func) : loop(arg1, arg2, func);
    });
};
/**
 * 返回数组最后一个元素或者更新数组最后一个元素然后返回数组
 * @param array
 * @param val
 * @returns {*}
 */
_k.arrayBackLast = function (array, val) {
    if (val === undefined) {
        return array[array.length - 1];
    } else {
        array[array.length - 1] = val;
        return array;
    }
};
/**
 * 滤波器，从数组中移除具有相应属性的项,返回新数组，可通过回调函数灵活应变
 * @param arr
 * @param callback
 * @returns {Array}
 * test:
 * _k.arrayFilter([{name:'kk',age:34},{age:34}],function ( obj ) {
 *   return !!obj.name;  //删除具有name属性的对象 [{age:34}]
 *  //return !obj.name;  //删除不具有name属性的对象 [{name:'kk',age:34}]
 * })
 */
_k.arrayFilter = function (arr, callback) {
    var retVal = [];
    _k.forEach(arr, function (item) {
        !callback(item) && retVal.push(item);
    });
    return retVal;
};

/*// 选中元素的位置，待商榷
 _k.arraySelectIndex = function (arr, callback) {
 var removeIndex = [], count = 0;
 foreach(arr, function (item, i) {
 callback(item) && removeIndex.push(i);
 });
 foreach(removeIndex, function (index) {
 arr.splice(index - count++, 1);
 });
 };*/

/**
 * 映射，将回调函数中执行的结果一一对应到数组中相应的位置
 * @param arg
 * @param callback
 * @returns {Array}
 * test:
 * console.log(_k.map( [1,2,3,4], function ( value ) {return value ===4;} ))
 * [false, false, false, true]
 */
_k.map = function (arg, callback) {
    var retVal = [];
    _k.forEach(arg, function (item, i) {
        retVal.push(callback(item, i));
    });
    return retVal;
};

/**
 * 判断是否包含元素
 * @param arr
 * @param callback
 * @returns {boolean}
 * test:
 * console.log(_k.contains( [1,2,3,4], function ( value ) {return value ===4;} ))
 * true
 */
_k.contains = function (arr, callback) {
    for (var i = 0, len = arr.length; i !== len; ++i) {
        if (callback(arr[i])) {
            return true;
        }
    }
    return false;
};
/**
 * 逆转数组,返回新数组
 * @param arr
 * @returns {Array}
 * test:
 * console.log(_k.reverse([1,2,6,8]));
 * [8, 6, 2, 1]
 */
_k.reverse = function (arr) {
    var len    = arr.length - 1,
        retVal = (len === -1) ? [] : new Array(len);
    _k.forEach(arr, function (item, i) {
        retVal[len - i] = item;
    });
    return retVal;
};
/**
 * 缝合多个数组
 * @param arr
 * @returns {Array}
 * test:
 * console.log(_k.concat([1,2],[3,5],[6,8]));
 * [1, 2, 3, 5, 6, 8]
 */
_k.concat = function (arr) {
    var retVal = [];
    var args   = _k.argumentsToArray(arguments);
    for (var i = 0; i < args.length; i++) {
        _k.forEach(args[i], function (list) {
            retVal.push(list);
        });
    }
    return retVal;
};

/**
 * 归约
 * @param arr
 * @param func
 * @returns {*}
 */
_k.reduce = function (arr, func) {
    if (arr.length === 1) {
        return arr[0];
    }
    var retVal = func(arr[0], arr[1]);
    for (var i = 2, len = arr.length; i < len; ++i) {
        retVal = func(retVal, arr[i]);
    }
    return retVal;
};

/**
 * 将数组应用到函数上
 * @param func
 * @returns {Function}
 * test:
 * console.log(_k.arrayApply(function ( x ) {return arguments;})([1,2,3]));
 * [1, 2, 3]
 */
_k.arrayApply = function (func) {
    return function (arg) {
        return func.apply(null, arg);
    };
};
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
/**
 * 链表
 * @returns {{head: head, tail: tail, insert: insert, remove: remove}}
 */
_k.linkedList = function () {
    var head = null,
        tail = null;

    function remove(node) {
        if (node.inserted === true) {
            node.previous ? node.previous.next = node.next : head = node.next;
            node.next ? node.next.previous = node.previous : tail = node.previous;
            node.inserted = false;
        }
    }

    return {
        head  : function () {
            return head;
        },
        tail  : function () {
            return tail;
        },
        insert: function (tarNode, refNode) {
            if (tarNode === refNode) {
                return;
            }
            remove(tarNode);
            var previous     = refNode ? refNode.previous : tail;
            tarNode.next     = refNode;
            tarNode.previous = previous;
            previous ? previous.next = tarNode : head = tarNode;
            refNode ? refNode.previous = tarNode : tail = tarNode;
            tarNode.inserted = true;
            return tarNode;
        },
        remove: remove
    };
};

/**
 * 迭代,从begin到end,默认end是null,可指定迭代方向
 * @param begin
 * @param arg2
 * @param arg3
 * @param arg4
 * @returns {*}
 */
_k.iterate = function (begin, arg2, arg3, arg4) {
    var end,
        block,
        reverse,
        cur,
        retVal;
    if (_k.isFunction(arg2)) {
        end     = null;
        block   = arg2;
        reverse = arg3;
    } else {
        end     = arg2;
        block   = arg3;
        reverse = arg4;
    }

    for (cur = begin; cur !== end; cur = reverse ? cur.previous : cur.next) {
        if (( retVal = block(cur) ) !== undefined) {
            return retVal;
        }
    }
};


/**
 * 事件,使用regist注册任务,在trig时会触发
 * @returns {{trigger: trigger, regist: regist}}
 * @constructor
 */
_k.event = function () {
    var events = _k.linkedList();

    return {
        trigger: function () {
            for (var cur = events.head(); cur !== null; cur = cur.next) {
                cur.apply(null, arguments);
            }
        },
        regist : function (response) {
            var node = events.insert(response, null);
            return {
                func  : response,
                remove: function () {
                    events.remove(node);
                }
            };
        }
    };
};
/**
 * 并发执行多个任务,在所有任务完成后回调
 * @param taskArray
 * @param callback
 * test:
 console.log(_k.doCallbackByTasksDone([
 function (callback) {
                var done  = 2;
                callback(done);
            },
 function (callback) {
                var done  = 3;
                callback(done);
            }], function (result, err) {
            if (err) {
                console.log('result is: ');
            }
            console.log('result is: ');
            console.log(result)
        }));
 result is:
 [2, 3]
 */
_k.doCallbackByTasksDone = function (taskArray, callback) {
    var count  = taskArray.length,
        result = {
            done : [],
            error: []
        };
    if (!callback) {
        console.log('缺少回调函数')
    }
    count === 0 ? callback(result.done, result.error) : _k.forEach(taskArray, function (task) {
        task(function (done, error) {
            if (error) {
                result.done.push('no result');
                result.error.push(error);
                callback(result.done, result.error);
            }
            result.done.push(done);
            (--count === 0) && callback(result.done);
        });
    });
};

// 等待者
_k.Waiter = function (task) {
    var completeEvent = Event();

    task(function () {
        if (completeEvent) {
            completeEvent.trigger();
            completeEvent = null;
        }
    });

    return {
        onComplete: function (callback) {
            if (completeEvent) {
                return completeEvent.regist(callback);
            }
            else {
                callback && callback();
                return {
                    remove: function () {
                    }
                };
            }
        },
        cancel    : function () {
            completeEvent = null;
        }
    };
};

// 加载者,调用时加载,仅加载一次
_k.Loader = function (loadFunc) {
    var waiter;

    return {
        load: function (callback) {
            if (!waiter) {
                waiter = Waiter(loadFunc);
            }

            return waiter.onComplete(callback);
        }
    };
};


// 日程
_k.Schedule = function () {
    var task = null, start = false;

    return {
        prepare: function (target) {
            task = target;
            start && task();
        },
        start  : function () {
            task && task();
            start = true;
        }
    };
};

// 多种触发,一次触发,解除所有
_k.once = function (task, regist) {
    var handles = regist(function () {
        task();
        array.foreach(handles, function (handle) {
            handle.remove();
        });
    });
};

// setTimeout的remove版
_k.setTimeout = function (task, duration) {
    var handle = window.setTimeout(task, duration);

    return {
        remove: function () {
            window.clearTimeout(handle);
        }
    };
};

// 轮询
_k.polling = function (getter, callback, timeout) {
    var handle;
    func.recursion(function wait() {
        if (getter()) {
            callback();
        }
        else {
            handle = setTimeout(wait, timeout || 100);
        }
    });

    return {
        remove: function () {
            handle && clearTimeout(handle);
        }
    };
};
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

