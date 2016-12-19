_.element = {
    element: function (arg1, arg2, arg3) {
        var el, elementArg = {}, parent = arg3;

        // 如果是<div></div>这种形式,直接制作成元素
        if (_.isString(arg1)) {
            if (arg1.charAt(0) === "<") {
                el = document.createElement("div");
                el.innerHTML = arg1;
                el = el.firstElementChild;
            }
            // 否则是div.class1.class2#id这种形式
            else {
                var classIdReg = /([.#][^.#]*)/g, classId;
                el = document.createElement(arg1.split(/[#.]/)[0]);
                while (classId = classIdReg.exec(arg1)) {
                    classId = classId[0];
                    classId.charAt(0) === "#" ? el.id = classId.substring(1) : el.classList.add(classId.substring(1));
                }
            }
        }
        else {
            el = arg1;
        }

        // 参数2是字符串,作为innerHTML
        if (_.isString(arg2)) {
            el.innerHTML = arg2;
        }
        // 是对象的话,每个字段处理
        else if (!_.isArray(arg2) && _.isObject(arg2)) {
            elementArg = arg2;
        }
        // 如果是数组,视为子元素
        else if (_.isArray(arg2)) {
            elementArg.children = arg2;
        }
        // 否则视为父元素
        else {
            parent = arg2;
        }

        elementArg && _.each(elementArg, function (value, key) {
            if (value !== undefined) {
                switch (key) {
                    case "classList":
                        if (_.isString(value)) {
                            el.classList.add(value);
                        }
                        else if (_.isArray(value)) {
                            _.each(value, function (className) {
                                el.classList.add(className);
                            });
                        }
                        break;
                    case "css":
                        _.css(el, value);
                        break;
                    case "children":
                        if (_.isArray(value)) {
                            _.each(value, function (node) {
                                el.appendChild(node);
                            });
                        }
                        else {
                            el.appendChild(value);
                        }
                        break;
                    default:
                        if (key.substring(0, 5) === "data-") {
                            el.setAttribute(key, value);
                        }
                        else {
                            el[key] = value;
                        }
                        break;
                }
            }
        });

        parent && parent.appendChild(el);
        return el;
    },

// 绑定事件
    bind: function (el, eventType, response, isCapture) {
        var remove;

        if (el.addEventListener) {
            el.addEventListener(eventType, response, isCapture || false);
            remove = function () {
                el.removeEventListener(eventType, response, isCapture || false);
            };
        }
        else {
            el.attachEvent("on" + eventType, response);
            remove = function () {
                el.detachEvent("on" + eventType, response);
            };
        }

        return {
            func: response,
            remove: remove
        };
    },

// 从文档中移除元素
    remove: function (node) {
        node && node.parentNode && node.parentNode.removeChild(node);
    },

// 链式操作class
    classList: function (el) {
        var _that = this;
        return {
            add: function (className) {
                el.classList.add(className);
                return _that.classList(el);
            },
            remove: function (className) {
                el.classList.remove(className);
                return _that.classList(el);
            }
        };
    },

// 沿着一个元素向上冒泡,直到root/document,回调每个节点
    bubble: function (el, func, root) {
        var val;
        while (el !== null && el !== document && el !== root) {
            if (val = func(el)) {
                return val;
            }
            el = el.parentNode;
        }
    },

// 当一个事件冒泡到document时,回调冒泡中的每个节点
    onBubble: function (eventName, response) {
        document.addEventListener(eventName, function (event) {
            bubble(event.target, function (node) {
                response(node, event.target);
            }, document.documentElement);
        }, false);
    }
};