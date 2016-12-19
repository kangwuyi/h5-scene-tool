_.animation = _.bind(
    function (_$element, _$string, _$userAgent, _$css) {
        var _$$ = this,
            testPrefix = function () {
                if (_$$.prefix === null) {
                    _$$.prefix = _$css.testPrefix("animation", "a 1s");
                }
            },

            // 结束事件
            OnEnd = function (nameList, prefix, testPrefix) {
                return function (el, response) {
                    testPrefix();
                    return _$element.bind(el, prefix ? _$string.camelcaseJoin([prefix.replace(/-/g, "")].concat(nameList)) : nameList.join(""), function (event) {
                        event && event.stopPropagation();
                        response && response();
                    });
                }
            },
            OnEndAdvanced = function (nameList, prefix, testPrefix) {
                var onEnd = OnEnd(nameList, prefix, testPrefix);
                return function (el, response, duration, getStart) {
                    duration = duration * 1000;

                    var endHandle = onEnd(el, function () {
                        endHandle.remove();
                        var curDuration = new Date() - getStart();
                        _.wrap(response, function (remove) {
                            // 处理ios跳帧问题
                            if (_$userAgent.ios && curDuration < duration) {
                                setTimeout(function () {
                                    remove();
                                }, duration * 1.05 - curDuration);
                            }
                            else {
                                remove();
                            }
                        })()
                    });

                    return endHandle;
                };
            };
        var onAnimationEndAdvanced = OnEndAdvanced(["animation", "end"], _$$.prefix, testPrefix),
            onTransitionEndAdvanced = OnEndAdvanced(["transition", "end"], _$$.prefix, testPrefix);

        function Keyframes(progress) {
            var progressString = "";
            testPrefix();

            _.each(progress, function (style, ratio) {
                progressString += ( parseFloat(ratio) << 0 ) + "% {" + _$css.ruleString(style) + "}";
            });

            var progressNode = _$$.progressTable[progressString], id;
            if (!progressNode) {
                progressNode = _$$.progressTable[progressString] = {
                    count: 0,
                    id: id = "keyframe" + _$$.keyframeCount++,
                    handle: _$css.insertRules("@" + _$$.prefix + "keyframes " + id, progressString)
                };
            }

            ++progressNode.count;

            return {
                id: progressNode.id,
                remove: function () {
                    if (--progressNode.count === 0) {
                        progressNode.handle.remove();
                        delete _$$.progressTable[progressString];
                    }
                }
            };
        }

        function animation(animationArg, parsed) {
            parsed = parsed || {};

            var duration = null, delay = null, fillMode = "both",
                end, handle = null, args = [],
                _that = this;

            // 解析动画数组
            _.each(animationArg, function (arg) {
                if (_.isObject(arg)) {
                    handle = _that.Keyframes(arg);
                    args.push(handle.id);
                }
                else if (_.isNumber(arg)) {
                    if (duration === null) {
                        duration = arg;
                    }
                    else {
                        delay = arg;
                    }
                    args.push(_.css.s(arg));
                }
                else {
                    switch (arg) {
                        case "forwards":
                        case "backwards":
                        case "both":
                            fillMode = arg;
                            break;
                        default :
                            args.push(arg);
                            break;
                    }
                }

                if (arg === "infinite") {
                    parsed.infinite = true;
                }
            });

            args.push(fillMode);

            duration = duration || 1;
            delay = delay || 0;
            end = duration + delay;

            _.extend(parsed, {
                end: end,
                handle: handle
            });

            return args.join(" ");
        }

// 运行动画
        function runAnimation(list, callback, arg) {
            var last = null, parsedList = [], infinite = false, _that = this;
            arg = arg || {};
            _.wrap(function (animationArg) {
                var el = animationArg[0],
                    parsed = {
                        el: el
                    };

                _$css(el, "animation", _that.animation(animationArg.slice(1), parsed));
                _$css(el, "animation-play-state", "paused");

                if (!last || parsed.end > last.end) {
                    last = parsed;
                }

                if (parsed.infinite) {
                    infinite = true;
                }

                parsedList.push(parsed);
            }, function (parseAnimationArg) {
                _.isArray(list[0]) ? _.each(list, parseAnimationArg) : parseAnimationArg(list);
            })();

            var start;

            function play() {
                start = new Date();
                _.each(parsedList, function (parsed) {
                    _$css(parsed.el, "animation-play-state", "running");
                });
            }

            arg.play !== false && setTimeout(play, _$userAgent.ios ? 30 : 0);

            if (callback) {
                var endHandle = _that.onAnimationEndAdvanced(last.el, function () {
                    _.each(parsedList, function (parsed) {
                        if (arg.removeKeyframes) {
                            parsed.handle && parsed.handle.remove();
                        }

                        _$css.remove(parsed.el, "animation");
                    });
                    callback && callback();
                }, last.end, function () {
                    return start;
                });

                return {
                    play: play,
                    fastForward: endHandle.func
                };
            }
        }

        return {
            onAnimationEndAdvanced: onAnimationEndAdvanced,
            onTransitionEndAdvanced: onTransitionEndAdvanced,
            Keyframes: Keyframes,
            animation: animation,
            runAnimation: runAnimation
        }
    },
    {
        progressTable: {},
        keyframeCount: 0,
        prefix: null
    }
)(
    _.element,
    _.string,
    _.userAgent,
    _.css
);