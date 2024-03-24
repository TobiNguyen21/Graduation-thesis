Blockly.logic = {};

Blockly.c_language.logic_compare = function (block) {
    const operator = {
        EQ: "==",
        NEQ: "!=",
        LT: "<",
        LTE: "<=",
        GT: ">",
        GTE: ">="
    }[block.getFieldValue("OP")];
    const order = operator === "==" || operator === "!=" ? Blockly.c_language.ORDER_EQUALITY : Blockly.c_language.ORDER_RELATIONAL;
    const valueA = Blockly.c_language.valueToCode(block, "A", order) || "0";
    const valueB = Blockly.c_language.valueToCode(block, "B", order) || "0";
    return [valueA + " " + operator + " " + valueB, order];
};

Blockly.c_language.logic_operation = function (block) {
    const operator = block.getFieldValue("OP") === "AND" ? "&&" : "||";
    const order = operator === "&&" ? Blockly.c_language.ORDER_LOGICAL_AND : Blockly.c_language.ORDER_LOGICAL_OR;
    let valueA = Blockly.c_language.valueToCode(block, "A", order) || "0";
    let valueB = Blockly.c_language.valueToCode(block, "B", order) || "0";
    if (!valueA && !valueB) {
        valueA = operator === "&&" ? "1" : "0";
        valueB = valueA;
    } else {
        valueA = valueA || (operator === "&&" ? "1" : "0");
        valueB = valueB || (operator === "&&" ? "1" : "0");
    }
    return [valueA + " " + operator + " " + valueB, order];
};

Blockly.c_language.logic_negate = function (block) {
    const order = Blockly.c_language.ORDER_LOGICAL_NOT;
    const boolCode = Blockly.c_language.valueToCode(block, "BOOL", order) || "1";
    return ["!" + boolCode, order];
};

Blockly.c_language.logic_boolean = function (block) {
    const value = block.getFieldValue("BOOL") === "TRUE" ? "1" : "0";
    return [value, Blockly.c_language.ORDER_ATOMIC];
};

Blockly.c_language.logic_null = function (block) {
    return ["NULL", Blockly.c_language.ORDER_ATOMIC];
};
