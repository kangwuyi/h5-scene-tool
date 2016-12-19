_.event = {
    LinkedList: function () {
        var head = null, tail = null;

        function remove(node) {
            if (node.inserted === true) {
                node.previous ? node.previous.next = node.next : head = node.next;
                node.next ? node.next.previous = node.previous : tail = node.previous;
                node.inserted = false;
            }
        }

        return {
            head: function () {
                return head;
            },
            tail: function () {
                return tail;
            },
            insert: function (tarNode, refNode) {
                if (tarNode === refNode) {
                    return;
                }
                remove(tarNode);
                var previous = refNode ? refNode.previous : tail;
                tarNode.next = refNode;
                tarNode.previous = previous;
                previous ? previous.next = tarNode : head = tarNode;
                refNode ? refNode.previous = tarNode : tail = tarNode;
                tarNode.inserted = true;
                return tarNode;
            },
            remove: remove
        };
    },
    LinkedListForeach: function (list, func) {
        var retVal;
        for (var cur = list.head(); cur !== null; cur = cur.next) {
            if (( retVal = func(cur) ) !== undefined) {
                return retVal;
            }
        }
    },
    LinkedListIterate: function (begin, arg2, arg3, arg4) {
        var end, block, reverse, cur, retVal;
        if (_.isFunction(arg2)) {
            end = null;
            block = arg2;
            reverse = arg3;
        }
        else {
            end = arg2;
            block = arg3;
            reverse = arg4;
        }

        for (cur = begin; cur !== end; cur = reverse ? cur.previous : cur.next) {
            if (( retVal = block(cur) ) !== undefined) {
                return retVal;
            }
        }
    },
    // 事件,使用regist注册任务,在trig时会触发
    Event: function () {
        var events = this.LinkedList();

        return {
            trig: function () {
                for (var cur = events.head(); cur !== null; cur = cur.next) {
                    cur.apply(null, arguments);
                }
            },
            regist: function (response) {
                var node = events.insert(response, null);
                return {
                    func: response,
                    remove: function () {
                        events.remove(node);
                    }
                };
            }
        };
    },

// 并发执行多个任务,在所有任务完成后回调
    concurrency: function (tasks, callback) {
        var count = tasks.length;
        count === 0 ? callback && callback() : _.each(tasks, function (task) {
            task(function () {
                --count === 0 && callback && callback();
            });
        });
    },

// 等待者
    Waiter: function (task) {
        var completeEvent = this.Event();

        task(function () {
            if (completeEvent) {
                completeEvent.trig();
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
            cancel: function () {
                completeEvent = null;
            }
        };
    },

// 加载者,调用时加载,仅加载一次
    Loader: function (loadFunc) {
        var waiter,
            _that = this;

        return {
            load: function (callback) {
                if (!waiter) {
                    waiter = _that.Waiter(loadFunc);
                }

                return waiter.onComplete(callback);
            }
        };
    },

// 日程
    Schedule: function () {
        var task = null, start = false;

        return {
            prepare: function (target) {
                task = target;
                start && task();
            },
            start: function () {
                task && task();
                start = true;
            }
        };
    }
};