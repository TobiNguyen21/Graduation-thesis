Blockly.Blocks.logic = {};
Blockly.Blocks.logic_null = {
    init: function () {
        this.setColour(200);
        this.setOutput(!0);
        this.appendDummyInput().appendField(Blockly.Msg.LOGIC_NULL);
        this.setTooltip(Blockly.Msg.LOGIC_NULL_TOOLTIP);
        this.tag = Blockly.Msg.TAG_LOGIC_NULL
    },
    onchange: Blockly.Blocks.requireInFunction
};