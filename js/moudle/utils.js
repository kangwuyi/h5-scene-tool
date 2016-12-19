var kcool = {};
var iPT   = kcool.isParameterType;

kcool.utils = {
	/**
	 *
	 * @param func
	 * @param context
	 * @param argCount
	 * @returns {*}
	 */
	optimizeCb: function (func, context, argCount) {
		if (context === void 0) return func;
		switch (argCount == null ? 3 : argCount) {
			case 1:
				return function (value) {
					return func.call(context, value);
				};
			// The 2-parameter case has been omitted only because no current consumers
			// made use of it.
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
	},
	/**
	 *
	 * @param obj
	 * @param iteratee
	 * @param context
	 * @returns {*}
	 */
	forEach   : function (obj, iteratee, context) {
		iteratee = this.optimizeCb(iteratee, context);
		var i, length;
		if (iPT.isArrayLength(obj)) {
			for (i = 0, length = obj.length; i < length; i++) {
				iteratee(obj[i], i, obj);
			}
		} else {
			var keys = iPT.isHasName(obj);
			for (i = 0, length = keys.length; i < length; i++) {
				iteratee(obj[keys[i]], keys[i], obj);
			}
		}
		return obj;
	},
	/**
	 *
	 * @param obj
	 * @param iteratee
	 * @param context
	 * @returns {*}
	 */
	map       : function (obj, iteratee, context) {
		iteratee    = this.optimizeCb(iteratee, context);
		var keys    = !iPT.isArrayLength(obj) && _.keys(obj),
				length  = (keys || obj).length,
				results = Array(length);
		for (var index = 0; index < length; index++) {
			var currentKey = keys ? keys[index] : index;
			results[index] = iteratee(obj[currentKey], currentKey, obj);
		}
		return results;
	},
	/**
	 * for 循环的变形
	 * (2).两个参数：number、function
	 * (2).三个参数：number、number、function
	 * @param parameter_1
	 * @param parameter_2
	 * @param parameter_3
	 */
	loop      : function (parameter_1, parameter_2, parameter_3) {
		var start, end, callbackFunc;
		if (parameter_3) {
			start        = iPT.isNumber(parameter_1);
			end          = iPT.isNumber(parameter_2);
			callbackFunc = iPT.isFunction(parameter_3);
		} else {
			start        = 0;
			end          = iPT.isNumber(parameter_1);
			callbackFunc = iPT.isFunction(parameter_2);
		}

		for (; start !== end; ++start) {
			callbackFunc(start);
		}
	},
	/**
	 * 根据函数字符串调用函数
	 * @param funcStr
	 * @returns {*}
	 */
	call      : function (funcStr) {
		return new Function("return " + funcStr)().apply(null, Array.prototype.slice.call(arguments, 1));
		// 或者用 eval(funcStr+"()"); //funcStr()函数
	},

	/**
	 * 函数版with
	 * @param call
	 * @param func
	 * @returns {*}
	 */
	callWith: function (call, func) {
		return call(func);
	},

	/**
	 * 递归
	 * @param func
	 * @returns {*}
	 */
	recursion: function (func) {
		func.apply(null, Array.prototype.slice.call(arguments, 1));
		return func;
	}
};

/**
 * 知识点：
 * (1).
 * 【
 * slice 方法：
 * arrayObj.slice(start, [end]) 参数开始索引和结束索引，结束索引可以省略。
 * call 方法：
 * call([thisObj[,arg1[, arg2[,   [,.argN]]]]]) 。调用一个对象的一个方法，以另一个对象替换当前对象（thisObj：可选项。将被用作当前对象的对象。 arg1, arg2, , argN：可选项。将被传递方法参数序列）。
 * 】
 * Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组，除了IE下的节点集合（因为ie下的dom对象是以com对象的形式实现的，js对象与com对象不能进行转换）。
 */
