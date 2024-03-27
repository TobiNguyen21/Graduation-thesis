Blockly.c_language.controls_if = function (a) {
    let code = '';
    for (let i = 0; i <= a.elseifCount_; i++) {
        const condition = Blockly.c_language.valueToCode(a, "IF" + i, Blockly.c_language.ORDER_NONE) || "0";
        const statement = Blockly.c_language.statementToCode(a, "DO" + i);
        code += (i === 0 ? "if" : "else if") + " (" + condition + ") {\n" + statement + "}\n";
    }
    if (a.elseCount_) {
        const elseStatement = Blockly.c_language.statementToCode(a, "ELSE");
        code += "else {\n" + elseStatement + "}\n";
    }
    return code;
};

Blockly.c_language.controls_switch = function (a) {
    let code = '';
    for (let i = 0; i <= a.caseCount_; i++) {
        const switchValue = Blockly.c_language.valueToCode(a, "SWITCH", Blockly.c_language.ORDER_NONE) || "0";
        const caseValue = Blockly.c_language.valueToCode(a, "CASE" + i, Blockly.c_language.ORDER_NONE) || i;
        const caseStatement = Blockly.c_language.statementToCode(a, "DO" + i);
        if (i === 0) {
            code += "switch (" + switchValue + ") {\n";
            code += "default :\n" + Blockly.c_language.statementToCode(a, "DEFAULT") + "\n";
        }
        code += "case " + caseValue + " :\n" + caseStatement;
    }
    return code + "}\n";
};

Blockly.c_language.controls_switch_break = function (a) {
    return "break;\n";
};
