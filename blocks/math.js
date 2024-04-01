const rootMath = "[blocks][math]";
const COLOUR_MATH_BLOCK = 240;


Blockly.Blocks.math = {};
/**
 * [Toolbox][Variables] num block (init 0)
 */
Blockly.Blocks.math_number = {
  init: function () {
    if (LOG_NAME_BLOCK) console.log(`${rootMath} math_number`);
    this.setColour(COLOUR_MATH_BLOCK);

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

/**
 * [Toolbox][Arithmetics] =,-,x,/ block 
 */
Blockly.Blocks.math_arithmetic = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootMath} math_arithmetic`);
        this.setColour(COLOUR_MATH_BLOCK);

        const operations = [
            [Blockly.Msg.MATH_ADDITION_SYMBOL, "ADD"],
            [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, "MINUS"],
            [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, "MULTIPLY"],
            [Blockly.Msg.MATH_DIVISION_SYMBOL, "DIVIDE"]
        ];

        this.setOutput(true, ["Number", "Pointer", "PTR_INT", "PTR_UNINT", "PTR_FLOAT", "PTR_DOUBLE", "PTR_CHAR"]);
        this.appendValueInput("A").setCheck([
            "Number", "INT", "NEGATIVE", "Variable", "VAR_INT", "VAR_UNINT", "DOUBLE", "VAR_FLOAT", "VAR_DOUBLE",
            "Aster", "Pointer", "PTR_INT", "PTR_UNINT", "PTR_FLOAT", "PTR_DOUBLE", "PTR_CHAR", "Macro", "VAR_CHAR",
            "CHAR", "Array"
        ]);
        this.appendValueInput("B").setCheck([
            "Number", "INT", "NEGATIVE", "Variable", "VAR_INT", "VAR_UNINT", "DOUBLE", "VAR_FLOAT", "VAR_DOUBLE",
            "Aster", "Pointer", "PTR_INT", "PTR_UNINT", "PTR_FLOAT", "PTR_DOUBLE", "PTR_CHAR", "Macro", "VAR_CHAR",
            "CHAR", "Array"
        ]).appendField(new Blockly.FieldDropdown(operations), "OP");
        this.setInputsInline(true);

        const block = this;
        this.tag = Blockly.Msg.TAG_MATH_ARITHMETIC;
        this.setTooltip(function () {
            const operation = block.getFieldValue("OP");
            return {
                ADD: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
                MINUS: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
                MULTIPLY: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
                DIVIDE: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE
            }[operation];
        });
    },
    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Arithmetics] convert type block 
 */
Blockly.Blocks.math_convert_type = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootMath} math_convert_type`);
        this.setColour(COLOUR_MATH_BLOCK);

        const typeOptions = [
            [Blockly.Msg.VARIABLES_SET_TYPE_INT, "int"],
            [Blockly.Msg.VARIABLES_SET_TYPE_UNSIGNED_INT, "unsigned int"],
            [Blockly.Msg.VARIABLES_SET_TYPE_FLOAT, "float"],
            [Blockly.Msg.VARIABLES_SET_TYPE_DOUBLE, "double"],
            [Blockly.Msg.VARIABLES_SET_TYPE_CHAR, "char"]
        ];

        this.setOutput(true, ["Number", "Variable", "VAR_INT", "VAR_UNINT", "DOUBLE", "VAR_FLOAT", "VAR_DOUBLE", "VAR_CHAR", "CHAR"]);
        this.appendValueInput("VAR").setCheck(["Number", "INT", "NEGATIVE", "Variable", "VAR_INT", "VAR_UNINT", "DOUBLE", "VAR_FLOAT", "VAR_DOUBLE", "Aster", "Macro", "VAR_CHAR", "CHAR", "Array"]).appendField(new Blockly.FieldDropdown(typeOptions), "NEWTYPE");
        this.setInputsInline(true);
        this.tag = Blockly.Msg.TAG_MATH_CONVERT_TYPE;
        this.setTooltip(Blockly.Msg.MATH_CONVERT_TYPE_TOOLTIP);
    },
    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Arithmetics] auto convert type block 
 */
Blockly.Blocks.math_auto_convert_type = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootMath} math_auto_convert_type`);
        this.setColour(COLOUR_MATH_BLOCK);

        this.setOutput(true, "Number Pointer Variable VAR_INT VAR_UNINT DOUBLE VAR_FLOAT VAR_DOUBLE VAR_CHAR CHAR".split(" "));
        this.appendValueInput("VAR").setCheck("Number INT NEGATIVE Variable VAR_INT VAR_UNINT DOUBLE VAR_FLOAT VAR_DOUBLE Aster Pointer PTR_INT PTR_UNINT PTR_FLOAT PTR_DOUBLE PTR_CHAR Macro VAR_CHAR CHAR Array".split(" "));
        this.setInputsInline(true);
        this.tag = Blockly.Msg.TAG_MATH_AUTO_CONVERT_TYPE;
        this.setTooltip(Blockly.Msg.MATH_AUTO_CONVERT_TYPE_TOOLTIP)
    },
    onchange: Blockly.Blocks.requireInFunction
};

// 2018/06/19 support Array operand
Blockly.Blocks.math_modulo = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootMath} math_modulo`);
        this.setColour(COLOUR_MATH_BLOCK);

        this.setOutput(true, "Number");
        this.interpolateMsg(Blockly.Msg.MATH_MODULO_TITLE, ["DIVIDEND", "Number INT NEGATIVE Variable VAR_INT VAR_UNINT DOUBLE VAR_DOUBLE VAR_FLOAT Aster VAR_CHAR CHAR Array".split(" "), Blockly.ALIGN_RIGHT], ["DIVISOR", "Number INT NEGATIVE Variable VAR_INT VAR_UNINT DOUBLE VAR_DOUBLE VAR_FLOAT Aster VAR_CHAR CHAR Array".split(" "), Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setInputsInline(!0);
        this.setTooltip(Blockly.Msg.MATH_MODULO_TOOLTIP);
        this.tag = Blockly.Msg.TAG_MATH_MODULO
    },
    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Arithmetics] increment expression block 
 */
Blockly.Blocks.math_increment_expression = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootMath} math_increment_expression`);
        this.setColour(COLOUR_MATH_BLOCK);

        this.interpolateMsg(Blockly.Msg.MATH_INCREMENT_EXPRESSION_TITLE, ["VAR", "Number INT NEGATIVE Variable VAR_INT VAR_UNINT DOUBLE VAR_DOUBLE VAR_FLOAT Aster Pointer PTR_INT PTR_UNINT PTR_FLOAT PTR_DOUBLE PTR_CHAR VAR_CHAR CHAR Array".split(" "), Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MATH_INCREMENT_EXPRESSION_TOOLTIP);
        this.tag = Blockly.Msg.TAG_MATH_INCREMENT_EXPRESSION
    },
    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Arithmetics] decrement expression block 
 */
Blockly.Blocks.math_decrement_expression = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootMath} math_decrement_expression`);
        this.setColour(COLOUR_MATH_BLOCK);
        this.interpolateMsg(Blockly.Msg.MATH_DECREMENT_EXPRESSION_TITLE, ["VAR", "Number INT NEGATIVE Variable VAR_INT VAR_UNINT DOUBLE VAR_DOUBLE VAR_FLOAT Aster Pointer PTR_INT PTR_UNINT PTR_FLOAT PTR_DOUBLE PTR_CHAR VAR_CHAR CHAR Array".split(" "), Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MATH_DECREMENT_EXPRESSION_TOOLTIP);
        this.tag = Blockly.Msg.TAG_MATH_DECREMENT_EXPRESSION
    },
    onchange: Blockly.Blocks.requireInFunction
};
Blockly.Blocks.math_prev_inc_decrement = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootMath} math_prev_inc_decrement`);
        this.setColour(COLOUR_MATH_BLOCK);
        const a = [
            [Blockly.Msg.MATH_INCREMENT_OP, "++"],
            [Blockly.Msg.MATH_DECREMENT_OP, "--"]
        ];
        this.setOutput(true, ["Number", "Pointer"]);
        this.appendValueInput("VAR").setCheck("Number INT NEGATIVE Variable VAR_INT VAR_UNINT DOUBLE VAR_FLOAT VAR_DOUBLE Aster Pointer PTR_INT PTR_UNINT PTR_FLOAT PTR_DOUBLE PTR_CHAR VAR_CHAR CHAR Array".split(" ")).appendField(new Blockly.FieldDropdown(a), "NEWOP");
        this.setInputsInline(true);
        this.tag = Blockly.Msg.TAG_MATH_PREV_INC_DECREMENT;
        this.setTooltip(Blockly.Msg.MATH_PREV_INC_DECREMENT_TOOLTIP)
    },
    onchange: Blockly.Blocks.requireInFunction
};
Blockly.Blocks.math_post_inc_decrement = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootMath} math_post_inc_decrement`);
        this.setColour(COLOUR_MATH_BLOCK);
        const a = [
            [Blockly.Msg.MATH_INCREMENT_OP, "++"],
            [Blockly.Msg.MATH_DECREMENT_OP, "--"]
        ];
        this.setOutput(true, ["Number", "Pointer"]);
        this.appendValueInput("VAR").setCheck("Number INT NEGATIVE Variable VAR_INT VAR_UNINT DOUBLE VAR_FLOAT VAR_DOUBLE Aster Pointer PTR_INT PTR_UNINT PTR_FLOAT PTR_DOUBLE PTR_CHAR VAR_CHAR CHAR Array".split(" "));
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(a), "NEWOP");
        this.setInputsInline(true);
        this.tag = Blockly.Msg.TAG_MATH_POST_INC_DECREMENT;
        this.setTooltip(Blockly.Msg.MATH_POST_INC_DECREMENT_TOOLTIP)
    },
    onchange: Blockly.Blocks.requireInFunction
};
