(function () {
	//noinspection JSUnusedLocalSymbols
	var library = function () {
			var count = 0;
			return function ( module ) {
				if ( Object.prototype.toString.call( module ) == "[object Function]" ) {
					library[count] = {};
					module();
				}
				else {
					library[count] = module;
				}
				++count;
			};
		}(),
		main = function ( func ) {
			func();
		},
		plugin = main;

	var firstpageScript = arguments.callee;
var iconMap = {
	"album":{"x":72,"y":398,"w":58,"h":58},
	"arrow/mi01":{"x":0,"y":0,"w":40,"h":64},
	"arrow/mi04":{"x":0,"y":68,"w":28,"h":44},
	"author/create":{"x":0,"y":82,"w":531,"h":78},
	"author/create-active":{"x":0,"y":0,"w":531,"h":78},
	"author/follow":{"x":0,"y":164,"w":172,"h":50},
	"author/following":{"x":176,"y":164,"w":172,"h":50},
	"comment":{"x":312,"y":150,"w":42,"h":42},
	"comment/close":{"x":0,"y":96,"w":35,"h":35},
	"comment/like":{"x":0,"y":0,"w":52,"h":44},
	"comment/liking":{"x":0,"y":48,"w":52,"h":44},
	"comment/reply":{"x":0,"y":136,"w":22,"h":20},
	"contact/frame":{"x":0,"y":0,"w":470,"h":90},
	"contact/title":{"x":0,"y":94,"w":470,"h":107},
	"edit-animate":{"x":86,"y":252,"w":70,"h":70},
	"image-not-found":{"x":0,"y":0,"w":365,"h":145},
	"like":{"x":158,"y":340,"w":38,"h":34},
	"loading-c":{"x":76,"y":336,"w":68,"h":68},
	"loading-new-page":{"x":160,"y":296,"w":40,"h":40},
	"loading-o":{"x":0,"y":338,"w":68,"h":68},
	"map/back":{"x":0,"y":82,"w":18,"h":31},
	"map/location":{"x":0,"y":0,"w":74,"h":78},
	"more":{"x":0,"y":410,"w":34,"h":6},
	"music":{"x":160,"y":252,"w":39,"h":39},
	"mv/play":{"x":0,"y":0,"w":168,"h":174},
	"powered-by":{"x":0,"y":204,"w":210,"h":44},
	"razzies/banner-center":{"x":0,"y":152,"w":20,"h":72},
	"razzies/banner-left":{"x":0,"y":0,"w":40,"h":72},
	"razzies/banner-right":{"x":0,"y":76,"w":40,"h":72},
	"refresh-arrow":{"x":264,"y":150,"w":44,"h":44},
	"signup/close":{"x":0,"y":0,"w":39,"h":39},
	"signup/star":{"x":0,"y":44,"w":9,"h":9},
	"tips-click-first":{"x":0,"y":252,"w":82,"h":82},
	"tips-push":{"x":158,"y":388,"w":34,"h":34},
	"tips-push-first":{"x":214,"y":204,"w":127,"h":230},
	"tips-scratch":{"x":0,"y":150,"w":260,"h":50},
	"video/close":{"x":0,"y":136,"w":50,"h":50},
	"video/play":{"x":0,"y":0,"w":132,"h":132}
};
var firstpageStyle = "*{padding:0;margin:0;outline:0;border:0;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-text-size-adjust:none;-webkit-touch-callout:none;-webkit-user-select:none}body{overflow:hidden}input,textarea{-webkit-user-select:text}.hidden,.hidden *{visibility:hidden !important}.lock,.lock *,.lock-children *{pointer-events:none !important}.scroll{overflow-y:scroll}.win32 .scroll{overflow-y:auto}.ios .scroll{-webkit-overflow-scrolling:touch}.ios .scroll>*{-webkit-transform:translateZ(0)}.msg-box{position:absolute;left:60px;right:60px;text-align:center;z-index:100000;visibility:hidden}.msg-box .msg{display:inline-block;opacity:0;font-size:12px;color:white;line-height:18px;padding:9px 15px;border-radius:5px;background-color:rgba(0,0,0,0.8);text-align:left}.msg-box.show{visibility:visible}.msg-box.show .msg{opacity:1}.msg-box.remove .msg{opacity:0;-webkit-transition:.15s}.tips{transition:.4s}.hide-tips .tips{-webkit-animation:none !important;transition:none;opacity:0}.hide-tips-fade .tips{-webkit-animation:none !important;opacity:0}.powered-by{-webkit-transition:.3s;-webkit-transform:translate3d(0,100%,0)}.last-page .powered-by{-webkit-transform:none}.last-page .tips.switch{-webkit-animation:none !important;opacity:0}.layout img{pointer-events:none}.win32 .layout img{pointer-events:auto}";
/**
 * Created by Zuobai on 2015/3/15.
 * 函数有关的函数
 */

library( function () {
	// 循环
	function loop( arg1, arg2, arg3 ) {
		var start, end, block;
		if ( arg3 ) {
			block = arg3;
			start = arg1;
			end = arg2;
		}
		else {
			block = arg2;
			start = 0;
			end = arg1;
		}

		for ( ; start !== end; ++start ) {
			block( start );
		}
	}

	// 根据函数字符串调用函数
	function call( funcStr ) {
		return new Function( "return " + funcStr )().apply( null, Array.prototype.slice.call( arguments, 1 ) );
	}

	// 函数版with
	function callWith( call, func ) {
		return call( func );
	}

	// 递归
	function recursion( func ) {
		func.apply( null, Array.prototype.slice.call( arguments, 1 ) );
		return func;
	}

	library["0"].loop = loop;
	library["0"].call = call;
	library["0"].callWith = callWith;
	library["0"].recursion = recursion;
} );

/**
 * Created by 白 on 2014/12/12.
 */

library( function () {
	var func =library["0"],
		loop = func.loop;

	// 生成一个区间
	function range( arg1, arg2 ) {
		return collect( function ( push ) {
			arg2 === undefined ? loop( arg1, push ) : loop( arg1, arg2, push );
		} );
	}

	// 遍历
	function foreach( array, block, start ) {
		var retVal;
		for ( var i = start || 0, len = array.length; i < len; ++i ) {
			if ( ( retVal = block( array[i], i ) ) !== undefined ) {
				return retVal;
			}
		}
	}

	// set或get顶
	function top( array, val ) {
		if ( val === undefined ) {
			return array[array.length - 1];
		}
		else {
			array[array.length - 1] = val;
		}
	}

	// 从数组中移除项,返回新数组
	function remove( arr, predicate ) {
		var retVal = [];
		foreach( arr, function ( item ) {
			!predicate( item ) && retVal.push( item );
		} );
		return retVal;
	}

	// 过滤,remove的逆向操作
	function filter( arr, predicate ) {
		var retVal = [];
		foreach( arr, function ( item ) {
			predicate( item ) && retVal.push( item );
		} );
		return retVal;
	}

	// 从原数组中移除项
	function removeOut( arr, predicate ) {
		var removeIndex = [], count = 0;
		foreach( arr, function ( item, i ) {
			predicate( item ) && removeIndex.push( i );
		} );
		foreach( removeIndex, function ( index ) {
			arr.splice( index - count++, 1 );
		} );
	}

	// 映射
	function map( arg, mapping ) {
		var retVal = [];
		foreach( arg, function ( item, i ) {
			retVal.push( mapping( item, i ) );
		} );
		return retVal;
	}

	// 判断是否包含元素
	function contains( arr, predicate ) {
		for ( var i = 0, len = arr.length; i !== len; ++i ) {
			if ( predicate( arr[i] ) ) {
				return true;
			}
		}
		return false;
	}

	// 逆转数组,返回新数组
	function reverse( arr ) {
		var len = arr.length - 1,
			retVal = len === -1 ? [] : new Array( len );

		foreach( arr, function ( item, i ) {
			retVal[len - i] = item;
		} );

		return retVal;
	}

	// 缝合多个数组
	function zip( arr ) {
		var retVal = [];
		loop( arr[0].length, function ( i ) {
			foreach( arr, function ( list ) {
				retVal.push( list[i] );
			} );
		} );
		return retVal;
	}

	// 归约
	function reduce( arr, func ) {
		if ( arr.length === 1 ) {
			return arr[0];
		}

		var retVal = func( arr[0], arr[1] );
		for ( var i = 2, len = arr.length; i < len; ++i ) {
			retVal = func( retVal, arr[i] );
		}
		return retVal;
	}

	// 寻找第一个符合条件的项
	function findFirst( arr, predicate ) {
		return foreach( arr, function ( item ) {
			if ( predicate( item ) ) {
				return item;
			}
		} );
	}

	// 根据遍历,收集一个数组
	function collect( block ) {
		var retVal = [];
		block( function ( val ) {
			retVal.push( val );
		} );
		return retVal;
	}

	// 连接,主要用于处理arguments
	function concat() {
		var retVal = [];
		foreach( arguments, function ( arr ) {
			foreach( arr, function ( item ) {
				retVal.push( item );
			} );
		} );
		return retVal;
	}

	// 将数组应用到函数上
	function apply( func ) {
		return function ( arg ) {
			return func.apply( null, arg );
		};
	}

	library["1"].range = range;
	library["1"].foreach = foreach;
	library["1"].top = top;
	library["1"].remove = remove;
	library["1"].removeOut = removeOut;
	library["1"].map = map;
	library["1"].reverse = reverse;
	library["1"].zip = zip;
	library["1"].contains = contains;
	library["1"].reduce = reduce;
	library["1"].findFirst = findFirst;
	library["1"].filter = filter;
	library["1"].collect = collect;
	library["1"].concat = concat;
	library["1"].apply = apply;
} );
/**
 * Created by Zuobai on 2015/3/15.
 * 对象有关的函数
 */

library( function () {
	var array =library["1"],
		func =library["0"];

	// 遍历对象
	function foreach( obj, block ) {
		var retVal;
		for ( var key in obj ) {
			if ( ( retVal = block( key, obj[key] ) !== undefined ) ) {
				return retVal;
			}
		}
	}

	// 收集
	function collect( func ) {
		var obj = {};
		func( function ( key, value ) {
			obj[key] = value;
		} );
		return obj;
	}

	// 默认值
	function defaultValue( val, defaultValue ) {
		return val === undefined ? defaultValue : val;
	}

	// 将多个对象的字段加入到第一个字段中,并返回第一个对象
	function merge( outObj, inObjList ) {
		array.foreach( inObjList, function ( obj ) {
			foreach( obj, function ( key, value ) {
				if ( value !== undefined ) {
					is.Object( value ) && is.Object( outObj[key] ) ? insert( outObj[key], value ) : outObj[key] = value;
				}
			} );
		} );
		return outObj;
	}

	// 将若干个对象合并到第一个对象中,并返回第一个对象
	function insert( obj ) {
		return merge( obj, Array.prototype.slice.call( arguments, 1 ) );
	}

	// 将若干个对象合并,返回合并后的新对象
	function extend() {
		var retVal = {};
		return merge( retVal, arguments );
	}

	// 从obj中取出defaultObj中的字段,如果obj中没有这个字段,使用defaultObj的值
	function extract( obj, defaultObj ) {
		var retVal = {};
		array.foreach( defaultObj, function ( key, val ) {
			retVal[key] = defaultValue( obj[key], val );
		} );
		return retVal;
	}

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

	// 返回一个字典的key数组
	function keys( obj ) {
		var retVal = [];
		foreach( obj, function ( key ) {
			retVal.push( key );
		} );
		return retVal;
	}

	// 从obj中移除字段,返回移除后的新对象
	function exclude( obj, fieldList ) {
		var fieldSet = collection( fieldList ),
			retVal = {};

		foreach( obj, function ( key, value ) {
			!fieldSet.contains( key ) && ( retVal[key] = value );
		} );

		return retVal;
	}

	// 对象的类型判断
	var is = (function () {
		var is = {};
		array.foreach( ["Array", "Boolean", "Date", "Function", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"], function ( typeName ) {
			is[typeName] = function ( obj ) {
				return Object.prototype.toString.call( obj ) == "[object " + typeName + "]";
			};
		} );
		return is;
	})();

	// 定义getter
	function defineGetter( obj, arg1, arg2 ) {
		func.callWith( function ( def ) {
			is.String( arg1 ) ? def( arg1, arg2 ) : foreach( arg1, def );
		}, function ( name, func ) {
			Object.defineProperty( obj, name, {
				enumerable : true,
				get : func
			} );
		} );
		return obj;
	}

	// 定义自动对象
	function defineAutoProperty( obj, arg1, arg2 ) {
		func.callWith( function ( def ) {
			is.String( arg1 ) ? def( arg1, arg2 ) : foreach( arg1, def );
		}, function ( name, arg ) {
			arg = arg || {};
			var val = arg.value, write = arg.set;
			val !== undefined && write( val );

			Object.defineProperty( obj, name, {
				enumerable : true,
				get : function () {
					return val;
				},
				set : function ( tVal ) {
					val = write ? defaultValue( write( tVal ), tVal ) : tVal;
				}
			} );
		} );
	}

	library["2"].foreach = foreach;
	library["2"].collect = collect;

	library["2"].defaultValue = defaultValue;
	library["2"].insert = insert;
	library["2"].extend = extend;
	library["2"].extract = extract;
	library["2"].exclude = exclude;

	library["2"].collection = collection;
	library["2"].keys = keys;

	library["2"].is = is;

	library["2"].defineGetter = defineGetter;
	library["2"].defineAutoProperty = defineAutoProperty;
} );

/**
 * Created by Zuobai on 2014/11/22.
 */

library( function () {
	var object =library["2"],
		is = object.is;

	// 链表
	function LinkedList() {
		var head = null, tail = null;

		function remove( node ) {
			if ( node.inserted === true ) {
				node.previous ? node.previous.next = node.next : head = node.next;
				node.next ? node.next.previous = node.previous : tail = node.previous;
				node.inserted = false;
			}
		}

		return {
			head : function () {
				return head;
			},
			tail : function () {
				return tail;
			},
			insert : function ( tarNode, refNode ) {
				if ( tarNode === refNode ) {
					return;
				}
				remove( tarNode );
				var previous = refNode ? refNode.previous : tail;
				tarNode.next = refNode;
				tarNode.previous = previous;
				previous ? previous.next = tarNode : head = tarNode;
				refNode ? refNode.previous = tarNode : tail = tarNode;
				tarNode.inserted = true;
				return tarNode;
			},
			remove : remove
		};
	}

	// 遍历
	function foreach( list, func ) {
		var retVal;
		for ( var cur = list.head(); cur !== null; cur = cur.next ) {
			if ( ( retVal = func( cur ) ) !== undefined ) {
				return retVal;
			}
		}
	}

	// 迭代,从begin到end,默认end是null,可指定迭代方向
	function iterate( begin, arg2, arg3, arg4 ) {
		var end, block, reverse, cur, retVal;
		if ( is.Function( arg2 ) ) {
			end = null;
			block = arg2;
			reverse = arg3;
		}
		else {
			end = arg2;
			block = arg3;
			reverse = arg4;
		}

		for ( cur = begin; cur !== end; cur = reverse ? cur.previous : cur.next ) {
			if ( ( retVal = block( cur ) ) !== undefined ) {
				return retVal;
			}
		}
	}

	function isBefore( node1, node2 ) {
		for ( ; node2 && node2 !== node1; node2 = node2.next ) {
		}
		return node2 === null;
	}

	library["3"] = LinkedList;
	LinkedList.foreach = foreach;
	LinkedList.iterate = iterate;
	LinkedList.isBefore = isBefore;
} );
/**
 * Created by 白 on 2015/2/25.
 * 封装经典异步需求
 */

library( function () {
	var array =library["1"],
		object =library["2"],
		func =library["0"],
		LinkedList =library["3"];

	// 空函数
	function empty() {
	}

	// 事件,使用regist注册任务,在trig时会触发
	function Event() {
		var events = LinkedList();

		return {
			trig : function () {
				for ( var cur = events.head(); cur !== null; cur = cur.next ) {
					cur.apply( null, arguments );
				}
			},
			regist : function ( response ) {
				var node = events.insert( response, null );
				return {
					func : response,
					remove : function () {
						events.remove( node );
					}
				};
			}
		};
	}


	// 流程,当一个步骤完成时,回调下一个步骤
	function sequence( steps, callback ) {
		callback && steps.push( callback );
		var len = steps.length;

		func.recursion( function call( i, arg ) {
			var func = steps[i];
			if ( func ) {
				func.apply( null, i === len - 1 ? arg : [function () {
					call( i + 1, Array.prototype.slice.call( arguments, 0 ) );
				}].concat( arg ) );
			}
		}, 0, [] );
	}

	// 并发执行多个任务,在所有任务完成后回调
	function concurrency( tasks, callback ) {
		var count = tasks.length;
		count === 0 ? callback && callback() : array.foreach( tasks, function ( task ) {
			task( function () {
				--count === 0 && callback && callback();
			} );
		} );
	}

	// 等待者
	function Waiter( task ) {
		var completeEvent = Event();

		task( function () {
			if ( completeEvent ) {
				completeEvent.trig();
				completeEvent = null;
			}
		} );

		return {
			onComplete : function ( callback ) {
				if ( completeEvent ) {
					return completeEvent.regist( callback );
				}
				else {
					callback && callback();
					return {
						remove : function () {
						}
					};
				}
			},
			cancel : function () {
				completeEvent = null;
			}
		};
	}

	// 加载者,调用时加载,仅加载一次
	function Loader( loadFunc ) {
		var waiter;

		return {
			load : function ( callback ) {
				if ( !waiter ) {
					waiter = Waiter( loadFunc );
				}

				return waiter.onComplete( callback );
			}
		};
	}

	// 继续,用于组合异步流程
	// 当一个步骤错误时,流程错误,不继续,若没有错误,则继续
	function GoOn( onError ) {
		return function ( stepDone, doErr ) {
			return function ( err, result ) {
				if ( err ) {
					onError && onError( doErr ? doErr( err ) : err );
				}
				else {
					stepDone && stepDone( result );
				}
			};
		};
	}

	// 统一两种形态的异步回调
	function Callback( callbackArg ) {
		var error, success;

		if ( object.is.Function( callbackArg ) ) {
			success = function () {
				Array.prototype.unshift.call( arguments, null );
				callbackArg.apply( null, arguments );
			};
			error = callbackArg;
		}
		else {
			callbackArg = callbackArg || {};
			success = callbackArg.onSuccess || empty;
			error = callbackArg.onError || empty;
		}

		return object.insert( callbackArg, {
			success : success,
			error : error
		} );
	}

	// 日程
	function Schedule() {
		var task = null, start = false;

		return {
			prepare : function ( target ) {
				task = target;
				start && task();
			},
			start : function () {
				task && task();
				start = true;
			}
		};
	}

	// 多种触发,一次触发,解除所有
	function once( task, regist ) {
		var handles = regist( function () {
			task();
			array.foreach( handles, function ( handle ) {
				handle.remove();
			} );
		} );
	}

	// setTimeout的remove版
	function setTimeout( task, duration ) {
		var handle = window.setTimeout( task, duration );

		return {
			remove : function () {
				window.clearTimeout( handle );
			}
		};
	}

	// 轮询
	function polling( getter, callback, timeout ) {
		var handle;
		func.recursion( function wait() {
			if ( getter() ) {
				callback();
			}
			else {
				handle = setTimeout( wait, timeout || 100 );
			}
		} );

		return {
			remove : function () {
				handle && clearTimeout( handle );
			}
		};
	}

	library["4"].Event = Event;
	library["4"].concurrency = concurrency;
	library["4"].sequence = sequence;
	library["4"].Waiter = Waiter;
	library["4"].Loader = Loader;
	library["4"].GoOn = GoOn;
	library["4"].Callback = Callback;
	library["4"].Schedule = Schedule;
	library["4"].once = once;
	library["4"].setTimeout = setTimeout;
	library["4"].polling = polling;
} );
/**
 * Created by 白 on 2014/12/12.
 */

library( function () {
	var array =library["1"];

	// 遍历字符串
	function foreach( string, func ) {
		var i, len;
		for ( i = 0, len = string.length; i !== len; ++i ) {
			func( string.charAt( i ) );
		}
	}

	// 将一个元组转化为字符串
	function tuple( tupleName, list ) {
		return tupleName + "(" + list.join( "," ) + ")";
	}

	// 驼峰连接
	function camelcaseJoin( list ) {
		var result = "";
		array.foreach( list, function ( unit ) {
			result += result === "" ? unit : unit.replace( /(.)/, function () {
				return RegExp.$1.toUpperCase();
			} );
		} );
		return result;
	}

	// 根据format制作字符串
	function format( format, content ) {
		var i = 0, ch, key = null, retVal = "";

		ch = format.charAt( i++ );
		while ( ch ) {
			if ( key === null ) {
				if ( ch === "%" ) {
					key = "";
				}
				else {
					retVal += ch;
				}
			}
			else {
				if ( ch === "%" ) {
					if ( key === "" ) {
						retVal += "%";
					}
					else {
						retVal += content[key] || "";
					}
					key = null;
				}
				else {
					key += ch;
				}
			}
			ch = format.charAt( i++ );
		}

		return retVal;
	}

	library["5"].foreach = foreach;
	library["5"].format = format;
	library["5"].tuple = tuple;
	library["5"].camelcaseJoin = camelcaseJoin;
} );
/**
 * Created by Zuobai on 2015/3/15.
 * 封装经典css操作
 */

library( function () {
	var object =library["2"],
		is = object.is,

		string =library["5"],
		tuple = string.tuple,

		array =library["1"],

		LinkedList =library["3"];

	// region css
	// 测试某个样式是否有效
	var test = function () {
		if ( window.CSS && CSS.supports ) {
			return function ( styleName, styleValue ) {
				return CSS.supports( styleName, styleValue );
			};
		}
		else {
			var testElement = document.createElement( "div" );

			return function ( styleName, styleValue ) {
				testElement.removeAttribute( "style" );
				testElement.style.setProperty( styleName, styleValue, "" );
				return testElement.hasAttribute( "style" );
			};
		}
	}();

	function testPrefix( styleName, styleValue ) {
		return array.findFirst( ["", "-webkit-", "-ms-", "-moz-", "-o-"], function ( prefix ) {
			return test( prefix + styleName, styleValue );
		} );
	}

	// 测试某个样式的样式名(找前缀)
	var testStyleName = function () {
		var prefix = "";

		return function ( styleName, styleValue ) {
			return ( prefix ? test( prefix + styleName, styleValue ) ? prefix : "" : ( prefix = testPrefix( styleName, styleValue ) ) ) + styleName;
		};
	}();

	// 设置样式
	function css( el, arg1, arg2 ) {
		function setStyle( styleName, styleValue ) {
			if ( styleValue == null ) {
				remove( el, styleName );
			}
			else {
				if ( is.Number( styleValue ) ) {
					styleValue = n( styleValue );
				}
				el.style.setProperty( testStyleName( styleName, styleValue ), styleValue, "" );
			}
		}

		is.String( arg1 ) ? setStyle( arg1, arg2 ) : object.foreach( arg1, setStyle );

		return {
			element : el,
			remove : function () {
				remove( el, arg1 );
			}
		};
	}

	// 生成CSS样式字符串
	function ruleString( cssStyles, noTest ) {
		var ruleText = "";
		object.foreach( cssStyles, function ( styleName, styleValue ) {
			ruleText += [noTest ? styleName : testStyleName( styleName, styleValue.toString().replace( "!important", "" ) ), ":", styleValue, ";"].join( "" );
		} );
		return ruleText;
	}

	// 移除CSS值,可以移除一条,或者移除一组
	function remove( el, arg ) {
		function removeStyle( styleName ) {
			array.foreach( ["", "-webkit-", "-ms-", "-moz-", "-o-"], function ( prefix ) {
				el.style.removeProperty( prefix + styleName );
			} );
		}

		is.String( arg ) ? removeStyle( arg ) : is.Object( arg ) ? object.foreach( arg, removeStyle ) : array.foreach( arg, removeStyle );
		return el;
	}

	// 添加CSS规则
	var insertCSSRule = function () {
		var userSheet = LinkedList(), systemSheet = LinkedList();
		return function ( ruleText, isSystem ) {
			var styleSheet = isSystem ? systemSheet : userSheet; // 选择样式链表

			// 如果节点尚未创建,创建节点,系统样式表在所有样式表的最前,用户样式表在所有样式表的最后
			if ( styleSheet.el === undefined ) {
				styleSheet.el = document.head.insertBefore( document.createElement( "style" ), isSystem ? document.head.firstChild : null );
			}

			// 创建新规则,位置上最后规则+1
			var lastRule = styleSheet.tail(),
				newRule = styleSheet.insert( {
					index : lastRule === null ? 0 : lastRule.index + 1
				} );

			styleSheet.el.sheet.insertRule( ruleText, newRule.index );

			return {
				remove : function () {
					// 后面所有元素的位置-1
					var pos = newRule.index;
					for ( var curNode = newRule.next; curNode !== null; curNode = curNode.next ) {
						curNode.index = pos++;
					}

					// 移除节点并删除规则
					styleSheet.remove( newRule );
					styleSheet.el.sheet.deleteRule( pos );
				}
			};
		}
	}();

	// 添加一组css规则
	function insertCSSRules( arg1, arg2, arg3 ) {
		function insertRules( selector, styles, isSystem ) {
			var cssText = is.String( styles ) ? styles : ruleString( styles, /^@/.test( selector ) );
			return insertCSSRule( selector + " {" + cssText + "}", isSystem );
		}

		if ( is.String( arg1 ) ) {
			return insertRules( arg1, arg2, arg3 );
		}
		else {
			var list = [];
			object.foreach( arg1, function ( selector, styles ) {
				list.push( insertRules( selector, styles, arg2 ) );
			} );

			return {
				remove : function () {
					array.foreach( list, function ( handle ) {
						handle.remove();
					} );
				}
			};
		}
	}

	// 值,防止值太小时,转换成字符串使用指数表示法
	function n( n ) {
		return Math.round( n * 10000 ) / 10000;
	}
/* kahn1990 */
	function px( value ) {
		return value === 0 ? 0 : ( n( value ) << 0 ) + "px";
	}

	function rem( value ) {
		return value === 0 ? 0 : ( n( value ) << 0 ) + "rem";
	}

	function deg( value ) {
		return value === 0 ? 0 : n( value ) + "deg";
	}

	function Rotate( name ) {
		return function ( val ) {
			return tuple( name, [deg( val )] );
		};
	}

	css.ruleString = ruleString;
	css.test = test;
	css.testPrefix = testPrefix;
	css.testStyleName = testStyleName;
	css.remove = remove;
	css.insertRule = insertCSSRule;
	css.insertRules = insertCSSRules;

	css.px = px;
	css.deg = deg;

	css.full = function ( style ) {
		return object.extend( {
			position : "absolute",
			left : 0,
			right : 0,
			top : 0,
			bottom : 0
		}, style || {} );
	};

	css.size = function ( el, width, height ) {
		css( el, {
			width : px( width ),
			height : px( height )
		} );
	};

	css.transform = function () {
		var style = [];
		array.foreach( arguments, function ( transform, i ) {
			i !== 0 && style.push( transform );
		} );
		css( arguments[0], "transform", style.join( " " ) );
	};

	css.tuple = tuple;

	css.matrix = function ( m ) {
		return tuple( "matrix", array.map( m, n ) );
	};

	css.matrix3d = function ( m ) {
		return tuple( "matrix3d", array.map( m, n ) );
	};

	css.translate = function ( x, y, z ) {
		return tuple( "translate3d", array.map( [x, y, z], function ( value ) {
			return object.is.Number( value ) ? css.px( value ) : value;
		} ) );
	};

	css.rotateX = Rotate( "rotateX" );
	css.rotateY = Rotate( "rotateY" );
	css.rotateZ = Rotate( "rotateZ" );

	css.scale = function () {
		return "scale(" + Array.prototype.join.call( arguments, "," ) + ")";
	};

	css.s = function ( value ) {
		return n( value ) + "s";
	};

	css.url = function ( url ) {
		return tuple( "url", [url] );
	};

	css.bezier = function ( arg ) {
		return tuple( "cubic-bezier", arg );
	};

	css.center = function ( width ) {
		return {
			position : "absolute",
			left : "50%",
			width : px( width ),
			"margin-left" : px( -width / 2 )
		};
	};

	css.middle = function ( height ) {
		return {
			position : "absolute",
			top : "50%",
			height : css.px( height ),
			"margin-top" : css.px( -height / 2 )
		};
	};

	library["6"] = css;
	// endregion
} );

/**
 * Created by 白 on 2015/2/25.
 * 浏览器检测
 */

library( function () {
	var ua = navigator.userAgent,
		appVersion = navigator.appVersion,
		platform = navigator.platform;

	library["7"] = {
		// win系列
		win32 : platform === "Win32",
		ie : !!window.ActiveXObject || "ActiveXObject" in window,
		ieVersion : Math.floor( (/MSIE ([^;]+)/.exec( ua ) || [0, "0"])[1] ),

		// ios系列
		ios : (/iphone|ipad/gi).test( appVersion ),
		iphone : (/iphone/gi).test( appVersion ),
		ipad : (/ipad/gi).test( appVersion ),
		iosVersion : parseFloat( ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec( ua ) || [0, ''])[1])
			.replace( 'undefined', '3_2' ).replace( '_', '.' ).replace( '_', '' ) ) || false,
		safari : /Version\//gi.test( appVersion ) && /Safari/gi.test( appVersion ),
		uiWebView : /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test( ua ),

		// 安卓系列
		android : (/android/gi).test( appVersion ),
		androidVersion : parseFloat( "" + (/android ([0-9\.]*)/i.exec( ua ) || [0, ''])[1] ),

		// chrome
		chrome : /Chrome/gi.test( ua ),
		chromeVersion : parseInt( ( /Chrome\/([0-9]*)/gi.exec( ua ) || [0, 0] )[1], 10 ),

		// 内核
		webkit : /AppleWebKit/.test( appVersion ),

		// 其他浏览器
		uc : appVersion.indexOf( "UCBrowser" ) !== -1,
		Browser : / Browser/gi.test( appVersion ),
		MiuiBrowser : /MiuiBrowser/gi.test( appVersion ),

		// 微信
		MicroMessenger : ua.toLowerCase().match( /MicroMessenger/i ) == "micromessenger",

		// 触摸
		canTouch : "ontouchstart" in document,
		msPointer : window.navigator.msPointerEnabled
	};
} );
/**
 * Created by Zuobai on 2015/3/15.
 * 封装元素
 */

library( function () {
	var object =library["2"],
		is = object.is,
		array =library["1"],
		css =library["6"],
		ua =library["7"];

	// 创建一个元素
	function element( arg1, arg2, arg3 ) {
		var el, elementArg = {}, parent = arg3;

		// 如果是<div></div>这种形式,直接制作成元素
		if ( is.String( arg1 ) ) {
			if ( arg1.charAt( 0 ) === "<" ) {
				el = document.createElement( "div" );
				el.innerHTML = arg1;
				el = el.firstElementChild;
			}
			// 否则是div.class1.class2#id这种形式
			else {
				var classIdReg = /([.#][^.#]*)/g, classId;
				el = document.createElement( arg1.split( /[#.]/ )[0] );
				while ( classId = classIdReg.exec( arg1 ) ) {
					classId = classId[0];
					classId.charAt( 0 ) === "#" ? el.id = classId.substring( 1 ) : el.classList.add( classId.substring( 1 ) );
				}
			}
		}
		else {
			el = arg1;
		}

		// 参数2是字符串,作为innerHTML
		if ( is.String( arg2 ) ) {
			el.innerHTML = arg2;
		}
		// 是对象的话,每个字段处理
		else if ( is.Object( arg2 ) ) {
			elementArg = arg2;
		}
		// 如果是数组,视为子元素
		else if ( is.Array( arg2 ) ) {
			elementArg.children = arg2;
		}
		// 否则视为父元素
		else {
			parent = arg2;
		}

		elementArg && object.foreach( elementArg, function ( key, value ) {
			if ( value !== undefined ) {
				switch ( key ) {
					case "classList":
						if ( is.String( value ) ) {
							el.classList.add( value );
						}
						else if ( is.Array( value ) ) {
							array.foreach( value, function ( className ) {
								el.classList.add( className );
							} );
						}
						break;
					case "css":
						css( el, value );
						break;
					case "children":
						if ( is.Array( value ) ) {
							array.foreach( value, function ( node ) {
								el.appendChild( node );
							} );
						}
						else {
							el.appendChild( value );
						}
						break;
					default:
						if ( key.substring( 0, 5 ) === "data-" ) {
							el.setAttribute( key, value );
						}
						else {
							el[key] = value;
						}
						break;
				}
			}
		} );

		parent && parent.appendChild( el );
		return el;
	}

	function State( el, table, startState ) {
		el.toState = function ( state ) {
			css( el, table[state] );
		};
		startState && el.toState( startState );
		return el;
	}

	// 绑定事件
	function bind( el, eventType, response, isCapture ) {
		var remove;

		if ( el.addEventListener ) {
			el.addEventListener( eventType, response, isCapture || false );
			remove = function () {
				el.removeEventListener( eventType, response, isCapture || false );
			};
		}
		else {
			el.attachEvent( "on" + eventType, response );
			remove = function () {
				el.detachEvent( "on" + eventType, response );
			};
		}

		return {
			func : response,
			remove : remove
		};
	}

	// 从文档中移除元素
	function remove( node ) {
		node && node.parentNode && node.parentNode.removeChild( node );
	}

	// 链式操作class
	function classList( el ) {
		return {
			add : function ( className ) {
				el.classList.add( className );
				return classList( el );
			},
			remove : function ( className ) {
				el.classList.remove( className );
				return classList( el );
			}
		};
	}

	// 沿着一个元素向上冒泡,直到root/document,回调每个节点
	function bubble( el, func, root ) {
		var val;
		while ( el !== null && el !== document && el !== root ) {
			if ( val = func( el ) ) {
				return val;
			}
			el = el.parentNode;
		}
	}

	// 当一个事件冒泡到document时,回调冒泡中的每个节点
	function onBubble( eventName, response ) {
		document.addEventListener( eventName, function ( event ) {
			bubble( event.target, function ( node ) {
				response( node, event.target );
			}, document.documentElement );
		}, false );
	}

	// 寻找祖先节点
	function findAncestor( el, func ) {
		return bubble( el, function ( el ) {
			if ( func( el ) ) {
				return el;
			}
		} );
	}

	// 当元素插入到文档时回调
	function onInsert( el, response ) {
		if ( document.documentElement.contains( el ) ) {
			response && response();
		}
		else {
			if ( ua.ie && window.MutationObserver ) {
				var observer = new MutationObserver( function ( mutations ) {
					array.foreach( mutations, function ( mutation ) {
						return array.foreach( mutation.addedNodes || [], function ( node ) {
							if ( node === el ) {
								observer.disconnect();
								response && response( el );
								return true;
							}
						} );
					} );
				} );

				//noinspection JSCheckFunctionSignatures
				observer.observe( document.documentElement, {
					childList : true,
					subtree : true
				} );
			}
			else {
				var insertEvent = bind( el, "DOMNodeInsertedIntoDocument", function () {
					response && response( el );
					insertEvent.remove();
				} );
			}
		}
	}

	library["8"] = element;
	element.bind = bind;
	element.remove = remove;
	element.State = State;
	element.classList = classList;
	element.bubble = bubble;
	element.onBubble = onBubble;
	element.findAncestor = findAncestor;
	element.onInsert = onInsert;
} );

/**
 * Created by 白 on 2015/1/21.
 */

library( function () {
	var object =library["2"],
		array =library["1"],
		extend = object.extend,
		exclude = object.exclude;

	// 将相对地址转换为绝对地址
	function toAbsolute( url ) {
		var a = document.createElement( 'a' );
		a.href = url;
		return a.href;
	}

	// 将对象转化问URI字符串
	function encodeObject( obj ) {
		var retVal = "", i = 0;
		object.foreach( obj || {}, function ( key, value ) {
			if ( value !== undefined ) {
				i++ && ( retVal += "&" );
				retVal += encodeURIComponent( key );
				retVal += '=';
				retVal += encodeURIComponent( value );
			}
		} );
		return retVal;
	}

	// 解析配对连接字符串,如name=tom&class=2&grade=3
	function parsePairString( str, split1, split2, doPair ) {
		array.foreach( str.split( split1 ), function ( searchPair ) {
			var keyValue = searchPair.split( split2 );
			doPair( keyValue[0], keyValue[1] );
		} );
	}

	// 为字符串提供url解析功能
	var regUrl = /(?:((?:[^:/]*):)\/\/)?([^:/?#]*)(?::([0-9]*))?(\/[^?#]*)?(\?[^#]*)?(#.*)?/;

	function URL( str ) {
		if ( regUrl.test( str ) ) {
			this.protocol = RegExp.$1;
			this.hostname = RegExp.$2;
			this.port = RegExp.$3;
			this.pathname = RegExp.$4;
			this.search = RegExp.$5;
			this.hash = RegExp.$6;
		}
	}

	//noinspection JSUnusedGlobalSymbols
	URL.prototype.inspect = URL.prototype.valueOf = URL.prototype.toString = URL.prototype.toJSON = function () {
		return this.href;
	};

	Object.defineProperties( URL.prototype, {
		href : {
			get : function () {
				return this.origin + this.pathname + this.search + this.hash;
			}
		},
		host : {
			get : function () {
				return this.hostname + ( this.port ? ":" + this.port : "" );
			}
		},
		origin : {
			get : function () {
				return this.protocol ? this.protocol + "//" + this.host : this.host;
			}
		},
		arg : {
			get : function () {
				var arg = {};
				parsePairString( this.search.substring( 1 ), "&", "=", function ( key, value ) {
					key !== "" && ( arg[key] = decodeURIComponent( value ) );
				} );
				return arg;
			}
		}
	} );

	function parse( str ) {
		return new URL( str );
	}

	function concatArg( url, arg ) {
		url = parse( url );
		var newSearch = encodeObject( extend( url.arg, arg ) );
		return url.origin + url.pathname + ( newSearch ? "?" : "" ) + newSearch + url.hash;
	}

	function removeArg( url, argNameList ) {
		url = parse( url );
		var newSearch = encodeObject( exclude( url.arg, argNameList ) );
		return url.origin + url.pathname + ( newSearch ? "?" : "" ) + newSearch + url.hash;
	}

	library["9"] = parse;
	parse.toAbsolute = toAbsolute;
	parse.encodeObject = encodeObject;
	parse.concatArg = concatArg;
	parse.removeArg = removeArg;
} );
/**
 * Created by 白 on 2015/4/28.
 */


library( function () {
	var object =library["2"],
		css =library["6"],
		$ =library["8"],
		string =library["5"],
		array =library["1"],
		func =library["0"],
		ua =library["7"],
		progressTable = {},
		keyframeCount = 0,
		prefix = null;

	// 测试animation的前缀
	function testPrefix() {
		if ( prefix === null ) {
			prefix = css.testPrefix( "animation", "a 1s" );
		}
	}

	// 结束事件
	function OnEnd( nameList ) {
		return function ( el, response ) {
			testPrefix();
			return $.bind( el, prefix ? string.camelcaseJoin( [prefix.replace( /-/g, "" )].concat( nameList ) ) : nameList.join( "" ), function ( event ) {
				event && event.stopPropagation();
				response && response();
			} );
		}
	}

	var onAnimationEnd = OnEnd( ["animation", "end"] ),
		onTransitionEnd = OnEnd( ["transition", "end"] );

	function OnEndAdvanced( onEnd ) {
		return function ( el, response, duration, getStart ) {
			duration = duration * 1000;

			var endHandle = onEnd( el, function () {
				endHandle.remove();
				var curDuration = new Date() - getStart();

				func.callWith( function ( remove ) {
					// 处理ios跳帧问题
					if ( ua.ios && curDuration < duration ) {
						setTimeout( function () {
							remove();
						}, duration * 1.05 - curDuration );
					}
					else {
						remove();
					}
				}, response );
			} );

			return endHandle;
		};
	}

	var onAnimationEndAdvanced = OnEndAdvanced( onAnimationEnd ),
		onTransitionEndAdvanced = OnEndAdvanced( onTransitionEnd );

	// 生成关键帧
	function Keyframes( progress ) {
		var progressString = "";

		testPrefix();

		object.foreach( progress, function ( ratio, style ) {
			progressString += ( parseFloat( ratio ) << 0 ) + "% {" + css.ruleString( style ) + "}";
		} );

		var progressNode = progressTable[progressString], id;
		if ( !progressNode ) {
			progressNode = progressTable[progressString] = {
				count : 0,
				id : id = "keyframe" + keyframeCount++,
				handle : css.insertRules( "@" + prefix + "keyframes " + id, progressString )
			};
		}

		++progressNode.count;

		return {
			id : progressNode.id,
			remove : function () {
				if ( --progressNode.count === 0 ) {
					progressNode.handle.remove();
					delete progressTable[progressString];
				}
			}
		};
	}

	function animation( animationArg, parsed ) {
		parsed = parsed || {};

		var duration = null, delay = null, fillMode = "both",
			end, handle = null, args = [];

		// 解析动画数组
		array.foreach( animationArg, function ( arg ) {
			if ( object.is.Object( arg ) ) {
				handle = Keyframes( arg );
				args.push( handle.id );
			}
			else if ( object.is.Number( arg ) ) {
				if ( duration === null ) {
					duration = arg;
				}
				else {
					delay = arg;
				}
				args.push( css.s( arg ) );
			}
			else {
				switch ( arg ) {
					case "forwards":
					case "backwards":
					case "both":
						fillMode = arg;
						break;
					default :
						args.push( arg );
						break;
				}
			}

			if ( arg === "infinite" ) {
				parsed.infinite = true;
			}
		} );

		args.push( fillMode );

		duration = duration || 1;
		delay = delay || 0;
		end = duration + delay;

		object.insert( parsed, {
			end : end,
			handle : handle
		} );

		return args.join( " " );
	}

	// 运行动画
	function runAnimation( list, callback, arg ) {
		var last = null, parsedList = [], infinite = false;
		arg = arg || {};

		func.callWith( function ( parseAnimationArg ) {
			object.is.Array( list[0] ) ? array.foreach( list, parseAnimationArg ) : parseAnimationArg( list );
		}, function ( animationArg ) {
			var el = animationArg[0],
				parsed = {
					el : el
				};

			css( el, "animation", animation( animationArg.slice( 1 ), parsed ) );
			css( el, "animation-play-state", "paused" );

			if ( !last || parsed.end > last.end ) {
				last = parsed;
			}

			if ( parsed.infinite ) {
				infinite = true;
			}

			parsedList.push( parsed );
		} );

		var start;

		function play() {
			start = new Date();
			array.foreach( parsedList, function ( parsed ) {
				css( parsed.el, "animation-play-state", "running" );
			} );
		}

		arg.play !== false && setTimeout( play, ua.ios ? 30 : 0 );

		if ( callback ) {
			var endHandle = onAnimationEndAdvanced( last.el, function () {
				array.foreach( parsedList, function ( parsed ) {
					if ( arg.removeKeyframes ) {
						parsed.handle && parsed.handle.remove();
					}

					css.remove( parsed.el, "animation" );
				} );
				callback && callback();
			}, last.end, function () {
				return start;
			} );

			return {
				play : play,
				fastForward : endHandle.func
			};
		}
	}

	library["10"].onAnimationEnd = onAnimationEnd;
	library["10"].onTransitionEnd = onTransitionEnd;
	library["10"].onAnimationEndAdvanced = onAnimationEndAdvanced;
	library["10"].onTransitionEndAdvanced = onTransitionEndAdvanced;
	library["10"].Keyframes = Keyframes;
	library["10"].animation = animation;
	library["10"].runAnimation = runAnimation;
} );
/**
 * Created by 白 on 2014/8/4.
 * 封装点交互
 */

library( function () {
	// region 引入
	var array =library["1"],
		object =library["2"],
		ua =library["7"],
		$ =library["8"],
		bind = $.bind,

		getPageX = EventCoordinateGetter( "pageX" ),
		getPageY = EventCoordinateGetter( "pageY" ),
		moveName = eventName( ["touchmove", "MSPointerMove", "mousemove"] ),
		downName = eventName( ["touchstart", "MSPointerDown", "mousedown"] ),
		upName = eventName( ["touchend", "MSPointerUp", "mouseup"] ),

		lastX, lastY, curX, curY;
	// endregion

	// 根据不同的浏览器,给出事件名
	function eventName( name ) {
		return name[ua.canTouch ? 0 : ua.msPointer ? 1 : 2];
	}

	// 事件坐标获取器
	function EventCoordinateGetter( coordinateName ) {
		return function ( event ) {
			return "touches" in event && event.touches[0] !== undefined ? event.touches[0][coordinateName] : event[coordinateName];
		}
	}

	bind( document, downName, function ( event ) {
		curX = getPageX( event );
		curY = getPageY( event );
	}, true );

	bind( document, moveName, function ( event ) {
		var x = getPageX( event ), y = getPageY( event );
		lastX = object.defaultValue( curX, x );
		lastY = object.defaultValue( curY, y );
		curX = x;
		curY = y;
	}, true );

	function Event( event, obj ) {
		return object.insert( obj, {
			preventDefault : function () {
				event.preventDefault();
			},
			stopPropagation : function () {
				event.stopPropagation();
			},
			origin : event
		} );
	}

	function onPointerMove( element, response, isCapture ) {
		return bind( element, moveName, function ( event ) {
			response( Event( event, {
				x : curX,
				y : curY,
				dX : curX - lastX,
				dY : curY - lastY
			} ) );
		}, isCapture );
	}

	function PointerBinder( names ) {
		return function ( element, response, isCapture ) {
			return bind( element, names, function ( event ) {
				response( Event( event, {
					x : object.defaultValue( curX, getPageX( event ) ),
					y : object.defaultValue( curY, getPageY( event ) )
				} ) );
			}, isCapture );
		};
	}

	var onPointerUp = PointerBinder( upName );

	function onMoveUp( arg ) {
		var moveHandle = onPointerMove( document, function ( event ) {
				arg.onMove && arg.onMove( event );
			} ),
			upHandle = onPointerUp( document, function ( event ) {
				moveHandle.remove();
				upHandle.remove();
				arg.onUp && arg.onUp( event );
			} );

		return {
			remove : function () {
				moveHandle.remove();
				upHandle.remove();
			}
		};
	}

	library["11"].onPointerMove = onPointerMove;
	library["11"].onPointerDown = PointerBinder( downName );
	library["11"].onPointerUp = onPointerUp;
	library["11"].onMoveUp = onMoveUp;
} );
/**
 * Created by 白 on 2015/3/26.
 * 图片工具方法
 */

library( function () {
	function toDataURL( img ) {
		try {
			var canvas = document.createElement( "canvas" ),
				gc = canvas.getContext( "2d" );
			canvas.width = img.naturalWidth || img.width;
			canvas.height = img.naturalHeight || img.height;
			gc.drawImage( img, 0, 0 );
			return canvas.toDataURL();
		}
		catch ( e ) {
			return null;
		}
	}

	library["12"].toDataURL = toDataURL;
} );

/**
 * Created by 白 on 2015/5/14.
 */

library( function () {
	var object =library["2"];

	library["13"] = function ( arg, callback ) {
		var xhr = new XMLHttpRequest();

		xhr.onload = function () {
			callback && callback( null, xhr );
		};

		xhr.onerror = function ( err ) {
			callback && callback( err, xhr );
		};

		xhr.open( arg.method || "get", arg.url, true );

		// 添加headers
		arg.headers && object.foreach( arg.headers, function ( key, value ) {
			xhr.setRequestHeader( key, value );
		} );

		arg.responseType && ( xhr.responseType = arg.responseType );

		xhr.send( arg.data || null );

		return xhr;
	};
} );
/**
 * Created by 白 on 2015/7/14.
 */

library( function () {
	var ua =library["7"],
		object =library["2"],
		URL =library["9"];

	// 添加ua
	object.insert( ua, {
		iphone4 : ua.iphone && screen.height === 480,
		iphone5 : ua.iphone && screen.height === 568,
		iphone6 : ua.iphone && screen.height > 568,
		mi4 : /Mi 4LTE/gi.test( navigator.userAgent )
	} );

	// 判断是否在初页中,以及初页的版本
	if ( ua.chuye = window.chuye || /chuye/gi.test( navigator.userAgent ) ) {
		ua.chuyeVersion = /chuye\/([\d.]*)/gi.test( navigator.userAgent ) ? parseFloat( RegExp.$1 ) : 1;
		ua.chuyeList = window.chuyeList || /chuyeFlow/gi.test( navigator.userAgent ) || !!URL( location.href ).arg.list;
		ua.chuyePreview = window.chuyePreview || /chuyePreview/gi.test( navigator.userAgent );
	}

	// 系统名
	if ( ua.iphone ) {
		ua.systemName = "iphone";
	}
	else if ( ua.ipad ) {
		ua.systemName = "ipad";
	}
	else if ( ua.ios ) {
		ua.systemName = "ios-other"
	}
	else if ( ua.android ) {
		ua.systemName = "android";
	}
	else {
		ua.systemName = "other";
	}

	// 根据不同的操作系统添加类
	ua.ios && document.documentElement.classList.add( "ios" );
	ua.win32 && document.documentElement.classList.add( "win32" );

	library["14"] = ua;
} );
/**
 * Created by 白 on 2015/6/10.
 * 本地资源加载
 */

library( function () {
	var array =library["1"];

	// 本地资源
	library["15"] = function () {
		var resource = window.localResource || {};

		// 如果版本不对,清除版本
		if ( resource.version !== window.firstpageVersion ) {
			array.foreach( resource.list || [], function ( key ) {
				localStorage.removeItem( key );
			} );
			resource.version = window.firstpageVersion;
			resource.list = [];
			localStorage.setItem( "resource", JSON.stringify( resource ) );
		}

		return function ( key, dataGetter ) {
			if ( !window.localResource ) {
				return null;
			}
			else if ( dataGetter === undefined ) {
				return localStorage.getItem( key );
			}
			else {
				if ( !array.contains( resource.list, function ( item ) {
						return item === key;
					} ) ) {
					var value = dataGetter();
					if ( value != null ) {
						resource.list.push( key );
						localStorage.setItem( key, dataGetter() );
						localStorage.setItem( "resource", JSON.stringify( resource ) );
					}
				}
			}
		};
	}();
} );
/**
 * Created by 白 on 2015/6/10.
 * 封装图片
 */

library( function () {
	var css =library["6"],
		async =library["4"],
		URL =library["9"],
		imageUtil =library["12"],
		$ =library["8"],
		object =library["2"],
		ajax =library["13"],
		ua =library["14"],

		localResource =library["15"],

		imageNotFoundLoader = async.Loader( function ( done ) {
			var imageNotFound = Img.imageNotFound = Icon( "image-not-found" ),
				loadHandle = $.bind( imageNotFound, "load", function () {
					loadHandle.remove();
					done();
				} );
		} ),

		testImg = new Image(),
		lowPerformance = testImg.crossOrigin === undefined || ua.iphone && !ua.iphone6;

	function isColor( src ) {
		return /^#/.test( src ) || /^rgba/gi.test( src );
	}

	// 静态图片地址
	function staticSrc( src ) {
		return window.contentPath + "image/" + src;
	}

	// 设置图片尺寸
	function setSize( img, ps ) {
		ps = ps || {};
		var width = img.fullWidth = ps.w || img.naturalWidth || img.width,
			height = img.fullHeight = ps.h || img.naturalHeight || img.height;
		img.w = img.halfWidth = Math.round( width / 2 );
		img.h = img.halfHeight = Math.round( height / 2 );
		img.whr = width / height;
	}

	// 加载图片
	function load( img, src, arg ) {
		arg = arg || {};
		var tryCache = false,
			crossOrigin = !!arg.crossOrigin,
			extName,
			dataUrl = /^data:/.test( src );

		function fail( isFatal ) {
			img.fail = isFatal ? "fatal" : true;
			imageNotFoundLoader.load( function () {
				arg.onError && arg.onError();
			} );
		}

		if ( !src ) {
			fail( true );
			return img;
		}

		if ( isColor( src ) ) {
			img.color = src;
			setTimeout( function () {
				arg.onLoad && arg.onLoad();
			}, 0 );
			return img;
		}

		function tryAgain() {
			if ( !tryCache ) {
				img.src = "";
				img.src = URL.concatArg( src, {
					t : ( new Date() ).getTime()
				} );
				tryCache = true;
			}
			else {
				fail();
			}
		}

		// 如果src是音乐,直接失败
		if ( !dataUrl && /\.([^.]*)$/.test( URL( src ).pathname.replace( /!([^!]*)$/, "" ) ) && !( ( extName = RegExp.$1 ) in {
				"jpeg" : true,
				"jpg" : true,
				"svg" : true,
				"png" : true,
				"gif" : true,
				"bmp" : true
			} ) ) {
			setTimeout( fail, 0 );
			return img;
		}

		crossOrigin && ( img.crossOrigin = "*" );

		img.onerror = tryAgain;
		img.onload = function () {
			if ( crossOrigin && !lowPerformance ) {
				try {
					var canvas = document.createElement( "canvas" ),
						gc = canvas.getContext( "2d" );
					canvas.width = 1;
					canvas.height = 1;
					gc.drawImage( img, 0, 0 );
					canvas.toDataURL();
				}
				catch ( e ) {
					tryAgain();
					return;
				}
			}
			setSize( img );
			img.onerror = null;
			img.onload = null;
			arg.onLoad && arg.onLoad( img );
		};

		if ( extName === "svg" ) {
			var xhr = ajax( {
				url : src
			}, function ( err ) {
				if ( err ) {
					fail();
				}
				else {
					img.src = img.imageData = "data:image/svg+xml;utf8," + xhr.responseText;
				}
			} );
		}
		else {
			img.src = src;
		}

		return img;
	}

	function Img( src, arg ) {
		return load( new Image(), src, arg );
	}
	/* kahn1990 方法用来加载图片*/
	var Icon = window.Icon || ( lowPerformance ? function ( src ) {
			var img = Img( staticSrc( "icon/" + src + ".png" ) );
			setSize( img, iconMap[src] );
			css.size( img, img.w, img.h );
			return img;
		} : (function () {
			var icons = {};

			function loadIcon( src, onLoad ) {
				var srcParts = src.split( "/" ),
					groupName = ["icon"].concat( srcParts.slice( 0, srcParts.length - 1 ) ).join( "-" ),
					img = icons[groupName] = icons[groupName] || new Image();

				if ( !img.waiter ) {
					img.waiter = async.Waiter( function ( done ) {
						var iconSrc = staticSrc( groupName + ".png" ),
							dataUrl = localResource( iconSrc );

						load( img, dataUrl || iconSrc, {
							crossOrigin : dataUrl == null,
							onLoad : function () {
								done();
								localResource( iconSrc, function () {
									return imageUtil.toDataURL( img );
								} );
							}
						} );
					} );
				}

				img.waiter.onComplete( function () {
					onLoad( img );
				} );
			}

			return function ( src ) {
				var ps = iconMap[src],
					canvas = document.createElement( "canvas" ),
					gc = canvas.getContext( "2d" ),
					unit = new Image();

				canvas.width = ps.w;
				canvas.height = ps.h;
				setSize( unit, ps );
				css.size( unit, unit.w, unit.h );
				css( unit, "visibility", "hidden" );

				loadIcon( src, function ( icon ) {
					gc.drawImage( icon, ps.x, ps.y, ps.w, ps.h, 0, 0, ps.w, ps.h );
					unit.onload = function () {
						unit.onload = null;
						css( unit, "visibility", "visible" );
					};
					unit.src = canvas.toDataURL( "image/png" );
				} );

				return unit;
			};
		})() );

	function clone( img ) {
		var newImage = new Image();
		newImage.src = img.src;
		setSize( newImage, img );
		return newImage;
	}

	// 画布
	function Canvas( width, height, dpr ) {
		var canvas = document.createElement( "canvas" ),
			gc = canvas.context = canvas.getContext( "2d" );

		dpr = canvas.dpr = dpr || ( window.devicePixelRatio || 1 ) / ( gc.webkitBackingStorePixelRatio || gc.mozBackingStorePixelRatio ||
			gc.msBackingStorePixelRatio || gc.oBackingStorePixelRatio || gc.backingStorePixelRatio || 1 );

		canvas.width = width * dpr;
		canvas.height = height * dpr;

		css( canvas, {
			display : "block",
			width : css.px( canvas.logicalWidth = width ),
			height : css.px( canvas.logicalHeight = height )
		} );

		gc.scale( dpr, dpr );

		return canvas;
	}

	function pageError( page, src ) {
		page.innerHTML = "";
		css( page, "background", "white" );
		Img( staticSrc( src ), {
			onLoad : function ( img ) {
				$( img, {
					css : object.insert( css.center( img.halfWidth ), css.middle( img.halfHeight ) )
				}, page );
			}
		} );
	}

	Img.isColor = isColor;
	Img.load = load;
	Img.clone = clone;
	Img.Canvas = Canvas;
	Img.Icon = Icon;
	Img.staticSrc = staticSrc;
	Img.pageError = pageError;
	library["16"] = Img;
} );

/**
 * Created by Zuobai on 2014/11/22.
 * 封装经典的2d变换
 */

library( function () {
	var array =library["1"],
		matrix = {
			eye : function () {
				return [1, 0, 0, 1, 0, 0];
			},
			translate : function ( x, y ) {
				return [1, 0, 0, 1, x, y];
			},
			scale : function ( sx, sy ) {
				return [sx, 0, 0, sy, 0, 0];
			},
			rotate : function ( a ) {
				var sin = Math.sin( a ), cos = Math.cos( a );
				return [cos, sin, -sin, cos, 0, 0];
			}
		};

	function isTransformEqual( lhs, rhs ) {
		return lhs[0] === rhs[0] && lhs[1] === rhs[1] && lhs[2] === rhs[2] &&
			lhs[3] === rhs[3] && lhs[4] === rhs[4] && lhs[5] === rhs[5];
	}

	function inverse( m ) {
		var det = m[0] * m[3] - m[1] * m[2];
		return [m[3] / det, -m[1] / det, -m[2] / det, m[0] / det, (m[2] * m[5] - m[3] * m[4]) / det, (m[1] * m[4] - m[0] * m[5]) / det];
	}

	function transform( m, p ) {
		return [m[0] * p[0] + m[2] * p[1] + m[4] * p[2], m[1] * p[0] + m[3] * p[1] + m[5] * p[2], p[2]];
	}

	function mul( m, n ) {
		return [m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1], m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3], m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]];
	}

	function combine() {
		return array.reduce( arguments, mul );
	}

	function origin( transformation, x, y ) {
		return combine( matrix.translate( x, y ), transformation, matrix.translate( -x, -y ) );
	}

	library["17"].matrix = matrix;
	library["17"].isTransformEqual = isTransformEqual;
	library["17"].inverse = inverse;
	library["17"].transform = transform;
	library["17"].combine = combine;
	library["17"].origin = origin;
} );
/**
 * Created by 白 on 2015/3/6.
 */

library( function () {
	var array =library["1"],
		matrix = {
			eye : function () {
				return [
					1, 0, 0, 0,
					0, 1, 0, 0,
					0, 0, 1, 0,
					0, 0, 0, 1
				];
			},
			translate : function ( x, y, z ) {
				return [
					1, 0, 0, 0,
					0, 1, 0, 0,
					0, 0, 1, 0,
					x, y, z, 1
				];
			},
			scale : function ( x, y, z ) {
				return [
					x, 0, 0, 0,
					0, y, 0, 0,
					0, 0, z, 0,
					0, 0, 0, 1
				];
			},
			rotateX : function ( a ) {
				var sina = Math.sin( a ), cosa = Math.cos( a );
				return [
					1, 0, 0, 0,
					0, cosa, sina, 0,
					0, -sina, cosa, 0,
					0, 0, 0, 1
				];
			},
			rotateY : function ( a ) {
				var sina = Math.sin( a ), cosa = Math.cos( a );
				return [
					cosa, 0, -sina, 0,
					0, 1, 0, 0,
					sina, 0, cosa, 0,
					0, 0, 0, 1
				];
			},
			rotateZ : function ( a ) {
				var sina = Math.sin( a ), cosa = Math.cos( a );
				return [
					cosa, sina, 0, 0,
					-sina, cosa, 0, 0,
					0, 0, 1, 0,
					0, 0, 0, 1
				];
			},
			rotate : function ( v, a ) {
				var x = v[0], y = v[1], z = v[2],
					r = Math.sqrt( x * x + y * y + z * z ), sina = Math.sin( a ), cosa = Math.cos( a );
				x /= r;
				y /= r;
				z /= r;
				return [
					1 + ( 1 - cosa ) * ( x * x - 1 ), z * sina + x * y * ( 1 - cosa ), -y * sina + x * z * ( 1 - cosa ), 0,
					-z * sina + x * y * ( 1 - cosa ), 1 + ( 1 - cosa ) * ( y * y - 1 ), x * sina + y * z * ( 1 - cosa ), 0,
					y * sina + x * z * ( 1 - cosa ), -x * sina + y * z * ( 1 - cosa ), 1 + ( 1 - cosa  ) * ( z * z - 1 ), 0,
					0, 0, 0, 1
				];
			},
			perspective : function ( d ) {
				return [
					1, 0, 0, 0,
					0, 1, 0, 0,
					0, 0, 1, -1 / d,
					0, 0, 0, 1
				];
			}
		};

	function mul( a, b ) {
		for ( var i = 0, arr = []; i < 4; ++i ) {
			for ( var j = 0; j < 4; ++j ) {
				arr[i * 4 + j] = 0;
				for ( var k = 0; k < 4; ++k ) {
					arr[i * 4 + j] += b[i * 4 + k] * a[k * 4 + j];
				}
			}
		}
		return arr;
	}

	function combine() {
		return array.reduce( arguments, mul );
	}

	function origin( m, x, y, z ) {
		return combine( matrix.translate( x, y, z ), m, matrix.translate( -x, -y, -z ) );
	}

	function transform( m, v ) {
		return array.map( array.range( 4 ), function ( i ) {
			return m[i] * v[0] + m[i + 4] * v[1] + m[i + 8] * v[2] + m[i + 12] * v[3];
		} );
	}

	library["18"].matrix = matrix;
	library["18"].combine = combine;
	library["18"].origin = origin;
	library["18"].transform = transform;
} );
/**
 * Created by 白 on 2015/3/3.
 */

library( function () {
	var object =library["2"],
		insert = object.insert,
		func =library["0"],
		css =library["6"],
		async =library["4"],
		z2d =library["17"],
		m2d = z2d.matrix,
		z3d =library["18"],
		m3d = z3d.matrix,
		array =library["1"],
		$ =library["8"],
		imageUtil =library["12"],
		pointer =library["11"],
		LinkedList =library["3"],
		csa =library["10"],
		string =library["5"],

		ua =library["14"],
		Img =library["16"],
		localResource =library["15"],
		formats = {},
		highPerformance = ua.ios || ua.win32;

	css.insertRules( {
		".animation-prepare *" : {
			"animation-play-state" : "paused !important"
		}
	} );

	// 贝塞尔
	function bezier( timing ) {
		return timing ? object.is.String( timing ) ? timing : css.bezier( timing.arg ) : "ease";
	}

	// 判断动画是否是强调动画
	function isEmphasize( enter ) {
		return !enter.progress["0"] || enter.emphasize;
	}

	// 判断一个动画是否是透视动画
	function isPerspective( enter ) {
		return object.foreach( enter.progress, function ( ratio, style ) {
			if ( "perspective" in style ) {
				return true;
			}
		} );
	}

	// 获取一个组件的原点矩阵
	function getMatrix( wrapper ) {
		return z2d.origin( z2d.combine(
			m2d.translate( wrapper.x, wrapper.y ),
			m2d.scale( wrapper.scale, wrapper.scale ),
			m2d.rotate( wrapper.rotate / 180 * Math.PI )
		), wrapper.w / 2, wrapper.h / 2 );
	}

	// 获取一个组件相对于页面的矩阵
	function getPageMatrix( wrapper ) {
		var matrix = m2d.eye();
		while ( wrapper.parent ) {
			matrix = z2d.combine( getMatrix( wrapper ), matrix );
			wrapper = wrapper.parent;
		}
		return matrix;
	}

	// 设置一个组件的css样式
	function setStyle( wrapper ) {
		var matrix = z3d.combine( m3d.scale( wrapper.scale, wrapper.scale, 1 ), m3d.rotateZ( wrapper.rotate / 180 * Math.PI ) );
		wrapper.opacity = wrapper.opacity + 0;
		if ( wrapper.left === undefined ) {
			css( wrapper.element, {
				left : css.px( wrapper.x ),
				top : css.px( wrapper.y )
			} );
		}
		else {
			matrix = z3d.combine( m3d.translate( wrapper.x - wrapper.left, wrapper.y - wrapper.top, 0 ), matrix );
		}
		if ( css.matrix3d( matrix ) !== "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)" ) {
			css.transform( wrapper.element, css.matrix3d( matrix ) );
		}
		else {
			css.remove( wrapper.element, "transform" );
		}
		css.remove( wrapper.element, "transform-origin" );
	}

	// 将一个内容转化为元素
	function contentToElement( content ) {
		if ( content.element ) {
			return content.element();
		}
		else {
			var canvas = Img.Canvas( content.width, content.height );
			content.draw( canvas.context );
			return ua.android ? $( "div", [canvas] ) : canvas;
		}
	}

	// 组件
	function Component( content, parentWrapper ) {
		var el = contentToElement( content ),
			component = el.wrapper = {
				fixed : true // 是否取整
			},
			attr = {};

		css( el, {
			position : "absolute",
			display : "block",
			left : 0,
			top : 0,
			width : css.px( component.w = content.width ),
			height : css.px( component.h = content.height ),
			"z-index" : 0
		} );

		function defineAttr( name, defaultValue, setter, handler ) {
			attr[name] = defaultValue;
			Object.defineProperty( component, name, {
				get : function () {
					return attr[name];
				},
				set : function ( val ) {
					attr[name] = handler ? handler( val ) : val;
					setter && setter( val );
				}
			} );
		}

		// 透明度
		defineAttr( "opacity", 1, function ( val ) {
			css( el, "opacity", val );
		} );

		// z-index
		defineAttr( "zi", 0, function ( val ) {
			css( el, "z-index", val );
		} );

		// visible
		defineAttr( "visible", true, function ( val ) {
			css( el, "visibility", val ? "visible" : "hidden" );
		} );

		object.defineAutoProperty( component, "dataSource", {
			value : content.dataSource,
			set : function ( value ) {
				el.classList.add( "layout-component-from-data" );
				el.dataSource = value;
			}
		} );

		// transform属性
		// x和y要取整
		object.foreach( {
			x : 0,
			y : 0
		}, function ( name, defaultValue ) {
			defineAttr( name, defaultValue, function () {
				setStyle( component );
			}, function ( val ) {
				return component.fixed ? Math.round( val ) : val;
			} );
		} );

		// 原点
		Object.defineProperty( component, "origin", {
			get : function () {
				return [component.x, component.y];
			},
			set : function ( point ) {
				component.x = point[0];
				component.y = point[1];
			}
		} );

		// 不取整
		object.foreach( {
			rotate : 0,
			scale : 1
		}, function ( name, defaultValue ) {
			defineAttr( name, defaultValue, function () {
				setStyle( component );
			} );
		} );

		object.insert( component, {
			element : el,
			appendTo : function ( parentWrapper ) {
				if ( !parentWrapper.children ) {
					parentWrapper.children = [];
				}
				parentWrapper.children.push( component );
				parentWrapper.element.appendChild( el );
				component.parent = parentWrapper;
				return component;
			},
			draw : function ( gc ) {
				// 绘制自己
				content.draw( gc );
			}
		} );

		if ( parentWrapper ) {
			component.appendTo( parentWrapper );
		}

		return component;
	}

	function cloneComponent( source ) {
		var target = Component( {
			element : function () {
				return source.element.cloneNode( true );
			},
			width : source.w,
			height : source.h
		} );
		target.opacity = source.opacity;
		target.origin = source.origin;
		target.scale = source.scale;
		target.rotate = source.rotate;
		return target;
	}

	function drawComponent( component, gc, isShow ) {
		func.recursion( function draw( component ) {
			if ( component.visible && ( isShow ? isShow( component ) : true ) ) {
				component.draw && component.draw( gc );
				component.children && array.foreach( component.children.sort( function ( lhs, rhs ) {
					return lhs.zi - rhs.zi;
				} ), function ( component ) {
					gc.save();
					gc.globalAlpha *= component.opacity;
					// 变换
					gc.transform.apply( gc, getMatrix( component ) );
					draw( component );
					gc.restore();
				} );
			}
		}, component );
	}

	function loopComponent( root, block ) {
		func.recursion( function loop( wrapper ) {
			wrapper.children && array.foreach( wrapper.children, loop );
			root !== wrapper && block( wrapper );
		}, root );
	}

	// 返回入场动画的keyframes
	function Keyframes( component, enter, isTransition, cssProgress ) {
		cssProgress = cssProgress || {};
		var width = component.w,
			height = component.h,
			progress = enter.progress;

		function percent( val, total ) {
			return object.is.String( val ) ? parseInt( val.replace( "%", "" ) ) / 100 * total : val;
		}

		function nu( v ) {
			return v !== undefined;
		}

		array.foreach( array.collect( function ( push ) {
			object.foreach( progress, function ( ratio, value ) {
				array.foreach( ratio.split( " " ), function ( ratio ) {
					push( {
						ratio : parseInt( ratio ) / 100,
						value : value
					} );
				} );
			} );
		} ).sort( function ( a, b ) {
			return a.ratio - b.ratio;
		} ), function ( frame ) {
			var style = frame.value,
				transform = [],
				rotate = style.rotate || 0,
				scale = object.defaultValue( style.scale, 1 ),
				origin = enter.origin ? [enter.origin[0] * width - 0.5 * width, enter.origin[1] * height - 0.5 * height] : null,
				computedStyle = object.extend( {
					opacity : 1,
					x : 0,
					y : 0,
					z : 0,
					rotateX : 0,
					rotateY : 0,
					rotateZ : rotate,
					scaleX : scale,
					scaleY : scale,
					skewX : 0,
					skewY : 0,
					perspective : 0
				}, style ),
				matrix = z2d.combine(
					m2d.scale( component.scale, component.scale ),
					m2d.rotate( component.rotate / 180 * Math.PI )
				);

			function pushTransform( transformName, value, unit ) {
				transform.push( string.tuple( transformName, [unit( value )] ) );
			}

			delete computedStyle.rotate;
			delete computedStyle.scale;

			computedStyle = object.extend( computedStyle, {
				x : percent( computedStyle.x, width ),
				y : percent( computedStyle.y, height )
			} );

			origin && transform.push( css.translate( origin[0], origin[1], 0 ) );
			nu( style.perspective ) && pushTransform( "perspective", computedStyle.perspective, css.px );
			( nu( style.x ) || nu( style.y ) || nu( style.z ) ) && transform.push( css.translate( computedStyle.x, computedStyle.y, computedStyle.z ) );
			isTransition !== true && transform.push( css.matrix( origin ? z2d.origin( matrix, width / 2 - enter.origin[0] * width, height / 2 - enter.origin[1] * height ) : matrix ) );
			( nu( style.scaleX ) || nu( style.scaleY ) || nu( style.scale ) ) && transform.push( css.scale( computedStyle.scaleX, computedStyle.scaleY ) );
			nu( style.rotateX ) && pushTransform( "rotateX", computedStyle.rotateX, css.deg );
			nu( style.rotateY ) && pushTransform( "rotateY", computedStyle.rotateY, css.deg );
			( nu( style.rotateZ ) || nu( style.rotate ) ) && pushTransform( "rotateZ", computedStyle.rotateZ, css.deg );
			( nu( style.skewX ) ) && pushTransform( "skewX", computedStyle.skewX, css.deg );
			nu( style.skewY ) && pushTransform( "skewY", computedStyle.skewY, css.deg );
			origin && transform.push( css.translate( -origin[0], -origin[1], 0 ) );

			cssProgress[frame.ratio * 100] = object.extend( {
				"transform-origin" : computedStyle.origin ? array.map( computedStyle.origin, function ( value ) {
					return value * 100 + "%";
				} ).join( " " ) : undefined,
				filter : computedStyle.filter,
				opacity : computedStyle.absOpacity !== undefined ? computedStyle.absOpacity : computedStyle.opacity * component.opacity,
				transform : transform.join( " " ),
				visibility : computedStyle.visibility === undefined ? undefined : computedStyle.visibility ? "visible" : "hidden"
			}, {
				"animation-timing" : computedStyle.timing ? object.is.String( computedStyle.timing ) ? computedStyle.timing :
					css.bezier( computedStyle.timing.arg ) : undefined
			} );
		} );

		return csa.Keyframes( cssProgress ).id;
	}

	function EnterAnimation( component, enter, duration, delay, cssProgress ) {
		var Keyframes_css_kahn1990 = [Keyframes( component, enter, false, cssProgress ), css.s( duration ), css.s( delay ), bezier( enter.timing ), "both"].join( " " );
		return Keyframes_css_kahn1990;
	}

	function transition( component, info ) {
		var element = component.element;
		css( element, "transition", [css.s( info.duration ), css.s( info.delay || 0 ), bezier( info.timing )].join( " " ) );

		object.foreach( info.end, function ( k, v ) {
			component[k] = v;
		} );

		function end() {
			info.onEnd && info.onEnd();
			css.remove( element, "transition" );
			endHandle.remove();
		}

		var endHandle = $.bind( element, "webkitTransitionEnd", end );

		return {
			fastForward : end
		};
	}

	function makePage( page, width, height ) {
		var wrapper = {
				w : page.w = width,
				h : page.h = height,
				xScale : width / 320,
				yScale : height / 568
			},
			showEvent = async.Event(),
			enterEndEvent = async.Event(),
			removeEvent = async.Event();

		wrapper.body = page.body || page;

		css( page, {
			position : "relative",
			width : css.px( width ),
			height : css.px( height ),
			"z-index" : 0,
			"backface-visibility" : "hidden",
			overflow : "hidden"
		} );

		object.defineAutoProperty( wrapper, "background", {
			value : "black",
			set : function ( value ) {
				css( page, "background", value );
			}
		} );

		return insert( page, {
			draw : function ( gc ) {
				gc.fillStyle = wrapper.background;
				gc.fillRect( 0, 0, width, height );
				drawComponent( wrapper, gc, function ( wrapper ) {
					return page.contains( wrapper.element ) &&
						( !page.classList.contains( "animation-prepare" ) || wrapper.enter == null || isEmphasize( wrapper.enter ) );
				} );
			},
			recycle : function () {
				removeEvent.trig();
				page.prepare = function () {
					return page;
				}
			},
			prepare : function () {
				var last = null, enterComponents = LinkedList(), start, isPagePerspective;

				page.classList.add( "animation-prepare" );

				if ( !page.doPagePerspective ) {
					// 处理透视
					loopComponent( wrapper, function ( component ) {
						if ( ua.ios && component.enter && isPerspective( component.enter ) ) {
							isPagePerspective = true;
						}
					} );
					if ( isPagePerspective ) {
						loopComponent( wrapper, function ( component ) {
							if ( component.isElement ) {
								$( "div", {
									css : {
										position : "absolute",
										left : 0,
										top : 0,
										transform : "translateZ(10000px)",
										"z-index" : component.zi
									},
									children : [component.element]
								}, component.element.parentNode );
							}
						} );
					}
					page.doPagePerspective = true;
				}

				loopComponent( wrapper, function ( component ) {
					var enter = component.enter; // 入场动画
					if ( enter ) {
						var delay = enter.delay || ( enter.delay = 0 ), // 延迟
							duration = enter.duration || ( enter.duration = 1 ), // 持续时间
							end = delay + duration,
							cssProgress = {},
							el = component.element;

						if ( highPerformance ) {
							// 加动画
							css( el, "animation", EnterAnimation( component, enter, duration, delay ) );
						}
						else {
							el.animationStyle = EnterAnimation( component, enter, duration, delay, cssProgress );
							if ( cssProgress[0] ) {
								el.normalStyle = el.getAttribute( "style" );
								css( el, cssProgress[0] )
							}
						}

						// 更新进入
						if ( !last || last.end < end ) {
							last = component;
							last.end = end;
						}

						// 加入链表
						enterComponents.insert( component, null );

						// 动画结束后移除动画属性,总可见,触发enter的onEnd回调
						component.animationHandle = csa.onAnimationEndAdvanced( component.element, function () {
							enterComponents.remove( component );
							!enter.both && css.remove( el, "animation" );
							enter.onEnd && enter.onEnd();
						}, end, function () {
							return start;
						} );
					}
				} );

				return insert( page, {
					recycle : function () {
						removeEvent.trig();
						page.play = function () {
							return page;
						};
					},
					fastForward : function () {
					},
					play : function () {
						// 如果是低性能,把样式替换为结束样式并触发动画
						if ( !highPerformance ) {
							loopComponent( wrapper, function ( wrapper ) {
								var el = wrapper.element;
								if ( el.animationStyle ) {
									if ( el.normalStyle ) {
										el.setAttribute( "style", el.normalStyle );
									}
									css( el, "animation", el.animationStyle );
								}
							} );
						}

						// 记录此时元素的位置
						loopComponent( wrapper, function ( wrapper ) {
							wrapper.left = wrapper.x;
							wrapper.top = wrapper.y;
						} );

						// 所有入场动画完成后触发enterEnd事件
						start = new Date();
						if ( last ) {
							csa.onAnimationEndAdvanced( last.element, function () {
								enterEndEvent.trig();
							}, last.end, function () {
								return start;
							} );
						}
						else {
							enterEndEvent.trig();
						}

						// 移除animation-prepare,启动动画播放
						// setTimeout用于处理chrome45的跳帧bug
						ua.win32 || ua.chrome ? setTimeout( function () {
							page.classList.remove( "animation-prepare" );
						}, 30 ) : page.classList.remove( "animation-prepare" );
						showEvent.trig();

						return insert( page, {
							recycle : removeEvent.trig,
							fastForward : function () {
								LinkedList.foreach( enterComponents, function ( component ) {
									var enter = component.enter;
									css.remove( component.element, "animation" );
									enter.onEnd && enter.onEnd();
									component.animationHandle.remove();
									enterComponents.remove( component );
								} );

								enterEndEvent.trig();
							}
						} );
					}
				} );
			},
			wrapper : insert( wrapper, {
				visible : true,
				element : page,
				onShow : showEvent.regist,
				onEnterEnd : enterEndEvent.regist,
				onRemove : removeEvent.regist
			} ),
			toCanvas : function () {
				var canvas = Img.Canvas( width, height );
				page.draw( canvas.context );
				return canvas;
			}
		} );
	}

	function loadPage( pageData, onLoad ) {
		pageData = pageData || {};

		function getFormat( pageData ) {
			var label = pageData.name in {qrcode : true, screen : true} ? pageData.name : pageData.label;
			return pageData.format || formats[label] || formats.SingleImage;
		}

		var format = getFormat( pageData ),
			images = [],
			kahn1990_imageinfo_arr = [],
			resource = {};

		func.callWith( function ( parse ) {
			format.load ? format.load( pageData, parse ) : parse( pageData );
		}, function ( pageData ) {
			var loadTask = [];
			format = getFormat( pageData ); // 更新format

			// 加载图片
			array.foreach( pageData.image || [], function ( src, i ) {
				var kahn1990_imageInfo_page_cache = src.imageInfo;
				loadTask.push( function ( done ) {
					src = object.is.String( src ) ? src : src.url;
					var img = Img( src, {
						crossOrigin : format.crossOrigin,
						onError : function () {
							images[i] = img;
							kahn1990_imageinfo_arr[i] = kahn1990_imageInfo_page_cache;
							done();
						},
						onLoad : function () {
							kahn1990_imageinfo_arr[i] = kahn1990_imageInfo_page_cache;
							images[i] = img;
							done();
						}
					} );
				} );
			} );

			// 加载资源
			object.foreach( format.resource, function ( name, src ) {
				loadTask.push( function ( done ) {
					var dataUrl, img, loadHandle;

					function loadDone() {
						resource[name] = img;
						done();
					}

					// 如果有点,视为图片
					if ( /\./.test( src ) ) {
						src = Img.staticSrc( src );
						dataUrl = localResource( src );
						img = Img( dataUrl || src, {
							crossOrigin : dataUrl == null,
							onError : loadDone,
							onLoad : function () {
								loadDone();
								localResource( src, function () {
									return img.imageData || imageUtil.toDataURL( img );
								} );
							}
						} );
					}
					// 否则视为图标
					else {
						img = Img.Icon( src );
						loadHandle = $.bind( img, "load", function () {
							setTimeout( loadDone, 0 );
							loadHandle.remove();
						} );
					}
				} );
			} );

			// 加载自定义图片
			array.foreach( pageData.componentImages || [], function ( img ) {
				loadTask.push( function ( done ) {
					Img.load( img, img.targetSrc, {
						crossOrigin : format.crossOrigin,
						onError : done,
						onLoad : done
					} );
				} );
			} );

			// 完成后启动
			async.concurrency( loadTask, function () {
				onLoad && onLoad( function ( width, height, context, workBody ) {
					var page = $( "div.layout" );
					page.body = workBody || page;
					page.pageData = pageData;
					page.label = pageData.label;
					context = context || {};

					// 如果板式忽略纯色,移除image中的纯色
					if ( format.ignorePureColor ) {
						images = array.remove( images, function ( img ) {
							return !!img.color;
						} );
					}

					page.resize = function ( width, height ) {
						page.innerHTML = "";
						makePage( page, width, height );

						function Field( array, defaultValue ) {
							return function ( i ) {
								return i === undefined ? array : array ? array[i] : defaultValue;
							};
						}

						try {
							if ( pageData.fail ) {
								throw new Error();
							}

							format.create( page.wrapper, object.extend( pageData, {
								data : function () {
									return pageData.data;
								},
								kahn1990_imageInfo : function kahn1990_imageInfo(i){
									return kahn1990_imageinfo_arr[i];
								},
								image : function image( i ) {
									if ( i === undefined ) {
										return array.map( images, function ( img, i ) {
											return image( i );
										} );
									}

									var img = images[i] || $( "img", {
											fail : "empty"
										} );
									img.dataSource = {
										from : "image",
										index : i
									};
									return img;
								},
								text : function ( i ) {
									var text = pageData.text[i] || "";
									return {
										dataSource : {
											from : "text",
											index : i
										},
										toString : function () {
											return text;
										}
									};
								},
								component : Field( pageData.components, {} ),
								imageinfo : Field( pageData.imageinfo, {} ),
								location : Field( pageData.location, {} ),
								video : Field( pageData.video, "" ),
								actionlinks : Field( pageData.actionlinks, "" ),
								position : Field( pageData.position, "" )
							} ), resource, context );
						}
						catch ( e ) {
							Img.pageError( page, "page-error.png" );
						}
					};
					page.resize( width, height );

					return page;
				} );
			} );
		} );
	}

	library["19"].formats = formats;
	library["19"].Component = Component;
	library["19"].drawComponent = drawComponent;
	library["19"].loopComponent = loopComponent;
	library["19"].cloneComponent = cloneComponent;
	library["19"].EnterAnimation = EnterAnimation;
	library["19"].contentToElement = contentToElement;
	library["19"].getPageMatrix = getPageMatrix;
	library["19"].loadPage = loadPage;
	library["19"].isEmphasize = isEmphasize;
	library["19"].isPerspective = isPerspective;
	library["19"].transition = transition;
} );
/**
 *    author:    胡剑青 huhuh1234567@126.com
 *    date:    2014.12
 */

library( function () {
	var LinkedList =library["3"];
	var prefix = /^[（【“‘]$/;
	var suffix = /^[）】”’，。；：？！、]$/;
	var connector = /^[0-9a-zA-Z`~!@#\$%\^&\*\(\)\-_=\+\[\{\]\}\\\|:;"'<,>\.\?\/]$/;
	var blank = /^[ 	　]$/;
	var enter = /^[\n\r]$/;

	function character( element ) {
		return element.character || "";
	}

	function isWord( left, right ) {
		return left && right &&								//both text
			(prefix.test( left ) && !blank.test( right ) ||		//prefix is not the end
			!blank.test( left ) && suffix.test( right ) ||			//suffix is not the begin
			connector.test( left ) && connector.test( right ) ||	//connectors connect
			blank.test( left ) && blank.test( right ));			//blanks connect
	}

	function BuildLines( canBreak, compressBlank ) {
		return function ( beginNode, endNode, width, indent ) {
			var offset = indent;
			var lineBeginNode = beginNode;
			var wordWidth = 0;
			var wordText = "";
			var wordBeginNode = beginNode;
			var lines = [];
			LinkedList.iterate( beginNode, endNode, function ( element ) {
				//update word
				wordWidth += element.width;
				wordText += character( element );
				//end word
				if ( canBreak( character( element ), element.next === endNode ? "" : character( element.next ) ) ) {
					//new line
					if ( enter.test( wordText ) ) {
						lines.push( lineBeginNode );
						lineBeginNode = element.next;
						offset = indent;
					}
					else if ( wordBeginNode !== lineBeginNode && offset + wordWidth > width && !(compressBlank && blank.test( character( wordBeginNode ) )) ) {
						lines.push( lineBeginNode );
						lineBeginNode = wordBeginNode;
						offset = wordWidth;
					}
					else {
						offset += wordWidth;
					}
					//reset word
					wordText = "";
					wordWidth = 0;
					wordBeginNode = element.next;
				}
			} );
			lines.push( lineBeginNode );
			return lines;
		};
	}

	var buildAllBreakLines = BuildLines( function ( left, right ) {
		return true;
	}, false );
	var buildWordBreakLines = BuildLines( function ( left, right ) {
		return !isWord( left, right );
	}, true );

	function alignLeftLine( beginNode, endNode, width, offset ) {
		var offsetX = offset;
		LinkedList.iterate( beginNode, endNode, function ( element ) {
			element.offsetX = offsetX;
			offsetX += element.width;
		} );
	}

	function alignSideLine( beginNode, endNode, width, offset ) {
		//skip back space
		var lastNode = beginNode;
		LinkedList.iterate( beginNode, endNode, function ( element ) {
			if ( !element.character || !blank.test( element.character ) ) {
				lastNode = element;
			}
		} );
		//calculate space
		var totalSpaceCount = 0;
		var totalWidth = 0;
		LinkedList.iterate( beginNode, lastNode.next, function ( element ) {
			totalWidth += element.width;
			if ( element.next !== lastNode.next && !isWord( element.character, element.next.character ) ) {
				totalSpaceCount++;
			}
		} );
		//calculate x
		var space = totalSpaceCount > 0 ? (width - offset - totalWidth) / totalSpaceCount : 0;
		var offsetX = offset;
		var spaceOffsetX = 0;
		var spaceCount = 0;
		LinkedList.iterate( beginNode, endNode, function ( element ) {
			element.offsetX = offsetX + spaceOffsetX;
			offsetX += element.width;
			if ( element.next !== endNode && !isWord( element.character, element.next.character ) ) {
				spaceCount++;
				spaceOffsetX = (space * Math.min( spaceCount, totalSpaceCount ) + 0.5) << 0;
			}
		} );
	}

	library["20"].buildAllBreakLines = buildAllBreakLines;
	library["20"].buildWordBreakLines = buildWordBreakLines;
	library["20"].alignLeftLine = alignLeftLine;
	library["20"].alignSideLine = alignSideLine;
} );
/**
 * Created by Zuobai on 2015/3/15.
 * 区间算法
 * 区间指这样一种数组[0,3,6,10],0-3,3-6,6-10各视为一个区间
 */

library( function () {
	// 遍历区间,提供一个序列输入value的函数
	function foreach( value, block ) {
		var previous = null;
		value( function ( value ) {
			previous && block( previous, value );
			previous = value;
		} );
		block( previous, null );
	}

	library["21"].foreach = foreach;
} );

/**
 * Created by Zuobai on 2014/12/13.
 */

library( function () {
	var textUtil =library["20"],
		section =library["21"],
		string =library["5"],
		List =library["3"],
		array =library["1"];

	var MeasureGc = function () {
		var gc;
		return function () {
			return gc ? gc : gc = document.createElement( "canvas" ).getContext( "2d" );
		};
	}();

	// 根据style对象生成一个font字符串
	function Font( style ) {
		style = style || {};
		return [style.fontStyle || "normal", style.fontVariant || "normal", style.fontWeight || "normal",
			( style.fontSize || 12 ) + "px", style.fontFamily || "sans-serif"].join( " " );
	}

	// 测量文字
	function measureText( text, style ) {
		var gc = MeasureGc();
		gc.font = Font( style );
		return gc.measureText( text );
	}

	// 根据样式和宽度摆放样式
	function layText( text, width, style ) {
		var gc = MeasureGc(),
			marginCount = 0, lineCount = 0,
			list = List(),
			align = style.align;

		gc.font = Font( style );

		// 计算每个字符的宽度
		string.foreach( text.replace( /\r/g, "" ), function ( ch ) {
			list.insert( {
				character : ch,
				width : ch === "\n" ? 0 : gc.measureText( ch ).width
			}, null );

			if ( ch === "\n" ) {
				++marginCount;
			}
		} );

		// 断行,遍历断行的结果(区间链表),算对齐
		section.foreach( function ( value ) {
			array.foreach( style.lineBreak( list.head(), null, width, 0 ), value );
		}, function ( start, end ) {
			start && ( start.lineStart = true );
			align( start, end, width, 0 );
			++lineCount;
		} );

		list.style = style;
		list.width = width;
		list.height = lineCount * style.lineHeight + marginCount * ( style.margin || ( style.margin = 0 ) );
		return list;
	}

	// 绘制纯文字排版
	function drawTextLayout( gc, layout ) {
		var style = layout.style,
			lineHeight = style.lineHeight,
			margin = style.margin,
			y = -lineHeight,
			midY = lineHeight / 2 << 0;

		gc.font = Font( style );
		gc.fillStyle = style.color;
		gc.textBaseline = "middle";

		List.foreach( layout, function ( node ) {
			if ( node.lineStart ) {
				y += lineHeight;
			}
			if ( node.character === "\n" ) {
				y += margin;
			}

			gc.fillText( node.character, node.offsetX, y + midY );
		} );
	}

	library["22"].LineBreak = {
		breakAll : textUtil.buildAllBreakLines,
		normal : textUtil.buildWordBreakLines
	};

	library["22"].Align = {
		left : textUtil.alignLeftLine,
		side : function ( begin, end, width ) {
			( end && end.previous.character !== "\n" ? textUtil.alignSideLine : textUtil.alignLeftLine )( begin, end, width, 0 );
		}
	};

	library["22"].Font = Font;
	library["22"].measureText = measureText;
	library["22"].layText = layText;
	library["22"].drawTextLayout = drawTextLayout;
} );
/**
 * Created by 白 on 2015/7/14.
 */

library( function () {
	var object =library["2"],
		css =library["6"],
		z2d =library["17"],
		m2d = z2d.matrix,
		ua =library["14"],
		array =library["1"],

		rect568 = {w : 320, h : 568},
		rect504 = {w : 320, h : 504};

	function transform( arg ) {
		var s = arg.s, d = arg.d,
			sWidth = s.w, sHeight = s.h,
			dWidth = d.w, dHeight = d.h,
			scale = arg.scale( sWidth, sHeight, dWidth, dHeight ),
			x = ( dWidth - sWidth * scale ) * ( arg.x || 0.5 ),
			y = ( dHeight - sHeight * scale ) * ( arg.y || 0.5 ),
			matrix = z2d.combine( m2d.translate( x, y ), m2d.scale( scale, scale ) );

		function clip( dSize, size, align ) {
			var offset = ( dSize - size * scale ) * align;
			return offset > 0 ? [0, size, offset, size * scale] : [-offset / scale, dSize / scale, 0, dSize];
		}

		return {
			x : x,
			y : y,
			w : dWidth,
			h : dHeight,
			tw : sWidth * scale,
			th : sHeight * scale,
			scale : scale,
			matrix : matrix,
			draw : array.zip( [clip( dWidth, sWidth, arg.x || 0.5 ), clip( dHeight, sHeight, arg.y || 0.5 )] )
		};
	}

	function drawImage( gc, image, l ) {
		var scale = l.scale, draw = l.draw,
			nW = image.naturalWidth, nH = image.naturalHeight,
			sX = draw[0], sY = draw[1],
			sW = draw[2], sH = draw[3],
			tX = draw[4], tY = draw[5],
			tW = draw[6], tH = draw[7];

		if ( ua.ios ) {
			gc.save();
			gc.translate( tX, tY );
			gc.beginPath();
			gc.rect( 0, 0, tW, tH );
			gc.clip();
			gc.drawImage( image, -sX / sW * tW, -sY / sH * tH, nW * scale, nH * scale );
			gc.restore();
		}
		else {
			gc.drawImage.apply( gc, [image].concat( draw ) );
		}
	}

	var scale = transform.scale = {
		cover : function ( sWidth, sHeight, dWidth, dHeight ) {
			return dWidth / dHeight < sWidth / sHeight ? dHeight / sHeight : dWidth / sWidth;
		},
		contain : function ( sWidth, sHeight, dWidth, dHeight ) {
			return dWidth / dHeight < sWidth / sHeight ? dWidth / sWidth : dHeight / sHeight;
		},
		y : function ( sWidth, sHeight, dWidth, dHeight ) {
			return dHeight / sHeight;
		}
	};

	transform.cover = function ( d ) {
		return transform( {
			s : rect568,
			d : d,
			scale : scale.cover
		} );
	};

	transform.y = function ( d ) {
		return transform( {
			s : rect568,
			d : d,
			scale : scale.y
		} );
	};

	transform.cover504 = function ( d ) {
		return transform( {
			s : rect504,
			d : d,
			scale : scale.cover
		} );
	};

	transform.drawImage = drawImage;
	library["23"] = transform;
} );
/**
 * Created by 白 on 2015/7/14.
 */

library( function () {
	var $ =library["8"],
		css =library["6"],
		px = css.px,

		object =library["2"],
		insert = object.insert,
		textViewer =library["22"],
		Font = textViewer.Font,

		Transform =library["23"],
		ua =library["14"],
		Img =library["16"],
		Layout =library["19"];

	// 内容
	function Content( func ) {
		return function ( ds ) {
			return object.insert( func.apply( null, arguments ), {
				dataSource : ds ? ds.dataSource : null
			} );
		};
	}

	// region 图片
	// 图片覆盖
	var Frame = library["24"].Frame = Content( function ( img, transform ) {
		return img.fail ? Fail( img, transform ) : {
			width : transform.w,
			height : transform.h,
			element : function () {
				img = img.cloneNode( false );
				if ( ua.android ) {
					css( img, {
						height : css.px( transform.th ),
						"margin-left" : css.px( transform.x ),
						"margin-top" : css.px( transform.y )
					} );
				}
				else {
					css( img, "transform-origin", "0 0" );
					css.transform( img, css.matrix( transform.matrix ) );
				}

				return $( "div", {
					css : {
						overflow : "hidden"
					},
					children : img
				} );
			},
			draw : function ( gc ) {
				Transform.drawImage( gc, img, transform );
			}
		};
	} );

	// 失败的图片
	function Fail( img, arg ) {
		var notFound = Img.imageNotFound;

		if ( img.fail === "fatal" ) {
			throw new Error();
		}

		return img.fail !== "empty" && arg.w && arg.h ? Frame( notFound, Transform( {
			s : notFound,
			d : arg,
			scale : function () {
				return Math.min( 0.5, arg.w / notFound.fullWidth * 0.3, arg.h / notFound.fullHeight * 0.3 );
			}
		} ) ) : {
			width : 0,
			height : 0,
			element : function () {
				return $( "div" );
			},
			draw : function () {
			}
		};
	}

	// 图片
	library["24"].Image = Content( function ( img, arg ) {
		var wh = object.is.Number( arg ) ? {w : img.w * arg, h : img.h * arg} : arg,
			width = wh.w, height = wh.h;

		return img.fail ? Fail( img, wh ) : {
			width : width,
			height : height,
			element : function () {
				return img.cloneNode( true );
			},
			draw : function ( gc ) {
				gc.drawImage( img, 0, 0, width, height );
			}
		};
	} );

	// 覆盖图片
	library["24"].Cover = Content( function ( img, arg ) {
		return Frame( img, Transform( {
			s : {w : img.fullWidth, h : img.fullHeight},
			d : arg,
			scale : Transform.scale.cover
		} ) );
	} );

	// 画布
	library["24"].Canvas = function ( canvas ) {
		return {
			width : canvas.logicalWidth,
			height : canvas.logicalHeight,
			element : function () {
				return canvas;
			},
			draw : function ( gc ) {
				gc.drawImage( canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.logicalWidth, canvas.logicalHeight )
			}
		};
	};

	// 边框
	library["24"].Border = function ( content, borderStyle ) {
		var borderWidth = borderStyle.width || 0,
			borderColor = borderStyle.color || "transparent",
			borderRadius = borderStyle.radius || 0,
			width = content.width,
			height = content.height;

		return {
			dataSource : content.dataSource,
			width : width + borderWidth,
			height : height + borderWidth,
			element : function () {
				var inner = $( Layout.contentToElement( content ), {
						css : {
							overflow : "hidden",
							"box-sizing" : "border-box",
							border : ["solid", px( borderWidth ), borderColor].join( " " ),
							"border-radius" : px( borderRadius )
						}
					} ),
					outer = inner;

				// 处理安卓的圆角bug
				if ( ua.android && inner.querySelector( "img" ) ) {
					outer = $( "div", [inner] );
					css.size( inner, width + borderWidth, height + borderWidth );
				}

				return outer;
			},
			draw : function ( gc ) {
				gc.save();
				if ( borderRadius ) {
					gc.beginPath();
					gc.moveTo( borderRadius, 0 );
					gc.lineTo( width - borderRadius, 0 );
					gc.arcTo( width, 0, width, borderRadius, borderRadius );
					gc.lineTo( width, height - borderRadius );
					gc.arcTo( width, height, width - borderRadius, height, borderRadius );
					gc.lineTo( borderRadius, height );
					gc.arcTo( 0, height, 0, height - borderRadius, borderRadius );
					gc.lineTo( 0, borderRadius );
					gc.arcTo( 0, 0, borderRadius, 0, borderRadius );
					gc.clip();
				}

				gc.save();
				gc.translate( borderWidth, borderWidth );
				content.draw( gc );
				gc.restore();

				if ( borderWidth ) {
					gc.fillStyle = borderColor;
					gc.fillRect( 0, 0, width, borderWidth );
					gc.fillRect( 0, 0, borderWidth, height );
					gc.fillRect( width, 0, borderWidth, height + borderWidth );
					gc.fillRect( 0, height, width + borderWidth, borderWidth );
				}
				gc.restore();
			}
		};
	};

	library["24"].Mask = function ( content, mask ) {
		var width = content.width,
			height = content.height;

		return {
			dataSource : content.dataSource,
			width : width,
			height : height,
			element : function () {
				var inner = $( Layout.contentToElement( content ), {
						css : {
							overflow : "hidden",
							"box-sizing" : "border-box",
							"mask-image" : css.url( mask.src ),
							"mask-size" : "100% 100%"
						}
					} ),
					outer = inner;

				// 处理安卓的mask bug
				if ( ua.android ) {
					outer = $( "div.mask", [inner] );
					css.size( inner, width, height );
				}

				outer.mask = mask.src;

				return outer;
			},
			draw : function ( gc ) {
				var contentCanvas = Img.Canvas( width, height, 1 ),
					contentGc = contentCanvas.context;
				content.draw( contentGc );
				contentGc.globalCompositeOperation = "destination-in";
				contentGc.drawImage( mask, 0, 0, width, height );
				gc.drawImage( contentCanvas, 0, 0, width, height );
			}
		};
	};
	// endregion

	// region 形状
	// 矩形,如未提供颜色,就是一个空矩形
	library["24"].Rect = function ( width, height, color ) {
		return {
			width : width,
			height : height,
			element : function () {
				return $( "div", {
					css : {
						background : color || "transparent"
					}
				} );
			},
			draw : function ( gc ) {
				if ( color ) {
					gc.fillStyle = color;
					gc.fillRect( 0, 0, width, height );
				}
			}
		};
	};

	// 圆形
	library["24"].Circle = function ( r, color ) {
		return {
			width : r * 2,
			height : r * 2,
			element : function () {
				return $( "div", {
					css : {
						"border-radius" : px( r ),
						background : color || "transparent"
					}
				} );
			},
			draw : function ( gc ) {
				if ( color ) {
					gc.save();
					gc.beginPath();
					gc.arc( r, r, r, 0, 2 * Math.PI );
					gc.closePath();
					gc.fillStyle = color;
					gc.fill();
					gc.restore();
				}
			}
		}
	};
	// endregion

	// region 文本
	// 测量
	function measure( func ) {
		var canvas = document.createElement( "canvas" );
		func( canvas.getContext( "2d" ) );
	}
	/* kahn1990 on 2015/11/17 cutString getTrueLength*/
	function getTrueLength(str){//获取字符串的真实长度（字节长度）
		var len = str.length, truelen = 0;
		for(var x = 0; x < len; x++){
			if(str.charCodeAt(x) > 128){
				truelen += 2;
			}else{
				truelen += 1;
			}
		}
		return truelen;
	}
	function cutString(str, leng){//按字节长度截取字符串，返回substr截取位置
		var len = str.length, tlen = len, nlen = 0;
		for(var x = 0; x < len; x++){
			if(str.charCodeAt(x) > 128){
				if(nlen + 2 <= leng){
					nlen += 2;
				}else{
					tlen = x;
					break;
				}
			}else{
				if(nlen + 1 < leng){
					nlen += 1;
				}else{
					tlen = x;
					break;
				}
			}
		}
		return tlen;
	};
	// 行文本
	function LineText( text, width, info ) {
		var fontSize = info.fontSize;
		var info_kahn1990_str_lang = info.kahn1990_str_lang||false;
		var info_kahn1990_str_lang_height = (info_kahn1990_str_lang == false)?(fontSize+2):(fontSize+4)*Math.floor(getTrueLength(text)/info_kahn1990_str_lang);

		function draw( gc, height ) {
			// 绘制
			gc.font = Font( info );
			gc.textBaseline = "middle";
			gc.fillStyle = info.color;

			var kahn1990_text_length_cache = text.length;

			(info_kahn1990_str_lang == false)
				? function(){
					gc.fillText( text, 0, height / 2 << 0 );
				}()
				:function(){

					for(var i = 1; i <= kahn1990_text_length_cache; i++){

						var tl = cutString(text, info_kahn1990_str_lang);
						gc.fillText(text.substr(0, tl), 0, (height*(i-1)+height/2));
						text = text.substr(tl);

					}
				}();
		}

		return {
			width : width,
			height : fontSize,
			element : function () {
				var canvas = Img.Canvas( width + 4, info_kahn1990_str_lang_height ),
					gc = canvas.context;
				gc.translate( 2, 0 );
				draw( gc, fontSize + 4 );

				return $( "div", [$( canvas, {
					css : {
						"margin-left" : "-2px",
						"margin-top" : "-2px"
					}
				} )] );
			},
			draw : function ( gc ) {
				draw( gc, fontSize );
			}
		};
	}

	// 标签,不指定宽度.文字多长,宽度就是多少
	library["24"].Label = Content( function ( text, info ) {
		text = text.toString();
		var fontSize = info.fontSize;
		var info_kahn1990_str_lang = info.kahn1990_str_lang||false;
		/* kahn1990 添加宽度 */
		var kahn1990_width = info.width=="false"?textViewer.measureText( text, info ).width:info.width;
		var LineTextBody = LineText( text, kahn1990_width, info);
		LineTextBody.height = (info_kahn1990_str_lang == false)?(fontSize+2):(fontSize+4)*Math.floor(getTrueLength(text)/info_kahn1990_str_lang);

		return LineTextBody;
	} );

	// 行文本,需指定宽度,多出部分截取
	library["24"].LineText = Content( function ( text, info ) {
		text = text.toString();
		var width = info.width,
			drawText = "";

		measure( function ( gc ) {
			function getWidth( text ) {
				return gc.measureText( text ).width;
			}

			gc.font = Font( info );
			if ( info.overflow && getWidth( text ) > width ) {
				for ( var i = 0; i !== text.length; ++i ) {
					if ( getWidth( text.substring( 0, i + 1 ) + "…" ) > width ) {
						break;
					}
				}
				drawText = text.substring( 0, i ) + "…";
			}
			else {
				drawText = text;
			}
		} );

		return LineText( drawText, width, info );
	} );

	// 块文本
	library["24"].BlockText = Content( function ( text, info ) {
		text = text.toString();

		var textLayout = textViewer.layText( text, info.width, insert( info, {
			lineBreak : info.breakWord ? textViewer.LineBreak.breakAll : textViewer.LineBreak.normal,
			align : info.breakWord ? textViewer.Align.left : textViewer.Align.side
		} ) );

		return {
			width : info.width,
			height : textLayout.height,
			draw : function ( gc ) {
				textViewer.drawTextLayout( gc, textLayout );
			}
		};
	} );
	// endregion
} );
/**
 * Created by 白 on 2015/7/15.
 * 用于封装一些偷懒的写法
 */

library( function () {
	var z2d =library["17"],
		array =library["1"],
		css =library["6"],

		ua =library["14"],
		Layout =library["19"],
		Content =library["24"],
		Transform =library["23"];

	// 切换页面,修复一些特殊机型的bug
	function cutPage( cut ) {
		ua.chuye && ua.mi4 ? setTimeout( cut, 30 ) : cut();
	}

	// 504板式
	function layout504( layout, backgroundImage ) {
		var transform = Transform.cover504( layout );

		if ( backgroundImage ) {
			Layout.Component( Content.Cover( backgroundImage, layout ), layout );
		}

		return {
			scale : transform.scale,
			image : function ( image, parent ) {
				return Layout.Component( Content.Image( image, transform.scale ), parent );
			},
			x : function ( x ) {
				return z2d.transform( transform.matrix, [x, 0, 1] )[0];
			},
			y : function ( y ) {
				return z2d.transform( transform.matrix, [0, y, 1] )[1];
			}
		};
	}

	function staticCenter( el ) {
		return css( el, {
			position : "absolute",
			left : "50%",
			top : "50%",
			transform : "translate3d(-50%,-50%,0)"
		} ).element;
	}

	library["25"].cutPage = cutPage;
	library["25"].layout504 = layout504;
	library["25"].staticCenter = staticCenter;
} );
/**
 * Created by 白 on 2015/6/10.
 * 全局函数
 */

library( function () {
	var $ =library["8"],
		object =library["2"],
		pointer =library["11"],
		async =library["4"],
		array =library["1"],
		css =library["6"],

		ua =library["14"],

		outRange = ua.chuye ? 5 : 8,
		tapTrig = false,
		longPressDuration = 500,
		inDown = 0,
		removeHandles = [],

		onMoveUp = pointer.onMoveUp,
		onPointerMove = pointer.onPointerMove,
		onPointerUp = pointer.onPointerUp,

		ui = {},
		alert,
		preventBodyEvent = false,
		preventDrag = false;

	// 全局屏蔽默认事件,如果某节点需要默认事件,加类.need-default
	pointer.onPointerDown( document, function ( event ) {
		var prevent = true;
		$.bubble( event.origin.target, function ( node ) {
			if ( node.classList.contains( "need-default" ) ) {
				prevent = false;
			}
		} );

		if ( inDown === 0 ) {
			inDown = 1;
		}
		else if ( inDown === 1 ) {
			inDown = 2;
		}

		prevent && event.preventDefault();
	}, true );

	onPointerUp( document, function () {
		array.foreach( removeHandles, function ( removeHandle ) {
			removeHandle.remove();
		} );
		inDown = 0;
		removeHandles = [];
	}, true );

	function onPointerDown( el, response ) {
		el.style && css( el, "pointer-events", "auto" );
		return pointer.onPointerDown( el, function ( event ) {
			var removeHandle = $.bind( event.origin.target, "DOMNodeRemovedFromDocument", function () {
				removeHandle.remove();
				inDown = 0;
			} );
			removeHandles.push( removeHandle );

			if ( inDown !== 2 ) {
				response( event );
			}
		} );
	}

	function PointerTrack() {
		var dX = 0,
			dY = 0,
			info = {
				track : function ( event ) {
					dX += event.dX;
					dY += event.dY;

					var x = Math.abs( dX ) > outRange,
						y = Math.abs( dY ) > outRange;

					info.dX = dX;
					info.dY = dY;
					info.xOut = x;
					info.yOut = y;
					info.out = x || y;
				}
			};

		return info;
	}

	function onSwipe( response, hasTimeout ) {
		var pointerTrack = PointerTrack(),
			checkHandle = onMoveUp( {
				onMove : function ( event ) {
					pointerTrack.track( event );
					if ( pointerTrack.out ) {
						checkHandle.remove();
						response && response( {
							xOut : pointerTrack.xOut,
							yOut : pointerTrack.yOut,
							dX : pointerTrack.dX,
							dY : pointerTrack.dY
						} );
					}
				},
				onUp : function () {
					timeout && clearTimeout( timeout );
				}
			} ),
			timeout = hasTimeout ? null : setTimeout( function () {
				inDown = 0;
				checkHandle.remove();
			}, longPressDuration );

		return {
			remove : function () {
				checkHandle.remove();
				timeout && clearTimeout( timeout );
			}
		};
	}

	function onSwipeStart( el, response ) {
		return onPointerDown( el, function () {
			onSwipe( response );
		} );
	}

	onPointerUp( document, function () {
		tapTrig = false;
		preventBodyEvent = false;
		preventDrag = false;
	} );

	function onTapUp( response ) {
		var pointerTrack = PointerTrack(),

			tapHandle = onPointerUp( document.documentElement, function ( event ) {
				if ( !tapTrig ) {
					response && response( event );
					tapTrig = true;
				}
			} ),

			timeout = setTimeout( function () {
				tapHandle.remove();
				checkHandle.remove();
			}, longPressDuration ),

			checkHandle = onMoveUp( {
				onMove : function ( event ) {
					pointerTrack.track( event );
					if ( pointerTrack.out ) {
						clear();
					}
				},
				onUp : clear
			} );

		function clear() {
			checkHandle.remove();
			clearTimeout( timeout );
			tapHandle.remove();
		}

		return {
			remove : clear
		};
	}

	function onTap( el, response ) {
		return onPointerDown( el, function () {
			onTapUp( response );
		} );
	}

	function onLongPress( response ) {
		var pointerTrack = PointerTrack(),

			timeout = setTimeout( function () {
				checkHandle.remove();
				response && response();
			}, longPressDuration ),
			checkHandle = onMoveUp( {
				onMove : function ( event ) {
					pointerTrack.track( event );
					if ( pointerTrack.out ) {
						clear();
					}
				},
				onUp : clear
			} );

		function clear() {
			checkHandle.remove();
			clearTimeout( timeout );
		}

		return {
			remove : clear
		};
	}

	// 锁定屏幕,不接受鼠标动作
	function Lock( el ) {
		el = el || document.documentElement;
		el.classList.add( "lock" );

		return {
			remove : function () {
				el.classList.remove( "lock" );
			}
		};
	}

	// 弹出消息
	alert = function () {
		var msgBox, msg;

		return function ( text, delay ) {
			// 第一次弹出消息时创建消息框
			if ( !msgBox ) {
				msgBox = $( "div.msg-box", {
					css : {
						transform : ua.chuyeList ? "translate3d(0,50%,0)" : undefined,
						bottom : ua.chuyeList ? "50%" : css.px( 40 )
					}
				}, document.body );
				msg = $( "div.msg", msgBox );
			}

			msg.innerHTML = text;
			$.classList( msgBox ).remove( "remove" ).add( "show" );

			async.once( function () {
				$.classList( msgBox ).add( "remove" ).remove( "show" );
			}, function ( removeMsg ) {
				return [onPointerDown( document, removeMsg ), async.setTimeout( removeMsg, delay || 2000 )];
			} );
		};
	}();

	Object.defineProperties( ui, {
		preventBodyEvent : {
			get : function () {
				return preventBodyEvent
			},
			set : function ( val ) {
				preventBodyEvent = val;
			}
		},
		preventDrag : {
			get : function () {
				return preventDrag;
			},
			set : function ( val ) {
				preventDrag = val;
			}
		}
	} );

	// 焦点时设置focus类
	$.onBubble( "focusin", function ( node ) {
		node.classList.add( "focus" );
	} );
	$.onBubble( "focusout", function ( node ) {
		node.classList.remove( "focus" );
	} );

	library["26"] = object.insert( ui, {
		onPointerDown : onPointerDown,
		onPointerMove : onPointerMove,
		onPointerUp : onPointerUp,
		onMoveUp : onMoveUp,
		onSwipeStart : onSwipeStart,
		onSwipe : onSwipe,
		onLongPress : onLongPress,
		onTap : onTap,
		onTapUp : onTapUp,

		alert : alert,
		Lock : Lock
	} );
} );
/**
 * Created by 白 on 2015/6/10.
 */

library( function () {
	var css =library["6"],
		csa =library["10"],
		async =library["4"],
		object =library["2"],
		array =library["1"],
		URL =library["9"],
		$ =library["8"],

		ua =library["14"],
		Img =library["16"],
		ui =library["26"],
		inLogin = false,
		openContext = getSessionData( "open-in-browser" );

	if ( openContext ) {
		var tipsPage = $( "div", {
			css : css.full( {
				"background-color" : "rgba(0,0,0,0.88)",
				"z-index" : 100000
			} ),
			children : [
				Img( Img.staticSrc( [openContext, "-", ua.ios ? "ios" : "android", ".png"].join( "" ) ), {
					onLoad : function ( img ) {
						tipsPage.appendChild( $( img, {
							css : {
								position : "absolute",
								top : 0,
								right : 0,
								width : css.px( img.halfWidth )
							}
						} ) );
					}
				} )
			]
		}, document.body );
		ui.onTap( tipsPage, function () {
			$.remove( tipsPage );
		} );
	}

	function workLocation() {
		return location.origin + location.pathname;
	}

	// 保存浏览上下文
	function saveViewContext() {
		window.curWork && sessionStorage.setItem( workLocation(), JSON.stringify( {
			pageIndex : curWork.curPageIndex,
			workData : curWork.workData
		} ) );
	}

	// 跳转到链接,记录当前页码
	function jump( href, notSave ) {
		if ( window.firstpage && firstpage.open ) {
			firstpage.open( URL.toAbsolute( href ) );
		}
		else {
			!notSave && saveViewContext();
			location.href = href;
		}
	}

	// 获取session数据,并清除它
	function getSessionData( key, defaultValue ) {
		var retVal = sessionStorage.getItem( key );
		sessionStorage.removeItem( key );
		return retVal === null ? defaultValue : retVal;
	}

	// 滑页
	function SlidePage() {
		var page = $( "div", {
				css : css.full( {
					overflow : "hidden",
					"z-index" : 1001
				} )
			} ),
			slideInEvent = async.Event(),
			slideOutEvent = async.Event();

		ui.onPointerDown( page, function () {
			ui.preventBodyEvent = true;
		} );

		return object.insert( page, {
			onSlideIn : slideInEvent.regist,
			onSlideOut : slideOutEvent.regist,
			slideIn : function ( parent, noTransition ) {
				page.isIn = true;
				if ( !noTransition ) {
					var lock = ui.Lock();
					css( page, "visibility", "hidden" );
					setTimeout( function () {
						css( page, "visibility", "visible" );
						csa.runAnimation( [page, {
							0 : {
								transform : "translate3d(100%, 0, 0)"
							}
						}, 0.4], function () {
							slideInEvent.trig();
							lock.remove();
						} );
					}, 0 );
				}

				page.slideOut = function () {
					var lock = ui.Lock();
					slideOutEvent.trig();
					csa.runAnimation( [page, {
						100 : {
							transform : "translate3d(100%, 0, 0)"
						}
					}, 0.4], function () {
						lock.remove();
						$.remove( page );
					} );
					page.isIn = false;
				};

				parent.appendChild( page );
			}
		} );
	}

	// 注册一个登录页
	function registLoginPage( name, loginSystem, make ) {
		return registLoginPage[name] = function ( arg ) {
			if ( inLogin ) {
				return;
			}

			arg = arg || {};

			// 滑入页面
			function slidePageIn() {
				var page = SlidePage();
				make( page, arg.data );
				page.slideIn( arg.parent, arg.noAnimate );
			}

			if ( arg.debug ) {
				slidePageIn();
			}
			else if ( !loginSystem ) {
				ui.alert( "当前环境不支持该操作" );
			}
			else if ( loginSystem.canNotLogin ) {
				loginSystem.canNotLogin();
			}
			else if ( !arg.force && ( arg.noLog || loginSystem.isLogIn() ) ) {
				arg.onLogin ? arg.onLogin( slidePageIn ) : slidePageIn();
			}
			else {
				saveViewContext();
				sessionStorage.setItem( "login-data", JSON.stringify( {
					name : name,
					data : arg.data
				} ) );
				inLogin = true;
				loginSystem.logIn( {
					returnUrl : location.href,
					onLogIn : function () {
						sessionStorage.removeItem( workLocation() );
						sessionStorage.removeItem( "login-data" );
						inLogin = false;
						slidePageIn();
					}
				} );
				if ( inLogin ) {
					ui.alert( "登录中,请稍候" );
				}
			}
		};
	}

	// 在浏览器中打开做某事
	function openInBrowser( name, iosLink, androidLink ) {
		saveViewContext();
		sessionStorage.setItem( "open-in-browser", name );
		location.hash = "g:" + ( ua.ios ? iosLink : androidLink );
		location.reload();
	}

	function report( id ) {
		jump( "/report.html" + "#" + id );
	}

	function follow( uid ) {
		openInBrowser( "follow", "Cloud7Chuye://users/" + uid, URL.concatArg( "chuye://chuye.cloud7.com.cn/user", {
			id : uid
		} ) );
	}

	function openInClient( id, uid ) {
		openInBrowser( "open-in-client", "ChuyeWatch://work/" + id, URL.concatArg( "chuye://chuye.cloud7.com.cn/user", {
			userId : uid,
			workId : id
		} ) );
	}

	// 记录页面访问
	function track( args ) {
		//window.cas ? cas.trackEvent( args ) : ua.win32 && console.log( args.join( " " ) );
	}

	// 下载初页
	function downloadFirstPage( trackName ) {
		if ( ua.chuye ) {
			ui.alert( "您正在使用初页" );
		}
		else {
			track( [trackName || "Download", "Click", ua.systemName] );

			if ( ua.android ) {
				location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.cloud7.firstpage";
			}
			else if ( ua.ios ) {
				location.href = ua.MicroMessenger ? "http://a.app.qq.com/o/simple.jsp?pkgname=com.cloud7.firstpage"
					: "https://itunes.apple.com/cn/app/chu-ye/id910560238?mt=8";
			}
			else {
				jump( "http://www.cloud7.com.cn/chuye" );
			}
		}
	}

	// 和客户端互动
	function useClient( interfaces, callback ) {
		async.polling( function () {
			return !!window.firstpage;
		}, function () {
			// 如果是ios手动制作对应方法
			if ( ua.ios && !ua.win32 ) {
				array.foreach( interfaces, function ( name ) {
					firstpage[name] = function () {
						document.location = "chuyeapp:" + name + ":" + Array.prototype.slice.call( arguments, 0 ).join( "$" );
					};
				} );
			}

			callback && callback();
		} );
	}

	library["27"].workLocation = workLocation;
	library["27"].saveViewContext = saveViewContext;
	library["27"].jump = jump;
	library["27"].registLoginPage = registLoginPage;
	library["27"].getSessionData = getSessionData;
	library["27"].SlidePage = SlidePage;
	library["27"].report = report;
	library["27"].follow = follow;
	library["27"].openInClient = openInClient;
	library["27"].downloadFirstPage = downloadFirstPage;
	library["27"].track = track;
	library["27"].useClient = useClient;
} );
/**
 * Created by 白 on 2015/6/9.
 */

library( function () {
	var object =library["2"],
		array =library["1"],
		$ =library["8"],

		ua =library["14"],
		env =library["27"],

		shareData = {};

	// 分享到微信
	function shareWeixin() {
		function shareArg( where, noDesc ) {
			var arg = {
				title : shareData.title,
				link : shareData.url,
				imgUrl : shareData.picture,
				success : function () {
					var xhr = new XMLHttpRequest();
					xhr.open( "post", virtualPath + "/Work/Share", true );
					xhr.send( null );
					env.track( ["Share", where] );
				}
			};

			return noDesc ? arg : object.extend( arg, {
				desc : shareData.desc
			} );
		}

		if ( window.wx && shareData.title !== undefined ) {
			wx.onMenuShareTimeline( shareArg( "TimeLine", true ) ); // 分享到朋友圈
			wx.onMenuShareAppMessage( shareArg( "AppMessage" ) ); // 分享给朋友
			wx.onMenuShareQQ( shareArg( "QQ" ) ); // 分享到当前目录
			wx.onMenuShareWeibo( shareArg( "Weibo" ) ); // 分享给微博
		}
	}

	// 加载微信脚本
	if ( ua.MicroMessenger && window.wxConfig ) {
		$( "script", {
			src : "http://res.wx.qq.com/open/js/jweixin-1.0.0.js",
			onload : function () {
				wx.ready( function () {
					shareWeixin();
					wx.getNetworkType( {
						success : function ( res ) {
							ua.networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
						}
					} );
				} );

				wx.config( object.extend( window.wxConfig, {
					debug : false,
					jsApiList : ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "getNetworkType"]
				} ) );

				this.onload = null;
			}
		}, document.head )
	}

	// 设置分享数据
	library["28"] = function ( data ) {
		shareData = data;
		data.title && ( document.title = data.title );
		shareWeixin();
	};
} );
/**
 * Created by 白 on 2015/3/12.
 */
library( function () {
	var $ =library["8"],
		css =library["6"],
		pointer =library["11"],
		csa =library["10"],
		object =library["2"],
		insert = object.insert,
		Img =library["16"],

		spin = {
			100 : {
				transform : "rotateZ(360deg)"
			}
		};

	// 加载
	function Loading() {
		return $( "div", {
			css : {
				"position" : "absolute",
				"left" : "50%",
				"top" : "50%",
				"width" : "34px",
				"height" : "34px",
				"margin-left" : "-17px",
				"margin-top" : "-17px",
				"z-index" : "1000"
			},
			children : [
				$( Img.Icon( "loading-o" ), {
					css : {
						position : "absolute",
						left : 0,
						top : 0
					}
				} ),
				$( Img.Icon( "loading-c" ), {
					css : {
						position : "absolute",
						left : 0,
						top : 0,
						animation : csa.animation( [spin, 1.1, "linear", "infinite"] )
					}
				} )
			]
		} );
	}

	// 音乐图标
	function Music() {
		var el = $( "div", {
				classList : "tips",
				css : {
					position : "absolute",
					top : 0,
					right : 0,
					width : "40px",
					height : "40px",
					"z-index" : 1000
				},
				children : [
					$( "div", {
						css : {
							position : "absolute",
							left : "-20px",
							top : 0,
							right : 0,
							bottom : "-20px"
						}
					} )
				]
			} ),
			icon = $( Img.Icon( "music" ), {
				css : {
					"border-radius" : "20px",
					border : "2px solid rgba(130, 170, 118, 0.6)"
				}
			}, el );

		css( icon, insert( css.center( icon.w ), css.middle( icon.h ) ) );

		object.defineAutoProperty( el, "play", {
			value : false,
			set : function ( val ) {
				if ( val ) {
					csa.runAnimation( [icon, spin, 2.3, "linear", "infinite"] );
				}
				else {
					css.remove( icon, "animation" );
				}
			}
		} );

		return el;
	}

	// 唱片图标
	function Album() {
		return $( Img.Icon( "album" ), {
			classList : "tips",
			css : {
				position : "absolute",
				top : "14px",
				right : "14px",
				animation : csa.animation( [spin, 2.3, "linear", "infinite"] ),
				"z-index" : 1000
			}
		} );
	}

	// 菊花加载
	function LoadingChrysanthemum() {
		return $( Img.Icon( "loading-new-page" ), {
			css : {
				display : "inline-block",
				"vertical-align" : "top",
				animation : csa.animation( [spin, 1.3, "linear", "infinite"] )
			}
		} );
	}

	// 加载新页提示
	function LoadingNewPage() {
		return $( "div", {
			classList : "tips",
			css : {
				"position" : "absolute",
				"left" : "0",
				"right" : "0",
				"bottom" : "8px",
				"height" : "20px",
				"z-index" : "10",
				"line-height" : "20px",
				"text-align" : "center",
				"pointer-events" : "none"
			},
			children : [
				LoadingChrysanthemum(),
				$( "div", {
					css : {
						"display" : "inline-block",
						"vertical-align" : "top",
						"margin-left" : "12px",
						"color" : "#888888",
						"font-size" : "14px"
					},
					innerHTML : "加载新页中"
				} )
			]
		} );
	}

	// 加载按钮
	function LoadingButton() {
		var icon = Img.Icon( "loading-new-page" );
		return css( icon, object.extend( {
			position : "absolute",
			animation : csa.animation( [spin, 1.3, "linear", "infinite"] )
		}, css.center( icon.w ), css.middle( icon.h ) ) ).element;
	}

	// 第一次的推提示
	function CutFirst( inClickMode ) {
		return inClickMode ? $( "div", {
			classList : ["tips", "switch"],
			css : {
				"position" : "absolute",
				"left" : "50%",
				"bottom" : "100px",
				"z-index" : "100",
				"pointer-events" : "none"
			},
			children : [
				$( "div", {
					innerHTML : "点击页面",
					css : {
						"position" : "absolute",
						"top" : "-30px",
						"font-size" : "12px",
						"color" : "white",
						"width" : "100px",
						"text-align" : "center",
						"margin-left" : "-50px"
					}
				} ),
				$( "div", {
					css : {
						height : "32px",
						width : "32px",
						"border-radius" : "32px",
						background : "#4c4236",
						position : "absolute",
						top : "0",
						left : "50%",
						"margin-left" : "-16px",
						animation : csa.animation( [{
							0 : {
								transform : "scale(.9)",
								"opacity" : 1
							},
							100 : {
								transform : "scale(1.3)",
								"opacity" : 0
							}
						}, 1.7, "infinite"] )
					}
				} ),
				$( "div", {
					css : {
						height : "18px",
						width : "18px",
						"border-radius" : "18px",
						background : "#d75b41",
						position : "absolute",
						top : "7px",
						left : "50%",
						"margin-left" : "-9px",
						"z-index" : 3,
						animation : csa.animation( [{
							50 : {
								transform : "scale(0.7)"
							}
						}, 1.7, "infinite"] )
					}
				} ),
				$( Img.Icon( "tips-click-first" ), {
					css : {
						"position" : "absolute",
						"left" : "50%",
						"top" : "16px",
						"z-index" : "4"
					}
				} )
			]
		} ) : $( Img.Icon( "tips-push-first" ), {
			classList : ["tips", "switch"],
			css : {
				position : "absolute",
				"margin-left" : "-32px",
				left : "50%",
				bottom : 0,
				"z-index" : 10,
				"pointer-events" : "none",
				animation : csa.animation( [{
					0 : {
						opacity : 0,
						transform : "translate3d(0, 60px, 0)"
					},
					80 : {
						opacity : 0.5
					}
				}, 2.5, "infinite"] )
			}
		} );
	}

	// 推提示
	function Cut( inClickMode ) {
		return inClickMode ? $( "div" ) : $( Img.Icon( "tips-push" ), {
			classList : ["tips", "switch"],
			css : {
				position : "absolute",
				bottom : "45px",
				left : "50%",
				"margin-left" : "-8px",
				"z-index" : 10,
				"pointer-events" : "none",
				animation : csa.animation( [{
					0 : {
						transform : "translate3d(0, 42px, 0)",
						opacity : 0
					},
					60 : {
						transform : "translate3d(0, 12px, 0)",
						opacity : 1
					},
					100 : {
						opacity : 0
					}
				}, 1.5, "infinite"] )
			}
		} );
	}

	// 版权提示
	function PoweredBy() {
		var icon = $( Img.Icon( "powered-by" ), {
			css : {
				position : "absolute",
				bottom : 0,
				left : 0
			}
		} );

		return $( "div.powered-by", {
			css : insert( {
				height : "44px",
				bottom : 0,
				"z-index" : 10000
			}, css.center( icon.w ) ),
			children : [icon]
		} );
	}

	// 涂抹提示
	function Scratch( parent ) {
		return $( Img.Icon( "tips-scratch" ), {
			css : {
				position : "absolute",
				"margin-left" : "-65px",
				left : "50%",
				bottom : "50px",
				"z-index" : 1001,
				"pointer-events" : "none",
				animation : csa.animation( [{
					0 : {
						opacity : 0
					}
				}, 1.4] )
			}
		}, parent || document.body );
	}

	// 隐藏提示
	function hide() {
		document.documentElement.classList.add( "hide-tips" );

		return {
			remove : function () {
				document.documentElement.classList.remove( "hide-tips" );
			}
		};
	}

	library["29"].LoadingButton = LoadingButton;
	library["29"].Loading = Loading;
	library["29"].LoadingChrysanthemum = LoadingChrysanthemum;
	library["29"].Music = Music;
	library["29"].Album = Album;
	library["29"].LoadingNewPage = LoadingNewPage;
	library["29"].CutFirst = CutFirst;
	library["29"].Cut = Cut;
	library["29"].PoweredBy = PoweredBy;
	library["29"].Scratch = Scratch;
	library["29"].hide = hide;
} );
/**
 * Created by 白 on 2015/6/9.
 */

library( function () {
	var ajax =library["13"],
		URL =library["9"],
		object =library["2"],
		array =library["1"],
		async =library["4"],
		func =library["0"],
		css =library["6"],

		tips =library["29"],
		share =library["28"],
		ua =library["14"],

		href = URL( location.href ),

		workDataCache = [];

	href = href.arg.returnUrl || href;

	function loadWork( workInfoUrl, callback, arg ) {
		arg = arg || {};
		workInfoUrl = URL( workInfoUrl );
		var id = array.top( workInfoUrl.pathname.split( "/" ) );

		// 查找缓存中的作品数据
		function findCacheWorkData() {
			var dataInfo = array.findFirst( workDataCache, function ( dataInfo ) {
				return dataInfo.id === id;
			} );
			return dataInfo ? dataInfo.data : null;
		}

		func.callWith( function ( parseWorkData ) {
			var workData = window.workData || findCacheWorkData();
			delete window.workData;
			workData ? parseWorkData( workData ) : ajax( {
				url : workInfoUrl
			}, function ( err, xhr ) {
				var data;
				try {
					data = JSON.parse( xhr.responseText );
				}
				catch ( e ) {
					data = {
						code : 1500
					};
				}

				// 添加到缓存
				workDataCache.push( {
					id : id,
					data : data
				} );
				workDataCache.length > 100 && workDataCache.unshift();

				// 解析作品
				parseWorkData( data );
			} );
		}, function ( data ) {
			var parsedData, workData = data.data || data;

			// 如果code不是200,进入异常流程
			if ( data.code && data.code !== 200 ) {
				parsedData = {
					error : data.code
				};
			}
			// 否则解析页面数据
			else {
				var pages = array.map( workData.pages, function ( pageData ) {
						return pageData.layout;
					} ),
					noLoop = false;

				if ( workData.copyright && !arg.noAuthor ) {
					var authorPageData = {
						label : "author",
						data : {
							uid : workData.uid
						}
					};

					pages.push( authorPageData );
				}
				else {
					noLoop = true;
				}

				parsedData = {
					cut : workData.cut || ( window.fast ? false : undefined ),
					picture : workData.thumbnail,
					title : workData.title,
					url : href.origin + href.pathname,
					desc : workData.description || "",
					uid : workData.uid,
					theme : workData.theme,
					mode : workData.mode,
					color : workData.backgroud ? workData.backgroud.color === "FFFFFF" ? "#FFFFFF" : workData.backgroud.color : "#FFFFFF",
					pageSwitch : workData.pageSwitch ? workData.pageSwitch.animateId || "classic" : "classic",
					music : workData.music,
					pages : pages,
					noLoop : noLoop
				};
			}

			callback( object.insert( parsedData, {
				id : id,
				data : data
			} ) );
		} );

		return id;
	}

	library["30"] = loadWork;
} );
/**
 * Created by 白 on 2014/11/28.
 */

library( function () {
	// 符号函数
	function sign( x ) {
		return x >= 0 ? 1 : -1;
	}

	// 判断一个点是否在一个矩形之内
	function inRect( tx, ty, x, y, width, height ) {
		tx -= x;
		ty -= y;
		return tx >= 0 && tx < width && ty >= 0 && ty < height;
	}

	// 如果x>b,取b,x小于a,取啊
	function range( x, a, b ) {
		if ( a <= b ) {
			return x < a ? a : x > b ? b : x;
		}
		else {
			return range( x, b, a );
		}
	}

	// 判断是否在区间
	function inRange( x, a, b ) {
		if ( a <= b ) {
			return x >= a && x < b;
		}
		else {
			return inRange( x, b, a );
		}
	}

	// 计算(x,y)到(0,0)的距离
	function distance( x, y ) {
		return Math.sqrt( x * x + y * y );
	}

	// 求两个边的正弦
	function sin2( x, y ) {
		return x / distance( x, y );
	}

	// 生成贝塞尔曲线函数
	function Bezier( x1, y1, x2, y2, func ) {
		var xTolerance = 0.0001,
			retVal = func || function ( xTarget ) {
					function bezier( t, p1, p2 ) {
						var ct = 1 - t, ct2 = ct * ct,
							t2 = t * t, t3 = t2 * t,
							tct2 = t * ct2, t2ct = t2 * ct;
						return 3 * p1 * tct2 + 3 * p2 * t2ct + t3;
					}

					function bezierD( t, p1, p2 ) {
						return ( 9 * p1 - 9 * p2 + 3 ) * t * t + ( 6 * p2 - 12 * p1 ) * t + 3 * p1;
					}

					var t = 0.5;
					while ( Math.abs( xTarget - bezier( t, x1, x2 ) ) > xTolerance ) {
						t = t - ( bezier( t, x1, x2 ) - xTarget ) / bezierD( t, x1, x2 );
					}

					return bezier( t, y1, y2 );
				};

		retVal.arg = [x1, y1, x2, y2];
		return retVal;
	}

	function index( i, l ) {
		return ( ( i % l ) + l ) % l;
	}

	library["31"].sign = sign;
	library["31"].inRect = inRect;
	library["31"].range = range;
	library["31"].inRange = inRange;
	library["31"].distance = distance;
	library["31"].sin2 = sin2;
	library["31"].Bezier = Bezier;
	library["31"].index = index;
} );
/**
 * Created by 白 on 2014/8/5.
 */

library( function () {
	var math =library["31"],
		Bezier = math.Bezier,

		array =library["1"],
		object =library["2"],

		LinkedList =library["3"],

		timeout = null,
		tasks = LinkedList(),

		Timing = {
			linear : Bezier( 1, 1, 1, 1, function ( t ) {
				return t;
			} ),
			ease : Bezier( 0.25, 0.1, 0.25, 1 ),
			easeIn : Bezier( 0.42, 0, 1, 1 ),
			easeOut : Bezier( 0, 0, .58, 1 ),
			easeInOut : Bezier( 0.42, 0, 0.58, 1 )
		};

	function fromTo( from, to, ratio ) {
		return from + ( to - from ) * ratio;
	}

	// 请求连续动画
	function requestFrame( task ) {
		var node = null;

		function start() {
			// 如果任务没有添加进链表,添加到链表中
			if ( node === null ) {
				node = tasks.insert( task, null );

				// 如果当前没有计时,开始计时
				if ( timeout === null ) {
					timeout = setTimeout( function frame() {
						var cur;
						if ( tasks.tail() !== null ) {
							timeout = setTimeout( frame, 1000 / 60 );
							for ( cur = tasks.head(); cur !== null; cur = cur.next ) {
								cur();
							}
						}
						else {
							timeout = null;
						}
					}, 1000 / 60 );
				}
			}
		}

		start();

		return {
			start : start,
			remove : function () {
				node && tasks.remove( node );
				node = null;
			}
		};
	}

	// 进度器
	function Progress( arg ) {
		var duration = ( arg.duration || 1 ) * 1000, // 持续时间,传入的是秒数,转换为毫秒
			timing = arg.timing || Timing.ease, // 缓动函数
			progress = -( arg.delay || 0 ) * 1000, // 动画进度
			lastTime = new Date(); // 上帧时间

		return {
			// 计算当前比例
			ratio : function () {
				var now = new Date();
				progress += now - lastTime; // 更新进度
				lastTime = now;

				return progress < 0 ? null : timing( progress >= duration ? 1 : progress / duration );
			},
			// 判断进度是否结束
			isEnd : function () {
				return progress >= duration;
			},
			// 快进到目标比例
			progress : function ( targetRatio ) {
				progress = targetRatio * duration;
				lastTime = new Date()
			}
		};
	}

	function requestFrames( arg ) {
		var progress = Progress( arg ),
			go = arg.onAnimate;

		function goEnd() {
			animateEvent.remove();
			arg.onAnimate( 1 );
			arg.onEnd && arg.onEnd();
		}

		go( 0 );
		var animateEvent = requestFrame( function () {
			go( progress.ratio() );

			if ( progress.isEnd() ) {
				goEnd();
			}
		} );

		return {
			remove : animateEvent.remove,
			progress : progress.progress,
			fastForward : goEnd
		};
	}

	library["32"].Bezier = Bezier;
	library["32"].Timing = Timing;
	library["32"].fromTo = fromTo;
	library["32"].requestFrame = requestFrame;
	library["32"].Progress = Progress;
	library["32"].requestFrames = requestFrames;
} );
/**
 * Created by 白 on 2015/4/16.
 */

library( function () {
	var func =library["0"],
		array =library["1"],
		object =library["2"],

		table = [24, 14, 108, 51, 101, 49, 48, 85, 81, 41,
			70, 99, 106, 88, 50, 102, 43, 64, 47, 7,
			26, 90, 31, 39, 19, 2, 89, 0, 3, 1,
			36, 67, 13, 73, 97, 23, 65, 86, 95, 37,
			80, 11, 59, 107, 29, 96, 60, 6, 66, 9,
			42, 93, 46, 5, 45, 78, 103, 54, 77, 40,
			68, 74, 35, 53, 18, 94, 16, 21, 28, 72,
			61, 87, 17, 38, 56, 58, 82, 79, 83, 57,
			27, 63, 92, 8, 30, 10, 33, 55, 44, 98,
			22, 71, 52, 75, 25, 32, 62, 15, 84, 34,
			20, 104, 12, 100, 109, 76, 4, 69, 105, 91],
		length = table.length;

	function Random( seed ) {
		var random = seed === undefined ? function () {
			return Math.random();
		} : function () {
			var count = seed % length;
			return function () {
				return table[( ++count % length )] / length;
			};
		}();

		return object.insert( random, {
			select : function ( array ) {
				return array[random() * array.length << 0];
			},
			arrange : function ( list ) {
				var result = [],
					len = list.length;

				// 复制一个副本
				list = array.map( list, function ( t ) {
					return t;
				} );

				func.loop( len, function ( i ) {
					i = len - i - 1;
					var select = random() * i << 0;
					result.push( list[select] );
					list[select] = list[i];
				} );

				return result;
			},
			range : function ( start, end ) {
				return start + random() * (end - start);
			},
			probability : function ( v ) {
				return random() < v;
			}
		} );
	}

	library["33"] = object.insert( Random(), {
		Random : Random
	} );
} );
/**
 * Created by 白 on 2015/7/14.
 */

library( function () {
	var array =library["1"],
		string =library["5"],
		object =library["2"],
		$ =library["8"],
		animation =library["32"],
		random =library["33"],
		css =library["6"],
		math =library["31"],
		func =library["0"],
		async =library["4"],

		Layout =library["19"],
		tips =library["29"],
		util =library["25"],
		env =library["27"],
		ua =library["14"],
		ui =library["26"],
		Img =library["16"],
		Modes = {},
		curBody; // 当前作品

	function Work( arg ) {
		var width = arg.width,
			height = arg.height,
			workBody = $( "div", {
				css : {
					overflow : "hidden",
					background : "#000000",
					"z-index" : 1
				}
			} ),
			playSchedule = async.Schedule(), // 播放日程
			preloadPageSchedule = async.Schedule(), // 预加载日程
			loading = workBody.appendChild( tips.Loading() ), // 加载图标
			mode = null; // 模式

		css.size( workBody, workBody.w = width, workBody.h = height );

		// 加载作品数据
		workBody.onLoad = async.Waiter( function ( loadDone ) {
			func.callWith( function ( doData ) {
				if ( arg.workData ) {
					var workData = workBody.workData = arg.workData;
					workBody.workId = workData.id;
					doData( workData );
				}
				else {
					workBody.workId = arg.loadWork( function ( workData ) {
						workBody.workData = workData;
						doData( workData );
					} );
				}
			}, function ( workData ) {
				// 错误流程
				if ( workData.error ) {
					var iconCode, title;
					switch ( workData.code ) {
						case 1401:
							iconCode = 1401;
							title = "您没有权限查看该作品";
							break;
						case 1500:
							iconCode = 1500;
							title = "哎呀,页面出错了,一会再来吧";
							break;
						default :
							iconCode = 500;
							title = "抱歉,您访问的页面已失踪";
							break;
					}

					workBody.loadError = true;
					workBody.workTitle = title;
					Img.pageError( workBody, iconCode + ".png" );
				}
				else {
					// 插入调试数据
					window.debugWorkData && object.insert( workData, window.debugWorkData );

					// 选择模式,并根据模式要求处理数据
					mode = Modes[workData.mode = window.mode || workData.mode || "classic"]( workBody, arg );
					mode.doData && mode.doData();

					workBody.workTitle = workData.title; // 标题
					workBody.random = random.Random( workData.seed || workData.id || 0 ); // 随机
					workBody.pageNumber = workData.pages.length;

					// 播放和预加载已准备好
					playSchedule.prepare( function () {
						mode.play();
					} );
					preloadPageSchedule.prepare( function () {
						mode.preloadPage();
					} );

					// 页面加载器
					var pagesLoader = array.map( workData.pages, function ( pageData, index ) {
						var loader = {
							data : {},
							load : async.Loader( function ( done ) {
								Layout.loadPage( object.extend( workData, pageData ), function ( create ) {
									loader.create = function ( noParent ) {
										return $( create( width, height, loader.data, noParent ? null : workBody ), {
											pid : pageData.pid,
											index : index,
											css : {
												position : "absolute",
												left : 0,
												top : 0
											}
										} );
									};

									done();
								} );
							} ).load
						};
						return loader;
					} );

					// 加载页接口
					workBody.loadPage = function loadPage( index, onLoad, create ) {
						var pageLoader = pagesLoader[index];
						pageLoader ? pageLoader.load( function () {
							onLoad && onLoad( create !== false ? pagesLoader[index].create() : null );
						} ) : onLoad && onLoad();
					};
				}

				loadDone();
			} );
		} ).onComplete;

		// 加载第一页
		workBody.onPageLoad = async.Waiter( function ( pageLoadDone ) {
			workBody.onLoad( function () {
				func.callWith( function ( done ) {
					workBody.loadError ? done() : mode.load( done );
				}, function () {
					pageLoadDone();
					$.remove( loading );
				} );
			} );
		} ).onComplete;

		return object.insert( workBody, {
			recycle : function () {
				mode && mode.recycle();
			},
			play : function () {
				curBody = workBody;
				playSchedule.start();
			},
			preloadPage : function () {
				preloadPageSchedule.start();
			},
			resize : function ( newWidth, newHeight ) {
				css.size( workBody, workBody.w = width = newWidth, workBody.h = height = newHeight );
				mode && mode.resize( newWidth, newHeight );
			}
		} );
	}

	Work.Modes = Modes;
	library["34"] = Work;
} );
/**
 * Created by 白 on 2015/7/14.
 */

library( function () {
	var switchAnimations = {},
		css =library["6"],
		csa =library["10"],
		func =library["0"],
		$ =library["8"],
		array =library["1"],

		Img =library["16"],
		ua =library["14"],
		px = css.px;

	function Fragment( parent, targetCanvas, x, y, width, height, zi ) {
		var canvas = Img.Canvas( width, height ),
			gc = canvas.context,
			dpr = canvas.dpr;

		gc.drawImage( targetCanvas, x * dpr, y * dpr, width * dpr, height * dpr, 0, 0, width, height );
		css( canvas, {
			"backface-visibility" : "hidden",
			position : "absolute",
			left : px( x ),
			top : px( y ),
			"z-index" : zi || 0
		} );
		parent.appendChild( canvas );
		return canvas;
	}

	// 渐变
	switchAnimations.fade = function ( parent, curPage, newPage, callback, duration ) {
		duration = duration || 0.8;
		parent.appendChild( newPage );

		return csa.runAnimation( [
			[curPage, {
				100 : {
					opacity : 0
				}
			}, duration, 0, "linear"],
			[newPage, {
				0 : {
					opacity : 0
				}
			}, duration, 0, "linear"]
		], callback );
	};

	// 经典
	switchAnimations.classic = function ( parent, curPage, newPage, callback ) {
		parent.appendChild( newPage );
		return csa.runAnimation( [
			[curPage, {
				100 : {
					transform : "translate3d(0, -30%, 0) scale(0.5)"
				}
			}, 0.8, 0],
			[newPage, {
				0 : {
					transform : "translate3d(0, 100%, 0)"
				}
			}, 0.8, 0]
		], callback );
	};

	// 推
	switchAnimations.push = function ( parent, curPage, newPage, callback, duration ) {
		duration = duration || 0.8;
		parent.appendChild( newPage );

		return csa.runAnimation( [
			[curPage, {
				100 : {
					transform : "translate3d(0, -100%, 0)"
				}
			}, duration, "ease-in-out", 0],
			[newPage, {
				0 : {
					transform : "translate3d(0, 100%, 0)"
				}
			}, duration, "ease-in-out", 0]
		], callback );
	};

	// 后退
	switchAnimations.back = function ( parent, curPage, newPage, callback, duration ) {
		duration = duration || 0.5;
		parent.appendChild( newPage );

		return csa.runAnimation( [
			[curPage, {
				100 : {
					transform : "translate3d(0, 100%, 0)"
				}
			}, duration, "ease-in-out", 0],
			[newPage, {
				0 : {
					transform : "translate3d(0, -100%, 0)"
				}
			}, duration, "ease-in-out", 0]
		], callback );
	};

	// 揭开
	switchAnimations.uncover = function ( parent, curPage, newPage, callback ) {
		css( curPage, "z-index", 100 );
		parent.appendChild( newPage );

		return csa.runAnimation( [
			[curPage, {
				100 : {
					transform : "translate3d(0, -100%, 0)"
				}
			}, 0.8, 0]
		], callback );
	};

	// 立方体
	switchAnimations.cube = function ( parent, curPage, newPage, callback ) {
		parent.appendChild( newPage );

		var cssHandle = css( parent, {
			perspective : 1000
		} );

		return csa.runAnimation( [
			[curPage, {
				0 : {
					"transform-origin" : "50% 100%",
					"z-index" : 2
				},
				100 : {
					"transform-origin" : "50% 100%",
					transform : "translate3d(0, -100%, 0) rotateX(90deg)",
					"z-index" : 0
				}
			}, 1, 0, "linear"],
			[newPage, {
				0 : {
					"transform-origin" : "50% 0%",
					transform : "translate3d(0, 100%, 0) rotateX(-90deg)",
					"z-index" : 0
				},
				100 : {
					"transform-origin" : "50% 0%",
					"z-index" : 1
				}
			}, 1, 0, "linear"]
		], function () {
			cssHandle.remove();
			callback && callback();
		} );
	};

	// 翻转
	switchAnimations.overturn = function ( parent, curPage, newPage, callback ) {
		parent.appendChild( newPage );

		var cssHandle = css( parent, {
			perspective : 1000
		} );

		return csa.runAnimation( [
			[curPage, {
				0 : {
					"transform-origin" : "0 50%",
					"z-index" : 2
				},
				50 : {
					"transform-origin" : "0 50%",
					transform : "translate3d(50%, 0, 100px) rotateY(90deg)",
					"z-index" : 1
				},
				100 : {
					"transform-origin" : "0 50%",
					transform : "translate3d(100%, 0, 0) rotateY(180deg)",
					"z-index" : 0
				}
			}, 1, 0, "linear"],
			[newPage, {
				0 : {
					"transform-origin" : "100% 50%",
					transform : "translate3d(-100%, 0, 0) rotateY(180deg)",
					"z-index" : 0
				},
				50 : {
					"transform-origin" : "100% 50%",
					transform : "translate3d(-50%, 0, 100px) rotateY(270deg)",
					"z-index" : 0.5
				},
				100 : {
					"transform-origin" : "100% 50%",
					transform : "translate3d(0, 0, 0) rotateY(360deg)",
					"z-index" : 1
				}
			}, 1, 0, "linear"]
		], function () {
			cssHandle.remove();
			callback && callback();
		} );
	};

	// 切换
	switchAnimations["switch"] = function ( parent, curPage, newPage, callback ) {
		parent.appendChild( newPage );

		var cssHandle = css( parent, {
			perspective : 1000
		} );

		return csa.runAnimation( [
			[curPage, {
				0 : {
					"transform-origin" : "100% 50%",
					"z-index" : 2
				},
				50 : {
					"transform-origin" : "100% 50%",
					transform : "translate3d(50%, 0, 0) rotateY(-30deg)",
					"z-index" : 1
				},
				100 : {
					"transform-origin" : "100% 50%",
					transform : "translate3d(0, 0, -130px)",
					"z-index" : 0
				}
			}, 1, 0, "linear"],
			[newPage, {
				0 : {
					"transform-origin" : "0 50%",
					transform : "translate3d(0, 0, -130px)",
					"z-index" : 0
				},
				50 : {
					"transform-origin" : "0 50%",
					transform : "translate3d(-50%, 0, 0) rotateY(30deg)",
					"z-index" : 0.5
				},
				100 : {
					"transform-origin" : "0 50%",
					"z-index" : 1
				}
			}, 1, 0, "linear"]
		], function () {
			cssHandle.remove();
			callback && callback();
		} );
	};

	// 梳理
	switchAnimations.tease = function ( parent, curPage, newPage, callback ) {
		var height = curPage.h,
			width = curPage.w,
			curCanvas = curPage.toCanvas(),
			partHeight = height / 8 << 0,
			animates = [];

		$.remove( curPage );
		parent.appendChild( newPage );

		func.loop( 8, function ( i ) {
			var thisHeight = i === 7 ? height - partHeight * 7 : partHeight,
				thisTop = i === 7 ? height - thisHeight : thisHeight * i,
				j = 7 - i;

			animates.push( [
				Fragment( parent, curCanvas, 0, thisTop, width, thisHeight, 1 ),
				j % 2 === 0 ? {
					100 : {
						transform : "translate3d(-100%, 0, 0)"
					}
				} : {
					100 : {
						transform : "translate3d(100%, 0, 0)"
					}
				}, 0.3, j * 0.1, "linear"
			] );
		} );

		return csa.runAnimation( animates, function () {
			array.foreach( animates, function ( animate ) {
				$.remove( animate[0] );
			} );
			callback && callback();
		} );
	};

	// 门
	switchAnimations.door = function ( parent, curPage, newPage, callback ) {
		var w = curPage.w,
			h = curPage.h,
			curCanvas = curPage.toCanvas(),
			cssHandle = css( parent, {
				perspective : 1000
			} ),
			doors = [];

		$.remove( curPage );
		parent.appendChild( newPage );
		array.foreach( [0, 0.5], function ( rx ) {
			doors.push( Fragment( parent, curCanvas, rx * w, 0, w / 2, h, 1 ) );
		} );

		return csa.runAnimation( [
			[doors[0], {
				100 : {
					transform : "translate3d(-100%, 0, 0)",
					opacity : 0.4
				}
			}, 0.8, 0],
			[doors[1], {
				100 : {
					transform : "translate3d(100%, 0, 0)",
					opacity : 0.4
				}
			}, 0.8, 0],
			[newPage, {
				0 : {
					transform : "translate3d(0, 0, -1400px)"
				}
			}, 0.8, 0]
		], function () {
			cssHandle.remove();
			array.foreach( doors, function ( door ) {
				$.remove( door );
			} );
			callback && callback();
		} );
	};
	switchAnimations.door.highPerformance = true;

	// 翻页
	switchAnimations.flipOver = function ( parent, curPage, newPage, callback ) {
		var width = curPage.w,
			height = curPage.h,
			curCanvas = curPage.toCanvas(),
			newCanvas = newPage.toCanvas(),
			cssHandle = css( parent, {
				perspective : 1000
			} ),
			curTop = Fragment( parent, curCanvas, 0, 0, width, height / 2, 1 ),
			curBottom = Fragment( parent, curCanvas, 0, height / 2, width, height / 2, 1 ),
			newTop = Fragment( parent, newCanvas, 0, 0, width, height / 2, 2 ),
			newBottom = Fragment( parent, newCanvas, 0, height / 2, width, height / 2, 0 );

		$.remove( curPage );

		return csa.runAnimation( [
			[curBottom, {
				0 : {
					"transform-origin" : "50% 0",
					"z-index" : 3
				},
				100 : {
					"transform-origin" : "50% 0",
					transform : "rotateX(180deg)",
					"z-index" : 1
				}
			}, 0.8, 0],
			[newTop, {
				0 : {
					"transform-origin" : "50% 100%",
					transform : "rotateX(-180deg)",
					"z-index" : 1
				},
				100 : {
					"transform-origin" : "50% 100%",
					transform : "rotateX(0deg)",
					"z-index" : 2
				}
			}, 0.8, 0]
		], function () {
			cssHandle.remove();
			array.foreach( [curTop, curBottom, newTop, newBottom], function ( fragment ) {
				$.remove( fragment );
			} );
			callback && callback();
		} );
	};
	switchAnimations.flipOver.highPerformance = true;

	// 棋盘
	switchAnimations.chessboard = function ( parent, curPage, newPage, callback ) {
		var w = curPage.w,
			h = curPage.h,
			curCanvas = curPage.toCanvas(),
			newCanvas = newPage.toCanvas(),
			cssHandle = css( parent, {
				perspective : 1000
			} ),

			numX = ua.ios ? 4 : 2, numY = ua.ios ? 5 : 3, t,
			animates = [],
			left = 0;

		$.remove( curPage );

		if ( w > h ) {
			t = numX;
			numX = numY;
			numY = t;
		}

		// 制作碎片
		func.loop( numX, function ( i ) {
			var right = ( i + 1 ) / numX * w << 0,
				top = 0;

			func.loop( numY, function ( j ) {
				var bottom = ( j + 1 ) / numY * h << 0,
					width = right - left,
					height = bottom - top,
					delay = 0.8 / numX * i + Math.random() * 0.4;

				func.loop( 2, function ( n ) {
					animates.push( [
						Fragment( parent, n === 0 ? curCanvas : newCanvas, left, top, width, height, 2 - n ),
						n === 0 ? {
							0 : {
								"z-index" : 2
							},
							100 : {
								transform : "rotateY(180deg)",
								"z-index" : 0
							}
						} : {
							0 : {
								transform : "rotateY(180deg)",
								"z-index" : 0
							},
							100 : {
								transform : "rotateY(360deg)",
								"z-index" : 1
							}
						},
						0.8, delay, "linear"
					] );
				} );

				top = bottom;
			} );

			left = right;
		} );

		return csa.runAnimation( animates, function () {
			cssHandle.remove();
			array.foreach( animates, function ( animate ) {
				$.remove( animate[0] );
			} );
			callback && callback();
		} );
	};
	switchAnimations.chessboard.highPerformance = true;

	library["35"] = switchAnimations;
} );
/**
 * Created by WQ on 2015/5/22.
 * 缩放元素使它可以全部显示
 */

library( function () {
	var math =library["31"],
		array =library["1"],
		Layout =library["19"],
		z2d =library["17"];

	function inRange( n, num1, num2 ) {
		return n >= Math.min( num1, num2 ) && n <= Math.max( num1, num2 );
	}

	// 缩放一个元素
	library["36"] = function ( comp, layout ) {
		var clientWidth = layout.w, clientHeight = layout.h, w = comp.w, h = comp.h,
			matrix = Layout.getPageMatrix( comp ), // 宽高和矩阵
			pc = z2d.transform( matrix, [w / 2, h / 2, 1] ), xc = pc[0], yc = pc[1], // 重新坐标
			r = Math.sqrt( w * w + h * h ) / 2, // 半径
			scales = []; // 缩放数组

		if ( !inRange( xc, 0, clientWidth ) || !inRange( yc, 0, clientHeight ) ) {
			return 1;
		}

		array.foreach( [[0, 0], [w, 0], [w, h], [0, h]], function ( p ) {
			p = z2d.transform( matrix, p.concat( 1 ) );
			var xp = p[0], yp = p[1];

			array.foreach( [[0, 0, 1, 0], [0, 0, 0, 1], [1, 1, 0, 1], [1, 1, 1, 0]], function ( info ) {
				var x1 = info[0] * clientWidth, y1 = info[1] * clientHeight, x2 = info[2] * clientWidth, y2 = info[3] * clientHeight,
					denominator = ( yp - yc ) * ( x2 - x1 ) - ( xc - xp ) * ( y1 - y2 ),
					x = ( ( xp - xc ) * ( x2 - x1 ) * ( y1 - yc ) + ( yp - yc ) * ( x2 - x1 ) * xc - ( y2 - y1 ) * ( xp - xc ) * x1 ) / denominator,
					y = -( ( yp - yc ) * ( y2 - y1 ) * ( x1 - xc ) + ( xp - xc ) * ( y2 - y1 ) * yc - ( x2 - x1 ) * ( yp - yc ) * y1 ) / denominator;

				if ( denominator !== 0 && inRange( x, xp, xc ) && inRange( x, x1, x2 ) && inRange( y, yp, yc ) && inRange( y, y1, y2 ) ) {
					scales.push( math.distance( x - xc, y - yc ) / r );
					return true;
				}
			} );
		} );

		return scales.length === 0 ? 1 : Math.min.apply( this, scales );
	};
} );
/**
 * Created by 白 on 2014/9/11.
 */

library( function () {
	var object =library["2"],
		animation =library["32"],
		enterAnimation = {};

	function Direction( direction ) {
		switch ( direction ) {
			case 3:
				return [-1, 0];
			case 1:
				return [1, 0];
			case 0:
				return [0, -1];
			case 2:
				return [0, 1];
		}
	}

	function percent( value ) {
		return value + "%";
	}

	// 飞入
	enterAnimation.FlyInto = function ( direction ) {
		var xy = Direction( direction );

		return {
			direction : direction,
			progress : {
				"0" : {
					x : xy[0] * 640,
					y : xy[1] * 800
				}
			}
		};
	};

	// 果冻
	enterAnimation.rubberBand = {
		scale : true,
		progress : {
			"30" : {
				scaleX : 1.25,
				scaleY : 0.75
			},
			"40" : {
				scaleX : 0.75,
				scaleY : 1.25
			},
			"50" : {
				scaleX : 1.15,
				scaleY : 0.85
			},
			"65" : {
				scaleX : 0.95,
				scaleY : 1.05
			},
			"75" : {
				scaleX : 1.05,
				scaleY : 0.95
			}
		}
	};

	// 得瑟
	enterAnimation.tada = {
		scale : true,
		timing : animation.Timing.linear,
		progress : {
			"10 20" : {
				scale : 0.9,
				rotate : -3
			},
			"30 50 70 90" : {
				scale : 1.1,
				rotate : 3
			},
			"40 60 80" : {
				scale : 1.1,
				rotate : -3
			}
		}
	};

	// 钟摆
	enterAnimation.wobble = {
		duration : 0.8,
		progress : {
			"15" : {
				x : "-25%",
				rotate : -5
			},
			"30" : {
				x : "20%",
				rotate : 3
			},
			"45" : {
				x : "-15%",
				rotate : -3
			},
			"60" : {
				x : "10%",
				rotate : 2
			},
			"75" : {
				x : "-5%",
				rotate : -1
			}
		}
	};

	// 抖动
	enterAnimation.shake = {
		timing : animation.Timing.linear,
		duration : 1,
		progress : {
			"10 30 50 70 90" : {
				x : -10
			},
			"20 40 60 80" : {
				x : 10
			}
		}
	};

	// 落下抖动
	enterAnimation.fallDownAndShake = {
		duration : 0.7,
		timing : animation.Timing.easeOut,
		progress : {
			"0" : {
				rotate : -15,
				y : -800
			},
			"40" : {
				rotate : -15
			},
			"45" : {
				rotate : 13
			},
			"52" : {
				rotate : -8
			},
			"62" : {
				rotate : 5
			},
			"74" : {
				rotate : -3
			},
			"87" : {
				rotate : 1
			}
		}
	};

	// 弹性
	enterAnimation.bounceIn = {
		duration : 0.75,
		timing : animation.Bezier( 0.215, 0.610, 0.355, 1.000 ),
		scale : true,
		progress : {
			"0" : {
				opacity : 0,
				scale : 0.3
			},
			"20" : {
				scale : 1.1
			},
			"40" : {
				scale : 0.9
			},
			"60" : {
				scale : 1.03
			},
			"80" : {
				scale : 0.97
			}
		}
	};

	// 弹入
	enterAnimation.BounceFlying = function ( dir ) {
		var x = 0, y = 0;

		switch ( dir ) {
			case 3:
				x = 1;
				break;
			case 1:
				x = -1;
				break;
			case 0:
				y = 1;
				break;
			case 2:
				y = -1;
				break;
		}

		return {
			timing : animation.Bezier( 0.215, 0.610, 0.355, 1.000 ),
			duration : 0.75,
			progress : {
				"0" : {
					x : -3000 * x,
					y : -3000 * y
				},
				"60" : {
					x : 25 * x,
					y : 25 * y
				},
				"75" : {
					x : -10 * x,
					y : -10 * y
				},
				"90" : {
					x : 5 * x,
					y : 5 * y
				}
			}
		};
	};

	// 挂摆
	enterAnimation.swing = {
		emphasize : true,
		origin : [0.5, 0],
		progress : {
			"0 100" : {
				rotate : 0
			},
			20 : {
				rotate : 15
			},
			40 : {
				rotate : -10
			},
			60 : {
				rotate : 5
			},
			80 : {
				rotate : -5
			}
		}
	};

	// 闪烁
	enterAnimation.flash = {
		timing : animation.Timing.linear,
		progress : {
			"0 66" : {
				opacity : 0
			},
			"33" : {
				opacity : 1
			}
		}
	};

	// 回旋
	enterAnimation.circleRound = {
		scale : true,
		duration : 0.6,
		progress : {
			0 : {
				scale : 0.001,
				opacity : 0,
				rotate : 180 * 2.5
			},
			100 : {
				scale : 1,
				rotate : 0
			}
		}
	};

	// 远近翻转
	enterAnimation.roundFromFarAndNear = {
		scale : true,
		timing : animation.Timing.linear,
		durationCorrect : -0.2,
		progress : {
			"0" : {
				scale : 0.3,
				opacity : 0,
				rotate : 180 * 0.45
			}
		}
	};

	// 淡入
	enterAnimation.fadeIn = {
		progress : {
			"0" : {
				opacity : 0
			}
		}
	};

	// 浮现
	enterAnimation.Emerge = function ( direction ) {
		var xy = Direction( direction === undefined ? 2 : direction );

		return {
			direction : direction,
			progress : {
				"0" : {
					x : xy[0] * 20,
					y : xy[1] * 20,
					opacity : 0
				}
			}
		}
	};

	// 缩小
	enterAnimation.shrink = {
		duration : 0.6,
		timing : animation.Bezier( .52, .21, .8, .51 ),
		progress : {
			"0" : {
				scale : 5,
				opacity : 0
			}
		}
	};

	// 从小变大
	enterAnimation.scale = {
		scale : true,
		progress : {
			"0" : {
				scale : 0.001
			}
		}
	};

	// 翻转
	enterAnimation.overturn = {
		progress : {
			"0" : {
				perspective : 400,
				opacity : -0.3,
				rotateY : 180
			},
			100 : {
				perspective : 400
			}
		}
	};

	// 硬币
	enterAnimation.coin = {
		progress : {
			"0" : {
				rotateY : -720,
				perspective : 400,
				opacity : 0
			},
			"85" : {
				rotateY : 30,
				perspective : 400
			},
			100 : {
				rotateY : 0,
				perspective : 400
			}
		}
	};

	// 新
	enterAnimation.flip = {
		emphasize : true,
		progress : {
			"0" : {
				perspective : 400,
				rotateY : -360,
				timing : animation.Timing.easeOut
			},
			"40" : {
				perspective : 400,
				z : 150,
				rotateY : -190,
				timing : animation.Timing.easeOut
			},
			"50" : {
				perspective : 400,
				z : 150,
				rotateY : -170,
				timing : animation.Timing.easeIn
			},
			"80" : {
				perspective : 400,
				scale : 0.95,
				timing : animation.Timing.easeIn
			},
			"100" : {
				perspective : 400
			}
		}
	};

	enterAnimation.FlipIn = function ( direction ) {
		var signX = 0, signY = 0;
		if ( direction === "x" ) {
			signX = 1;
		}
		else {
			signY = 1;
		}

		return {
			duration : 0.8,
			progress : {
				"0" : {
					opacity : 0,
					perspective : 400,
					rotateX : 90 * signX,
					rotateY : 90 * signY,
					timing : animation.Timing.easeIn
				},
				"40" : {
					perspective : 400,
					rotateX : -20 * signX,
					rotateY : -20 * signY,
					timing : animation.Timing.easeIn
				},
				"60" : {
					perspective : 400,
					rotateX : 10 * signX,
					rotateY : 10 * signY,
					timing : animation.Timing.easeIn
				},
				"80" : {
					perspective : 400,
					rotateX : -5 * signX,
					rotateY : -5 * signY,
					timing : animation.Timing.easeIn
				},
				"100" : {
					perspective : 400
				}
			}
		};
	};

	// 刹车
	enterAnimation.LightSpeedIn = function ( direction ) {
		var xy = Direction( direction ),
			x = xy[0], y = xy[1];

		return {
			direction : direction,
			progress : {
				"0" : {
					opacity : 0,
					x : x * 100 + "%",
					y : y * 100 + "%",
					skewX : x * -30,
					skewY : y * -30
				},
				"40" : {
					skewX : x * 20,
					skewY : y * 20
				},
				"60" : {
					skewX : x * -5,
					skewY : y * -5
				}
			}
		}
	};

	enterAnimation.RotateIn = function ( direction ) {
		var x = 0, y = 0;

		switch ( direction ) {
			case 3:
				x = -1;
				y = -1;
				break;
			case 2:
				x = 1;
				y = -1;
				break;
			case 0:
				y = 1;
				x = -1;
				break;
			case 1:
				x = 1;
				y = 1;
				break;
		}

		return {
			durationCorrect : -0.2,
			origin : [0.5 + x * 0.5, 0.5 + y * 0.5],
			progress : {
				0 : {
					opacity : 0,
					rotate : x * y * 45
				},
				100 : {
					rotate : 0
				}
			}
		};
	};

	enterAnimation.ZoomIn = function ( direction ) {
		var xy = Direction( direction ),
			x = xy[0], y = xy[1];

		return {
			scale : true,
			direction : direction,
			progress : {
				"0" : {
					opacity : 0,
					scale : 0.1,
					x : x * 300,
					y : y * 300,
					timing : animation.Bezier( 0.550, 0.055, 0.675, 0.190 )
				},
				"60" : {
					scale : 0.475,
					x : x * -1 * 10,
					y : y * -1 * 10,
					timing : animation.Bezier( 0.175, 0.885, 0.320, 1 )
				}
			}
		};
	};

	enterAnimation.Wave = function ( direction ) {
		var xy = Direction( direction ), x = xy[0];
		return {
			direction : direction,
			duration : 2,
			timing : animation.Timing.easeInOut,
			progress : {
				"0" : {
					x : percent( x * 200 ),
					y : "-60%",
					opacity : 0
				},
				10 : {
					x : percent( x * 150 ),
					y : "50%"
				},
				20 : {
					x : percent( x * 100 ),
					y : "-50%"
				},
				30 : {
					x : percent( x * 50 ),
					y : "30%"
				},
				40 : {
					x : percent( x * 30 ),
					y : "-20%"
				},
				50 : {
					x : percent( x * 20 ),
					y : "10%"
				},
				60 : {
					x : percent( x * 10 ),
					y : "-10%"
				},
				70 : {
					x : percent( x * 8 ),
					y : "5%"
				},
				80 : {
					x : percent( x * 6 ),
					y : "-3%"
				},
				90 : {
					x : percent( x * 3 ),
					y : "1%"
				}
			}
		};
	};

	// 爬行
	enterAnimation.Creep = function ( direction ) {
		var xy = Direction( direction ), y = xy[1];

		return {
			direction : direction,
			duration : 2,
			timing : animation.Timing.easeInOut,
			progress : {
				0 : {
					y : percent( y * 100 ),
					opacity : 0
				},
				25 : {
					y : percent( y * 75 ),
					rotateX : 180,
					opacity : 0.5
				},
				50 : {
					y : percent( y * 50 ),
					rotateX : 360
				},
				75 : {
					y : percent( y * 25 ),
					rotateX : 540
				},
				100 : {
					y : 0,
					rotateX : 720,
					opacity : 1
				}
			}
		};
	};

	// 回旋镖
	enterAnimation.boomerang = {
		duration : 1,
		timing : animation.Timing.easeIn,
		progress : {
			0 : {
				x : "-200%",
				y : "-100%",
				rotate : 0,
				scale : 0.2,
				opacity : 0
			},
			16 : {
				x : "-150%",
				y : "-75%",
				rotate : 180,
				scale : 0.4
			},
			32 : {
				x : "-100%",
				y : "-50%",
				rotate : 360,
				scale : 0.6
			},
			48 : {
				x : "-50%",
				y : "-25%",
				rotate : 540,
				scale : 0.8
			},
			64 : {
				x : 0,
				y : 0,
				rotate : 720,
				scale : 1
			},
			80 : {
				x : "20%",
				y : "10%",
				rotate : 900,
				scale : 1.4
			},
			100 : {
				x : 0,
				y : 0,
				rotate : 1080,
				scale : 1
			}
		}
	};

	enterAnimation.table = {
		"fly-into-left" : enterAnimation.FlyInto( 3 ),
		"fly-into-top" : enterAnimation.FlyInto( 0 ),
		"fly-into-right" : enterAnimation.FlyInto( 1 ),
		"fly-into-bottom" : enterAnimation.FlyInto( 2 ),
		"emerge-left" : enterAnimation.Emerge( 3 ),
		"emerge-top" : enterAnimation.Emerge( 0 ),
		"emerge-right" : enterAnimation.Emerge( 1 ),
		"emerge-bottom" : enterAnimation.Emerge( 2 ),
		scale : enterAnimation.scale,
		"fade-in" : enterAnimation.fadeIn,
		"circle-round" : enterAnimation.circleRound,
		"round-from-far-and-near" : enterAnimation.roundFromFarAndNear,
		"curve-up" : enterAnimation.roundFromFarAndNear,
		"fall-down-and-shake" : enterAnimation.fallDownAndShake,
		shrink : enterAnimation.shrink,
		flash : enterAnimation.flash,
		shake : enterAnimation.shake,
		wobble : enterAnimation.wobble,
		tada : enterAnimation.tada,
		"bounce-in" : enterAnimation.bounceIn,
		"bounce-in-down" : enterAnimation.BounceFlying( 2 ),
		"bounce-in-up" : enterAnimation.BounceFlying( 0 ),
		"bounce-in-left" : enterAnimation.BounceFlying( 3 ),
		"bounce-in-right" : enterAnimation.BounceFlying( 1 ),
		swing : enterAnimation.swing,
		"rubber-band" : enterAnimation.rubberBand,
		overturn : enterAnimation.overturn,
		coin : enterAnimation.coin,
		flip : enterAnimation.flip,
		"flip-in-x" : enterAnimation.FlipIn( "x" ),
		"flip-in-y" : enterAnimation.FlipIn( "y" ),
		"light-speed-in-top" : enterAnimation.LightSpeedIn( 0 ),
		"light-speed-in-right" : enterAnimation.LightSpeedIn( 1 ),
		"light-speed-in-bottom" : enterAnimation.LightSpeedIn( 2 ),
		"light-speed-in-left" : enterAnimation.LightSpeedIn( 3 ),
		"rotate-in-left-top" : enterAnimation.RotateIn( 0 ),
		"rotate-in-right-top" : enterAnimation.RotateIn( 1 ),
		"rotate-in-left-bottom" : enterAnimation.RotateIn( 3 ),
		"rotate-in-right-bottom" : enterAnimation.RotateIn( 2 ),
		"zoom-in-left" : enterAnimation.ZoomIn( 3 ),
		"zoom-in-right" : enterAnimation.ZoomIn( 1 ),
		"zoom-in-top" : enterAnimation.ZoomIn( 0 ),
		"zoom-in-bottom" : enterAnimation.ZoomIn( 2 ),
		"wave-left" : enterAnimation.Wave( 3 ),
		"wave-right" : enterAnimation.Wave( 1 ),
		"creep-top" : enterAnimation.Creep( 0 ),
		"creep-bottom" : enterAnimation.Creep( 2 )
	};

	library["37"] = enterAnimation;
} );
/**
 * Created by 白 on 2014/12/26.
 */

library( function () {
	var relativeX = Relative( "w", "x" ),
		relativeY = Relative( "h", "y" );

	function Relative( sizeName, posName ) {
		return function ( d, dAlign, s, sAlign, isIn ) {
			return s[sizeName] * sAlign - d[sizeName] * dAlign + ( isIn ? 0 : ( s[posName] || 0 ) );
		};
	}

	function RelativeX( dAlign, sAlign ) {
		return function ( d, s, isIn ) {
			return relativeX( d, dAlign, s, sAlign, isIn );
		}
	}

	function RelativeY( dAlign, sAlign ) {
		return function ( d, s, isIn ) {
			return relativeY( d, dAlign, s, sAlign, isIn );
		}
	}

	library["38"] = {
		leftIn : RelativeX( 0, 0 ),
		leftTo : RelativeX( 1, 0 ),
		rightIn : RelativeX( 1, 1 ),
		rightTo : RelativeX( 0, 1 ),
		center : RelativeX( 0.5, 0.5 ),
		topIn : RelativeY( 0, 0 ),
		topTo : RelativeY( 1, 0 ),
		bottomIn : RelativeY( 1, 1 ),
		bottomTo : RelativeY( 0, 1 ),
		middle : RelativeY( 0.5, 0.5 ),

		right : function ( ps ) {
			return ps.x + ps.w;
		},
		bottom : function ( ps ) {
			return ps.y + ps.h;
		}
	};
} );
/**
 * Created by 白 on 2015/3/18.
 * 多图组件
 */

library( function () {
	var math =library["31"],
		css =library["6"],
		csa =library["10"],
		array =library["1"],
		animation =library["32"],
		$ =library["8"],

		ui =library["26"],
		p =library["38"],
		Layout =library["19"],
		ua =library["14"];

	function applyAnimation( arg, enterDelay ) {
		var last = {
			duration : 0,
			delay : 0
		};

		array.foreach( arg.images, function ( image, i ) {
			last = image.enter = {
				duration : 0.6,
				delay : enterDelay + i * 0.3,
				progress : {
					"0" : {
						rotate : -30,
						scale : !ua.ios && !ua.iphone6 ? 1 : 3,
						x : -arg.w * 2.4,
						y : arg.h * 2.4
					}
				}
			};
		} );

		return last.duration + last.delay;
	}

	function MultiImage( arg ) {
		var layout = arg.layout,
			body = layout.element,
			parent = arg.parent,
			images = arg.images,
			len = images.length,

			enterDelay = arg.delay || 0,
			deg = arg.sign * Math.min( 25 / len, 4 ),
			arrowIcon = arg.arrow,

			width = parent.w,
			height = parent.h,

			duration = math.range( 3 / len, 0.08, 0.6 ),
			delay = math.range( 1.5 / len, 0.04, 0.3 );

		array.foreach( images, function ( image, i ) {
			image.x = p.center( image, parent, true );
			image.y = p.middle( image, parent, true );
			image.zi = 10000 + i;
			image.rotate = ( i + 1 - len ) * deg;
			image.appendTo( parent );
		} );

		if ( arg.animation !== false ) {
			applyAnimation( {
				images : images,
				w : width,
				h : height
			}, enterDelay );
		}

		layout.onEnterEnd( function () {
			var curTopIndex = len - 1,
				resetHandles = null,
				flyHandle = null;

			function fly( direction ) {
				var lock = ui.Lock(),
					flyIndex = curTopIndex--,
					flyImage = images[( flyIndex % len + len ) % len];

				// 移除重置动画
				if ( resetHandles ) {
					resetHandles = null;
				}

				flyHandle = Layout.transition( flyImage, {
					end : {
						x : ( direction ? layout.w : -flyImage.w ),
						opacity : 0
					},
					duration : 0.3,
					onEnd : function () {
						flyHandle = null;
						flyImage.x = p.center( flyImage, parent, true );
						flyImage.opacity = 1;
						flyImage.zi -= len;
						flyImage.rotate = ( 1 - len ) * deg;

						// 启动重制动画
						resetHandles = array.map( images, function ( image, pos ) {
							var bottomImage = images[( ( flyIndex + pos ) % len + len ) % len];
							return Layout.transition( bottomImage, {
								end : {
									rotate : ( pos + 1 - len ) * deg
								},
								timing : animation.Timing.easeOut,
								delay : delay * pos / 2,
								duration : duration / 2
							} );
						} );

						lock.remove();
					}
				} );
			}

			// 滑动动画
			ui.onSwipeStart( parent.element, function ( event ) {
				event.xOut && fly( event.dX > 0 );
			} );

			// 显示箭头
			if ( arrowIcon ) {
				css( prev, "opacity", 1 );
				css( next, "opacity", 1 );
			}

			// 结束时快进动画
			layout.onRemove( function () {
				flyHandle && flyHandle.fastForward();
				if ( resetHandles ) {
					array.foreach( resetHandles, function ( animation ) {
						animation.fastForward();
					} );
					resetHandles = null;
				}
			} );
		} );

		if ( arrowIcon ) {
			var prev = $( arrowIcon, {
					css : {
						width : css.px( arrowIcon.w ),
						height : css.px( arrowIcon.h )
					}
				} ), next = arrowIcon.cloneNode( true ),
				offset = arrowIcon.offset || 15;

			function guideAnimation( sign ) {
				function pos( x ) {
					return {
						transform : [css.scale( sign, 1 ), css.translate( x, 0, 0 )].join( " " )
					};
				}

				return csa.animation( [{
					0 : pos( 0 ),
					20 : pos( 0 ),
					35 : pos( 12 ),
					50 : pos( -20 ),
					65 : pos( 0 ),
					80 : pos( -12 ),
					100 : pos( 0 )
				}, 1.5, "infinite"] );
			}

			array.foreach( [prev, next], function ( arrow ) {
				css( arrow, {
					visibility : "visible",
					"z-index" : 10000,
					opacity : 0,
					transition : "0.8s"
				} );
			} );

			layout.onShow( function () {
				css( prev, {
					position : "absolute",
					left : css.px( p.leftIn( prev, layout ) + offset ),
					top : css.px( p.middle( prev, parent ) ),
					animation : guideAnimation( 1 )
				} );

				css( next, {
					position : "absolute",
					left : css.px( p.rightIn( prev, layout, true ) - offset ),
					top : css.px( p.middle( prev, parent ) ),
					animation : guideAnimation( -1 )
				} );

				body.appendChild( prev );
				body.appendChild( next );
			} );

			layout.onRemove( function () {
				$.remove( prev );
				$.remove( next );
			} );
		}
	}

	MultiImage.applyAnimation = applyAnimation;
	library["39"] = MultiImage;
} );
/**
 * Created by 白 on 2015/8/14.
 */

library( function () {
	var object =library["2"],
		z2d =library["17"],
		random =library["33"],
		array =library["1"],
		Layout =library["19"],
		multiImage =library["39"];

	// 为一组组件添加速度
	function applySpeed( components, duration, delay, last ) {
		var lastEnter = null;
		last = last || 0;
		array.foreach( components, function ( comp, i ) {
			lastEnter = comp.enter = object.extend( comp.enter, {
				duration : duration + ( comp.enter.durationCorrect || 0 ),
				delay : (comp.enter.kahn1990_delayIf == true)?comp.enter.kahn1990_delay:(delay * duration * i + last)
			} );
		} );
		return lastEnter ? lastEnter.duration + lastEnter.delay : last;
	}

	// 分析页面
	function analyzePage( page ) {
		var layout = page.wrapper,
			enterComponentTable = {
				text : [],
				image : [],
				mulitimage : []
			};

		// 提取需要动画的元素,并根据类型计数
		Layout.loopComponent( layout, function ( component ) {
			var applyEnter = component.applyEnter || {},
				type = applyEnter.type;

			if ( type ) {
				enterComponentTable[type] = enterComponentTable[type] || [];
				enterComponentTable[type].push( component );
			}
		} );

		return enterComponentTable;
	}

	// 应用页面动画
	function applyAnimate( page, appliedGroup ) {
		var layout = page.wrapper,
			applyEnter = layout.applyEnter,
			enterComponentTable = analyzePage( page ),
			speed, pageRandom,
			last = 0;

		function applySpeedA( components, duration, delay ) {
			last = applySpeed( components, duration, delay, last );
		}

		if ( applyEnter && appliedGroup ) {
			pageRandom = random.Random( appliedGroup.seed );
			speed = appliedGroup.speed;

			// 分配动画
			array.foreach( [[enterComponentTable.image, appliedGroup.imageGroup], [enterComponentTable.text, appliedGroup.textGroup]], function ( arg ) {
				array.foreach( arg[0], function ( comp ) {
					var midPoint = z2d.transform( Layout.getPageMatrix( comp ), [comp.w / 2, comp.h / 2, 1] );
					comp.enter = pageRandom.select( array.remove( arg[1], function ( enter ) {
						return enter.direction === ( midPoint[1] + 1 >= layout.h / 2 ? 0 : 2 ) ||
							enter.direction === ( midPoint[0] + 1 >= layout.w / 2 ? 3 : 1 );
					} ) );
				} );
			} );

			// 有序
			if ( appliedGroup.inOrder === true || ( appliedGroup.inOrder == null && pageRandom() > 0.5 ) ) {
				if ( applyEnter.first === "text" ) {
					applySpeedA( enterComponentTable.text, speed[2], speed[3] );
					applySpeedA( enterComponentTable.image, speed[0], speed[1] );
				}
				else {
					applySpeedA( enterComponentTable.image, speed[0], speed[1] );
					applySpeedA( enterComponentTable.text, speed[2], speed[3] );
				}
			}
			// 无序
			else {
				var unorderedComponents = pageRandom.arrange( enterComponentTable.text.concat( enterComponentTable.image ) ),
					unorderedTexts = [], unorderedTextIndexes = [];

				// 调整文字顺序,保证标题总在最前
				array.foreach( unorderedComponents, function ( comp, i ) {
					if ( comp.applyEnter.type === "text" ) {
						unorderedTextIndexes.push( i );
						unorderedTexts.push( comp );
					}
				} );

				array.foreach( unorderedTexts.sort( function ( lhs, rhs ) {
					return lhs.zi - rhs.zi;
				} ), function ( comp, i ) {
					unorderedComponents[unorderedTextIndexes[i]] = comp;
				} );

				applySpeedA( unorderedComponents, speed[4], speed[5] );
			}

			// 处理多图
			array.foreach( enterComponentTable.mulitimage, function ( comp ) {
				last = multiImage.applyAnimation( comp, last );
			} );
		}
	}

	library["40"].analyzePage = analyzePage;
	library["40"].applySpeed = applySpeed;
	library["40"].applyAnimate = applyAnimate;
} );
/**
 * Created by 白 on 2015/3/13.
 */

library( function () {
	var array =library["1"],
		object =library["2"],
		z2d =library["17"],

		scaleComponent =library["36"],
		enterAnimation =library["37"],
		pageAnimation =library["40"],
		Content =library["24"],
		Transform =library["23"],
		MultiImage =library["39"],
		random =library["33"].Random( 0 ),
		ua =library["7"],

		css =library["6"],
		p =library["38"],
		Layout =library["19"],
		layoutFormats = Layout.formats,
		Component = Layout.Component,
		animationTable = enterAnimation.table; // 动画表

	var filters = {
			1 : "blur(6px)",
			2 : "saturate(0)",
			3 : "saturate(180%)",
			4 : "sepia(100%)",
			5 : "sepia(100%) blur(6px)",
			6 : "brightness(1.5) contrast(150%)",
			7 : "contrast(200%)",
			8 : "brightness(0.5)",
			9 : "hue-rotate(120deg)"
		},
		filterLoop = {
			7 : true,
			8 : true,
			9 : true
		},
		lens = {
			1 : {
				0 : {
					opacity : 0
				}
			},
			2 : {
				0 : {
					rotate : 0,
					opacity : 0
				},
				100 : {
					rotate : -360,
					opacity : 1
				}
			},
			3 : {
				0 : {
					scale : 1.2,
					x : "-6%"
				},
				100 : {
					scale : 1.2,
					x : "6%"
				}
			},
			4 : {
				0 : {
					scale : 1.2,
					x : "6%"
				},
				100 : {
					scale : 1.2,
					x : "-6%"
				}
			},
			5 : {
				0 : {
					scale : 1.2,
					y : "-6%"
				},
				100 : {
					scale : 1.2,
					y : "6%"
				}
			},
			6 : {
				0 : {
					scale : 1.2,
					y : "6%"
				},
				100 : {
					scale : 1.2,
					y : "-6%"
				}
			},
			7 : {
				0 : {
					scale : 1.15
				}
			},
			8 : {
				100 : {
					scale : 1.15
				}
			},
			11 : {
				10 : {
					scale : 2
				},
				30 : {
					x : "50%",
					scale : 2
				},
				50 : {
					x : "50%",
					scale : 2
				},
				80 : {
					x : "50%",
					scale : 2
				}
			},
			12 : {
				10 : {
					scale : 2
				},
				30 : {
					y : "-50%",
					scale : 2
				},
				50 : {
					y : "-50%",
					x : "-20%",
					scale : 2
				},
				70 : {
					x : "50%",
					scale : 2
				},
				85 : {
					y : "50%",
					scale : 2
				},
				95 : {
					scale : 2
				}
			}
		},
		lensTiming = {
			2 : "linear",
			3 : "linear",
			4 : "linear",
			5 : "linear",
			6 : "linear",
			7 : "linear",
			8 : "linear",
			11 : "linear",
			12 : "linear"
		};

	function dealWidth( value, func ) {
		if ( value != null ) {
			return func( value );
		}
	}

	function defaultValue( val, defaultValue ) {
		return val == null ? defaultValue : val;
	}

	function layCustom( layout, ds, type ) {
		var components = ds.component(),
			custom = ds.custom,
			isScreen = type === "screen" || custom.layoutType === "screen",
			isOld = !isScreen && custom.label === "custom",
			transform = isOld ? Transform.cover504( layout ) : custom.type === "cover" ? Transform.cover( layout ) : Transform.y( layout ),
			scale = transform.scale,
			xScale = layout.xScale, yScale = layout.yScale,
			curDelay = 0;

		function Custom( img, info ) {
			var width = ( info.width - ( info.borderWidth || 0 ) ) * scale << 0,
				height = ( info.type === "text" && img.h ? width / img.whr : info.height * scale ) << 0,
				content = img.color ? Content.Rect( width, height, img.color ) :
					ds.cut === false ? Content.Cover( img, {w : width, h : height} ) : Content.Image( img, {w : width, h : height} );

			return img.mask ? Content.Mask( content, img.mask ) : content;
		}

		layout.applyEnter = {
			first : custom.animationFirst,
			pageAnimation : ds.pageAnimation
		};

		// 生成组件
		array.foreach( components, function ( img, index ) {
			var info = img.info,
				component = null;

			// 处理图片
			function dealImage( img, componentInfo, parent ) {
				var imageInfo = componentInfo.info;

				// 边框图
				if ( componentInfo.frame != null ) {
					return dealWidth( componentInfo.frame, function ( frameImg ) {
						var frameInfo = frameImg.info,
							frame = Component( Custom( frameImg, frameInfo ) ),
							content = Component( Custom( img, imageInfo ) ),
							wrapper = Component( Content.Rect( frame.w, frame.h ), parent );

						wrapper.origin = z2d.transform( transform.matrix, [frameInfo.x, frameInfo.y, 1] );
						content.origin = [( imageInfo.x - frameInfo.x ) * scale, ( imageInfo.y - frameInfo.y ) * scale];
						frame.appendTo( wrapper );
						content.appendTo( wrapper );
						wrapper.info = object.extend( frameInfo, {
							type : "image"
						} );

						wrapper.content = content;

						return wrapper;
					} );
				}

				// 边框
				if ( imageInfo.maskRadius || imageInfo.borderWidth || imageInfo.borderColor ) {
					return Component( Content.Border( Custom( img, imageInfo ), {
						radius : imageInfo.maskRadius * scale << 0,
						width : imageInfo.borderWidth * scale << 0,
						color : imageInfo.borderColor
					} ), parent );
				}

				return Component( Custom( img, imageInfo ), parent );
			}

			// 背景图
			if ( info == null ) {
				if ( img.color ) {
					layout.background = img.color;
				}
				else {
					// 背景覆盖
					if ( isOld || custom.type === "cover" || isScreen ) {
						component = layout.backgroundImage = Component( Content.Cover( img, layout ), layout );
						component.applyEnter = {
							type : "background",
							coverBackground : true
						};
					}
					// 背景撑满y
					else {
						component = Component( Content.Image( img, layout.h / img.h ), layout );
						component.x = p.center( component, layout );
						component.applyEnter = {
							type : "background",
							coverBackground : false
						};
					}
				}
			}
			// 屏幕图
			else if ( info.type === "screen" ) {
				component = Component( Content.Image( img, layout.w, layout.h ), layout );
			}
			// 一般组件
			else {
				if ( isScreen ) {
					!function () {
						var x = info.x * xScale << 0, y = info.y * yScale << 0,
							width = Math.round( info.width * xScale ),
							height = Math.round( ( info.type === "text" ? info.width / img.whr : info.height ) * yScale ),
							content;

						// 遮罩
						if ( info.type === "text" ) {
							var scale = Math.min( width / img.w, height / img.h );
							x += width - img.w * scale;
							y += height - img.h * scale;
							component = Component( Content.Image( img, scale ), layout );
						}
						else {
							content = Content.Cover( img, {w : width, h : height} );
							component = Component( img.mask ? Content.Mask( content, img.mask ) : content, layout );
						}

						component.origin = [x, y];
					}();
				}
				else {
					if ( img.multiImage ) {
						// 多图
						dealWidth( img.multiImage, function ( images ) {
							component = Component( Custom( {
								color : "transparent"
							}, info ), layout );

							MultiImage( {
								layout : layout,
								parent : component,
								images : component.images = array.map( images, function ( contentImg ) {
									return dealImage( contentImg, img );
								} ),
								delay : 3,
								sign : -1,
								animation : false,
								arrow : img.arrow
							} );
						} );
					}
					else {
						component = dealImage( img, img, layout );
					}

					info = component.info || info;
					var point = z2d.transform( transform.matrix, [info.x, info.y, 1] );
					component.origin = array.map( [[point[0], info.alignX, layout.w, component.w],
						[point[1], info.alignY, layout.h, component.h]], array.apply( function ( x, align, pw, w ) {
						return align != null ? ( pw - w ) * align : x;
					} ) );
					delete component.info;
				}

				component.rotate = ( info.rotate || 0 ) * 180 / Math.PI;
				component.opacity = defaultValue( info.opacity, 1 );
				component.zi = info && info.type === "text" ? 100 + index : index;

				// 缩放文字使全部显示
				if ( info.type === "text" ) {
					component.scale *= Math.max( scaleComponent( component, layout ), 0.5 );
					component.text = true;
				}

				// 处理动画
				if ( isOld ) {
					var enter = object.extend( animationTable[info.animation] || enterAnimation.Emerge(), {
							duration : info["animation-duration"]
						} ),
						delay = info["animation-delay"];

					enter.delay = delay === undefined || delay === null ? curDelay : delay;
					curDelay = enter.delay + ( enter.duration || 1 );
					component.enter = enter;
				}
				else {
					component.applyEnter = info.type == null ? undefined : {
						type : info.type,
						enterTiming : info.enterTiming,
						animationIndex : info.animationIndex,
						animation : info.animation,
						index : index
					};
				}
			}

			if ( component ) {
				component.custom = true;
				component.customInfo = info;
				component.isElement = true;

				function Wrapper( content ) {
					var wrapper = Component( Content.Rect( content.w, content.h ), content.parent );
					wrapper.origin = content.origin;
					wrapper.rotate = content.rotate;
					wrapper.scale = content.scale;

					content.origin = [0, 0];
					content.rotate = 0;
					content.scale = 1;
					content.appendTo( wrapper );

					// 外置mask
					mask = content.element.mask;
					if ( mask ) {
						css.remove( content.element, ["mask-image", "mask-size"] );
						css( wrapper.element, {
							"mask-image" : css.url( mask ),
							"mask-size" : "100% 100%"
						} );
						wrapper.element.mask = mask;
					}

					return wrapper;
				}

				var filter = img.filter,
					camera = img.camera,
					content = component.content || component,
					wrapper, mask;

				if ( filter && ua.ios ) {
					wrapper = Wrapper( content );
					var forward = Layout.cloneComponent( content ),
						progress;

					forward.appendTo( wrapper );
					forward.opacity = 0;
					forward.zi = 1000;

					if ( filterLoop[filter] ) {
						progress = {
							50 : {
								absOpacity : 1
							}
						};
					}
					else {
						progress = {
							0 : {
								absOpacity : 1
							}
						};
					}

					css( forward.element, "filter", filters[filter] );
					forward.enter = {
						progress : progress,
						duration : 2.5
					};
				}

				if ( camera ) {
					component.applyEnter = false;
					content = wrapper || content;
					wrapper = Wrapper( content );

					css( wrapper.element, "overflow", "hidden" );

					lens[camera] && ( content.enter = {
						both : true,
						progress : lens[camera],
						duration : 3,
						timing : lensTiming[camera]
					} );

					if ( forward ) {
						forward.enter.duration = 5;
					}
				}
			}
		} );
	}

	// 组件板式
	layoutFormats.components = {
		create : layCustom
	};

	// 屏幕板式
	layoutFormats.screen = {
		create : function ( layout, ds ) {
			layCustom( layout, ds, "screen" );
		}
	};

	// 单图板式
	layoutFormats.SingleImage = {
		create : function ( layout, ds ) {
			var background = Component( Content.Cover( ds.image( 0 ), layout ), layout );
			background.isElement = true;
		}
	};

	// 空板式,仅为加载
	layoutFormats.custom = layoutFormats["custom-2"] = {};

	// 多图
	layoutFormats.MutipleImage01 = {
		resource : {
			arrow : "arrow/mi01"
		},
		create : function ( layout, ds, resource ) {
			var height = layout.h * 0.82 << 0,
				frame = Component( Content.Rect( height / 410 * 244 << 0, height ), layout ); // 多图框

			frame.x = p.center( frame, layout );
			frame.y = p.middle( frame, layout );

			// 多图组件
			MultiImage( {
				layout : layout,
				parent : frame,
				images : array.map( ds.component( 0 ).multiImage, function ( img ) {
					return Component( Content.Border( Content.Cover( img, frame ), {
						width : 3,
						color : "#FFFFFF"
					} ), null, true );
				} ),
				sign : -1,
				arrow : resource.arrow
			} );
		}
	};

	// 三行字+多图
	layoutFormats.MutipleImage04 = {
		resource : {
			background : "mi04-background.jpg",
			arrow : "arrow/mi04"
		},
		create : function ( layout, ds, resource ) {
			var scale = layout.yScale;

			// 背景图
			Component( Content.Image( resource.background, layout.w, layout.h ), layout );

			// 元素
			var text1 = Component( Content.Image( ds.component( 0 ), scale ), layout ),
				text2 = Component( Content.Image( ds.component( 1 ), scale ), layout ),
				text3 = Component( Content.Image( ds.component( 2 ), scale ), layout ),
				frame = Component( Content.Rect( 356 / 2 * scale, 518 / 2 * scale ), layout );

			text2.y = p.bottomTo( text2, text1 ) + 11 * scale;
			text3.y = p.bottomTo( text3, text2 ) + 19 * scale;
			frame.y = p.bottomTo( frame, text3 ) + 39 * scale;

			// 垂直居中
			var padding = ( layout.h - p.bottom( frame ) ) / 2 << 0;
			array.foreach( [text1, text2, text3, frame], function ( comp ) {
				comp.y += padding;
				comp.x = p.center( comp, layout );
			} );

			// 入场动画
			text1.enter = text2.enter = text3.enter = enterAnimation.Emerge();
			pageAnimation.applySpeed( [text1, text2, text3], 1, 1 );

			// 多图组件
			MultiImage( {
				layout : layout,
				parent : frame,
				images : array.map( ( ds.component( 3 ) ).multiImage, function ( img ) {
					return Component( Content.Border( Content.Cover( img, frame ), {
						width : 1,
						color : "#FFFFFF"
					} ) );
				} ),
				delay : 3,
				sign : -1,
				arrow : resource.arrow
			} );
		}
	};

	// 处理自定义板式的数据
	array.foreach( ["SingleImage", "screen", "custom", "custom-2", "MutipleImage01", "MutipleImage04"], function ( label ) {
		layoutFormats[label].load = function ( pageData, callback ) {
			var newLabel = "components", components = [], componentImages = [], fail = false;

			// 计算新的label
			switch ( label ) {
				case "MutipleImage01":
				case "MutipleImage04":
				case "screen":
					newLabel = label;
					break;
			}

			function ComponentImage( data ) {
				var url = data.url, img;
				if ( url ) {
					img = new Image();
					img.targetSrc = url;
					componentImages.push( img );
				}
				else {
					img = {};
				}

				img.info = data.imageinfo == null ? null : object.extend( {
					x : 0,
					y : 0
				}, data.imageinfo );
				img.filter = data.filter;
				img.camera = data.camera;
				return img;
			}

			array.foreach( pageData.image, function ( data ) {
				if ( data.url == null && data.images == null ) {
					if ( data.imageinfo == null ) {
						fail = true;
					}
					return;
				}

				data = JSON.parse( JSON.stringify( data ) );
				var component = ComponentImage( data ),
					mask, frame, multiImage;

				components.push( component );

				if ( mask = data.mask ) {
					component.mask = ComponentImage( mask );
				}

				if ( frame = data.frame ) {
					component.frame = ComponentImage( frame )
				}

				if ( multiImage = data.images ) {
					component.multiImage = array.map( array.remove( multiImage, function ( src ) {
						return src == null;
					} ), function ( src ) {
						return ComponentImage( {
							url : src
						} );
					} );

					component.arrow = ComponentImage( {
						url : data.arrow || "http://cloudl7dev.b0.upaiyun.com/a7802fd8f506dffd01df67d06308ecf9mi01-arrow.png"
					} );
				}
			} );

			callback( object.extend( pageData, {
				label : newLabel,
				fail : fail,
				custom : object.extend( pageData.custom || {}, {
					label : pageData.label
				} ),
				componentImages : componentImages,
				components : components
			} ) );
		};
	} );

	library["41"].layCustom = layCustom;
} );
/**
 * Created by 白 on 2014/11/24.
 * 初页系统的启动
 */

library( function () {
	var async =library["4"],
		$ =library["8"],
		URL =library["9"],
		array =library["1"],
		css =library["6"],
		csa =library["10"],
		pointer =library["11"],
		object =library["2"],

		Img =library["16"],
		util =library["25"],
		share =library["28"],
		tips =library["29"],
		ui =library["26"],
		loadWork =library["30"],
		ua =library["14"],
		Work =library["34"],
		switchAnimation =library["35"],
		env =library["27"],
		localResource =library["15"],

		href = URL( location.href ),
		hash = href.hash.replace( "#", "" ),
		arg = href.arg,
		loadingStart = new Date();

library["41"];

	// 处理从客户端获取的列表
	function ClientList( list ) {
		return list === undefined || object.is.Array( list ) ? list : JSON.parse( list );
	}

	// 通过动画移除元素
	function removeByAnimation( el, last, duration ) {
		csa.runAnimation( [el, {
			100 : last
		}, duration], function () {
			$.remove( el );
		} );
	}

	function WorkBody( url, arg ) {
		return $( Work( object.extend( {
			loadWork : function ( callback ) {
				return loadWork( url, callback );
			},
			music : !/ChuyeNoMusic/gi.test( navigator.userAgent ) && !window.noMusic,
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight,
			disableClickMode : ua.inChuyeList,
			toolbar : ua.MicroMessenger
		}, arg || {} ) ), {
			css : {
				position : "absolute",
				left : 0,
				top : 0
			}
		} );
	}

	// 如果有firstpageStyle,样式来自于脚本内部变量
	firstpageStyle && $( "style", firstpageStyle, document.head );

	library["42"] = function () {
		var lock,
			curBody = document.body.appendChild( WorkBody( workDetailUrl, object.extend( {
				pageIndex : parseInt( hash ) == hash ? parseInt( hash ) : undefined,
				preview : ua.chuyePreview
			}, JSON.parse( env.getSessionData( env.workLocation() ) || "{}" ) ) ) );

		// 本地缓存脚本
		if ( window.firstpageVersion ) {
			localResource( "script", function () {
				return firstpageScript.toString();
			} );
		}

		if ( ua.chuyeList ) {
			lock = ui.Lock();
			env.useClient( ["open", "enterFullScreen", "leaveFullScreen", "switchWorkStart", "switchWorkEnd", "switchFirst", "switchLast"], function () {
				var workList = firstpage.workList || JSON.parse( firstpage.getWorkList() ),
					originalWorkId = curBody.workId,
					listIndex = findIndexById( originalWorkId ),
					bodyCache = {},
					preloaded = false,

					workPlayCache = {},
					setTitleHandle = null, loadNextHandle = null,

					screenMask = $( "div", {
						css : css.full( {
							"z-index" : 100000
						} )
					}, document.body ),
					maskTapper = $( "div", {
						css : css.full( {
							left : 0,
							right : 0,
							top : css.px( 90 ),
							bottom : css.px( 90 )
						} )
					}, screenMask );

				window.loadGA && window.loadGA();

				firstpage.updateWorkList = null;

				function flag( name ) {
					return firstpage[name] == null ? false : object.is.Boolean( firstpage[name] ) ? firstpage[name] : firstpage[name]();
				}

				// 根据id制作body
				function ListWorkBody( id ) {
					return WorkBody( workDetailUrl.replace( originalWorkId + "", id ), {
						pageIndex : workPlayCache[id]
					} );
				}

				// 预加载作品
				function preloadWork() {
					preloaded = true;
					array.foreach( [-1, 1], function ( sign ) {
						var workId = workList[listIndex + sign];
						bodyCache[sign] = workId ? ListWorkBody( workId ) : null;
					} );
				}

				// 设置标题
				function setTitle( workBody, listIndex ) {
					if ( listIndex !== undefined ) {
						history.replaceState( null, "", href.toString().replace( originalWorkId + "", workBody.workId ) );
						window.cas && cas.trackPageview && cas.trackPageview();
						document.title = "作品加载中";
					}

					setTitleHandle = workBody.onLoad( function () {
						document.title = workBody.workTitle;
						setTitleHandle = null;
					} );
				}

				// 显示新的body
				function showBody( newBody ) {
					// 移除旧的body
					curBody.recycle();
					$.remove( curBody );

					// 记录当前播放的页码
					workPlayCache[curBody.workId] = curBody.curPageIndex;

					// 设置新的body
					curBody = newBody;
					curBody.play(); // 播放body

					preloadWork(); // 预加载作品
					setTitle( curBody, listIndex ); // 设置标题
				}

				// 寻找id对应的index
				function findIndexById( targetId ) {
					return array.foreach( workList, function ( id, i ) {
						if ( id == targetId ) {
							return i;
						}
					} );
				}

				// 如果是ios手动制作对应方法
				if ( ua.ios && !ua.win32 ) {
					array.foreach( ["open", "enterFullScreen", "leaveFullScreen", "switchWorkStart", "switchWorkEnd",
						"switchFirst", "switchLast"], function ( name ) {
						firstpage[name] = function () {
							document.location = "chuyeapp:" + name + ":" + Array.prototype.slice.call( arguments, 0 ).join( "$" );
						};
					} );
				}

				// 进入全屏
				ui.onTap( maskTapper, firstpage.enterFullScreenA = function () {
					if ( !curBody.loadError ) {
						// 恢复音乐播放
						if ( curBody.audioNeedResume ) {
							curBody.audioNeedResume = false;
							curBody.playAudio();
						}

						// 回复提示
						document.documentElement.classList.remove( "hide-tips-fade" );

						// 通知客户端
						firstpage.enterFullScreen();

						// 移除屏幕遮罩
						screenMask.classList.add( "hidden" );

						// 预加载页面
						curBody.preloadPage();
					}
				} );

				// 退出全屏
				ui.onTap( document.documentElement, firstpage.leaveFullScreenA = function () {
					if ( !ui.preventBodyEvent && screenMask.classList.contains( "hidden" ) ) {
						// 移除提示
						document.documentElement.classList.add( "hide-tips-fade" );

						// 停止播放音乐并记录是否需要恢复
						curBody.audioNeedResume = curBody.audioPlayIntention;
						curBody.stopAudio && curBody.stopAudio();

						// 通知客户端
						firstpage.leaveFullScreen();

						// 回复屏幕遮罩
						screenMask.classList.remove( "hidden" );
					}
				} );

				// 跳转到某作品
				firstpage.jump = function ( index ) {
					if ( curBody.workId != workList[index] ) {
						showBody( document.body.appendChild( ListWorkBody( workList[listIndex = index] ) ) );
					}
				};

				// 手动更新作品列表
				firstpage.updateWorkListA = function ( list ) {
					workList = ClientList( list );
					if ( ( listIndex = findIndexById( curBody.workId ) ) === undefined ) {
						firstpage.jump( 0 );
					}
				};

				if ( arg.full || flag( "full" ) ) {
					setTimeout( function () {
						firstpage.enterFullScreenA();
						lock.remove();
					}, Math.max( 0, 1500 - ( new Date() - loadingStart ) ) );
				}
				else {
					lock.remove();
					document.documentElement.classList.add( "hide-tips-fade" );
				}

				// 第一页加载完成后,预加载其他作品
				curBody.onPageLoad( preloadWork );

				// 设置页面标题
				setTitle( curBody );

				curBody.play();

				ui.onSwipeStart( screenMask, function ( event ) {
					if ( event.yOut ) {
						// 如果还没有预加载过,预加载
						if ( !preloaded ) {
							preloadWork();
						}

						var sign = event.dY > 0 ? -1 : 1,
							newBody = bodyCache[sign];

						// 切换作品
						function cutBody( cut, endIndex ) {
							var lock = ui.Lock();
							firstpage.switchWorkStart();
							util.cutPage( function () {
								cut( document.body, curBody, newBody, function () {
									listIndex = endIndex;
									showBody( newBody ); // 显示新body
									firstpage.switchWorkEnd( endIndex ); // 切换结束
									lock.remove(); // 解锁
								}, 0.4 );
							} );
						}

						// 如果有新body,切换
						if ( newBody ) {
							// 清理标题设置句柄
							if ( setTitleHandle ) {
								setTitleHandle.remove();
								setTitleHandle = null;
							}
							// 清理加载新页句柄
							loadNextHandle = null;
							cutBody( sign === 1 ? switchAnimation.push : switchAnimation.back, listIndex + sign );
						}

						// 如果不能刷新,弹出提示
						else if ( arg["no-refresh"] || flag( "noRefresh" ) ) {
							ui.alert( sign === 1 ? "没有下一个作品了" : "没有上一个作品了" );
						}

						// 如果有回调但没有被调用,弹出提示
						else if ( firstpage.updateWorkList !== null ) {
							ui.alert( "加载中,请稍候" );
						}

						// 底部上滑,加载新列表
						else if ( sign === 1 ) {
							// 加载图标
							var loadMoreWrapper = $( "div", {
								css : {
									position : "absolute",
									left : "50%",
									bottom : css.px( 80 ),
									"z-index" : 100,
									opacity : 0,
									transition : "0.2s"
								}
							}, document.body );

							$( tips.LoadingChrysanthemum( loadMoreWrapper ), {
								css : {
									"z-index" : 0
								}
							} );

							setTimeout( function () {
								css( loadMoreWrapper, "opacity", 1 );
							}, 0 );

							// 加载下一页句柄
							loadNextHandle = function () {
								var newId = workList[listIndex + 1];
								if ( newId ) {
									newBody = ListWorkBody( newId );
									cutBody( switchAnimation.push, listIndex + 1 );
								}
								else {
									ui.alert( "没有下一个作品了" );
								}
							};

							firstpage.updateWorkList = function ( newList ) {
								newList = ClientList( newList );

								// 移除加载图标
								removeByAnimation( loadMoreWrapper, {
									opacity : 0
								}, 0.3 );

								if ( JSON.stringify( newList ) === JSON.stringify( workList ) ) {
									ui.alert( "没有下一个作品了" );
									loadNextHandle = null;
								}
								else {
									workList = newList;
									listIndex = findIndexById( curBody.workId );
									loadNextHandle && loadNextHandle();
								}
								firstpage.updateWorkList = null;
							};

							firstpage.switchLast();
						}

						// 顶部下滑,刷新列表
						else {
							var refreshArrow = $( Img.Icon( "refresh-arrow" ), {
									css : {
										position : "absolute",
										left : 0,
										top : 0,
										"z-index" : 1,
										transition : "0.3s"
									}
								} ),
								refreshArrowSize = refreshArrow.w,
								refreshWrapper = $( "div", {
									css : {
										position : "absolute",
										left : "50%",
										"margin-left" : css.px( -refreshArrowSize / 2 ),
										width : css.px( refreshArrowSize ),
										height : css.px( refreshArrowSize ),
										top : css.px( -refreshArrowSize ),
										"z-index" : 100
									},
									children : [refreshArrow]
								}, document.body ),
								refreshLoading = $( tips.Loading( refreshWrapper ), {
									css : {
										"z-index" : 0,
										transition : "0.3s",
										transform : "scale(0.88)",
										opacity : 0
									}
								} ),
								refreshY = 0,
								releaseRefresh = false;

							pointer.onMoveUp( {
								onMove : function ( event ) {
									css.transform( refreshWrapper, css.translate( 0, Math.atan( ( refreshY += event.dY ) / 100 ) * 60 ) );
									releaseRefresh = refreshY > 100;
									css.transform( refreshArrow, css.rotateZ( releaseRefresh ? 180 : 0 ) );
								},
								onUp : function () {
									function removeTips() {
										removeByAnimation( refreshWrapper, {
											transform : "translate3d(0,0,0)"
										}, 0.3 );
									}

									if ( releaseRefresh ) {
										css( refreshArrow, "opacity", 0 );
										css( refreshLoading, "opacity", 1 );

										firstpage.updateWorkList = function ( newList ) {
											newList = ClientList( newList );
											if ( newList === undefined || ( workList = newList )[listIndex] == curBody.workId ) {
												var msgBox = $( "div.msg-box", {
														css : {
															top : css.px( Math.atan( ( refreshY += event.dY ) / 100 ) * 60 + 3 ),
															visibility : "visible"
														}
													}, document.body ),
													msg = $( "div.msg", {
														css : {
															opacity : 1,
															"border-radius" : "25px",
															"line-height" : "25px",
															padding : "0 12px"
														},
														innerHTML : "没有新的作品了"
													}, msgBox );

												async.once( function () {
													removeByAnimation( msgBox, {
														opacity : 0
													}, 0.3 );
												}, function ( remove ) {
													return [async.setTimeout( remove, 2000 ), ui.onPointerDown( document, remove )];
												} );

												preloadWork();
											}
											else {
												newBody = ListWorkBody( newList[0] );
												cutBody( switchAnimation.fade, 0 );
											}
											firstpage.updateWorkList = null;
											removeTips();
										};
										firstpage.switchFirst();
									}
									else {
										removeTips();
									}
								}
							} );
						}
					}
				} );
			} );
		}
		else {
			var loginData;
			// 如果有登录数据,切出登录页面
			if ( loginData = JSON.parse( env.getSessionData( "login-data" ) || "null" ) ) {
				env.registLoginPage[loginData.name]( object.extend( loginData, {
					noAnimate : true,
					parent : curBody
				} ) );
			}

			curBody.onLoad( function () {
				var workData = curBody.workData;

				// 在初页中,回调onFirstPageDataLoad方法
				if ( ua.chuye ) {
					ua.chuyeVersion < 2 && async.polling( function () {
						return !!document.onFirstPageDataLoad;
					}, function () {
						document.thumbnail = workData.picture;
						document.description = workData.desc;
						document.onFirstPageDataLoad();
					} );
				}

				// 在iframe中,回调父页面的onWorkLoad方法
				window.parent.onWorkLoad && window.parent.onWorkLoad( workData.data );

				// 设置分享url
				share( workData );

				// 预加载
				curBody.preloadPage();
			} );

			// 播放作品
			curBody.play();

			window.loadGA && window.loadGA();
		}

		// 修改尺寸
		$.bind( window, "resize", function () {
			curBody.resize( document.documentElement.clientWidth, document.documentElement.clientHeight );
		} );

		// 全局接口
		window.playAudio = function () {
			curBody && curBody.playAudio && curBody.playAudio();
		};

		window.stopAudio = function () {
			curBody && curBody.stopAudio && curBody.stopAudio();
		};

		Object.defineProperty( window, "curPageIndex", {
			set : function ( index ) {
				curBody && ( curBody.curPageIndex = index );
			},
			get : function () {
				return curBody ? curBody.curPageIndex : undefined;
			}
		} );

		Object.defineProperty( window, "curPageData", {
			get : function () {
				return curBody ? curBody.curPageData : undefined;
			}
		} );

		Object.defineProperty( window, "curWork", {
			get : function () {
				return curBody;
			}
		} );
	};
} );
/**
 * Created by Zuobai on 2015/8/2.
 * 输出压缩脚本
 */

main( function () {
	window.runFirstPage =library["42"];
} );
/**
 * Created by 白 on 2015/9/1.
 */

library( function () {
	var URL =library["9"],
		ua =library["14"],
		$ =library["8"],
		animation =library["32"];

	library["43"] = function ( workBody, musicIcon ) {
		var workData = workBody.workData,
			src = workData.music ? workData.music.src : null, // 音乐src
			audio = $( "<audio loop></audio>", workBody ); // audio标签

		musicIcon = musicIcon || {};
		workBody.audioPlayIntention = true; // 音乐播放意图

		audio.onerror = function () {
			audio.onerror = null;
			audio.src = URL.concatArg( src, {
				t : new Date().getTime()
			} );
			musicIcon.play && audio.play();
		};

		if ( !ua.ios ) {
			$.bind( audio, "loadeddata", function () {
				animation.requestFrames( {
					duration : 3,
					onAnimate : function ( ratio ) {
						audio.volume = ratio < 0 ? 0 : ratio;
					}
				} );
			} );
		}

		// 停止播放音乐
		workBody.stopAudio = function () {
			if ( musicIcon.play === true ) {
				workBody.audioPlayIntention = false;
				musicIcon.play = false;
				audio.pause();
			}
		};

		// 播放音乐
		workBody.playAudio = function () {
			if ( !audio.src ) {
				audio.src = src;
			}

			if ( musicIcon.play !== true ) {
				workBody.audioPlayIntention = true;
				musicIcon.play = true;
				audio.play();
			}
		};

		// 是否播放
		workBody.isAudioPlaying = function () {
			return !audio.paused;
		};

		return audio;
	};
} );
library({"group":{"1":{"s":[1,0.4,1.8,0,1.4,0],"n":"梦幻浮现","o":true,"i":0,"t":1},"2":{"s":[1,0.4,1.2,0.2,1,0.6],"n":"花样绽放","o":true,"i":2,"t":3},"3":{"s":[1,0.4,0.8,0.2,0.8,0.2],"n":"轻舞飞扬","o":true,"i":4,"t":5},"4":{"s":[1,0.4,1.4,0.2,1.4,0.2],"n":"立体旋转","o":true,"i":6,"t":6},"5":{"s":[1,0.4,1.2,0.2,1,0.1],"n":"大气磅礴","o":true,"i":7,"t":7},"6":{"s":[1,0.4,0.8,0.2,0.8,0.2],"n":"诙谐颤抖","o":true,"i":8,"t":9},"7":{"s":[1,0.4,1.2,0.1,0.8,0.1],"n":"简约滑动","o":true,"i":10,"t":11},"8":{"s":[1,0.4,0.8,0.2,0.8,0.2],"n":"抖动下落","o":true,"i":12,"t":12},"9":{"s":[1,0.4,0.8,0.1,0.8,0.1],"n":"可爱果冻","o":true,"i":13,"t":8},"14":{"s":[1,0.4,1,0.2,1.2,0.2],"n":"灵性翻动","o":true,"i":1,"t":14},"15":{"s":[1,0.4,1.2,0,1.2,0],"n":"回忆浮现","o":true,"i":15,"t":15},"16":{"s":[1,0.4,1.6,0,1.6,0],"n":"眉飞色舞","o":true,"i":16,"t":17},"17":{"s":[1,0.25,0.7,0.2,0.7,0.2],"n":"摇摆摇摆","o":true,"i":18,"t":18},"19":{"s":[1,0.25,1.2,0.2,0.7,0.2],"n":"趣味变形","o":true,"i":17,"t":19},"20":{"s":[1,0.25,0.8,0.2,0.8,0.2],"n":"波浪翻动","o":true,"i":9,"t":20}},"marshall":{"0":["fly-into-top","fly-into-right","fly-into-bottom","fly-into-left"],"1":["flip-in-x","flip-in-y"],"2":["circle-round"],"3":["curve-up"],"4":["bounce-in","bounce-in-up","bounce-in-right","bounce-in-down","bounce-in-left"],"5":["fly-into-top","fly-into-right","fly-into-bottom","fly-into-left"],"6":["overturn"],"7":["shrink"],"8":["tada"],"9":["wave-left","wave-right"],"10":["rotate-in-left-top","rotate-in-right-top","rotate-in-left-bottom","rotate-in-right-bottom"],"11":["scale"],"12":["fall-down-and-shake"],"13":["rubber-band"],"14":["fly-into-right","fly-into-left"],"15":["fade-in","emerge-top","emerge-right","emerge-bottom","emerge-left"],"16":["zoom-in-left","zoom-in-right","zoom-in-top","zoom-in-bottom"],"17":["light-speed-in-top","light-speed-in-right","light-speed-in-bottom","light-speed-in-left"],"18":["swing"],"19":["flash"],"20":["creep-top","creep-bottom"]}});
/**
 * Created by 白 on 2015/8/14.
 * 动画数据
 */

library( function () {
	var object =library["2"],
		random =library["33"],
		array =library["1"],
		Layout =library["19"],
		sa =library["35"],
		ea =library["37"],
		ua =library["14"],
		pageAnimationData =library["44"],
		marshall = pageAnimationData.marshall,
		pageAnimations = object.collect( function ( push ) {
			object.foreach( pageAnimationData.group, function ( id, g ) {
				function Marshall( id ) {
					return Group( array.map( marshall[id], function ( id ) {
						return ea.table[id];
					} ) );
				}

				push( id, {
					seed : 0,
					name : g.n,
					speed : g.s,
					inOrder : g.o,
					imageGroup : Marshall( g.i ),
					textGroup : Marshall( g.t )
				} );
			} );
		} ),

		bounce = Group( [DirectionGroup( ea.BounceFlying ), ea.bounceIn] ),
		swing = Group( [ea.swing] ),
		flipIn = Group( [ea.FlipIn( "x" ), ea.FlipIn( "y" )] ),
		shake = Group( [ea.shake, ea.wobble] ),
		fall = Group( [ea.fallDownAndShake] ),
		tada = Group( [ea.tada] ),
		rubberBand = Group( [ea.rubberBand] ),
		rotateIn = Group( [DirectionGroup( ea.RotateIn )] ),
		zoomIn = Group( [DirectionGroup( ea.ZoomIn )] ),
		lightSpeedIn = Group( [DirectionGroup( ea.LightSpeedIn )] ),
		wave = Group( DirectionGroup( ea.Wave, [1, 3] ) ),
		creep = Group( DirectionGroup( ea.Creep, [0, 2] ) ),
		circleRound = Group( [ea.circleRound] ),
		coin = Group( [ea.coin] ),
		emerge = Group( [DirectionGroup( ea.Emerge ), ea.fadeIn] ),
		overturn = Group( [ea.overturn] ),
		shrink = Group( [ea.shrink] ),
		scale = Group( [ea.scale] ),
		flyInto = Group( DirectionGroup( ea.FlyInto ) ),
		flyIntoX = Group( DirectionGroup( ea.FlyInto, [1, 3] ) ),
		roundFromFarAndNear = Group( [ea.roundFromFarAndNear] );

	// 方向动画组
	function DirectionGroup( AnimationGen, directions ) {
		return array.map( directions || array.range( 4 ), function ( direction ) {
			return AnimationGen( direction );
		} );
	}

	// 动画组
	function Group( group ) {
		var result = [];
		array.foreach( group, function ( group ) {
			result = result.concat( group );
		} );
		array.foreach( result, function ( enter ) {
			result.isEmphasize = Layout.isEmphasize( enter );
			result.isScale = enter.scale;
			result.isPerspective = Layout.isPerspective( enter );
		} );
		return result;
	}

	// 获取速度
	function Speed( themeNumber ) {
		return {
			1 : [0.8, 0.1, 0.8, 0.1, 0.8, 0.1],
			2 : [0.7, 0.1, 0.7, 0.1, 0.7, 0.1],
			3 : [1.2, 0.3, 1.2, 0.1, 1.2, 0.3],
			4 : [1.4, 0.3, 1.4, 0.1, 1.4, 0.3],
			5 : [0.8, 0.3, 0.8, 0.1, 0.8, 0.1],
			6 : [1.6, 0.6, 1.4, 0.1, 1.6, 0.3],
			7 : [1.6, 0.5, 1.4, 0.3, 1.6, 0.1],
			8 : [1.6, 0.3, 1.6, 0.1, 1.6, 0.3]
		}[themeNumber];
	}

	// 选择主题
	function Theme( workData ) {
		var themeNumber = workData.theme,
			workRandom = random.Random( parseInt( workData.id ) ),
			seedRandom = random.Random( parseInt( workData.id ) ),
			switchAnimations = {
				1 : [sa.classic, sa.flipOver, sa.push],
				2 : [sa.fade, sa.classic, sa.door, sa.overturn, sa["switch"]],
				3 : [sa.classic, sa.push, sa.overturn],
				4 : [sa.classic, sa.uncover, sa.push, sa["switch"], sa.fade],
				5 : [sa.classic, sa.fade, sa.push],
				6 : [sa.classic, sa.fade, sa.push],
				7 : [sa.classic, sa.fade, sa.push],
				8 : [sa.classic, sa.uncover, sa.fade]
			}[themeNumber],
			switchAnimation = workRandom.select( ua.iphone6 ? array.remove( switchAnimations, function ( a ) {
				return a.highPerformance;
			} ) : switchAnimations ),
			lastTextGroups = [], lastImageGroups = [],
			appliedGroup = {};

		array.foreach( workData.pages, function ( pageData, pageIndex ) {
			var typeCount = {
					image : 0,
					text : 0
				},
				noScale = false;

			if ( pageData.label === "custom-2" || pageData.label === "screen" || pageData.name === "screen" ) {
				array.foreach( pageData.image, function ( image ) {
					var imageInfo = image.imageinfo;
					if ( imageInfo ) {
						var type = imageInfo.type;
						if ( type in typeCount ) {
							typeCount[type]++;
						}

						noScale = noScale || !!image.mask || imageInfo.borderWidth > 0 || imageInfo.maskRadius > 0;
					}
				} );

				var allImage = typeCount.text === 0, // 全是图
					pureText = typeCount.image === 0, // 纯文本
					singleImage = typeCount.image === 1, // 只有一张图
					lessImage = pureText || singleImage, // 没有图或只有一张图

					imageGroupList = [], textGroupList = [], allGroupList = [], // 动画组
					imageGroup, textGroup,
					inOrder = null; // 速度

				// 根据主题设置速度和动画组
				({
					// 萌萌哒
					1 : function () {
						if ( lessImage ) {
							imageGroupList = [shake, tada, rubberBand];
							allGroupList = [bounce, flipIn, swing, fall];
						}
						else {
							imageGroupList = [shake, tada, rubberBand];
							allGroupList = [bounce, flipIn, fall]
						}
					},

					// 逗比
					2 : function () {
						var lessImageResult = {
								image : [shake, tada, lightSpeedIn, coin],
								text : [lightSpeedIn, flyIntoX]
							},
							result = lessImage ? lessImageResult : workRandom.select( [
								lessImageResult,
								{
									image : [flyInto],
									text : [lightSpeedIn, creep, wave, coin]
								}
							] );
						imageGroupList = result.image;
						textGroupList = result.text;
					},

					// 小清新
					3 : function () {
						allGroupList = lessImage ? [bounce, flipIn, swing, rotateIn, emerge, flyInto, overturn, roundFromFarAndNear]
							: [bounce, rotateIn, flyInto, emerge];
					},

					// 文艺
					4 : function () {
						allGroupList = lessImage ? [flipIn, rotateIn, emerge, scale, roundFromFarAndNear, flyInto, overturn] :
							[flipIn, rotateIn, emerge, scale, flyInto];
					},

					// 大气
					5 : function () {
						var flyEmerge;

						if ( lessImage ) {
							textGroupList = imageGroupList = [overturn, shrink, scale, roundFromFarAndNear, zoomIn];
						}
						else {
							textGroupList = [circleRound, roundFromFarAndNear, overturn, scale, zoomIn];
							imageGroupList = [overturn, scale, zoomIn];
						}

						// 要不然图有飞入,有不然文字有飞入
						flyEmerge = random.select( [textGroupList, imageGroupList] );
						flyEmerge.push( flyInto, emerge );

						// 第一页必有缩放
						if ( pageIndex === 0 ) {
							pureText ? textGroupList = [shrink] : imageGroupList = [shrink];
						}
					},

					// 历史
					6 : function () {
						allGroupList = lessImage ? [flipIn, rotateIn, emerge, overturn, scale, flyInto, overturn] :
							[rotateIn, emerge, overturn, scale, flyInto, roundFromFarAndNear];

						if ( typeCount.image >= 5 ) {
							inOrder = false;
						}
					},

					// 简约
					7 : function () {
						textGroupList = [overturn];

						if ( lessImage ) {
							allGroupList = [flipIn, rotateIn, emerge, scale, flyInto, roundFromFarAndNear];
						}
						else {
							allGroupList = [rotateIn, emerge, scale, flyInto];
						}
					},

					// 精致
					8 : function () {
						if ( lessImage ) {
							allGroupList = [flipIn, rotateIn, emerge, flyInto, roundFromFarAndNear, overturn];
						}
						else {
							textGroupList = [overturn];
							allGroupList = [rotateIn, emerge, flyInto];
						}
					}
				}[themeNumber])();

				imageGroupList = imageGroupList.concat( allGroupList );
				textGroupList = textGroupList.concat( allGroupList );

				// mask元素不会分配缩放动画
				if ( noScale ) {
					imageGroupList = array.remove( imageGroupList, function ( animationGroup ) {
						return animationGroup.isScale;
					} );
				}

				function selectGroup( groups, lastGroups ) {
					var remindGroups = array.remove( groups, function ( group ) {
							return group === lastGroups[0] || group === lastGroups[1];
						} ),
						selectedGroup = workRandom.select( remindGroups.length === 0 ? groups : remindGroups );

					lastGroups.push( selectedGroup );
					if ( lastGroups.length >= 3 ) {
						lastGroups.shift();
					}
					return selectedGroup;
				}

				// 如果是纯图,这些图不是强调动画
				imageGroup = selectGroup( allImage ? array.filter( imageGroupList, function ( g ) {
					return !g.isEmphasize;
				} ) : imageGroupList, lastImageGroups );

				// 如果图片不是强调的,文字也不是强调的
				textGroup = selectGroup( allImage || !imageGroup.isEmphasize ? array.filter( textGroupList, function ( g ) {
					return !g.isEmphasize;
				} ) : textGroupList, lastTextGroups );

				appliedGroup[pageIndex] = {
					seed : seedRandom(),
					imageGroup : imageGroup,
					textGroup : textGroup,
					inOrder : inOrder,
					speed : Speed( themeNumber )
				};
			}
		} );

		return {
			switchAnimation : switchAnimation,
			themeNumber : themeNumber,
			appliedGroup : appliedGroup
		};
	}

	library["45"].Theme = Theme;
	library["45"].Speed = Speed;
	library["45"].pageAnimations = pageAnimations;
} );

/**
 * Created by 白 on 2015/7/16.
 */

library( function () {
	var css =library["6"],
		object =library["2"],
		async =library["4"];

	// 单选
	function Select( arg ) {
		var curSelected = null;

		return {
			selected : function () {
				return curSelected;
			},
			cancel : function () {
				if ( curSelected ) {
					css( curSelected, arg.unselected );
					curSelected.selected = false;
				}
				curSelected = null;
			},
			Option : function ( element ) {
				var selectEvent = async.Event();
				css( element, arg.unselected );

				return object.insert( element, {
					select : function () {
						if ( curSelected !== element ) {
							if ( curSelected ) {
								css( curSelected, arg.unselected );
								curSelected.selected = false;
							}
							element.selected = true;
							css( curSelected = element, arg.selected );
							selectEvent.trig();
						}
					},
					onSelect : selectEvent.regist
				} );
			}
		};
	}

	function State( el, style, curState ) {
		function cut( state ) {
			css( el, style[state] );
		}

		cut( curState );
		return cut;
	}

	library["46"].Select = Select;
	library["46"].State = State;
} );
/**
 * Created by 白 on 2015/5/12.
 */

library( function () {
	var pointer =library["11"],
		array =library["1"],
		object =library["2"];

	function onDrag( arg ) {
		arg = arg || {};

		function Track() {
			var track = [], direction, speed;

			return {
				track : function ( duration, length ) {
					var curDirection = length === 0 ? direction : length > 0;

					if ( duration > 200 || curDirection !== direction ) {
						track = [];
					}

					track.push( {
						duration : duration,
						length : length
					} );

					var totalDuration = 0, totalLength = 0;
					array.foreach( track, function ( offset ) {
						totalDuration += offset.duration;
						totalLength += offset.length;
					} );

					var exclude;
					while ( totalDuration > 200 ) {
						exclude = track.shift();
						totalDuration -= exclude.duration;
						totalLength -= exclude.length;
					}

					speed = totalDuration === 0 ? 0 : totalLength / totalDuration;

					direction = curDirection;
				},
				speed : function () {
					return speed;
				}
			};
		}

		var trackX = Track(), trackY = Track(),
			last = new Date();

		function update( callback, event ) {
			var now = new Date(),
				duration = now - last;

			last = now;

			trackX.track( duration, event.dX || 0 );
			trackY.track( duration, event.dY || 0 );

			callback && callback( object.insert( event, {
				speedX : trackX.speed(),
				speedY : trackY.speed()
			} ) );
		}

		return pointer.onMoveUp( {
			onMove : function ( event ) {
				update( arg.onMove, event );
			},
			onUp : function ( event ) {
				update( arg.onUp, event );
			}
		} );
	}

	library["47"] = onDrag;
} );
/**
 * Created by 白 on 2015/8/14.
 */

library( function () {
	var Img =library["16"],
		css =library["6"],
		object =library["2"],
		array =library["1"],
		pageAnimation =library["40"],
		animationData =library["45"],
		ui =library["26"],
		$ =library["8"],
		widget =library["46"],
		onDrag =library["47"],
		math =library["31"],
		csa =library["10"],
		env =library["27"];

	function Preview( body, themeData ) {
		window.firstpage = window.firstpage || {};

		var oEditAnimate = $( "div", {
				css : {
					position : "absolute",
					right : "0",
					top : "65px",
					width : "55px",
					height : "55px",
					transition : "0.2s",
					"z-index" : 1000
				},
				children : [$( Img.Icon( "edit-animate" ), {
					css : {
						position : "absolute",
						top : 0,
						right : "10px"
					}
				} )]
			}, document.body ),
			oBackground = $( "div.hidden", {
				css : css.full( {
					background : "#525355"
				} )
			}, document.body ),
			tapHandle = null,
			panel = null,
			panelPageIndex = 0;

		// 显示编辑按钮
		function showEditButton( val ) {
			if ( val ) {
				css.remove( oEditAnimate, "transform" );
				css.remove( oEditAnimate, "pointer-events" );
			}
			else {
				css( oEditAnimate, "pointer-events", "none" );
				css.transform( oEditAnimate, css.translate( 45, 0, 0 ) );
			}
		}

		css( body, {
			"transform-origin" : "50% 0",
			transition : "0.2s"
		} );

		showEditButton( false );

		return function ( page ) {
			if ( tapHandle ) {
				tapHandle.remove();
				$.remove( panel );
				tapHandle = panel = null;
			}

			var enterComponentTable = pageAnimation.analyzePage( page ),
				layout = page.wrapper,
				applyEnter = layout.applyEnter,
				options = {};

			if ( applyEnter && ( enterComponentTable.image.length + enterComponentTable.text.length > 0 ) ) {
				// 动画面板
				panel = $( "div", {
					css : {
						position : "absolute",
						height : "90px",
						left : 0,
						right : 0,
						bottom : 0,
						background : "#000000",
						transition : "0.2s"
					}
				}, document.body );

				var curPanelPage = null,
					panelPages = [],
					selectedAnimation = parseInt( applyEnter.pageAnimation || 0 ),
					select = widget.Select( {
						selected : {
							"border-color" : "#FE2454",
							background : "#FE2454"
						},
						unselected : {
							"border-color" : "#333333",
							background : "transparent"
						}
					} ),
					count = 0,
					redPointWrapper = $( "div", {
						css : {
							position : "absolute",
							height : "4px",
							bottom : 0
						}
					}, panel );

				// 制作动画面板的页
				object.foreach( object.extend( {
					0 : {
						name : "随机配置"
					}
				}, animationData.pageAnimations ), function ( id, data ) {
					var pos = count++ % 8;
					if ( pos === 0 ) {
						var redPoint = $( "div", {
							css : {
								"float" : "left",
								width : "4px",
								height : "4px",
								"border-radius" : "4px",
								"margin-left" : redPointWrapper.childElementCount ? "8px" : 0
							}
						}, redPointWrapper );
						curPanelPage = $( "div", {
							css : {
								position : "absolute",
								left : "14px",
								right : "14px",
								top : 0,
								bottom : 0
							}
						}, panel );
						curPanelPage.selected = widget.State( redPoint, {
							"selected" : {
								background : "#FFFFFF"
							},
							"unselected" : {
								background : "#515151"
							}
						}, "unselected" );
						curPanelPage.pageIndex = panelPages.length;
						panelPages.push( curPanelPage );
					}

					var wrapper = $( "div", {
							css : {
								"float" : "left",
								width : "25%",
								height : "45px",
								position : "relative"
							}
						}, curPanelPage ),
						button = options[id] = select.Option( $( "div", {
							css : object.extend( {
								"font-size" : "11px",
								position : "absolute",
								color : "white",
								height : "20px",
								border : "1px solid",
								top : pos < 4 ? "15px" : "auto",
								bottom : pos < 4 ? "auto" : "14px",
								"line-height" : "20px",
								"border-radius" : "12px",
								"text-align" : "center"
							}, css.center( 58 ) ),
							innerHTML : data.name
						}, wrapper ) );

					button.onSelect( function () {
						page.pageData.pageAnimation = parseInt( id );
					} );

					ui.onTap( wrapper, function () {
						page.fastForward();
						pageAnimation.applyAnimate( page, parseInt( id ) ? data : themeData.appliedGroup[page.index] );
						button.select();
						setTimeout( function () {
							page.prepare();
							page.play();
						}, 0 );
					} );
				} );

				css( redPointWrapper, css.center( redPointWrapper.childElementCount * 12 - 8 ) );

				// 选择页
				function selectPage( targetIndex ) {
					curPanelPage = panelPages[panelPageIndex = targetIndex];
					array.foreach( panelPages, function ( page ) {
						css.remove( page, "transform" );
						if ( page === curPanelPage ) {
							page.selected( "selected" );
							page.classList.remove( "hidden" );
						}
						else {
							page.selected( "unselected" );
							page.classList.add( "hidden" );
						}
					} );
				}

				selectPage( panelPageIndex );

				if ( panelPages.length > 1 ) {
					ui.onSwipeStart( panel, function ( event ) {
						var curX = 0,
							panelWidth = panel.offsetWidth,
							left = panelPages[math.index( panelPageIndex - 1, panelPages.length )],
							right = panelPages[math.index( panelPageIndex + 1, panelPages.length )],
							direction;

						function setX( panel, x ) {
							panel.classList.remove( "hidden" );
							css.transform( panel, css.translate( x, 0, 0 ) );
						}

						if ( event.xOut ) {
							array.foreach( panelPages, function ( page ) {
								page.selected( "unselected" );
							} );

							onDrag( {
								onMove : function ( event ) {
									direction = event.dX > 0;
									curX = math.range( curX + event.dX, -panelWidth, panelWidth );
									right.classList.add( "hidden" );
									left.classList.add( "hidden" );
									curX > 0 ? setX( left, curX - panelWidth ) : setX( right, curX + panelWidth );
									setX( curPanelPage, curX )
								},
								onUp : function ( event ) {
									var ratio = curX / panelWidth + ( Math.abs( event.speedX ) > 0.2 ? math.sign( event.speedX ) * 0.5 : direction ? 0.35 : -0.35 ),
										sign = ratio > 0.5 ? 1 : ratio < -0.5 ? -1 : 0,
										lock = ui.Lock();

									function Animation( el, i ) {
										return [el, {
											100 : {
												transform : css.translate( ( sign + i ) * panelWidth, 0, 0 )
											}
										}, "ease-in-out", 0.2];
									}

									csa.runAnimation( [
										Animation( curPanelPage, 0 ),
										curX > 0 ? Animation( left, -1 ) : Animation( right, 1 )
									], function () {
										lock.remove();
										selectPage( math.index( panelPageIndex - sign, panelPages.length ) );
									} );
								}
							} );
						}
					} );
				}

				// 结束编辑
				function closeEdit() {
					page.fastForward();
					body.classList.remove( "lock" );
					css.remove( body, "transform" );
					showPanel( false );
					showEditButton( true );
				}

				firstpage.completeAnimationEdit = function () {
					firstpage.selectAnimation( page.pid, selectedAnimation = page.pageData.pageAnimation );
					closeEdit();
				};

				firstpage.cancelAnimationEdit = function () {
					page.pageData.pageAnimation = selectedAnimation;
					closeEdit();
				};

				// 显示编辑面板
				function showPanel( val ) {
					oBackground.classList.remove( "hidden" );
					val ? css.remove( panel, "transform" ) : css.transform( panel, "translate3d(0,100%,0)" );
				}

				showPanel( false );
				showEditButton( true );
				tapHandle = ui.onTap( oEditAnimate, function () {
					var lock = ui.Lock();
					env.useClient( ["startAnimationEdit", "selectAnimation"], function () {
						lock.remove();
						page.fastForward();
						body.classList.add( "lock" );
						css.transform( body, css.scale( 1 - 90 / body.offsetHeight ) );
						showEditButton( false );
						showPanel( true );
						firstpage.startAnimationEdit();
						options[selectedAnimation].select();
					} );
				} );
			}
			else {
				showEditButton( false );
			}
		};
	}

	library["48"] = Preview;
} );
/**
 * Created by 白 on 2015/6/15.
 */

library( function () {
	var array =library["1"],
		map = {};

	array.foreach( document.cookie.split( ";" ), function ( searchPair ) {
		var keyValue = searchPair.split( "=" );
		map[keyValue[0].trim( " " )] = keyValue[1];
	} );

	library["49"].get = function ( key ) {
		return map[key];
	};
} );
/**
 * Created by 白 on 2015/7/29.
 * 初页社交系统
 */

library( function () {
	var social = {},
		ua =library["14"],
		cookie =library["49"],
		URL =library["9"],
		ajax =library["13"],
		object =library["2"],
		token = URL( location.href ).arg.token || cookie.get( "_token" ),
		ui =library["26"],

		isLogin = !!token,
		userInfo = null,
		onValidate = null;

	function request( path, data, callback, isGet, noToken ) {
		data = data || {};
		var xhr = ajax( {
			url : URL.concatArg( "http://social.cloud7.com.cn/" + path, isGet ? data : {} ),
			data : isGet ? null : JSON.stringify( data ),
			method : isGet ? "get" : "post",
			headers : object.extend( {
				Accept : "application/json"
			}, isGet ? {} : {
				"Content-Type" : "application/json"
			}, token && !noToken ? {
				Authorization : "_token " + token
			} : {} )
		}, function ( err ) {
			if ( err ) {
				callback && callback( err );
			}
			else {
				try {
					var data = JSON.parse( xhr.responseText );
				}
				catch ( e ) {
					callback && callback( e );
					return;
				}

				if ( data.code === 200 ) {
					callback && callback( null, data.data );
				}
				else {
					callback && callback( data );
				}
			}
		} );
	}

	social.getIndex = function ( workId, callback ) {
		request( "api/Total/Index", {
			relateId : workId
		}, function ( err, result ) {
			if ( err && err.code === 401 ) {
				isLogin = false;
				onValidate && onValidate();
				request( "api/Total/Index", {
					relateId : workId
				}, callback, true, true );
			}
			else {
				isLogin = !!token;
				onValidate && onValidate();
				sessionStorage.setItem( "social", "true" );
				callback( err, result );
			}
		}, true );
	};

	social.getUserInfo = function ( callback ) {
		if ( userInfo ) {
			callback( null, userInfo );
		}
		else {
			request( "api/User/Summary", null, function ( err, data ) {
				if ( err ) {
					callback( err );
				}
				else {
					callback( null, userInfo = data );
				}
			}, true );
		}
	};

	if ( ua.MicroMessenger ) {
		social.isLogIn = function () {
			return sessionStorage.getItem( "social" ) || !!isLogin;
		};
		social.logIn = function ( arg ) {
			function login() {
				if ( isLogin ) {
					arg.onLogIn();
				}
				else {
					sessionStorage.setItem( "social", "true" );
					location.href = "http://passport.cloud7.com.cn/wechat/oauth";
				}
			}

			isLogin === undefined ? onValidate = login : login();
		};
	}
	else {
		social.canNotLogin = function () {
			ui.alert( "请在微信中使用" );
		};

		social.isLogIn = function () {
			return false;
		};
	}

	library["50"] = object.extend( social, {
		request : request
	} )
} );
/**
 * Created by 白 on 2015/7/30.
 */

library( function () {
	var social =library["50"],
		array =library["1"],
		$ =library["8"],
		css =library["6"],
		img =library["16"],
		ui =library["26"],
		tips =library["29"],
		string =library["5"],
		async =library["4"],
		object =library["2"];

	css.insertRules( {
		".placeholder-8e9193::-webkit-input-placeholder" : {
			color : "#8e9193"
		}
	} );

	library["51"] = function ( page, workId ) {
		var inBlur = false,
			me = null,
			replyTo = null,
			loading = $( tips.Loading(), page ),
			oListContent = $( "div.scroll.hidden", {
				css : {
					position : "absolute",
					top : "54px",
					left : 0,
					right : 0,
					bottom : "54px"
				}
			}, page ),
			footBar = $( "div.hidden", {
				css : {
					position : "absolute",
					"border-top" : "1px solid #606060",
					left : 0,
					right : 0,
					bottom : "0",
					background : "black"
				}
			}, page ),
			lastCommentId = null,
			oLoadingMore = false,
			loadingMore = false,
			oSend = $( "div", {
				css : {
					position : "absolute",
					border : "1px #fe2454 solid",
					background : "rgba(254,36,84,0.25)",
					width : "51px",
					height : "26px",
					right : "10px",
					top : "50%",
					"margin-top" : "-13px",
					"border-radius" : "13px",
					"line-height" : "26px",
					"font-size" : "13px",
					"text-align" : "center",
					color : "white",
					cursor : "pointer"
				},
				innerHTML : "发送",
				children : [$( "div", {
					css : {
						position : "absolute",
						left : "-15px",
						right : "-10px",
						top : "-13px",
						bottom : "-13px"
					}
				} )]
			}, footBar ),
			textBoxForm = $( "form", {
				css : {
					margin : "20px 71px 20px 55px"
				}
			}, footBar ),
			textBox = $( "textarea.placeholder-8e9193", {
				css : {
					display : "block",
					height : "14px",
					"line-height" : "14px",
					"font-size" : "14px",
					width : "100%",
					background : "transparent",
					color : "white",
					resize : "none"
				},
				placeholder : "说点什么..."
			}, textBoxForm );

		$( page, {
			css : {
				background : "rgba(0,0,0,0.88)"
			},
			classList : "need-default"
		} );


		$( img.Icon( "comment/close" ), {
			css : {
				position : "absolute",
				right : "15px",
				top : "15px"
			}
		}, page );

		ui.onTap( $( "div", {
			css : {
				position : "absolute",
				right : 0,
				top : 0,
				width : "50px",
				height : "50px"
			}
		}, page ), function () {
			page.slideOut();
		} );

		function Avatar( url ) {
			return $( "div", {
				css : {
					position : "absolute",
					width : "30px",
					height : "30px",
					background : css.url( url ),
					"background-size" : "cover",
					"background-position" : "50% 50%",
					"border-radius" : "15px"
				}
			} );
		}

		// 在评论列表里添加一个评论
		function addOComment( comment, inFirst ) {
			var user = comment.User,
				replyUser = comment.ReplyUser,
				wrapper = $( "div", {
					css : {
						position : "relative"
					}
				} ),
				rightBar = $( "div", {
					css : {
						position : "relative",
						"margin-left" : "55px",
						"margin-right" : "15px",
						"border-top" : oListContent.firstElementChild === wrapper ? "1px solid #606060" : "none",
						"border-bottom" : "1px solid #606060"
					},
					children : [$( "div", {
						css : {
							position : "absolute",
							right : "-15px",
							top : 0,
							bottom : 0,
							width : "15px"
						}
					} )]
				}, wrapper ),
				oReply = replyUser ? ["回复", $( "span", {
					innerHTML : replyUser.Nickname,
					css : {
						"margin-left" : "5px",
						color : "#8e9193"
					}
				} ).outerHTML, "："].join( "" ) : "",
				createAt = new Date( comment.CreateAt ),
				now = new Date(),
				diff = ( now - createAt ) / 1000 / 60 << 0,
				dateString = "",
				timeString = "";

			// 头像
			$( Avatar( user.HeadPhoto ), {
				css : {
					top : "6px",
					left : "15px"
				}
			}, wrapper );

			// 回复图标
			$( img.Icon( "comment/reply" ), {
				css : {
					position : "absolute",
					top : "12px",
					right : "20px",
					"pointer-events" : "none"
				}
			}, wrapper );

			$( "div", {
				innerHTML : user.Nickname,
				css : {
					"padding-top" : "8px",
					"font-size" : "14px",
					"line-height" : "14px",
					color : "#8e9193"
				}
			}, rightBar );

			// 一分钟内
			if ( diff < 1 ) {
				timeString = "刚刚";
			}
			else if ( diff < 60 ) {
				timeString = diff + "分钟前";
			}
			else {
				function patch( i ) {
					return i < 10 ? "0" + i : i;
				}

				timeString = string.format( "%h%:%m%", {
					h : createAt.getHours(),
					m : patch( createAt.getMinutes() )
				} );

				if ( createAt.getYear() === now.getYear() && createAt.getMonth() === now.getMonth() && createAt.getDate() === now.getDate() ) {
					dateString = "今天";
				}
				else {
					dateString = string.format( "%y%/%m%/%d%", {
						y : createAt.getFullYear(),
						m : patch( createAt.getMonth() + 1 ),
						d : patch( createAt.getDate() )
					} );
				}
			}

			$( "div", {
				innerHTML : [dateString, timeString].join( " " ),
				css : {
					"margin-top" : "6px",
					"font-size" : "10px",
					"line-height" : "10px",
					color : "#8e9193"
				}
			}, rightBar );

			$( "div", {
				innerHTML : oReply + comment.Content,
				css : {
					"margin" : "8px 0",
					"font-size" : "14px",
					"line-height" : "20px",
					color : "white"
				}
			}, rightBar );

			oListContent.insertBefore( wrapper, inFirst ? oListContent.firstElementChild : null );

			lastCommentId = comment.Id;

			// 点击回复
			ui.onTap( rightBar, function () {
				if ( !inBlur && me.Id !== user.Id ) {
					replyTo = user.Id;
					textBox.placeholder = "回复 " + user.Nickname + "：";
					textBox.focus();
				}
			} );
		}

		// 加载评论
		function loadComment( callback ) {
			social.request( "api/Comment/Index", object.extend( {
				relateId : workId
			}, oLoadingMore ? {
				lastId : lastCommentId
			} : {} ), function ( err, commentList ) {
				$.remove( oLoadingMore );
				array.foreach( commentList, function ( comment ) {
					addOComment( comment );
				} );
				oLoadingMore = commentList.length === 15 ? $( "div", {
					css : {
						margin : "15px 0",
						"text-align" : "center",
						height : "9px"
					},
					children : [
						$( tips.LoadingChrysanthemum(), {
							css : {
								width : "9px",
								height : "9px"
							}
						} ),
						$( "div", {
							css : {
								display : "inline-block",
								"vertical-align" : "top",
								"font-size" : "9px",
								"line-height" : "9px",
								"margin-left" : "5px",
								color : "#8e9193"
							},
							innerHTML : "加载中..."
						} )
					]
				}, oListContent ) : null;
				callback && callback();
			}, true );
		}

		// 发表评论
		function addComment() {
			if ( oSend.classList.contains( "hidden" ) ) {
				return;
			}

			if ( textBox.value !== "" ) {
				var loading = $( "div", {
					css : {
						position : "absolute",
						border : "1px solid",
						width : "51px",
						height : "26px",
						right : "10px",
						top : "50%",
						"margin-top" : "-13px"
					},
					children : [tips.LoadingButton()]
				}, footBar );
				oSend.classList.add( "hidden" );

				social.request( "api/Comment/Add", object.extend( {
					RelateId : workId,
					Type : 0,
					Content : textBox.value
				}, replyTo ? {
					ReplyUserId : replyTo
				} : {} ), function ( err, data ) {
					if ( err == null ) {
						addOComment( data, true );
						textBox.value = "";
						textBox.blur();
						adjustTextBox();
						oListContent.scrollTop = 0;

						var oOutCommentNumber = page.parentNode ? page.parentNode.querySelector( ".comment" ) : null;
						if ( oOutCommentNumber ) {
							oOutCommentNumber.innerHTML = parseInt( oOutCommentNumber.innerHTML ) + 1;
						}
					}
					else {
						ui.alert( "出错了,请重试" );
					}
					oSend.classList.remove( "hidden" );
					$.remove( loading );
				} );
			}
		}

		// 调整输入框的尺寸
		function adjustTextBox() {
			css( textBox, "height", "14px" );
			css( textBox, "height", css.px( textBox.scrollHeight ) );
		}

		// 点击列表失去焦点
		ui.onPointerDown( oListContent, function () {
			if ( document.body.classList.contains( "focus" ) ) {
				inBlur = true;
				textBox.blur();
			}
		} );
		ui.onPointerUp( page, function () {
			inBlur = false;
		} );

		// 失去焦点时取消回复
		$.bind( textBox, "blur", function () {
			replyTo = null;
			textBox.placeholder = "说点什么...";
		} );

		// 输入时调整文本框
		$.bind( textBox, "input", adjustTextBox );

		// 点击发送时不失去焦点
		ui.onPointerDown( oSend, function ( event ) {
			event.preventDefault();
		} );

		// 发表评论
		ui.onTap( oSend, addComment );
		$.bind( textBoxForm, "submit", function ( event ) {
			event.preventDefault();
			addComment();
		} );

		// 滚动加载
		$.bind( oListContent, "scroll", function () {
			if ( !loadingMore && oLoadingMore && oListContent.scrollHeight - oListContent.scrollTop - oListContent.clientHeight < 39 ) {
				loadingMore = true;
				loadComment( function () {
					loadingMore = false;
				} );
			}
		} );

		async.concurrency( [
			loadComment,
			function ( callback ) {
				social.getUserInfo( function ( err, data ) {
					me = data.User;
					$( Avatar( me.HeadPhoto ), {
						css : {
							left : "15px",
							top : "50%",
							"margin-top" : "-15px"
						}
					}, footBar );
					callback();
				}, true );
			}
		], function () {
			$.remove( loading );
			oListContent.classList.remove( "hidden" );
			footBar.classList.remove( "hidden" );
		} );
	};
} );
/**
 * Created by 白 on 2015/6/4.
 * 二维向量
 */

library( function () {
	// 垂直向量
	function vertical( vector ) {
		var x1 = vector[0], y1 = vector[1],
			y2 = x1 === 0 ? 0 : Math.sqrt( 1 / ( 1 + y1 * y1 / x1 * x1 ) ),
			x2 = x1 === 0 ? x1 > 0 ? 1 : -1 : -y1 * y2 / x1;

		return [x2, y2];
	}

	function cross( v1, v2 ) {
		return ( v1[0] * v2[1] - v2[0] * v1[1] ) > 0 ? 1 : -1;
	}

	// 求向量的模
	function norm( vector ) {
		var x = vector[0], y = vector[1];
		return Math.sqrt( x * x + y * y );
	}

	// 计算两个线段的锐旋转角
	function rotation( v1, v2 ) {
		// 计算和y轴夹角
		function yAngle( v ) {
			return 180 - ( Math.atan2( v[0], v[1] ) / Math.PI * 180 + 180 ) % 180
		}

		var angle = ( yAngle( v2 ) - yAngle( v1 ) + 180 ) % 180;
		return angle >= 90 ? angle - 180 : angle;
	}

	// 点乘
	function dot( v1, v2 ) {
		return v1[0] * v2[0] + v1[1] * v2[1];
	}

	// 夹角
	function includedAngle( v1, v2 ) {
		return Math.acos( dot( v1, v2 ) / ( norm( v1 ) * norm( v2 ) ) );
	}

	library["52"].vertical = vertical;
	library["52"].cross = cross;
	library["52"].norm = norm;
	library["52"].rotation = rotation;
	library["52"].dot = dot;
	library["52"].includedAngle = includedAngle;
} );
/**
 * Created by 白 on 2015/6/4.
 * 球
 */

library( function () {
	function lat( p ) {
		return Math.acos( p[1] ) - Math.PI / 2;
	}

	function lng( p ) {
		return p[2] >= 0 ? Math.atan( p[0] / p[2] ) : Math.atan( p[0] / p[2] ) + Math.PI;
	}

	library["53"].lat = lat;
	library["53"].lng = lng;
} );
/**
 * Created by 白 on 2015/7/30.
 */

library( function () {
	var social =library["50"],
		array =library["1"],
		ajax =library["13"],
		$ =library["8"],
		css =library["6"],
		img =library["16"],
		ui =library["26"],
		tips =library["29"],
		string =library["5"],
		async =library["4"],
		object =library["2"],
		z3d =library["18"],
		m3d = z3d.matrix,
		Vector =library["52"],
		Sphere =library["53"],
		onDrag =library["47"],
		localResource =library["15"],
		animation =library["32"],
		ua =library["14"];

	library["54"] = function ( page, workId ) {
		var loading = $( tips.Loading(), page ),
			maxNumber = ua.iphone6 ? 30 : ua.iphone5 ? 25 : 20,
			size = document.documentElement.clientWidth >= 360 ? 36 : 30,
			fragmentBottom = 136,
			matrix = m3d.eye(),
			r = Math.min( document.documentElement.clientHeight - 136 - 80, document.documentElement.clientWidth - 60 ) / 2,
			isLike = false,
			likeNumber = 0,

			sphereData = JSON.parse( localResource( "sphere" ) || "null" ),
			tasks = [],
			likeList = null,
			background = $( "div", {
				css : object.extend( css.full(), {
					background : "rgba(0,0,0,0.88)"
				} )
			}, page ),
			topBar = $( "div", {
				css : {
					position : "absolute",
					left : 0,
					top : 0,
					right : 0,
					bottom : css.px( fragmentBottom )
				}
			}, page ),
			bottomBar = $( "div.hidden", {
				css : {
					position : "absolute",
					left : 0,
					height : css.px( fragmentBottom ),
					right : 0,
					bottom : 0
				}
			}, background ),
			fragmentWrapper = $( "div", {
				css : {
					perspective : "800px",
					"transform-style" : "preserve-3d",
					position : "absolute",
					left : "50%",
					top : "50%"
				}
			}, topBar ),
			likeIcon = img.Icon( "comment/like" ),
			likeButton = $( "div", {
				css : {
					position : "relative",
					display : "inline-block",
					height : "44px",
					width : "44px",
					"border-radius" : "22px",
					background : "white"
				}
			}, $( "div", {
				css : {
					position : "relative",
					"text-align" : "center"
				}
			}, bottomBar ) ),
			oLike = $( likeIcon, {
				css : object.extend( css.center( likeIcon.w ), css.middle( likeIcon.h ) )
			}, likeButton ),
			oLiking = $( img.Icon( "comment/liking" ), {
				css : object.extend( css.center( likeIcon.w ), css.middle( likeIcon.h ) )
			}, likeButton ),
			oLikeNumber = $( "div", {
				css : {
					"margin-top" : "10px",
					"font-size" : "14px",
					"text-align" : "center",
					"color" : "white"
				}
			}, bottomBar ),

			direction = [1, 0], speed = 0.3, inDrag = false;

		function setOutNumber( number ) {
			var o = page.parentNode ? page.parentNode.querySelector( ".like" ) : null;
			if ( o ) {
				o.innerHTML = number;
			}
			return number;
		}

		// 关闭按钮
		$( img.Icon( "comment/close" ), {
			css : {
				position : "absolute",
				right : "15px",
				top : "15px"
			}
		}, page );
		ui.onTap( $( "div", {
			css : {
				position : "absolute",
				right : 0,
				top : 0,
				width : "50px",
				height : "50px"
			}
		}, page ), function () {
			page.slideOut();
		} );

		// 获取球数据
		if ( sphereData == null ) {
			tasks.push( function ( callback ) {
				var xhr = ajax( {
					url : window.contentPath + "sphere.json"
				}, function () {
					sphereData = JSON.parse( xhr.responseText );
					localResource( "sphere", function () {
						return JSON.stringify( sphereData );
					} );
					callback();
				} );
			} );
		}

		// 获取赞数据
		tasks.push( function ( callback ) {
			social.request( "api/Comment/Like", {
				relateId : workId,
				take : maxNumber
			}, function ( err, result ) {
				likeList = result;
				callback();
			}, true );
		} );

		// 获取我的点赞数据
		tasks.push( function ( callback ) {
			social.request( "api/Total/Index", {
				relateId : workId,
				like : true
			}, function ( err, result ) {
				likeNumber = result.Like;
				isLike = result.IsLike;
				callback();
			}, true );
		} );

		async.concurrency( tasks, function () {
			var fragments = [];

			$.remove( loading );
			bottomBar.classList.remove( "hidden" );

			oLikeNumber.innerHTML = setOutNumber( likeNumber ) + ( isLike ? "已赞" : "赞" );

			if ( isLike ) {
				oLike.classList.add( "hidden" );
			}
			else {
				oLiking.classList.add( "hidden" );
			}

			function Fragment( likeItem, inFirst ) {
				var fragment = $( "div", {
						css : {
							position : "absolute",
							background : css.url( likeItem.User.HeadPhoto ),
							width : css.px( size ),
							height : css.px( size ),
							top : "-15px",
							left : "-15px",
							"background-size" : "cover"
						}
					}, fragmentWrapper ),
					tips = fragment.tips = $( "div", {
						css : {
							position : "absolute",
							display : "inline-block",
							background : "rgba(255,255,255,0.85)",
							height : "26px",
							padding : "0 10px",
							"line-height" : "26px",
							"font-size" : "12px",
							"border-radius" : "2px",
							"transform-origin" : "50% 31px",
							top : "-35px"
						},
						children : [
							$( "div", {
								css : {
									"max-width" : "150px",
									overflow : "hidden",
									"white-space" : "nowrap",
									"text-overflow" : "ellipsis"
								},
								innerHTML : likeItem.User.Nickname
							} ),
							$( "div", {
								css : {
									position : "absolute",
									top : "100%",
									left : "50%",
									"margin-left" : "-3px",
									"border-top" : "rgba(255, 255, 255, 0.85) 5px solid",
									"border-left" : "transparent 3px solid",
									"border-right" : "transparent 3px solid"
								}
							} )
						]
					}, fragment );

				tips.show = function ( ratio ) {
					css.transform( tips, css.scale( Math.max( 0.001, ratio ) ) );
				};

				tips.show( 0 );

				$.onInsert( tips, function () {
					css( tips, "left", css.px( ( fragment.offsetWidth - tips.offsetWidth ) / 2 << 0 ) );
				} );

				inFirst ? fragments.unshift( fragment ) : fragments.push( fragment );
				return fragment;
			}

			array.foreach( likeList, function ( likeData ) {
				Fragment( likeData );
			} );

			function setPosition() {
				array.foreach( fragments, function ( fragment, i ) {
					var data = sphereData[Math.max( fragments.length, 4 )];
					fragment.position = [data[i * 3], data[i * 3 + 1], data[i * 3 + 2], 1];
				} );
			}

			function setStyle() {
				array.foreach( fragments, function ( fragment ) {
					var tips = fragment.tips,
						p = z3d.transform( matrix, fragment.position );

					function tipsAnimation( enlarge ) {
						if ( tips.animation ) {
							tips.animation.remove();
						}
						tips.animation = animation.requestFrames( {
							duration : 0.3,
							onAnimate : function ( ratio ) {
								tips.show( enlarge ? ratio : 1 - ratio );
							},
							onEnd : function () {
								tips.animation = null;
							}
						} );
						fragment.isIn = enlarge;
					}

					if ( !inDrag ) {
						if ( !fragment.isIn && p[2] > 0.77 ) {
							tipsAnimation( true );
						}
						else if ( fragment.isIn && p[2] < 0.77 ) {
							tipsAnimation( false );
						}
					}

					css.transform( fragment, css.translate( p[0] * r, p[1] * r, p[2] * r ),
						css.rotateY( Sphere.lng( p ) / Math.PI * 180 ),
						css.rotateX( Sphere.lat( p ) / Math.PI * 180 ) );
				} );
			}

			ui.onPointerDown( topBar, function () {
				if ( !inDrag ) {
					inDrag = true;
					array.foreach( fragments, function ( fragment ) {
						var tips = fragment.tips;

						if ( tips.animation ) {
							tips.animation.remove();
						}
						tips.animation = null;
						fragment.isIn = false;
						tips.show( 0 );
					} );

					onDrag( {
						onMove : function ( event ) {
							var move = direction = [event.dX, event.dY],
								vertical = Vector.vertical( move );

							matrix = z3d.combine( m3d.rotate( [vertical[0], vertical[1], 0], Vector.cross( move, vertical ) * Vector.norm( move ) / 75 ), matrix );
							setStyle();
						},
						onUp : function ( event ) {
							speed = Vector.norm( [event.speedX, event.speedY] ) * 2;
							inDrag = false;
						}
					} );
				}
			} );

			var animationHandle = animation.requestFrame( function () {
				if ( !inDrag ) {
					speed += ( 0.5 - speed ) / 30;
					var vertical = Vector.vertical( direction );
					matrix = z3d.combine( m3d.rotate( [vertical[0], vertical[1], 0], Vector.cross( direction, vertical ) * speed / 75 ), matrix );
					setStyle();
				}
			} );

			ui.onTap( likeButton, function () {
				if ( !inDrag && !isLike ) {
					var loading = $( tips.LoadingButton(), likeButton.parentNode );
					likeButton.classList.add( "hidden" );

					social.request( "api/Comment/Add", {
						RelateId : workId,
						Type : 1
					}, function ( err, data ) {
						if ( err == null ) {
							inDrag = isLike = true;

							// 碎片添加动画
							$( Fragment( data, true ), {
								css : {
									transform : "scale(0.01)"
								}
							} );
							array.foreach( fragments, function ( fragment ) {
								css( fragment, "transition", "0.3s" );
							} );
							setTimeout( function () {
								matrix = m3d.eye();
								setPosition();
								setStyle();

								setTimeout( function () {
									array.foreach( fragments, function ( fragment ) {
										css.remove( fragment, "transition" );
										inDrag = false;
									} );
								}, 350 );
							}, 20 );

							// 更新点赞数量
							oLikeNumber.innerHTML = setOutNumber( likeNumber + 1 ) + "已赞";

							// 移除加载,更新按钮状态
							$.remove( loading );
							likeButton.classList.remove( "hidden" );
							oLike.classList.add( "hidden" );
							oLiking.classList.remove( "hidden" );
						}
						else {
							ui.alert( "出错了,请重试" );
						}
					} );
				}
			} );

			setPosition();
			setStyle();

			page.onSlideOut && page.onSlideOut( function () {
				animationHandle.remove();
			} );
		} );
	};
} );
/**
 * Created by 白 on 2015/8/31.Edit by kahn1990 on 2015/11/16
 */

library( function () {
	var $ =library["8"],
		object =library["2"],
		array =library["1"],
		css =library["6"],
		Img =library["16"],
		ui =library["26"],
		env =library["27"],
		social =library["50"],
		makeCommentPage =library["51"],
		makeLikePage =library["54"],
		commentPage = env.registLoginPage( "comment", social, makeCommentPage ),
		likePage = env.registLoginPage( "like", social, makeLikePage );

	library["55"] = function ( workBody ) {
		var toolbar = $( "div", {
				css : {
					position : "absolute",
					height : 0,
					bottom : 0,
					right : 0,
					width : 0,
					"z-index" : "100"
				}
			}, workBody ), // 评论条
			workData = workBody.workData,
			workId = workBody.workId,
			oComment = ToolbarIcon( Img.Icon( "comment" ), 3 ), // 评论
			oLike = ToolbarIcon( Img.Icon( "like" ), 2 ), // 赞
			oMore = ToolbarIcon( Img.Icon( "more" ), 1 ); // 更多

		// 工具条图标
		function ToolbarIcon( contentIcon, i ) {
			var icon;
			return icon = object.insert( $( "div", {
				css : {
					position : "absolute",
					display:"none",
					height : "32px",
					width : "32px",
					top : 0,
					right : "15px",
					transition : "0.25s ease-in-out",
					background : "rgba(0,0,0,0.88)",
					"border-radius" : "16px"
				},
				children : [
					$( "div", {
						css : {
							position : "absolute",
							left : "-14px",
							top : "-8px",
							right : "-14px",
							bottom : "-7px"
						}
					} ),
					$( contentIcon, {
						css : {
							position : "absolute",
							left : "50%",
							top : "50%",
							transform : "translate3d(-50%,-50%,0)"
						}
					} )
				]
			}, toolbar ), {
				show : function ( val ) {
					css.transform( icon, css.translate( 0, val ? -( ( 15 + 32 ) * i - 5 ) : 0, 0 ) );
				}
			} );
		}

		// 显示工具条
		function show( val ) {
			array.foreach( [oComment, oLike, oMore], function ( o ) {
				o.show( val );
			} );
			toolbar.showed = val;
		}

		// 评论
		ui.onTap( oComment, function () {
			commentPage( {
				data : workId,
				parent : workBody,
				force : true
			} );
		} );

		// 赞
		ui.onTap( oLike, function () {
			likePage( {
				data : workId,
				parent : workBody,
				force : true
			} );
		} );

		// 更多
		ui.onTap( oMore, function () {
			var background = $( "div", {
					css : css.full( {
						transition : "0.2s",
						background : "rgba(0,0,0,0.88)",
						"z-index" : 10
					} )
				}, document.body ),
				bottomBar = $( "div", {
					css : {
						transition : "0.2s",
						position : "absolute",
						bottom : 0,
						left : 0,
						right : 0,
						"z-index" : 11
					}
				}, document.body ),
				toolSection = Section(),
				cancelSection = Section();

			function Section() {
				return $( "div", {
					css : {
						margin : "0 7px 6px 7px",
						"font-size" : "18px",
						"color" : "#0172fe",
						background : "rgba(255,255,255,0.94)",
						"border-radius" : "4px"
					}
				}, bottomBar );
			}

			function Button( text, parent, color ) {
				return $( "div", {
					css : {
						"line-height" : "44px",
						color : color ? color : "inherit",
						"text-align" : "center",
						"border-top" : parent.firstElementChild ? "1px solid black" : "none"
					},
					innerHTML : text
				}, parent );
			}

			function show( val ) {
				if ( val ) {
					css( background, "opacity", 1 );
					css( bottomBar, "transform", "translate3d(0,0,0)" );
				}
				else {
					css( background, "opacity", 0 );
					css( bottomBar, "transform", "translate3d(0,100%,0)" );
				}
			}

			function cancel() {
				var lock = ui.Lock();
				show( false );
				setTimeout( function () {
					$.remove( background );
					$.remove( bottomBar );
					lock.remove();
				}, 250 );
			}

			ui.onTap( Button( "关注作者", toolSection ), function () {
				env.follow( workData.uid );
			} );
			ui.onTap( Button( "在初页APP中打开", toolSection ), function () {
				env.openInClient( workId, workData.uid );
			} );
			ui.onTap( Button( "举报", toolSection, "#fe2454" ), function () {
				env.report( workId );
			} );

			ui.onTap( Button( "取消", cancelSection ), cancel );
			ui.onTap( background, cancel );

			show( false );

			setTimeout( function () {
				show( true );
			}, 20 );
		} );

		return object.insert( toolbar, {
			show : show,
			prepare : function () {
				social.getIndex( workId, function ( err, result ) {
					if ( err == null ) {
						function ToolNumber( number, parent, className ) {
							return $( "div", {
								classList : className,
								css : {
									display : "inline-block",
									position : "absolute",
									top : 0,
									left : "50%",
									height : "11px",
									"line-height" : "11px",
									"font-size" : "9px",
									"min-width" : "11px",
									transform : "translate3d(-50%,0,0)",
									"border-radius" : "6px",
									background : "#fe2e54",
									color : "white",
									padding : "0 2px",
									"text-align" : "center"
								},
								innerHTML : number
							}, $( "div", {
								css : {
									position : "absolute",
									top : 0,
									right : 0,
									width : 0,
									"border-radius" : "6px"
								}
							}, parent ) );
						}

						ToolNumber( result.Text, oComment, "comment" );
						ToolNumber( result.Like, oLike, "like" );
					}
				} );

				setTimeout( function () {
					show( true );
				}, 20 );
			}
		} );
	};
} );
/**
 * Created by Zuobai on 2014/11/22.
 */

library( function () {
	// 字符串流
	function StringStream( str ) {
		var i = 0, len = str.length;
		return {
			eat : function () {
				++i;
			},
			unEat : function () {
				--i;
			},
			cur : function () {
				return str.charAt( i );
			},
			isEnd : function () {
				return i >= len;
			}
		}
	}

	// 将Reader接口封装为流接口
	function ReaderStream( reader ) {
		var current = reader.read();
		return {
			eat : function () {
				return current = reader.read();
			},
			cur : function () {
				return current;
			},
			isEnd : function () {
				return current === null;
			}
		};
	}

	library["56"].StringStream = StringStream;
	library["56"].ReaderStream = ReaderStream;
} );
/**
 * Created by 白 on 2015/8/25.
 */

library( function () {
	var Stream =library["56"],
		StringStream = Stream.StringStream,
		array =library["1"];

	library["57"] = function ( text ) {
		var timeLine = [];

		// 解析歌词文件
		array.foreach( text.split( "\n" ), function ( line ) {
			if ( line !== "" ) {
				line = line.replace( "\r", "" );
				var stream = StringStream( line );
				var times = [], minutes, seconds;

				// 读到某字符为止
				function readUntil( ch ) {
					var word = "", cur;
					while ( ( cur = stream.cur() ) !== ch ) {
						word += cur;
						stream.eat();
					}
					return word;
				}

				while ( stream.cur() === "[" ) {
					stream.eat();
					if ( !isNaN( parseInt( stream.cur(), 10 ) ) ) {
						minutes = parseInt( readUntil( ":" ), 10 );
						stream.eat(); // 吃掉冒号
						seconds = parseFloat( readUntil( "]" ) );
						stream.eat(); // 吃掉右方括号
						times.push( minutes * 60000 + seconds * 1000 );
					}
					else {
						stream.unEat();
						break;
					}
				}

				// 当有时刻时,继续解析该行,否则放弃该行
				if ( times.length !== 0 ) {
					var lyric = readUntil( "" ); // 读歌词

					// 添加到时间轴
					array.foreach( times, function ( time ) {
						timeLine.push( {
							start : time,
							lyric : lyric,
							pos : timeLine.length
						} );
					} );
				}
			}
		} );

		timeLine.sort( function ( a, b ) {
			return a.start < b.start ? -1 : a.start > b.start ? 1 :
				a.pos < b.pos ? -1 : 1;
		} );

		if ( timeLine[0].start !== 0 ) {
			timeLine.unshift( {
				start : 0,
				lyric : " "
			} );
		}

		return timeLine;
	};
} );
/**
 * author:	胡剑青 huhuh1234567@126.com
 * date:	2014.12
 */

library(function(){

	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var code = [];
	for(var index=0; index<alphabet.length; index++){
		code[alphabet.charCodeAt(index)] = index;
	}

	function decode(str){
		str = str.replace( /[^A-Za-z0-9\+\/\=]/g, "" );
		var stringLength = str.length;
		while(str.charAt(stringLength-1)==="="){
			stringLength--;
		}
		var result = new Uint8Array((stringLength/4*3)<<0);
		for(var stringOffset = 0, byteOffset = 0; stringOffset<stringLength; stringOffset += 4, byteOffset += 3){
			stringOffset+1<stringLength&&(result[byteOffset+0] = ((code[str.charCodeAt(stringOffset+0)]&0x3F)<<2)|((code[str.charCodeAt(stringOffset+1)]&0x30)>>4));
			stringOffset+2<stringLength&&(result[byteOffset+1] = ((code[str.charCodeAt(stringOffset+1)]&0x0F)<<4)|((code[str.charCodeAt(stringOffset+2)]&0x3C)>>2));
			stringOffset+3<stringLength&&(result[byteOffset+2] = ((code[str.charCodeAt(stringOffset+2)]&0x03)<<6)|((code[str.charCodeAt(stringOffset+3)]&0x3F)<<0));
		}
		return result;
	}

	function encode(arr){
		var byteLength = arr.byteLength;
		var result = "";
		for(var byteOffset = 0; byteOffset<byteLength; byteOffset += 3){
			result += alphabet.charAt((arr[byteOffset]&0xFC)>>2);
			result += alphabet.charAt(((arr[byteOffset]&0x03)<<4)|(byteOffset+1<byteLength?(arr[byteOffset+1]&0xF0)>>4:0x00));
			result += byteOffset+1<byteLength? alphabet.charAt(((arr[byteOffset+1]&0x0F)<<2)|(byteOffset+2<byteLength?(arr[byteOffset+2]&0xC0)>>6:0x00)):"=";
			result += byteOffset+2<byteLength? alphabet.charAt((arr[byteOffset+2]&0x3F)<<0):"=";
		}
		return result;
	}

	library["58"].decode = decode;
	library["58"].encode = encode;
});
/**
 * Created by Zuobai on 2015/9/12.
 */

library( function () {
	library["59"] = function ( contentType, encoding, content ) {
		return ["data:", [contentType, encoding].join( ";" ), ",", content].join( "" );
	};
} );
/**
 * Created by Zuobai on 2015/9/12.
 * 处理网络字体
 */

library( function () {
	var ajax =library["13"],
		css =library["6"],
		base64 =library["58"],
		dataUrl =library["59"],
		fontCount = 0;

	library["60"] = function ( src, callback ) {
		var fontName = "f" + fontCount++;
		ajax( {
			url : src,
			responseType : "arraybuffer"
		}, function ( err, xhr ) {
			if ( !err ) {
				try {
					css.insertRules( "@font-face", {
						"font-family" : "'" + fontName + "'",
						src : css.url( dataUrl( "application/octet-stream", "base64", base64.encode( new Uint8Array( xhr.response ) ) ) ) + " format('truetype')",
						"font-weight" : "normal",
						"font-style" : "normal"
					} );
				}
				catch ( e ) {
					callback( e );
					return;
				}

				callback( null, fontName );
			}
			else {
				callback( err );
			}
		} );

		return fontName;
	};
} );
/**
 * Created by 白 on 2015/8/25.
 */

library( function () {
	var parseLrc =library["57"],
		$ =library["8"],
		animation =library["32"],
		csa =library["10"],
		object =library["2"],
		webFont =library["60"],
		ajax =library["13"],
		String =library["5"],
		array =library["1"],
		css =library["6"],
		random =library["33"],
		async =library["4"],
		ua =library["14"];

	// 将每个字或者英文词切割为span
	function split( text, line, margin ) {
		var curSpan = $( "span", line );
		String.foreach( text, function ( ch ) {
			if ( /[A-Za-z']/.test( ch ) ) {
				curSpan.innerHTML += ch;
				curSpan.english = true;
			}
			else {
				curSpan.english && ( line.innerHTML += " " );
				curSpan = $( "span", {
					css : {
						position : "relative",
						"margin-left" : css.px( curSpan.english ? margin * 2 : margin )
					},
					innerHTML : curSpan.english ? ch.replace( " ", "" ) : ch
				}, line );
			}
		} );
		return line.querySelectorAll( "span" );
	}

	var Engine = {
		1 : function ( body, fontFamily ) {
			return function ( text, duration ) {
				var oLine = $( "div.lyric", {
						css : {
							"font-size" : "20px",
							position : "absolute",
							"text-shadow" : "0.5px 0.866px 2px rgba(0, 0, 0, 0.5)",
							color : "white",
							"z-index" : "100",
							bottom : "50px",
							width : "100%",
							left : 0,
							"text-align" : "center",
							"font-family" : fontFamily
						}
					}, body ),
					spans = split( text, oLine, 3 );

				csa.runAnimation( array.map( spans, function ( span, i ) {
					return [span, {
						0 : {
							opacity : 0,
							filter : "blur(10px)"
						}
					}, 0.7, i * 0.035, "linear"];
				} ) );

				setTimeout( function () {
					csa.runAnimation( array.map( spans, function ( span ) {
						return [span, {
							100 : {
								opacity : 0,
								filter : "blur(10px)"
							}
						}, 0.7];
					} ), function () {
						$.remove( oLine );
					} );
				}, duration - 500 );
			};
		},
		2 : function ( body, fontFamily ) {
			return function ( text, duration ) {
				var oLine = $( "div.lyric", {
						css : {
							"font-size" : "18px",
							position : "absolute",
							"text-shadow" : "0.5px 0.866px 2px rgba(0, 0, 0, 0.5)",
							color : "white",
							"z-index" : "100",
							bottom : "25px",
							right : "25px",
							"font-family" : fontFamily
						}
					}, body ),
					spans = split( text, oLine, 5 );

				csa.runAnimation( array.map( random.arrange( spans ), function ( span, i ) {
					return [span, {
						0 : {
							opacity : 0,
							filter : "blur(10px)"
						}
					}, 0.7, i * 0.07];
				} ) );

				setTimeout( function () {
					csa.runAnimation( array.map( random.arrange( spans ), function ( span, i ) {
						return [span, {
							100 : {
								opacity : 0,
								filter : "blur(10px)"
							}
						}, 0.7, i * 0.035];
					} ), function () {
						$.remove( oLine );
					} );
				}, duration - 500 );
			};
		},
		// 摇滚风格
		3 : function ( body, fontFamily ) {
			var isLeft = true;

			return function ( text, duration ) {
				var oLine = $( "div.lyric", {
						css : object.extend( {
							width : "250px",
							"font-size" : "36px",
							"line-height" : "44px",
							position : "absolute",
							"text-shadow" : "0.5px 0.866px 2px rgba(0, 0, 0, 0.5)",
							color : "white",
							"z-index" : "100",
							"font-family" : fontFamily,
							top : "50%",
							"margin-top" : css.px( random.range( -180, 180 ) )
						}, isLeft ? {
							left : css.px( random.range( 15, 30 ) )
						} : {
							right : css.px( random.range( 15, 30 ) )
						} )
					}, body ),
					spans = split( text, oLine, 5 );

				array.foreach( spans, function ( span, i ) {
					i !== 0 && i !== spans.length - 1 &&
					css( span, "top", css.px( ( i % 2 === 0 ? 1 : -1 ) * random.range( 3, 6 ) ) );
				} );

				isLeft = !isLeft;

				if ( oLine.offsetHeight + oLine.offsetTop > document.documentElement.clientHeight ) {
					css( oLine, {
						top : "auto",
						"margin-top" : 0,
						bottom : css.px( random.range( 20, 60 ) )
					} );
				}

				csa.runAnimation( array.map( random.arrange( spans ), function ( span, i ) {
					return [span, {
						0 : {
							transform : css.scale( 5 ),
							opacity : 0
						}
					}, 0.3, i * 0.07, css.bezier( [.52, .21, .8, .51] )];
				} ) );

				setTimeout( function () {
					csa.runAnimation( array.map( random.arrange( spans ), function ( span, i ) {
						return [span, {
							100 : {
								opacity : 0
							}
						}, 0.3, i * 0.035];
					} ), function () {
						$.remove( oLine );
					} );
				}, duration );
			};
		}
	};

	library["61"] = function ( workBody, audio, lyricMode ) {
		var workData = workBody.workData,
			arg = workData.music,
			lyricLoadHandle, lyric, fontFamily,
			lyricHandle;

		if ( !arg.lrc ) {
			return;
		}

		async.concurrency( [
			function ( done ) {
				lyricLoadHandle = ajax( {
					url : arg.lrc
				}, function ( err ) {
					if ( err ) {
						lyricLoadHandle = null;
						return;
					}

					try {
						lyric = parseLrc( lyricLoadHandle.responseText );
						lyricLoadHandle = null;
					}
					catch ( e ) {
						return;
					}
					done();
				} );
			},
			function ( done ) {
				arg.font ? fontFamily = webFont( arg.font, done ) : done();
			}
		], function () {
			var engine = Engine[arg.mode || lyricMode || 1]( workBody, fontFamily || "inherit" ),
				delay = parseFloat( arg.delay || 0 ),
				curIndex = 0,
				lastTime;

			lyricHandle = animation.requestFrame( function () {
				if ( lastTime !== undefined && audio.currentTime < lastTime ) {
					curIndex = 0;
				}

				var curLine = lyric[curIndex];
				if ( curLine && audio.currentTime * 1000 > curLine.start + delay * 1000 ) {
					++curIndex;
					if ( curLine.lyric ) {
						engine( curLine.lyric, lyric[curIndex].start - curLine.start );
					}
				}
				lastTime = audio.currentTime;
			} );
		} );

		return {
			remove : function () {
				lyricLoadHandle && lyricLoadHandle.abort();
				lyricHandle && lyricHandle.remove();
				array.foreach( workBody.querySelectorAll( ".lyric" ), $.remove );
			}
		};
	};
} );
/**
 * Created by Zuobai on 2015/8/26.
 */

library( function () {
	var array =library["1"],
		async =library["4"],
		img =library["16"],
		$ =library["8"],
		css =library["6"],
		pointer =library["11"];

	function ImageInput( onChange ) {
		var input = $( "input.need-default", {
			type : "file",
			accept : "image/*",
			multiple : "true"
		} );

		$.bind( input, "change", function () {
			var images = [];

			async.concurrency( array.map( input.files, function ( file, i ) {
				return function ( callback ) {
					var reader = new FileReader();
					reader.onload = function () {
						images[i] = ( file.type ? reader.result : "data:application/octet-stream;" + reader.result.substr( reader.result.indexOf( "base64," ) ) );
						callback();
					};
					reader.readAsDataURL( file );
				};
			} ), function () {
				onChange && onChange( images );
			} );
		} );

		pointer.onPointerDown( input, function ( event ) {
			event.stopPropagation();
		} );

		return input;
	}

	library["62"] = function ( workBody, Work ) {
		var myWorkData = JSON.parse( JSON.stringify( workBody.workData ) ),
			toReplace = [];

		myWorkData.cut = false;

		array.foreach( myWorkData.pages, function ( pageData ) {
			if ( pageData.label === "custom-2" || pageData.label === "SingleImage" ) {
				array.foreach( pageData.image, function ( image ) {
					var imageInfo = image.imageinfo,
						url = image.url;
					if ( ( imageInfo == null && !img.isColor( url ) && pageData.custom.type !== "y" ) || imageInfo && imageInfo.type === "image" ) {
						toReplace.push( image );
					}
				} );
			}
		} );

		function Uploader() {
			return ImageInput( function ( images ) {
				array.foreach( images, function ( url ) {
					if ( toReplace.length ) {
						toReplace[0].url = url;
						toReplace.shift();
					}
				} );

				if ( toReplace.length > 0 ) {
					$( "div", {
						css : css.full( {
							"z-index" : 101,
							background : "white"
						} ),
						children : [
							$( "div", {
								css : {
									position : "absolute",
									width : "100%",
									top : "50%",
									"text-align" : "center",
									"line-height" : "14px",
									"font-size" : "14px",
									"z-index" : 1,
									"pointer-events" : "none"
								},
								innerHTML : "还需要" + toReplace.length + "张"
							} ),
							$( Uploader(), {
								css : {
									position : "absolute",
									width : "100%",
									height : "100%",
									"z-index" : 0,
									opacity : 0
								}
							} )
						]
					}, workBody );
				}
				else {
					var newWork = Work( {
						workData : myWorkData,
						width : workBody.offsetWidth,
						height : workBody.offsetHeight
					} );
					workBody.parentNode.replaceChild( newWork, workBody );
					newWork.play();
				}
			} );
		}

		$( "div", {
			css : {
				position : "absolute",
				right : "0",
				top : "50px",
				width : "44px",
				height : "44px",
				"z-index" : 100,
				"font-size" : "10px"
			},
			children : [
				$( "div", {
					css : {
						position : "absolute",
						width : "100%",
						height : "100%",
						"text-align" : "center",
						"line-height" : "44px",
						background : "rgba(0,0,0,0.3)",
						"z-index" : 1,
						"pointer-events" : "none"
					},
					innerHTML : "我的(" + toReplace.length + ")"
				} ),
				$( Uploader(), {
					css : {
						position : "absolute",
						width : "100%",
						height : "100%",
						"z-index" : 0,
						opacity : 0
					}
				} )
			]
		}, workBody );
	};
} );
/**
 * Created by 白 on 2015/9/1.
 * 经典模式
 */

plugin( function () {
	var array =library["1"],
		string =library["5"],
		object =library["2"],
		$ =library["8"],
		animation =library["32"],
		random =library["33"],
		css =library["6"],
		math =library["31"],
		func =library["0"],
		async =library["4"],

		Music =library["43"],
		Preview =library["48"],
		tips =library["29"],
		sa =library["35"],
		util =library["25"],
		env =library["27"],
		animationData =library["45"],
		pageAnimationData = animationData.pageAnimations,
		pageAnimation =library["40"],
		ua =library["14"],
		ui =library["26"],
		Toolbar =library["55"],
		lyric =library["61"],
		myWork =library["62"],
		Work =library["34"],

		switchAnimateList = [sa.classic, sa.push, sa.fade, sa.cube, sa.door, sa["switch"], sa.uncover]; // 动画切换数组,用来取随机用

	Work.Modes.classic = Work.Modes.push = Work.Modes.click = function ( workBody, arg ) {
		var curPage, // 当前页
			curPageIndex = arg.pageIndex || 0, // 当前页码
			playSchedule = async.Schedule(), // 播放日程
			preloadPageSchedule = async.Schedule(); // 预加载日程

		return {
			play : playSchedule.start,
			preloadPage : preloadPageSchedule.start,
			resize : function ( width, height ) {
				if ( curPage ) {
					curPage.resize( width, height );
					curPage.play();
				}
			},
			recycle : function () {
				curPage && curPage.recycle();
			},
			load : function ( pageLoadDone ) {
				var workData = workBody.workData, // 作品数据
					themeData = parseInt( workData.theme ) ? animationData.Theme( workData ) : null, // 主题数据
					mode = workData.mode, // 模式

					rawPageSwitch = workData.pageSwitch, // 页面切换
					switchAnimateId = mode === "push" || !sa[rawPageSwitch] ? "classic" : rawPageSwitch, // 切换动画id

					noLoop = workData.noLoop, // 无循环
					pageNum = workBody.pageNumber, // 页数量

					musicIcon, // 播放图标
					loadingNewPageTips, // 加载新页提示
					cutHandle = null, // 切换句柄
					cutAnimateHandle = null, // 切换动画句柄
					tailArrived = curPageIndex === pageNum - 1,  // 已经到达尾部

					preview = arg.preview ? Preview( workBody, themeData ) : null, // 预览
					toolbar = arg.toolbar && !arg.preview ? Toolbar( workBody ) : null, // 工具条

					oPageNumber = $( "div.hidden", {
						css : {
							position : "absolute",
							left : "15px",
							bottom : "20px",
							"text-shadow" : "1px 1px 1px black",
							color : "white",
							"z-index" : 1
						}
					}, workBody ), // 总页码
					oCurPageIndex = $( "span", {
						css : {
							"font-size" : "16px"
						},
						innerHTML : curPageIndex + 1
					}, oPageNumber ); // 当前页码

				/* by kahn1990 on 2015/11/16 隐藏版权提示*/
				//noLoop && workBody.appendChild( tips.PoweredBy() ); // 如果不循环,在workBody中添加PoweredBy
				noLoop
				arg.music && Music( workBody, musicIcon = $( tips.Music() ) ); // 音乐

				function loadPage( index, onLoad ) {
					workBody.loadPage( index, function ( page ) {
						if ( page ) {
							var layout = page.wrapper,
								applyEnter = layout.applyEnter;

							// 设置切换动画
							page.switchAnimate = ( rawPageSwitch === "random" ? random.select( switchAnimateList ) : sa[switchAnimateId] );

							// 设置主题
							if ( themeData ) {
								// 重新分配切换动画
								page.switchAnimate = themeData.switchAnimation;

								// 分配
								applyEnter && pageAnimation.applyAnimate( page, applyEnter.pageAnimation ?
									pageAnimationData[applyEnter.pageAnimation] : themeData.appliedGroup[page.index] );
							}

							page.prepare(); // 页面准备
						}

						onLoad( page );
					} );
				}

				// 获取页码
				function getPageIndex( index ) {
					return ( index + pageNum ) % pageNum;
				}

				// 预加载页面
				function preloadPage() {
					var curIndex = curPage.index;

					func.recursion( function load( i, j ) {
						i !== 0 && async.concurrency( array.map( [-j, j], function ( step ) {
							return function ( done ) {
								workBody.loadPage( curIndex + step, done, false );
							}
						} ), function () {
							load( i - 1, j + 1 );
						} );
					}, 2, 1 );
				}

				// 加载第一页
				loadPage( curPageIndex, function ( page ) {
					var firstTips = workBody.appendChild( tips.CutFirst() );
					curPage = workBody.appendChild( page );

					// 显示页码和工具栏
					//oPageNumber.classList.remove( "hidden" );

					// 准备播放日程和预加载页面日程
					playSchedule.prepare( function () {
						curPage.play();
					} );
					preloadPageSchedule.prepare( preloadPage );

					// 如果有音乐,添加音乐播放
					if ( workBody.playAudio ) {
						// 点击图标切换播放状态
						ui.onTap( workBody.appendChild( musicIcon ), function () {
							musicIcon.play ? workBody.stopAudio() : workBody.playAudio();
						} );

						// 如果在微信中,立刻播放音乐
						ua.MicroMessenger && ( ua.ios && window.WeixinJSBridge ?
							WeixinJSBridge.invoke( 'getNetworkType', {}, workBody.playAudio ) : workBody.playAudio() );
					}

					// 切换页面
					function cut( step ) {
						// 清理cutHandle和加载新页提示
						cutHandle = null;
						$.remove( loadingNewPageTips );

						// 切换
						func.recursion( function cut() {
							loadingNewPageTips = workBody.appendChild( tips.LoadingNewPage() );
							cutHandle = cut;

							loadPage( getPageIndex( curPageIndex + step ), function ( newPage ) {
								$.remove( loadingNewPageTips );

								if ( cutHandle === cut ) {
									var oldPage = curPage;
									oldPage.fastForward(); // 快进当前页
									oldPage.recycle(); // 回收当前页

									$.classList( workBody ).remove( "last-page" );

									curPage = newPage;
									oCurPageIndex.innerHTML = ( curPageIndex = curPage.index ) + 1;

									preloadPage();

									// 切换动画
									var lock = ui.Lock();
									util.cutPage( function () {
										cutAnimateHandle = ( step > 0 ? curPage.switchAnimate : sa.back )( workBody, oldPage, curPage, function () {
											cutAnimateHandle = null;
											$.remove( oldPage );
											workBody.appendChild( curPage );
											curPage.play();

											if ( curPageIndex === pageNum - 1 ) {
												tailArrived = true;
												workBody.classList.add( "last-page" );
											}

											lock.remove();

											toolbar && toolbar.show( step < 0 || curPageIndex === pageNum - 2 || curPageIndex === 0 );
											preview && preview( curPage );

											env.track( ["PV", workBody.workId, ua.systemName] );
										} );
									} );
								}
							} );
						} );
					}

					// 手势切换
					func.callWith( function ( cut ) {
						ui.onSwipeStart( workBody, function ( event ) {
							if ( event.yOut && Math.abs( event.dX ) < 10 ) {
								var toDown = event.dY < 0;
								// 在第一页并且没有到达过最后一页时,向上滑时无效
								if ( !( !toDown && ( curPageIndex === 0 && ( !tailArrived || noLoop ) ) ) ) {
									cut( toDown ? 1 : -1 );
								}
							}
						} );
					}, function ( step ) {
						if ( ui.preventBodyEvent || ui.preventDrag || noLoop && curPageIndex === pageNum - 1 && step === 1 ) {
							return;
						}

						// 如果还是第一个提示,换成普通提示
						if ( firstTips ) {
							$.remove( firstTips );
							firstTips = null;
							workBody.appendChild( tips.Cut() );
							workBody.audioPlayIntention && workBody.playAudio && workBody.playAudio(); // 如果有音乐播放意图,播放音乐
						}

						cut( step );
					} );

					// 总页码
					oPageNumber.appendChild( $( "span", {
						innerHTML : "/" + pageNum,
						css : {
							"font-size" : "12px"
						}
					} ) );

					// 当前页接口
					Object.defineProperty( workBody, "curPage", {
						get : function () {
							return curPage;
						}
					} );

					// 页码接口
					Object.defineProperty( workBody, "curPageIndex", {
						get : function () {
							return curPageIndex;
						},
						set : function ( targetPageIndex ) {
							if ( !document.documentElement.classList.contains( "lock" ) ) {
								targetPageIndex = getPageIndex( targetPageIndex );
								if ( targetPageIndex !== curPageIndex ) {
									cut( targetPageIndex - curPageIndex );
								}
							}
						}
					} );

					// 页面数据接口
					Object.defineProperty( workBody, "curPageData", {
						get : function () {
							return workData.pages[curPageIndex];
						}
					} );

					toolbar && toolbar.prepare(); // 准备工具条
					preview && preview( curPage ); // 预览
					location.hash === "#edit" && myWork( workBody, Work ); // 编辑作品

					// 第一页加载完成
					pageLoadDone();
				} );
			}
		};
	};
} );

/**
 * Created by 白 on 2015/9/15.
 */

library( function () {
	var func =library["0"],
		object =library["2"],
		css =library["6"];

	library["63"] = function ( random ) {
		function Lens( duration ) {
			var progress = {}, time = 0;

			return {
				transition : function ( s ) {
					time += s;
				},
				progress : function () {
					return progress;
				},
				push : function ( arg1, arg2 ) {
					var delay, value;
					if ( arg2 === undefined ) {
						delay = 0;
						value = arg1;
					}
					else {
						delay = arg1;
						value = arg2;
					}
					progress[( ( time += delay ) * 100 / duration ).toFixed( 2 )] = value;
				},
				time : function () {
					return time;
				},
				end : function ( value ) {
					progress[100] = value;
				}
			};
		}

		function flash( lens, fadeDuration, style, notEnd ) {
			lens.push( object.extend( style, {
				opacity : 0
			} ) );

			lens.push( fadeDuration, object.extend( style, {
				opacity : 1
			} ) );

			if ( !notEnd ) {
				lens.push( fadeDuration, object.extend( style, {
					opacity : 0
				} ) );
			}
		}

		// 闪烁
		function flashScale( arg ) {
			var lens = Lens( arg.duration ),
				endScale = arg.endScale,
				times = arg.times,
				scaleGain = arg.scaleGain,
				fadeDuration = 0.08,
				interval = 0.1;

			func.loop( times, function ( i ) {
				var isLast = i - 1 === times;

				flash( lens, fadeDuration, {
					scale : endScale - ( times - i - 1 ) * scaleGain
				}, isLast );
				!isLast && lens.transition( interval );
			} );

			return lens;
		}

		// 闪烁放大
		function flashExpand( duration ) {
			var lens = flashScale( {
				endScale : 1,
				scaleGain : 0.15,
				duration : duration,
				times : 4
			} );

			lens.end( {
				scale : 1.15
			} );

			return lens;
		}

		// 闪烁缩小
		function flashShrink( duration ) {
			var lens = flashScale( {
				endScale : 1.15,
				scaleGain : -0.15,
				duration : duration,
				times : 4
			} );

			lens.end( {
				scale : 1
			} );

			return lens;
		}

		// 快速缩放
		function fastShrink( duration ) {
			var lens = Lens( duration );

			lens.push( {
				scale : 2.5,
				timing : "ease"
			} );

			lens.push( 0.2, {
				scale : 1.15
			} );

			return lens;
		}

		// 快速缩放
		function fastShrinkToExpand( duration ) {
			var lens = Lens( duration );

			lens.push( {
				scale : 2.5,
				timing : "ease"
			} );

			lens.push( 0.2, {
				scale : 1
			} );

			lens.end( {
				scale : 1.15
			} );

			return lens;
		}

		// 摇晃镜头
		function shake( duration ) {
			var lens = Lens( duration ),
				lastSign = null;

			lens.push( {
				scale : 0.01,
				timing : "ease"
			} );

			lens.push( 0.3, {
				scale : 1.1
			} );

			while ( lens.time() < duration ) {
				var sign;
				do {
					sign = random.select( [[1, 1], [1, -1], [-1, 1], [-1, -1]] );

				}
				while ( JSON.stringify( sign ) === JSON.stringify( lastSign ) );
				lastSign = sign;
				lens.push( 0.2, {
					filter : css.tuple( "blur", [css.px( random.range( 1, 3 ) )] ),
					x : sign[0] * random.range( 5, 7 ),
					y : sign[1] * random.range( 5, 7 ),
					scale : 1.1
				} );
			}

			lens.end( {
				scale : 1.1
			} );

			return lens;
		}

		function shiftFocus( duration ) {
			var lens = Lens( duration ),
				signX = random.select( [true, false] ),
				signY = random.select( [true, false] );

			function origin( x, y ) {
				function v( sign, value ) {
					return sign ? value : 1 - value;
				}

				return [v( signX, x ), v( signY, y )];
			}

			lens.push( {
				scale : 2,
				origin : origin( random.range( 0, 0.2 ), random.range( 0, 0.2 ) ),
				timing : "ease"
			} );

			lens.push( 0.3, {
				scale : 2,
				origin : origin( random.range( 0, 0.8 ), random.range( 0.4, 0.6 ) ),
				timing : "ease"
			} );

			lens.push( 0.3, {
				scale : 2,
				origin : origin( random.range( 0, 0.2 ), random.range( 0.8, 1 ) ),
				timing : "ease"
			} );

			lens.push( 0.3, {
				scale : 1.2,
				origin : [0.5, 0.5]
			} );

			return lens;
		}

		return {
			fastShrinkToExpand : fastShrinkToExpand,
			fastShrink : fastShrink,
			flashExpand : flashExpand,
			flashShrink : flashShrink,
			shake : shake,
			shiftFocus : shiftFocus
		};
	};
} );
/**
 * Created by 白 on 2015/9/1.
 * mv模式
 */

plugin( function () {
	var array =library["1"],
		string =library["5"],
		object =library["2"],
		$ =library["8"],
		animation =library["32"],
		css =library["6"],
		math =library["31"],
		func =library["0"],
		async =library["4"],
		csa =library["10"],

		Lens =library["63"],
		Music =library["43"],
		tips =library["29"],
		sa =library["35"],
		util =library["25"],
		env =library["27"],
		ua =library["14"],
		ui =library["26"],
		Layout =library["19"],
		Content =library["24"],
		Lyric =library["61"],
		myWork =library["62"],
		Work =library["34"];

	function blendSrc( i ) {
		return window.contentPath + "blend/" + i + ".jpg";
	}

	function splitPageComponent( page ) {
		var layout = page.wrapper,
			texts = [],
			nonTexts = [],
			background = null;

		Layout.loopComponent( layout, function ( component ) {
			if ( component.isElement ) {
				nonTexts.push( component );
			}
		} );

		if ( nonTexts.length > 1 ) {
			background = Layout.Component( Content.Rect( layout.w, layout.h ), layout );
			array.foreach( nonTexts, function ( component ) {
				component.appendTo( background );
			} );
		}
		else if ( nonTexts.length === 1 ) {
			background = nonTexts[0];
		}

		return {
			background : background,
			texts : texts
		};
	}

	var Modes = {
		"mv-1" : function ( workBody, music ) {
			var random = workBody.random,
				scale = 1.15,
				pageStayDuration = 7,
				curPage = null,
				blendImages = array.map( array.range( 2 ), function ( i ) {
					var image = new Image();
					image.onload = function () {
						image.loaded = true;
					};
					image.src = blendSrc( i );
					return image;
				} ),
				pageNumber = workBody.pageNumber,
				playPages = [];

			if ( music && music.end ) {
				var workDuration = 0,
					number = array.foreach( music.end, function ( end ) {
						var number = ( workDuration = end ) / ( pageStayDuration + 1 );
						if ( number > pageNumber - 1 ) {
							return Math.floor( number );
						}
					} );
				playPages = array.map( array.range( number ), function ( i ) {
					return i % ( pageNumber - 1 );
				} );
				playPages.push( pageNumber - 1 );
				pageStayDuration = workDuration / number - 1;
			}
			else {
				playPages = array.range( pageNumber );
			}

			return {
				startLoadNumber : 1,
				preloadNumber : 3,
				lyricMode : 2,
				play : function ( mc ) {
					func.recursion( function cutPage() {
						var index = playPages.shift();
						workBody.loadPage( index, function ( page ) {
							var oldPage = curPage;
							curPage = page;

							if ( page.label === "SingleImage" || page.label === "components" ) {
								var layout = page.wrapper,
									pageSplit = splitPageComponent( page ),
									background = pageSplit.background,
									boxWidth = layout.w,
									blendImage = random.select( blendImages );

								function translate( left, top ) {
									var t = scale * 50 - 50;
									return {
										"0" : {
											scale : scale,
											x : t * left + "%",
											y : t * top + "%"
										},
										"100" : {
											scale : scale,
											x : -t * left + "%",
											y : -t * top + "%"
										}
									};
								}

								// 光影
								if ( random.probability( 0.7 ) && blendImage.loaded ) {
									var blendComp = Layout.Component( Content.Image( blendImage, {
											w : layout.h * blendImage.naturalWidth / blendImage.naturalHeight,
											h : layout.h
										} ), layout ),
										imgWidth = blendComp.w,
										blendMode = random.select( ["screen", "lighten", "soft-light"] ),
										revisionOpacity = blendMode === "lighten" ? 0.3 : 1;

									css( blendComp.element, "mix-blend-mode", blendMode );
									blendComp.opacity = 0;
									blendComp.enter = {
										duration : pageStayDuration,
										progress : function ( i, duration ) {
											var interval = 100 / ( i + 0.7 ),
												pieceDuration = 100 / i / duration,
												progress = {},
												start = 0,
												curPos = 0;

											function push( key, value ) {
												progress[key.toFixed( 2 )] = value;
											}

											func.loop( i, function () {
												var thisPieceDuration = pieceDuration * random.range( 0.7, 1.2 ) * 2;
												start += interval * random.range( 0.9, 1.1 );

												push( start, {
													absOpacity : 0,
													x : curPos
												} );
												push( start + thisPieceDuration, {
													absOpacity : ( 0.6 * random.range( 0.8, 1.2 ) ) * revisionOpacity,
													x : ( boxWidth - imgWidth ) / 2
												} );
												push( start + thisPieceDuration * 2, {
													absOpacity : 0,
													x : curPos = ( boxWidth - imgWidth ) - curPos
												} );
											} );

											return progress;
										}( random.select( [2, 3] ), pageStayDuration ),
										timing : animation.Timing.linear
									};
								}
								else {
									var back = Layout.cloneComponent( background ),
										forward = background,
										filterComponent = random.select( [back, forward] );

									background = Layout.Component( Content.Rect( layout.w, layout.h ), layout );
									back.appendTo( background );
									forward.appendTo( background );
									back.opacity = 0;

									css( filterComponent.element, "filter", random.select( ["blur(10px)", "grayscale(1)", "contrast(200%)", "hue-rotate(90deg)"] ) );
									back.enter = {
										duration : pageStayDuration,
										progress : {
											0 : {
												absOpacity : 1
											}
										},
										timing : animation.Timing.linear
									};
									forward.enter = {
										duration : pageStayDuration,
										progress : {
											0 : {
												absOpacity : 0
											}
										},
										timing : animation.Timing.linear
									};
								}

								background.enter = {
									both : true,
									duration : pageStayDuration + 1,
									progress : random.select( [
										translate( 1, 0 ), translate( -1, 0 ), translate( 0, 1 ), translate( 0, -1 ),
										{
											"0" : {
												scale : scale
											}
										},
										{
											"100" : {
												scale : scale
											}
										}
									] ),
									timing : animation.Timing.linear
								};
							}

							page.prepare(); // 页面准备

							func.callWith( function ( cutNext ) {
								if ( oldPage ) {
									page.play();
									util.cutPage( function () {
										sa.fade( workBody, oldPage, page, function () {
											$.remove( oldPage );
											cutNext();
										}, 1 );
									} );
								}
								else {
									workBody.appendChild( page );
									page.play();
									cutNext();
								}
							}, function () {
								mc.preloadPage( index + 1 );
								if ( page.label !== "author" ) {
									setTimeout( function () {
										cutPage();
									}, pageStayDuration * 1000 );
								}
								else {
									mc.end();
								}
							} );
						} );
					} );
				}
			};
		},
		"mv-2" : function ( workBody ) {
			var random = workBody.random,
				pageStayDuration = 3,
				curPage = null,
				lens = Lens( random ),
				pageNumber = workBody.pageNumber,
				blendImages = [];

			return {
				startLoadNumber : 1,
				preloadNumber : 3,
				lyricMode : 3,
				load : function ( callback ) {
					async.concurrency( array.map( [5, 4], function ( i ) {
						return function ( done ) {
							var img = new Image();
							img.src = blendSrc( i );
							img.onload = done;
							blendImages.push( img );
						};
					} ), callback );
				},
				play : function ( mc ) {
					array.foreach( blendImages, function ( img ) {
						css( img, {
							position : "absolute",
							left : 0,
							top : 0,
							height : "100%",
							"mix-blend-mode" : "lighten",
							"z-index" : 1000
						} );
						workBody.appendChild( img );
					} );

					csa.runAnimation( [
						[blendImages[0], {
							50 : {
								transform : css.translate( workBody.w - blendImages[0].offsetWidth, 0, 0 )
							}
						}, 120, "linear", "infinite"],
						[blendImages[1], {
							0 : {
								transform : css.translate( workBody.w - blendImages[0].offsetWidth, 0, 0 )
							},
							50 : {
								transform : css.translate( 0, 0, 0 )
							},
							100 : {
								transform : css.translate( workBody.w - blendImages[0].offsetWidth, 0, 0 )
							}
						}, 120, "linear", "infinite"]
					] );

					func.recursion( function cutPage( index ) {
						workBody.loadPage( index, function ( page ) {
							var oldPage = curPage;
							curPage = page;

							if ( page.label === "SingleImage" || page.label === "components" ) {
								var pageSplit = splitPageComponent( page ),
									background = pageSplit.background;

								background.enter = {
									both : true,
									duration : pageStayDuration + 1,
									progress : random.select( [
										lens.fastShrink( pageStayDuration + 1 ),
										lens.flashExpand( pageStayDuration + 1 ),
										lens.flashShrink( pageStayDuration + 1 ),
										lens.shake( pageStayDuration + 1 ),
										lens.shiftFocus( pageStayDuration + 1 ),
										lens.shiftFocus( pageStayDuration + 1 ),
										lens.fastShrinkToExpand( pageStayDuration + 1 )
									] ).progress(),
									timing : animation.Timing.linear
								};
							}

							page.prepare(); // 页面准备

							func.callWith( function ( cutNext ) {
								if ( oldPage ) {
									page.play();
									util.cutPage( function () {
										sa.fade( workBody, oldPage, page, function () {
											$.remove( oldPage );
											cutNext();
										}, 0.1 );
									} );
								}
								else {
									workBody.appendChild( page );
									page.play();
									cutNext();
								}
							}, function () {
								mc.preloadPage( index + 1 );
								if ( page.label !== "author" ) {
									setTimeout( function () {
										cutPage( ( index + 1 ) % ( pageNumber - 1 ) );
									}, pageStayDuration * 1000 );
								}
								else {
									mc.end();
								}
							} );
						} );
					}, 0 );
				}
			};
		}
	};

	Work.Modes.mv = Work.Modes["mv-1"] = Work.Modes["mv-2"] = function ( workBody ) {
		var playSchedule = async.Schedule(), // 播放日程
			preloadPageSchedule = async.Schedule(); // 预加载日程

		return {
			play : playSchedule.start,
			preloadPage : preloadPageSchedule.start,
			resize : function () {
			},
			recycle : function () {
			},
			load : function ( pageLoadDone ) {
				var workData = workBody.workData, // 作品数据
					iconAlbum = $( tips.Album() ), // 唱片图标
					audio = Music( workBody, iconAlbum ), // 音乐
					mode = ( Modes[workData.mode] || Modes["mv-1"] )( workBody, workData.music ); // 切换动画句柄

				// 预加载页面
				function preloadPage( index ) {
					var curIndex = index || 0;

					func.recursion( function load( i, j ) {
						if ( i > 0 ) {
							workBody.loadPage( curIndex + j, function () {
								load( i - 1, j + 1 );
							}, false );
						}
					}, mode.preloadNumber, 1 );
				}

				// 加载起始页
				async.concurrency( array.map( array.range( mode.startLoadNumber ), function ( i ) {
					return function ( done ) {
						workBody.loadPage( i, done );
					};
				} ).concat( function ( done ) {
					mode.load ? mode.load( done ) : done();
				} ), function () {
					// 准备播放日程和预加载页面日程
					playSchedule.prepare( function () {
						func.callWith( function ( playAudio ) {
							// 播放音乐
							!ua.chuyeList && ( ua.ios && window.WeixinJSBridge ? WeixinJSBridge.invoke( 'getNetworkType', {}, playAudio ) : playAudio() );
						}, function () {
							func.callWith( function ( play ) {
								workBody.playAudio();
								if ( audio.paused ) {
								}
								else {
									play();
								}
							}, function () {
								var lyric = Lyric( workBody, audio, mode.lyricMode );
								workBody.appendChild( iconAlbum );
								mode.play( {
									preloadPage : preloadPage,
									end : function () {
										$.remove( iconAlbum );
										$.remove( audio );
										lyric.remove();
									}
								} );
							} );
						} );
					} );

					preloadPageSchedule.prepare( preloadPage );
					location.hash === "#edit" && myWork( workBody, Work );

					pageLoadDone();
				} );
			}
		}
	};
} );

/**
 * Created by 白 on 2015/9/1.
 * 卷轴模式
 */

plugin( function () {
	var object =library["2"],
		URL =library["9"],
		async =library["4"],
		array =library["1"],
		css =library["6"],
		csa =library["10"],
		$ =library["8"],

		Music =library["43"],
		tips =library["29"],
		PageAnimation =library["40"],
		ea =library["37"],
		Lyric =library["61"],
		myWork =library["62"],
		ua =library["14"],
		Work =library["34"],

		hrefArg = URL( location.href ).arg;

	Work.Modes.scroll = function ( workBody ) {
		var curPage,
			lyricMode = hrefArg.lyric;

		return {
			load : function ( workLoadDone ) {
				function duration( length ) {
					return length / 40;
				}

				// 预加载页面
				function preloadPage() {
					if ( curPage ) {
						var curIndex = curPage.index;

						function load( i, j ) {
							i !== 0 && async.concurrency( array.map( [-j, j], function ( step ) {
								return function ( done ) {
									workBody.loadPage( curIndex + step, done );
								}
							} ), function () {
								load( i - 1, j + 1 );
							} );
						}

						load( 3, 1 );
					}
				}

				// 加载页并调整其图片位置
				function loadPage( index, callback ) {
					workBody.loadPage( index, function ( page ) {
						if ( !page ) {
							callback( null );
							return;
						}

						var width = 0,
							compTable = PageAnimation.analyzePage( page );

						if ( hrefArg["no-text"] ) {
							compTable.text = [];
						}

						page.innerHTML = "";

						array.foreach( compTable.text.concat( compTable.image.concat( compTable.background || [] ) ), function ( comp ) {
							var overSize = comp.h - ( workBody.h - 106 );
							comp.x = width;
							comp.scale = 1;

							if ( overSize > 0 ) {
								comp.scale = 1 - overSize / comp.h;
							}
							else if ( lyricMode === "top" && comp.y < 56 ) {
								comp.y = 56;
							}

							page.appendChild( comp.element );
							comp.enter = object.extend( ea.fadeIn, {
								duration : 1.5,
								delay : duration( width ) + duration( Math.min( comp.w, workBody.w / 3 ) + 40 )
							} );
							width += comp.w + 20;
						} );

						css.size( page, page.w = width + 20, page.h = workBody.h );
						css( page, "background", "white" );

						callback( page );
					} );
				}

				function scrollPage( index, callback ) {
					function scroll( index ) {
						loadPage( index, function ( scrollPage ) {
							if ( !scrollPage ) {
								callback && callback();
								return;
							}

							var scrollCurPage = csa.runAnimation( [
								[scrollPage, {
									0 : {
										transform : css.translate( workBody.w, 0, 0 )
									},
									100 : {
										transform : css.translate( -scrollPage.w, 0, 0 )
									}
								}, css.s( duration( scrollPage.w + workBody.w ) ), "linear"]
							], function () {
								$.remove( scrollPage );
							}, {
								play : false
							} );

							setTimeout( function () {
								scroll( index + 1 );
							}, duration( scrollPage.w ) * 1000 );

							preloadPage();
							workBody.appendChild( curPage = scrollPage );
							scrollPage.prepare();
							scrollPage.play();
							scrollCurPage.play();
						} );
					}

					scroll( index );
				}

				async.concurrency( [
					function ( callback ) {
						workBody.loadPage( 0, callback );
					},
					function ( callback ) {
						workBody.loadPage( 1, callback );
					}
				], function () {
					var audio = Music( workBody, $( tips.Album(), workBody ) );
					scrollPage( 0 );

					css( workBody, "background", "white" );
					Lyric( workBody, audio, "/ignore/" + workBody.workId + ".txt", lyricMode );
					ua.ios && window.WeixinJSBridge ? WeixinJSBridge.invoke( 'getNetworkType', {}, workBody.playAudio ) : workBody.playAudio();

					location.hash === "#edit" && myWork( workBody, Work ); // 编辑作品
					workLoadDone();
				} );
			},
			recycle : function () {
			},
			play : function () {
			},
			preloadPage : function () {
			},
			resize : function () {
			}
		};
	};
} );
/**
 * Created by 白 on 2015/6/10.
 * 作者页
 */

plugin( function () {
	var Img =library["16"],
		pointer =library["11"],
		async =library["4"],
		object =library["2"],
		ajax =library["13"],
		URL =library["9"],
		css =library["6"],

		env =library["27"],
		tips =library["29"],
		ua =library["14"],
		ui =library["26"],
		p =library["38"],
		Layout =library["19"],
		Content =library["24"],
		Component = Layout.Component,
		layoutFormats = Layout.formats,

		isFollow = false,
		social =library["50"];

	function tap( element, onIn, onOut, onTap ) {
		ui.onPointerDown( element, function () {
			onIn();

			ui.onTapUp( onTap );

			async.once( function () {
				onOut();
			}, function ( task ) {
				return [pointer.onMoveUp( {
					onUp : task
				} ), ui.onSwipe( task, true ), ui.onLongPress( task )];
			} );
		} );
	}

	layoutFormats.author = {
		load : function ( pageData, done ) {
			var tasks = [],
				authorData = pageData.data;

			if ( !isFollow && social.isLogIn() ) {
				tasks.push( function ( done ) {
					social.request( "api/follow/state", {
						userId : authorData.uid
					}, function ( err, result ) {
						if ( err === null ) {
							isFollow = result;
						}
						done();
					} );
				} );
			}

			if ( authorData.author == null ) {
				tasks.push( function ( done ) {
					var xhr = ajax( {
						url : URL.concatArg( window.virtualPath + "/WorkV2/GetUserInfo", {
							userId : authorData.uid
						} )
					}, function ( err ) {
						if ( !err ) {
							var data = JSON.parse( xhr.responseText );
							if ( data.code === 200 ) {
								data = data.data;
								authorData.author = data.nickname;
								pageData.image = [authorData.avatar = data.thumbnail || Img.staticSrc( "default-avatar.jpg" )];
							}
						}
						done();
					} );
				} );
			}
			else {
				pageData.image = pageData.image || [authorData.avatar];
			}

			async.concurrency( tasks, function () {
				done( pageData );
			} );
		},
		resource : {
			create : "author/create",
			createActive : "author/create-active",
			follow : "author/follow",
			following : "author/following"
		},
		create : function ( layout, ds, resource, context ) {
			var authorData = ds.data(),
				scale = layout.yScale,
				fontSize = Math.max( 14 * scale << 0, 12 );

			function layImage( image, y ) {
				var component = Component( Content.Image( image, scale ), layout );
				component.x = p.center( component, layout );
				component.y = y * scale;
				return component;
			}

			function layText( text, y, color ) {
				var comp = Component( Content.Label( text, {
					lineHeight : fontSize,
					fontSize : fontSize,
					color : color || "#393939"
				} ), layout );
				comp.x = p.center( comp, layout );
				comp.y = y * scale;
				return comp;
			}

			layout.background = "white";

			// 作者
			var authorY = ua.chuye ? 340 / 2 : 194 / 2;
			layText( "作", authorY, "#989898" );
			layText( "者", authorY + 20, "#989898" );
			layText( authorData.author, ua.chuye ? 674 / 2 : 561 / 2 );

			// 头像
			var headSize = 144 / 2 * scale << 0,
				head = Component( Content.Border( Content.Cover( ds.image( 0 ), {w : headSize, h : headSize} ), {
					radius : headSize / 2
				} ), layout );
			head.y = ( ua.chuye ? 490 / 2 : 381 / 2 ) * scale;
			head.x = p.center( head, layout );

			if ( !ua.chuye ) {
				// 关注
				var following = layImage( resource.following, ua.chuye ? 734 / 2 : 631 / 2 );
				if ( !isFollow ) {
					following.visible = false;
					var follow = layImage( resource.follow, ua.chuye ? 734 / 2 : 631 / 2 );

					ui.onTap( follow.element, function () {
						env.follow( authorData.uid );
					} )
				}

				// 创作
				var create = layImage( resource.create, 925 / 2 ),
					createActive = layImage( resource.createActive, 925 / 2 );

				createActive.visible = false;

				tap( create.element, function () {
					create.visible = false;
					createActive.visible = true;
				}, function () {
					create.visible = true;
					createActive.visible = false;
				}, function () {
					env.downloadFirstPage();
				} );

				// 举报
				var reportText = layText( "举报", 1050 / 2, "#898989" ),
					reportButton = Component( Content.Rect( 50, 40 ), layout );

				reportButton.x = p.center( reportButton, layout );
				reportButton.y = p.middle( reportButton, reportText );
				ui.onTap( reportButton.element, function () {
					env.report( ds.id );
				} );
			}

			// 滑到最后一页时记录
			if ( !context.track ) {
				env.track( ["Download", "View", ua.systemName] );
				context.track = true;
			}
		}
	};
} );
/**
 * Created by 白 on 2014/10/17.
 * 联系我们板式
 */

plugin( function () {
	var array =library["1"],
		Layout =library["19"],
		Component = Layout.Component,
		layoutFormats = Layout.formats,
		Content =library["24"],
		p =library["38"],
		ui =library["26"],
		env =library["27"];

	layoutFormats.contact = {
		resource : {
			title : "contact/title",
			frame : "contact/frame"
		},
		create : function ( layout, ds, resource ) {
			var scale = layout.yScale / 1008 * 1136;

			// 底
			Component( Content.Cover( ds.image( 0 ), layout ), layout );

			// 遮罩
			Component( Content.Rect( layout.w, layout.h, "rgba(255,255,255,0.5)" ), layout );

			// 联系我们+线
			var title = Component( Content.Image( resource.title, scale ), layout );
			title.x = p.center( title, layout );
			title.y = 166 * scale / 2;

			// 制作item
			var frameImg = resource.frame,
				frameWidth = frameImg.halfWidth * scale << 0,
				frameHeight = frameImg.halfHeight * scale << 0,
				items = [];

			array.foreach( [
				{
					caption : "联系电话",
					click : function ( text ) {
						location.href = "tel:" + text;
					}
				},
				{
					caption : "联系邮箱",
					click : function ( text ) {
						location.href = "mailto:" + text;
					}
				},
				{
					caption : "官方网站",
					click : function ( text ) {
						env.jump( text );
					}
				},
				{
					caption : "微信号"
				},
				{
					caption : "微博",
					click : function ( text ) {
						env.jump( "http://weibo.com/n/" + text );
					}
				}
			], function ( info, i ) {
				var paddingX = 14 * scale,
					marginX = 8 * scale,
					text = ds.text( i ),
					fontRatio = Math.max( scale, 1 );

				if ( text.toString() === "" ) {
					return;
				}

				// 框
				var frame = Component( Content.Rect( frameWidth, frameHeight ), layout );
				frame.x = p.center( frame, layout );

				// 框背景
				Component( Content.Image( frameImg, scale ), frame );

				// caption
				var caption = Component( Content.Label( info.caption + "：", {
					fontSize : 14 * fontRatio << 0,
					color : "#FFFFFF"
				} ), frame );
				caption.x = paddingX;
				caption.y = p.middle( caption, frame, true );

				// 内容
				var content = Component( Content.BlockText( text, {
					lineHeight : 16 * fontRatio << 0,
					fontSize : 12 * fontRatio << 0,
					color : "#FFFFFF",
					margin : 0,
					width : frameWidth - 2 * paddingX - marginX - caption.w,
					breakWord : true
				} ), frame );
				content.x = p.rightTo( content, caption ) + marginX;
				content.y = p.middle( content, frame, true );

				// 点击
				ui.onTap( frame.element, function () {
					info.click && info.click( text.toString() );
				} );

				items.push( frame );
			} );

			// 摆放frame
			var startY = 143 * scale,
				totalHeight = 315 * scale,
				frameNumber = items.length,
				margin = ( totalHeight - frameHeight * frameNumber ) / ( frameNumber + 1 ) << 0;

			array.foreach( items, function ( frame, i ) {
				frame.y = startY + margin * ( i + 1 ) + frameHeight * i;
			} );
		}
	};
} );
/**
 * Created by Zuobai on 2014/10/1.
 * 老图文板式
 */

plugin( function () {
	var string =library["5"],
		func =library["0"],
		array =library["1"],
		object =library["2"],

		Layout =library["19"],
		enterAnimation =library["37"],
		util =library["25"],
		Content =library["24"],
		p =library["38"],
		pageAnimation =library["40"],
		ua =library["14"],

		oldToNewRatio = 1136 / 1008,
		Layout504 = util.layout504,
		applySpeed = pageAnimation.applySpeed,
		Component = Layout.Component,
		layoutFormats = Layout.formats;

	function rgba() {
		return string.tuple( "rgba", Array.prototype.slice.call( arguments, 0 ) );
	}

	// region 背景图+透明层+文字板式
	function PureTextLayout( style ) {
		return {
			ignorePureColor : true,
			create : function ( layout, ds ) {
				var scale = layout.h / 504,
					margin = style.margin,
					lineHeight = style.lineHeight,
					fontSize = style.fontSize,
					text;

				// 背景
				Component( Content.Cover( ds.image( 0 ), layout ), layout );

				// 透明层
				var transparent = Component( Content.Rect( layout.w, layout.h, style.background ), layout );
				transparent.zi = 1;

				// 文字
				do {
					text = Component( Content.BlockText( ds.text( 0 ), {
						margin : margin * scale << 0,
						lineHeight : Math.max( lineHeight * scale << 0, 16 ),
						fontSize : Math.max( fontSize * scale << 0, 12 ),
						color : style.color,
						width : Math.min( 280 * Math.max( scale, 1 ) << 0, layout.w - 40 )
					} ) );
					margin = Math.max( margin - 1, 0 );
					lineHeight = Math.max( lineHeight - 1, 0, fontSize + 2 );
					if ( margin <= 0 || lineHeight <= fontSize + 2 ) {
						break;
					}
				}
				while ( text.h > layout.h * 0.8 );
				text.appendTo( layout );

				text.x = p.center( text, layout );
				text.y = p.middle( text, layout );
				text.zi = 2;
				text.enter = enterAnimation.Emerge();
			}
		};
	}

	// 黑色透明层
	layoutFormats.ImageText04 = PureTextLayout( {
		margin : 5,
		lineHeight : 25,
		fontSize : 15,
		color : "#FFFFFF",
		background : rgba( 0, 0, 0, 0.8 )
	} );

	// 白色透明层
	layoutFormats.ImageText07 = PureTextLayout( {
		margin : 5,
		lineHeight : 25,
		fontSize : 14,
		color : "#333333",
		background : rgba( 255, 255, 255, 0.85 )
	} );
	// endregion

	// region 相框图
	function layFrameImg( images, frameInfo, layout ) {
		// 遍历图片,分配区域,并计算入场动画
		applySpeed( array.map( images, function ( image, i ) {
			var info = frameInfo[i],
				content = Content.Cover( image, {
					w : Math.ceil( info.width * layout.xScale ) + 1,
					h : Math.ceil( info.height * layout.yScale ) + 1
				} ),
				comp = Component( content, layout );

			comp.x = info.x * layout.xScale;
			comp.y = info.y * layout.yScale;
			comp.enter = info.enter;
			return comp;
		} ), 1, 1 );
	}

	layoutFormats.MutipleImage02 = {
		resource : object.extend( {
			shadow : "mi02-shadow.png"
		}, !ua.android ? {
			grad : "mi02-grad.svg"
		} : {} ),
		create : function ( layout, ds, resource ) {
			layFrameImg( ds.image(), [
				{
					x : 25,
					y : 16 * oldToNewRatio,
					width : 280,
					height : 157 * oldToNewRatio,
					enter : enterAnimation.FlyInto( 3 )
				},
				{
					x : 25,
					y : 173 * oldToNewRatio,
					width : 280,
					height : 157 * oldToNewRatio,
					enter : enterAnimation.FlyInto( 1 )
				},
				{
					x : 25,
					y : 330 * oldToNewRatio,
					width : 280,
					height : 157 * oldToNewRatio,
					enter : enterAnimation.FlyInto( 3 )
				}
			], layout );

			// 阴影图和渐变图
			Component( Content.Image( resource.shadow, layout ), layout );
			resource.grad && Component( Content.Image( resource.grad, layout ), layout );
		}
	};

	layoutFormats.MutipleImage03 = {
		resource : {
			frame : "mi03-frame.png"
		},
		create : function ( layout, ds, resource ) {
			layFrameImg( ds.image(), [
				{
					x : 15,
					y : 15 * oldToNewRatio,
					width : 290,
					height : 231 * oldToNewRatio,
					enter : enterAnimation.FlyInto( 0 )
				},
				{
					x : 15,
					y : 250 * oldToNewRatio,
					width : 143,
					height : 239 * oldToNewRatio,
					enter : enterAnimation.FlyInto( 3 )
				},
				{
					x : 162,
					y : 250 * oldToNewRatio,
					width : 143,
					height : 239 * oldToNewRatio,
					enter : enterAnimation.FlyInto( 1 )
				}
			], layout );

			// 相框图
			Component( Content.Image( resource.frame, layout ), layout );
		}
	};
	// endregion

	// region 背景图+纯色矩形+三段文字板式
	function RectLayout( pos ) {
		return {
			ignorePureColor : true,
			create : function ( layout, ds ) {
				var color = ds.color || "#FFFFFF",
					scale = layout.yScale / 1008 * 1136,
					fontSize = [27, 16, 10],
					textTop = [22, 57, 88],
					rectHeight = 115 * scale << 0,
					rectTop, imgTop, imgBottom,
					texts = [];

				switch ( pos ) {
					case "top":
						rectTop = 0;
						imgTop = rectHeight;
						imgBottom = layout.h;
						break;
					case "middle":
						rectTop = layout.h * 0.6 << 0;
						imgTop = 0;
						imgBottom = layout.h;
						break;
					case "bottom":
						imgTop = 0;
						rectTop = imgBottom = layout.h - rectHeight;
						break;
				}

				// 图
				var img = Component( Content.Cover( ds.image( 0 ), {w : layout.w, h : imgBottom - imgTop} ), layout );
				img.y = imgTop;

				// 矩形
				var rect = Component( Content.Rect( layout.w, rectHeight, color ), layout );
				rect.y = rectTop;

				// 字
				func.loop( 3, function ( i ) {
					if ( ds.text( i ).toString() ) {
						var fs = fontSize[i] * scale << 0,
							text = Component( Content.Label( ds.text( i ), {
								fontSize : fs,
								color : color.toUpperCase() === "#FFFFFF" ? "#000000" : "#FFFFFF"
							} ), rect );

						text.x = p.center( text, layout );
						text.y = textTop[i] * scale << 0;
						text.enter = enterAnimation.Emerge();
						text.zi = 2;
						texts.push( text );
					}
				} );

				applySpeed( texts, 1, 1 );
			}
		};
	}

	layoutFormats.ImageText01 = RectLayout( "top" );
	layoutFormats.ImageText02 = RectLayout( "bottom" );
	layoutFormats.ImageText03 = RectLayout( "middle" );
	// endregion

	// 互联网分析沙龙,电商专场
	layoutFormats.ImageText05 = {
		ignorePureColor : true,
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				scale = l.scale;

			// 字
			var text = Component( Content.BlockText( ds.text( 0 ), {
				width : 157 * scale << 0,
				lineHeight : 30 * scale << 0,
				fontSize : 22 * scale << 0,
				color : "#FFFFFF",
				breakWord : true
			} ), layout );

			// 透明颜色背景
			var rect = Component( Content.Rect( text.w + 17 * scale * 2 << 0,
				Math.max( text.h + 20 * scale, 60 * scale ) << 0, rgba( 0, 0, 0, 0.85 ) ), layout );
			rect.x = p.rightIn( rect, layout );
			rect.y = p.middle( rect, layout );

			text.x = p.center( text, rect, true );
			text.y = p.middle( text, rect, true );
			text.appendTo( rect );
		}
	};

	// 国际创新峰会,三段文字依次飞入
	layoutFormats.ImageText06 = {
		ignorePureColor : true,
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				s = l.scale;

			// 透明层
			var rect = Component( Content.Rect( 250 * s, 350 * s, rgba( 0, 0, 0, 0.85 ) ), layout );
			rect.x = p.center( rect, layout );
			rect.y = p.middle( rect, layout );

			applySpeed( array.map( [35, 132, 229], function ( y, i ) {
				var text = Component( Content.BlockText( ds.text( i ), {
					width : rect.w - 2 * 17 * s,
					lineHeight : 25 * s << 0,
					fontSize : 14 * s << 0,
					color : "#FFFFFF",
					breakWord : true
				} ), rect );
				text.y = y * s << 0;
				text.x = p.center( text, rect, true );
				text.enter = enterAnimation.FlyInto( 1 );
				return text;
			} ), 1, 0.3 );
		}
	};

	// 他们特立独行
	layoutFormats.ImageText08 = {
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				text = l.image( ds.image( 1 ), layout );

			text.x = p.center( text, layout );
			text.y = l.y( 354 );
			text.enter = enterAnimation.Emerge();
		}
	};

	// 他们有一个共同的名字
	layoutFormats.ImageText09 = {
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				text = l.image( ds.image( 1 ), layout );

			text.x = p.center( text, layout );
			text.y = l.y( 289 );
			text.enter = enterAnimation.Emerge();
		}
	};

	// 有一家咖啡馆
	layoutFormats.ImageText10 = {
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				text = l.image( ds.image( 1 ), layout );

			text.x = l.x( 25 );
			text.y = l.y( 155 );
			text.enter = enterAnimation.Emerge();
		}
	};

	// 越极客,越性感
	layoutFormats.ImageText11 = {
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				text1 = l.image( ds.image( 1 ), layout ),
				text2 = l.image( ds.image( 2 ), layout );

			text1.x = p.center( text1, layout );
			text1.y = l.y( 189 );
			text2.x = p.center( text2, layout );
			text2.y = p.bottomTo( text2, text1 ) + 15 * l.scale;

			text1.enter = text2.enter = enterAnimation.Emerge();
			applySpeed( [text1, text2], 1, 1 );
		}
	};

	// 马云
	layoutFormats.ImageText12 = {
		resource : {
			mask : "im12-mask.png",
			mayun : "im12-mayun.jpg"
		},
		create : function ( layout, ds, resource ) {
			var scale = layout.yScale;

			// 马云头像和用户头像
			var mayun = Component( Content.Cover( resource.mayun, {w : layout.w / 2, h : 818 / 2 * scale} ), layout ),
				userAvatar = Component( Content.Cover( ds.image( 0 ), mayun ), layout );
			userAvatar.x = layout.w / 2;

			// 红色遮罩
			var mask = Component( Content.Cover( resource.mask, {w : layout.w, h : 200 * scale} ), layout );
			mask.y = p.bottomIn( mask, layout );

			// 文字
			var text = Component( Content.Image( ds.image( 1 ), scale ) );
			text.x = p.center( text, mask, true );
			text.y = 75 * scale;
			text.enter = enterAnimation.Emerge();
		}
	};

	// 新年大发
	layoutFormats.ImageText13 = {
		ignorePureColor : true,
		create : function ( layout, ds ) {
			var yScale = layout.yScale;

			// 背景
			Component( Content.Cover( ds.image( 0 ), layout ), layout );

			// 矩形
			var rect = Component( Content.Rect( layout.w, 248 / 2 * yScale << 0, "#FFFFFF" ), layout );
			rect.y = p.bottomIn( rect, layout );

			// 字
			var text = Component( Content.Image( ds.image( 1 ), yScale ), rect );
			text.x = p.center( text, layout );
			text.y = ( 766 - ( 1008 - 248 ) ) / 2 * yScale << 0;
			text.enter = enterAnimation.fadeIn;
		}
	};

	// 黄有维,1965年,湖南岳阳人
	layoutFormats.ImageText14 = {
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				text = l.image( ds.image( 1 ), layout );

			text.x = p.rightIn( text, layout ) - 14 * l.scale;
			text.y = l.y( 78 );
			text.enter = enterAnimation.Emerge();
		}
	};

	// 他的作品格调清新,充满阳光和朝气
	layoutFormats.ImageText15 = {
		ignorePureColor : true,
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				text1 = l.image( ds.image( 1 ) ),
				text2 = l.image( ds.image( 2 ) ),
				scale = l.scale;

			var paddingY = 40 * scale << 0,
				paddingX = 23 * scale << 0,
				margin = 15 * scale << 0;

			text1.y = paddingY;
			text2.y = p.bottomTo( text2, text1 ) + margin;

			// 透明层
			var rect = Component( Content.Rect( Math.max( text1.w, text2.w, 246 * scale ) + paddingX * 2,
				text2.y + text2.h + paddingY, rgba( 255, 255, 255, 0.9 ) ), layout );
			rect.x = p.center( rect, layout );
			rect.y = p.middle( rect, layout );

			text1.appendTo( rect );
			text1.x = paddingX;

			text2.appendTo( rect );
			text2.x = p.rightIn( text2, rect, true ) - paddingX;

			text1.enter = text2.enter = enterAnimation.Emerge();
			applySpeed( [text1, text2], 1, 1 );
		}
	};

	// 稻城亚丁
	layoutFormats.ImageText16 = {
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				text1 = l.image( ds.image( 1 ), layout ),
				text2 = l.image( ds.image( 2 ), layout ),
				scale = l.scale;

			text1.x = l.x( 324 / 2 );
			text1.y = l.y( 114 / 2 );
			text2.x = text1.x + 3 * scale;
			text2.y = p.bottomTo( text2, text1 ) + 5 * scale;
			text1.enter = text2.enter = enterAnimation.fadeIn;
			applySpeed( [text1, text2], 1, 1 );
		}
	};

	// 沙雅
	layoutFormats.ImageText17 = {
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				text1 = l.image( ds.image( 1 ), layout ),
				text2 = l.image( ds.image( 2 ), layout ),
				scale = l.scale;

			text1.x = l.x( 68 / 2 );
			text1.y = l.y( 696 / 2 );
			text2.x = text1.x + 4 * scale;
			text2.y = p.bottomTo( text2, text1 ) + 5 * scale;
			text1.enter = text2.enter = enterAnimation.fadeIn;
			applySpeed( [text1, text2], 1, 1 );
		}
	};

	function MXZS( y ) {
		return {
			create : function ( layout, ds ) {
				var l = Layout504( layout, ds.image( 0 ) ),
					text1 = l.image( ds.image( 1 ), layout ),
					text2 = l.image( ds.image( 2 ), layout ),
					text3 = l.image( ds.image( 3 ), layout ),
					scale = l.scale;

				text1.x = p.center( text1, layout );
				text2.x = p.center( text2, layout );
				text3.x = p.center( text3, layout );
				text1.y = l.y( y / 2 );
				text2.y = p.bottomTo( text2, text1 ) + 57 / 2 * scale;
				text3.y = p.bottomTo( text3, text2 ) + 12 * scale;
				text1.enter = text2.enter = text3.enter = enterAnimation.Emerge();
				applySpeed( [text1, text2, text3], 1, 1 );
			}
		};
	}

	// 莫西子诗
	layoutFormats.ImageText18 = MXZS( 231 );

	// 有那么一些人
	layoutFormats.ImageText19 = MXZS( 612 );

	// 莫西子诗乐队
	layoutFormats.ImageText20 = {
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				scale = l.scale,
				fs1 = 27 * scale << 0,
				text1 = Component( Content.Label( ds.text( 0 ), {
					fontSize : fs1,
					fontWeight : "bold",
					color : "white"
				} ), layout ),
				text2 = Component( Content.BlockText( ds.text( 1 ), {
					width : layout.w - 150,
					fontSize : 10 * scale << 0,
					lineHeight : 20 * scale << 0,
					color : "#d2d2d2"
				} ), layout );

			text1.x = p.center( text1, layout );
			text1.y = l.y( 191 / 2 );
			text2.x = p.center( text2, layout );
			text2.y = p.bottomTo( text2, text1 ) + 26 * scale;

			text1.enter = text2.enter = enterAnimation.Emerge();
			applySpeed( [text1, text2], 1, 1 );
		}
	};

	// 玛丽莲梦露,妮可基德曼
	layoutFormats.ImageText21 = layoutFormats.ImageText22 = {
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				text1 = l.image( ds.image( 1 ), layout ),
				text2 = l.image( ds.image( 2 ), layout ),
				scale = l.scale;

			text1.x = l.x( 516 / 2 );
			text1.y = l.y( 195 / 2 );
			text1.enter = enterAnimation.Emerge( 1 );
			text2.x = p.rightIn( text2, text1 );
			text2.y = p.bottomTo( text2, text1 ) + 5 * scale;
			text2.enter = enterAnimation.Emerge( 3 );
		}
	};

	// 斯嘉丽约翰逊
	layoutFormats.ImageText23 = {
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				text1 = l.image( ds.image( 1 ), layout ),
				text2 = l.image( ds.image( 2 ), layout ),
				scale = l.scale;

			text1.x = l.x( 60 / 2 );
			text1.y = l.y( 140 / 2 );
			text1.enter = enterAnimation.Emerge( 0 );
			text2.x = text1.x + 2 * scale;
			text2.y = p.bottomTo( text2, text1 ) + 5 * scale;
			text2.enter = enterAnimation.Emerge( 2 );
		}
	};

	// 安娜莫格拉莉丝
	layoutFormats.ImageText24 = {
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				text1 = l.image( ds.image( 1 ), layout ),
				text2 = l.image( ds.image( 2 ), layout ),
				scale = l.scale;

			text1.x = l.x( 82 / 2 );
			text1.y = l.y( 720 / 2 );
			text1.enter = enterAnimation.Emerge( 0 );
			text2.x = text1.x + 2 * scale;
			text2.y = p.bottomTo( text2, text1 ) + 5 * scale;
			text2.enter = enterAnimation.Emerge( 2 );
		}
	};

	// 愤怒的丘吉尔
	layoutFormats.ImageText25 = {
		ignorePureColor : true,
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				text = l.image( ds.image( 1 ), layout );

			text.x = p.center( text, layout );
			text.y = p.bottomIn( text, layout ) - 40 * l.scale;
			text.enter = enterAnimation.Emerge( 0 );
		}
	};

	// 初夜在乎你的感受,所以才用心表达
	layoutFormats.ImageText26 = {
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				text1 = l.image( ds.image( 1 ), layout ),
				text2 = l.image( ds.image( 2 ), layout );

			text1.x = 0;
			text1.y = l.y( 588 / 2 );
			text2.x = 144 / 2;
			text2.y = p.bottomTo( text2, text1 );
			text1.enter = text2.enter = enterAnimation.Emerge( 1 );
			applySpeed( [text1, text2], 1, 1 );
		}
	};

	// Happy new year 2015
	layoutFormats.ImageText27 = {
		create : function ( layout, ds ) {
			var l = Layout504( layout, ds.image( 0 ) ),
				text = l.image( ds.image( 1 ), layout );

			text.x = p.center( text, layout );
			text.y = l.y( 503 / 2 );
			text.enter = enterAnimation.Emerge();
		}
	};
	//kahn1990
	layoutFormats.ImageText29 = {
		create: function ( layout, ds ) {
			/* layout ： 屏幕相关参数 、ds ： html 页面配置参数 */
			var l = Layout504(layout, ds.image(0)),
			//p_kahn1990_img_1 = l.image(ds.image(1), layout),
				H = l.scale,
				C = 45 * H << 0;
			var z_kahn1990_arr_cache = []
			/* p.center(p_kahn1990_img_1, layout) 行居中 */
			if(ds.image() && ds.image().length>1){
				for( var i = 1; i < ds.image().length; i++){
					var kahn1990_this_imageInfo = ds.kahn1990_imageInfo(i),
						p_kahn1990_img_cache = null;
					var kahn1990_scaling_cache = (kahn1990_this_imageInfo.kahn1990_scaling_100 && kahn1990_this_imageInfo.kahn1990_scaling_100 == true)
						?layout.w*2*(kahn1990_this_imageInfo.kahn1990_scaling_baifenbi?kahn1990_this_imageInfo.kahn1990_scaling_baifenbi:1)/ds.image(i).width
						:kahn1990_this_imageInfo.kahn1990_scaling;
					p_kahn1990_img_cache = Component(
						Content.Image(
							ds.image(i),
							kahn1990_scaling_cache
						),
						layout
					);
					ds.kahn1990_imageInfo(i)
					/*C.x = p.rightIn(C, layout);
					 C.y = p.bottomTo(C, layout) + 5 * ds;*/
					if(kahn1990_this_imageInfo.kahn1990_right && kahn1990_this_imageInfo.kahn1990_right == true){
						p_kahn1990_img_cache.x = p.rightIn(p_kahn1990_img_cache, layout);
					}else if (kahn1990_this_imageInfo.kahn1990_left && kahn1990_this_imageInfo.kahn1990_left == true){
						p_kahn1990_img_cache.x = p.leftIn(p_kahn1990_img_cache, layout);
					}else if (kahn1990_this_imageInfo.kahn1990_x){
						p_kahn1990_img_cache.x = kahn1990_this_imageInfo.kahn1990_x*layout.w;
					}else{
						p_kahn1990_img_cache.x = p.center(p_kahn1990_img_cache, layout);
					};

					if (kahn1990_this_imageInfo.kahn1990_top && kahn1990_this_imageInfo.kahn1990_top == true){
						p_kahn1990_img_cache.y = p.topIn(p_kahn1990_img_cache, layout);
					}else if (kahn1990_this_imageInfo.kahn1990_y){
						p_kahn1990_img_cache.y = kahn1990_this_imageInfo.kahn1990_y*layout.h;
					}else if (kahn1990_this_imageInfo.kahn1990_bottom && kahn1990_this_imageInfo.kahn1990_bottom == true){
						p_kahn1990_img_cache.y = p.bottomIn(p_kahn1990_img_cache, layout);
					};

					if (kahn1990_this_imageInfo.kahn1990_fncb){
						p_kahn1990_img_cache.enter = kahn1990_this_imageInfo.kahn1990_fncb(enterAnimation);
					}else{
						p_kahn1990_img_cache.enter = enterAnimation.Emerge();
					};

					if(kahn1990_this_imageInfo.kahn1990_delayIf){
						p_kahn1990_img_cache.enter.kahn1990_delay = kahn1990_this_imageInfo.kahn1990_delay;
						p_kahn1990_img_cache.enter.kahn1990_delayIf = true;
					}
					z_kahn1990_arr_cache.push(p_kahn1990_img_cache);
				}
			};
			if(ds.textInfo && ds.textInfo.length>0){
				for( var i = 0; i < ds.textInfo.length; i++){

					var p_kahn1990_Label_cache = null,
						p_kahn1990_Label_fontsize_cache = null;

					if(ds.textInfo[i].kahn1990_fontsize){
						p_kahn1990_Label_fontsize_cache = ds.textInfo[i].kahn1990_fontsize;
					}else{
						p_kahn1990_Label_fontsize_cache = C;
					}

					p_kahn1990_Label_cache = Component(
						Content.Label( /* m.Label 标签模版*/
							ds.text(i),
							{fontSize: p_kahn1990_Label_fontsize_cache, fontFamily:"黑体",color: "#87D397",width:ds.textInfo[i].kahn1990_w?ds.textInfo[i].kahn1990_w:"false",kahn1990_str_lang:ds.textInfo[i].kahn1990_str_lang?ds.textInfo[i].kahn1990_str_lang:false}
						),
						layout
					);

					if(ds.textInfo[i].kahn1990_right && ds.textInfo[i].kahn1990_right == true){
						p_kahn1990_Label_cache.x = p.rightIn(p_kahn1990_Label_cache, layout);
					}else if (ds.textInfo[i].kahn1990_left && ds.textInfo[i].kahn1990_left == true){
						p_kahn1990_Label_cache.x = p.leftIn(p_kahn1990_Label_cache, layout);
					}else if (ds.textInfo[i].kahn1990_x){
						p_kahn1990_Label_cache.x = ds.textInfo[i].kahn1990_x*layout.w;
					}else{
						p_kahn1990_Label_cache.x = p.center(p_kahn1990_Label_cache, layout);
					};

					if (ds.textInfo[i].kahn1990_top && ds.textInfo[i].kahn1990_top == true){
						p_kahn1990_Label_cache.y = p.topIn(p_kahn1990_Label_cache, layout);
					}else if (ds.textInfo[i].kahn1990_y){
						p_kahn1990_Label_cache.y = ds.textInfo[i].kahn1990_y*layout.h;
					}else if (ds.textInfo[i].kahn1990_bottom && ds.textInfo[i].kahn1990_bottom == true){
						p_kahn1990_Label_cache.y = p.bottomIn(p_kahn1990_Label_cache, layout);
					};

					if (ds.textInfo[i].kahn1990_fncb){
						p_kahn1990_Label_cache.enter = ds.textInfo[i].kahn1990_fncb(enterAnimation);
					}else{
						p_kahn1990_Label_cache.enter = enterAnimation.Emerge();
					};

					if(ds.textInfo[i].kahn1990_delayIf && (ds.textInfo[i].kahn1990_delayIf == true)){
						p_kahn1990_Label_cache.enter.kahn1990_delay = ds.textInfo[i].kahn1990_delay;
						p_kahn1990_Label_cache.enter.kahn1990_delayIf = true;
					}

					//p_kahn1990_Label_cache.y = l.y(191 / 2);

					z_kahn1990_arr_cache.push(p_kahn1990_Label_cache);
				}
			};
			applySpeed(z_kahn1990_arr_cache, 1, 1);
			z_kahn1990_arr_cache = [];//销毁
		}
	}
} );
/**
 * Created by Zuobai on 2015/3/15.
 * 封装百度地图
 */

library( function () {
	var async =library["4"],
		array =library["1"],
		pointer =library["11"],
		Img =library["16"],
		$ =library["8"];

	var loadBMap = function () {
		return async.Loader( function ( done ) {
			window.bmapInit = function () {
				done();
				delete window.bmapInit;
			};

			// 加载百度地图脚本
			$( "script", {
				src : 'http://api.map.baidu.com/api?type=quick&ak=D5a271a3083d77f21c63ff307e9f60b9&v=1.0&callback=bmapInit'
			}, document.head );
		} ).load;
	}();

	// 标记物地图
	function MarkerMap( arg ) {
		loadBMap( function () {
			var oMap = $( "div", {
					css : {
						height : "100%",
						width : "100%"
					}
				}, arg.parent ),
				points = [];

			$.onInsert( oMap, function () {
				var map = new BMap.Map( oMap );

				// 添加覆盖物,点击覆盖物会弹出大厦信息
				array.foreach( arg.data, function ( item ) {
					var point = new BMap.Point( parseFloat( item.lng ), parseFloat( item.lat ) ),
						marker = new BMap.Marker( point ),
						markerIcon = new BMap.Icon( Img.staticSrc( "map-mark.png" ), new BMap.Size( 30, 30 ) );

					marker.setIcon( markerIcon );
					map.addOverlay( marker );
					points.push( point );

					if ( arg.make ) {
						var infoWindow = new BMap.InfoWindow( arg.make( item ) );
						marker.addEventListener( "click", function () {
							marker.openInfoWindow( infoWindow );
						} );
					}
				} );

				// 初始化地图，设置中心点坐标和地图级别
				if ( points.length !== 0 ) {
					map.centerAndZoom( points[0], 16 );
					map.setViewport( points );
				}
				else {
					map.centerAndZoom( "北京市" );
				}
			} );

			arg.onLoad && arg.onLoad();
		} );
	}

	library["64"].MarkerMap = MarkerMap;
} );

/**
 * Created by 白 on 2015/3/18.
 */

plugin( function () {
	var $ =library["8"],
		css =library["6"],
		tips =library["29"],
		bmap =library["64"],
		csa =library["10"],
		Img =library["16"],
		env =library["27"],
		Layout =library["19"],
		Content =library["24"],
		ui =library["26"],
		util =library["25"],
		p =library["38"],
		Component = Layout.Component,
		layoutFormats = Layout.formats;

	css.insertRules( {
		".BMap_Marker img" : {
			width : "100%"
		}
	} );

	layoutFormats.map = {
		resource : {
			location : "map/location"
		},
		create : function ( layout, ds, resource ) {
			var l = util.layout504( layout, ds.image( 0 ) );

			var icon = l.image( resource.location, layout );
			icon.x = p.center( icon, layout );
			icon.y = l.y( 574 / 2 );

			var address = Component( Content.Label( ds.location( 0 ).address, {
				lineHeight : 14 * l.scale << 0,
				fontSize : 12 * l.scale << 0,
				color : "#FFFFFF"
			} ), layout );
			address.x = p.center( address, layout );
			address.y = l.y( 680 / 2 );

			// 地图图标闪烁
			layout.onShow( function () {
				csa.runAnimation( [icon.element, {
					"50" : {
						opacity : 0.4
					}
				}, 3, "linear", "infinite"] );
			} );

			var click = Component( Content.Rect( 120 * l.scale, 100 * l.scale ), layout );
			click.x = p.center( click, layout );
			click.y = l.y( ( 574 - 20 ) / 2 );

			// 点击地图图标,弹出地图页
			var slidePage;
			ui.onTap( click.element, function () {
				// 如果没有地图页,创建它
				if ( !slidePage ) {
					slidePage = $( env.SlidePage(), {
						css : {
							background : "white"
						}
					} );

					var back = slidePage.appendChild( $( "div", {
							css : {
								position : "absolute",
								left : "10px",
								top : "10px",
								width : "143px",
								height : "38px",
								"background-color" : "rgba(0, 0, 0, 0.8)",
								"box-shadow" : "0 0 1px 0 rgba(0, 0, 0, 0.6)",
								"z-index" : "1000"
							},
							children : [$( "div",
								{
									css : {
										position : "absolute",
										width : "49px",
										left : "0",
										top : "0",
										bottom : "0"
									},
									children : [$( util.staticCenter( Img.Icon( "map/back" ) ) )]
								} ), $( "div", {
								css : {
									position : "absolute",
									left : "49px",
									width : "1px",
									top : "0",
									bottom : "0",
									"background-color" : "#000",
									"box-shadow" : "1px 0 rgba(113, 113, 113, .75)"
								}
							} ), $( "div", {
								css : {
									position : "absolute",
									left : "50px",
									right : "0",
									top : "0",
									bottom : "0",
									color : "#e7e7e7",
									"text-align" : "center",
									"line-height" : "38px",
									"font-size" : "16px",
									"letter-spacing" : "2px"
								},
								innerHTML : "地图"
							} )]
						} ) ),
						loading = tips.Loading( slidePage );

					ui.onTap( back, function () {
						slidePage.slideOut();
					} );

					bmap.MarkerMap( {
						data : ds.location(),
						parent : slidePage,
						make : function ( item ) {
							return $( "div", [
								$( "div", {
									css : {
										"font-size" : "16px",
										"font-weight" : "bold",
										"line-height" : "22px",
										"padding-bottom" : "6px",
										width : "220px"
									},
									innerHTML : item.name
								} ),
								$( "div", {
									css : {
										"font-size" : "12px"
									},
									children : [
										$( "div", {
											css : {
												display : "inline-block",
												"vertical-align" : "top"
											},
											innerHTML : "地址:"
										} ),
										$( "div", {
											css : {
												display : "inline-block",
												width : "184px",
												"margin-left" : "5px",
												"vertical-align" : "top"
											},
											innerHTML : item.address
										} )
									]
								} )
							] );
						},
						onLoad : function () {
							$.remove( loading );
						}
					} );
				}

				slidePage.slideIn( layout.body );
			} );
		}
	};
} );
/**
 * Created by 白 on 2015/5/11.
 */

plugin( function () {
	var func =library["0"],
		css =library["6"],
		$ =library["8"],
		Layout =library["19"],
		Component = Layout.Component,
		layoutFormats = Layout.formats,
		Content =library["24"],
		p =library["38"],
		ua =library["14"],
		Img =library["16"];

	function Y( designY, designHeight, designParentHeight, parentHeight, currentHeight ) {
		return parentHeight * ( designY + designHeight / 2 ) / designParentHeight - currentHeight / 2;
	}

	layoutFormats.qrcode = {
		crossOrigin : true,
		resource : {
			fingerprint : "qrcode-fingerprint.png",
			frame : "qrcode-frame.png"
		},
		create : function ( layout, ds, resource, context ) {
			Component( Content.Cover( ds.image( 0 ), layout ), layout );

			// 框
			var frame = Component( Content.Rect( 554 / 2, 606 / 2 ), layout );
			frame.x = p.center( frame, layout );
			frame.y = Y( 192 / 2, frame.h, 568, layout.h, frame.h );

			Component( Content.Image( resource.frame, frame ), frame );
			var title = Component( Content.Image( ds.image( 1 ), 1 ), frame );
			title.x = p.center( title, frame, true );
			title.y = Y( 32.5, 104 / 2, frame.h, frame.h, title.h );

			var canvas = Img.Canvas( 486 / 2, 277 / 2 ),
				gc = canvas.context;

			gc.drawImage( ds.image( 2 ), 0, 0, 275 / 2, 275 / 2 );
			gc.drawImage( resource.fingerprint, 166, 1, 155 / 2, 275 / 2 );

			var qrContent = Component( Content.Canvas( canvas ), frame );
			qrContent.x = 19;
			qrContent.y = 127;

			layout.onShow( function () {
				var img = context.img;
				func.callWith( function ( append ) {
					if ( img ) {
						append();
					}
					else {
						img = $( "img", {
							classList : ua.android ? "need-default" : [],
							css : {
								position : "absolute",
								"z-index" : 1000,
								left : css.px( qrContent.x ),
								top : css.px( qrContent.y ),
								width : css.px( qrContent.w ),
								"padding-bottom" : ua.android ? "0" : "64px"
							}
						} );
						img.onload = function () {
							context.img = img;
							img.onload = null;
							append();
						};
						img.src = canvas.toDataURL();
						css.transform( img, "translateZ(100000px)" );
						css( img, "pointer-events", "auto" )
					}
				}, function () {
					css( qrContent.element, "visibility", "hidden" );
					frame.element.appendChild( img );
				} );
			} );
		}
	};
} );
/**
 * Created by 白 on 2015/3/27.
 * 金酸梅板式
 */

plugin( function () {
	var array =library["1"],
		object =library["2"],
		Content =library["24"],
		p =library["38"],
		ea =library["37"],
		Layout =library["19"],
		Component = Layout.Component,
		layoutFormats = Layout.formats;

	function Razzies( isSingle ) {
		return {
			resource : {
				background : isSingle ? "razzies-single.png" : "razzies-double.png",
				bannerLeft : "razzies/banner-left",
				bannerCenter : "razzies/banner-center",
				bannerRight : "razzies/banner-right",
				cup : "razzies-cup.png"
			},
			create : function ( layout, ds, resource ) {
				var scale = layout.yScale / 1008 * 1136;

				function setPosition( comp, x, y ) {
					comp.y = y * scale;
					comp.x = ( x - 160 ) * scale + layout.w / 2;
					return comp;
				}

				// 头像
				var headSize = 104 * scale;
				if ( isSingle ) {
					setPosition( Component( Content.Cover( ds.image( 0 ), {w : headSize, h : headSize} ), layout ), 108, 41 );
				}
				else {
					setPosition( Component( Content.Cover( ds.image( 0 ), {w : headSize, h : headSize} ), layout ), 56, 41 );
					setPosition( Component( Content.Cover( ds.image( 1 ), {w : headSize, h : headSize} ), layout ), 161, 41 );
				}

				// 背景
				var background = Component( Content.Image( resource.background, scale ), layout );
				background.x = p.center( background, layout );

				// 横幅
				var bannerText = Component( Content.Label( ds.text( 0 ), {
						fontSize : 15 * scale << 0,
						color : "#fdf1c8"
					} ) ),
					bannerLeft = Component( Content.Image( resource.bannerLeft, scale ) ),
					banner = Component( Content.Rect( bannerText.w + 50 * scale << 0, bannerLeft.h ), layout ),
					bannerRight = Component( Content.Image( resource.bannerRight, scale ) ),
					bannerCenter = Component( Content.Image( resource.bannerCenter, {
						w : banner.w - bannerLeft.w * 2 + 8,
						h : bannerLeft.h
					} ) );

				array.foreach( [bannerLeft, bannerRight, bannerCenter, bannerText], function ( comp ) {
					comp.appendTo( banner );
				} );

				bannerRight.x = p.rightIn( bannerRight, banner, true );
				bannerCenter.x = p.center( bannerCenter, banner, true );
				bannerText.x = p.center( bannerText, banner, true );
				bannerText.y = ( 30 * scale - bannerText.h ) / 2 << 0;
				banner.x = p.center( banner, layout );
				banner.y = 153 * scale;

				// 奖杯和获奖文字
				var awardText = Component( Content.BlockText( ds.text( 1 ), {
					width : 250 * scale,
					lineHeight : 20 * scale << 0,
					fontSize : 12 * Math.max( scale, 1 ) << 0,
					color : "#fdf1c9"
				} ), layout );
				awardText.x = p.center( awardText, layout );
				awardText.y = 200 * scale;

				var cup = Component( Content.Image( resource.cup, scale ) ),
					cupFrame = setPosition( Component( Content.Rect( cup.w, cup.h ), layout ), 132 / 2, 566 / 2 ),
					cupCaption = Component( Content.Rect( 85 * scale, 37 * scale ), cupFrame );

				cup.appendTo( cupFrame );
				cupCaption.zi = 1;
				cupCaption.x = p.center( cupCaption, cupFrame, true ) - 1;
				cupCaption.y = 129 * scale;

				var awardName = ds.text( 2 ).toString().split( "\n" ),
					cupCationInfo = {
						fontSize : 15 * scale,
						color : "#40234a"
					};

				function CupCaption( i, y ) {
					var comp = Component( Content.Label( awardName[i], cupCationInfo ), cupCaption );
					comp.x = p.center( comp, cupCaption, true );
					comp.y = y === undefined ? p.middle( comp, cupCaption, true ) : y;
				}

				if ( awardName.length === 1 ) {
					CupCaption( 0 );
				}
				else {
					CupCaption( 0, 0 );
					CupCaption( 1, 20 * scale );
				}

				banner.enter = ea.fallDownAndShake;
				awardText.ea = ea.Emerge();
				awardText.ea.delay = 1;
				cupFrame.ea = ea.shrink;
				cupFrame.ea.delay = 2.3;
			}
		};
	}

	layoutFormats["razzies-single"] = Razzies( true );
	layoutFormats["razzies-double"] = Razzies( false );
} );
/**
 * Created by 白 on 2014/11/3.
 * 刮刮卡板式
 */

plugin( function () {
	var array =library["1"],
		$ =library["8"],
		css =library["6"],
		csa =library["10"],
		animation =library["32"],
		pointer =library["11"],
		tips =library["29"],
		Transform =library["23"],
		Layout =library["19"],
		Component = Layout.Component,
		layoutFormats = Layout.formats,
		Content =library["24"],
		ua =library["14"],
		ui =library["26"],
		Img =library["16"];

	layoutFormats["scratch-card"] = {
		crossOrigin : true,
		create : function ( layout, ds, context ) {
			var cover504 = Transform.cover504( layout ),
				cw = layout.w,
				ch = layout.h,
				backImage = ds.image( 0 ),
				coverImage = ds.image( 1 ),
				canvas = Img.Canvas( cw, ch );

			function TransformCover( img ) {
				return Transform( {
					s : {w : img.fullWidth, h : img.fullHeight},
					d : layout,
					scale : Transform.scale.cover
				} );
			}

			Transform.drawImage( canvas.context, backImage, TransformCover( backImage ) );

			// 源图
			Component( Content.Canvas( canvas ), layout );

			// 刮图
			if ( !context.complete ) {
				var scratchTransform = TransformCover( coverImage ),
					scratchLayer = Img.Canvas( cw, ch ),
					gc = scratchLayer.context;

				Transform.drawImage( gc, coverImage, scratchTransform );
				Component( Content.Canvas( scratchLayer ), layout );

				layout.onShow( function () {
					var scratchTips = tips.Scratch( layout.element ),
						tipsHide = tips.hide();

					$( scratchLayer, {
						css : {
							position : "absolute",
							left : 0,
							top : 0,
							"z-index" : 1000,
							transform : "translateZ(10001px)"
						}
					}, layout.element );

					var line = [],
						pointerHandle = ui.onSwipeStart( scratchLayer, function ( event ) {
							var points = [], isIn = true;
							line.push( points );

							ui.preventDrag = true;

							points.push( {
								x : event.x,
								y : event.y
							} );

							pointer.onMoveUp( {
								onMove : function ( event ) {
									$.remove( scratchTips );
									points.push( {
										x : event.x,
										y : event.y
									} );
								},
								onUp : function () {
									isIn = false;
								}
							} );

							// 动画循环
							var animateHandle = animation.requestFrame( function () {
								Transform.drawImage( gc, coverImage, scratchTransform );
								gc.save();
								gc.lineCap = "round";
								gc.lineJoin = "round";

								gc.globalCompositeOperation = "destination-out";
								gc.beginPath();

								array.foreach( line, function ( points ) {
									array.foreach( points, function ( point, i ) {
										i === 0 ? gc.moveTo( point.x, point.y ) : gc.lineTo( point.x, point.y );
									} );

									gc.lineWidth = 50 * cover504.scale;
									if ( ua.android ) {
										scratchLayer.style.display = 'none';
										//noinspection BadExpressionStatementJS
										scratchLayer.offsetHeight;
										scratchLayer.style.display = 'inherit';
									}
									gc.stroke();
								} );
								gc.restore();

								if ( !isIn ) {
									var error = false;
									animateHandle.remove();

									try {
										// 抬起时判断是否划过了30%,划过后移除刮刮卡效果
										var imgData = gc.getImageData( 0, 0, scratchLayer.width, scratchLayer.height ),
											pixels = imgData.data, count = 0;

										for ( var i = 0, j = pixels.length; i < j; i += 4 ) {
											if ( pixels[i + 3] < 128 ) {
												++count;
											}
										}
									}
									catch ( e ) {
										error = true;
									}

									if ( error || count / ( pixels.length / 4 ) > 0.3 ) {
										pointerHandle.remove();

										// 淡出动画
										csa.runAnimation( [scratchLayer, {
											100 : {
												opacity : 0
											}
										}, 0.8], function () {
											// 移除层
											tipsHide.remove();
											context.complete = true;
											$.remove( scratchLayer );
										} );
									}
								}
							} );
						} );

					layout.onRemove( function () {
						tipsHide.remove();
						$.remove( scratchTips );
					} );
				} );
			}
		}
	};
} );
/**
 * Created by 白 on 2015/7/17.
 * 存储
 */

library( function () {
	var object =library["2"],
		items = JSON.parse( localStorage.getItem( "cookie" ) || "{}" );

	// 根据过期时间,清理cookie
	object.foreach( items, function ( key, value ) {
		if ( value.expires < new Date() ) {
			delete items[key];
		}
	} );

	// 保存cookie
	function save() {
		localStorage.setItem( "cookie", JSON.stringify( items ) );
	}

	save();

	library["65"] = {
		getItem : function ( key ) {
			return items[key] ? items[key].value : null;
		},
		setItem : function ( key, value, timeToExpires ) {
			items[key] = {
				value : value,
				expires : ( new Date() ).getTime() + timeToExpires * 1000
			};
			save();
		}
	};
} );
/**
 * Created by 白 on 2014/9/15.
 * 按钮相关板式
 */

plugin( function () {
	var array =library["1"],
		$ =library["8"],
		async =library["4"],
		object =library["2"],
		pointer =library["11"],
		css =library["6"],
		ajax =library["13"],
		URL =library["9"],

		storage =library["65"],
		Img =library["16"],
		env =library["27"],
		main =library["42"],
		tips =library["29"],
		ua =library["14"],
		ui =library["26"],
		util =library["25"],
		Layout =library["19"],
		Content =library["24"],
		p =library["38"],
		Component = Layout.Component,
		layoutFormats = Layout.formats,

		href = URL( location.href ),
		userInfo = null,
		SignupSystem = {},
		token,
		getUserInfo;

	// 调用初夜接口
	function invokeApi( op ) {
		return ajax( {
			method : "post",
			url : URL.concatArg( "http://c.cloud7.com.cn" + op.url, token ? {
				_token : token
			} : {} ),
			data : object.is.String( op.data ) ? op.data : URL.encodeObject( op.data ),
			headers : object.extend( {
				"Accept" : "application/json",
				"Content-Type" : "application/x-www-form-urlencoded"
			}, op.headers || {} )
		}, function ( err, xhr ) {
			var data = JSON.parse( xhr.responseText );
			if ( data.code === 302 ) {
				op.on302 && op.on302( data.data );
			}
			else {
				op.success( data.data );
			}
		} );
	}

	if ( !ua.MicroMessenger ) {
		SignupSystem.canNotLogin = function () {
			alert( "请在微信中使用" );
		};

		SignupSystem.isLogIn = function () {
			return false;
		};
	}
	else {
		// 如果参数中有token,说明刚登陆完
		if ( token = href.arg._token ) {
			storage.setItem( "token", token, 7 * 24 * 60 * 60 );

			// 获取用户信息
			getUserInfo = function ( callback ) {
				if ( userInfo ) {
					callback( userInfo );
				}
				else {
					invokeApi( {
						url : "/api/Wechat/CurrentUser",
						success : function ( data ) {
							callback( userInfo = data );
						}
					} );
				}
			};

			SignupSystem.isLogIn = function () {
				return true;
			};
		}
		// 否则从localStorage中获取值,此值可能过期,用getUserInfo来确保它已登陆上
		else {
			token = storage.getItem( "token" );

			// 获取用户信息
			getUserInfo = function ( callback ) {
				callback( userInfo );
			};

			SignupSystem.isLogIn = function () {
				return userInfo !== null;
			};

			// 如果有token,立即发起一次获取CurrentUser的请求,以判断是否过期
			if ( token ) {
				var on302 = null,
					onSuccess = null;

				invokeApi( {
					url : "/api/Wechat/CurrentUser",
					on302 : function ( url ) {
						on302 && on302( url );

						SignupSystem.logIn = function () {
							invokeApi( {
								url : "/api/Wechat/CurrentUser",
								on302 : env.jump
							} );
						};
					},
					success : function ( data ) {
						userInfo = data;
						onSuccess && onSuccess();
					}
				} );

				SignupSystem.logIn = function ( arg ) {
					if ( userInfo ) {
						arg.onLogIn();
					}
					else {
						on302 = env.jump;
						onSuccess = arg.onLogIn;
					}
				};
			}
			// 如果没有token,login就是直接跳转
			else {
				SignupSystem.logIn = function () {
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9d492ee399e6a24c&redirect_uri=' +
						encodeURIComponent( 'http://c.cloud7.com.cn/Auth?returnUrl=' +
							encodeURIComponent( location.href ) ) +
						'&response_type=code&scope=snsapi_base&state=#wechat_redirect';
				};
			}
		}
	}

	layoutFormats["Sign-Up02"] = {
		create : function ( layout, ds ) {
			var l = util.layout504( layout, ds.image( 0 ) ),
				yList = {
					top : 148,
					middle : 417,
					bottom : 687
				},
				buttonSize = 125 * l.scale << 0;

			var button = Component( Content.Rect( buttonSize, buttonSize ), layout );
			button.x = p.center( button, layout );
			button.y = l.y( yList[ds.position( 0 )] / 2 );

			ui.onTap( button.element, function () {
				env.jump( ds.actionlinks( 0 ) );
			} );
		}
	};

	// 报名表单页
	var signUpPage = env.registLoginPage( "sign-up", SignupSystem, function ( page, formInfo ) {
		var formTemplate = formInfo.template, // 表单模板
			pageContent = $( "div", {
				css : {
					padding : "0 25px"
				},
				children : [$( "div", {
					css : {
						color : "#99a2a7",
						"font-size" : "12px",
						"line-height" : "12px",
						"margin-top" : "27px"
					},
					innerHTML : "'请您填写报名表单，谢谢您的参与！'"
				} )]
			}, page ), // 报名页的内容部分
			form = $( "form", {
				action : "/"
			}, pageContent ),
			curFocus = null,
			lastInput = null,
			inputList = [], // 输入列表
			hideField = {}; // 隐藏字段

		$( Img.Icon( "signup/close" ), {
			css : {
				position : "absolute",
				right : "7px",
				top : "7px"
			}
		}, page );

		ui.onTap( $( "div", {
			css : {
				position : "absolute",
				right : 0,
				top : 0,
				width : "50px",
				height : "50px"
			}
		}, page ), function () {
			page.slideOut();
		} );

		css( page, {
			background : "rgba(255, 255, 255, 0.96)"
		} );

		page.classList.add( "scroll" );
		page.classList.add( "need-default" );

		// 提交表单
		function submit() {
			var formData = [], unfilled = [];
			curFocus && curFocus.blur();

			function pushField( component, value ) {
				formData.push( {
					name : component.name,
					label : component.label,
					value : value
				} );
			}

			// 收集输入字段
			var errors = [];
			array.foreach( inputList, function ( item ) {
				var value = item.input.value;
				// 如果是必填字段,检查是否为空,若为空,添加到未填数组中
				if ( item.data.required ) {
					if ( value === "" ) {
						unfilled.push( item.data.label );
						item.input.toState( "error" );
					}
					else {
						var validateInfo = item.validate ? item.validate( value ) : null;
						if ( validateInfo ) {
							errors.push( validateInfo );
							item.input.toState( "error" );
						}
						else {
							pushField( item.data, value );
							item.input.toState( "normal" );
						}
					}
				}
				else {
					pushField( item.data, item.input.value );
				}
			} );

			// 如果未填数组不为空,提示
			if ( unfilled.length !== 0 || errors.length !== 0 ) {
				alert( ( unfilled.length ? [unfilled.join( "，" ) + "不能为空。"] : [] ).concat( errors ).join( "<br>" ) );
			}
			else {
				var task = [],
					loading = tips.Loading( page ),
					userInfo = {};

				ui.Lock( pageContent );

				// 如果用户登录了,收集用户信息
				if ( SignupSystem.isLogIn() ) {
					task.push( function ( loadDone ) {
						getUserInfo( function ( data ) {
							userInfo = data;
							loadDone();
						} );
					} );
				}

				// 收集完信息后,整理数据,提交表单
				async.concurrency( task, function () {
					var hideData = {
						"报名时间" : new Date().getTime(),
						"微信昵称" : userInfo.NickName,
						"微信头像" : userInfo.HeadPhoto,
						"微信性别" : userInfo.Sex,
						"微信City" : userInfo.City,
						"微信Province" : userInfo.Province,
						"微信Country" : userInfo.Country
					};

					object.foreach( hideField, function ( name, item ) {
						pushField( item, hideData[name] === undefined ? "" : hideData[name] );
					} );

					// 发送提交表单请求
					ajax( {
						url : virtualPath + "/Integra/SaveData",
						method : "post",
						headers : {
							"Content-Type" : "application/x-www-form-urlencoded"
						},
						data : URL.encodeObject( {
							formid : formInfo.formId,
							data : JSON.stringify( formData )
						} )
					}, function () {
						$.remove( loading );

						// 弹出提示,1秒后移除页面
						alert( formTemplate.data.submitComplete.value );
						setTimeout( function () {
							if ( page.isIn ) {
								page.slideOut();
							}
						}, 1000 );
					} );
				} );
			}
		}

		$.bind( form, "submit", function ( event ) {
			event.preventDefault();
		} );

		array.foreach( formTemplate.data.component, function ( component ) {
			if ( component.enable ) {
				if ( component.visiable ) {
					// 显示字段
					switch ( component.name ) {
						case "textbox":
							// 文本框
							(function () {
								var wrapper = {},
									label = $( "label", {
										css : {
											position : "relative",
											"margin-bottom" : "13px",
											"margin-top" : form.firstElementChild ? "13px" : "21px",
											display : "block"
										}
									}, form ),
									caption = wrapper.caption = $( "div", {
										css : {
											"font-size" : "15px",
											"line-height" : "15px",
											color : "#4f5356"
										},
										innerHTML : component.label + "："
									}, label ), // 字段名
									input = wrapper.input = $.State( $( "input", {
										css : {
											height : "39px",
											"margin-top" : "6px",
											"font-size" : "15px",
											"line-height" : "37px",
											width : "100%",
											padding : "0 9px",
											"box-sizing" : "border-box",
											background : "transparent"
										},
										placeholder : component.placeholder,
										name : component.id
									}, label ), {
										normal : {
											border : "1px solid #4f5356"
										},
										error : {
											border : "1px solid #FC7A89"
										}
									}, "normal" );

								switch ( component.label ) {
									case "电话":
										input.type = "tel";
										break;
									case "邮箱":
										input.type = "email";
										wrapper.validate = function ( value ) {
											return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( value ) ?
												null : "请输入正确的邮箱地址";
										};
										break;
								}

								// 获得焦点时,更新curFocus
								$.bind( input, "focus", function () {
									curFocus = input;
								} );

								// 如果是必填的,添加一个必填字段坐标
								if ( component.required ) {
									$( Img.Icon( "signup/star" ), {
										css : {
											display : "inline-block",
											width : "5px",
											height : "5px",
											"vertical-align" : "top"
										}
									}, caption );
								}

								// 如果有上一个input,按回车时更新到此焦点
								if ( lastInput ) {
									$.bind( lastInput, "keypress", function ( event ) {
										if ( event.keyCode === 13 ) {
											input.focus();
										}
									} );
								}

								lastInput = input;
								wrapper.data = component;
								inputList.push( wrapper );
							})();
							break;
						case "btn":
							// 按钮,目前一律视为提交按钮
							ui.onTap( $( "div", {
								css : {
									width : "115px",
									height : "38px",
									"line-height" : "38px",
									"font-size" : "15px",
									margin : "0 auto",
									background : "#FA6143",
									color : "white",
									"text-align" : "center",
									"border-radius" : "3px"
								},
								innerHTML : component.value
							}, $( "div", {
								css : {
									margin : "21px 0 13px 0"
								}
							}, form ) ), submit );
							break;
					}
				}
				else {
					hideField[component.label] = component;
				}
			}
		} );

		if ( lastInput ) {
			$.bind( lastInput, "keypress", function ( event ) {
				if ( event.keyCode === 13 ) {
					submit();
				}
			} );
		}
	} );

	layoutFormats["Sign-Up03"] = {
		create : function ( layout, ds ) {
			var l = util.layout504( layout, ds.image( 0 ) ),
				signup = object.extend( ds.signup, {} ),
				button = l.image( ds.image( 1 ), layout );

			button.x = p.center( button, layout );
			button.y = l.y( 208 );

			signup.template = JSON.parse( signup.template );

			ui.onTap( button.element, function () {
				signUpPage( {
					data : signup,
					noLog : !signup.template.allowAnymous,
					parent : layout.body
				} );
			} );
		}
	};
} );
/**
 * Created by 白 on 2014/10/17.
 * 视频板式
 */

plugin( function () {
	var $ =library["8"],
		css =library["6"],
		pointer =library["11"],
		csa =library["10"],

		tips =library["29"],
		Img =library["16"],
		env =library["27"],
		Layout =library["19"],
		Content =library["24"],
		ui =library["26"],
		util =library["25"],
		p =library["38"],
		Component = Layout.Component,
		layoutFormats = Layout.formats;

	layoutFormats.video = {
		resource : {
			play : "video/play"
		},
		create : function ( layout, ds, resource ) {
			var l = util.layout504( layout, ds.image( 0 ) ),
				src = ds.video( 0 ),
				icon = l.image( resource.play, layout ),
				circle = Component( Content.Circle( icon.w / 2, "#FFFFFF" ), layout );

			circle.x = icon.x = p.center( icon, layout );
			circle.y = icon.y = icon.y = l.y( 436 / 2 );
			circle.visible = false;
			icon.zi = 1;

			layout.onShow( function () {
				circle.visible = true;
				csa.runAnimation( [circle.element, {
					0 : {
						opacity : 0.8
					},
					100 : {
						transform : css.scale( 2 ),
						opacity : 0
					}
				}, 2.5, "infinite"] );
			} );

			layout.onRemove( function () {
				circle.visible = false;
			} );

			ui.onTap( icon.element, function () {
				// 构建视频页,尝试识别iframe
				var slidePage, iframe;

				// 如果识别出了iframe,创建滑页
				if ( iframe = $( "div", src ).querySelector( "iframe" ) ) {
					slidePage = $( env.SlidePage(), {
						css : {
							background : "black"
						}
					} );

					// 滑入滑出时关闭音乐
					slidePage.onSlideIn( window.stopAudio );
					slidePage.onSlideOut( window.playAudio );

					iframe.width = layout.w;
					iframe.height = layout.w / 16 * 9 << 0;

					css( iframe, {
						position : "absolute",
						left : 0,
						top : css.px( ( layout.h - iframe.height ) / 2 << 0 )
					} );

					var loading = tips.Loading( slidePage );
					iframe.onload = function () {
						$.remove( loading );
						iframe.onload = null;
					};
					slidePage.appendChild( iframe );
					ui.onTap( $( "div", {
						css : {
							"position" : "absolute",
							"right" : "0",
							"top" : "0",
							"width" : "60px",
							"height" : "60px"
						},
						children : [util.staticCenter( Img.Icon( "video/close" ) )]
					}, slidePage ), function () {
						slidePage.slideOut();
					} );
				}

				if ( slidePage ) {
					slidePage.slideIn( layout.body );
				}
				else if ( /(^http:\/\/)|(^https:\/\/)/.test( src ) ) {
					env.jump( src );
				}
				else {
					ui.alert( "未识别的视频地址" );
				}
			} );
		}
	};
} );

	main(function () {
		library["42"]()
	})
})();
