const rootProcedures = "[blocks][procedures]";
const COLOUR_PROCEDURE_BLOCK = 230;

Blockly.Blocks.procedures = {};

/**
 * Main functional block
 */
Blockly.Blocks.main_block = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootProcedures} main_block`);
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        Blockly.Procedures.findLegalName(Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE, this);
        this.appendDummyInput().appendField(Blockly.Msg.MAIN_BLOCK);
        this.appendStatementInput("STACK").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_DO);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
        this.arguments_ = [];
        this.types_ = [];
        this.appendDummyInput().appendField("}");

    },
    getName: function () {
        return ["Main"];
    },
    getParamInfo: function () {
        return [];
    }
};

