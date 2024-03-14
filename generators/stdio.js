Blockly.cake.stdio = {};

Blockly.cake.library_stdio_text_char = function () {
  return ["'" + this.getFieldValue("CHAR") + "'", Blockly.cake.ORDER_ATOMIC]
};

Blockly.cake.library_stdio_printf = function (p) {
  // console.log(">>>> library_stdio_printf", p);

  let formatString = "";
  let argumentsString = "";

  for (let l = 0; l <= p.printAddCount_; l++) {
    const valueCode = Blockly.cake.valueToCode(p, "VAR" + l, Blockly.cake.ORDER_NONE) || "";
    const connection = p.inputList[l].connection;
    const connectedBlock = connection.targetBlock();

    if (connectedBlock) {
      const blockType = connectedBlock.type;

      if (
        ["math_prev_inc_decrement", "math_post_inc_decrement", "math_modulo", "library_stdlib_abs",
          "library_string_strlen", "library_stdlib_rand", "library_stdlib_number_forRandScope1",
          "library_stdlib_number_forRandScope100", "library_stdlib_sizeof_forMalloc",
          "library_stdlib_arithmetic_forMalloc", "library_stdlib_number_forMalloc"].includes(blockType)
      ) {
        formatString += "%d";
        argumentsString += `, ${valueCode}`;
      } else if (blockType === "math_arithmetic") {
        let numberFormat = "%d";
        let currentBlock = connectedBlock;

        while (true) {
          const childBlocks = currentBlock.childBlocks_;

          for (let i = 0; i < childBlocks.length; i++) {
            if (childBlocks[i].type === "variables_get" && (format = Blockly.cake.varTypeCheckInPrintScan(childBlocks[i].getVars()[0])) === "%f") {
              numberFormat = format;
              break;
            }

            if (childBlocks[i].type === "variables_pointer_get") {
              numberFormat = "%p";
              break;
            }

            if (childBlocks[i].type === "variables_pointer_*") {
              if (childBlocks[i].childBlocks_[0].type === "variables_pointer_get" &&
                (format = Blockly.cake.pointerTypeCheckInPrint(childBlocks[i].childBlocks_[0].getVars()[0], false)) === "%f") {
                numberFormat = format;
                break;
              }

              if (childBlocks[i].childBlocks_[0].type === "variables_pointer_*" &&
                childBlocks[i].childBlocks_[0].childBlocks_[0].type === "variables_pointer_get" &&
                (format = Blockly.cake.pointerTypeCheckInPrint(childBlocks[i].childBlocks_[0].childBlocks_[0].getVars()[0], false)) === "%f") {
                numberFormat = format;
                break;
              }
            }

            if (childBlocks[i].type === "math_number" && valueCode.includes(".")) {
              numberFormat = "%f";
              break;
            }

            if (childBlocks[i].type === "math_arithmetic") {
              if (childBlocks === currentBlock.childBlocks_) {
                currentBlock = childBlocks[i];
              } else {
                currentBlock = childBlocks[i];
              }
            }
          }

          if (numberFormat === "%p" || numberFormat === "%f") {
            break;
          } else if (childBlocks === currentBlock.childBlocks_) {
            if (currentBlock !== null) {
              currentBlock = null;
            } else {
              break;
            }
          }
        }

        formatString += numberFormat;
        argumentsString += `, ${valueCode}`;
      } else if (blockType === "math_number") {
        formatString = valueCode.includes(".") ? formatString + "%f" : formatString + "%d";
        argumentsString += `, ${valueCode}`;
      } else if (blockType === "procedures_callreturn") {
        const functionName = connectedBlock.getCallFuncName();
        const matchingProcedure = Blockly.Procedures.allProcedures()[1].find(proc => proc[1] === functionName);

        if (matchingProcedure) {
          if (matchingProcedure[7] === "variable") {
            switch (matchingProcedure[2]) {
              case "int":
                formatString += "%d";
                break;
              case "unsigned int":
                formatString += "%u";
                break;
              case "float":
              case "double":
                formatString += "%f";
                break;
              case "char":
                formatString += "%c";
                break;
            }
          } else if (matchingProcedure[7] === "pointer" || matchingProcedure[7] === "array") {
            formatString += "%p";
          }

          argumentsString += `, ${valueCode}`;
        } else {
          formatString += "error!";
        }
      } else if (
        ["library_math_abs", "library_math_trig", "library_math_logs", "library_math_pow",
          "library_math_exp", "library_math_sqrt", "library_math_round"].includes(blockType)
      ) {
        formatString += "%f";
        argumentsString += `, ${valueCode}`;
      } else if (blockType === "structure_get") {
        const parts = valueCode.split(".");
        const structures = Blockly.Structure.allStructure();
        let structure = null;

        for (let i = 0; i < structures.length; i++) {
          if (structures[i][0][0] === "sn" && parts[0] === structures[i][0][2]) {
            structure = structures[i];
            break;
          }
        }

        if (structure) {
          let dataType = null;

          for (let i = 0; i < structure[0][4].length; i++) {
            if (parts[1] === structure[0][4][i]) {
              dataType = structure[0][3][i];
              break;
            }
          }

          if (dataType) {
            switch (structure[0][5]) {
              case "v":
                switch (dataType) {
                  case "unsigned int":
                    formatString += "%u";
                    break;
                  case "float":
                  case "double":
                    formatString += "%f";
                    break;
                  case "char":
                    formatString += "%c";
                    break;
                  default:
                    formatString += "%d";
                }
                break;
              case "a":
                formatString += "%s";
                break;
              case "p":
                formatString += "%p";
                break;
              default:
                formatString += "error!";
            }
          } else {
            formatString += "error!";
          }
        } else {
          formatString += "error!";
        }

        argumentsString += `, ${valueCode}`;
      } else if (blockType === "math_convert_type") {
        formatString = valueCode.includes("unsigned int") ? formatString + "%u" :
          valueCode.includes("float") ? formatString + "%f" :
            valueCode.includes("double") ? formatString + "%f" :
              valueCode.includes("char") ? formatString + "%c" :
                formatString + "%d";

        argumentsString += `, ${valueCode}`;
      } else if (
        ["library_string_strcat", "library_string_strcpy", "library_string_strcmp"].includes(blockType)
      ) {
        formatString += "%s";
        argumentsString += `, ${valueCode}`;
      } else if (blockType === "library_stdlib_convert") {
        if (valueCode.includes("atoi(")) {
          formatString += "%d";
        } else if (valueCode.includes("atof(")) {
          formatString += "%f";
        }

        argumentsString += `, ${valueCode}`;
      } else if (blockType === "library_stdio_text_char") {
        formatString += "%c";
        argumentsString += `, ${valueCode}`;
      } else if (blockType === "variables_array_get") {
        const arrayParts = valueCode.split("[");
        const arrayDataType = Blockly.cake.varTypeCheckInPrintScan(arrayParts[0]);

        if (arrayDataType === "%c") {
          const connectedBlockInputIdxLength = connectedBlock.getInputIdxLength();

          if (connectedBlockInputIdxLength === 0) {
            formatString += "%s";
            argumentsString += `, ${arrayParts[0]}`;
          } else {
            formatString += arrayDataType;
            argumentsString += `, ${valueCode}`;
          }
        } else {
          formatString += arrayDataType;
          argumentsString += `, ${valueCode}`;
        }
      } else if (
        blockType === "variables_pointer_get" ||
        blockType === "variables_array_pointer"
      ) {
        if (blockType === "variables_array_pointer") {
          formatString += "%p";
        } else {
          const pointerDataType = Blockly.cake.pointerTypeCheckInPrint(valueCode, false);
          formatString = pointerDataType === "%c" ? formatString + "%s" : formatString + "%p";
        }

        argumentsString += `, ${valueCode}`;
      } else if (blockType === "variables_pointer_&") {
        if (connectedBlock.inputList[0].connection.targetBlock()) {
          const referencedValueCode = Blockly.cake.valueToCode(
            connectedBlock, "VALUE", Blockly.cake.ORDER_NONE
          ) || "";
          formatString += "%p";
          argumentsString += `, &${referencedValueCode}`;
        }
      } else if (blockType === "variables_pointer_*") {
        if (connectedBlock.inputList[0].connection.targetBlock()) {
          const dereferencedValueCode = Blockly.cake.valueToCode(
            connectedBlock, "VALUE", Blockly.cake.ORDER_NONE
          ) || "";
          const dereferencedDataType = Blockly.cake.pointerTypeCheckInPrint(
            dereferencedValueCode, false
          );

          if (dereferencedDataType === "") {
            formatString += dereferencedValueCode;
          } else {
            formatString += dereferencedDataType;
            argumentsString += `, *${dereferencedValueCode}`;
          }
        }
      } else if (
        ["library_math_numcheck", "library_math_numcompare", "procedures_callreturn", "logic_compare",
          "logic_operation", "logic_negate", "logic_boolean", "logic_null", "logic_ternary",
          "controls_switch", "library_stdlib_rand_scope", "library_stdlib_malloc"].includes(blockType)
      ) {
        if (connection.isSuperior()) {
          connection.targetBlock().setParent(null);
        } else {
          connection.sourceBlock_.setParent(null);
        }

        connection.sourceBlock_.bumpNeighbours_();
      } else {
        const dataType = Blockly.cake.varTypeCheckInPrintScan(valueCode);

        if (dataType === "") {
          formatString += valueCode;
        } else {
          formatString += dataType;
          argumentsString += `, ${valueCode}`;
        }
      }
    }
  }

  Blockly.cake.definitions_.include_cake_stdio = "#include <stdio.h>";

  const code = (
    (argumentsString === "") ? `printf("${formatString}");` : `printf("${formatString}"${argumentsString});`
  ) + "\n";

  return code;
};

// Function to check variable type and return corresponding format specifier for printf/scanf
Blockly.cake.varTypeCheckInPrintScan = function (variableName) {
  let formatSpecifier = "";

  // Get all variables in the workspace
  const allVariables = Blockly.Variables.allVariables();

  for (const variableInfo of allVariables) {
    if (variableName === variableInfo[2]) {
      const variableType = variableInfo[0];
      switch (variableType) {
        case "int":
          formatSpecifier = "%d";
          break;
        case "unsigned int":
          formatSpecifier = "%u";
          break;
        case "float":
        case "double":
          formatSpecifier = "%f";
          break;
        case "char":
          formatSpecifier = "%c";
          break;
        case "dbchar":
          formatSpecifier = "%s";
          break;
        default:
          break;
      }
      break;
    }
  }
  return formatSpecifier;
};

Blockly.cake.library_stdio_text = function (block) {
  let textValue = Blockly.cake.quote_(block.getFieldValue("TEXT"));
  if (
    !block.getParent() ||
    block.getParent().type !== "library_stdio_printf" &&
    block.getParent().type !== "define_declare" &&
    block.getParent().type !== "comment"
  ) {
    textValue = textValue.length === 1 ? "'" + textValue + "'" : '"' + textValue + '"';
  }
  return [textValue, Blockly.cake.ORDER_ATOMIC];
};
>>>>>>> Stashed changes
=======

// Function to check variable type and return corresponding format specifier for printf/scanf
Blockly.cake.varTypeCheckInPrintScan = function (variableName) {
    let formatSpecifier = "";

    // Get all variables in the workspace
    const allVariables = Blockly.Variables.allVariables();

    for (const variableInfo of allVariables) {
        if (variableName === variableInfo[2]) {
            const variableType = variableInfo[0];
            switch (variableType) {
                case "int":
                    formatSpecifier = "%d";
                    break;
                case "unsigned int":
                    formatSpecifier = "%u";
                    break;
                case "float":
                case "double":
                    formatSpecifier = "%f";
                    break;
                case "char":
                    formatSpecifier = "%c";
                    break;
                case "dbchar":
                    formatSpecifier = "%s";
                    break;
                default:
                    break;
            }
            break;
        }
    }
    return formatSpecifier;
};
<<<<<<< HEAD
>>>>>>> 3966067 ([GTH-3] fix printf with variable)
=======

Blockly.cake.library_stdio_text = function (block) {
    let textValue = Blockly.cake.quote_(block.getFieldValue("TEXT"));
    if (!block.getParent() || block.getParent().type !== "library_stdio_printf" && block.getParent().type !== "define_declare" && block.getParent().type !== "comment") {
        textValue = textValue.length === 1 ? "'" + textValue + "'" : '"' + textValue + '"';
    }
    return [textValue, Blockly.cake.ORDER_ATOMIC];
};
>>>>>>> 3cb5f91 ([GTH-03] add stdio_text generator)
