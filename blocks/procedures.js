const rootProcedures = "[blocks][procedures]";

Blockly.Blocks.procedures = {};

/**
 * Main functional block
 */
Blockly.Blocks.main_block = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootProcedures} main_block`);
        this.setColour(190);
        Blockly.Procedures.findLegalName(Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE, this);
        this.appendDummyInput().appendField(Blockly.Msg.MAIN_BLOCK);
        this.appendStatementInput("STACK").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_DO);
        this.appendValueInput("RETURN").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MAIN_BLOCK_RETURN);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
        this.arguments_ = [];
        this.types_ = [];
        Blockly.Blocks.setCheckVariable(this,
            "int", "RETURN")
    },
    getName: function () {
        return ["Main"]
    },
    getParamInfo: function () {
        return []
    }
};