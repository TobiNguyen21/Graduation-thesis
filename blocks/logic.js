const rootLogic = "[blocks][logic]";
const COLOUR_LOGIC_BLOCK = 123;

Blockly.Blocks.logic = {};

/**
 * [Toolbox][Logic] compare block
 */
Blockly.Blocks.logic_compare = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootLogic} logic_compare`);
        let operators = Blockly.RTL ? [
            ["=", "EQ"],
            ["\u2260", "NEQ"],
            [">", "LT"],
            ["\u2265", "LTE"],
            ["<", "GT"],
            ["\u2264", "GTE"]
        ] : [
            ["=", "EQ"],
            ["\u2260", "NEQ"],
            ["<", "LT"],
            ["\u2264", "LTE"],
            [">", "GT"],
            ["\u2265", "GTE"]
        ];
        this.setColour(COLOUR_LOGIC_BLOCK);
        this.setOutput(!0, "Boolean");
        this.appendValueInput("A");
        this.appendValueInput("B").appendField(new Blockly.FieldDropdown(operators), "OP");
        this.setInputsInline(!0);
        let self = this;
        this.setTooltip(function () {
            let operators = self.getFieldValue("OP");
            return {
                EQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
                NEQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ,
                LT: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,
                LTE: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE,
                GT: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
                GTE: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE
            }[operators]
        });
        this.tag = Blockly.Msg.TAG_LOGIC_COMPARE
    },
    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Logic] operation block
 */
Blockly.Blocks.logic_operation = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootLogic} logic_operation`);
        let operators = [
            [Blockly.Msg.LOGIC_OPERATION_AND, "AND"],
            [Blockly.Msg.LOGIC_OPERATION_OR, "OR"]
        ];
        this.setColour(COLOUR_LOGIC_BLOCK);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A");
        this.appendValueInput("B").appendField(new Blockly.FieldDropdown(operators), "OP");
        this.setInputsInline(true);
        let self = this;
        this.setTooltip(function () {
            var operator = self.getFieldValue("OP");
            return {
                AND: Blockly.Msg.LOGIC_OPERATION_TOOLTIP_AND,
                OR: Blockly.Msg.LOGIC_OPERATION_TOOLTIP_OR
            }[operator];
        });
        this.tag = Blockly.Msg.TAG_LOGIC_OPERATION;
    },
    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Logic] negate block
 */
Blockly.Blocks.logic_negate = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootLogic} logic_negate`);
        this.setColour(COLOUR_LOGIC_BLOCK);
        this.setOutput(true, "Boolean");
        this.interpolateMsg(Blockly.Msg.LOGIC_NEGATE_TITLE, ["BOOL", ["Boolean", "Variable", "VAR_INT", "VAR_UNINT", "Number", "NEGATIVE", "INT"], Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.LOGIC_NEGATE_TOOLTIP);
        this.tag = Blockly.Msg.TAG_LOGIC_NEGATE
    },
    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Logic] logic block
 */
Blockly.Blocks.logic_boolean = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootLogic} logic_boolean`);
        let operators = [
            [Blockly.Msg.LOGIC_BOOLEAN_TRUE, "TRUE"],
            [Blockly.Msg.LOGIC_BOOLEAN_FALSE, "FALSE"]
        ];
        this.setColour(COLOUR_LOGIC_BLOCK);
        this.setOutput(true, "Boolean");
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(operators), "BOOL");
        this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
        this.tag = Blockly.Msg.TAG_LOGIC_BOOLEAN
    },
    onchange: Blockly.Blocks.requireInFunction
};


/**
 * [Toolbox][Logic] null block
 */
Blockly.Blocks.logic_null = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootLogic} logic_null`);
        this.setColour(COLOUR_LOGIC_BLOCK);
        this.setOutput(true);
        this.appendDummyInput().appendField(Blockly.Msg.LOGIC_NULL);
        this.setTooltip(Blockly.Msg.LOGIC_NULL_TOOLTIP);
        this.tag = Blockly.Msg.TAG_LOGIC_NULL
    },
    onchange: Blockly.Blocks.requireInFunction
};
