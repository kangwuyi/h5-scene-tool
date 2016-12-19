_.img = _.bind(
    function () {
        var _that = this;

        var imageNotFoundLoader = _.event.Loader(function (done) {
            var imageNotFound = Img.imageNotFound = Icon("image-not-found"),
                loadHandle = _.element.bind(imageNotFound, "load", function () {
                    loadHandle.remove();
                    done();
                });
        });

        function isColor(src) {
            return /^#/.test(src) || /^rgba/gi.test(src);
        }

        // 静态图片地址
        function staticSrc(src) {
            return window.contentPath + "image/" + src;
        }

        // 设置图片尺寸
        function setSize(img, ps) {
            ps = ps || {};
            var width = img.fullWidth = ps.w || img.naturalWidth || img.width,
                height = img.fullHeight = ps.h || img.naturalHeight || img.height;
            img.w = img.halfWidth = Math.round(width / 2);
            img.h = img.halfHeight = Math.round(height / 2);
            img.whr = width / height;
        }

        // 加载图片
        function load(img, src, arg) {
            arg = arg || {};
            var tryCache = false,
                crossOrigin = !!arg.crossOrigin,
                extName,
                dataUrl = /^data:/.test(src);

            function fail(isFatal) {
                img.fail = isFatal ? "fatal" : true;
                imageNotFoundLoader.load(function () {
                    arg.onError && arg.onError();
                });
            }

            if (!src) {
                fail(true);
                return img;
            }

            if (isColor(src)) {
                img.color = src;
                setTimeout(function () {
                    arg.onLoad && arg.onLoad();
                }, 0);
                return img;
            }

            function tryAgain() {
                if (!tryCache) {
                    img.src = "";
                    img.src = _.url.concatArg(src, {
                        t: ( new Date() ).getTime()
                    });
                    tryCache = true;
                }
                else {
                    fail();
                }
            }

            // 如果src是音乐,直接失败
            if (!dataUrl && /\.([^.]*)$/.test(_.url.parse(src).pathname.replace(/!([^!]*)$/, "")) && !( ( extName = RegExp.$1 ) in {
                    "jpeg": true,
                    "jpg": true,
                    "svg": true,
                    "png": true,
                    "gif": true,
                    "bmp": true
                } )) {
                setTimeout(fail, 0);
                return img;
            }

            crossOrigin && ( img.crossOrigin = "*" );

            img.onerror = tryAgain;
            img.onload = function () {
                if (crossOrigin && !_that.lowPerformance) {
                    try {
                        var canvas = document.createElement("canvas"),
                            gc = canvas.getContext("2d");
                        canvas.width = 1;
                        canvas.height = 1;
                        gc.drawImage(img, 0, 0);
                        canvas.toDataURL();
                    }
                    catch (e) {
                        tryAgain();
                        return;
                    }
                }
                setSize(img);
                img.onerror = null;
                img.onload = null;
                arg.onLoad && arg.onLoad(img);
            };

            img.src = src;

            return img;
        }

        function Img(src, arg) {
            return load(new Image(), src, arg);
        }

        /* kahn1990 方法用来加载图片*/
        var Icon = window.Icon || ( _that.lowPerformance ? function (src) {
                var img = Img(staticSrc("icon/" + src + ".png"));
                setSize(img, iconMap[src]);
                _.css.size(img, img.w, img.h);
                return img;
            } : (function () {
                var icons = {};

                function loadIcon(src, onLoad) {
                    var srcParts = src.split("/"),
                        groupName = ["icon"].concat(srcParts.slice(0, srcParts.length - 1)).join("-"),
                        img = icons[groupName] = icons[groupName] || new Image();

                    if (!img.waiter) {
                        img.waiter = _.event.Waiter(function (done) {
                            var iconSrc = staticSrc(groupName + ".png");

                            load(img, null || iconSrc, {
                                crossOrigin: null,
                                onLoad: function () {
                                    done();
                                }
                            });
                        });
                    }

                    img.waiter.onComplete(function () {
                        onLoad(img);
                    });
                }

                return function (src) {
                    var ps = iconMap[src],
                        canvas = document.createElement("canvas"),
                        gc = canvas.getContext("2d"),
                        unit = new Image();

                    canvas.width = ps.w;
                    canvas.height = ps.h;
                    setSize(unit, ps);
                    _.css.size(unit, unit.w, unit.h);
                    _.css(unit, "visibility", "hidden");

                    loadIcon(src, function (icon) {
                        gc.drawImage(icon, ps.x, ps.y, ps.w, ps.h, 0, 0, ps.w, ps.h);
                        unit.onload = function () {
                            unit.onload = null;
                            _.css(unit, "visibility", "visible");
                        };
                        unit.src = canvas.toDataURL("image/png");
                    });

                    return unit;
                };
            })() );

        function clone(img) {
            var newImage = new Image();
            newImage.src = img.src;
            setSize(newImage, img);
            return newImage;
        }

        // 画布
        function Canvas(width, height, dpr) {
            var canvas = document.createElement("canvas"),
                gc = canvas.context = canvas.getContext("2d");

            dpr = canvas.dpr = dpr || ( window.devicePixelRatio || 1 ) / ( gc.webkitBackingStorePixelRatio || gc.mozBackingStorePixelRatio ||
                gc.msBackingStorePixelRatio || gc.oBackingStorePixelRatio || gc.backingStorePixelRatio || 1 );

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            _.css(canvas, {
                display: "block",
                width: _.css.px(canvas.logicalWidth = width),
                height: _.css.px(canvas.logicalHeight = height)
            });

            gc.scale(dpr, dpr);

            return canvas;
        }

        function pageError(page, src) {
            page.innerHTML = "";
            _.css(page, "background", "white");
            Img(staticSrc(src), {
                onLoad: function (img) {
                    _.element.element(img, {
                        css: _.extend(_.css.center(img.halfWidth), _.css.middle(img.halfHeight))
                    }, page);
                }
            });
        }

        return {
            Img: Img,
            isColor: isColor,
            load: load,
            clone: clone,
            Canvas: Canvas,
            Icon: Icon,
            staticSrc: staticSrc,
            pageError: pageError
        };
    },
    {
        lowPerformance: new Image().crossOrigin === undefined || _.userAgent.iphone && !_.userAgent.iphone6
    }
)();