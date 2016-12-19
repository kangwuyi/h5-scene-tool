var kcool = {};

// 版本号码
kcool.VERSION = '0.0.1';




// Is a given object a finite number?
/*
 最后，附个转成数组的通用函数

 复制代码
 1 var toArray = function(s){
 2     try{
 3         return Array.prototype.slice.call(s);
 4     } catch(e){
 5             var arr = [];
 6             for(var i = 0,len = s.length; i < len; i++){
 7                 //arr.push(s[i]);
 arr[i] = s[i];  //据说这样比push快
 8             }
 9              return arr;
 10     }
 11 }
 */



kcool.untils          = {





// 生成一个区间
	range: function (arg1, arg2) {
		return collect(function (push) {
			arg2 === undefined ? loop(arg1, push) : loop(arg1, arg2, push);
		});
	},

// 遍历
	foreach: function (array, block, start) {
		var retVal;
		for (var i = start || 0, len = array.length; i < len; ++i) {
			if (( retVal = block(array[i], i) ) !== undefined) {
				return retVal;
			}
		}
	},

// set或get顶
	top: function (array, val) {
		if (val === undefined) {
			return array[array.length - 1];
		}
		else {
			array[array.length - 1] = val;
		}
	},

// 从数组中移除项,返回新数组
	remove: function (arr, predicate) {
		var retVal = [];
		foreach(arr, function (item) {
			!predicate(item) && retVal.push(item);
		});
		return retVal;
	},

// 过滤,remove的逆向操作
	filter: function (arr, predicate) {
		var retVal = [];
		foreach(arr, function (item) {
			predicate(item) && retVal.push(item);
		});
		return retVal;
	},

// 从原数组中移除项
	removeOut: function (arr, predicate) {
		var removeIndex = [], count = 0;
		foreach(arr, function (item, i) {
			predicate(item) && removeIndex.push(i);
		});
		foreach(removeIndex, function (index) {
			arr.splice(index - count++, 1);
		});
	},

// 映射
	map: function (arg, mapping) {
		var retVal = [];
		foreach(arg, function (item, i) {
			retVal.push(mapping(item, i));
		});
		return retVal;
	},

// 判断是否包含元素
	contains: function (arr, predicate) {
		for (var i = 0, len = arr.length; i !== len; ++i) {
			if (predicate(arr[i])) {
				return true;
			}
		}
		return false;
	},

// 逆转数组,返回新数组
	reverse: function (arr) {
		var len    = arr.length - 1,
				retVal = len === -1 ? [] : new Array(len);

		foreach(arr, function (item, i) {
			retVal[len - i] = item;
		});

		return retVal;
	},

// 缝合多个数组
	zip: function (arr) {
		var retVal = [];
		loop(arr[0].length, function (i) {
			foreach(arr, function (list) {
				retVal.push(list[i]);
			});
		});
		return retVal;
	},

// 归约
	reduce: function (arr, func) {
		if (arr.length === 1) {
			return arr[0];
		}

		var retVal = func(arr[0], arr[1]);
		for (var i = 2, len = arr.length; i < len; ++i) {
			retVal = func(retVal, arr[i]);
		}
		return retVal;
	},

// 寻找第一个符合条件的项
	findFirst: function (arr, predicate) {
		return foreach(arr, function (item) {
			if (predicate(item)) {
				return item;
			}
		});
	},

// 根据遍历,收集一个数组
	collect: function (block) {
		var retVal = [];
		block(function (val) {
			retVal.push(val);
		});
		return retVal;
	},

// 连接,主要用于处理arguments
	concat: function () {
		var retVal = [];
		foreach(arguments, function (arr) {
			foreach(arr, function (item) {
				retVal.push(item);
			});
		});
		return retVal;
	},

// 将数组应用到函数上
	apply: function (func) {
		return function (arg) {
			return func.apply(null, arg);
		};
	}
};