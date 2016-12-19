var kcool = {};

kcool.isParameterType = {
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
		return _.keys(parameter).length === 0;
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