Blockly.c_language.stdlib = {};

Blockly.c_language.library_stdlib_abs = function (a) {
    let varCode = Blockly.c_language.valueToCode(a, "VAR", Blockly.c_language.ORDER_NONE) || "''";
    Blockly.c_language.definitions_.include_c_language_stdlib = "#include <stdlib.h>";
    return ["abs(" + varCode + ")", Blockly.c_language.ORDER_NONE];
};

Blockly.c_language.library_stdlib_convert = function (block) {
    const operator = block.getFieldValue("OPERATORS");
    const valueCode = Blockly.c_language.valueToCode(block, "VAR", Blockly.c_language.ORDER_NONE) || '""';

    let result;
    switch (operator) {
        case "INT":
            result = "atoi(" + valueCode + ")";
            break;
        case "DOUBLE":
            result = "atof(" + valueCode + ")";
            break;
        default:
            throw new Error("Unknown math operator: " + operator);
    }

    Blockly.c_language.definitions_.include_c_language_stdlib = "#include <stdlib.h>";
    return [result, Blockly.c_language.ORDER_NONE];
};

Blockly.c_language.library_stdlib_rand = function (block) {
    const valueCode = Blockly.c_language.valueToCode(block, "VAR", Blockly.c_language.ORDER_NONE) || "0";
    Blockly.c_language.definitions_.include_c_language_stdlib = "#include <stdlib.h>";
    Blockly.c_language.definitions_.include_c_language_time = "#include <time.h>";
    const result = (valueCode === "0") ? "rand()" : "rand()" + valueCode;
    Blockly.c_language.getUpperLine(block);
    return [result, Blockly.c_language.ORDER_NONE];
};

Blockly.c_language.getUpperLine = function (block) {
    const scope = block.getScope();
    Blockly.c_language.times_.c_language_time_srand = [scope, "\nsrand(time(NULL));"];
};

Blockly.c_language.library_stdlib_rand_scope = function (block) {
    const valueA = Blockly.c_language.valueToCode(block, "A", Blockly.c_language.ORDER_NONE) || "0";
    const valueB = Blockly.c_language.valueToCode(block, "B", Blockly.c_language.ORDER_NONE) || "0";
    const result = (valueA === "1") ? " % " + valueB + " + " + valueA : " % (" + valueB + "-" + valueA + "+1) + " + valueA;
    return [result, Blockly.c_language.ORDER_NONE];
};

Blockly.c_language.library_stdlib_number_forRandScope1 = function (block) {
    return [parseFloat(block.getFieldValue("NUM")), Blockly.c_language.ORDER_ATOMIC];
};

Blockly.c_language.library_stdlib_number_forRandScope100 = function (block) {
    return [parseFloat(block.getFieldValue("NUM")), Blockly.c_language.ORDER_ATOMIC];
};
Blockly.c_language.library_stdlib_malloc = function (block) {
    const pointerType = Blockly.FieldDropdown.prototype.getParentType(block, "variables_pointer");
    const valueCode = Blockly.c_language.valueToCode(block, "VAR", Blockly.c_language.ORDER_NONE) || "0";
    Blockly.c_language.definitions_.include_c_language_stdlib = "#include <stdlib.h>";
    return ["(" + pointerType + " *)malloc(" + valueCode + ")", Blockly.c_language.ORDER_NONE];
};

Blockly.c_language.library_stdlib_sizeof_forMalloc = function (block) {
    const valueCode = Blockly.c_language.valueToCode(block, "VAR", Blockly.c_language.ORDER_NONE) || "0";
    return ["sizeof(" + valueCode + ")", Blockly.c_language.ORDER_NONE];
};

Blockly.c_language.library_stdlib_arithmetic_forMalloc = function (block) {
    const valueA = Blockly.c_language.valueToCode(block, "A", Blockly.c_language.ORDER_NONE) || "0";
    const valueB = Blockly.c_language.valueToCode(block, "B", Blockly.c_language.ORDER_NONE) || "0";
    return [valueA + " * " + valueB, Blockly.c_language.ORDER_NONE];
};

Blockly.c_language.library_stdlib_number_forMalloc = function (block) {
    return [parseFloat(block.getFieldValue("NUM")), Blockly.c_language.ORDER_ATOMIC];
};

Blockly.c_language.library_stdlib_free = function (block) {
    const valueCode = Blockly.c_language.valueToCode(block, "VAR", Blockly.c_language.ORDER_NONE) || "0";
    Blockly.c_language.definitions_.include_c_language_stdlib = "#include <stdlib.h>";
    return "free(" + valueCode + ");\n";
};

Blockly.c_language.library_stdlib_exit = function (block) {
    let operator = block.getFieldValue("OPERATORS");
    let result;
    switch (operator) {
        case "SUCCESS":
            result = "exit(0);\n";
            break;
        case "FAILURE":
            result = "exit(1);\n";
            break;
        default:
            throw "Unknown math operator: " + operator;
    }
    Blockly.c_language.definitions_.include_c_language_stdlib = "#include <stdlib.h>";
    return result;
};
