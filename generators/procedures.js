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

Blockly.c_language.procedures_defnoreturn = function (block) {
  const procedureName = Blockly.c_language.variableDB_.getName(block.getFieldValue("NAME"), Blockly.Procedures.NAME_TYPE);
  let statements = Blockly.c_language.statementToCode(block, "STACK");
  const srandCalls = [];
  const timeCalls = [];
  
  for (let key in Blockly.c_language.times_) {
    const call = Blockly.c_language.times_[key];
    if (key.match("srand")) {
      if (call[0] == procedureName) {
        const prefixedCall = Blockly.c_language.prefixLines(call[1], Blockly.c_language.INDENT);
        srandCalls.push(prefixedCall);
      }
    } else if (key.match("time")) {
      if (call[0] == procedureName) {
        const prefixedCall = Blockly.c_language.prefixLines(call[1], Blockly.c_language.INDENT);
        timeCalls.push(prefixedCall);
      }
    }
  }
  
  const timeBlock = timeCalls.length ? srandCalls.join("\n") + "\n" + timeCalls.join("\n") : timeCalls.join("\n");
  
  if (Blockly.c_language.STATEMENT_PREFIX) {
    statements = Blockly.c_language.prefixLines(Blockly.c_language.STATEMENT_PREFIX.replace(/%1/g, "'" + block.id + "'"), Blockly.c_language.INDENT) + statements;
  }
  
  if (Blockly.c_language.INFINITE_LOOP_TRAP) {
    statements = Blockly.c_language.INFINITE_LOOP_TRAP.replace(/%1/g, "'" + block.id + "'") + statements;
  }
  
  let returnValue = Blockly.c_language.valueToCode(block, "RETURN", Blockly.c_language.ORDER_NONE) || "";
  if (returnValue) {
    returnValue = "  return " + returnValue + ";\n";
  }
  
  const procedureArgs = Blockly.Procedures.getTypePlusArgs(block);
  let code = "void " + procedureName + "(" + procedureArgs.join(", ") + ") {\n" + timeBlock.replace(/\n\n+/g, "\n\n").replace(/\n*$/, "\n") + statements + returnValue + "}\n";
  code = Blockly.c_language.scrub_(block, code);
  
  Blockly.c_language.definitions_[procedureName] = code;
  Blockly.c_language.definitions_["Func_declare" + procedureName] = "void " + procedureName + "(" + procedureArgs.join(", ") + ");";
  
  if (Blockly.Blocks.checkLegalName(Blockly.Msg.PROCEDURES_ILLEGALNAME, procedureName) == -1) {
    block.initName();
  }
  
  return null;
};

Blockly.c_language.procedures_defreturn = function (block) {
  const procedureName = Blockly.c_language.variableDB_.getName(block.getFieldValue("NAME"), Blockly.Procedures.NAME_TYPE);
  let statements = Blockly.c_language.statementToCode(block, "STACK");
  
  if (Blockly.c_language.STATEMENT_PREFIX) {
    statements = Blockly.c_language.prefixLines(Blockly.c_language.STATEMENT_PREFIX.replace(/%1/g, "'" + block.id + "'"), Blockly.c_language.INDENT) + statements;
  }
  
  if (Blockly.c_language.INFINITE_LOOP_TRAP) {
    statements = Blockly.c_language.INFINITE_LOOP_TRAP.replace(/%1/g, "'" + block.id + "'") + statements;
  }
  
  const procedureArgs = Blockly.Procedures.getTypePlusArgs(block);
  const srandCalls = [];
  const timeCalls = [];
  
  for (let key in Blockly.c_language.times_) {
    const call = Blockly.c_language.times_[key];
    if (key.match("srand")) {
      if (call[0] == procedureName) {
        const prefixedCall = Blockly.c_language.prefixLines(call[1], Blockly.c_language.INDENT);
        srandCalls.push(prefixedCall);
      }
    } else if (key.match("time")) {
      if (call[0] == procedureName) {
        const prefixedCall = Blockly.c_language.prefixLines(call[1], Blockly.c_language.INDENT);
        timeCalls.push(prefixedCall);
      }
    }
  }
  
  const timeBlock = timeCalls.length ? srandCalls.join("\n") + "\n" + timeCalls.join("\n") : timeCalls.join("\n");
  
  let returnType = block.getFieldValue("TYPES");
  let distribution = block.getFieldValue("DISTS");
  
  let pointerSpec = "";
  if (distribution === "pointer") {
    pointerSpec = block.getFieldValue("PSPECS");
    if (pointerSpec === null) {
      pointerSpec = "*";
    }
  }
  
  let arraySpec = "";
  if (distribution === "array") {
    arraySpec = block.getFieldValue("ASPECS");
    if (arraySpec === null) {
      arraySpec = "[]";
    }
  }
  
  let procedureDeclaration = "";
  if (distribution === "pointer") {
    procedureDeclaration = returnType + pointerSpec + " " + procedureName + "(" + procedureArgs.join(", ") + ") {" + timeBlock.replace(/\n\n+/g, "\n\n").replace(/\n*$/, "\n") + statements + "}";
  } else if (distribution === "array") {
    procedureDeclaration = returnType + arraySpec + " " + procedureName + "(" + procedureArgs.join(", ") + ") {" + timeBlock.replace(/\n\n+/g, "\n\n").replace(/\n*$/, "\n") + statements + "}";
  } else {
    procedureDeclaration = returnType + " " + procedureName + "(" + procedureArgs.join(", ") + ") {" + timeBlock.replace(/\n\n+/g, "\n\n").replace(/\n*$/, "\n") + statements + "}";
  }
  
  procedureDeclaration = Blockly.c_language.scrub_(block, procedureDeclaration);
  
  Blockly.c_language.definitions_[procedureName] = procedureDeclaration;
  Blockly.c_language.definitions_["Func_declare" + procedureName] = returnType + " " + procedureName + "(" + procedureArgs.join(", ") + ");";
  
  if (Blockly.Blocks.checkLegalName(Blockly.Msg.PROCEDURES_ILLEGALNAME, procedureName) === -1) {
    block.initName();
  }
  
  return null;
};

Blockly.c_language.procedures_return = function (block) {
  let value = Blockly.c_language.valueToCode(block, "VALUE", Blockly.c_language.ORDER_NONE) || "NaN";
  return value !== "NaN" ? "return " + value + ";\n" : "return;\n";
};
