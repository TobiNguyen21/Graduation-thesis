const rootCondition = "[blocks][condition]";
const COLOUR_CONDITION_BLOCK = 50;

Blockly.Blocks.condition = {};

/**
 * [Toolbox][Conditions] if block
 */
Blockly.Blocks.controls_if = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootCondition} controls_if`);
        this.setColour(COLOUR_CONDITION_BLOCK);
        this.appendValueInput("IF0").setCheck("Number INT NEGATIVE Variable VAR_INT VAR_UNINT DOUBLE VAR_FLOAT VAR_DOUBLE Aster Boolean".split(" ")).appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("DO0").appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(["controls_if_elseif", "controls_if_else"]));
        const self = this;
        this.setTooltip(function () {
            if (self.elseifCount_ || self.elseCount_) {
                if (!self.elseifCount_ &&
                    sels.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
                if (self.elseifCount_ && !self.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
                if (self.elseifCount_ && self.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_4
            } else return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
            return ""
        });
        this.elseCount_ = this.elseifCount_ = 0;
        this.tag = Blockly.Msg.TAG_LOGIC_IF
    },
    mutationToDom: function () {
        if (!this.elseifCount_ && !this.elseCount_) return null;
        const mutation = document.createElement("mutation");
        this.elseifCount_ && mutation.setAttribute("elseif", this.elseifCount_);
        this.elseCount_ && mutation.setAttribute("else", 1);
        return mutation
    },
    domToMutation: function (xmlElement) {
        this.elseifCount_ = parseInt(xmlElement.getAttribute("elseif"), 10);
        this.elseCount_ = parseInt(xmlElement.getAttribute("else"), 10);
        for (let i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput("IF" + i).setCheck("Number INT NEGATIVE Variable VAR_INT VAR_UNINT DOUBLE VAR_FLOAT VAR_DOUBLE Aster Boolean".split(" ")).appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
            this.appendStatementInput("DO" + i).appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        }
        if (this.elseCount_) {
            this.appendStatementInput("ELSE").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        }
    },
    decompose: function (workspace) {
        const containerBlock = Blockly.Block.obtain(workspace, "controls_if_if");
        containerBlock.initSvg();
        let connection = containerBlock.getInput("STACK").connection;
        for (let i = 1; i <= this.elseifCount_; i++) {
            const elseifBlock = Blockly.Block.obtain(workspace, "controls_if_elseif");
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            const elseBlock = Blockly.Block.obtain(workspace, "controls_if_else");
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
    },
    compose: function (workspace) {
        if (this.elseCount_) {
            this.removeInput("ELSE");
        }
        this.elseCount_ = 0;
        for (let i = this.elseifCount_; i > 0; i--) {
            this.removeInput("IF" + i);
            this.removeInput("DO" + i);
        }
        this.elseifCount_ = 0;
        let inputBlock = workspace.getInputTargetBlock("STACK");
        while (inputBlock) {
            switch (inputBlock.type) {
                case "controls_if_elseif":
                    this.elseifCount_++;
                    const valueInput = this.appendValueInput("IF" + this.elseifCount_).setCheck("Number INT NEGATIVE Variable VAR_INT VAR_UNINT DOUBLE VAR_FLOAT VAR_DOUBLE Aster Boolean".split(" ")).appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
                    const statementInput = this.appendStatementInput("DO" + this.elseifCount_);
                    statementInput.appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
                    if (inputBlock.valueConnection_) {
                        valueInput.connection.connect(inputBlock.valueConnection_);
                    }
                    if (inputBlock.statementConnection_) {
                        statementInput.connection.connect(inputBlock.statementConnection_);
                    }
                    break;
                case "controls_if_else":
                    this.elseCount_++;
                    const elseInput = this.appendStatementInput("ELSE");
                    elseInput.appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
                    if (inputBlock.statementConnection_) {
                        elseInput.connection.connect(inputBlock.statementConnection_);
                    }
                    break;
                default:
                    throw "Unknown block type.";
            }
            inputBlock = inputBlock.nextConnection && inputBlock.nextConnection.targetBlock();
        }
    },
    saveConnections: function (containerBlock) {
        let clauseBlock = containerBlock.getInputTargetBlock("STACK");
        let i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case "controls_if_elseif":
                    const ifInput = this.getInput("IF" + i);
                    const doInput = this.getInput("DO" + i);
                    clauseBlock.valueConnection_ = ifInput && ifInput.connection.targetConnection;
                    clauseBlock.statementConnection_ = doInput && doInput.connection.targetConnection;
                    i++;
                    break;
                case "controls_if_else":
                    const elseInput = this.getInput("ELSE");
                    clauseBlock.statementConnection_ = elseInput && elseInput.connection.targetConnection;
                    break;
                default:
                    throw "Unknown block type.";
            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
        }
    },
    onchange: Blockly.Blocks.requireInFunction
};

Blockly.Blocks.controls_if_if = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootCondition} controls_if_if`);
        this.setColour(COLOUR_CONDITION_BLOCK);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
        this.contextMenu = !1
    }
};

Blockly.Blocks.controls_if_elseif = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootCondition} controls_if_elseif`);
        this.setColour(COLOUR_CONDITION_BLOCK);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
        this.contextMenu = !1
    }
};

Blockly.Blocks.controls_if_else = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootCondition} controls_if_else`);
        this.setColour(COLOUR_CONDITION_BLOCK);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE);
        this.setPreviousStatement(!0);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
        this.contextMenu = !1
    }
};

/**
 * [Toolbox][Conditions] switch block
 */
Blockly.Blocks.controls_switch = {
    init: function () {
        this.setColour(COLOUR_CONDITION_BLOCK);
        if (LOG_NAME_BLOCK) console.log(`${rootCondition} controls_switch`);
        this.appendValueInput("SWITCH").appendField(Blockly.Msg.CONTROLS_SWITCH);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_SWITCH_DEFAULT);
        this.appendStatementInput("DEFAULT").appendField(Blockly.Msg.CONTROLS_SWITCH_DO);
        this.appendValueInput("CASE0").setCheck(["Number", "INT", "UNINT", "NEGATIVE", "CHAR"]).appendField(Blockly.Msg.CONTROLS_SWITCH_CASE);
        this.appendStatementInput("DO0").appendField(Blockly.Msg.CONTROLS_SWITCH_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(["controls_switch_case"]));
        this.tag = Blockly.Msg.TAG_LOGIC_SWITCH;
        const self = this;
        this.setTooltip(function () {
            if (self.caseCount_) {
                if (self.caseCount_) {
                    if (self.caseCount_) return Blockly.Msg.CONTROLS_SWITCH_TOOLTIP3;
                    if (self.caseCount_) return Blockly.Msg.CONTROLS_SWITCH_TOOLTIP4;
                } else return Blockly.Msg.CONTROLS_SWITCH_TOOLTIP2;
            } else return Blockly.Msg.CONTROLS_SWITCH_TOOLTIP1;
            return "";
        });
        this.caseCount_ = 0;
    },
    mutationToDom: function () {
        if (!this.caseCount_) return null;
        const mutation = document.createElement("mutation");
        if (this.caseCount_) mutation.setAttribute("case", this.caseCount_);
        return mutation;
    },
    domToMutation: function (mutation) {
        this.caseCount_ = parseInt(mutation.getAttribute("case"), 10) || 0;
        for (let i = 1; i <= this.caseCount_; i++) {
            this.appendValueInput("CASE" + i).appendField(Blockly.Msg.CONTROLS_SWITCH_CASE);
            this.appendStatementInput("DO" + i).appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        }
    },
    decompose: function (workspace) {
        const containerBlock = Blockly.Block.obtain(workspace, "controls_switch_switch");
        containerBlock.initSvg();
        let connection = containerBlock.getInput("STACK").connection;
        for (let i = 1; i <= this.caseCount_; i++) {
            const caseBlock = Blockly.Block.obtain(workspace, "controls_switch_case");
            caseBlock.initSvg();
            connection.connect(caseBlock.previousConnection);
            connection = caseBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function (containerBlock) {
        for (let i = this.caseCount_; i > 0; i--) {
            this.removeInput("CASE" + i);
            this.removeInput("DO" + i);
        }
        this.caseCount_ = 0;
        let clauseBlock = containerBlock.getInputTargetBlock("STACK");
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case "controls_switch_case":
                    this.caseCount_++;
                    const caseInput = this.appendValueInput("CASE" + this.caseCount_).setCheck(["Number", "INT", "UNINT", "NEGATIVE", "CHAR"]).appendField(Blockly.Msg.CONTROLS_SWITCH_CASE);
                    const doInput = this.appendStatementInput("DO" + this.caseCount_).appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
                    if (clauseBlock.valueConnection_) {
                        caseInput.connection.connect(clauseBlock.valueConnection_);
                    }
                    if (clauseBlock.statementConnection_) {
                        doInput.connection.connect(clauseBlock.statementConnection_);
                    }
                    break;
                default:
                    throw "Unknown block type.";
            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
        }
    },
    saveConnections: function (containerBlock) {
        let clauseBlock = containerBlock.getInputTargetBlock("STACK");
        let i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case "controls_switch_case":
                    const caseInput = this.getInput("CASE" + i);
                    const doInput = this.getInput("DO" + i);
                    clauseBlock.valueConnection_ = caseInput && caseInput.connection.targetConnection;
                    clauseBlock.statementConnection_ = doInput && doInput.connection.targetConnection;
                    i++;
                    break;
                default:
                    throw "Unknown block type.";
            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
        }
    },
    onchange: Blockly.Blocks.requireInFunction
};

Blockly.Blocks.controls_switch_switch = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootCondition} controls_switch_switch`);
        this.setColour(COLOUR_CONDITION_BLOCK);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_SWITCH_CASE);
        this.appendStatementInput("STACK");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_SWITCH_CASE_TOOLTIP);
        this.contextMenu = false
    }
};

Blockly.Blocks.controls_switch_case = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootCondition} controls_switch_case`);
        this.setColour(COLOUR_CONDITION_BLOCK);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_SWITCH_CASE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_SWITCH_CASE_TOOLTIP);
        this.contextMenu = false
    }
};

Blockly.Blocks.controls_switch_break = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootCondition} controls_switch_break`);
        this.setColour(COLOUR_CONDITION_BLOCK);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_SWITCH_BREAK);
        this.setPreviousStatement(true);
        this.tag = Blockly.Msg.TAG_LOOP_FLOW;
        this.setTooltip(Blockly.Msg.CONTROLS_SWITCH_BREAK_TOOLTIP)
    },
    onchange: function () {
        if (this.workspace) {
            let foundSwitch = false;
            let block = this;
            do {
                if (block.type === "controls_switch") {
                    foundSwitch = true;
                    break;
                }
                block = block.getSurroundParent();
            } while (block);
            foundSwitch ? this.setWarningText(null) : this.setWarningText(Blockly.Msg.CONTROLS_SWITCH_BREAK_WARNING);
        }
    }
};