const rootArray = "[blocks][array]";
const COLOUR_ARRAY_BLOCK = 10;

Blockly.Blocks.lists = {};
Blockly.Constants.Lists = {};
Blockly.Constants.Lists.HUE = 260;
Blockly.defineBlocksWithJsonArray([{
    type: "lists_create_empty",
    message0: "%{BKY_LISTS_CREATE_EMPTY_TITLE}",
    output: "Array",
    style: "list_blocks",
    tooltip: "%{BKY_LISTS_CREATE_EMPTY_TOOLTIP}",
    helpUrl: "%{BKY_LISTS_CREATE_EMPTY_HELPURL}"
}, {
    type: "lists_repeat",
    message0: "%{BKY_LISTS_REPEAT_TITLE}",
    args0: [{
        type: "input_value",
        name: "ITEM"
    }, {
        type: "input_value",
        name: "NUM",
        check: "Number"
    }],
    output: "Array",
    style: "list_blocks",
    tooltip: "%{BKY_LISTS_REPEAT_TOOLTIP}",
    helpUrl: "%{BKY_LISTS_REPEAT_HELPURL}"
}, {
    type: "lists_reverse",
    message0: "%{BKY_LISTS_REVERSE_MESSAGE0}",
    args0: [{
        type: "input_value",
        name: "LIST",
        check: "Array"
    }],
    output: "Array",
    inputsInline: !0,
    style: "list_blocks",
    tooltip: "%{BKY_LISTS_REVERSE_TOOLTIP}",
    helpUrl: "%{BKY_LISTS_REVERSE_HELPURL}"
}, {
    type: "lists_isEmpty",
    message0: "%{BKY_LISTS_ISEMPTY_TITLE}",
    args0: [{
        type: "input_value",
        name: "VALUE",
        check: ["String", "Array"]
    }],
    output: "Boolean",
    style: "list_blocks",
    tooltip: "%{BKY_LISTS_ISEMPTY_TOOLTIP}",
    helpUrl: "%{BKY_LISTS_ISEMPTY_HELPURL}"
}, {
    type: "lists_length",
    message0: "%{BKY_LISTS_LENGTH_TITLE}",
    args0: [{
        type: "input_value",
        name: "VALUE",
        check: ["String", "Array"]
    }],
    output: "Number",
    style: "list_blocks",
    tooltip: "%{BKY_LISTS_LENGTH_TOOLTIP}",
    helpUrl: "%{BKY_LISTS_LENGTH_HELPURL}"
}]);
Blockly.Blocks.lists_create_with = {
    init: function () {
        this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
        this.setStyle("list_blocks");
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(!0, "Array");
        this.setMutator(new Blockly.Mutator(["lists_create_with_item"]));
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP)
    },
    mutationToDom: function () {
        var a = Blockly.utils.xml.createElement("mutation");
        a.setAttribute("items", this.itemCount_);
        return a
    },
    domToMutation: function (a) {
        this.itemCount_ = parseInt(a.getAttribute("items"),
            10);
        this.updateShape_()
    },
    decompose: function (a) {
        var b = a.newBlock("lists_create_with_container");
        b.initSvg();
        for (var c = b.getInput("STACK").connection, d = 0; d < this.itemCount_; d++) {
            var e = a.newBlock("lists_create_with_item");
            e.initSvg();
            c.connect(e.previousConnection);
            c = e.nextConnection
        }
        return b
    },
    compose: function (a) {
        var b = a.getInputTargetBlock("STACK");
        for (a = []; b && !b.isInsertionMarker();) a.push(b.valueConnection_), b = b.nextConnection && b.nextConnection.targetBlock();
        for (b = 0; b < this.itemCount_; b++) {
            var c = this.getInput("ADD" +
                b).connection.targetConnection;
            c && -1 == a.indexOf(c) && c.disconnect()
        }
        this.itemCount_ = a.length;
        this.updateShape_();
        for (b = 0; b < this.itemCount_; b++) Blockly.Mutator.reconnect(a[b], this, "ADD" + b)
    },
    saveConnections: function (a) {
        a = a.getInputTargetBlock("STACK");
        for (var b = 0; a;) {
            var c = this.getInput("ADD" + b);
            a.valueConnection_ = c && c.connection.targetConnection;
            b++;
            a = a.nextConnection && a.nextConnection.targetBlock()
        }
    },
    updateShape_: function () {
        this.itemCount_ && this.getInput("EMPTY") ? this.removeInput("EMPTY") : this.itemCount_ ||
            this.getInput("EMPTY") || this.appendDummyInput("EMPTY").appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
        for (var a = 0; a < this.itemCount_; a++)
            if (!this.getInput("ADD" + a)) {
                var b = this.appendValueInput("ADD" + a).setAlign(Blockly.ALIGN_RIGHT);
                0 == a && b.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH)
            } for (; this.getInput("ADD" + a);) this.removeInput("ADD" + a), a++
    }
};
Blockly.Blocks.lists_create_with_container = {
    init: function () {
        this.setStyle("list_blocks");
        this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.lists_create_with_item = {
    init: function () {
        this.setStyle("list_blocks");
        this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.lists_indexOf = {
    init: function () {
        var a = [
            [Blockly.Msg.LISTS_INDEX_OF_FIRST, "FIRST"],
            [Blockly.Msg.LISTS_INDEX_OF_LAST, "LAST"]
        ];
        this.setHelpUrl(Blockly.Msg.LISTS_INDEX_OF_HELPURL);
        this.setStyle("list_blocks");
        this.setOutput(!0, "Number");
        this.appendValueInput("VALUE").setCheck("Array").appendField(Blockly.Msg.LISTS_INDEX_OF_INPUT_IN_LIST);
        this.appendValueInput("FIND").appendField(new Blockly.FieldDropdown(a), "END");
        this.setInputsInline(!0);
        var b = this;
        this.setTooltip(function () {
            return Blockly.Msg.LISTS_INDEX_OF_TOOLTIP.replace("%1",
                b.workspace.options.oneBasedIndex ? "0" : "-1")
        })
    }
};
Blockly.Blocks.lists_getIndex = {
    init: function () {
        var a = [
            [Blockly.Msg.LISTS_GET_INDEX_GET, "GET"],
            [Blockly.Msg.LISTS_GET_INDEX_GET_REMOVE, "GET_REMOVE"],
            [Blockly.Msg.LISTS_GET_INDEX_REMOVE, "REMOVE"]
        ];
        this.WHERE_OPTIONS = [
            [Blockly.Msg.LISTS_GET_INDEX_FROM_START, "FROM_START"],
            [Blockly.Msg.LISTS_GET_INDEX_FROM_END, "FROM_END"],
            [Blockly.Msg.LISTS_GET_INDEX_FIRST, "FIRST"],
            [Blockly.Msg.LISTS_GET_INDEX_LAST, "LAST"],
            [Blockly.Msg.LISTS_GET_INDEX_RANDOM, "RANDOM"]
        ];
        this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
        this.setStyle("list_blocks");
        a = new Blockly.FieldDropdown(a, function (c) {
            c = "REMOVE" == c;
            this.getSourceBlock().updateStatement_(c)
        });
        this.appendValueInput("VALUE").setCheck("Array").appendField(Blockly.Msg.LISTS_GET_INDEX_INPUT_IN_LIST);
        this.appendDummyInput().appendField(a, "MODE").appendField("", "SPACE");
        this.appendDummyInput("AT");
        Blockly.Msg.LISTS_GET_INDEX_TAIL && this.appendDummyInput("TAIL").appendField(Blockly.Msg.LISTS_GET_INDEX_TAIL);
        this.setInputsInline(!0);
        this.setOutput(!0);
        this.updateAt_(!0);
        var b = this;
        this.setTooltip(function () {
            var c =
                b.getFieldValue("MODE"),
                d = b.getFieldValue("WHERE"),
                e = "";
            switch (c + " " + d) {
                case "GET FROM_START":
                case "GET FROM_END":
                    e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FROM;
                    break;
                case "GET FIRST":
                    e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FIRST;
                    break;
                case "GET LAST":
                    e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_LAST;
                    break;
                case "GET RANDOM":
                    e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_RANDOM;
                    break;
                case "GET_REMOVE FROM_START":
                case "GET_REMOVE FROM_END":
                    e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM;
                    break;
                case "GET_REMOVE FIRST":
                    e =
                        Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST;
                    break;
                case "GET_REMOVE LAST":
                    e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST;
                    break;
                case "GET_REMOVE RANDOM":
                    e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM;
                    break;
                case "REMOVE FROM_START":
                case "REMOVE FROM_END":
                    e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM;
                    break;
                case "REMOVE FIRST":
                    e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST;
                    break;
                case "REMOVE LAST":
                    e = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST;
                    break;
                case "REMOVE RANDOM":
                    e =
                        Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM
            }
            if ("FROM_START" == d || "FROM_END" == d) e += "  " + ("FROM_START" == d ? Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP : Blockly.Msg.LISTS_INDEX_FROM_END_TOOLTIP).replace("%1", b.workspace.options.oneBasedIndex ? "#1" : "#0");
            return e
        })
    },
    mutationToDom: function () {
        var a = Blockly.utils.xml.createElement("mutation");
        a.setAttribute("statement", !this.outputConnection);
        var b = this.getInput("AT").type == Blockly.INPUT_VALUE;
        a.setAttribute("at", b);
        return a
    },
    domToMutation: function (a) {
        var b =
            "true" == a.getAttribute("statement");
        this.updateStatement_(b);
        a = "false" != a.getAttribute("at");
        this.updateAt_(a)
    },
    updateStatement_: function (a) {
        a != !this.outputConnection && (this.unplug(!0, !0), a ? (this.setOutput(!1), this.setPreviousStatement(!0), this.setNextStatement(!0)) : (this.setPreviousStatement(!1), this.setNextStatement(!1), this.setOutput(!0)))
    },
    updateAt_: function (a) {
        this.removeInput("AT");
        this.removeInput("ORDINAL", !0);
        a ? (this.appendValueInput("AT").setCheck("Number"), Blockly.Msg.ORDINAL_NUMBER_SUFFIX &&
            this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) : this.appendDummyInput("AT");
        var b = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function (c) {
            var d = "FROM_START" == c || "FROM_END" == c;
            if (d != a) {
                var e = this.getSourceBlock();
                e.updateAt_(d);
                e.setFieldValue(c, "WHERE");
                return null
            }
        });
        this.getInput("AT").appendField(b, "WHERE");
        Blockly.Msg.LISTS_GET_INDEX_TAIL && this.moveInputBefore("TAIL", null)
    }
};
Blockly.Blocks.lists_setIndex = {
    init: function () {
        var a = [
            [Blockly.Msg.LISTS_SET_INDEX_SET, "SET"],
            [Blockly.Msg.LISTS_SET_INDEX_INSERT, "INSERT"]
        ];
        this.WHERE_OPTIONS = [
            [Blockly.Msg.LISTS_GET_INDEX_FROM_START, "FROM_START"],
            [Blockly.Msg.LISTS_GET_INDEX_FROM_END, "FROM_END"],
            [Blockly.Msg.LISTS_GET_INDEX_FIRST, "FIRST"],
            [Blockly.Msg.LISTS_GET_INDEX_LAST, "LAST"],
            [Blockly.Msg.LISTS_GET_INDEX_RANDOM, "RANDOM"]
        ];
        this.setHelpUrl(Blockly.Msg.LISTS_SET_INDEX_HELPURL);
        this.setStyle("list_blocks");
        this.appendValueInput("LIST").setCheck("Array").appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_IN_LIST);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(a), "MODE").appendField("", "SPACE");
        this.appendDummyInput("AT");
        this.appendValueInput("TO").appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_TO);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.LISTS_SET_INDEX_TOOLTIP);
        this.updateAt_(!0);
        var b = this;
        this.setTooltip(function () {
            var c = b.getFieldValue("MODE"),
                d = b.getFieldValue("WHERE"),
                e = "";
            switch (c + " " + d) {
                case "SET FROM_START":
                case "SET FROM_END":
                    e =
                        Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_FROM;
                    break;
                case "SET FIRST":
                    e = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_FIRST;
                    break;
                case "SET LAST":
                    e = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_LAST;
                    break;
                case "SET RANDOM":
                    e = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_RANDOM;
                    break;
                case "INSERT FROM_START":
                case "INSERT FROM_END":
                    e = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_FROM;
                    break;
                case "INSERT FIRST":
                    e = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST;
                    break;
                case "INSERT LAST":
                    e = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_LAST;
                    break;
                case "INSERT RANDOM":
                    e = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM
            }
            if ("FROM_START" == d || "FROM_END" == d) e += "  " + Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP.replace("%1", b.workspace.options.oneBasedIndex ? "#1" : "#0");
            return e
        })
    },
    mutationToDom: function () {
        var a = Blockly.utils.xml.createElement("mutation"),
            b = this.getInput("AT").type == Blockly.INPUT_VALUE;
        a.setAttribute("at", b);
        return a
    },
    domToMutation: function (a) {
        a = "false" != a.getAttribute("at");
        this.updateAt_(a)
    },
    updateAt_: function (a) {
        this.removeInput("AT");
        this.removeInput("ORDINAL", !0);
        a ? (this.appendValueInput("AT").setCheck("Number"), Blockly.Msg.ORDINAL_NUMBER_SUFFIX && this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) : this.appendDummyInput("AT");
        var b = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function (c) {
            var d = "FROM_START" == c || "FROM_END" == c;
            if (d != a) {
                var e = this.getSourceBlock();
                e.updateAt_(d);
                e.setFieldValue(c, "WHERE");
                return null
            }
        });
        this.moveInputBefore("AT", "TO");
        this.getInput("ORDINAL") && this.moveInputBefore("ORDINAL",
            "TO");
        this.getInput("AT").appendField(b, "WHERE")
    }
};
Blockly.Blocks.lists_getSublist = {
    init: function () {
        this.WHERE_OPTIONS_1 = [
            [Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_START, "FROM_START"],
            [Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_END, "FROM_END"],
            [Blockly.Msg.LISTS_GET_SUBLIST_START_FIRST, "FIRST"]
        ];
        this.WHERE_OPTIONS_2 = [
            [Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START, "FROM_START"],
            [Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_END, "FROM_END"],
            [Blockly.Msg.LISTS_GET_SUBLIST_END_LAST, "LAST"]
        ];
        this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
        this.setStyle("list_blocks");
        this.appendValueInput("LIST").setCheck("Array").appendField(Blockly.Msg.LISTS_GET_SUBLIST_INPUT_IN_LIST);
        this.appendDummyInput("AT1");
        this.appendDummyInput("AT2");
        Blockly.Msg.LISTS_GET_SUBLIST_TAIL && this.appendDummyInput("TAIL").appendField(Blockly.Msg.LISTS_GET_SUBLIST_TAIL);
        this.setInputsInline(!0);
        this.setOutput(!0, "Array");
        this.updateAt_(1, !0);
        this.updateAt_(2, !0);
        this.setTooltip(Blockly.Msg.LISTS_GET_SUBLIST_TOOLTIP)
    },
    mutationToDom: function () {
        var a = Blockly.utils.xml.createElement("mutation"),
            b = this.getInput("AT1").type == Blockly.INPUT_VALUE;
        a.setAttribute("at1", b);
        b = this.getInput("AT2").type == Blockly.INPUT_VALUE;
        a.setAttribute("at2", b);
        return a
    },
    domToMutation: function (a) {
        var b = "true" == a.getAttribute("at1");
        a = "true" == a.getAttribute("at2");
        this.updateAt_(1, b);
        this.updateAt_(2, a)
    },
    updateAt_: function (a, b) {
        this.removeInput("AT" + a);
        this.removeInput("ORDINAL" + a, !0);
        b ? (this.appendValueInput("AT" + a).setCheck("Number"), Blockly.Msg.ORDINAL_NUMBER_SUFFIX && this.appendDummyInput("ORDINAL" + a).appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) :
            this.appendDummyInput("AT" + a);
        var c = new Blockly.FieldDropdown(this["WHERE_OPTIONS_" + a], function (d) {
            var e = "FROM_START" == d || "FROM_END" == d;
            if (e != b) {
                var f = this.getSourceBlock();
                f.updateAt_(a, e);
                f.setFieldValue(d, "WHERE" + a);
                return null
            }
        });
        this.getInput("AT" + a).appendField(c, "WHERE" + a);
        1 == a && (this.moveInputBefore("AT1", "AT2"), this.getInput("ORDINAL1") && this.moveInputBefore("ORDINAL1", "AT2"));
        Blockly.Msg.LISTS_GET_SUBLIST_TAIL && this.moveInputBefore("TAIL", null)
    }
};
Blockly.Blocks.lists_sort = {
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.LISTS_SORT_TITLE,
            args0: [{
                type: "field_dropdown",
                name: "TYPE",
                options: [
                    [Blockly.Msg.LISTS_SORT_TYPE_NUMERIC, "NUMERIC"],
                    [Blockly.Msg.LISTS_SORT_TYPE_TEXT, "TEXT"],
                    [Blockly.Msg.LISTS_SORT_TYPE_IGNORECASE, "IGNORE_CASE"]
                ]
            }, {
                type: "field_dropdown",
                name: "DIRECTION",
                options: [
                    [Blockly.Msg.LISTS_SORT_ORDER_ASCENDING, "1"],
                    [Blockly.Msg.LISTS_SORT_ORDER_DESCENDING, "-1"]
                ]
            }, {
                type: "input_value",
                name: "LIST",
                check: "Array"
            }],
            output: "Array",
            style: "list_blocks",
            tooltip: Blockly.Msg.LISTS_SORT_TOOLTIP,
            helpUrl: Blockly.Msg.LISTS_SORT_HELPURL
        })
    }
};
Blockly.Blocks.lists_split = {
    init: function () {
        var a = this,
            b = new Blockly.FieldDropdown([
                [Blockly.Msg.LISTS_SPLIT_LIST_FROM_TEXT, "SPLIT"],
                [Blockly.Msg.LISTS_SPLIT_TEXT_FROM_LIST, "JOIN"]
            ], function (c) {
                a.updateType_(c)
            });
        this.setHelpUrl(Blockly.Msg.LISTS_SPLIT_HELPURL);
        this.setStyle("list_blocks");
        this.appendValueInput("INPUT").setCheck("String").appendField(b, "MODE");
        this.appendValueInput("DELIM").setCheck("String").appendField(Blockly.Msg.LISTS_SPLIT_WITH_DELIMITER);
        this.setInputsInline(!0);
        this.setOutput(!0,
            "Array");
        this.setTooltip(function () {
            var c = a.getFieldValue("MODE");
            if ("SPLIT" == c) return Blockly.Msg.LISTS_SPLIT_TOOLTIP_SPLIT;
            if ("JOIN" == c) return Blockly.Msg.LISTS_SPLIT_TOOLTIP_JOIN;
            throw Error("Unknown mode: " + c);
        })
    },
    updateType_: function (a) {
        if (this.getFieldValue("MODE") != a) {
            var b = this.getInput("INPUT").connection;
            b.setShadowDom(null);
            var c = b.targetBlock();
            c && (b.disconnect(), c.isShadow() ? c.dispose() : this.bumpNeighbours())
        }
        "SPLIT" == a ? (this.outputConnection.setCheck("Array"), this.getInput("INPUT").setCheck("String")) :
            (this.outputConnection.setCheck("String"), this.getInput("INPUT").setCheck("Array"))
    },
    mutationToDom: function () {
        var a = Blockly.utils.xml.createElement("mutation");
        a.setAttribute("mode", this.getFieldValue("MODE"));
        return a
    },
    domToMutation: function (a) {
        this.updateType_(a.getAttribute("mode"))
    }
};