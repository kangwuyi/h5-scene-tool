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
