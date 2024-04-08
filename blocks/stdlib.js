const rootStdlib = "[blocks][stdlib]";
const COLOUR_STDLIB_BLOCK = 280;

Blockly.Blocks.stdlib = {};

/**
 * [Toolbox][Library][stdlib] absolute block
 */
Blockly.Blocks.library_stdlib_abs = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootStdlib} library_stdlib_abs`);
        this.setColour(COLOUR_STDLIB_BLOCK);
        this.setOutput(true, "Number");
        this.interpolateMsg(Blockly.Msg.MATH_ABS_TITLE, ["VAR", "Number INT NEGATIVE Variable VAR_INT VAR_UNINT Aster".split(" "), Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MATH_SINGLE_TOOLTIP_ABS);
        this.tag = Blockly.Msg.TAG_MATH_ABS
    },
    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Library][stdlib] convert block
 */
Blockly.Blocks.library_stdlib_convert = {
    init: function () {
        const a = [
            [Blockly.Msg.STDLIB_CONVERT_INT, "INT"],
            [Blockly.Msg.STDLIB_CONVERT_DOUBLE, "DOUBLE"]
        ];
        if (LOG_NAME_BLOCK) console.log(`${rootStdlib} library_stdlib_convert`);
        this.setColour(COLOUR_STDLIB_BLOCK);
        this.setOutput(true, "Number");
        this.interpolateMsg(Blockly.Msg.STDLIB_CONVERT_TITLE, ["VAR", ["Variable", "Pointer", "VAR_CHAR", "String", "CHAR"], Blockly.ALIGN_RIGHT], ["OPERATORS", new Blockly.FieldDropdown(a)], Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.STDLIB_CONVERT_HELPURL);
        this.tag = Blockly.Msg.TAG_STDLIB_CONVERT
    },
    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Library][stdlib] random number block
 */
Blockly.Blocks.library_stdlib_rand = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootStdlib} library_stdlib_rand`);
        this.setColour(COLOUR_STDLIB_BLOCK)
        this.setOutput(true);
        this.interpolateMsg(Blockly.Msg.STDLIB_RAND_TITLE, ["VAR", "SCOPE", Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.STDLIB_RAND_TOOLTIP);
        this.tag = Blockly.Msg.TAG_STDLIB_RAND;
    },
    getScope: function () {
        let block = this;
        while (block.getSurroundParent()) {
            if (block.getSurroundParent()) {
                block = block.getSurroundParent();
            } else {
                break;
            }
        }
        if (block) {
            if (block.type === "main_block") {
                return block.type;
            } else if (block.type === "procedures_defnoreturn" || block.type === "procedures_defreturn") {
                return block.getName();
            }
        }
        return null;
    },
    onchange: Blockly.Blocks.requireInFunction
};
Blockly.Blocks.library_stdlib_rand_scope = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootStdlib} library_stdlib_rand_scope`);
        this.setColour(COLOUR_STDLIB_BLOCK)
        this.setOutput(true, "SCOPE");
        this.interpolateMsg(Blockly.Msg.STDLIB_RANDSCOPE_TITLE, ["A", ["Number", "INT", "Variable", "VAR_INT", "VAR_UNINT"], Blockly.ALIGN_RIGHT], ["B", ["Number", "INT", "Variable", "VAR_INT", "VAR_UNINT"], Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.STDLIB_RAND_TOOLTIP)
    },
    onchange: Blockly.Blocks.requireInFunction
};
Blockly.Blocks.library_stdlib_number_forRandScope1 = {
    init: function () {
        this.setColour(240);
        this.appendDummyInput().appendField(new Blockly.FieldTextInput("1", Blockly.FieldTextInput.numberValidator), "NUM");
        this.setOutput(true, "Number");
        this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP)
    },
    onchange: Blockly.Blocks.requireInFunction
};
Blockly.Blocks.library_stdlib_number_forRandScope100 = {
    init: function () {
        this.setColour(240);
        this.appendDummyInput().appendField(new Blockly.FieldTextInput("100", Blockly.FieldTextInput.numberValidator), "NUM");
        this.setOutput(true, "Number");
        this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP)
    },
    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Library][stdlib] malloc block
 */
Blockly.Blocks.library_stdlib_malloc = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootStdlib} library_stdlib_malloc`);
        this.setColour(COLOUR_STDLIB_BLOCK)
        this.setOutput(true, "Pointer");
        this.interpolateMsg(Blockly.Msg.STDLIB_MALLOC_TITLE, ["VAR", null, Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.STDLIB_MALLOC_TOOLTIP);
        this.tag = Blockly.Msg.TAG_STDLIB_MALLOC
    },
    onchange: Blockly.Blocks.requireInFunction
};
Blockly.Blocks.library_stdlib_sizeof_forMalloc = {
    init: function () {
        this.setColour(200);
        this.setOutput(true, "Number");
        this.interpolateMsg(Blockly.Msg.STDLIB_SIZEOFFORMALLOC_TITLE, ["VAR", null, Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.STDLIB_SIZEOFFORMALLOC_TOOLTIP)
    },
    onchange: Blockly.Blocks.requireInFunction
};
Blockly.Blocks.library_stdlib_arithmetic_forMalloc = {
    init: function () {
        this.setColour(240);
        this.setOutput(true, "Number");
        this.interpolateMsg(Blockly.Msg.STDLIB_ARITHFORMALLOC_TITLE, ["A", null, Blockly.ALIGN_RIGHT], ["B", "Number", Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY);
        this.tag = Blockly.Msg.TAG_STDLIB_SIZEOF
    },
    onchange: Blockly.Blocks.requireInFunction
};
Blockly.Blocks.library_stdlib_number_forMalloc = {
    init: function () {
        this.setColour(240);
        this.appendDummyInput().appendField(new Blockly.FieldTextInput("1", Blockly.FieldTextInput.numberValidator), "NUM");
        this.setOutput(true, "Number");
        this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP)
    },
    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Library][stdlib] free block: release memory from the heap
 */
Blockly.Blocks.library_stdlib_free = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootStdlib} library_stdlib_free`);
        this.setColour(COLOUR_STDLIB_BLOCK)
        this.interpolateMsg(Blockly.Msg.STDLIB_FREE_TITLE, ["VAR", "Pointer PTR_INT PTR_UNINT PTR_FLOAT PTR_DOUBLE PTR_CHAR DBPTR_INT DBPTR_UNINT DBPTR_FLOAT DBPTR_DOUBLE DBPTR_CHAR".split(" "), Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.STDLIB_FREE_TOOLTIP);
        this.tag = Blockly.Msg.TAG_STDLIB_FREE
    },
    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Library][stdlib] exit block: terminate program execution
 */
Blockly.Blocks.library_stdlib_exit = {
    init: function () {
        const a = [
            [Blockly.Msg.STDLIB_EXIT_SUCCESS, "SUCCESS"],
            [Blockly.Msg.STDLIB_EXIT_FAILURE, "FAILURE"]
        ];
        if (LOG_NAME_BLOCK) console.log(`${rootStdlib} library_stdlib_exit`);
        this.setColour(COLOUR_STDLIB_BLOCK)
        this.interpolateMsg(Blockly.Msg.STDLIB_EXIT_TITLE, ["OPERATORS", new Blockly.FieldDropdown(a)], Blockly.ALIGN_RIGHT);
        this.setPreviousStatement(true);
        this.setTooltip(Blockly.Msg.STDLIB_EXIT_HELPURL);
        this.tag = Blockly.Msg.TAG_STDLIB_EXIT
    },
    onchange: Blockly.Blocks.requireInFunction
};
