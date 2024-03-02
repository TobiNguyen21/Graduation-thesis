Blockly.cake.math = {};
// Blockly.cake.math_number=function(a){return[parseFloat(a.getFieldValue("NUM")),Blockly.cake.ORDER_ATOMIC]};
Blockly.cake.math_number = function (a) {
    var b = parseFloat(a.getFieldValue("NUM"));
    return a.getFieldValue("NUM").endsWith(".0") ? [b + ".0", Blockly.cake.ORDER_ATOMIC] : [b, Blockly.cake.ORDER_ATOMIC]
};