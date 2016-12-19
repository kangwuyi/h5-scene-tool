// 函数递归调用
_.recursion = function (func) {
    return func.apply(null, Array.prototype.slice.call(arguments, 1));
};
//循环调用函数
_.loop = function (arg1, arg2, arg3) {
    var start, end, func;
    if (arg3) {
        func = arg3;
        start = arg1;
        end = arg2;
        if (start >= end) {
            console.log("arg1>arg2---false!")
            return false;
        }
    }
    else {
        func = arg2;
        start = 0;
        end = arg1;
    }
    for (; start !== end; ++start) {
        func(start);
    }
};
// 定义自动对象
_.defineObjectProperty = function (obj, arg1, arg2) {
    _.wrap(function (name,arg) {
            arg = arg || {};
            var val = arg.value,
                write = arg.set;
            val !== undefined && write(val);

            Object.defineProperty(obj, name, {
                enumerable: true,
                get: function () {
                    return val;
                },
                set: function (tVal) {
                    val = write ?
                        (
                            _.isUndefined(write(tVal))
                                ? tVal
                                : write(tVal)
                        )
                        : tVal;
                }
            });
        }, function (def) {
            def(arg1,arg2);
        }
    )()
};
_.merge = function (dest, src, redefine) {
    if (!dest) {
        throw new TypeError('argument dest is required')
    }

    if (!src) {
        throw new TypeError('argument src is required')
    }

    if (redefine === undefined) {
        // Default to true
        redefine = true
    }

    Object.getOwnPropertyNames(src).forEach(function forEachOwnPropertyName(name) {
        if (!redefine && hasOwnProperty.call(dest, name)) {
            // Skip desriptor
            return
        }

        // Copy descriptor
        var descriptor = Object.getOwnPropertyDescriptor(src, name);
        Object.defineProperty(dest, name, descriptor);
    });

    return dest
};
_.isWindow= function ( obj ){
    if(typeof obj !== "object") return false;//必须是一个对象
    var expando = "dom"+(new Date-0) //生成一个随机变量名
//全局解析代码，IE的eval只对原作用域有效
//详见http://www.javaeye.com/topic/519098
//加之eval与with是 html5严格模式下要禁止的东西，弃之不用！
    var js = document.createElement("script");
    var head = document.getElementsByTagName("head")[0];
    head.insertBefore(js,head.firstChild);
    js.text = expando + " = {};"
    head.removeChild(js)
    return window[expando] === obj[expando]
}
// 根据函数字符串调用函数
function call( funcStr ) {
    return new Function( "return " + funcStr )().apply( null, Array.prototype.slice.call( arguments, 1 ) );
}
_.str = s;
_.str.splitCharacter = function (tupleName, list) {
    return tupleName + "(" + list.join(",") + ")";
};