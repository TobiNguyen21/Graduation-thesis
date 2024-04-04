Blockly.c_language.math = {};

Blockly.c_language.math_number = function (block) {
  const numFieldValue = block.getFieldValue("NUM");
  const num = parseFloat(numFieldValue);
  const order = Blockly.c_language.ORDER_ATOMIC;
  return numFieldValue.endsWith(".0") ? [num + ".0", order] : [num, order];
};

Blockly.c_language.math_arithmetic = function (block) {
  const operators = {
      ADD: [" + ", Blockly.c_language.ORDER_ADDITION],
      MINUS: [" - ", Blockly.c_language.ORDER_SUBTRACTION],
      MULTIPLY: [" * ", Blockly.c_language.ORDER_MULTIPLICATION],
      DIVIDE: [" / ", Blockly.c_language.ORDER_DIVISION]
  };

  const operator = operators[block.getFieldValue("OP")];
  const operatorString = operator[0];
  const order = operator[1];

  const valueA = Blockly.c_language.valueToCode(block, "A", order) || "0";
  const valueB = Blockly.c_language.valueToCode(block, "B", order) || "0";

  return ["(" + valueA + operatorString + valueB + ")", order];
};

Blockly.c_language.math_convert_type = function (block) {
  const newType = block.getFieldValue("NEWTYPE");
  const varValue = Blockly.c_language.valueToCode(block, "VAR", Blockly.c_language.ORDER_NONE) || "0";

  return [`(${newType})${varValue}`, Blockly.c_language.ORDER_ATOMIC];
};

Blockly.c_language.math_auto_convert_type = function (block) {
  const varValue = Blockly.c_language.valueToCode(block, "VAR", Blockly.c_language.ORDER_NONE) || "0";

  return [varValue, Blockly.c_language.ORDER_ATOMIC];
};

// devide get remainder
Blockly.c_language.math_modulo = function (block) {
  const dividend = Blockly.c_language.valueToCode(block, "DIVIDEND", Blockly.c_language.ORDER_MODULUS) || "0";
  const divisor = Blockly.c_language.valueToCode(block, "DIVISOR", Blockly.c_language.ORDER_MODULUS) || "0";

  return [`${dividend} % ${divisor}`, Blockly.c_language.ORDER_MODULUS];
};

Blockly.c_language.math_increment_expression = function (block) {
  const varValue = Blockly.c_language.valueToCode(block, "VAR", Blockly.c_language.ORDER_NONE) || "0";

  return `${varValue}++;\n`;
};

Blockly.c_language.math_decrement_expression = function (block) {
  const varValue = Blockly.c_language.valueToCode(block, "VAR", Blockly.c_language.ORDER_NONE) || "0";

  return `${varValue}--;\n`;
};

Blockly.c_language.math_prev_inc_decrement = function (block) {
  const newOp = block.getFieldValue("NEWOP");
  const varValue = Blockly.c_language.valueToCode(block, "VAR", Blockly.c_language.ORDER_NONE) || "0";

  return [newOp + varValue, Blockly.c_language.ORDER_INCREMENT];
};

Blockly.c_language.math_post_inc_decrement = function (block) {
  const newOp = block.getFieldValue("NEWOP");
  const varValue = Blockly.c_language.valueToCode(block, "VAR", Blockly.c_language.ORDER_NONE) || "0";

  return [varValue + newOp, Blockly.c_language.ORDER_INCREMENT];
};
