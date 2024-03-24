Blockly.c_language.variables = {};

Blockly.c_language.define_get = function (block) {
  const varName = Blockly.c_language.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
  const sanitizedVarName = Blockly.Blocks.checkUnselect(varName);
  return [sanitizedVarName, Blockly.c_language.ORDER_ATOMIC];
};

Blockly.c_language.define_declare = function (block) {
  const valueCode = Blockly.c_language.valueToCode(block, "VALUE", Blockly.c_language.ORDER_ASSIGNMENT) || "0";
  const varName = Blockly.c_language.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
  if (Blockly.Blocks.checkLegalName(Blockly.Msg.VARIABLES_ILLEGALNAME, varName) === -1) {
    this.initVar();
  }
  const defineCode = Blockly.c_language.scrub_(block, "#define " + varName + " " + valueCode);
  Blockly.c_language.definitions_["define_" + varName] = defineCode;
  return null;
};

Blockly.c_language.variables_get = function (block) {
  const varName = Blockly.c_language.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
  const sanitizedVarName = Blockly.Blocks.checkUnselect(varName);
  return [sanitizedVarName, Blockly.c_language.ORDER_ATOMIC];
};

Blockly.c_language.variables_set = function (block) {
  const valueCode = Blockly.c_language.valueToCode(block, "VALUE", Blockly.c_language.ORDER_ASSIGNMENT) || "0";
  const varName = Blockly.c_language.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
  const sanitizedVarName = Blockly.Blocks.checkUnselect(varName);
  return sanitizedVarName + " = " + valueCode + ";\n";
};

Blockly.c_language.variables_declare = function (block) {
  const valueCode = Blockly.c_language.valueToCode(block, "VALUE", Blockly.c_language.ORDER_ASSIGNMENT) || "0";
  const varName = Blockly.c_language.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
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

// -------------Pointer----------------
Blockly.c_language.variables_pointer_get = function (block) {
  const varName = Blockly.c_language.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
  return [varName, Blockly.c_language.ORDER_ATOMIC];
};

Blockly.c_language.variables_pointer_set = function (block) {
  const value = Blockly.c_language.valueToCode(block, "VALUE", Blockly.c_language.ORDER_ASSIGNMENT) || "NULL";
  let varName = Blockly.c_language.valueToCode(block, "VAR", Blockly.c_language.ORDER_ASSIGNMENT);
  varName = Blockly.Blocks.checkUnselect(varName);
  return varName + " = " + value + ";\n";
};

Blockly.c_language.variables_pointer_declare = function (block) {
  const value = Blockly.c_language.valueToCode(block, "VALUE", Blockly.c_language.ORDER_ASSIGNMENT) || "NULL";
  const varName = Blockly.c_language.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
  const type = block.getFieldValue("TYPES");
  const iteration = block.getFieldValue("ITERATION");

  if (iteration === "*" || iteration === "**" || iteration === "***") {
    return type + " " + iteration + varName + " = " + value + ";\n";
  } else {
    window.alert("Please confirm asterisk. It must be among *, **, or ***.");
    return 0;
  }
};

Blockly.c_language["variables_pointer_&"] = function (block) {
  const value = "&" + Blockly.c_language.valueToCode(block, "VALUE", Blockly.c_language.ORDER_ASSIGNMENT);
  return [value, Blockly.c_language.ORDER_ATOMIC];
};

Blockly.c_language["variables_pointer_*"] = function (block) {
  const value = "*" + Blockly.c_language.valueToCode(block, "VALUE", Blockly.c_language.ORDER_ASSIGNMENT);
  return [value, Blockly.c_language.ORDER_ATOMIC];
};
