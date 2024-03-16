const rootMath = "[blocks][math]";

Blockly.Blocks.math = {};
/**
 * [Toolbox][Variables] num block (init 0)
 */
Blockly.Blocks.math_number = {
  init: function () {
    if (LOG_NAME_BLOCK) console.log(`${rootMath} math_number`);
    this.setColour(240);

    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "NUM");

    this.setOutput(true, "Number");
    this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
    this.tag = Blockly.Msg.TAG_MATH_NUMBER;
  },
 
  onchange: function () {
    Blockly.Blocks.requireInFunction();

    let numValue = this.getFieldValue("NUM");

    if (numValue !== null) {
        if (typeof numValue === 'string' && numValue !== '') {
            if (numValue === "0") {
                this.changeOutput("Number");
            } else {
                if (numValue % 1 === 0) {
                    if (numValue > 0) {
                        if (numValue.endsWith(".0")) {
                            this.changeOutput("DOUBLE");
                        } else {
                            this.changeOutput("INT");
                        }
                    } else {
                        if (numValue.endsWith(".0")) {
                            this.changeOutput("DOUBLE");
                        } else {
                            this.changeOutput("NEGATIVE");
                        }
                    }
                } else {
                    this.changeOutput("DOUBLE");
                }
            }
        }
    }
}
};
