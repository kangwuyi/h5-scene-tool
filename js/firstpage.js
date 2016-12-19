(function () {
    //noinspection JSUnusedLocalSymbols
    var library = function () {
            var count = 0;
            return function (module) {
                if (Object.prototype.toString.call(module) == "[object Function]") {
                    library[count] = {};
                    module();
                }
                else {
                    library[count] = module;
                }
                ++count;
            };
        }(),
        main = function (func) {
            func();
        },
        plugin = main;

    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    library(function () {
    });
    /**
     * Created by 白 on 2015/7/14.
     */
    //24
    library(function () {
        var rect568 = {w: 320, h: 568},
            rect504 = {w: 320, h: 504};

        function transform(arg) {
            var s = arg.s, d = arg.d,
                sWidth = s.w, sHeight = s.h,
                dWidth = d.w, dHeight = d.h,
                scale = arg.scale(sWidth, sHeight, dWidth, dHeight),
                x = ( dWidth - sWidth * scale ) * ( arg.x || 0.5 ),
                y = ( dHeight - sHeight * scale ) * ( arg.y || 0.5 ),
                matrix = _.are2d.combine(_.are2d.matrix.translate(x, y), _.are2d.matrix.scale(scale, scale));

            function clip(dSize, size, align) {
                var offset = ( dSize - size * scale ) * align;
                return offset > 0 ? [0, size, offset, size * scale] : [-offset / scale, dSize / scale, 0, dSize];
            }

            return {
                x: x,
                y: y,
                w: dWidth,
                h: dHeight,
                tw: sWidth * scale,
                th: sHeight * scale,
                scale: scale,
                matrix: matrix,
                draw: _.flatten([clip(dWidth, sWidth, arg.x || 0.5), clip(dHeight, sHeight, arg.y || 0.5)])
            };
        }

        function drawImage(gc, image, l) {
            var scale = l.scale, draw = l.draw,
                nW = image.naturalWidth, nH = image.naturalHeight,
                sX = draw[0], sY = draw[1],
                sW = draw[2], sH = draw[3],
                tX = draw[4], tY = draw[5],
                tW = draw[6], tH = draw[7];

            if (_.userAgent.ios) {
                gc.save();
                gc.translate(tX, tY);
                gc.beginPath();
                gc.rect(0, 0, tW, tH);
                gc.clip();
                gc.drawImage(image, -sX / sW * tW, -sY / sH * tH, nW * scale, nH * scale);
                gc.restore();
            }
            else {
                gc.drawImage.apply(gc, [image].concat(draw));
            }
        }

        var scale = transform.scale = {
            cover: function (sWidth, sHeight, dWidth, dHeight) {
                return dWidth / dHeight < sWidth / sHeight ? dHeight / sHeight : dWidth / sWidth;
            },
            contain: function (sWidth, sHeight, dWidth, dHeight) {
                return dWidth / dHeight < sWidth / sHeight ? dWidth / sWidth : dHeight / sHeight;
            },
            y: function (sWidth, sHeight, dWidth, dHeight) {
                return dHeight / sHeight;
            }
        };

        transform.cover = function (d) {
            return transform({
                s: rect568,
                d: d,
                scale: scale.cover
            });
        };

        transform.y = function (d) {
            return transform({
                s: rect568,
                d: d,
                scale: scale.y
            });
        };

        transform.cover504 = function (d) {
            return transform({
                s: rect504,
                d: d,
                scale: scale.cover
            });
        };

        transform.drawImage = drawImage;
        library["23"] = transform;
    });
    /**
     * Created by 白 on 2015/7/14.
     */
    //25
    library(function () {
        var Transform = library["23"];

        // 内容
        function Content(func) {
            return function (ds) {

                return _.extend(func.apply(null, arguments), {
                    dataSource: ds ? ds.dataSource : null
                });
            };
        }

        // region 图片
        // 图片覆盖
        var Frame = library["24"].Frame = Content(function (img, transform) {
            return img.fail ? Fail(img, transform) : {
                width: transform.w,
                height: transform.h,
                element: function () {
                    img = img.cloneNode(false);
                    if (_.userAgent.android) {
                        _.css(img, {
                            height: _.css.px(transform.th),
                            "margin-left": _.css.px(transform.x),
                            "margin-top": _.css.px(transform.y)
                        });
                    }
                    else {
                        _.css(img, "transform-origin", "0 0");
                        _.css.transform(img, _.css.matrix(transform.matrix));
                    }

                    return _.element.element("div", {
                        css: {
                            overflow: "hidden"
                        },
                        children: img
                    });
                },
                draw: function (gc) {
                    Transform.drawImage(gc, img, transform);
                }
            };
        });

        // 失败的图片
        function Fail(img, arg) {
            var notFound = _.img.imageNotFound;

            if (img.fail === "fatal") {
                throw new Error();
            }

            return img.fail !== "empty" && arg.w && arg.h ? Frame(notFound, Transform({
                s: notFound,
                d: arg,
                scale: function () {
                    return Math.min(0.5, arg.w / notFound.fullWidth * 0.3, arg.h / notFound.fullHeight * 0.3);
                }
            })) : {
                width: 0,
                height: 0,
                element: function () {
                    return _.element.element("div");
                },
                draw: function () {
                }
            };
        }

        // 图片
        library["24"].Image = Content(function (img, arg) {
            var wh = _.isNumber(arg) ? {w: img.w * arg, h: img.h * arg} : arg,
                width = wh.w, height = wh.h;

            return img.fail ? Fail(img, wh) : {
                width: width,
                height: height,
                element: function () {
                    return img.cloneNode(true);
                },
                draw: function (gc) {
                    gc.drawImage(img, 0, 0, width, height);
                }
            };
        });

        // 覆盖图片
        library["24"].Cover = Content(function (img, arg) {
            return Frame(img, Transform({
                s: {w: img.fullWidth, h: img.fullHeight},
                d: arg,
                scale: Transform.scale.cover
            }));
        });

        // 画布
        library["24"].Canvas = function (canvas) {
            return {
                width: canvas.logicalWidth,
                height: canvas.logicalHeight,
                element: function () {
                    return canvas;
                },
                draw: function (gc) {
                    gc.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.logicalWidth, canvas.logicalHeight)
                }
            };
        };

        // 边框
        library["24"].Border = function (content, borderStyle) {
            var borderWidth = borderStyle.width || 0,
                borderColor = borderStyle.color || "transparent",
                borderRadius = borderStyle.radius || 0,
                width = content.width,
                height = content.height;

            return {
                dataSource: content.dataSource,
                width: width + borderWidth,
                height: height + borderWidth,
                element: function () {
                    var inner = _.element.element(_.layout.contentToElement(content), {
                            css: {
                                overflow: "hidden",
                                "box-sizing": "border-box",
                                border: ["solid", _.css.px(borderWidth), borderColor].join(" "),
                                "border-radius": _.css.px(borderRadius)
                            }
                        }),
                        outer = inner;

                    // 处理安卓的圆角bug
                    if (_.userAgent.android && inner.querySelector("img")) {
                        outer = _.element.element("div", [inner]);
                        _.css.size(inner, width + borderWidth, height + borderWidth);
                    }

                    return outer;
                },
                draw: function (gc) {
                    gc.save();
                    if (borderRadius) {
                        gc.beginPath();
                        gc.moveTo(borderRadius, 0);
                        gc.lineTo(width - borderRadius, 0);
                        gc.arcTo(width, 0, width, borderRadius, borderRadius);
                        gc.lineTo(width, height - borderRadius);
                        gc.arcTo(width, height, width - borderRadius, height, borderRadius);
                        gc.lineTo(borderRadius, height);
                        gc.arcTo(0, height, 0, height - borderRadius, borderRadius);
                        gc.lineTo(0, borderRadius);
                        gc.arcTo(0, 0, borderRadius, 0, borderRadius);
                        gc.clip();
                    }

                    gc.save();
                    gc.translate(borderWidth, borderWidth);
                    content.draw(gc);
                    gc.restore();

                    if (borderWidth) {
                        gc.fillStyle = borderColor;
                        gc.fillRect(0, 0, width, borderWidth);
                        gc.fillRect(0, 0, borderWidth, height);
                        gc.fillRect(width, 0, borderWidth, height + borderWidth);
                        gc.fillRect(0, height, width + borderWidth, borderWidth);
                    }
                    gc.restore();
                }
            };
        };

        library["24"].Mask = function (content, mask) {
            var width = content.width,
                height = content.height;

            return {
                dataSource: content.dataSource,
                width: width,
                height: height,
                element: function () {
                    var inner = _.element.element(_.layout.contentToElement(content), {
                            css: {
                                overflow: "hidden",
                                "box-sizing": "border-box",
                                "mask-image": _.css.url(mask.src),
                                "mask-size": "100% 100%"
                            }
                        }),
                        outer = inner;

                    // 处理安卓的mask bug
                    if (_.userAgent.android) {
                        outer = _.element.element("div.mask", [inner]);
                        _.css.size(inner, width, height);
                    }

                    outer.mask = mask.src;

                    return outer;
                },
                draw: function (gc) {
                    var contentCanvas = _.img.Canvas(width, height, 1),
                        contentGc = contentCanvas.context;
                    content.draw(contentGc);
                    contentGc.globalCompositeOperation = "destination-in";
                    contentGc.drawImage(mask, 0, 0, width, height);
                    gc.drawImage(contentCanvas, 0, 0, width, height);
                }
            };
        };
        // endregion

        // region 形状
        // 矩形,如未提供颜色,就是一个空矩形
        library["24"].Rect = function (width, height, color) {
            return {
                width: width,
                height: height,
                element: function () {
                    return _.element.element("div", {
                        css: {
                            background: color || "transparent"
                        }
                    });
                },
                draw: function (gc) {
                    if (color) {
                        gc.fillStyle = color;
                        gc.fillRect(0, 0, width, height);
                    }
                }
            };
        };

        // 圆形
        library["24"].Circle = function (r, color) {
            return {
                width: r * 2,
                height: r * 2,
                element: function () {
                    return _.element.element("div", {
                        css: {
                            "border-radius": _.css.px(r),
                            background: color || "transparent"
                        }
                    });
                },
                draw: function (gc) {
                    if (color) {
                        gc.save();
                        gc.beginPath();
                        gc.arc(r, r, r, 0, 2 * Math.PI);
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
        function measure(func) {
            var canvas = document.createElement("canvas");
            func(canvas.getContext("2d"));
        }

        /* kahn1990 on 2015/11/17 cutString getTrueLength*/
        function getTrueLength(str) {//获取字符串的真实长度（字节长度）
            var len = str.length, truelen = 0;
            for (var x = 0; x < len; x++) {
                if (str.charCodeAt(x) > 128) {
                    truelen += 2;
                } else {
                    truelen += 1;
                }
            }
            return truelen;
        }

        function cutString(str, leng) {//按字节长度截取字符串，返回substr截取位置
            var len = str.length, tlen = len, nlen = 0;
            for (var x = 0; x < len; x++) {
                if (str.charCodeAt(x) > 128) {
                    if (nlen + 2 <= leng) {
                        nlen += 2;
                    } else {
                        tlen = x;
                        break;
                    }
                } else {
                    if (nlen + 1 < leng) {
                        nlen += 1;
                    } else {
                        tlen = x;
                        break;
                    }
                }
            }
            return tlen;
        };
        // 行文本
        function LineText(text, width, info) {
            var fontSize = info.fontSize;
            var info_kahn1990_str_lang = info.kahn1990_str_lang || false;
            var info_kahn1990_str_lang_height = (info_kahn1990_str_lang == false) ? (fontSize + 2) : (fontSize + 4) * Math.floor(getTrueLength(text) / info_kahn1990_str_lang);

            function draw(gc, height) {
                // 绘制
                gc.font = _.text.Font(info);
                gc.textBaseline = "middle";
                gc.fillStyle = info.color;

                var kahn1990_text_length_cache = text.length;

                (info_kahn1990_str_lang == false)
                    ? function () {
                    gc.fillText(text, 0, height / 2 << 0);
                }()
                    : function () {

                    for (var i = 1; i <= kahn1990_text_length_cache; i++) {

                        var tl = cutString(text, info_kahn1990_str_lang);
                        gc.fillText(text.substr(0, tl), 0, (height * (i - 1) + height / 2));
                        text = text.substr(tl);

                    }
                }();
            }

            return {
                width: width,
                height: fontSize,
                element: function () {
                    var canvas = _.img.Canvas(width + 4, info_kahn1990_str_lang_height),
                        gc = canvas.context;
                    gc.translate(2, 0);
                    draw(gc, fontSize + 4);

                    return _.element.element("div", [_.element.element(canvas, {
                        css: {
                            "margin-left": "-2px",
                            "margin-top": "-2px"
                        }
                    })]);
                },
                draw: function (gc) {
                    draw(gc, fontSize);
                }
            };
        }

        // 标签,不指定宽度.文字多长,宽度就是多少
        library["24"].Label = Content(function (text, info) {
            text = text.toString();
            var fontSize = info.fontSize;
            var info_kahn1990_str_lang = info.kahn1990_str_lang || false;
            /* kahn1990 添加宽度 */
            var kahn1990_width = info.width == "false" ? _.text.measureText(text, info).width : info.width;

            var LineTextBody = LineText(text, kahn1990_width, info);
            LineTextBody.height = (info_kahn1990_str_lang == false) ? (fontSize + 2) : (fontSize + 4) * Math.floor(getTrueLength(text) / info_kahn1990_str_lang);

            return LineTextBody;
        });

        // 行文本,需指定宽度,多出部分截取
        library["24"].LineText = Content(function (text, info) {
            text = text.toString();
            var width = info.width,
                drawText = "";

            measure(function (gc) {
                function getWidth(text) {
                    return gc.measureText(text).width;
                }

                gc.font = _.text.Font(info);
                if (info.overflow && getWidth(text) > width) {
                    for (var i = 0; i !== text.length; ++i) {
                        if (getWidth(text.substring(0, i + 1) + "…") > width) {
                            break;
                        }
                    }
                    drawText = text.substring(0, i) + "…";
                }
                else {
                    drawText = text;
                }
            });

            return LineText(drawText, width, info);
        });

        // 块文本
        library["24"].BlockText = Content(function (text, info) {
            text = text.toString();

            var textLayout = _.text.layText(text, info.width, _.extend(info, {
                lineBreak: info.breakWord ? _.text.LineBreak.breakAll : _.text.LineBreak.normal,
                align: info.breakWord ? _.text.Align.left : _.text.Align.side
            }));

            return {
                width: info.width,
                height: textLayout.height,
                draw: function (gc) {
                    _.text.drawTextLayout(gc, textLayout);
                }
            };
        });
        // endregion
    });
    /**
     * Created by 白 on 2015/7/15.
     * 用于封装一些偷懒的写法
     */
    //26
    library(function () {
        var Content = library["24"],
            Transform = library["23"];

        // 切换页面,修复一些特殊机型的bug
        function cutPage(cut) {
            _.userAgent.mi4 ? setTimeout(cut, 30) : cut();
        }

        // 504板式
        function layout504(layout, backgroundImage) {
            var transform = Transform.cover504(layout);

            if (backgroundImage) {
                _.layout.Component(Content.Cover(backgroundImage, layout), layout);
            }

            return {
                scale: transform.scale,
                image: function (image, parent) {
                    return _.layout.Component(Content.Image(image, transform.scale), parent);
                },
                x: function (x) {
                    return _.are2d.transform(transform.matrix, [x, 0, 1])[0];
                },
                y: function (y) {
                    return _.are2d.transform(transform.matrix, [0, y, 1])[1];
                }
            };
        }

        library["25"].cutPage = cutPage;
        library["25"].layout504 = layout504;
    });
    /**
     * Created by 白 on 2015/6/10.
     * 全局函数
     */
    //27
    library(function () {
        var outRange = 8,
            tapTrig = false,
            longPressDuration = 500,
            inDown = 0,
            removeHandles = [],
            ui = {},
            preventBodyEvent = false,
            preventDrag = false;

        // 全局屏蔽默认事件,如果某节点需要默认事件,加类.need-default
        _.cursor.onPointerDown(document, function (event) {
            var prevent = true;
            _.element.bubble(event.origin.target, function (node) {
                if (node.classList.contains("need-default")) {
                    prevent = false;
                }
            });

            if (inDown === 0) {
                inDown = 1;
            }
            else if (inDown === 1) {
                inDown = 2;
            }

            prevent && event.preventDefault();
        }, true);

        _.cursor.onPointerUp(document, function () {
            _.each(removeHandles, function (removeHandle) {
                removeHandle.remove();
            });
            inDown = 0;
            removeHandles = [];
        }, true);

        function onPointerDown(el, response) {
            el.style && _.css(el, "pointer-events", "auto");
            return _.cursor.onPointerDown(el, function (event) {
                var removeHandle = _.element.bind(event.origin.target, "DOMNodeRemovedFromDocument", function () {
                    removeHandle.remove();
                    inDown = 0;
                });
                removeHandles.push(removeHandle);

                if (inDown !== 2) {
                    response(event);
                }
            });
        }

        function PointerTrack() {
            var dX = 0,
                dY = 0,
                info = {
                    track: function (event) {
                        dX += event.dX;
                        dY += event.dY;

                        var x = Math.abs(dX) > outRange,
                            y = Math.abs(dY) > outRange;

                        info.dX = dX;
                        info.dY = dY;
                        info.xOut = x;
                        info.yOut = y;
                        info.out = x || y;
                    }
                };

            return info;
        }

        function onSwipe(response, hasTimeout) {
            var pointerTrack = PointerTrack(),
                checkHandle = _.cursor.onMoveUp({
                    onMove: function (event) {
                        pointerTrack.track(event);
                        if (pointerTrack.out) {
                            checkHandle.remove();
                            response && response({
                                xOut: pointerTrack.xOut,
                                yOut: pointerTrack.yOut,
                                dX: pointerTrack.dX,
                                dY: pointerTrack.dY
                            });
                        }
                    },
                    onUp: function () {
                        timeout && clearTimeout(timeout);
                    }
                }),
                timeout = hasTimeout ? null : setTimeout(function () {
                    inDown = 0;
                    checkHandle.remove();
                }, longPressDuration);

            return {
                remove: function () {
                    checkHandle.remove();
                    timeout && clearTimeout(timeout);
                }
            };
        }

        function onSwipeStart(el, response) {
            return onPointerDown(el, function () {
                onSwipe(response);
            });
        }

        _.cursor.onPointerUp(document, function () {
            tapTrig = false;
            preventBodyEvent = false;
            preventDrag = false;
        });

        function onTapUp(response) {
            var pointerTrack = PointerTrack(),

                tapHandle = _.cursor.onPointerUp(document.documentElement, function (event) {
                    if (!tapTrig) {
                        response && response(event);
                        tapTrig = true;
                    }
                }),

                timeout = setTimeout(function () {
                    tapHandle.remove();
                    checkHandle.remove();
                }, longPressDuration),

                checkHandle = _.cursor.onMoveUp({
                    onMove: function (event) {
                        pointerTrack.track(event);
                        if (pointerTrack.out) {
                            clear();
                        }
                    },
                    onUp: clear
                });

            function clear() {
                checkHandle.remove();
                clearTimeout(timeout);
                tapHandle.remove();
            }

            return {
                remove: clear
            };
        }

        function onTap(el, response) {
            return onPointerDown(el, function () {
                onTapUp(response);
            });
        }

        function onLongPress(response) {
            var pointerTrack = PointerTrack(),

                timeout = setTimeout(function () {
                    checkHandle.remove();
                    response && response();
                }, longPressDuration),
                checkHandle = _.cursor.onMoveUp({
                    onMove: function (event) {
                        pointerTrack.track(event);
                        if (pointerTrack.out) {
                            clear();
                        }
                    },
                    onUp: clear
                });

            function clear() {
                checkHandle.remove();
                clearTimeout(timeout);
            }

            return {
                remove: clear
            };
        }

        // 锁定屏幕,不接受鼠标动作
        function Lock(el) {
            el = el || document.documentElement;
            el.classList.add("lock");

            return {
                remove: function () {
                    el.classList.remove("lock");
                }
            };
        }


        Object.defineProperties(ui, {
            preventBodyEvent: {
                get: function () {
                    return preventBodyEvent
                },
                set: function (val) {
                    preventBodyEvent = val;
                }
            },
            preventDrag: {
                get: function () {
                    return preventDrag;
                },
                set: function (val) {
                    preventDrag = val;
                }
            }
        });

        // 焦点时设置focus类
        _.element.onBubble("focusin", function (node) {
            node.classList.add("focus");
        });
        _.element.onBubble("focusout", function (node) {
            node.classList.remove("focus");
        });

        library["26"] = _.extend(ui, {
            onPointerDown: onPointerDown,
            onPointerMove: _.cursor.onPointerMove,
            onPointerUp: _.cursor.onPointerUp,
            onMoveUp: _.cursor.onMoveUp,
            onSwipeStart: onSwipeStart,
            onSwipe: onSwipe,
            onLongPress: onLongPress,
            onTap: onTap,
            onTapUp: onTapUp,
            Lock: Lock
        });
    });
    /**
     * Created by 白 on 2015/6/10.
     */
    //28
    library(function () {
        var ui = library["26"],
            openContext = getSessionData("open-in-browser");

        if (openContext) {
            var tipsPage = _.element.element("div", {
                css: _.css.full({
                    "background-color": "rgba(0,0,0,0.88)",
                    "z-index": 100000
                }),
                children: [
                    _.img.Img(_.img.staticSrc([openContext, "-", _.userAgent.ios ? "ios" : "android", ".png"].join("")), {
                        onLoad: function (img) {
                            tipsPage.appendChild(_.element.element(img, {
                                css: {
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    width: _.css.px(img.halfWidth)
                                }
                            }));
                        }
                    })
                ]
            }, document.body);
            ui.onTap(tipsPage, function () {
                _.element.remove(tipsPage);
            });
        }

        function workLocation() {
            return location.origin + location.pathname;
        }

        // 保存浏览上下文
        function saveViewContext() {
            window.curWork && sessionStorage.setItem(workLocation(), JSON.stringify({
                pageIndex: curWork.curPageIndex,
                workData: curWork.workData
            }));
        }

        // 跳转到链接,记录当前页码
        function jump(href, notSave) {
            if (window.firstpage && firstpage.open) {
                firstpage.open(_.url.toAbsolute(href));
            }
            else {
                !notSave && saveViewContext();
                location.href = href;
            }
        }

        // 获取session数据,并清除它
        function getSessionData(key, defaultValue) {
            var retVal = sessionStorage.getItem(key);
            sessionStorage.removeItem(key);
            return retVal === null ? defaultValue : retVal;
        }

        // 滑页
        function SlidePage() {
            var page = _.element.element("div", {
                    css: _.css.full({
                        overflow: "hidden",
                        "z-index": 1001
                    })
                }),
                slideInEvent = _.event.Event(),
                slideOutEvent = _.event.Event();

            ui.onPointerDown(page, function () {
                ui.preventBodyEvent = true;
            });

            return _.extend(page, {
                onSlideIn: slideInEvent.regist,
                onSlideOut: slideOutEvent.regist,
                slideIn: function (parent, noTransition) {
                    page.isIn = true;
                    if (!noTransition) {
                        var lock = ui.Lock();
                        _.css(page, "visibility", "hidden");
                        setTimeout(function () {
                            _.css(page, "visibility", "visible");
                            _.animation.runAnimation([page, {
                                0: {
                                    transform: "translate3d(100%, 0, 0)"
                                }
                            }, 0.4], function () {
                                slideInEvent.trig();
                                lock.remove();
                            });
                        }, 0);
                    }

                    page.slideOut = function () {
                        var lock = ui.Lock();
                        slideOutEvent.trig();
                        _.animation.runAnimation([page, {
                            100: {
                                transform: "translate3d(100%, 0, 0)"
                            }
                        }, 0.4], function () {
                            lock.remove();
                            _.element.remove(page);
                        });
                        page.isIn = false;
                    };

                    parent.appendChild(page);
                }
            });
        }

        library["27"].workLocation = workLocation;
        library["27"].saveViewContext = saveViewContext;
        library["27"].jump = jump;
        library["27"].getSessionData = getSessionData;
        library["27"].SlidePage = SlidePage;
    });
    library(function () {
    });
    /**
     * Created by 白 on 2015/3/12.
     */
    //30
    library(function () {
        var spin = {
            100: {
                transform: "rotateZ(360deg)"
            }
        };

        // 加载
        function Loading() {
            return _.element.element("div", {
                css: {
                    "position": "absolute",
                    "left": "50%",
                    "top": "50%",
                    "width": "34px",
                    "height": "34px",
                    "margin-left": "-17px",
                    "margin-top": "-17px",
                    "z-index": "1000"
                },
                children: [
                    _.element.element(_.img.Icon("loading-o"), {
                        css: {
                            position: "absolute",
                            left: 0,
                            top: 0
                        }
                    }),
                    _.element.element(_.img.Icon("loading-c"), {
                        css: {
                            position: "absolute",
                            left: 0,
                            top: 0,
                            animation: _.animation.animation([spin, 1.1, "linear", "infinite"])
                        }
                    })
                ]
            });
        }

        // 音乐图标
        function Music() {
            var el = _.element.element("div", {
                    classList: "tips",
                    css: {
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "40px",
                        height: "40px",
                        "z-index": 1000
                    },
                    children: [
                        _.element.element("div", {
                            css: {
                                position: "absolute",
                                left: "-20px",
                                top: 0,
                                right: 0,
                                bottom: "-20px"
                            }
                        })
                    ]
                }),
                icon = _.element.element(_.img.Icon("music"), {
                    css: {
                        "border-radius": "20px",
                        border: "2px solid rgba(130, 170, 118, 0.6)"
                    }
                }, el);

            _.css(icon, _.extend(_.css.center(icon.w), _.css.middle(icon.h)));

            _.defineObjectProperty(el, "play", {
                value: false,
                set: function (val) {
                    if (val) {
                        _.animation.runAnimation([icon, spin, 2.3, "linear", "infinite"]);
                    }
                    else {
                        _.css.remove(icon, "animation");
                    }
                }
            });

            return el;
        }

        // 唱片图标
        function Album() {
            return _.element.element(_.img.Icon("album"), {
                classList: "tips",
                css: {
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    animation: _.animation.animation([spin, 2.3, "linear", "infinite"]),
                    "z-index": 1000
                }
            });
        }

        // 菊花加载
        function LoadingChrysanthemum() {
            return _.element.element(_.img.Icon("loading-new-page"), {
                css: {
                    display: "inline-block",
                    "vertical-align": "top",
                    animation: _.animation.animation([spin, 1.3, "linear", "infinite"])
                }
            });
        }

        // 加载新页提示
        function LoadingNewPage() {
            return _.element.element("div", {
                classList: "tips",
                css: {
                    "position": "absolute",
                    "left": "0",
                    "right": "0",
                    "bottom": "8px",
                    "height": "20px",
                    "z-index": "10",
                    "line-height": "20px",
                    "text-align": "center",
                    "pointer-events": "none"
                },
                children: [
                    LoadingChrysanthemum(),
                    _.element.element("div", {
                        css: {
                            "display": "inline-block",
                            "vertical-align": "top",
                            "margin-left": "12px",
                            "color": "#888888",
                            "font-size": "14px"
                        },
                        innerHTML: "加载新页中"
                    })
                ]
            });
        }

        // 加载按钮
        function LoadingButton() {
            var icon = _.img.Icon("loading-new-page");
            return _.css(icon, _.omit(_.extend({
                position: "absolute",
                animation: _.animation.animation([spin, 1.3, "linear", "infinite"])
            }, _.css.center(icon.w), _.css.middle(icon.h)), _.isUndefined)).element;
        }


        // 涂抹提示
        function Scratch(parent) {
            return _.element.element(_.img.Icon("tips-scratch"), {
                css: {
                    position: "absolute",
                    "margin-left": "-65px",
                    left: "50%",
                    bottom: "50px",
                    "z-index": 1001,
                    "pointer-events": "none",
                    animation: _.animation.animation([{
                        0: {
                            opacity: 0
                        }
                    }, 1.4])
                }
            }, parent || document.body);
        }

        // 隐藏提示
        function hide() {
            document.documentElement.classList.add("hide-tips");

            return {
                remove: function () {
                    document.documentElement.classList.remove("hide-tips");
                }
            };
        }

        library["29"].LoadingButton = LoadingButton;
        library["29"].Loading = Loading;
        library["29"].LoadingChrysanthemum = LoadingChrysanthemum;
        library["29"].Music = Music;
        library["29"].Album = Album;
        library["29"].LoadingNewPage = LoadingNewPage;
        library["29"].Scratch = Scratch;
        library["29"].hide = hide;
    });
    /**
     * Created by 白 on 2015/6/9.
     */
    //31
    library(function () {
        var href = _.url.parse(location.href);

        href = href.arg.returnUrl || href;

        function loadWork(workInfoUrl, callback, arg) {
            workInfoUrl = _.url.parse(workInfoUrl);
            var id = _.last(workInfoUrl.pathname.split("/"));

            _.wrap(function (data) {
                var parsedData, workData = data.data || data;

                var pages = _.map(workData.pages, function (pageData) {
                        return pageData.layout;
                    }),
                    noLoop = true;
                ;

                parsedData = {
                    cut: workData.cut || ( window.fast ? false : undefined ),
                    picture: workData.thumbnail,
                    title: workData.title,
                    url: href.origin + href.pathname,
                    desc: workData.description || "",
                    uid: workData.uid,
                    theme: workData.theme,
                    mode: workData.mode,
                    color: workData.backgroud ? workData.backgroud.color === "FFFFFF" ? "#FFFFFF" : workData.backgroud.color : "#FFFFFF",
                    pageSwitch: workData.pageSwitch ? workData.pageSwitch.animateId || "classic" : "classic",
                    music: workData.music,
                    pages: pages,
                    noLoop: noLoop
                };

                callback(_.extend(parsedData, {
                    id: id,
                    data: data
                }));
            }, function (parseWorkData) {
                var workData = window.workData;
                delete window.workData;
                workData ? parseWorkData(workData) : null;
            })();

            return id;
        }

        library["30"] = loadWork;
    });
    /**
     * Created by 白 on 2014/11/28.
     */
    //32
    library(function () {
        // 符号函数
        function sign(x) {
            return x >= 0 ? 1 : -1;
        }

        // 判断一个点是否在一个矩形之内
        function inRect(tx, ty, x, y, width, height) {
            tx -= x;
            ty -= y;
            return tx >= 0 && tx < width && ty >= 0 && ty < height;
        }

        // 如果x>b,取b,x小于a,取啊
        function range(x, a, b) {
            if (a <= b) {
                return x < a ? a : x > b ? b : x;
            }
            else {
                return range(x, b, a);
            }
        }

        // 判断是否在区间
        function inRange(x, a, b) {
            if (a <= b) {
                return x >= a && x < b;
            }
            else {
                return inRange(x, b, a);
            }
        }

        // 计算(x,y)到(0,0)的距离
        function distance(x, y) {
            return Math.sqrt(x * x + y * y);
        }

        // 求两个边的正弦
        function sin2(x, y) {
            return x / distance(x, y);
        }

        // 生成贝塞尔曲线函数
        function Bezier(x1, y1, x2, y2, func) {
            var xTolerance = 0.0001,
                retVal = func || function (xTarget) {
                        function bezier(t, p1, p2) {
                            var ct = 1 - t, ct2 = ct * ct,
                                t2 = t * t, t3 = t2 * t,
                                tct2 = t * ct2, t2ct = t2 * ct;
                            return 3 * p1 * tct2 + 3 * p2 * t2ct + t3;
                        }

                        function bezierD(t, p1, p2) {
                            return ( 9 * p1 - 9 * p2 + 3 ) * t * t + ( 6 * p2 - 12 * p1 ) * t + 3 * p1;
                        }

                        var t = 0.5;
                        while (Math.abs(xTarget - bezier(t, x1, x2)) > xTolerance) {
                            t = t - ( bezier(t, x1, x2) - xTarget ) / bezierD(t, x1, x2);
                        }

                        return bezier(t, y1, y2);
                    };

            retVal.arg = [x1, y1, x2, y2];
            return retVal;
        }

        function index(i, l) {
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
    });
    /**
     * Created by 白 on 2014/8/5.
     */
    //33
    library(function () {
        var math = library["31"],
            Bezier = math.Bezier,
            timeout = null,
            tasks = _.event.LinkedList(),

            Timing = {
                linear: Bezier(1, 1, 1, 1, function (t) {
                    return t;
                }),
                ease: Bezier(0.25, 0.1, 0.25, 1),
                easeIn: Bezier(0.42, 0, 1, 1),
                easeOut: Bezier(0, 0, .58, 1),
                easeInOut: Bezier(0.42, 0, 0.58, 1)
            };

        function fromTo(from, to, ratio) {
            return from + ( to - from ) * ratio;
        }

        // 请求连续动画
        function requestFrame(task) {
            var node = null;

            function start() {
                // 如果任务没有添加进链表,添加到链表中
                if (node === null) {
                    node = tasks.insert(task, null);

                    // 如果当前没有计时,开始计时
                    if (timeout === null) {
                        timeout = setTimeout(function frame() {
                            var cur;
                            if (tasks.tail() !== null) {
                                timeout = setTimeout(frame, 1000 / 60);
                                for (cur = tasks.head(); cur !== null; cur = cur.next) {
                                    cur();
                                }
                            }
                            else {
                                timeout = null;
                            }
                        }, 1000 / 60);
                    }
                }
            }

            start();

            return {
                start: start,
                remove: function () {
                    node && tasks.remove(node);
                    node = null;
                }
            };
        }

        // 进度器
        function Progress(arg) {
            var duration = ( arg.duration || 1 ) * 1000, // 持续时间,传入的是秒数,转换为毫秒
                timing = arg.timing || Timing.ease, // 缓动函数
                progress = -( arg.delay || 0 ) * 1000, // 动画进度
                lastTime = new Date(); // 上帧时间

            return {
                // 计算当前比例
                ratio: function () {
                    var now = new Date();
                    progress += now - lastTime; // 更新进度
                    lastTime = now;

                    return progress < 0 ? null : timing(progress >= duration ? 1 : progress / duration);
                },
                // 判断进度是否结束
                isEnd: function () {
                    return progress >= duration;
                },
                // 快进到目标比例
                progress: function (targetRatio) {
                    progress = targetRatio * duration;
                    lastTime = new Date()
                }
            };
        }

        function requestFrames(arg) {
            var progress = Progress(arg),
                go = arg.onAnimate;

            function goEnd() {
                animateEvent.remove();
                arg.onAnimate(1);
                arg.onEnd && arg.onEnd();
            }

            go(0);
            var animateEvent = requestFrame(function () {
                go(progress.ratio());

                if (progress.isEnd()) {
                    goEnd();
                }
            });

            return {
                remove: animateEvent.remove,
                progress: progress.progress,
                fastForward: goEnd
            };
        }

        library["32"].Bezier = Bezier;
        library["32"].Timing = Timing;
        library["32"].fromTo = fromTo;
        library["32"].requestFrame = requestFrame;
        library["32"].Progress = Progress;
        library["32"].requestFrames = requestFrames;
    });
    /**
     * Created by 白 on 2015/4/16.
     */
    //34
    library(function () {
        var table = [24, 14, 108, 51, 101, 49, 48, 85, 81, 41,
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

        function Random(seed) {
            var random = seed === undefined ? function () {
                return Math.random();
            } : function () {
                var count = seed % length;
                return function () {
                    return table[( ++count % length )] / length;
                };
            }();

            return _.extend(random, {
                select: function (array) {
                    return array[random() * array.length << 0];
                },
                arrange: function (list) {
                    var result = [],
                        len = list.length;

                    // 复制一个副本
                    list = _.map(list, function (t) {
                        return t;
                    });

                    _.loop(len, function (i) {
                        i = len - i - 1;
                        var select = random() * i << 0;
                        result.push(list[select]);
                        list[select] = list[i];
                    });

                    return result;
                },
                range: function (start, end) {
                    return start + random() * (end - start);
                },
                probability: function (v) {
                    return random() < v;
                }
            });
        }

        library["33"] = _.extend(Random(), {
            Random: Random
        });
    });
    /**
     * Created by 白 on 2015/7/14.
     */
    //35
    library(function () {
        var random = library["33"],
            tips = library["29"],
            Modes = {},
            curBody; // 当前作品

        function Work(arg) {
            var width = arg.width,
                height = arg.height,
                workBody = _.element.element("div", {
                    css: {
                        overflow: "hidden",
                        background: "#000000",
                        "z-index": 1
                    }
                }),
                playSchedule = _.event.Schedule(), // 播放日程
                preloadPageSchedule = _.event.Schedule(), // 预加载日程
                loading = workBody.appendChild(tips.Loading()), // 加载图标
                mode = null; // 模式

            _.css.size(workBody, workBody.w = width, workBody.h = height);

            // 加载作品数据
            workBody.onLoad = _.event.Waiter(function (loadDone) {
                _.wrap(function (workData) {

                    // 插入调试数据
                    window.debugWorkData && _.extend(workData, window.debugWorkData);

                    // 选择模式,并根据模式要求处理数据
                    mode = Modes[workData.mode = window.mode || workData.mode || "classic"](workBody, arg);
                    mode.doData && mode.doData();

                    workBody.workTitle = workData.title; // 标题
                    workBody.random = random.Random(workData.seed || workData.id || 0); // 随机
                    workBody.pageNumber = workData.pages.length;

                    // 播放和预加载已准备好
                    playSchedule.prepare(function () {
                        mode.play();
                    });
                    preloadPageSchedule.prepare(function () {
                        mode.preloadPage();
                    });

                    // 页面加载器
                    var pagesLoader = _.map(workData.pages, function (pageData, index) {
                        var loader = {
                            data: {},
                            load: _.event.Loader(function (done) {
                                _.layout.loadPage(_.omit(_.extend(workData, pageData), _.isUndefined), function (create) {
                                    loader.create = function (noParent) {
                                        return _.element.element(create(width, height, loader.data, noParent ? null : workBody), {
                                            pid: pageData.pid,
                                            index: index,
                                            css: {
                                                position: "absolute",
                                                left: 0,
                                                top: 0
                                            }
                                        });
                                    };

                                    done();
                                });
                            }).load
                        };
                        return loader;
                    });

                    // 加载页接口
                    workBody.loadPage = function loadPage(index, onLoad, create) {
                        var pageLoader = pagesLoader[index];
                        pageLoader ? pageLoader.load(function () {
                            onLoad && onLoad(create !== false ? pagesLoader[index].create() : null);
                        }) : onLoad && onLoad();
                    };


                    loadDone();
                }, function (doData) {
                    if (arg.workData) {
                        var workData = workBody.workData = arg.workData;
                        workBody.workId = workData.id;
                        doData(workData);
                    }
                    else {
                        workBody.workId = arg.loadWork(function (workData) {
                            workBody.workData = workData;
                            doData(workData);
                        });
                    }
                })()

            }).onComplete;

            // 加载第一页
            workBody.onPageLoad = _.event.Waiter(function (pageLoadDone) {
                workBody.onLoad(function () {
                    _.wrap(function () {
                        pageLoadDone();
                        _.element.remove(loading);
                    }, function (done) {
                        workBody.loadError ? done() : mode.load(done);
                    })()
                });
            }).onComplete;

            return _.extend(workBody, {
                recycle: function () {
                    mode && mode.recycle();
                },
                play: function () {
                    curBody = workBody;
                    playSchedule.start();
                },
                preloadPage: function () {
                    preloadPageSchedule.start();
                },
                resize: function (newWidth, newHeight) {
                    _.css.size(workBody, workBody.w = width = newWidth, workBody.h = height = newHeight);
                    mode && mode.resize(newWidth, newHeight);
                }
            });
        }

        Work.Modes = Modes;
        library["34"] = Work;
    });
    /**
     * Created by 白 on 2015/7/14.
     */
    //36
    library(function () {
        var switchAnimations = {};

        function Fragment(parent, targetCanvas, x, y, width, height, zi) {
            var canvas = _.img.Canvas(width, height),
                gc = canvas.context,
                dpr = canvas.dpr;

            gc.drawImage(targetCanvas, x * dpr, y * dpr, width * dpr, height * dpr, 0, 0, width, height);
            _.css(canvas, {
                "backface-visibility": "hidden",
                position: "absolute",
                left: _.css.px(x),
                top: _.css.px(y),
                "z-index": zi || 0
            });
            parent.appendChild(canvas);
            return canvas;
        }

        // 渐变
        switchAnimations.fade = function (parent, curPage, newPage, callback, duration) {
            duration = duration || 0.8;
            parent.appendChild(newPage);

            return _.animation.runAnimation([
                [curPage, {
                    100: {
                        opacity: 0
                    }
                }, duration, 0, "linear"],
                [newPage, {
                    0: {
                        opacity: 0
                    }
                }, duration, 0, "linear"]
            ], callback);
        };

        // 经典
        switchAnimations.classic = function (parent, curPage, newPage, callback) {
            parent.appendChild(newPage);
            return _.animation.runAnimation([
                [curPage, {
                    100: {
                        transform: "translate3d(0, -30%, 0) scale(0.5)"
                    }
                }, 0.8, 0],
                [newPage, {
                    0: {
                        transform: "translate3d(0, 100%, 0)"
                    }
                }, 0.8, 0]
            ], callback);
        };

        // 推
        switchAnimations.push = function (parent, curPage, newPage, callback, duration) {
            duration = duration || 0.8;
            parent.appendChild(newPage);

            return _.animation.runAnimation([
                [curPage, {
                    100: {
                        transform: "translate3d(0, -100%, 0)"
                    }
                }, duration, "ease-in-out", 0],
                [newPage, {
                    0: {
                        transform: "translate3d(0, 100%, 0)"
                    }
                }, duration, "ease-in-out", 0]
            ], callback);
        };

        // 后退
        switchAnimations.back = function (parent, curPage, newPage, callback, duration) {
            duration = duration || 0.5;
            parent.appendChild(newPage);

            return _.animation.runAnimation([
                [curPage, {
                    100: {
                        transform: "translate3d(0, 100%, 0)"
                    }
                }, duration, "ease-in-out", 0],
                [newPage, {
                    0: {
                        transform: "translate3d(0, -100%, 0)"
                    }
                }, duration, "ease-in-out", 0]
            ], callback);
        };

        // 揭开
        switchAnimations.uncover = function (parent, curPage, newPage, callback) {
            _.css(curPage, "z-index", 100);
            parent.appendChild(newPage);

            return _.animation.runAnimation([
                [curPage, {
                    100: {
                        transform: "translate3d(0, -100%, 0)"
                    }
                }, 0.8, 0]
            ], callback);
        };

        // 立方体
        switchAnimations.cube = function (parent, curPage, newPage, callback) {
            parent.appendChild(newPage);

            var cssHandle = _.css(parent, {
                perspective: 1000
            });

            return _.animation.runAnimation([
                [curPage, {
                    0: {
                        "transform-origin": "50% 100%",
                        "z-index": 2
                    },
                    100: {
                        "transform-origin": "50% 100%",
                        transform: "translate3d(0, -100%, 0) rotateX(90deg)",
                        "z-index": 0
                    }
                }, 1, 0, "linear"],
                [newPage, {
                    0: {
                        "transform-origin": "50% 0%",
                        transform: "translate3d(0, 100%, 0) rotateX(-90deg)",
                        "z-index": 0
                    },
                    100: {
                        "transform-origin": "50% 0%",
                        "z-index": 1
                    }
                }, 1, 0, "linear"]
            ], function () {
                cssHandle.remove();
                callback && callback();
            });
        };

        // 翻转
        switchAnimations.overturn = function (parent, curPage, newPage, callback) {
            parent.appendChild(newPage);

            var cssHandle = _.css(parent, {
                perspective: 1000
            });

            return _.animation.runAnimation([
                [curPage, {
                    0: {
                        "transform-origin": "0 50%",
                        "z-index": 2
                    },
                    50: {
                        "transform-origin": "0 50%",
                        transform: "translate3d(50%, 0, 100px) rotateY(90deg)",
                        "z-index": 1
                    },
                    100: {
                        "transform-origin": "0 50%",
                        transform: "translate3d(100%, 0, 0) rotateY(180deg)",
                        "z-index": 0
                    }
                }, 1, 0, "linear"],
                [newPage, {
                    0: {
                        "transform-origin": "100% 50%",
                        transform: "translate3d(-100%, 0, 0) rotateY(180deg)",
                        "z-index": 0
                    },
                    50: {
                        "transform-origin": "100% 50%",
                        transform: "translate3d(-50%, 0, 100px) rotateY(270deg)",
                        "z-index": 0.5
                    },
                    100: {
                        "transform-origin": "100% 50%",
                        transform: "translate3d(0, 0, 0) rotateY(360deg)",
                        "z-index": 1
                    }
                }, 1, 0, "linear"]
            ], function () {
                cssHandle.remove();
                callback && callback();
            });
        };

        // 切换
        switchAnimations["switch"] = function (parent, curPage, newPage, callback) {
            parent.appendChild(newPage);

            var cssHandle = _.css(parent, {
                perspective: 1000
            });

            return _.animation.runAnimation([
                [curPage, {
                    0: {
                        "transform-origin": "100% 50%",
                        "z-index": 2
                    },
                    50: {
                        "transform-origin": "100% 50%",
                        transform: "translate3d(50%, 0, 0) rotateY(-30deg)",
                        "z-index": 1
                    },
                    100: {
                        "transform-origin": "100% 50%",
                        transform: "translate3d(0, 0, -130px)",
                        "z-index": 0
                    }
                }, 1, 0, "linear"],
                [newPage, {
                    0: {
                        "transform-origin": "0 50%",
                        transform: "translate3d(0, 0, -130px)",
                        "z-index": 0
                    },
                    50: {
                        "transform-origin": "0 50%",
                        transform: "translate3d(-50%, 0, 0) rotateY(30deg)",
                        "z-index": 0.5
                    },
                    100: {
                        "transform-origin": "0 50%",
                        "z-index": 1
                    }
                }, 1, 0, "linear"]
            ], function () {
                cssHandle.remove();
                callback && callback();
            });
        };

        // 梳理
        switchAnimations.tease = function (parent, curPage, newPage, callback) {
            var height = curPage.h,
                width = curPage.w,
                curCanvas = curPage.toCanvas(),
                partHeight = height / 8 << 0,
                animates = [];

            _.element.remove(curPage);
            parent.appendChild(newPage);

            _.loop(8, function (i) {
                var thisHeight = i === 7 ? height - partHeight * 7 : partHeight,
                    thisTop = i === 7 ? height - thisHeight : thisHeight * i,
                    j = 7 - i;

                animates.push([
                    Fragment(parent, curCanvas, 0, thisTop, width, thisHeight, 1),
                    j % 2 === 0 ? {
                        100: {
                            transform: "translate3d(-100%, 0, 0)"
                        }
                    } : {
                        100: {
                            transform: "translate3d(100%, 0, 0)"
                        }
                    }, 0.3, j * 0.1, "linear"
                ]);
            });

            return _.animation.runAnimation(animates, function () {
                _.each(animates, function (animate) {
                    _.element.remove(animate[0]);
                });
                callback && callback();
            });
        };

        // 门
        switchAnimations.door = function (parent, curPage, newPage, callback) {
            var w = curPage.w,
                h = curPage.h,
                curCanvas = curPage.toCanvas(),
                cssHandle = _.css(parent, {
                    perspective: 1000
                }),
                doors = [];

            _.element.remove(curPage);
            parent.appendChild(newPage);
            _.each([0, 0.5], function (rx) {
                doors.push(Fragment(parent, curCanvas, rx * w, 0, w / 2, h, 1));
            });

            return _.animation.runAnimation([
                [doors[0], {
                    100: {
                        transform: "translate3d(-100%, 0, 0)",
                        opacity: 0.4
                    }
                }, 0.8, 0],
                [doors[1], {
                    100: {
                        transform: "translate3d(100%, 0, 0)",
                        opacity: 0.4
                    }
                }, 0.8, 0],
                [newPage, {
                    0: {
                        transform: "translate3d(0, 0, -1400px)"
                    }
                }, 0.8, 0]
            ], function () {
                cssHandle.remove();
                _.each(doors, function (door) {
                    _.element.remove(door);
                });
                callback && callback();
            });
        };
        switchAnimations.door.highPerformance = true;

        // 翻页
        switchAnimations.flipOver = function (parent, curPage, newPage, callback) {
            var width = curPage.w,
                height = curPage.h,
                curCanvas = curPage.toCanvas(),
                newCanvas = newPage.toCanvas(),
                cssHandle = _.css(parent, {
                    perspective: 1000
                }),
                curTop = Fragment(parent, curCanvas, 0, 0, width, height / 2, 1),
                curBottom = Fragment(parent, curCanvas, 0, height / 2, width, height / 2, 1),
                newTop = Fragment(parent, newCanvas, 0, 0, width, height / 2, 2),
                newBottom = Fragment(parent, newCanvas, 0, height / 2, width, height / 2, 0);

            _.element.remove(curPage);

            return _.animation.runAnimation([
                [curBottom, {
                    0: {
                        "transform-origin": "50% 0",
                        "z-index": 3
                    },
                    100: {
                        "transform-origin": "50% 0",
                        transform: "rotateX(180deg)",
                        "z-index": 1
                    }
                }, 0.8, 0],
                [newTop, {
                    0: {
                        "transform-origin": "50% 100%",
                        transform: "rotateX(-180deg)",
                        "z-index": 1
                    },
                    100: {
                        "transform-origin": "50% 100%",
                        transform: "rotateX(0deg)",
                        "z-index": 2
                    }
                }, 0.8, 0]
            ], function () {
                cssHandle.remove();
                _.each([curTop, curBottom, newTop, newBottom], function (fragment) {
                    _.element.remove(fragment);
                });
                callback && callback();
            });
        };
        switchAnimations.flipOver.highPerformance = true;

        // 棋盘
        switchAnimations.chessboard = function (parent, curPage, newPage, callback) {
            var w = curPage.w,
                h = curPage.h,
                curCanvas = curPage.toCanvas(),
                newCanvas = newPage.toCanvas(),
                cssHandle = _.css(parent, {
                    perspective: 1000
                }),

                numX = _.userAgent.ios ? 4 : 2, numY = _.userAgent.ios ? 5 : 3, t,
                animates = [],
                left = 0;

            _.element.remove(curPage);

            if (w > h) {
                t = numX;
                numX = numY;
                numY = t;
            }

            // 制作碎片
            _.loop(numX, function (i) {
                var right = ( i + 1 ) / numX * w << 0,
                    top = 0;

                _.loop(numY, function (j) {
                    var bottom = ( j + 1 ) / numY * h << 0,
                        width = right - left,
                        height = bottom - top,
                        delay = 0.8 / numX * i + Math.random() * 0.4;

                    _.loop(2, function (n) {
                        animates.push([
                            Fragment(parent, n === 0 ? curCanvas : newCanvas, left, top, width, height, 2 - n),
                            n === 0 ? {
                                0: {
                                    "z-index": 2
                                },
                                100: {
                                    transform: "rotateY(180deg)",
                                    "z-index": 0
                                }
                            } : {
                                0: {
                                    transform: "rotateY(180deg)",
                                    "z-index": 0
                                },
                                100: {
                                    transform: "rotateY(360deg)",
                                    "z-index": 1
                                }
                            },
                            0.8, delay, "linear"
                        ]);
                    });

                    top = bottom;
                });

                left = right;
            });

            return _.animation.runAnimation(animates, function () {
                cssHandle.remove();
                _.each(animates, function (animate) {
                    _.element.remove(animate[0]);
                });
                callback && callback();
            });
        };
        switchAnimations.chessboard.highPerformance = true;

        library["35"] = switchAnimations;
    });
    /**
     * Created by WQ on 2015/5/22.
     * 缩放元素使它可以全部显示
     */
    //37
    library(function () {
        var math = library["31"];

        function inRange(n, num1, num2) {
            return n >= Math.min(num1, num2) && n <= Math.max(num1, num2);
        }

        // 缩放一个元素
        library["36"] = function (comp, layout) {
            var clientWidth = layout.w, clientHeight = layout.h, w = comp.w, h = comp.h,
                matrix = _.layout.getPageMatrix(comp), // 宽高和矩阵
                pc = _.are2d.transform(matrix, [w / 2, h / 2, 1]), xc = pc[0], yc = pc[1], // 重新坐标
                r = Math.sqrt(w * w + h * h) / 2, // 半径
                scales = []; // 缩放数组

            if (!inRange(xc, 0, clientWidth) || !inRange(yc, 0, clientHeight)) {
                return 1;
            }

            _.each([[0, 0], [w, 0], [w, h], [0, h]], function (p) {
                p = _.are2d.transform(matrix, p.concat(1));
                var xp = p[0], yp = p[1];

                _.each([[0, 0, 1, 0], [0, 0, 0, 1], [1, 1, 0, 1], [1, 1, 1, 0]], function (info) {
                    var x1 = info[0] * clientWidth, y1 = info[1] * clientHeight, x2 = info[2] * clientWidth, y2 = info[3] * clientHeight,
                        denominator = ( yp - yc ) * ( x2 - x1 ) - ( xc - xp ) * ( y1 - y2 ),
                        x = ( ( xp - xc ) * ( x2 - x1 ) * ( y1 - yc ) + ( yp - yc ) * ( x2 - x1 ) * xc - ( y2 - y1 ) * ( xp - xc ) * x1 ) / denominator,
                        y = -( ( yp - yc ) * ( y2 - y1 ) * ( x1 - xc ) + ( xp - xc ) * ( y2 - y1 ) * yc - ( x2 - x1 ) * ( yp - yc ) * y1 ) / denominator;

                    if (denominator !== 0 && inRange(x, xp, xc) && inRange(x, x1, x2) && inRange(y, yp, yc) && inRange(y, y1, y2)) {
                        scales.push(math.distance(x - xc, y - yc) / r);
                        return true;
                    }
                });
            });

            return scales.length === 0 ? 1 : Math.min.apply(this, scales);
        };
    });
    /**
     * Created by 白 on 2014/9/11.
     */
    //38
    library(function () {
        var animation = library["32"],
            enterAnimation = {};

        function Direction(direction) {
            switch (direction) {
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

        function percent(value) {
            return value + "%";
        }

        // 飞入
        enterAnimation.FlyInto = function (direction) {
            var xy = Direction(direction);

            return {
                direction: direction,
                progress: {
                    "0": {
                        x: xy[0] * 640,
                        y: xy[1] * 800
                    }
                }
            };
        };

        // 果冻
        enterAnimation.rubberBand = {
            scale: true,
            progress: {
                "30": {
                    scaleX: 1.25,
                    scaleY: 0.75
                },
                "40": {
                    scaleX: 0.75,
                    scaleY: 1.25
                },
                "50": {
                    scaleX: 1.15,
                    scaleY: 0.85
                },
                "65": {
                    scaleX: 0.95,
                    scaleY: 1.05
                },
                "75": {
                    scaleX: 1.05,
                    scaleY: 0.95
                }
            }
        };

        // 得瑟
        enterAnimation.tada = {
            scale: true,
            timing: animation.Timing.linear,
            progress: {
                "10 20": {
                    scale: 0.9,
                    rotate: -3
                },
                "30 50 70 90": {
                    scale: 1.1,
                    rotate: 3
                },
                "40 60 80": {
                    scale: 1.1,
                    rotate: -3
                }
            }
        };

        // 钟摆
        enterAnimation.wobble = {
            duration: 0.8,
            progress: {
                "15": {
                    x: "-25%",
                    rotate: -5
                },
                "30": {
                    x: "20%",
                    rotate: 3
                },
                "45": {
                    x: "-15%",
                    rotate: -3
                },
                "60": {
                    x: "10%",
                    rotate: 2
                },
                "75": {
                    x: "-5%",
                    rotate: -1
                }
            }
        };

        // 抖动
        enterAnimation.shake = {
            timing: animation.Timing.linear,
            duration: 1,
            progress: {
                "10 30 50 70 90": {
                    x: -10
                },
                "20 40 60 80": {
                    x: 10
                }
            }
        };

        // 落下抖动
        enterAnimation.fallDownAndShake = {
            duration: 0.7,
            timing: animation.Timing.easeOut,
            progress: {
                "0": {
                    rotate: -15,
                    y: -800
                },
                "40": {
                    rotate: -15
                },
                "45": {
                    rotate: 13
                },
                "52": {
                    rotate: -8
                },
                "62": {
                    rotate: 5
                },
                "74": {
                    rotate: -3
                },
                "87": {
                    rotate: 1
                }
            }
        };

        // 弹性
        enterAnimation.bounceIn = {
            duration: 0.75,
            timing: animation.Bezier(0.215, 0.610, 0.355, 1.000),
            scale: true,
            progress: {
                "0": {
                    opacity: 0,
                    scale: 0.3
                },
                "20": {
                    scale: 1.1
                },
                "40": {
                    scale: 0.9
                },
                "60": {
                    scale: 1.03
                },
                "80": {
                    scale: 0.97
                }
            }
        };

        // 弹入
        enterAnimation.BounceFlying = function (dir) {
            var x = 0, y = 0;

            switch (dir) {
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
                timing: animation.Bezier(0.215, 0.610, 0.355, 1.000),
                duration: 0.75,
                progress: {
                    "0": {
                        x: -3000 * x,
                        y: -3000 * y
                    },
                    "60": {
                        x: 25 * x,
                        y: 25 * y
                    },
                    "75": {
                        x: -10 * x,
                        y: -10 * y
                    },
                    "90": {
                        x: 5 * x,
                        y: 5 * y
                    }
                }
            };
        };

        // 挂摆
        enterAnimation.swing = {
            emphasize: true,
            origin: [0.5, 0],
            progress: {
                "0 100": {
                    rotate: 0
                },
                20: {
                    rotate: 15
                },
                40: {
                    rotate: -10
                },
                60: {
                    rotate: 5
                },
                80: {
                    rotate: -5
                }
            }
        };

        // 闪烁
        enterAnimation.flash = {
            timing: animation.Timing.linear,
            progress: {
                "0 66": {
                    opacity: 0
                },
                "33": {
                    opacity: 1
                }
            }
        };

        // 回旋
        enterAnimation.circleRound = {
            scale: true,
            duration: 0.6,
            progress: {
                0: {
                    scale: 0.001,
                    opacity: 0,
                    rotate: 180 * 2.5
                },
                100: {
                    scale: 1,
                    rotate: 0
                }
            }
        };

        // 远近翻转
        enterAnimation.roundFromFarAndNear = {
            scale: true,
            timing: animation.Timing.linear,
            durationCorrect: -0.2,
            progress: {
                "0": {
                    scale: 0.3,
                    opacity: 0,
                    rotate: 180 * 0.45
                }
            }
        };

        // 淡入
        enterAnimation.fadeIn = {
            progress: {
                "0": {
                    opacity: 0
                }
            }
        };

        // 浮现
        enterAnimation.Emerge = function (direction) {
            var xy = Direction(direction === undefined ? 2 : direction);

            return {
                direction: direction,
                progress: {
                    "0": {
                        x: xy[0] * 20,
                        y: xy[1] * 20,
                        opacity: 0
                    }
                }
            }
        };

        // 缩小
        enterAnimation.shrink = {
            duration: 0.6,
            timing: animation.Bezier(.52, .21, .8, .51),
            progress: {
                "0": {
                    scale: 5,
                    opacity: 0
                }
            }
        };

        // 从小变大
        enterAnimation.scale = {
            scale: true,
            progress: {
                "0": {
                    scale: 0.001
                }
            }
        };

        // 翻转
        enterAnimation.overturn = {
            progress: {
                "0": {
                    perspective: 400,
                    opacity: -0.3,
                    rotateY: 180
                },
                100: {
                    perspective: 400
                }
            }
        };

        // 硬币
        enterAnimation.coin = {
            progress: {
                "0": {
                    rotateY: -720,
                    perspective: 400,
                    opacity: 0
                },
                "85": {
                    rotateY: 30,
                    perspective: 400
                },
                100: {
                    rotateY: 0,
                    perspective: 400
                }
            }
        };

        // 新
        enterAnimation.flip = {
            emphasize: true,
            progress: {
                "0": {
                    perspective: 400,
                    rotateY: -360,
                    timing: animation.Timing.easeOut
                },
                "40": {
                    perspective: 400,
                    z: 150,
                    rotateY: -190,
                    timing: animation.Timing.easeOut
                },
                "50": {
                    perspective: 400,
                    z: 150,
                    rotateY: -170,
                    timing: animation.Timing.easeIn
                },
                "80": {
                    perspective: 400,
                    scale: 0.95,
                    timing: animation.Timing.easeIn
                },
                "100": {
                    perspective: 400
                }
            }
        };

        enterAnimation.FlipIn = function (direction) {
            var signX = 0, signY = 0;
            if (direction === "x") {
                signX = 1;
            }
            else {
                signY = 1;
            }

            return {
                duration: 0.8,
                progress: {
                    "0": {
                        opacity: 0,
                        perspective: 400,
                        rotateX: 90 * signX,
                        rotateY: 90 * signY,
                        timing: animation.Timing.easeIn
                    },
                    "40": {
                        perspective: 400,
                        rotateX: -20 * signX,
                        rotateY: -20 * signY,
                        timing: animation.Timing.easeIn
                    },
                    "60": {
                        perspective: 400,
                        rotateX: 10 * signX,
                        rotateY: 10 * signY,
                        timing: animation.Timing.easeIn
                    },
                    "80": {
                        perspective: 400,
                        rotateX: -5 * signX,
                        rotateY: -5 * signY,
                        timing: animation.Timing.easeIn
                    },
                    "100": {
                        perspective: 400
                    }
                }
            };
        };

        // 刹车
        enterAnimation.LightSpeedIn = function (direction) {
            var xy = Direction(direction),
                x = xy[0], y = xy[1];

            return {
                direction: direction,
                progress: {
                    "0": {
                        opacity: 0,
                        x: x * 100 + "%",
                        y: y * 100 + "%",
                        skewX: x * -30,
                        skewY: y * -30
                    },
                    "40": {
                        skewX: x * 20,
                        skewY: y * 20
                    },
                    "60": {
                        skewX: x * -5,
                        skewY: y * -5
                    }
                }
            }
        };

        enterAnimation.RotateIn = function (direction) {
            var x = 0, y = 0;

            switch (direction) {
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
                durationCorrect: -0.2,
                origin: [0.5 + x * 0.5, 0.5 + y * 0.5],
                progress: {
                    0: {
                        opacity: 0,
                        rotate: x * y * 45
                    },
                    100: {
                        rotate: 0
                    }
                }
            };
        };

        enterAnimation.ZoomIn = function (direction) {
            var xy = Direction(direction),
                x = xy[0], y = xy[1];

            return {
                scale: true,
                direction: direction,
                progress: {
                    "0": {
                        opacity: 0,
                        scale: 0.1,
                        x: x * 300,
                        y: y * 300,
                        timing: animation.Bezier(0.550, 0.055, 0.675, 0.190)
                    },
                    "60": {
                        scale: 0.475,
                        x: x * -1 * 10,
                        y: y * -1 * 10,
                        timing: animation.Bezier(0.175, 0.885, 0.320, 1)
                    }
                }
            };
        };

        enterAnimation.Wave = function (direction) {
            var xy = Direction(direction), x = xy[0];
            return {
                direction: direction,
                duration: 2,
                timing: animation.Timing.easeInOut,
                progress: {
                    "0": {
                        x: percent(x * 200),
                        y: "-60%",
                        opacity: 0
                    },
                    10: {
                        x: percent(x * 150),
                        y: "50%"
                    },
                    20: {
                        x: percent(x * 100),
                        y: "-50%"
                    },
                    30: {
                        x: percent(x * 50),
                        y: "30%"
                    },
                    40: {
                        x: percent(x * 30),
                        y: "-20%"
                    },
                    50: {
                        x: percent(x * 20),
                        y: "10%"
                    },
                    60: {
                        x: percent(x * 10),
                        y: "-10%"
                    },
                    70: {
                        x: percent(x * 8),
                        y: "5%"
                    },
                    80: {
                        x: percent(x * 6),
                        y: "-3%"
                    },
                    90: {
                        x: percent(x * 3),
                        y: "1%"
                    }
                }
            };
        };

        // 爬行
        enterAnimation.Creep = function (direction) {
            var xy = Direction(direction), y = xy[1];

            return {
                direction: direction,
                duration: 2,
                timing: animation.Timing.easeInOut,
                progress: {
                    0: {
                        y: percent(y * 100),
                        opacity: 0
                    },
                    25: {
                        y: percent(y * 75),
                        rotateX: 180,
                        opacity: 0.5
                    },
                    50: {
                        y: percent(y * 50),
                        rotateX: 360
                    },
                    75: {
                        y: percent(y * 25),
                        rotateX: 540
                    },
                    100: {
                        y: 0,
                        rotateX: 720,
                        opacity: 1
                    }
                }
            };
        };

        // 回旋镖
        enterAnimation.boomerang = {
            duration: 1,
            timing: animation.Timing.easeIn,
            progress: {
                0: {
                    x: "-200%",
                    y: "-100%",
                    rotate: 0,
                    scale: 0.2,
                    opacity: 0
                },
                16: {
                    x: "-150%",
                    y: "-75%",
                    rotate: 180,
                    scale: 0.4
                },
                32: {
                    x: "-100%",
                    y: "-50%",
                    rotate: 360,
                    scale: 0.6
                },
                48: {
                    x: "-50%",
                    y: "-25%",
                    rotate: 540,
                    scale: 0.8
                },
                64: {
                    x: 0,
                    y: 0,
                    rotate: 720,
                    scale: 1
                },
                80: {
                    x: "20%",
                    y: "10%",
                    rotate: 900,
                    scale: 1.4
                },
                100: {
                    x: 0,
                    y: 0,
                    rotate: 1080,
                    scale: 1
                }
            }
        };

        enterAnimation.table = {
            "fly-into-left": enterAnimation.FlyInto(3),
            "fly-into-top": enterAnimation.FlyInto(0),
            "fly-into-right": enterAnimation.FlyInto(1),
            "fly-into-bottom": enterAnimation.FlyInto(2),
            "emerge-left": enterAnimation.Emerge(3),
            "emerge-top": enterAnimation.Emerge(0),
            "emerge-right": enterAnimation.Emerge(1),
            "emerge-bottom": enterAnimation.Emerge(2),
            scale: enterAnimation.scale,
            "fade-in": enterAnimation.fadeIn,
            "circle-round": enterAnimation.circleRound,
            "round-from-far-and-near": enterAnimation.roundFromFarAndNear,
            "curve-up": enterAnimation.roundFromFarAndNear,
            "fall-down-and-shake": enterAnimation.fallDownAndShake,
            shrink: enterAnimation.shrink,
            flash: enterAnimation.flash,
            shake: enterAnimation.shake,
            wobble: enterAnimation.wobble,
            tada: enterAnimation.tada,
            "bounce-in": enterAnimation.bounceIn,
            "bounce-in-down": enterAnimation.BounceFlying(2),
            "bounce-in-up": enterAnimation.BounceFlying(0),
            "bounce-in-left": enterAnimation.BounceFlying(3),
            "bounce-in-right": enterAnimation.BounceFlying(1),
            swing: enterAnimation.swing,
            "rubber-band": enterAnimation.rubberBand,
            overturn: enterAnimation.overturn,
            coin: enterAnimation.coin,
            flip: enterAnimation.flip,
            "flip-in-x": enterAnimation.FlipIn("x"),
            "flip-in-y": enterAnimation.FlipIn("y"),
            "light-speed-in-top": enterAnimation.LightSpeedIn(0),
            "light-speed-in-right": enterAnimation.LightSpeedIn(1),
            "light-speed-in-bottom": enterAnimation.LightSpeedIn(2),
            "light-speed-in-left": enterAnimation.LightSpeedIn(3),
            "rotate-in-left-top": enterAnimation.RotateIn(0),
            "rotate-in-right-top": enterAnimation.RotateIn(1),
            "rotate-in-left-bottom": enterAnimation.RotateIn(3),
            "rotate-in-right-bottom": enterAnimation.RotateIn(2),
            "zoom-in-left": enterAnimation.ZoomIn(3),
            "zoom-in-right": enterAnimation.ZoomIn(1),
            "zoom-in-top": enterAnimation.ZoomIn(0),
            "zoom-in-bottom": enterAnimation.ZoomIn(2),
            "wave-left": enterAnimation.Wave(3),
            "wave-right": enterAnimation.Wave(1),
            "creep-top": enterAnimation.Creep(0),
            "creep-bottom": enterAnimation.Creep(2)
        };

        library["37"] = enterAnimation;
    });
    /**
     * Created by 白 on 2014/12/26.
     */
    //39
    library(function () {
        var relativeX = Relative("w", "x"),
            relativeY = Relative("h", "y");

        function Relative(sizeName, posName) {
            return function (d, dAlign, s, sAlign, isIn) {
                return s[sizeName] * sAlign - d[sizeName] * dAlign + ( isIn ? 0 : ( s[posName] || 0 ) );
            };
        }

        function RelativeX(dAlign, sAlign) {
            return function (d, s, isIn) {
                return relativeX(d, dAlign, s, sAlign, isIn);
            }
        }

        function RelativeY(dAlign, sAlign) {
            return function (d, s, isIn) {
                return relativeY(d, dAlign, s, sAlign, isIn);
            }
        }

        library["38"] = {
            leftIn: RelativeX(0, 0),
            leftTo: RelativeX(1, 0),
            rightIn: RelativeX(1, 1),
            rightTo: RelativeX(0, 1),
            center: RelativeX(0.5, 0.5),
            topIn: RelativeY(0, 0),
            topTo: RelativeY(1, 0),
            bottomIn: RelativeY(1, 1),
            bottomTo: RelativeY(0, 1),
            middle: RelativeY(0.5, 0.5),

            right: function (ps) {
                return ps.x + ps.w;
            },
            bottom: function (ps) {
                return ps.y + ps.h;
            }
        };
    });
    /**
     * Created by 白 on 2015/3/18.
     * 多图组件
     */
    //40
    library(function () {
        var math = library["31"],
            animation = library["32"],
            ui = library["26"],
            p = library["38"],
            Layout = library["19"];

        function applyAnimation(arg, enterDelay) {
            var last = {
                duration: 0,
                delay: 0
            };

            _.each(arg.images, function (image, i) {
                last = image.enter = {
                    duration: 0.6,
                    delay: enterDelay + i * 0.3,
                    progress: {
                        "0": {
                            rotate: -30,
                            scale: !_.userAgent.ios && !_.userAgent.iphone6 ? 1 : 3,
                            x: -arg.w * 2.4,
                            y: arg.h * 2.4
                        }
                    }
                };
            });

            return last.duration + last.delay;
        }

        function MultiImage(arg) {
            var layout = arg.layout,
                body = layout.element,
                parent = arg.parent,
                images = arg.images,
                len = images.length,

                enterDelay = arg.delay || 0,
                deg = arg.sign * Math.min(25 / len, 4),
                arrowIcon = arg.arrow,

                width = parent.w,
                height = parent.h,

                duration = math.range(3 / len, 0.08, 0.6),
                delay = math.range(1.5 / len, 0.04, 0.3);

            _.each(images, function (image, i) {
                image.x = p.center(image, parent, true);
                image.y = p.middle(image, parent, true);
                image.zi = 10000 + i;
                image.rotate = ( i + 1 - len ) * deg;
                image.appendTo(parent);
            });

            if (arg.animation !== false) {
                applyAnimation({
                    images: images,
                    w: width,
                    h: height
                }, enterDelay);
            }

            layout.onEnterEnd(function () {
                var curTopIndex = len - 1,
                    resetHandles = null,
                    flyHandle = null;

                function fly(direction) {
                    var lock = ui.Lock(),
                        flyIndex = curTopIndex--,
                        flyImage = images[( flyIndex % len + len ) % len];

                    // 移除重置动画
                    if (resetHandles) {
                        resetHandles = null;
                    }

                    flyHandle = _.layout.transition(flyImage, {
                        end: {
                            x: ( direction ? layout.w : -flyImage.w ),
                            opacity: 0
                        },
                        duration: 0.3,
                        onEnd: function () {
                            flyHandle = null;
                            flyImage.x = p.center(flyImage, parent, true);
                            flyImage.opacity = 1;
                            flyImage.zi -= len;
                            flyImage.rotate = ( 1 - len ) * deg;

                            // 启动重制动画
                            resetHandles = _.map(images, function (image, pos) {
                                var bottomImage = images[( ( flyIndex + pos ) % len + len ) % len];
                                return _.layout.transition(bottomImage, {
                                    end: {
                                        rotate: ( pos + 1 - len ) * deg
                                    },
                                    timing: animation.Timing.easeOut,
                                    delay: delay * pos / 2,
                                    duration: duration / 2
                                });
                            });

                            lock.remove();
                        }
                    });
                }

                // 滑动动画
                ui.onSwipeStart(parent.element, function (event) {
                    event.xOut && fly(event.dX > 0);
                });

                // 显示箭头
                if (arrowIcon) {
                    _.css(prev, "opacity", 1);
                    _.css(next, "opacity", 1);
                }

                // 结束时快进动画
                layout.onRemove(function () {
                    flyHandle && flyHandle.fastForward();
                    if (resetHandles) {
                        _.each(resetHandles, function (animation) {
                            animation.fastForward();
                        });
                        resetHandles = null;
                    }
                });
            });

            if (arrowIcon) {
                var prev = _.element.element(arrowIcon, {
                        css: {
                            width: _.css.px(arrowIcon.w),
                            height: _.css.px(arrowIcon.h)
                        }
                    }), next = arrowIcon.cloneNode(true),
                    offset = arrowIcon.offset || 15;

                function guideAnimation(sign) {
                    function pos(x) {
                        return {
                            transform: [_.css.scale(sign, 1), _.css.translate(x, 0, 0)].join(" ")
                        };
                    }

                    return _.animation.animation([{
                        0: pos(0),
                        20: pos(0),
                        35: pos(12),
                        50: pos(-20),
                        65: pos(0),
                        80: pos(-12),
                        100: pos(0)
                    }, 1.5, "infinite"]);
                }

                _.each([prev, next], function (arrow) {
                    _.css(arrow, {
                        visibility: "visible",
                        "z-index": 10000,
                        opacity: 0,
                        transition: "0.8s"
                    });
                });

                layout.onShow(function () {
                    _.css(prev, {
                        position: "absolute",
                        left: _.css.px(p.leftIn(prev, layout) + offset),
                        top: _.css.px(p.middle(prev, parent)),
                        animation: guideAnimation(1)
                    });

                    _.css(next, {
                        position: "absolute",
                        left: _.css.px(p.rightIn(prev, layout, true) - offset),
                        top: _.css.px(p.middle(prev, parent)),
                        animation: guideAnimation(-1)
                    });

                    body.appendChild(prev);
                    body.appendChild(next);
                });

                layout.onRemove(function () {
                    _.element.remove(prev);
                    _.element.remove(next);
                });
            }
        }

        MultiImage.applyAnimation = applyAnimation;
        library["39"] = MultiImage;
    });
    /**
     * Created by 白 on 2015/8/14.
     */
    //41
    library(function () {
        var random = library["33"],
            multiImage = library["39"];

        // 为一组组件添加速度
        function applySpeed(components, duration, delay, last) {
            var lastEnter = null;
            last = last || 0;
            _.each(components, function (comp, i) {
                lastEnter = comp.enter = _.omit(_.extend(comp.enter, {
                    duration: duration + ( comp.enter.durationCorrect || 0 ),
                    delay: (comp.enter.kahn1990_delayIf == true) ? comp.enter.kahn1990_delay : (delay * duration * i + last)
                }), _.isUndefined);
            });
            return lastEnter ? lastEnter.duration + lastEnter.delay : last;
        }

        // 分析页面
        function analyzePage(page) {
            var layout = page.wrapper,
                enterComponentTable = {
                    text: [],
                    image: [],
                    mulitimage: []
                };

            // 提取需要动画的元素,并根据类型计数
            _.layout.loopComponent(layout, function (component) {
                var applyEnter = component.applyEnter || {},
                    type = applyEnter.type;

                if (type) {
                    enterComponentTable[type] = enterComponentTable[type] || [];
                    enterComponentTable[type].push(component);
                }
            });

            return enterComponentTable;
        }

        // 应用页面动画
        function applyAnimate(page, appliedGroup) {
            var layout = page.wrapper,
                applyEnter = layout.applyEnter,
                enterComponentTable = analyzePage(page),
                speed, pageRandom,
                last = 0;

            function applySpeedA(components, duration, delay) {
                last = applySpeed(components, duration, delay, last);
            }

            if (applyEnter && appliedGroup) {
                pageRandom = random.Random(appliedGroup.seed);
                speed = appliedGroup.speed;

                // 分配动画
                _.each([[enterComponentTable.image, appliedGroup.imageGroup], [enterComponentTable.text, appliedGroup.textGroup]], function (arg) {
                    _.each(arg[0], function (comp) {
                        var midPoint = _.are2d.transform(_.layout.getPageMatrix(comp), [comp.w / 2, comp.h / 2, 1]);
                        comp.enter = pageRandom.select(_.filter(arg[1], function (enter) {
                            return !(enter.direction === ( midPoint[1] + 1 >= layout.h / 2 ? 0 : 2 ) ||
                            enter.direction === ( midPoint[0] + 1 >= layout.w / 2 ? 3 : 1 ));
                        }));
                    });
                });

                // 有序
                if (appliedGroup.inOrder === true || ( appliedGroup.inOrder == null && pageRandom() > 0.5 )) {
                    if (applyEnter.first === "text") {
                        applySpeedA(enterComponentTable.text, speed[2], speed[3]);
                        applySpeedA(enterComponentTable.image, speed[0], speed[1]);
                    }
                    else {
                        applySpeedA(enterComponentTable.image, speed[0], speed[1]);
                        applySpeedA(enterComponentTable.text, speed[2], speed[3]);
                    }
                }
                // 无序
                else {
                    var unorderedComponents = pageRandom.arrange(enterComponentTable.text.concat(enterComponentTable.image)),
                        unorderedTexts = [], unorderedTextIndexes = [];

                    // 调整文字顺序,保证标题总在最前
                    _.each(unorderedComponents, function (comp, i) {
                        if (comp.applyEnter.type === "text") {
                            unorderedTextIndexes.push(i);
                            unorderedTexts.push(comp);
                        }
                    });

                    _.each(unorderedTexts.sort(function (lhs, rhs) {
                        return lhs.zi - rhs.zi;
                    }), function (comp, i) {
                        unorderedComponents[unorderedTextIndexes[i]] = comp;
                    });

                    applySpeedA(unorderedComponents, speed[4], speed[5]);
                }

                // 处理多图
                _.each(enterComponentTable.mulitimage, function (comp) {
                    last = multiImage.applyAnimation(comp, last);
                });
            }
        }

        library["40"].analyzePage = analyzePage;
        library["40"].applySpeed = applySpeed;
        library["40"].applyAnimate = applyAnimate;
    });
    /**
     * Created by 白 on 2015/3/13.
     */
    //42
    library(function () {
        var array = library["1"],
            scaleComponent = library["36"],
            enterAnimation = library["37"],
            pageAnimation = library["40"],
            Content = library["24"],
            Transform = library["23"],
            MultiImage = library["39"],
            p = library["38"],
            layoutFormats = _.layout.formats,
            Component = _.layout.Component,
            animationTable = enterAnimation.table; // 动画表

        var filters = {
                1: "blur(6px)",
                2: "saturate(0)",
                3: "saturate(180%)",
                4: "sepia(100%)",
                5: "sepia(100%) blur(6px)",
                6: "brightness(1.5) contrast(150%)",
                7: "contrast(200%)",
                8: "brightness(0.5)",
                9: "hue-rotate(120deg)"
            },
            filterLoop = {
                7: true,
                8: true,
                9: true
            },
            lens = {
                1: {
                    0: {
                        opacity: 0
                    }
                },
                2: {
                    0: {
                        rotate: 0,
                        opacity: 0
                    },
                    100: {
                        rotate: -360,
                        opacity: 1
                    }
                },
                3: {
                    0: {
                        scale: 1.2,
                        x: "-6%"
                    },
                    100: {
                        scale: 1.2,
                        x: "6%"
                    }
                },
                4: {
                    0: {
                        scale: 1.2,
                        x: "6%"
                    },
                    100: {
                        scale: 1.2,
                        x: "-6%"
                    }
                },
                5: {
                    0: {
                        scale: 1.2,
                        y: "-6%"
                    },
                    100: {
                        scale: 1.2,
                        y: "6%"
                    }
                },
                6: {
                    0: {
                        scale: 1.2,
                        y: "6%"
                    },
                    100: {
                        scale: 1.2,
                        y: "-6%"
                    }
                },
                7: {
                    0: {
                        scale: 1.15
                    }
                },
                8: {
                    100: {
                        scale: 1.15
                    }
                },
                11: {
                    10: {
                        scale: 2
                    },
                    30: {
                        x: "50%",
                        scale: 2
                    },
                    50: {
                        x: "50%",
                        scale: 2
                    },
                    80: {
                        x: "50%",
                        scale: 2
                    }
                },
                12: {
                    10: {
                        scale: 2
                    },
                    30: {
                        y: "-50%",
                        scale: 2
                    },
                    50: {
                        y: "-50%",
                        x: "-20%",
                        scale: 2
                    },
                    70: {
                        x: "50%",
                        scale: 2
                    },
                    85: {
                        y: "50%",
                        scale: 2
                    },
                    95: {
                        scale: 2
                    }
                }
            },
            lensTiming = {
                2: "linear",
                3: "linear",
                4: "linear",
                5: "linear",
                6: "linear",
                7: "linear",
                8: "linear",
                11: "linear",
                12: "linear"
            };

        function dealWidth(value, func) {
            if (value != null) {
                return func(value);
            }
        }

        function defaultValue(val, defaultValue) {
            return val == null ? defaultValue : val;
        }

        function layCustom(layout, ds, type) {
            var components = ds.component(),
                custom = ds.custom,
                isScreen = type === "screen" || custom.layoutType === "screen",
                isOld = !isScreen && custom.label === "custom",
                transform = isOld ? Transform.cover504(layout) : custom.type === "cover" ? Transform.cover(layout) : Transform.y(layout),
                scale = transform.scale,
                xScale = layout.xScale, yScale = layout.yScale,
                curDelay = 0;

            function Custom(img, info) {
                var width = ( info.width - ( info.borderWidth || 0 ) ) * scale << 0,
                    height = ( info.type === "text" && img.h ? width / img.whr : info.height * scale ) << 0,
                    content = img.color ? Content.Rect(width, height, img.color) :
                        ds.cut === false ? Content.Cover(img, {w: width, h: height}) : Content.Image(img, {
                            w: width,
                            h: height
                        });

                return img.mask ? Content.Mask(content, img.mask) : content;
            }

            layout.applyEnter = {
                first: custom.animationFirst,
                pageAnimation: ds.pageAnimation
            };

            // 生成组件
            array.foreach(components, function (img, index) {
                var info = img.info,
                    component = null;

                // 处理图片
                function dealImage(img, componentInfo, parent) {
                    var imageInfo = componentInfo.info;

                    // 边框图
                    if (componentInfo.frame != null) {
                        return dealWidth(componentInfo.frame, function (frameImg) {
                            var frameInfo = frame_.img.info,
                                frame = Component(Custom(frameImg, frameInfo)),
                                content = Component(Custom(img, imageInfo)),
                                wrapper = Component(Content.Rect(frame.w, frame.h), parent);

                            wrapper.origin = _.are2d.transform(transform.matrix, [frameInfo.x, frameInfo.y, 1]);
                            content.origin = [( imageInfo.x - frameInfo.x ) * scale, ( imageInfo.y - frameInfo.y ) * scale];
                            frame.appendTo(wrapper);
                            content.appendTo(wrapper);
                            wrapper.info = _.extend(frameInfo, {
                                type: "image"
                            });

                            wrapper.content = content;

                            return wrapper;
                        });
                    }

                    // 边框
                    if (imageInfo.maskRadius || imageInfo.borderWidth || imageInfo.borderColor) {
                        return Component(Content.Border(Custom(img, imageInfo), {
                            radius: imageInfo.maskRadius * scale << 0,
                            width: imageInfo.borderWidth * scale << 0,
                            color: imageInfo.borderColor
                        }), parent);
                    }

                    return Component(Custom(img, imageInfo), parent);
                }

                // 背景图
                if (info == null) {
                    if (img.color) {
                        layout.background = img.color;
                    }
                    else {
                        // 背景覆盖
                        if (isOld || custom.type === "cover" || isScreen) {
                            component = layout.backgroundImage = Component(Content.Cover(img, layout), layout);
                            component.applyEnter = {
                                type: "background",
                                coverBackground: true
                            };
                        }
                        // 背景撑满y
                        else {
                            component = Component(Content.Image(img, layout.h / img.h), layout);
                            component.x = p.center(component, layout);
                            component.applyEnter = {
                                type: "background",
                                coverBackground: false
                            };
                        }
                    }
                }
                // 屏幕图
                else if (info.type === "screen") {
                    component = Component(Content.Image(img, layout.w, layout.h), layout);
                }
                // 一般组件
                else {
                    if (isScreen) {
                        !function () {
                            var x = info.x * xScale << 0, y = info.y * yScale << 0,
                                width = Math.round(info.width * xScale),
                                height = Math.round(( info.type === "text" ? info.width / img.whr : info.height ) * yScale),
                                content;

                            // 遮罩
                            if (info.type === "text") {
                                var scale = Math.min(width / img.w, height / img.h);
                                x += width - img.w * scale;
                                y += height - img.h * scale;
                                component = Component(Content.Image(img, scale), layout);
                            }
                            else {
                                content = Content.Cover(img, {w: width, h: height});
                                component = Component(img.mask ? Content.Mask(content, img.mask) : content, layout);
                            }

                            component.origin = [x, y];
                        }();
                    }
                    else {
                        if (img.multiImage) {
                            // 多图
                            dealWidth(img.multiImage, function (images) {
                                component = Component(Custom({
                                    color: "transparent"
                                }, info), layout);

                                MultiImage({
                                    layout: layout,
                                    parent: component,
                                    images: component.images = array.map(images, function (contentImg) {
                                        return dealImage(contentImg, img);
                                    }),
                                    delay: 3,
                                    sign: -1,
                                    animation: false,
                                    arrow: img.arrow
                                });
                            });
                        }
                        else {
                            component = dealImage(img, img, layout);
                        }

                        info = component.info || info;
                        var point = _.are2d.transform(transform.matrix, [info.x, info.y, 1]);
                        component.origin = array.map([[point[0], info.alignX, layout.w, component.w],
                            [point[1], info.alignY, layout.h, component.h]], array.apply(function (x, align, pw, w) {
                            return align != null ? ( pw - w ) * align : x;
                        }));
                        delete component.info;
                    }

                    component.rotate = ( info.rotate || 0 ) * 180 / Math.PI;
                    component.opacity = defaultValue(info.opacity, 1);
                    component.zi = info && info.type === "text" ? 100 + index : index;

                    // 缩放文字使全部显示
                    if (info.type === "text") {
                        component.scale *= Math.max(scaleComponent(component, layout), 0.5);
                        component.text = true;
                    }

                    // 处理动画
                    if (isOld) {
                        var enter = _.extend(animationTable[info.animation] || enterAnimation.Emerge(), {
                                duration: info["animation-duration"]
                            }),
                            delay = info["animation-delay"];

                        enter.delay = delay === undefined || delay === null ? curDelay : delay;
                        curDelay = enter.delay + ( enter.duration || 1 );
                        component.enter = enter;
                    }
                    else {
                        component.applyEnter = info.type == null ? undefined : {
                            type: info.type,
                            enterTiming: info.enterTiming,
                            animationIndex: info.animationIndex,
                            animation: info.animation,
                            index: index
                        };
                    }
                }

                if (component) {
                    component.custom = true;
                    component.customInfo = info;
                    component.isElement = true;

                    function Wrapper(content) {
                        var wrapper = Component(Content.Rect(content.w, content.h), content.parent);
                        wrapper.origin = content.origin;
                        wrapper.rotate = content.rotate;
                        wrapper.scale = content.scale;

                        content.origin = [0, 0];
                        content.rotate = 0;
                        content.scale = 1;
                        content.appendTo(wrapper);

                        // 外置mask
                        mask = content.element.mask;
                        if (mask) {
                            _.css.remove(content.element, ["mask-image", "mask-size"]);
                            _.css(wrapper.element, {
                                "mask-image": _.css.url(mask),
                                "mask-size": "100% 100%"
                            });
                            wrapper.element.mask = mask;
                        }

                        return wrapper;
                    }

                    var filter = img.filter,
                        camera = img.camera,
                        content = component.content || component,
                        wrapper, mask;

                    if (filter && _.userAgent.ios) {
                        wrapper = Wrapper(content);
                        var forward = _.layout.cloneComponent(content),
                            progress;

                        forward.appendTo(wrapper);
                        forward.opacity = 0;
                        forward.zi = 1000;

                        if (filterLoop[filter]) {
                            progress = {
                                50: {
                                    absOpacity: 1
                                }
                            };
                        }
                        else {
                            progress = {
                                0: {
                                    absOpacity: 1
                                }
                            };
                        }

                        _.css(forward.element, "filter", filters[filter]);
                        forward.enter = {
                            progress: progress,
                            duration: 2.5
                        };
                    }

                    if (camera) {
                        component.applyEnter = false;
                        content = wrapper || content;
                        wrapper = Wrapper(content);

                        _.css(wrapper.element, "overflow", "hidden");

                        lens[camera] && ( content.enter = {
                            both: true,
                            progress: lens[camera],
                            duration: 3,
                            timing: lensTiming[camera]
                        } );

                        if (forward) {
                            forward.enter.duration = 5;
                        }
                    }
                }
            });
        }

        // 组件板式
        layoutFormats.components = {
            create: layCustom
        };

        // 屏幕板式
        layoutFormats.screen = {
            create: function (layout, ds) {
                layCustom(layout, ds, "screen");
            }
        };

        // 单图板式
        layoutFormats.SingleImage = {
            create: function (layout, ds) {
                var background = Component(Content.Cover(ds.image(0), layout), layout);
                background.isElement = true;
            }
        };

        // 空板式,仅为加载
        layoutFormats.custom = layoutFormats["custom-2"] = {};

        // 多图
        layoutFormats.MutipleImage01 = {
            resource: {
                arrow: "arrow/mi01"
            },
            create: function (layout, ds, resource) {
                var height = layout.h * 0.82 << 0,
                    frame = Component(Content.Rect(height / 410 * 244 << 0, height), layout); // 多图框

                frame.x = p.center(frame, layout);
                frame.y = p.middle(frame, layout);

                // 多图组件
                MultiImage({
                    layout: layout,
                    parent: frame,
                    images: array.map(ds.component(0).multiImage, function (img) {
                        return Component(Content.Border(Content.Cover(img, frame), {
                            width: 3,
                            color: "#FFFFFF"
                        }), null, true);
                    }),
                    sign: -1,
                    arrow: resource.arrow
                });
            }
        };

        // 三行字+多图
        layoutFormats.MutipleImage04 = {
            resource: {
                background: "mi04-background.jpg",
                arrow: "arrow/mi04"
            },
            create: function (layout, ds, resource) {
                var scale = layout.yScale;

                // 背景图
                Component(Content.Image(resource.background, layout.w, layout.h), layout);

                // 元素
                var text1 = Component(Content.Image(ds.component(0), scale), layout),
                    text2 = Component(Content.Image(ds.component(1), scale), layout),
                    text3 = Component(Content.Image(ds.component(2), scale), layout),
                    frame = Component(Content.Rect(356 / 2 * scale, 518 / 2 * scale), layout);

                text2.y = p.bottomTo(text2, text1) + 11 * scale;
                text3.y = p.bottomTo(text3, text2) + 19 * scale;
                frame.y = p.bottomTo(frame, text3) + 39 * scale;

                // 垂直居中
                var padding = ( layout.h - p.bottom(frame) ) / 2 << 0;
                array.foreach([text1, text2, text3, frame], function (comp) {
                    comp.y += padding;
                    comp.x = p.center(comp, layout);
                });

                // 入场动画
                text1.enter = text2.enter = text3.enter = enterAnimation.Emerge();
                pageAnimation.applySpeed([text1, text2, text3], 1, 1);

                // 多图组件
                MultiImage({
                    layout: layout,
                    parent: frame,
                    images: array.map(( ds.component(3) ).multiImage, function (img) {
                        return Component(Content.Border(Content.Cover(img, frame), {
                            width: 1,
                            color: "#FFFFFF"
                        }));
                    }),
                    delay: 3,
                    sign: -1,
                    arrow: resource.arrow
                });
            }
        };

        // 处理自定义板式的数据
        _.each(["SingleImage", "screen", "custom", "custom-2", "MutipleImage01", "MutipleImage04"], function (label) {
            layoutFormats[label].load = function (pageData, callback) {
                var newLabel = "components", components = [], componentImages = [], fail = false;

                // 计算新的label
                switch (label) {
                    case "MutipleImage01":
                    case "MutipleImage04":
                    case "screen":
                        newLabel = label;
                        break;
                }

                function ComponentImage(data) {
                    var url = data.url, img;
                    if (url) {
                        img = new Image();
                        img.targetSrc = url;
                        componentImages.push(img);
                    }
                    else {
                        img = {};
                    }

                    img.info = data.imageinfo == null ? null : _.extend({
                        x: 0,
                        y: 0
                    }, data.imageinfo);
                    img.filter = data.filter;
                    img.camera = data.camera;
                    return img;
                }

                array.foreach(pageData.image, function (data) {
                    if (data.url == null && data.images == null) {
                        if (data.imageinfo == null) {
                            fail = true;
                        }
                        return;
                    }

                    data = JSON.parse(JSON.stringify(data));
                    var component = ComponentImage(data),
                        mask, frame, multiImage;

                    components.push(component);

                    if (mask = data.mask) {
                        component.mask = ComponentImage(mask);
                    }

                    if (frame = data.frame) {
                        component.frame = ComponentImage(frame)
                    }

                    if (multiImage = data.images) {
                        component.multiImage = array.map(array.remove(multiImage, function (src) {
                            return src == null;
                        }), function (src) {
                            return ComponentImage({
                                url: src
                            });
                        });

                        component.arrow = ComponentImage({
                            url: data.arrow || "http://cloudl7dev.b0.upaiyun.com/a7802fd8f506dffd01df67d06308ecf9mi01-arrow.png"
                        });
                    }
                });

                callback(_.extend(pageData, {
                    label: newLabel,
                    fail: fail,
                    custom: _.extend(pageData.custom || {}, {
                        label: pageData.label
                    }),
                    componentImages: componentImages,
                    components: components
                }));
            };
        });

        library["41"].layCustom = layCustom;
    });
    /**
     * Created by 白 on 2014/11/24.
     * 初页系统的启动
     */
    //43
    library(function () {
        var loadWork = library["30"],
            Work = library["34"],
            env = library["27"],
            href = _.url.parse(location.href),
            hash = href.hash.replace("#", "");

        function WorkBody(url, arg) {
            return _.element.element(Work(_.omit(_.extend({
                loadWork: function (callback) {
                    return loadWork(url, callback);
                },
                music: !/ChuyeNoMusic/gi.test(navigator.userAgent) && !window.noMusic,
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                disableClickMode: _.userAgent.inChuyeList,
                toolbar: _.userAgent.MicroMessenger
            }, arg || {}), _.isUndefined)), {
                css: {
                    position: "absolute",
                    left: 0,
                    top: 0
                }
            });
        }

        // 如果有firstpageStyle,样式来自于脚本内部变量
        firstpageStyle && _.element.element("style", firstpageStyle, document.head);

        library["42"] = function () {
            var lock,
                curBody = document.body.appendChild(WorkBody(workDetailUrl, _.omit(_.extend({
                    pageIndex: parseInt(hash) == hash ? parseInt(hash) : undefined
                }, JSON.parse(env.getSessionData(env.workLocation()) || "{}")), _.isUndefined)));

            curBody.onLoad(function () {
                // 预加载
                curBody.preloadPage();
            });
            // 播放作品
            curBody.play();
            window.loadGA && window.loadGA();
            // 修改尺寸
            _.element.bind(window, "resize", function () {
                curBody.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
            });

            // 全局接口
            window.playAudio = function () {
                curBody && curBody.playAudio && curBody.playAudio();
            };

            window.stopAudio = function () {
                curBody && curBody.stopAudio && curBody.stopAudio();
            };

            Object.defineProperty(window, "curPageIndex", {
                set: function (index) {
                    curBody && ( curBody.curPageIndex = index );
                },
                get: function () {
                    return curBody ? curBody.curPageIndex : undefined;
                }
            });

            Object.defineProperty(window, "curPageData", {
                get: function () {
                    return curBody ? curBody.curPageData : undefined;
                }
            });

            Object.defineProperty(window, "curWork", {
                get: function () {
                    return curBody;
                }
            });
        };
    });
    /**
     * Created by Zuobai on 2015/8/2.
     * 输出压缩脚本
     */
    main(function () {
        window.runFirstPage = library["42"];
    });
    /**
     * Created by 白 on 2015/9/1.
     */
    //44
    library(function () {
        var animation = library["32"];

        library["43"] = function (workBody, musicIcon) {
            var workData = workBody.workData,
                src = workData.music ? workData.music.src : null, // 音乐src
                audio = _.element.element("<audio loop></audio>", workBody); // audio标签

            musicIcon = musicIcon || {};
            workBody.audioPlayIntention = true; // 音乐播放意图

            audio.onerror = function () {
                audio.onerror = null;
                audio.src = _.url.concatArg(src, {
                    t: new Date().getTime()
                });
                musicIcon.play && audio.play();
            };

            if (!_.userAgent.ios) {
                _.element.bind(audio, "loadeddata", function () {
                    animation.requestFrames({
                        duration: 3,
                        onAnimate: function (ratio) {
                            audio.volume = ratio < 0 ? 0 : ratio;
                        }
                    });
                });
            }

            // 停止播放音乐
            workBody.stopAudio = function () {
                if (musicIcon.play === true) {
                    workBody.audioPlayIntention = false;
                    musicIcon.play = false;
                    audio.pause();
                }
            };

            // 播放音乐
            workBody.playAudio = function () {
                if (!audio.src) {
                    audio.src = src;
                }

                if (musicIcon.play !== true) {
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
    });
    //45
    library({
        "group": {
            "1": {"s": [1, 0.4, 1.8, 0, 1.4, 0], "n": "梦幻浮现", "o": true, "i": 0, "t": 1},
            "2": {"s": [1, 0.4, 1.2, 0.2, 1, 0.6], "n": "花样绽放", "o": true, "i": 2, "t": 3},
            "3": {"s": [1, 0.4, 0.8, 0.2, 0.8, 0.2], "n": "轻舞飞扬", "o": true, "i": 4, "t": 5},
            "4": {"s": [1, 0.4, 1.4, 0.2, 1.4, 0.2], "n": "立体旋转", "o": true, "i": 6, "t": 6},
            "5": {"s": [1, 0.4, 1.2, 0.2, 1, 0.1], "n": "大气磅礴", "o": true, "i": 7, "t": 7},
            "6": {"s": [1, 0.4, 0.8, 0.2, 0.8, 0.2], "n": "诙谐颤抖", "o": true, "i": 8, "t": 9},
            "7": {"s": [1, 0.4, 1.2, 0.1, 0.8, 0.1], "n": "简约滑动", "o": true, "i": 10, "t": 11},
            "8": {"s": [1, 0.4, 0.8, 0.2, 0.8, 0.2], "n": "抖动下落", "o": true, "i": 12, "t": 12},
            "9": {"s": [1, 0.4, 0.8, 0.1, 0.8, 0.1], "n": "可爱果冻", "o": true, "i": 13, "t": 8},
            "14": {"s": [1, 0.4, 1, 0.2, 1.2, 0.2], "n": "灵性翻动", "o": true, "i": 1, "t": 14},
            "15": {"s": [1, 0.4, 1.2, 0, 1.2, 0], "n": "回忆浮现", "o": true, "i": 15, "t": 15},
            "16": {"s": [1, 0.4, 1.6, 0, 1.6, 0], "n": "眉飞色舞", "o": true, "i": 16, "t": 17},
            "17": {"s": [1, 0.25, 0.7, 0.2, 0.7, 0.2], "n": "摇摆摇摆", "o": true, "i": 18, "t": 18},
            "19": {"s": [1, 0.25, 1.2, 0.2, 0.7, 0.2], "n": "趣味变形", "o": true, "i": 17, "t": 19},
            "20": {"s": [1, 0.25, 0.8, 0.2, 0.8, 0.2], "n": "波浪翻动", "o": true, "i": 9, "t": 20}
        },
        "marshall": {
            "0": ["fly-into-top", "fly-into-right", "fly-into-bottom", "fly-into-left"],
            "1": ["flip-in-x", "flip-in-y"],
            "2": ["circle-round"],
            "3": ["curve-up"],
            "4": ["bounce-in", "bounce-in-up", "bounce-in-right", "bounce-in-down", "bounce-in-left"],
            "5": ["fly-into-top", "fly-into-right", "fly-into-bottom", "fly-into-left"],
            "6": ["overturn"],
            "7": ["shrink"],
            "8": ["tada"],
            "9": ["wave-left", "wave-right"],
            "10": ["rotate-in-left-top", "rotate-in-right-top", "rotate-in-left-bottom", "rotate-in-right-bottom"],
            "11": ["scale"],
            "12": ["fall-down-and-shake"],
            "13": ["rubber-band"],
            "14": ["fly-into-right", "fly-into-left"],
            "15": ["fade-in", "emerge-top", "emerge-right", "emerge-bottom", "emerge-left"],
            "16": ["zoom-in-left", "zoom-in-right", "zoom-in-top", "zoom-in-bottom"],
            "17": ["light-speed-in-top", "light-speed-in-right", "light-speed-in-bottom", "light-speed-in-left"],
            "18": ["swing"],
            "19": ["flash"],
            "20": ["creep-top", "creep-bottom"]
        }
    });
    /**
     * Created by 白 on 2015/8/14.
     * 动画数据
     */
    //46
    library(function () {
        var random = library["33"],
            sa = library["35"],
            ea = library["37"],
            pageAnimationData = library["44"],
            marshall = pageAnimationData.marshall,
            pageAnimations = _.map(pageAnimationData.group, function (g, id) {
                function Marshall(id) {
                    return Group(_.map(marshall[id], function (id) {
                        return ea.table[id];
                    }));
                }

                return {
                    id: {
                        seed: 0,
                        name: g.n,
                        speed: g.s,
                        inOrder: g.o,
                        imageGroup: Marshall(g.i),
                        textGroup: Marshall(g.t)
                    }
                }
            }),
            bounce = Group([DirectionGroup(ea.BounceFlying), ea.bounceIn]),
            swing = Group([ea.swing]),
            flipIn = Group([ea.FlipIn("x"), ea.FlipIn("y")]),
            shake = Group([ea.shake, ea.wobble]),
            fall = Group([ea.fallDownAndShake]),
            tada = Group([ea.tada]),
            rubberBand = Group([ea.rubberBand]),
            rotateIn = Group([DirectionGroup(ea.RotateIn)]),
            zoomIn = Group([DirectionGroup(ea.ZoomIn)]),
            lightSpeedIn = Group([DirectionGroup(ea.LightSpeedIn)]),
            wave = Group(DirectionGroup(ea.Wave, [1, 3])),
            creep = Group(DirectionGroup(ea.Creep, [0, 2])),
            circleRound = Group([ea.circleRound]),
            coin = Group([ea.coin]),
            emerge = Group([DirectionGroup(ea.Emerge), ea.fadeIn]),
            overturn = Group([ea.overturn]),
            shrink = Group([ea.shrink]),
            scale = Group([ea.scale]),
            flyInto = Group(DirectionGroup(ea.FlyInto)),
            flyIntoX = Group(DirectionGroup(ea.FlyInto, [1, 3])),
            roundFromFarAndNear = Group([ea.roundFromFarAndNear]);

        // 方向动画组
        function DirectionGroup(AnimationGen, directions) {
            return _.map(directions || _.range(4), function (direction) {
                return AnimationGen(direction);
            });
        }

        // 动画组
        function Group(group) {
            var result = [];
            _.each(group, function (group) {
                result = result.concat(group);
            });
            _.each(result, function (enter) {
                result.isEmphasize = _.layout.isEmphasize(enter);
                result.isScale = enter.scale;
                result.isPerspective = _.layout.isPerspective(enter);
            });
            return result;
        }

        // 获取速度
        function Speed(themeNumber) {
            return {
                1: [0.8, 0.1, 0.8, 0.1, 0.8, 0.1],
                2: [0.7, 0.1, 0.7, 0.1, 0.7, 0.1],
                3: [1.2, 0.3, 1.2, 0.1, 1.2, 0.3],
                4: [1.4, 0.3, 1.4, 0.1, 1.4, 0.3],
                5: [0.8, 0.3, 0.8, 0.1, 0.8, 0.1],
                6: [1.6, 0.6, 1.4, 0.1, 1.6, 0.3],
                7: [1.6, 0.5, 1.4, 0.3, 1.6, 0.1],
                8: [1.6, 0.3, 1.6, 0.1, 1.6, 0.3]
            }[themeNumber];
        }

        // 选择主题
        function Theme(workData) {
            var themeNumber = workData.theme,
                workRandom = random.Random(parseInt(workData.id)),
                seedRandom = random.Random(parseInt(workData.id)),
                switchAnimations = {
                    1: [sa.classic, sa.flipOver, sa.push],
                    2: [sa.fade, sa.classic, sa.door, sa.overturn, sa["switch"]],
                    3: [sa.classic, sa.push, sa.overturn],
                    4: [sa.classic, sa.uncover, sa.push, sa["switch"], sa.fade],
                    5: [sa.classic, sa.fade, sa.push],
                    6: [sa.classic, sa.fade, sa.push],


                    7: [sa.classic, sa.fade, sa.push],
                    8: [sa.classic, sa.uncover, sa.fade]
                }[themeNumber],
                switchAnimation = workRandom.select(_.userAgent.iphone6 ? _.filter(switchAnimations, function (a) {
                    return !a.highPerformance;
                }) : switchAnimations),
                lastTextGroups = [], lastImageGroups = [],
                appliedGroup = {};

            _.each(workData.pages, function (pageData, pageIndex) {
                var typeCount = {
                        image: 0,
                        text: 0
                    },
                    noScale = false;

                if (pageData.label === "custom-2" || pageData.label === "screen" || pageData.name === "screen") {
                    _.each(pageData.image, function (image) {
                        var imageInfo = image.imageinfo;
                        if (imageInfo) {
                            var type = imageInfo.type;
                            if (type in typeCount) {
                                typeCount[type]++;
                            }

                            noScale = noScale || !!image.mask || imageInfo.borderWidth > 0 || imageInfo.maskRadius > 0;
                        }
                    });

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
                        1: function () {
                            if (lessImage) {
                                imageGroupList = [shake, tada, rubberBand];
                                allGroupList = [bounce, flipIn, swing, fall];
                            }
                            else {
                                imageGroupList = [shake, tada, rubberBand];
                                allGroupList = [bounce, flipIn, fall]
                            }
                        },

                        // 逗比
                        2: function () {
                            var lessImageResult = {
                                    image: [shake, tada, lightSpeedIn, coin],
                                    text: [lightSpeedIn, flyIntoX]
                                },
                                result = lessImage ? lessImageResult : workRandom.select([
                                    lessImageResult,
                                    {
                                        image: [flyInto],
                                        text: [lightSpeedIn, creep, wave, coin]
                                    }
                                ]);
                            imageGroupList = result.image;
                            textGroupList = result.text;
                        },

                        // 小清新
                        3: function () {
                            allGroupList = lessImage ? [bounce, flipIn, swing, rotateIn, emerge, flyInto, overturn, roundFromFarAndNear]
                                : [bounce, rotateIn, flyInto, emerge];
                        },

                        // 文艺
                        4: function () {
                            allGroupList = lessImage ? [flipIn, rotateIn, emerge, scale, roundFromFarAndNear, flyInto, overturn] :
                                [flipIn, rotateIn, emerge, scale, flyInto];
                        },

                        // 大气
                        5: function () {
                            var flyEmerge;

                            if (lessImage) {
                                textGroupList = imageGroupList = [overturn, shrink, scale, roundFromFarAndNear, zoomIn];
                            }
                            else {
                                textGroupList = [circleRound, roundFromFarAndNear, overturn, scale, zoomIn];
                                imageGroupList = [overturn, scale, zoomIn];
                            }

                            // 要不然图有飞入,有不然文字有飞入
                            flyEmerge = random.select([textGroupList, imageGroupList]);
                            flyEmerge.push(flyInto, emerge);

                            // 第一页必有缩放
                            if (pageIndex === 0) {
                                pureText ? textGroupList = [shrink] : imageGroupList = [shrink];
                            }
                        },

                        // 历史
                        6: function () {
                            allGroupList = lessImage ? [flipIn, rotateIn, emerge, overturn, scale, flyInto, overturn] :
                                [rotateIn, emerge, overturn, scale, flyInto, roundFromFarAndNear];

                            if (typeCount.image >= 5) {
                                inOrder = false;
                            }
                        },

                        // 简约
                        7: function () {
                            textGroupList = [overturn];

                            if (lessImage) {
                                allGroupList = [flipIn, rotateIn, emerge, scale, flyInto, roundFromFarAndNear];
                            }
                            else {
                                allGroupList = [rotateIn, emerge, scale, flyInto];
                            }
                        },

                        // 精致
                        8: function () {
                            if (lessImage) {
                                allGroupList = [flipIn, rotateIn, emerge, flyInto, roundFromFarAndNear, overturn];
                            }
                            else {
                                textGroupList = [overturn];
                                allGroupList = [rotateIn, emerge, flyInto];
                            }
                        }
                    }[themeNumber])();

                    imageGroupList = imageGroupList.concat(allGroupList);
                    textGroupList = textGroupList.concat(allGroupList);

                    // mask元素不会分配缩放动画
                    if (noScale) {
                        imageGroupList = _.filter(imageGroupList, function (animationGroup) {
                            return !animationGroup.isScale;
                        });
                    }

                    function selectGroup(groups, lastGroups) {
                        var remindGroups = _.filter(groups, function (group) {
                                return !(group === lastGroups[0] || group === lastGroups[1]);
                            }),
                            selectedGroup = workRandom.select(remindGroups.length === 0 ? groups : remindGroups);

                        lastGroups.push(selectedGroup);
                        if (lastGroups.length >= 3) {
                            lastGroups.shift();
                        }
                        return selectedGroup;
                    }

                    // 如果是纯图,这些图不是强调动画
                    imageGroup = selectGroup(allImage ? _.filter(imageGroupList, function (g) {
                        return !g.isEmphasize;
                    }) : imageGroupList, lastImageGroups);

                    // 如果图片不是强调的,文字也不是强调的
                    textGroup = selectGroup(allImage || !imageGroup.isEmphasize ? _.filter(textGroupList, function (g) {
                        return !g.isEmphasize;
                    }) : textGroupList, lastTextGroups);

                    appliedGroup[pageIndex] = {
                        seed: seedRandom(),
                        imageGroup: imageGroup,
                        textGroup: textGroup,
                        inOrder: inOrder,
                        speed: Speed(themeNumber)
                    };
                }
            });

            return {
                switchAnimation: switchAnimation,
                themeNumber: themeNumber,
                appliedGroup: appliedGroup
            };
        }

        library["45"].Theme = Theme;
        library["45"].Speed = Speed;
        library["45"].pageAnimations = pageAnimations;
    });
    plugin(function () {
        var random = library["33"],
            Music = library["43"],
            tips = library["29"],
            sa = library["35"],
            util = library["25"],
            animationData = library["45"],
            pageAnimationData = animationData.pageAnimations,
            pageAnimation = library["40"],
            ui = library["26"],
            Work = library["34"],

            switchAnimateList = [sa.classic, sa.push, sa.fade, sa.cube, sa.door, sa["switch"], sa.uncover]; // 动画切换数组,用来取随机用

        Work.Modes.classic = Work.Modes.push = Work.Modes.click = function (workBody, arg) {
            var curPage, // 当前页
                curPageIndex = arg.pageIndex || 0, // 当前页码
                playSchedule = _.event.Schedule(), // 播放日程
                preloadPageSchedule = _.event.Schedule(); // 预加载日程

            return {
                play: playSchedule.start,
                preloadPage: preloadPageSchedule.start,
                resize: function (width, height) {
                    if (curPage) {
                        curPage.resize(width, height);
                        curPage.play();
                    }
                },
                recycle: function () {
                    curPage && curPage.recycle();
                },
                load: function (pageLoadDone) {
                    var workData = workBody.workData, // 作品数据
                        themeData = parseInt(workData.theme) ? animationData.Theme(workData) : null, // 主题数据
                        mode = workData.mode, // 模式

                        rawPageSwitch = workData.pageSwitch, // 页面切换
                        switchAnimateId = mode === "push" || !sa[rawPageSwitch] ? "classic" : rawPageSwitch, // 切换动画id

                        noLoop = workData.noLoop, // 无循环
                        pageNum = workBody.pageNumber, // 页数量

                        musicIcon, // 播放图标
                        loadingNewPageTips, // 加载新页提示
                        cutHandle = null, // 切换句柄
                        cutAnimateHandle = null, // 切换动画句柄
                        tailArrived = curPageIndex === pageNum - 1;  // 已经到达尾部


                    arg.music && Music(workBody, musicIcon = _.element.element(tips.Music())); // 音乐

                    function loadPage(index, onLoad) {
                        workBody.loadPage(index, function (page) {
                            if (page) {
                                var layout = page.wrapper,
                                    applyEnter = layout.applyEnter;

                                // 设置切换动画
                                page.switchAnimate = ( rawPageSwitch === "random" ? random.select(switchAnimateList) : sa[switchAnimateId] );

                                // 设置主题
                                if (themeData) {
                                    // 重新分配切换动画
                                    page.switchAnimate = themeData.switchAnimation;

                                    // 分配
                                    applyEnter && pageAnimation.applyAnimate(page, applyEnter.pageAnimation ?
                                        pageAnimationData[applyEnter.pageAnimation] : themeData.appliedGroup[page.index]);
                                }

                                page.prepare(); // 页面准备
                            }

                            onLoad(page);
                        });
                    }

                    // 获取页码
                    function getPageIndex(index) {
                        return ( index + pageNum ) % pageNum;
                    }

                    // 预加载页面
                    function preloadPage() {
                        var curIndex = curPage.index;

                        _.recursion(function load(i, j) {
                            i !== 0 && _.event.concurrency(_.map([-j, j], function (step) {
                                return function (done) {
                                    workBody.loadPage(curIndex + step, done, false);
                                }
                            }), function () {
                                load(i - 1, j + 1);
                            });
                        }, 2, 1);
                    }

                    // 加载第一页
                    loadPage(curPageIndex, function (page) {
                        curPage = workBody.appendChild(page);

                        // 准备播放日程和预加载页面日程
                        playSchedule.prepare(function () {
                            curPage.play();
                        });
                        preloadPageSchedule.prepare(preloadPage);

                        // 如果有音乐,添加音乐播放
                        if (workBody.playAudio) {
                            // 点击图标切换播放状态
                            ui.onTap(workBody.appendChild(musicIcon), function () {
                                musicIcon.play ? workBody.stopAudio() : workBody.playAudio();
                            });

                            // 如果在微信中,立刻播放音乐
                            _.userAgent.MicroMessenger && ( _.userAgent.ios && window.WeixinJSBridge ?
                                WeixinJSBridge.invoke('getNetworkType', {}, workBody.playAudio) : workBody.playAudio() );
                        }

                        // 切换页面
                        function cut(step) {
                            // 清理cutHandle和加载新页提示
                            cutHandle = null;
                            _.element.remove(loadingNewPageTips);

                            // 切换
                            _.recursion(function cut() {
                                loadingNewPageTips = workBody.appendChild(tips.LoadingNewPage());
                                cutHandle = cut;

                                loadPage(getPageIndex(curPageIndex + step), function (newPage) {
                                    _.element.remove(loadingNewPageTips);

                                    if (cutHandle === cut) {
                                        var oldPage = curPage;
                                        oldPage.fastForward(); // 快进当前页
                                        oldPage.recycle(); // 回收当前页

                                        _.element.classList(workBody).remove("last-page");

                                        curPage = newPage;
                                        curPageIndex = curPage.index;

                                        preloadPage();

                                        // 切换动画
                                        var lock = ui.Lock();
                                        util.cutPage(function () {
                                            cutAnimateHandle = ( step > 0 ? curPage.switchAnimate : sa.back )(workBody, oldPage, curPage, function () {
                                                cutAnimateHandle = null;
                                                _.element.remove(oldPage);
                                                workBody.appendChild(curPage);
                                                curPage.play();

                                                if (curPageIndex === pageNum - 1) {
                                                    tailArrived = true;
                                                    workBody.classList.add("last-page");
                                                }

                                                lock.remove();
                                            });
                                        });
                                    }
                                });
                            });
                        }

                        // 手势切换
                        _.wrap(function (step) {
                            if (ui.preventBodyEvent || ui.preventDrag || noLoop && curPageIndex === pageNum - 1 && step === 1) {
                                return;
                            }

                            workBody.audioPlayIntention && workBody.playAudio && workBody.playAudio(); // 如果有音乐播放意图,播放音乐

                            cut(step);
                        }, function (cut) {
                            ui.onSwipeStart(workBody, function (event) {
                                if (event.yOut && Math.abs(event.dX) < 10) {
                                    var toDown = event.dY < 0;
                                    // 在第一页并且没有到达过最后一页时,向上滑时无效
                                    if (!( !toDown && ( curPageIndex === 0 && ( !tailArrived || noLoop ) ) )) {
                                        cut(toDown ? 1 : -1);
                                    }
                                }
                            });
                        })();

                        // 第一页加载完成
                        pageLoadDone();
                    });
                }
            };
        };
    });

    /**
     * Created by Zuobai on 2014/10/1.
     * 老图文板式
     */

    plugin(function () {
        var Layout = library["19"],
            enterAnimation = library["37"],
            util = library["25"],
            Content = library["24"],
            p = library["38"],
            pageAnimation = library["40"],
            Layout504 = util.layout504,
            applySpeed = pageAnimation.applySpeed,
            Component = _.layout.Component,
            layoutFormats = _.layout.formats;

        //kahn1990
        layoutFormats.ImageText29 = {
            create: function (layout, ds) {
                /* layout ： 屏幕相关参数 、ds ： html 页面配置参数 */
                var l = Layout504(layout, ds.image(0)),
                    //p_kahn1990_img_1 = l.image(ds.image(1), layout),
                    H = l.scale,
                    C = 45 * H << 0;
                var z_kahn1990_arr_cache = [];
                /* p.center(p_kahn1990_img_1, layout) 行居中 */
                if (ds.image() && ds.image().length > 1) {
                    for (var i = 1; i < ds.image().length; i++) {
                        var kahn1990_this_imageInfo = ds.kahn1990_imageInfo(i),
                            p_kahn1990_img_cache = null;
                        var kahn1990_scaling_cache = (kahn1990_this_imageInfo.kahn1990_scaling_100 && kahn1990_this_imageInfo.kahn1990_scaling_100 == true)
                            ? layout.w * 2 * (kahn1990_this_imageInfo.kahn1990_scaling_baifenbi ? kahn1990_this_imageInfo.kahn1990_scaling_baifenbi : 1) / ds.image(i).width
                            : kahn1990_this_imageInfo.kahn1990_scaling;
                        p_kahn1990_img_cache = Component(
                            Content.Image(
                                ds.image(i),
                                kahn1990_scaling_cache
                            ),
                            layout
                        );
                        ds.kahn1990_imageInfo(i);
                        /*C.x = p.rightIn(C, layout);
                         C.y = p.bottomTo(C, layout) + 5 * ds;*/
                        if (kahn1990_this_imageInfo.kahn1990_right && kahn1990_this_imageInfo.kahn1990_right == true) {
                            p_kahn1990_img_cache.x = p.rightIn(p_kahn1990_img_cache, layout);
                        } else if (kahn1990_this_imageInfo.kahn1990_left && kahn1990_this_imageInfo.kahn1990_left == true) {
                            p_kahn1990_img_cache.x = p.leftIn(p_kahn1990_img_cache, layout);
                        } else if (kahn1990_this_imageInfo.kahn1990_x) {
                            p_kahn1990_img_cache.x = kahn1990_this_imageInfo.kahn1990_x * layout.w;
                        } else {
                            p_kahn1990_img_cache.x = p.center(p_kahn1990_img_cache, layout);
                        }

                        if (kahn1990_this_imageInfo.kahn1990_top && kahn1990_this_imageInfo.kahn1990_top == true) {
                            p_kahn1990_img_cache.y = p.topIn(p_kahn1990_img_cache, layout);
                        } else if (kahn1990_this_imageInfo.kahn1990_y) {
                            p_kahn1990_img_cache.y = kahn1990_this_imageInfo.kahn1990_y * layout.h;
                        } else if (kahn1990_this_imageInfo.kahn1990_bottom && kahn1990_this_imageInfo.kahn1990_bottom == true) {
                            p_kahn1990_img_cache.y = p.bottomIn(p_kahn1990_img_cache, layout);
                        }

                        if (kahn1990_this_imageInfo.kahn1990_fncb) {
                            p_kahn1990_img_cache.enter = kahn1990_this_imageInfo.kahn1990_fncb(enterAnimation);
                        } else {
                            p_kahn1990_img_cache.enter = enterAnimation.Emerge();
                        }

                        if (kahn1990_this_imageInfo.kahn1990_delayIf) {
                            p_kahn1990_img_cache.enter.kahn1990_delay = kahn1990_this_imageInfo.kahn1990_delay;
                            p_kahn1990_img_cache.enter.kahn1990_delayIf = true;
                        }
                        z_kahn1990_arr_cache.push(p_kahn1990_img_cache);
                    }
                }
                if (ds.textInfo && ds.textInfo.length > 0) {
                    for (var i = 0; i < ds.textInfo.length; i++) {

                        var p_kahn1990_Label_cache = null,
                            p_kahn1990_Label_fontsize_cache = null;

                        if (ds.textInfo[i].kahn1990_fontsize) {
                            p_kahn1990_Label_fontsize_cache = ds.textInfo[i].kahn1990_fontsize;
                        } else {
                            p_kahn1990_Label_fontsize_cache = C;
                        }

                        p_kahn1990_Label_cache = Component(
                            Content.Label(/* m.Label 标签模版*/
                                ds.getText(i),
                                {
                                    fontSize: p_kahn1990_Label_fontsize_cache,
                                    fontFamily: "黑体",
                                    color: "#87D397",
                                    width: ds.textInfo[i].kahn1990_w ? ds.textInfo[i].kahn1990_w : "false",
                                    kahn1990_str_lang: ds.textInfo[i].kahn1990_str_lang ? ds.textInfo[i].kahn1990_str_lang : false
                                }
                            ),
                            layout
                        );

                        if (ds.textInfo[i].kahn1990_right && ds.textInfo[i].kahn1990_right == true) {
                            p_kahn1990_Label_cache.x = p.rightIn(p_kahn1990_Label_cache, layout);
                        } else if (ds.textInfo[i].kahn1990_left && ds.textInfo[i].kahn1990_left == true) {
                            p_kahn1990_Label_cache.x = p.leftIn(p_kahn1990_Label_cache, layout);
                        } else if (ds.textInfo[i].kahn1990_x) {
                            p_kahn1990_Label_cache.x = ds.textInfo[i].kahn1990_x * layout.w;
                        } else {
                            p_kahn1990_Label_cache.x = p.center(p_kahn1990_Label_cache, layout);
                        }

                        if (ds.textInfo[i].kahn1990_top && ds.textInfo[i].kahn1990_top == true) {
                            p_kahn1990_Label_cache.y = p.topIn(p_kahn1990_Label_cache, layout);
                        } else if (ds.textInfo[i].kahn1990_y) {
                            p_kahn1990_Label_cache.y = ds.textInfo[i].kahn1990_y * layout.h;
                        } else if (ds.textInfo[i].kahn1990_bottom && ds.textInfo[i].kahn1990_bottom == true) {
                            p_kahn1990_Label_cache.y = p.bottomIn(p_kahn1990_Label_cache, layout);
                        }

                        if (ds.textInfo[i].kahn1990_fncb) {
                            p_kahn1990_Label_cache.enter = ds.textInfo[i].kahn1990_fncb(enterAnimation);
                        } else {
                            p_kahn1990_Label_cache.enter = enterAnimation.Emerge();
                        }
                        if (ds.textInfo[i].kahn1990_delayIf && (ds.textInfo[i].kahn1990_delayIf == true)) {
                            p_kahn1990_Label_cache.enter.kahn1990_delay = ds.textInfo[i].kahn1990_delay;
                            p_kahn1990_Label_cache.enter.kahn1990_delayIf = true;
                        }

                        //p_kahn1990_Label_cache.y = l.y(191 / 2);

                        z_kahn1990_arr_cache.push(p_kahn1990_Label_cache);
                    }
                }
                applySpeed(z_kahn1990_arr_cache, 1, 1);
                z_kahn1990_arr_cache = [];//销毁
            }
        }
    });
    /**
     * Created by 白 on 2015/7/17.
     * 存储
     */

    library(function () {
        var items = JSON.parse(localStorage.getItem("cookie") || "{}");

        // 根据过期时间,清理cookie
        _.each(items, function (value, key) {
            if (value.expires < new Date()) {
                delete items[key];
            }
        });

        // 保存cookie
        function save() {
            localStorage.setItem("cookie", JSON.stringify(items));
        }

        save();

        library["65"] = {
            getItem: function (key) {
                return items[key] ? items[key].value : null;
            },
            setItem: function (key, value, timeToExpires) {
                items[key] = {
                    value: value,
                    expires: ( new Date() ).getTime() + timeToExpires * 1000
                };
                save();
            }
        };
    });

    main(function () {
        library["42"]()
    })
})();