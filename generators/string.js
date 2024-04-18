Blockly.c_language.string = {};

Blockly.c_language.library_string_strlen = function (block) {
    const varCode = Blockly.c_language.valueToCode(block, "VAR", Blockly.c_language.ORDER_NONE) || '""';
    Blockly.c_language.definitions_.include_c_language_string = "#include <string.h>";
    return ["strlen(" + varCode + ")", Blockly.c_language.ORDER_NONE];
};

Blockly.c_language.library_string_strcat = function (block) {
    const str1 = Blockly.c_language.valueToCode(block, "STR1", Blockly.c_language.ORDER_NONE) || '""';
    const str2 = Blockly.c_language.valueToCode(block, "STR2", Blockly.c_language.ORDER_NONE) || '""';
    Blockly.c_language.definitions_.include_c_language_string = "#include <string.h>";
    return "strcat(" + str1 + ", " + str2 + ");\n";
};

Blockly.c_language.library_string_strcpy = function (block) {
    const str1 = Blockly.c_language.valueToCode(block, "STR1", Blockly.c_language.ORDER_NONE) || '""';
    const str2 = Blockly.c_language.valueToCode(block, "STR2", Blockly.c_language.ORDER_NONE) || '""';
    Blockly.c_language.definitions_.include_c_language_string = "#include <string.h>";
    return "strcpy(" + str2 + ", " + str1 + ");\n";
};

Blockly.c_language.library_string_strcmp = function (block) {
    const str1 = Blockly.c_language.valueToCode(block, "STR1", Blockly.c_language.ORDER_NONE) || '""';
    const str2 = Blockly.c_language.valueToCode(block, "STR2", Blockly.c_language.ORDER_NONE) || '""';
    Blockly.c_language.definitions_.include_c_language_string = "#include <string.h>";
    return ["strcmp(" + str1 + ", " + str2 + ")", Blockly.c_language.ORDER_NONE];
};
