Blockly.cake.stdio = {};

Blockly.cake.library_stdio_text_char = function () {
    return ["'" + this.getFieldValue("CHAR") + "'", Blockly.cake.ORDER_ATOMIC]
};