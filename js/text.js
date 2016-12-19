_.text = _.bind(
    function () {

        var prefix = /^[（【“‘]$/;
        var suffix = /^[）】”’，。；：？！、]$/;
        var connector = /^[0-9a-zA-Z`~!@#\$%\^&\*\(\)\-_=\+\[\{\]\}\\\|:;"'<,>\.\?\/]$/;
        var blank = /^[ 	　]$/;
        var enter = /^[\n\r]$/;

        function character(element) {
            return element.character || "";
        }

        function sectionForeach(value, block) {
            var previous = null;
            value(function (value) {
                previous && block(previous, value);
                previous = value;
            });
            block(previous, null);
        }

        function isWord(left, right) {
            return left && right &&								//both text
                (prefix.test(left) && !blank.test(right) ||		//prefix is not the end
                !blank.test(left) && suffix.test(right) ||			//suffix is not the begin
                connector.test(left) && connector.test(right) ||	//connectors connect
                blank.test(left) && blank.test(right));			//blanks connect
        }

        function BuildLines(canBreak, compressBlank) {
            return function (beginNode, endNode, width, indent) {
                var offset = indent;
                var lineBeginNode = beginNode;
                var wordWidth = 0;
                var wordText = "";
                var wordBeginNode = beginNode;
                var lines = [];
                _.event.LinkedListIterate(beginNode, endNode, function (element) {
                    //update word
                    wordWidth += element.width;
                    wordText += character(element);
                    //end word
                    if (canBreak(character(element), element.next === endNode ? "" : character(element.next))) {
                        //new line
                        if (enter.test(wordText)) {
                            lines.push(lineBeginNode);
                            lineBeginNode = element.next;
                            offset = indent;
                        }
                        else if (wordBeginNode !== lineBeginNode && offset + wordWidth > width && !(compressBlank && blank.test(character(wordBeginNode)))) {
                            lines.push(lineBeginNode);
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
                });
                lines.push(lineBeginNode);
                return lines;
            };
        }

        var buildAllBreakLines = BuildLines(function (left, right) {
            return true;
        }, false);
        var buildWordBreakLines = BuildLines(function (left, right) {
            return !isWord(left, right);
        }, true);

        function alignLeftLine(beginNode, endNode, width, offset) {
            var offsetX = offset;
            _.event.LinkedListIterate(beginNode, endNode, function (element) {
                element.offsetX = offsetX;
                offsetX += element.width;
            });
        }

        function alignSideLine(beginNode, endNode, width, offset) {
            //skip back space
            var lastNode = beginNode;
            _.event.LinkedListIterate(beginNode, endNode, function (element) {
                if (!element.character || !blank.test(element.character)) {
                    lastNode = element;
                }
            });
            //calculate space
            var totalSpaceCount = 0;
            var totalWidth = 0;
            _.event.LinkedListIterate(beginNode, lastNode.next, function (element) {
                totalWidth += element.width;
                if (element.next !== lastNode.next && !isWord(element.character, element.next.character)) {
                    totalSpaceCount++;
                }
            });
            //calculate x
            var space = totalSpaceCount > 0 ? (width - offset - totalWidth) / totalSpaceCount : 0;
            var offsetX = offset;
            var spaceOffsetX = 0;
            var spaceCount = 0;
            _.event.LinkedListIterate(beginNode, endNode, function (element) {
                element.offsetX = offsetX + spaceOffsetX;
                offsetX += element.width;
                if (element.next !== endNode && !isWord(element.character, element.next.character)) {
                    spaceCount++;
                    spaceOffsetX = (space * Math.min(spaceCount, totalSpaceCount) + 0.5) << 0;
                }
            });
        }

        var MeasureGc = function () {
            var gc;
            return function () {
                return gc ? gc : gc = document.createElement("canvas").getContext("2d");
            };
        }();

        // 根据style对象生成一个font字符串
        function Font(style) {
            style = style || {};
            return [style.fontStyle || "normal", style.fontVariant || "normal", style.fontWeight || "normal",
                ( style.fontSize || 12 ) + "px", style.fontFamily || "sans-serif"].join(" ");
        }

        // 测量文字
        function measureText(text, style) {
            var gc = MeasureGc();
            gc.font = Font(style);
            return gc.measureText(text);
        }

        // 根据样式和宽度摆放样式
        function layText(text, width, style) {
            var gc = MeasureGc(),
                marginCount = 0, lineCount = 0,
                list = List(),
                align = style.align;

            gc.font = Font(style);

            // 计算每个字符的宽度
            _.string.foreach(text.replace(/\r/g, ""), function (ch) {
                list.insert({
                    character: ch,
                    width: ch === "\n" ? 0 : gc.measureText(ch).width
                }, null);

                if (ch === "\n") {
                    ++marginCount;
                }
            });

            // 断行,遍历断行的结果(区间链表),算对齐
            sectionForeach(function (value) {
                _.each(style.lineBreak(list.head(), null, width, 0), value);
            }, function (start, end) {
                start && ( start.lineStart = true );
                align(start, end, width, 0);
                ++lineCount;
            });

            list.style = style;
            list.width = width;
            list.height = lineCount * style.lineHeight + marginCount * ( style.margin || ( style.margin = 0 ) );
            return list;
        }

        // 绘制纯文字排版
        function drawTextLayout(gc, layout) {
            var style = layout.style,
                lineHeight = style.lineHeight,
                margin = style.margin,
                y = -lineHeight,
                midY = lineHeight / 2 << 0;

            gc.font = Font(style);
            gc.fillStyle = style.color;
            gc.textBaseline = "middle";

            List.foreach(layout, function (node) {
                if (node.lineStart) {
                    y += lineHeight;
                }
                if (node.character === "\n") {
                    y += margin;
                }

                gc.fillText(node.character, node.offsetX, y + midY);
            });
        }

        var LineBreak = {
            breakAll: buildAllBreakLines,
            normal: buildWordBreakLines
        };

        var Align = {
            left: alignLeftLine,
            side: function (begin, end, width) {
                ( end && end.previous.character !== "\n" ? alignSideLine : alignLeftLine )(begin, end, width, 0);
            }
        };
        return {
            buildAllBreakLines: buildAllBreakLines,
            buildWordBreakLines: buildWordBreakLines,
            alignLeftLine: alignLeftLine,
            alignSideLine: alignSideLine,
            LineBreak: LineBreak,
            Align: Align,
            Font: Font,
            measureText: measureText,
            layText: layText,
            drawTextLayout: drawTextLayout
        };
    },
    {}
)();