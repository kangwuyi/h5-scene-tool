_.layout = _.bind(
    function () {
        var formats = {},
            highPerformance = _.userAgent.ios || _.userAgent.win32;

        _.css.insertRules({
            ".animation-prepare *": {
                "animation-play-state": "paused !important"
            }
        });

        // 贝塞尔
        function bezier(timing) {
            return timing ? _.isString(timing) ? timing : _.css.bezier(timing.arg) : "ease";
        }

        // 判断动画是否是强调动画
        function isEmphasize(enter) {
            return !enter.progress["0"] || enter.emphasize;
        }

        // 判断一个动画是否是透视动画
        function isPerspective(enter) {
            return _.each(enter.progress, function (style) {
                if ("perspective" in style) {
                    return true;
                }
            });
        }

        // 获取一个组件的原点矩阵
        function getMatrix(wrapper) {
            return _.are2d.origin(_.are2d.combine(
                _.are2d.matrix.translate(wrapper.x, wrapper.y),
                _.are2d.matrix.scale(wrapper.scale, wrapper.scale),
                _.are2d.matrix.rotate(wrapper.rotate / 180 * Math.PI)
            ), wrapper.w / 2, wrapper.h / 2);
        }

        // 获取一个组件相对于页面的矩阵
        function getPageMatrix(wrapper) {
            var matrix = _.are2d.matrix.eye();
            while (wrapper.parent) {
                matrix = _.are2d.combine(getMatrix(wrapper), matrix);
                wrapper = wrapper.parent;
            }
            return matrix;
        }

        // 设置一个组件的css样式
        function setStyle(wrapper) {
            var matrix = _.are3d.combine(_.are3d.matrix.scale(wrapper.scale, wrapper.scale, 1), _.are3d.matrix.rotateZ(wrapper.rotate / 180 * Math.PI));
            wrapper.opacity = wrapper.opacity + 0;
            if (wrapper.left === undefined) {
                _.css(wrapper.element, {
                    left: _.css.px(wrapper.x),
                    top: _.css.px(wrapper.y)
                });
            }
            else {
                matrix = _.are3d.combine(_.are3d.matrix.translate(wrapper.x - wrapper.left, wrapper.y - wrapper.top, 0), matrix);
            }
            if (_.css.matrix3d(matrix) !== "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)") {
                _.css.transform(wrapper.element, _.css.matrix3d(matrix));
            }
            else {
                _.css.remove(wrapper.element, "transform");
            }
            _.css.remove(wrapper.element, "transform-origin");
        }

        // 将一个内容转化为元素
        function contentToElement(content) {
            if (content.element) {
                return content.element();
            }
            else {
                var canvas = _.img.Canvas(content.width, content.height);
                content.draw(canvas.context);
                return _.userAgent.android ? _.element.element("div", [canvas]) : canvas;
            }
        }

        // 组件
        function Component(content, parentWrapper) {
            var el = contentToElement(content),
                component = el.wrapper = {
                    fixed: true // 是否取整
                },
                attr = {};

            _.css(el, {
                position: "absolute",
                display: "block",
                left: 0,
                top: 0,
                width: _.css.px(component.w = content.width),
                height: _.css.px(component.h = content.height),
                "z-index": 0
            });

            function defineAttr(name, defaultValue, setter, handler) {
                attr[name] = defaultValue;
                Object.defineProperty(component, name, {
                    get: function () {
                        return attr[name];
                    },
                    set: function (val) {
                        attr[name] = handler ? handler(val) : val;
                        setter && setter(val);
                    }
                });
            }

            // 透明度
            defineAttr("opacity", 1, function (val) {
                _.css(el, "opacity", val);
            });

            // z-index
            defineAttr("zi", 0, function (val) {
                _.css(el, "z-index", val);
            });

            // visible
            defineAttr("visible", true, function (val) {
                _.css(el, "visibility", val ? "visible" : "hidden");
            });

            _.defineObjectProperty(component, "dataSource", {
                value: content.dataSource,
                set: function (value) {
                    el.classList.add("layout-component-from-data");
                    el.dataSource = value;
                }
            });

            // transform属性
            // x和y要取整
            _.each({
                x: 0,
                y: 0
            }, function (defaultValue, name) {
                defineAttr(name, defaultValue, function () {
                    setStyle(component);
                }, function (val) {
                    return component.fixed ? Math.round(val) : val;
                });
            });

            // 原点
            Object.defineProperty(component, "origin", {
                get: function () {
                    return [component.x, component.y];
                },
                set: function (point) {
                    component.x = point[0];
                    component.y = point[1];
                }
            });

            // 不取整
            _.each({
                rotate: 0,
                scale: 1
            }, function (defaultValue, name) {
                defineAttr(name, defaultValue, function () {
                    setStyle(component);
                });
            });

            _.extend(component, {
                element: el,
                appendTo: function (parentWrapper) {
                    if (!parentWrapper.children) {
                        parentWrapper.children = [];
                    }
                    parentWrapper.children.push(component);
                    parentWrapper.element.appendChild(el);
                    component.parent = parentWrapper;
                    return component;
                },
                draw: function (gc) {
                    // 绘制自己
                    content.draw(gc);
                }
            });

            if (parentWrapper) {
                component.appendTo(parentWrapper);
            }

            return component;
        }

        function cloneComponent(source) {
            var target = Component({
                element: function () {
                    return source.element.cloneNode(true);
                },
                width: source.w,
                height: source.h
            });
            target.opacity = source.opacity;
            target.origin = source.origin;
            target.scale = source.scale;
            target.rotate = source.rotate;
            return target;
        }

        function drawComponent(component, gc, isShow) {
            _.recursion(function draw(component) {
                if (component.visible && ( isShow ? isShow(component) : true )) {
                    component.draw && component.draw(gc);
                    component.children && _.each(component.children.sort(function (lhs, rhs) {
                        return lhs.zi - rhs.zi;
                    }), function (component) {
                        gc.save();
                        gc.globalAlpha *= component.opacity;
                        // 变换
                        gc.transform.apply(gc, getMatrix(component));
                        draw(component);
                        gc.restore();
                    });
                }
            }, component);
        }

        function loopComponent(root, block) {
            _.recursion(function loop(wrapper) {
                wrapper.children && _.each(wrapper.children, loop);
                root !== wrapper && block(wrapper);
            }, root);
        }

        // 返回入场动画的keyframes
        function Keyframes(component, enter, isTransition, cssProgress) {
            cssProgress = cssProgress || {};
            var width = component.w,
                height = component.h,
                progress = enter.progress;

            function percent(val, total) {
                return _.isString(val) ? parseInt(val.replace("%", "")) / 100 * total : val;
            }

            function nu(v) {
                return v !== undefined;
            }

            _.each(
                _.map(progress, function (value, ratio) {
                    return {
                        ratio: parseInt(ratio) / 100,
                        value: value
                    }
                }).sort(function (a, b) {
                    return a.ratio - b.ratio;
                }), function (frame) {
                    var style = frame.value,
                        transform = [],
                        rotate = style.rotate || 0,
                        scale = _.isUndefined(style.scale) ? 1 : style.scale,
                        origin = enter.origin ? [enter.origin[0] * width - 0.5 * width, enter.origin[1] * height - 0.5 * height] : null,
                        computedStyle = _.omit(_.extend({
                            opacity: 1,
                            x: 0,
                            y: 0,
                            z: 0,
                            rotateX: 0,
                            rotateY: 0,
                            rotateZ: rotate,
                            scaleX: scale,
                            scaleY: scale,
                            skewX: 0,
                            skewY: 0,
                            perspective: 0
                        }, style), _.isUndefined),
                        matrix = _.are2d.combine(
                            _.are2d.matrix.scale(component.scale, component.scale),
                            _.are2d.matrix.rotate(component.rotate / 180 * Math.PI)
                        );

                    function pushTransform(transformName, value, unit) {
                        transform.push(_.string.tuple(transformName, [unit(value)]));
                    }

                    delete computedStyle.rotate;
                    delete computedStyle.scale;

                    computedStyle = _.omit(_.extend(computedStyle, {
                        x: percent(computedStyle.x, width),
                        y: percent(computedStyle.y, height)
                    }), _.isUndefined);

                    origin && transform.push(_.css.translate(origin[0], origin[1], 0));
                    nu(style.perspective) && pushTransform("perspective", computedStyle.perspective, _.css.px);
                    ( nu(style.x) || nu(style.y) || nu(style.z) ) && transform.push(_.css.translate(computedStyle.x, computedStyle.y, computedStyle.z));
                    isTransition !== true && transform.push(_.css.matrix(origin ? _.are2d.origin(matrix, width / 2 - enter.origin[0] * width, height / 2 - enter.origin[1] * height) : matrix));
                    ( nu(style.scaleX) || nu(style.scaleY) || nu(style.scale) ) && transform.push(_.css.scale(computedStyle.scaleX, computedStyle.scaleY));
                    nu(style.rotateX) && pushTransform("rotateX", computedStyle.rotateX, _.css.deg);
                    nu(style.rotateY) && pushTransform("rotateY", computedStyle.rotateY, _.css.deg);
                    ( nu(style.rotateZ) || nu(style.rotate) ) && pushTransform("rotateZ", computedStyle.rotateZ, _.css.deg);
                    ( nu(style.skewX) ) && pushTransform("skewX", computedStyle.skewX, _.css.deg);
                    nu(style.skewY) && pushTransform("skewY", computedStyle.skewY, _.css.deg);
                    origin && transform.push(_.css.translate(-origin[0], -origin[1], 0));

                    cssProgress[frame.ratio * 100] = _.omit(_.extend({
                        "transform-origin": computedStyle.origin ? _.map(computedStyle.origin, function (value) {
                            return value * 100 + "%";
                        }).join(" ") : undefined,
                        filter: computedStyle.filter,
                        opacity: computedStyle.absOpacity !== undefined ? computedStyle.absOpacity : computedStyle.opacity * component.opacity,
                        transform: transform.join(" "),
                        visibility: computedStyle.visibility === undefined ? undefined : computedStyle.visibility ? "visible" : "hidden"
                    }, {
                        "animation-timing": computedStyle.timing ? _.isString(computedStyle.timing) ? computedStyle.timing :
                            _.css.bezier(computedStyle.timing.arg) : undefined
                    }), _.isUndefined);
                });

            return _.animation.Keyframes(cssProgress).id;
        }

        function EnterAnimation(component, enter, duration, delay, cssProgress) {
            var arrayCache = [
                Keyframes(component, enter, false, cssProgress),
                _.css.s(duration),
                _.css.s(delay),
                bezier(enter.timing),
                "both"];
            return arrayCache.join(" ");
        }

        function transition(component, info) {
            var element = component.element;
            _.css(element, "transition", [_.css.s(info.duration), _.css.s(info.delay || 0), bezier(info.timing)].join(" "));

            _.each(info.end, function (v, k) {
                component[k] = v;
            });

            function end() {
                info.onEnd && info.onEnd();
                _.css.remove(element, "transition");
                endHandle.remove();
            }

            var endHandle = _.element.bind(element, "webkitTransitionEnd", end);

            return {
                fastForward: end
            };
        }

        function makePage(page, width, height) {
            var wrapper = {
                    w: page.w = width,
                    h: page.h = height,
                    xScale: width / 320,
                    yScale: height / 568
                },
                showEvent = _.event.Event(),
                enterEndEvent = _.event.Event(),
                removeEvent = _.event.Event();

            wrapper.body = page.body || page;

            _.css(page, {
                position: "relative",
                width: _.css.px(width),
                height: _.css.px(height),
                "z-index": 0,
                "backface-visibility": "hidden",
                overflow: "hidden"
            });

            _.defineObjectProperty(wrapper, "background", {
                value: "black",
                set: function (value) {
                    _.css(page, "background", value);
                }
            });

            return _.extend(page, {
                draw: function (gc) {
                    gc.fillStyle = wrapper.background;
                    gc.fillRect(0, 0, width, height);
                    drawComponent(wrapper, gc, function (wrapper) {
                        return page.contains(wrapper.element) &&
                            ( !page.classList.contains("animation-prepare") || wrapper.enter == null || isEmphasize(wrapper.enter) );
                    });
                },
                recycle: function () {
                    removeEvent.trig();
                    page.prepare = function () {
                        return page;
                    }
                },
                prepare: function () {
                    var last = null, enterComponents = _.event.LinkedList(), start, isPagePerspective;

                    page.classList.add("animation-prepare");

                    if (!page.doPagePerspective) {
                        // 处理透视
                        loopComponent(wrapper, function (component) {
                            if (_.userAgent.ios && component.enter && isPerspective(component.enter)) {
                                isPagePerspective = true;
                            }
                        });
                        if (isPagePerspective) {
                            loopComponent(wrapper, function (component) {
                                if (component.isElement) {
                                    _.element.element("div", {
                                        css: {
                                            position: "absolute",
                                            left: 0,
                                            top: 0,
                                            transform: "translateZ(10000px)",
                                            "z-index": component.zi
                                        },
                                        children: [component.element]
                                    }, component.element.parentNode);
                                }
                            });
                        }
                        page.doPagePerspective = true;
                    }

                    loopComponent(wrapper, function (component) {
                        var enter = component.enter; // 入场动画
                        if (enter) {
                            var delay = enter.delay || ( enter.delay = 0 ), // 延迟
                                duration = enter.duration || ( enter.duration = 1 ), // 持续时间
                                end = delay + duration,
                                cssProgress = {},
                                el = component.element;

                            if (highPerformance) {
                                // 加动画
                                _.css(el, "animation", EnterAnimation(component, enter, duration, delay));
                            }
                            else {
                                el.animationStyle = EnterAnimation(component, enter, duration, delay, cssProgress);
                                if (cssProgress[0]) {
                                    el.normalStyle = el.getAttribute("style");
                                    _.css(el, cssProgress[0])
                                }
                            }

                            // 更新进入
                            if (!last || last.end < end) {
                                last = component;
                                last.end = end;
                            }

                            // 加入链表
                            enterComponents.insert(component, null);

                            // 动画结束后移除动画属性,总可见,触发enter的onEnd回调
                            component.animationHandle = _.animation.onAnimationEndAdvanced(component.element, function () {
                                enterComponents.remove(component);
                                !enter.both && _.css.remove(el, "animation");
                                enter.onEnd && enter.onEnd();
                            }, end, function () {
                                return start;
                            });
                        }
                    });

                    return _.extend(page, {
                        recycle: function () {
                            removeEvent.trig();
                            page.play = function () {
                                return page;
                            };
                        },
                        fastForward: function () {
                        },
                        play: function () {
                            // 如果是低性能,把样式替换为结束样式并触发动画
                            if (!highPerformance) {
                                loopComponent(wrapper, function (wrapper) {
                                    var el = wrapper.element;
                                    if (el.animationStyle) {
                                        if (el.normalStyle) {
                                            el.setAttribute("style", el.normalStyle);
                                        }
                                        _.css(el, "animation", el.animationStyle);
                                    }
                                });
                            }

                            // 记录此时元素的位置
                            loopComponent(wrapper, function (wrapper) {
                                wrapper.left = wrapper.x;
                                wrapper.top = wrapper.y;
                            });

                            // 所有入场动画完成后触发enterEnd事件
                            start = new Date();
                            if (last) {
                                _.animation.onAnimationEndAdvanced(last.element, function () {
                                    enterEndEvent.trig();
                                }, last.end, function () {
                                    return start;
                                });
                            }
                            else {
                                enterEndEvent.trig();
                            }

                            // 移除animation-prepare,启动动画播放
                            // setTimeout用于处理chrome45的跳帧bug
                            _.userAgent.win32 || _.userAgent.chrome ? setTimeout(function () {
                                page.classList.remove("animation-prepare");
                            }, 30) : page.classList.remove("animation-prepare");
                            showEvent.trig();

                            return _.extend(page, {
                                recycle: removeEvent.trig,
                                fastForward: function () {
                                    _.event.LinkedListForeach(enterComponents, function (component) {
                                        var enter = component.enter;
                                        _.css.remove(component.element, "animation");
                                        enter.onEnd && enter.onEnd();
                                        component.animationHandle.remove();
                                        enterComponents.remove(component);
                                    });

                                    enterEndEvent.trig();
                                }
                            });
                        }
                    });
                },
                wrapper: _.extend(wrapper, {
                    visible: true,
                    element: page,
                    onShow: showEvent.regist,
                    onEnterEnd: enterEndEvent.regist,
                    onRemove: removeEvent.regist
                }),
                toCanvas: function () {
                    var canvas = _.img.Canvas(width, height);
                    page.draw(canvas.context);
                    return canvas;
                }
            });
        }

        function loadPage(pageData, onLoad) {
            pageData = pageData || {};

            function getFormat(pageData) {
                var label = pageData.name in {qrcode: true, screen: true} ? pageData.name : pageData.label;
                return pageData.format || formats[label] || formats.SingleImage;
            }

            var format = getFormat(pageData),
                images = [],
                kahn1990_imageinfo_arr = [],
                resource = {};
            _.wrap(function (pageData) {
                var loadTask = [];
                format = getFormat(pageData); // 更新format

                // 加载图片
                _.each(pageData.image || [], function (src, i) {
                    var kahn1990_imageInfo_page_cache = src.imageInfo;
                    loadTask.push(function (done) {
                        src = _.isString(src) ? src : src.url;
                        var img = _.img.Img(src, {
                            crossOrigin: format.crossOrigin,
                            onError: function () {
                                images[i] = img;
                                kahn1990_imageinfo_arr[i] = kahn1990_imageInfo_page_cache;
                                done();
                            },
                            onLoad: function () {
                                kahn1990_imageinfo_arr[i] = kahn1990_imageInfo_page_cache;
                                images[i] = img;
                                done();
                            }
                        });
                    });
                });

                // 加载资源
                _.each(format.resource, function (src, name) {
                    loadTask.push(function (done) {
                        var img, loadHandle;

                        function loadDone() {
                            resource[name] = img;
                            done();
                        }

                        // 如果有点,视为图片
                        if (/\./.test(src)) {
                            src = _.img.staticSrc(src);
                            img = _.img.Img(src, {
                                crossOrigin: null,
                                onError: loadDone,
                                onLoad: function () {
                                    loadDone();
                                }
                            });
                        }
                        // 否则视为图标
                        else {
                            img = _.img.Icon(src);
                            loadHandle = _.element.bind(img, "load", function () {
                                setTimeout(loadDone, 0);
                                loadHandle.remove();
                            });
                        }
                    });
                });

                // 加载自定义图片
                _.each(pageData.componentImages || [], function (img) {
                    loadTask.push(function (done) {
                        _.img.load(img, img.targetSrc, {
                            crossOrigin: format.crossOrigin,
                            onError: done,
                            onLoad: done
                        });
                    });
                });

                // 完成后启动
                _.event.concurrency(loadTask, function () {
                    onLoad && onLoad(function (width, height, context, workBody) {
                        var page = _.element.element("div.layout");
                        page.body = workBody || page;
                        page.pageData = pageData;
                        page.label = pageData.label;
                        context = context || {};

                        // 如果板式忽略纯色,移除image中的纯色
                        if (format.ignorePureColor) {
                            images = _.filter(images, function (img) {
                                return !img.color;
                            });
                        }

                        page.resize = function (width, height) {
                            page.innerHTML = "";
                            makePage(page, width, height);

                            function Field(array, defaultValue) {
                                return function (i) {
                                    return i === undefined ? array : array ? array[i] : defaultValue;
                                };
                            }

                            try {
                                if (pageData.fail) {
                                    alert(new Error());
                                }

                                format.create(page.wrapper, _.omit(_.extend(pageData, {
                                    data: function () {
                                        return pageData.data;
                                    },
                                    kahn1990_imageInfo: function kahn1990_imageInfo(i) {
                                        return kahn1990_imageinfo_arr[i];
                                    },
                                    image: function image(i) {
                                        if (i === undefined) {
                                            return _.map(images, function (img, i) {
                                                return image(i);
                                            });
                                        }

                                        var img = images[i] || _.element.element("img", {
                                                fail: "empty"
                                            });
                                        img.dataSource = {
                                            from: "image",
                                            index: i
                                        };
                                        return img;
                                    },
                                    getText: function (i) {
                                        var text = pageData.text[i] || "";
                                        return {
                                            dataSource: {
                                                from: "text",
                                                index: i
                                            },
                                            toString: function () {
                                                return text;
                                            }
                                        };
                                    },
                                    component: Field(pageData.components, {}),
                                    imageinfo: Field(pageData.imageinfo, {}),
                                    location: Field(pageData.location, {}),
                                    video: Field(pageData.video, ""),
                                    actionlinks: Field(pageData.actionlinks, ""),
                                    position: Field(pageData.position, "")
                                }), _.isUndefined), resource, context);
                            }
                            catch (e) {
                                _.img.pageError(page, "page-error.png");
                            }
                        };
                        page.resize(width, height);

                        return page;
                    });
                });
            }, function (parse) {
                format.load ? format.load(pageData, parse) : parse(pageData);
            })()
        }

        return {
            formats: formats,
            Component: Component,
            drawComponent: drawComponent,
            loopComponent: loopComponent,
            cloneComponent: cloneComponent,
            EnterAnimation: EnterAnimation,
            contentToElement: contentToElement,
            getPageMatrix: getPageMatrix,
            loadPage: loadPage,
            isEmphasize: isEmphasize,
            isPerspective: isPerspective,
            transition: transition
        }
    },
    {}
)();