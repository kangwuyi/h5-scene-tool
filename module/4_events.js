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