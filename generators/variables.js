Blockly.cake.variables = {};

Blockly.cake.define_get = function (block) {
  const varName = Blockly.cake.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
  const sanitizedVarName = Blockly.Blocks.checkUnselect(varName);
  return [sanitizedVarName, Blockly.cake.ORDER_ATOMIC];
};

Blockly.cake.define_declare = function (block) {
  const valueCode = Blockly.cake.valueToCode(block, "VALUE", Blockly.cake.ORDER_ASSIGNMENT) || "0";
  const varName = Blockly.cake.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
  if (Blockly.Blocks.checkLegalName(Blockly.Msg.VARIABLES_ILLEGALNAME, varName) === -1) {
    this.initVar();
  }
  const defineCode = Blockly.cake.scrub_(block, "#define " + varName + " " + valueCode);
  Blockly.cake.definitions_["define_" + varName] = defineCode;
  return null;
};

Blockly.cake.variables_get = function (block) {
  const varName = Blockly.cake.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
  const sanitizedVarName = Blockly.Blocks.checkUnselect(varName);
  return [sanitizedVarName, Blockly.cake.ORDER_ATOMIC];
};

Blockly.cake.variables_set = function (block) {
  const valueCode = Blockly.cake.valueToCode(block, "VALUE", Blockly.cake.ORDER_ASSIGNMENT) || "0";
  const varName = Blockly.cake.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
  const sanitizedVarName = Blockly.Blocks.checkUnselect(varName);
  return sanitizedVarName + " = " + valueCode + ";\n";
};

Blockly.cake.variables_declare = function (block) {
  const valueCode = Blockly.cake.valueToCode(block, "VALUE", Blockly.cake.ORDER_ASSIGNMENT) || "0";
  const varName = Blockly.cake.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
  const varType = block.getFieldValue("TYPES");
  if (Blockly.Blocks.checkLegalName(Blockly.Msg.VARIABLES_ILLEGALNAME, varName) === -1) {
    this.initVar();
  }
  let declarationCode = varType + " " + varName + " = " + valueCode + ";\n";
  if (varType === "float") {
    if (valueCode === "0") {
      declarationCode = "0.0f;\n";
    } else if (valueCode.includes(".")) {
      declarationCode += "f";
    }
  } else if (varType === "double" && valueCode === "0") {
    declarationCode = "0.0;\n";
  }
  return declarationCode;
};
