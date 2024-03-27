Blockly.c_language.procedures = {};

/**
 * 
 * @param {*} block 
 * @returns 
 */
Blockly.c_language.main_block = function (block) {
  // Generate code for blocks inside the "STACK" input
  let blockCode = Blockly.c_language.statementToCode(block, "STACK");

  // Add statement prefix if defined
  if (Blockly.c_language.STATEMENT_PREFIX) {
    blockCode = Blockly.c_language.prefixLines(
      Blockly.c_language.STATEMENT_PREFIX.replace(/%1/g, "'" + block.id + "'"),
      Blockly.c_language.INDENT
    ) + blockCode;
  }

  // Add infinite loop trap if defined
  if (Blockly.c_language.INFINITE_LOOP_TRAP) {
    blockCode = Blockly.c_language.INFINITE_LOOP_TRAP.replace(/%1/g, "'" + block.id + "'") + blockCode;
  }

  // Generate code for the return value or default to 0 if not specified
  const returnValue = Blockly.c_language.valueToCode(block, "RETURN", Blockly.c_language.ORDER_NONE) || "";
  const returnStatement = returnValue ? "  return " + returnValue + ";\n" : "  return 0;\n";

  // Generate code for function arguments, types, and declarations
  const argumentsCode = [];
  const typesCode = [];
  const declarationsCode = [];
  for (let i = 0; i < block.arguments_.length; i++) {
    argumentsCode[i] = Blockly.c_language.variableDB_.getName(block.arguments_[i], Blockly.Variables.NAME_TYPE);
    typesCode[i] = block.types_[i];
    declarationsCode[i] = typesCode[i] + " " + argumentsCode[i];
  }

  // Generate code for srand and time functions
  const srandCode = [];
  const timeCode = [];
  for (const functionName in Blockly.c_language.times_) {
    const codeBlock = Blockly.c_language.times_[functionName];
    if (functionName.match("srand")) {
      if (codeBlock[0] === "main_block") {
        srandCode.push(Blockly.c_language.prefixLines(codeBlock[1], Blockly.c_language.INDENT));
      }
    } else if (functionName.match("time")) {
      if (codeBlock[0] === "main_block") {
        timeCode.push(Blockly.c_language.prefixLines(codeBlock[1], Blockly.c_language.INDENT));
      }
    }
  }

  // Combine srand and time function code
  const additionalCode = srandCode.length ? srandCode.join("\n") + "\n" + timeCode.join("\n") : timeCode.join("\n");

  // Combine all code to form the main block code
  let mainBlockCode = "int main(" + declarationsCode.join(", ") + ") {" +
    additionalCode.replace(/\n\n+/g, "\n\n").replace(/\n*$/, "\n") +
    blockCode +
    returnStatement +
    "}";

  // Scrub the code and store it in the definitions
  mainBlockCode = Blockly.c_language.scrub_(block, mainBlockCode);
  Blockly.c_language.definitions_.main = mainBlockCode;

  // Return null as there is no direct output
  return null;
};
