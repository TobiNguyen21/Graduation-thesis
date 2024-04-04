const rootLoop = "[blocks][loops]";
const COLOUR_LOOPS_BLOCK = 230;

Blockly.Blocks.loops = {};

/**
 * [Toolbox][Loops] for loop
 */
Blockly.Blocks.controls_for = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootLoop} controls_for`);
        this.setColour(COLOUR_LOOPS_BLOCK);

        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH)
            .appendField(new Blockly.FieldVariable(Blockly.Msg.SELECT_MENU, null, this), "VAR");

        this.interpolateMsg(Blockly.Msg.CONTROLS_FOR_INPUT_FROM_TO_BY,
            ["FROM", ["Number", "Variable", "INT", "NEGATIVE", "VAR_INT", "VAR_UNINT"], Blockly.ALIGN_RIGHT],
            ["TO", ["Number", "Variable", "INT", "NEGATIVE", "VAR_INT", "VAR_UNINT"], Blockly.ALIGN_RIGHT],
            ["BY", ["Number", "Variable", "INT", "NEGATIVE", "VAR_INT", "VAR_UNINT"], Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);

        this.appendStatementInput("DO")
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_DO);

        this.appendDummyInput()
            .appendField(new Blockly.FieldCheckbox("TRUE"), "ORDER")
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_ORDER)
            .setAlign(Blockly.ALIGN_RIGHT);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        const block = this;
        this.tag = Blockly.Msg.TAG_LOOP_FOR;

        this.setTooltip(function () {
            return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace("%1", block.getFieldValue("VAR"));
        });
    },

    getVars: function () {
        return [this.getFieldValue("VAR")];
    },

    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue("VAR"))) {
            this.setFieldValue(newName, "VAR");
        }
    },

    customContextMenu: function (menuOptions) {
        if (!this.isCollapsed()) {
            const option = {
                enabled: true
            };

            const varName = this.getFieldValue("VAR");

            option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1", varName);

            const field = goog.dom.createDom("field", null, varName);
            field.setAttribute("name", "VAR");

            const block = goog.dom.createDom("block", null, field);
            block.setAttribute("type", "variables_get");

            option.callback = Blockly.ContextMenu.callbackFactory(this, block);

            menuOptions.push(option);
        }
    },

    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Loops] break/continue block
 */
Blockly.Blocks.controls_flow_statements = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootLoop} controls_flow_statements`);
        this.setColour(COLOUR_LOOPS_BLOCK);

        const options = [
            [Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, "BREAK"],
            [Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, "CONTINUE"]
        ];

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(options), "FLOW");

        this.setPreviousStatement(true);

        const block = this;
        this.tag = Blockly.Msg.TAG_LOOP_FLOW;

        this.setTooltip(function () {
            const flow = block.getFieldValue("FLOW");
            return {
                BREAK: Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
                CONTINUE: Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE
            }[flow];
        });
    },

    onchange: function () {
        if (this.workspace) {
            let hasLoopBlock = false;
            let parentBlock = this;

            do {
                if (["controls_for", "controls_whileUntil", "controls_doWhile"].includes(parentBlock.type)) {
                    hasLoopBlock = true;
                    break;
                }
                parentBlock = parentBlock.getSurroundParent();
            } while (parentBlock);

            hasLoopBlock ? this.setWarningText(null) : this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
        }
    }
};

/**
 * [Toolbox][Loops] while loop block
 */
Blockly.Blocks.controls_whileUntil = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootLoop} controls_whileUntil`);
        this.setColour(COLOUR_LOOPS_BLOCK);

        const options = [
            [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE, "WHILE"],
            [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, "UNTIL"]
        ];

        this.appendValueInput("BOOL")
            .setCheck(["Boolean", "Number", "INT", "VAR_INT"])
            .appendField(new Blockly.FieldDropdown(options), "MODE");
        
        this.appendStatementInput("DO")
            .appendField(Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO);
        
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        const block = this;
        this.tag = Blockly.Msg.TAG_LOOP_WHILE;

        this.setTooltip(function () {
            const mode = block.getFieldValue("MODE");
            return {
                WHILE: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
                UNTIL: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
            }[mode];
        });
    },

    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Loops] doWhile loop block
 */
Blockly.Blocks.controls_doWhile = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootLoop} controls_doWhile`);
        this.setColour(COLOUR_LOOPS_BLOCK);

        const options = [
            [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE, "WHILE"],
            [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, "UNTIL"]
        ];

        this.appendStatementInput("DO")
            .appendField(Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO);

        this.appendValueInput("BOOL")
            .setCheck(["Boolean", "Number", "INT", "VAR_INT"])
            .appendField(new Blockly.FieldDropdown(options), "MODE");

        this.setPreviousStatement(true);
        this.setNextStatement(true);

        const block = this;
        this.tag = Blockly.Msg.TAG_LOOP_WHILE;

        this.setTooltip(function () {
            const mode = block.getFieldValue("MODE");
            return {
                WHILE: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
                UNTIL: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
            }[mode];
        });
    },

    onchange: Blockly.Blocks.requireInFunction
};


Blockly.Blocks.library_stdlib_sizeof = {
    init: function () {
        this.setColour(200);
        this.setOutput(!0, "Number");
        this.interpolateMsg(Blockly.Msg.STDLIB_SIZEOFFORMALLOC_TITLE, ["VAR", null, Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setTooltip(Blockly.Msg.STDLIB_SIZEOFFORMALLOC_TOOLTIP)
    },
    onchange: Blockly.Blocks.requireInFunction
};