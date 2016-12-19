_.cursor = _.bind(
    function () {
        var lastX, lastY, curX, curY,
            getPageX = this.EventCoordinateGetter("pageX"),
            getPageY = this.EventCoordinateGetter("pageY"),
            moveName = this.eventName(["touchmove", "MSPointerMove", "mousemove"]),
            downName = this.eventName(["touchstart", "MSPointerDown", "mousedown"]),
            upName = this.eventName(["touchend", "MSPointerUp", "mouseup"]);

        _.element.bind(document, downName, function (event) {
            curX = getPageX(event);
            curY = getPageY(event);
        }, true);

        _.element.bind(document, moveName, function (event) {
            var x = getPageX(event), y = getPageY(event);
            lastX = _.isUndefined(curX) ? x : curX;
            lastY = _.isUndefined(curY) ? y : curY;
            curX = x;
            curY = y;
        }, true);

        var functionCache = {

            Event: function (event, obj) {
                return _.extend(obj, {
                    preventDefault: function () {
                        event.preventDefault();
                    },
                    stopPropagation: function () {
                        event.stopPropagation();
                    },
                    origin: event
                });
            },

            onPointerMove: function (element, response, isCapture) {
                return _.element.bind(element, moveName, function (event) {
                    response(functionCache.Event(event, {
                        x: curX,
                        y: curY,
                        dX: curX - lastX,
                        dY: curY - lastY
                    }));
                }, isCapture);
            },

            PointerBinder: function (names) {
                return function (element, response, isCapture) {
                    return _.element.bind(element, names, function (event) {
                        response(functionCache.Event(event, {
                            x: _.isUndefined(curX) ? getPageX(event) : curX,
                            y: _.isUndefined(curY) ? getPageY(event) : curY
                        }));
                    }, isCapture);
                };
            },


            onMoveUp: function (arg) {
                var moveHandle = this.onPointerMove(document, function (event) {
                        arg.onMove && arg.onMove(event);
                    }),
                    upHandle = this.onPointerUp(document, function (event) {
                        moveHandle.remove();
                        upHandle.remove();
                        arg.onUp && arg.onUp(event);
                    });

                return {
                    remove: function () {
                        moveHandle.remove();
                        upHandle.remove();
                    }
                };
            }
        };
        return {
            onPointerMove: functionCache.onPointerMove,
            onPointerDown: functionCache.PointerBinder(downName),
            onPointerUp: functionCache.PointerBinder(upName),
            onMoveUp: functionCache.onMoveUp
        }
    },
    {

// 根据不同的浏览器,给出事件名
        eventName: function (name) {
            return name[_.userAgent.canTouch ? 0 : _.userAgent.msPointer ? 1 : 2];
        },

// 事件坐标获取器
        EventCoordinateGetter: function (coordinateName) {
            return function (event) {
                return "touches" in event && event.touches[0] !== undefined ? event.touches[0][coordinateName] : event[coordinateName];
            }
        }
    }
)();