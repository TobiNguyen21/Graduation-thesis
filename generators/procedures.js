Blockly.cake.procedures = {};

/**
 * 
 * @param {*} c 
 * @returns 
 */
Blockly.cake.main_block = function (c) {
    // Generate code for blocks inside the "STACK" input
    var blockCode = Blockly.cake.statementToCode(c, "STACK");

    // Add statement prefix if defined
    if (Blockly.cake.STATEMENT_PREFIX) {
        blockCode = Blockly.cake.prefixLines(
            Blockly.cake.STATEMENT_PREFIX.replace(/%1/g, "'" + c.id + "'"),
            Blockly.cake.INDENT
        ) + blockCode;
    }

    // Add infinite loop trap if defined
    if (Blockly.cake.INFINITE_LOOP_TRAP) {
        blockCode = Blockly.cake.INFINITE_LOOP_TRAP.replace(/%1/g, "'" + c.id + "'") + blockCode;
    }

    // Generate code for the return value or default to 0 if not specified
    var returnValue = Blockly.cake.valueToCode(c, "RETURN", Blockly.cake.ORDER_NONE) || "";
    returnValue = returnValue ? "  return " + returnValue + ";\n" : "  return 0;\n";

    // Generate code for function arguments, types, and declarations
    var argumentsCode = [];
    var typesCode = [];
    var declarationsCode = [];
    for (var a = 0; a < c.arguments_.length; a++) {
        argumentsCode[a] = Blockly.cake.variableDB_.getName(c.arguments_[a], Blockly.Variables.NAME_TYPE);
        typesCode[a] = c.types_[a];
        declarationsCode[a] = typesCode[a] + " " + argumentsCode[a];
    }

    // Generate code for srand and time functions
    var srandCode = [];
    var timeCode = [];
    for (var functionName in Blockly.cake.times_) {
        var codeBlock = Blockly.cake.times_[functionName];
        if (functionName.match("srand")) {
            if (codeBlock[0] === "main_block") {
                srandCode.push(Blockly.cake.prefixLines(codeBlock[1], Blockly.cake.INDENT));
            }
        } else if (functionName.match("time")) {
            if (codeBlock[0] === "main_block") {
                timeCode.push(Blockly.cake.prefixLines(codeBlock[1], Blockly.cake.INDENT));
            }
        }
    }

    // Combine srand and time function code
    var additionalCode = srandCode.length ? srandCode.join("\n") + "\n" + timeCode.join("\n") : timeCode.join("\n");

    // Combine all code to form the main block code
    var mainBlockCode = "int main(" + declarationsCode.join(", ") + ") {" +
        additionalCode.replace(/\n\n+/g, "\n\n").replace(/\n*$/, "\n") +
        blockCode +
        returnValue +
        "}";

    // Scrub the code and store it in the definitions
    mainBlockCode = Blockly.cake.scrub_(c, mainBlockCode);
    Blockly.cake.definitions_.main = mainBlockCode;

    // Return null as there is no direct output
    return null;
};