Blockly.cake.variables = {};
Blockly.cake.define_get = function (a) {
    a = Blockly.cake.variableDB_.getName(a.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
    a = Blockly.Blocks.checkUnselect(a);
    return [a, Blockly.cake.ORDER_ATOMIC]
};
Blockly.cake.define_declare = function (a) {
    var b = Blockly.cake.valueToCode(a, "VALUE", Blockly.cake.ORDER_ASSIGNMENT) || "0",
        c = Blockly.cake.variableDB_.getName(a.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE); - 1 == Blockly.Blocks.checkLegalName(Blockly.Msg.VARIABLES_ILLEGALNAME, c) && this.initVar();
    a = Blockly.cake.scrub_(a, "#define " + c + " " + b);
    Blockly.cake.definitions_["define_" + c] = a;
    return null
};
Blockly.cake.variables_get = function (a) {
    a = Blockly.cake.variableDB_.getName(a.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
    a = Blockly.Blocks.checkUnselect(a);
    return [a, Blockly.cake.ORDER_ATOMIC]
};
Blockly.cake.variables_set = function (a) {
    var b = Blockly.cake.valueToCode(a, "VALUE", Blockly.cake.ORDER_ASSIGNMENT) || "0";
    a = Blockly.cake.variableDB_.getName(a.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
    a = Blockly.Blocks.checkUnselect(a);
    return a + " = " + b + ";\n"
};
Blockly.cake.variables_declare = function (a) {
    var b = Blockly.cake.valueToCode(a, "VALUE", Blockly.cake.ORDER_ASSIGNMENT) || "0",
        c = Blockly.cake.variableDB_.getName(a.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
    a = a.getFieldValue("TYPES"); - 1 == Blockly.Blocks.checkLegalName(Blockly.Msg.VARIABLES_ILLEGALNAME, c) && this.initVar();
    "float" == a ? "0" == b ? b = "0.0f" : -1 != b.indexOf(".") && (b += "f") : "double" == a && "0" == b && (b = "0.0");
    return a + " " + c + " = " + b + ";\n"
};