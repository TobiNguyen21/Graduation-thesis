Blockly.cake.math = {};

Blockly.cake.math_number = function (block) {
  const numFieldValue = block.getFieldValue("NUM");
  const num = parseFloat(numFieldValue);
  const order = Blockly.cake.ORDER_ATOMIC;
  return numFieldValue.endsWith(".0") ? [num + ".0", order] : [num, order];
};
