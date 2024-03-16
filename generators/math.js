Blockly.c_language.math = {};

Blockly.c_language.math_number = function (block) {
  const numFieldValue = block.getFieldValue("NUM");
  const num = parseFloat(numFieldValue);
  const order = Blockly.c_language.ORDER_ATOMIC;
  return numFieldValue.endsWith(".0") ? [num + ".0", order] : [num, order];
};
