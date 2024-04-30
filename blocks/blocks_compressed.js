'use strict';
Blockly.Blocks.colour = {};
Blockly.Constants = {};
Blockly.Constants.Colour = {};
Blockly.Constants.Colour.HUE = 20;
Blockly.defineBlocksWithJsonArray([{
    type: "colour_picker",
    message0: "%1",
    args0: [{
        type: "field_colour",
        name: "COLOUR",
        colour: "#ff0000"
    }],
    output: "Colour",
    helpUrl: "%{BKY_COLOUR_PICKER_HELPURL}",
    style: "colour_blocks",
    tooltip: "%{BKY_COLOUR_PICKER_TOOLTIP}",
    extensions: ["parent_tooltip_when_inline"]
}, {
    type: "colour_random",
    message0: "%{BKY_COLOUR_RANDOM_TITLE}",
    output: "Colour",
    helpUrl: "%{BKY_COLOUR_RANDOM_HELPURL}",
    style: "colour_blocks",
    tooltip: "%{BKY_COLOUR_RANDOM_TOOLTIP}"
}, {
    type: "colour_rgb",
    message0: "%{BKY_COLOUR_RGB_TITLE} %{BKY_COLOUR_RGB_RED} %1 %{BKY_COLOUR_RGB_GREEN} %2 %{BKY_COLOUR_RGB_BLUE} %3",
    args0: [{
        type: "input_value",
        name: "RED",
        check: "Number",
        align: "RIGHT"
    }, {
        type: "input_value",
        name: "GREEN",
        check: "Number",
        align: "RIGHT"
    }, {
        type: "input_value",
        name: "BLUE",
        check: "Number",
        align: "RIGHT"
    }],
    output: "Colour",
    helpUrl: "%{BKY_COLOUR_RGB_HELPURL}",
    style: "colour_blocks",
    tooltip: "%{BKY_COLOUR_RGB_TOOLTIP}"
}, {
    type: "colour_blend",
    message0: "%{BKY_COLOUR_BLEND_TITLE} %{BKY_COLOUR_BLEND_COLOUR1} %1 %{BKY_COLOUR_BLEND_COLOUR2} %2 %{BKY_COLOUR_BLEND_RATIO} %3",
    args0: [{
        type: "input_value",
        name: "COLOUR1",
        check: "Colour",
        align: "RIGHT"
    }, {
        type: "input_value",
        name: "COLOUR2",
        check: "Colour",
        align: "RIGHT"
    }, {
        type: "input_value",
        name: "RATIO",
        check: "Number",
        align: "RIGHT"
    }],
    output: "Colour",
    helpUrl: "%{BKY_COLOUR_BLEND_HELPURL}",
    style: "colour_blocks",
    tooltip: "%{BKY_COLOUR_BLEND_TOOLTIP}"
}]);

// [Lists]
// [Logic]
// [Loop]
// [Math]
// [procedures]
// [Text]
Blockly.Blocks.texts = {};
Blockly.Constants.Text = {};
Blockly.Constants.Text.HUE = 160;
Blockly.defineBlocksWithJsonArray([{
    type: "text",
    message0: "%1",
    args0: [{
        type: "field_input",
        name: "TEXT",
        text: ""
    }],
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_TEXT_HELPURL}",
    tooltip: "%{BKY_TEXT_TEXT_TOOLTIP}",
    extensions: ["text_quotes", "parent_tooltip_when_inline"]
}, {
    type: "text_multiline",
    message0: "%1 %2",
    args0: [{
        type: "field_image",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAARCAYAAADpPU2iAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAdhgAAHYYBXaITgQAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAAP1JREFUOE+Vks0KQUEYhjmRIja4ABtZ2dm5A3t3Ia6AUm7CylYuQRaUhZSlLZJiQbFAyRnPN33y01HOW08z8873zpwzM4F3GWOCruvGIE4/rLaV+Nq1hVGMBqzhqlxgCys4wJA65xnogMHsQ5lujnYHTejBBCK2mE4abjCgMGhNxHgDFWjDSG07kdfVa2pZMf4ZyMAdWmpZMfYOsLiDMYMjlMB+K613QISRhTnITnsYg5yUd0DETmEoMlkFOeIT/A58iyK5E18BuTBfgYXfwNJv4P9/oEBerLylOnRhygmGdPpTTBZAPkde61lbQe4moWUvYUZYLfUNftIY4zwA5X2Z9AYnQrEAAAAASUVORK5CYII=",
        width: 12,
        height: 17,
        alt: "\u00b6"
    }, {
        type: "field_multilinetext",
        name: "TEXT",
        text: ""
    }],
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_TEXT_HELPURL}",
    tooltip: "%{BKY_TEXT_TEXT_TOOLTIP}",
    extensions: ["parent_tooltip_when_inline"]
}, {
    type: "text_join",
    message0: "",
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_JOIN_HELPURL}",
    tooltip: "%{BKY_TEXT_JOIN_TOOLTIP}",
    mutator: "text_join_mutator"
}, {
    type: "text_create_join_container",
    message0: "%{BKY_TEXT_CREATE_JOIN_TITLE_JOIN} %1 %2",
    args0: [{
        type: "input_dummy"
    },
    {
        type: "input_statement",
        name: "STACK"
    }
    ],
    style: "text_blocks",
    tooltip: "%{BKY_TEXT_CREATE_JOIN_TOOLTIP}",
    enableContextMenu: !1
}, {
    type: "text_create_join_item",
    message0: "%{BKY_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM}",
    previousStatement: null,
    nextStatement: null,
    style: "text_blocks",
    tooltip: "%{BKY_TEXT_CREATE_JOIN_ITEM_TOOLTIP}",
    enableContextMenu: !1
}, {
    type: "text_append",
    message0: "%{BKY_TEXT_APPEND_TITLE}",
    args0: [{
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_TEXT_APPEND_VARIABLE}"
    }, {
        type: "input_value",
        name: "TEXT"
    }],
    previousStatement: null,
    nextStatement: null,
    style: "text_blocks",
    extensions: ["text_append_tooltip"]
}, {
    type: "text_length",
    message0: "%{BKY_TEXT_LENGTH_TITLE}",
    args0: [{
        type: "input_value",
        name: "VALUE",
        check: ["String", "Array"]
    }],
    output: "Number",
    style: "text_blocks",
    tooltip: "%{BKY_TEXT_LENGTH_TOOLTIP}",
    helpUrl: "%{BKY_TEXT_LENGTH_HELPURL}"
}, {
    type: "text_isEmpty",
    message0: "%{BKY_TEXT_ISEMPTY_TITLE}",
    args0: [{
        type: "input_value",
        name: "VALUE",
        check: ["String", "Array"]
    }],
    output: "Boolean",
    style: "text_blocks",
    tooltip: "%{BKY_TEXT_ISEMPTY_TOOLTIP}",
    helpUrl: "%{BKY_TEXT_ISEMPTY_HELPURL}"
}, {
    type: "text_indexOf",
    message0: "%{BKY_TEXT_INDEXOF_TITLE}",
    args0: [{
        type: "input_value",
        name: "VALUE",
        check: "String"
    }, {
        type: "field_dropdown",
        name: "END",
        options: [
            ["%{BKY_TEXT_INDEXOF_OPERATOR_FIRST}", "FIRST"],
            ["%{BKY_TEXT_INDEXOF_OPERATOR_LAST}", "LAST"]
        ]
    }, {
        type: "input_value",
        name: "FIND",
        check: "String"
    }],
    output: "Number",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_INDEXOF_HELPURL}",
    inputsInline: !0,
    extensions: ["text_indexOf_tooltip"]
}, {
    type: "text_charAt",
    message0: "%{BKY_TEXT_CHARAT_TITLE}",
    args0: [{
        type: "input_value",
        name: "VALUE",
        check: "String"
    }, {
        type: "field_dropdown",
        name: "WHERE",
        options: [
            ["%{BKY_TEXT_CHARAT_FROM_START}", "FROM_START"],
            ["%{BKY_TEXT_CHARAT_FROM_END}", "FROM_END"],
            ["%{BKY_TEXT_CHARAT_FIRST}", "FIRST"],
            ["%{BKY_TEXT_CHARAT_LAST}", "LAST"],
            ["%{BKY_TEXT_CHARAT_RANDOM}", "RANDOM"]
        ]
    }],
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_CHARAT_HELPURL}",
    inputsInline: !0,
    mutator: "text_charAt_mutator"
}]);
Blockly.Blocks.text_getSubstring = {
    init: function () {
        this.WHERE_OPTIONS_1 = [
            [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_START, "FROM_START"],
            [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_END, "FROM_END"],
            [Blockly.Msg.TEXT_GET_SUBSTRING_START_FIRST, "FIRST"]
        ];
        this.WHERE_OPTIONS_2 = [
            [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_START, "FROM_START"],
            [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_END, "FROM_END"],
            [Blockly.Msg.TEXT_GET_SUBSTRING_END_LAST, "LAST"]
        ];
        this.setHelpUrl(Blockly.Msg.TEXT_GET_SUBSTRING_HELPURL);
        this.setStyle("text_blocks");
        this.appendValueInput("STRING").setCheck("String").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_INPUT_IN_TEXT);
        this.appendDummyInput("AT1");
        this.appendDummyInput("AT2");
        Blockly.Msg.TEXT_GET_SUBSTRING_TAIL && this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
        this.setInputsInline(!0);
        this.setOutput(!0, "String");
        this.updateAt_(1, !0);
        this.updateAt_(2, !0);
        this.setTooltip(Blockly.Msg.TEXT_GET_SUBSTRING_TOOLTIP)
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
        2 == a && Blockly.Msg.TEXT_GET_SUBSTRING_TAIL && (this.removeInput("TAIL", !0), this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL));
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
        1 == a && (this.moveInputBefore("AT1", "AT2"), this.getInput("ORDINAL1") &&
            this.moveInputBefore("ORDINAL1", "AT2"))
    }
};
Blockly.Blocks.text_changeCase = {
    init: function () {
        var a = [
            [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_UPPERCASE, "UPPERCASE"],
            [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_LOWERCASE, "LOWERCASE"],
            [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_TITLECASE, "TITLECASE"]
        ];
        this.setHelpUrl(Blockly.Msg.TEXT_CHANGECASE_HELPURL);
        this.setStyle("text_blocks");
        this.appendValueInput("TEXT").setCheck("String").appendField(new Blockly.FieldDropdown(a), "CASE");
        this.setOutput(!0, "String");
        this.setTooltip(Blockly.Msg.TEXT_CHANGECASE_TOOLTIP)
    }
};
Blockly.Blocks.text_trim = {
    init: function () {
        var a = [
            [Blockly.Msg.TEXT_TRIM_OPERATOR_BOTH, "BOTH"],
            [Blockly.Msg.TEXT_TRIM_OPERATOR_LEFT, "LEFT"],
            [Blockly.Msg.TEXT_TRIM_OPERATOR_RIGHT, "RIGHT"]
        ];
        this.setHelpUrl(Blockly.Msg.TEXT_TRIM_HELPURL);
        this.setStyle("text_blocks");
        this.appendValueInput("TEXT").setCheck("String").appendField(new Blockly.FieldDropdown(a), "MODE");
        this.setOutput(!0, "String");
        this.setTooltip(Blockly.Msg.TEXT_TRIM_TOOLTIP)
    }
};

// Blockly.Blocks.text_print = {
//     init: function () {
//         this.jsonInit({
//             message0: Blockly.Msg.TEXT_PRINT_TITLE,
//             args0: [{
//                 type: "input_value",
//                 name: "TEXT"
//             }],
//             previousStatement: null,
//             nextStatement: null,
//             style: "text_blocks",
//             tooltip: Blockly.Msg.TEXT_PRINT_TOOLTIP,
//             helpUrl: Blockly.Msg.TEXT_PRINT_HELPURL
//         })
//     }
// };
// Blockly.Blocks.text_prompt_ext = {
//     init: function () {
//         var a = [
//             [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, "TEXT"],
//             [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, "NUMBER"]
//         ];
//         this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
//         this.setStyle("text_blocks");
//         var b = this;
//         a = new Blockly.FieldDropdown(a, function (c) {
//             b.updateType_(c)
//         });
//         this.appendValueInput("TEXT").appendField(a, "TYPE");
//         this.setOutput(!0, "String");
//         this.setTooltip(function () {
//             return "TEXT" == b.getFieldValue("TYPE") ? Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT : Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER
//         })
//     },
//     updateType_: function (a) {
//         this.outputConnection.setCheck("NUMBER" == a ? "Number" : "String")
//     },
//     mutationToDom: function () {
//         var a = Blockly.utils.xml.createElement("mutation");
//         a.setAttribute("type", this.getFieldValue("TYPE"));
//         return a
//     },
//     domToMutation: function (a) {
//         this.updateType_(a.getAttribute("type"))
//     }
// };
// Blockly.Blocks.text_prompt = {
//     init: function () {
//         this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
//         var a = [
//             [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, "TEXT"],
//             [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, "NUMBER"]
//         ],
//             b = this;
//         this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
//         this.setStyle("text_blocks");
//         a = new Blockly.FieldDropdown(a, function (c) {
//             b.updateType_(c)
//         });
//         this.appendDummyInput().appendField(a, "TYPE").appendField(this.newQuote_(!0)).appendField(new Blockly.FieldTextInput(""), "TEXT").appendField(this.newQuote_(!1));
//         this.setOutput(!0, "String");
//         this.setTooltip(function () {
//             return "TEXT" == b.getFieldValue("TYPE") ? Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT : Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER
//         })
//     },
//     updateType_: Blockly.Blocks.text_prompt_ext.updateType_,
//     mutationToDom: Blockly.Blocks.text_prompt_ext.mutationToDom,
//     domToMutation: Blockly.Blocks.text_prompt_ext.domToMutation
// };

Blockly.Blocks.text_count = {
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.TEXT_COUNT_MESSAGE0,
            args0: [{
                type: "input_value",
                name: "SUB",
                check: "String"
            }, {
                type: "input_value",
                name: "TEXT",
                check: "String"
            }],
            output: "Number",
            inputsInline: !0,
            style: "text_blocks",
            tooltip: Blockly.Msg.TEXT_COUNT_TOOLTIP,
            helpUrl: Blockly.Msg.TEXT_COUNT_HELPURL
        })
    }
};
Blockly.Blocks.text_replace = {
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.TEXT_REPLACE_MESSAGE0,
            args0: [{
                type: "input_value",
                name: "FROM",
                check: "String"
            }, {
                type: "input_value",
                name: "TO",
                check: "String"
            }, {
                type: "input_value",
                name: "TEXT",
                check: "String"
            }],
            output: "String",
            inputsInline: !0,
            style: "text_blocks",
            tooltip: Blockly.Msg.TEXT_REPLACE_TOOLTIP,
            helpUrl: Blockly.Msg.TEXT_REPLACE_HELPURL
        })
    }
};
Blockly.Blocks.text_reverse = {
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.TEXT_REVERSE_MESSAGE0,
            args0: [{
                type: "input_value",
                name: "TEXT",
                check: "String"
            }],
            output: "String",
            inputsInline: !0,
            style: "text_blocks",
            tooltip: Blockly.Msg.TEXT_REVERSE_TOOLTIP,
            helpUrl: Blockly.Msg.TEXT_REVERSE_HELPURL
        })
    }
};
Blockly.Constants.Text.QUOTE_IMAGE_MIXIN = {
    QUOTE_IMAGE_LEFT_DATAURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC",
    QUOTE_IMAGE_RIGHT_DATAURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==",
    QUOTE_IMAGE_WIDTH: 12,
    QUOTE_IMAGE_HEIGHT: 12,
    quoteField_: function (a) {
        for (var b = 0, c; c = this.inputList[b]; b++)
            for (var d = 0, e; e = c.fieldRow[d]; d++)
                if (a == e.name) {
                    c.insertFieldAt(d, this.newQuote_(!0));
                    c.insertFieldAt(d + 2, this.newQuote_(!1));
                    return
                } console.warn('field named "' + a + '" not found in ' + this.toDevString())
    },
    newQuote_: function (a) {
        a = this.RTL ? !a : a;
        return new Blockly.FieldImage(a ? this.QUOTE_IMAGE_LEFT_DATAURI : this.QUOTE_IMAGE_RIGHT_DATAURI, this.QUOTE_IMAGE_WIDTH, this.QUOTE_IMAGE_HEIGHT, a ? "\u201c" : "\u201d")
    }
};
Blockly.Constants.Text.TEXT_QUOTES_EXTENSION = function () {
    this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
    this.quoteField_("TEXT")
};
Blockly.Constants.Text.TEXT_JOIN_MUTATOR_MIXIN = {
    mutationToDom: function () {
        var a = Blockly.utils.xml.createElement("mutation");
        a.setAttribute("items", this.itemCount_);
        return a
    },
    domToMutation: function (a) {
        this.itemCount_ = parseInt(a.getAttribute("items"), 10);
        this.updateShape_()
    },
    decompose: function (a) {
        var b = a.newBlock("text_create_join_container");
        b.initSvg();
        for (var c = b.getInput("STACK").connection, d = 0; d < this.itemCount_; d++) {
            var e = a.newBlock("text_create_join_item");
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
            var c = this.getInput("ADD" + b).connection.targetConnection;
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
        this.itemCount_ && this.getInput("EMPTY") ? this.removeInput("EMPTY") : this.itemCount_ || this.getInput("EMPTY") || this.appendDummyInput("EMPTY").appendField(this.newQuote_(!0)).appendField(this.newQuote_(!1));
        for (var a = 0; a < this.itemCount_; a++)
            if (!this.getInput("ADD" + a)) {
                var b = this.appendValueInput("ADD" + a).setAlign(Blockly.ALIGN_RIGHT);
                0 == a && b.appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH)
            } for (; this.getInput("ADD" + a);) this.removeInput("ADD" + a), a++
    }
};
Blockly.Constants.Text.TEXT_JOIN_EXTENSION = function () {
    this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
    this.itemCount_ = 2;
    this.updateShape_();
    this.setMutator(new Blockly.Mutator(["text_create_join_item"]))
};
Blockly.Extensions.register("text_append_tooltip", Blockly.Extensions.buildTooltipWithFieldText("%{BKY_TEXT_APPEND_TOOLTIP}", "VAR"));
Blockly.Constants.Text.TEXT_INDEXOF_TOOLTIP_EXTENSION = function () {
    var a = this;
    this.setTooltip(function () {
        return Blockly.Msg.TEXT_INDEXOF_TOOLTIP.replace("%1", a.workspace.options.oneBasedIndex ? "0" : "-1")
    })
};
Blockly.Constants.Text.TEXT_CHARAT_MUTATOR_MIXIN = {
    mutationToDom: function () {
        var a = Blockly.utils.xml.createElement("mutation");
        a.setAttribute("at", !!this.isAt_);
        return a
    },
    domToMutation: function (a) {
        a = "false" != a.getAttribute("at");
        this.updateAt_(a)
    },
    updateAt_: function (a) {
        this.removeInput("AT", !0);
        this.removeInput("ORDINAL", !0);
        a && (this.appendValueInput("AT").setCheck("Number"), Blockly.Msg.ORDINAL_NUMBER_SUFFIX && this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX));
        Blockly.Msg.TEXT_CHARAT_TAIL &&
            (this.removeInput("TAIL", !0), this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_CHARAT_TAIL));
        this.isAt_ = a
    }
};
Blockly.Constants.Text.TEXT_CHARAT_EXTENSION = function () {
    this.getField("WHERE").setValidator(function (b) {
        b = "FROM_START" == b || "FROM_END" == b;
        b != this.isAt_ && this.getSourceBlock().updateAt_(b)
    });
    this.updateAt_(!0);
    var a = this;
    this.setTooltip(function () {
        var b = a.getFieldValue("WHERE"),
            c = Blockly.Msg.TEXT_CHARAT_TOOLTIP;
        ("FROM_START" == b || "FROM_END" == b) && (b = "FROM_START" == b ? Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP : Blockly.Msg.LISTS_INDEX_FROM_END_TOOLTIP) && (c += "  " + b.replace("%1", a.workspace.options.oneBasedIndex ?
            "#1" : "#0"));
        return c
    })
};
Blockly.Extensions.register("text_indexOf_tooltip", Blockly.Constants.Text.TEXT_INDEXOF_TOOLTIP_EXTENSION);
Blockly.Extensions.register("text_quotes", Blockly.Constants.Text.TEXT_QUOTES_EXTENSION);
Blockly.Extensions.registerMutator("text_join_mutator", Blockly.Constants.Text.TEXT_JOIN_MUTATOR_MIXIN, Blockly.Constants.Text.TEXT_JOIN_EXTENSION);
Blockly.Extensions.registerMutator("text_charAt_mutator", Blockly.Constants.Text.TEXT_CHARAT_MUTATOR_MIXIN, Blockly.Constants.Text.TEXT_CHARAT_EXTENSION);
