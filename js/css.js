

var _cssTestCache = {
    test: function () {
        if (window.CSS && CSS.supports) {
            return function (styleName, styleValue) {
                return CSS.supports(styleName, styleValue);
            };
        }
        else {
            var testElement = document.createElement("div");

            return function (styleName, styleValue) {
                testElement.removeAttribute("style");
                testElement.style.setProperty(styleName, styleValue, "");
                return testElement.hasAttribute("style");
            };
        }
    }(),

    testPrefix: function (styleName, styleValue) {
        var _that = this;
        return _.map(["", "-webkit-", "-ms-", "-moz-", "-o-"], function (prefix) {

            if (_that.test(prefix + styleName, styleValue)) {
                return prefix;
            }
        })[0];
    },

// 测试某个样式的样式名(找前缀)
    testStyleName: function () {
        var prefix = "";
        return function (styleName, styleValue) {
            return ( prefix ? this.test(prefix + styleName, styleValue) ? prefix : "" : ( prefix = this.testPrefix(styleName, styleValue) ) ) + styleName;
        };
    }()
};

var _cssUnitCache = {
// 值,防止值太小时,转换成字符串使用指数表示法
    n: function (n) {
        return Math.round(n * 10000) / 10000;
    },

    /* kahn1990 */
    px: function (value) {

        return value === 0 ? 0 : ( _.isWindow(this)?_cssUnitCache.n(value):this.n(value) << 0 ) + "px";
    },

    rem: function (value) {
        return value === 0 ? 0 : (  _.isWindow(this)?_cssUnitCache.n(value):this.n(value) << 0 ) + "rem";
    },

    deg: function (value) {
        return value === 0 ? 0 : _.isWindow(this)?_cssUnitCache.n(value):this.n(value) + "deg";
    }
};

var _cssCache = {

    css: function (el, arg1, arg2) {
        function setStyle(styleValue, styleName) {
            if (styleValue == null) {
                remove(el, styleName);
            }
            else {
                if (_.isNumber(styleValue)) {
                    styleValue = _cssUnitCache.n(styleValue);
                }
                el.style.setProperty(_cssTestCache.testStyleName(styleName, styleValue), styleValue, "");
            }
        }

        _.isString(arg1) ? setStyle(arg2, arg1) : _.each(arg1, setStyle);

        return {
            element: el,
            remove: function () {
                remove(el, arg1);
            }
        };
    },
    Rotate: function (name) {
        return function (val) {
            return _.string.tuple(name, [_cssUnitCache.deg(val)]);
        };
    }
};

_.css = _.merge(
    _cssCache.css,
    _.merge(_.merge(_cssTestCache,_cssUnitCache), {
// 生成CSS样式字符串
        ruleString: function (cssStyles, noTest) {
            var ruleText = "";
            _.each(cssStyles, function (styleValue, styleName) {
                ruleText += [noTest ? styleName : _cssTestCache.testStyleName(styleName, styleValue.toString().replace("!important", "")), ":", styleValue, ";"].join("");
            });
            return ruleText;
        },

// 移除CSS值,可以移除一条,或者移除一组
        remove: function (el, arg) {
            function removeStyle(styleName) {
                _.each(["", "-webkit-", "-ms-", "-moz-", "-o-"], function (prefix) {
                    el.style.removeProperty(prefix + styleName);
                });
            }

            _.isString(arg) ? removeStyle(arg) : _.isObject(arg) ? _.each(arg, removeStyle) : _.each(arg, removeStyle);
            return el;
        },

// 添加CSS规则
        insertCSSRule: function () {
            var userSheet = _.event.LinkedList(),
                systemSheet = _.event.LinkedList();
            return function (ruleText, isSystem) {
                var styleSheet = isSystem ? systemSheet : userSheet; // 选择样式链表

                // 如果节点尚未创建,创建节点,系统样式表在所有样式表的最前,用户样式表在所有样式表的最后
                if (styleSheet.el === undefined) {
                    styleSheet.el = document.head.insertBefore(document.createElement("style"), isSystem ? document.head.firstChild : null);
                }

                // 创建新规则,位置上最后规则+1
                var lastRule = styleSheet.tail(),
                    newRule = styleSheet.insert({
                        index: lastRule === null ? 0 : lastRule.index + 1
                    });

                styleSheet.el.sheet.insertRule(ruleText, newRule.index);

                return {
                    remove: function () {
                        // 后面所有元素的位置-1
                        var pos = newRule.index;
                        for (var curNode = newRule.next; curNode !== null; curNode = curNode.next) {
                            curNode.index = pos++;
                        }

                        // 移除节点并删除规则
                        styleSheet.remove(newRule);
                        styleSheet.el.sheet.deleteRule(pos);
                    }
                };
            }
        }(),

// 添加一组css规则
        insertRules: function (arg1, arg2, arg3) {
            var _that = this;

            function insertRules(selector, styles, isSystem) {
                var cssText = _.isString(styles) ? styles : _that.ruleString(styles, /^@/.test(selector));
                return _that.insertCSSRule(selector + " {" + cssText + "}", isSystem);
            }

            if (_.isString(arg1)) {
                return insertRules(arg1, arg2, arg3);
            }
            else {
                var list = [];
                _.each(arg1, function (styles, selector) {
                    list.push(insertRules(selector, styles, arg2));
                });

                return {
                    remove: function () {
                        _.each(list, function (handle) {
                            handle.remove();
                        });
                    }
                };
            }
        },


        full: function (style) {
            return _.omit(_.extend({
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, style || {}), _.isUndefined);
        },

        size: function (el, width, height) {
            _cssCache.css(el, {
                width: this.px(width),
                height: this.px(height)
            });
        },

        transform: function () {
            var style = [];
            _.each(arguments, function (transform, i) {
                i !== 0 && style.push(transform);
            });
            _cssCache.css(arguments[0], "transform", style.join(" "));
        },

        matrix: function (m) {
            return _.string.tuple("matrix", _.map(m, this.n));
        },

        matrix3d: function (m) {
            return _.string.tuple("matrix3d", _.map(m, this.n));
        },

        translate: function (x, y, z) {
            var _that = this;
            return _.string.tuple("translate3d", _.map([x, y, z], function (value) {
                return _.isNumber(value) ? _that.px(value) : value;
            }));
        },

        rotateX: _cssCache.Rotate("rotateX"),
        rotateY: _cssCache.Rotate("rotateY"),
        rotateZ: _cssCache.Rotate("rotateZ"),

        scale: function () {
            return "scale(" + Array.prototype.join.call(arguments, ",") + ")";
        },

        s: function (value) {
            return this.n(value) + "s";
        },

        url: function (url) {
            return _.string.tuple("url", [url]);
        },

        bezier: function (arg) {
            return _.string.tuple("cubic-bezier", arg);
        },

        center: function (width) {
            return {
                position: "absolute",
                left: "50%",
                width: this.px(width),
                "margin-left": this.px(-width / 2)
            };
        },

        middle: function (height) {
            return {
                position: "absolute",
                top: "50%",
                height: this.px(height),
                "margin-top": this.px(-height / 2)
            };
        }
    })
);