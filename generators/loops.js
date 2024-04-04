Blockly.c_language.loops = {};

Blockly.c_language.controls_whileUntil = function (block) {
    const isUntil = "UNTIL" == block.getFieldValue("MODE");
    let condition = Blockly.c_language.valueToCode(block, "BOOL", isUntil ? Blockly.c_language.ORDER_LOGICAL_NOT : Blockly.c_language.ORDER_NONE) || "0";
    let body = Blockly.c_language.statementToCode(block, "DO");
    body = Blockly.c_language.addLoopTrap(body, block.id);
    if (isUntil) {
        condition = "!" + condition;
    }
    return "while (" + condition + ") {\n" + body + "}\n";
};

Blockly.c_language.controls_doWhile = function (block) {
    const isUntil = "UNTIL" == block.getFieldValue("MODE");
    let condition = Blockly.c_language.valueToCode(block, "BOOL", isUntil ? Blockly.c_language.ORDER_LOGICAL_NOT : Blockly.c_language.ORDER_NONE) || "0";
    let body = Blockly.c_language.statementToCode(block, "DO");
    body = Blockly.c_language.addLoopTrap(body, block.id);
    if (isUntil) {
        condition = "!" + condition;
    }
    return "do {\n" + body + "} while (" + condition + ");\n";
};

Blockly.c_language.controls_for = function (block) {
    let variable = Blockly.c_language.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
    if (variable == "___EC_84_A0_ED_83_9D__" || variable == "--Select--" || variable == "-Item-") {
        variable = "unselected";
    }
    const from = Blockly.c_language.valueToCode(block, "FROM", Blockly.c_language.ORDER_ASSIGNMENT) || "0";
    const to = Blockly.c_language.valueToCode(block, "TO", Blockly.c_language.ORDER_ASSIGNMENT) || "0";
    let by = Blockly.c_language.valueToCode(block, "BY", Blockly.c_language.ORDER_ASSIGNMENT) || "1";
    let body = Blockly.c_language.statementToCode(block, "DO");
    body = Blockly.c_language.addLoopTrap(body, block.id);
    let loopSyntax = "for (" + variable + "=" + from + "; " + variable;
    const isAscending = "TRUE" == block.getFieldValue("ORDER");
    if (isAscending) {
        loopSyntax += "<" + to + "; " + variable;
    } else {
        loopSyntax += ">" + to + "; " + variable;
    }
    if (Blockly.isNumber(by)) {
        by = Math.abs(parseFloat(by));
        if (by != 1) {
            loopSyntax += (isAscending ? "+=" : "-=") + by;
        } else {
            loopSyntax += (isAscending ? "++" : "--");
        }
    } else {
        loopSyntax += (isAscending ? "+=" : "-=") + by;
    }
    return loopSyntax + ") {\n" + body + "}\n";
};

Blockly.c_language.controls_flow_statements = function (block) {
    switch (block.getFieldValue("FLOW")) {
        case "BREAK":
            return "break;\n";
        case "CONTINUE":
            return "continue;\n";
    }
    throw "Unknown flow statement.";
};

Blockly.c_language.library_stdlib_sizeof = function (block) {
    Blockly.c_language.definitions_.include_c_language_stdlib = "#include <stdlib.h>";
    return ["sizeof(" + (Blockly.c_language.valueToCode(block, "VAR", Blockly.c_language.ORDER_NONE) || "0") + ")", Blockly.c_language.ORDER_NONE]
};
