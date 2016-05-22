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