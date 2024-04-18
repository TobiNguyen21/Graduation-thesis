const rootString = "[blocks][string]";
const COLOUR_STRING_BLOCK = 300;

Blockly.Blocks.string = {};
Blockly.Blocks.library_string_strlen = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootString} library_string_strlen`);
        this.setColour(COLOUR_STRING_BLOCK);
        this.setOutput(true, "Number");
        this.interpolateMsg(Blockly.Msg.STRING_STRLEN_TITLE, ["VAR", ["String", "STR", "PTR_CHAR", "Pointer", "DBPTR_CHAR"], Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.STRING_STRLEN_TOOLTIP);
        this.tag = Blockly.Msg.TAG_STRING_STRLEN
    },
    onchange: Blockly.Blocks.requireInFunction
};
Blockly.Blocks.library_string_strcat = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootString} library_string_strcat`);
        this.setColour(COLOUR_STRING_BLOCK);
        this.interpolateMsg(Blockly.Msg.STRING_STRCAT_TITLE, ["STR1", ["String", "STR", "PTR_CHAR", "Pointer", "DBPTR_CHAR"], Blockly.ALIGN_RIGHT], ["STR2", ["String", "STR", "PTR_CHAR", "Pointer", "DBPTR_CHAR"], Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.STRING_STRCAT_TOOLTIP);
        this.tag = Blockly.Msg.TAG_STRING_STRCAT
    },
    onchange: Blockly.Blocks.requireInFunction
};
Blockly.Blocks.library_string_strcpy = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootString} library_string_strcpy`);
        this.setColour(COLOUR_STRING_BLOCK);
        this.interpolateMsg(Blockly.Msg.STRING_STRCPY_TITLE, ["STR1", ["String", "STR", "PTR_CHAR", "Pointer", "DBPTR_CHAR"], Blockly.ALIGN_RIGHT], ["STR2", ["String", "STR", "PTR_CHAR", "Pointer", "DBPTR_CHAR"], Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.STRING_STRCPY_TOOLTIP);
        this.tag = Blockly.Msg.TAG_STRING_STRCPY
    },
    onchange: Blockly.Blocks.requireInFunction
};
Blockly.Blocks.library_string_strcmp = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootString} library_string_strcmp`);
        this.setColour(COLOUR_STRING_BLOCK);
        this.setOutput(true, "Number");
        this.interpolateMsg(Blockly.Msg.STRING_STRCMP_TITLE, ["STR1", ["String", "STR", "PTR_CHAR", "Pointer", "DBPTR_CHAR"], Blockly.ALIGN_RIGHT], ["STR2", ["String", "STR", "PTR_CHAR", "Pointer", "DBPTR_CHAR"], Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.STRING_STRCMP_TOOLTIP);
        this.tag = Blockly.Msg.TAG_STRING_STRCMP
    },
    onchange: Blockly.Blocks.requireInFunction
};
