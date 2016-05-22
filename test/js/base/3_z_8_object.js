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