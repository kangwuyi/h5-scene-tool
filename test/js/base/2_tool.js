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
