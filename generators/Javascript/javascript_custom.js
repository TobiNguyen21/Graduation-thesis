Blockly.JavaScript.errorHandler = function (block, msg, blockDispose = null) {
  window.alert(`Error: ${msg}`);
  if (blockDispose) block.getInputTargetBlock(blockDispose).dispose();
  return '';
}

// Generator for declaring variables
Blockly.JavaScript.variables_declare = function (block) {
  const variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
  const type = block.getFieldValue("TYPE");

  let memory = JSON.parse(localStorage.getItem('memory'));

  memory[variable] = {
    type,
    value: 'no_value'
  }
  localStorage.setItem('memory', JSON.stringify(memory));
  return 'var ' + variable + '\n';
};

Blockly.JavaScript.variables_assignment = function (block) {
  const a_origin = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  const b_origin = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
  const type_block_a = block.getInputTargetBlock('A')?.type || undefined;
  const type_block_b = block.getInputTargetBlock('B')?.type || 'no_value';
  const memory = JSON.parse(localStorage.getItem('memory'));
  const a = Blockly.JavaScript.removeDotVal(a_origin);
  const b = Blockly.JavaScript.removeDotVal(b_origin);
  let addCodeCheckIndexValueOfArray = null;

  const getArrayAndIndex = (str) => {
    const matches = str.match(/([a-zA-Z_]\w*)\[(\d+)\]/);
    return matches && matches.length === 3 ? { arrayName: matches[1], index: parseInt(matches[2]) } : null;
  }

  const handleError = (msg, blockDispose = null) => {
    return Blockly.JavaScript.errorHandler(block, msg, blockDispose);
  }

  // Case 1: (arr[index] || b || 123 || 'a' ) = a
  if (type_block_b === 'variables_get') {
    const object_a = memory[a];
    const object_b = memory[b];
    if (type_block_a === 'lists_getValueAtIndex') {
      const result = getArrayAndIndex(a);
      if (result === null) return a + ' = ' + b + ';\n';
      const { arrayName, index } = result;
      const codeCheckIndexValueOfArray = localStorage.getItem('checkIndexValueOfArray');
      addCodeCheckIndexValueOfArray = codeCheckIndexValueOfArray;
      if (memory[arrayName]?.type !== object_b['type'] || object_b?.value === "no_value") {
        return handleError('Type mismatch or variable not assigned.', 'B');
      } else {
        const arr = memory[arrayName].value;
        arr[index] = (object_b?.value !== "pending") ? object_b.value : "pending";
      }
    } else if (type_block_a !== 'pointer') {
      if (object_b['value'] === 'no_value' || object_b['type'] !== object_a['type']) {
        return handleError('Type mismatch or variable not assigned.', 'B');
      } else {
        object_a['value'] = object_b['value'];
      }
    }
  }

  // Case 2: (a || arr[index]) = 123
  if (
    (type_block_a === 'variables_get' || type_block_a === 'lists_getValueAtIndex') &&
    type_block_b === 'math_number'
  ) {
    if (type_block_a === 'lists_getValueAtIndex') {
      const result = getArrayAndIndex(a);
      if (result === null) return '';
      const { arrayName, index } = result;
      if (memory[arrayName]?.type !== 'INT') {
        return handleError('Type array is not match.', 'B');
      }
      memory[arrayName].value[index] = b;
    }
    if (type_block_a === 'variables_get') {
      if (memory[a]?.type === 'INT') memory[a]['value'] = b;
      else {
        return handleError('Type mismatch or variable not assigned.', 'B');
      }
    }
  }

  let a_CodeCheckIndexValueOfArray = '';
  // Case 2.1: (a || arr[index]) = arr[index]
  if (
    (type_block_a === 'variables_get' || type_block_a === 'lists_getValueAtIndex') &&
    type_block_b === 'lists_getValueAtIndex'
  ) {
    if (type_block_a === 'lists_getValueAtIndex') {
      const result = getArrayAndIndex(a);
      if (result === null) return '';
      const { arrayName, index } = result;
      if (memory[arrayName]?.type !== 'INT') {
        return handleError('Type array is not match.', 'B');
      }
      memory[arrayName].value[index] = b;
      a_CodeCheckIndexValueOfArray = `\n
      if (${index} < 0 || ${index} >= ${arrayName}.length || isNaN(${index})) {
        highlightBlock('${block.getInputTargetBlock('A').id || ''}');
        throw new Error('Index ' + ${index} + ' is out of bounds for array ' + '${arrayName}' + ' with length ' + ${arrayName}.length);
      } \n
      `
    }
    if (type_block_a === 'variables_get') {
      if (memory[a]?.type === 'INT') memory[a]['value'] = b;
      else {
        return handleError('Type mismatch or variable not assigned.', 'B');
      }
    }
  }

  // Case 3: (a || arr[index]) = 'a'
  if (
    (type_block_a === 'variables_get' || type_block_a === 'lists_getValueAtIndex') &&
    type_block_b === 'single_character_input'
  ) {
    if (type_block_a === 'lists_getValueAtIndex') {
      const result = getArrayAndIndex(a);
      if (result === null) return '';
      const { arrayName, index } = result;

      if (memory[arrayName]?.type !== 'CHAR') {
        return handleError('Type array is not match', 'B');
      }
      memory[arrayName].value[index] = b;
    }
    if (type_block_a === 'variables_get') {
      if (memory[a]?.type === 'CHAR') memory[a]['value'] = b;
      else {
        return handleError('Type mismatch or variable not assigned.', 'B');
      }
    }
  }

  // Case 4: ... = 123
  if (type_block_b === 'math_arithmetic') {
    if (memory[a]?.type === 'INT') memory[a]['value'] = 'value_of_math_arithmetic';
    else {
      return handleError('Type mismatch or variable not assigned.', 'B');
    }
  }

  // Case 5: ... = expression
  if (type_block_b === 'math_modulo') {
    if (memory[a]?.type === 'INT') memory[a]['value'] = 'value_of_math_modulo';
    else {
      return handleError('Type mismatch or variable not assigned.', 'B');
    }
  }

  // Case 6: ... = roundNumber
  if (type_block_b === 'math_round') {
    if (memory[a]?.type === 'INT') memory[a]['value'] = 'value_of_math_round';
    else {
      return handleError('Type mismatch or variable not assigned.', 'B');
    }
  }

  // Case 7: ... = bitwise expression ( &|^!)
  if (type_block_b === 'operator_bitwise') {
    if (memory[a]?.type === 'INT') memory[a]['value'] = 'value_of_operator_bitwise';
    else {
      return handleError('Type mismatch or variable not assigned.', 'B');
    }
  }

  // Case 8: ... = a^B
  if (type_block_b === 'math_pow') {
    if (memory[a]?.type === 'INT') memory[a]['value'] = 'value_of_math_pow';
    else {
      return handleError('Type mismatch or variable not assigned.', 'B');
    }
  }

  // Case 9: arr[index] = [] - cover case with type int or char
  if (
    type_block_a === 'variables_array_get_name' &&
    type_block_b === 'lists_create_empty_v2'
  ) {
    if (memory[a]?.type === 'INT' || memory[a]?.type === 'CHAR')
      memory[a]['value'] = b;
    else {
      return handleError('Type mismatch or variable not assigned.', 'B');
    }
  } else if (
    (type_block_a === undefined &&
      type_block_b === 'lists_create_empty_v2') ||
    (type_block_a === 'variables_array_get_name' &&
      type_block_b === 'no_value')
  ) {
    return '';
  } else if (
    (type_block_a !== 'variables_array_get_name' &&
      type_block_b === 'lists_create_empty_v2') ||
    (type_block_a === 'variables_array_get_name' &&
      type_block_b !== 'lists_create_empty_v2')
  ) {
    return handleError('Type mismatch or variable not assigned.', 'B');
  }

  // Case 10: ... = function return value
  if (type_block_b === 'procedures_callreturn') {
    const funcName = block.getInputTargetBlock('B').getField("NAME").value_;
    memory[a]['value'] = 'value_of_procedures_callreturn'
    Blockly.getMainWorkspace().addChangeListener(e => {
      if (e.type === Blockly.Events.CLICK) {
        if (memory[funcName]?.type !== memory[a]?.type) {
          memory[a]['value'] = 'no_value'
          handleError('Type mismatch or variable not assigned.', 'B');
        }
      }
    })

    const params = Blockly.JavaScript.getFunctionParameters(b);
    let c1 = "";
    let c2 = "";

    for (let i = 0; i < params.length; i++) {
      if (params[i][0] === '&') {
        params[i] = params[i].substring(1);
        const variable = params[i];
        c1 += variable + ' = { val: ' + variable + '};\n';
        c2 += variable + ' = ' + variable + '.val;\n';
      }
      if (
        memory[funcName]?.params[i]
        && (Object.values(memory[funcName]?.params[i])[0] == 'INT_REF'
          || Object.values(memory[funcName]?.params[i])[0] == 'CHAR_REF')
      ) {
        const variable = params[i];
        if (variable !== 'null') {
          c1 += `${variable} = { val: ${variable} };\n`;
          c2 += `${variable} = ${variable}.val;\n`;
        }
      }
    }

    const newCodeFuncText = Blockly.JavaScript.replaceFunctionParameters(b, params);

    localStorage.setItem('memory', JSON.stringify(memory));
    return c1 + a + ' = ' + newCodeFuncText + ';\n' + c2;
  }

  if (type_block_a === 'variables_get' && type_block_b === 'pointer') {
    memory[a]['value'] = 'pending';
  }

  localStorage.setItem('memory', JSON.stringify(memory));

  if (type_block_b === 'lists_getValueAtIndex' || type_block_a === 'lists_getValueAtIndex') {
    const codeCheckIndexValueOfArray = localStorage.getItem('checkIndexValueOfArray');
    addCodeCheckIndexValueOfArray = a_CodeCheckIndexValueOfArray + codeCheckIndexValueOfArray;
  }

  // if (checkPassRef(memory, a)) a = a + '.val';
  // if (checkPassRef(memory, b)) b = b + '.val';
  if (addCodeCheckIndexValueOfArray)
    return addCodeCheckIndexValueOfArray + a_origin + ' = ' + b_origin + ';\n';

  return a_origin + ' = ' + b_origin + ';\n';
};

// Override method variables_get
Blockly.JavaScript['variables_get_original'] = Blockly.JavaScript['variables_get'];
Blockly.JavaScript['variables_get'] = function (block) {
  let code = Blockly.JavaScript['variables_get_original'](block);
  const memory = JSON.parse(localStorage.getItem('memory'));
  const variableName = block.getField("VAR").getVariable().name;

  if (!memory[variableName]) {
    window.alert('Variable not found');
    block.dispose();
    return;
  }

  if (Blockly.JavaScript.checkPassRef(memory, variableName)) {
    code[0] += '.val';
  }

  return code;
};

// Override method text_print
Blockly.JavaScript['text_print_original'] = Blockly.JavaScript['text_print'];
Blockly.JavaScript['text_print'] = function (block) {
  const code = Blockly.JavaScript['text_print_original'](block);
  const inputConnection = block.getInput('TEXT').connection;
  let connectedBlock = null;
  const memory = JSON.parse(localStorage.getItem('memory'));

  if (inputConnection.targetConnection) {
    connectedBlock = inputConnection.targetConnection.sourceBlock_;

    if (connectedBlock.type === 'variables_get') {
      const variable = Blockly.JavaScript.variableDB_.getName(connectedBlock.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
      if (memory[variable]['value'] === 'no_value') {
        window.alert("Variable not assigned");
        connectedBlock.dispose();
      }
    }

    if (connectedBlock.type === 'lists_getValueAtIndex') {
      // const arrayName = connectedBlock.getFieldValue("ARRAY");
      // const index = +(Blockly.JavaScript.valueToCode(connectedBlock, 'INDEX', Blockly.JavaScript.ORDER_NONE)) || 0;
      // const arr = memory[arrayName]?.value ? (memory[arrayName].value) : null;
      // if (arrayName !== '--select--' && arr[index] === undefined) {
      //   window.alert("Variable not assigned");
      //   connectedBlock.dispose();
      // }
      const codeCheckIndexValueOfArray = localStorage.getItem('checkIndexValueOfArray');
      return codeCheckIndexValueOfArray + code;
    }
  }
  return code;
};

Blockly.JavaScript['single_character_input'] = function (block) {
  const text_char = `'${block.getFieldValue('CHAR')}'`;
  return [text_char, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['text_scanf'] = function (block) {
  const dropdown_type = block.getFieldValue('TYPE');
  let value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  const memory = JSON.parse(localStorage.getItem('memory'));
  const msgData = `Enter data input ${value_text}:`

  if (memory[value_text]?.value === "no_value") {
    memory[value_text]['value'] = 'pending';
    localStorage.setItem('memory', JSON.stringify(memory));
  }

  if (dropdown_type === '%s') {
    return value_text + ` = window.prompt('${msgData}');\n`;
  } else if (dropdown_type === '%d') {
    return value_text + ` = parseInt(window.prompt('${msgData}'));\n`;
  } else if (dropdown_type === '%c') {
    return value_text + ` = window.prompt('${msgData}')[0];\n`;
  }
  return '';
};

// Generator for bitwise block
Blockly.JavaScript['operator_bitwise'] = function (block) {
  const value_a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  const dropdown_op = block.getFieldValue('OP');
  const value_b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);

  const code = value_a + ' ' + dropdown_op + ' ' + value_b;
  return [code, Blockly.JavaScript.ORDER_NONE];
}

// Generator for pow block
Blockly.JavaScript['math_pow'] = function (block) {
  const valueNum1 = Blockly.JavaScript.valueToCode(block, 'NUM1', Blockly.JavaScript.ORDER_NONE) || '0';
  const valueNum2 = Blockly.JavaScript.valueToCode(block, 'NUM2', Blockly.JavaScript.ORDER_NONE) || '0';
  const code = 'Math.pow(' + valueNum1 + ', ' + valueNum2 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['variables_array_declare'] = function (block) {
  const text_var = block.getFieldValue('VAR');
  const type = block.getFieldValue("TYPE");
  const lengthArr = +Blockly.JavaScript.valueToCode(block, 'LENGTH', Blockly.JavaScript.ORDER_ATOMIC) || 0;

  const arrInit = [];

  if (type === "INT") {
    for (let i = 0; i < lengthArr; i++) {
      arrInit.push(0);
    }
  } else if (type === "CHAR") {
    for (let i = 0; i < lengthArr; i++) {
      arrInit.push(null);
    }
  }


  let memory = JSON.parse(localStorage.getItem('memory'));
  memory[text_var] = {
    type,
    value: arrInit
  }
  localStorage.setItem('memory', JSON.stringify(memory));
  const code = 'var' + ' ' + text_var + ` = ${JSON.stringify(arrInit)}` + ';\n';
  return code;
};

Blockly.JavaScript['variables_array_get_name'] = function (block) {
  const arrayName = block.getFieldValue('ARRAY');
  const code = arrayName;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['variables_array_initial'] = function (block) {
  const varName = block.getFieldValue('VAR');
  const type = block.getFieldValue('TYPE');
  let length = +Blockly.JavaScript.valueToCode(block, 'LENGTH', Blockly.JavaScript.ORDER_ATOMIC) || undefined;
  const elementCode = Blockly.JavaScript.valueToCode(block, 'ELEMENT', Blockly.JavaScript.ORDER_NONE) || 'null';

  let element = elementCode.replace(/'/g, '"');
  if (type === "INT") element = element.replace(/null/g, '0');
  const arrInit = JSON.parse(element) || [];

  const handleError = (msg, blockDispose = null) => {
    return Blockly.JavaScript.errorHandler(block, msg, blockDispose)
  }

  if (length === undefined && arrInit.length > 0) {
    length = arrInit.length;
  }

  const checkConflictTypeElementOfArray = (arr = []) => {
    for (let i = 1; i < arr.length; i++) {
      if (
        arr[i] && ((typeof arr[0]) !== (typeof arr[i]))
      ) {
        return true;
      }
    }
    return false;
  }

  if (!Array.isArray(arrInit)) {
    return handleError("block connect must be array.", 'ELEMENT');
  }

  if (checkConflictTypeElementOfArray(arrInit)) {
    return handleError("Conflict type on array.", 'ELEMENT');
  }

  if (
    (arrInit.length > 0 && typeof arrInit[0] === "string" && type === "INT") ||
    (arrInit.length > 0 && typeof arrInit[0] === "number" && type === "CHAR")
  ) {
    return handleError("Type variable is not match.", 'ELEMENT');
  }

  if (Number.isInteger(length) && arrInit.length > length) {
    return handleError("Elements overload size allocated for array.", 'ELEMENT');
  }

  if (Number.isInteger(length) && arrInit.length < length) {
    const length_ = length - arrInit.length;
    for (let i = 0; i < length_; i++) {
      if (type === "INT") arrInit.push(0);
      if (type === "CHAR") arrInit.push(null);
    }
  }

  let memory = JSON.parse(localStorage.getItem('memory'));
  memory[varName] = {
    type,
    value: arrInit
  }
  localStorage.setItem('memory', JSON.stringify(memory));

  let code = 'var ' + varName + ' = ';
  code += elementCode + ';\n';

  return code;
};

Blockly.JavaScript['lists_create_empty_v2'] = function (block) {
  let code = '[';
  for (let i = 0; i < block.itemCount_; i++) {
    const itemCode = Blockly.JavaScript.valueToCode(block, 'ITEM' + i, Blockly.JavaScript.ORDER_NONE) || 'null';
    code += itemCode;
    if (i < block.itemCount_ - 1) {
      code += ', ';
    }
  }
  code += ']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['lists_getValueAtIndex'] = function (block) {
  const arrayName = block.getFieldValue('ARRAY');
  const index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_NONE) || '0';
  const checkIndexValueOfArray = `\n
  if (${index} < 0 || ${index} >= ${arrayName}.length || isNaN(${index})) {
    highlightBlock('${block.id || ''}');
    throw new Error('Index ' + ${index} + ' is out of bounds for array ' + '${arrayName}' + ' with length ' + ${arrayName}.length);
  } \n
  `
  localStorage.setItem('checkIndexValueOfArray', checkIndexValueOfArray);
  return [arrayName + '[' + index + ']', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['math_post_inc_decrement'] = function (block) {
  const dropdown_newop = block.getFieldValue('NEWOP');
  const value_var = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
  const code = value_var + dropdown_newop;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['math_prev_inc_decrement'] = function (block) {
  const dropdown_newop = block.getFieldValue('NEWOP');
  const value_var = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
  const code = dropdown_newop + value_var;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['repeat_condition'] = function (block) {
  const operator = {
    LT: "<",
    LTE: "<=",
    GT: ">",
    GTE: ">="
  }[block.getFieldValue("OP")];
  const order = (operator === "==" || operator === "!=") ? Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
  const valueA = Blockly.JavaScript.valueToCode(block, "A", order) || "0";
  const valueB = Blockly.JavaScript.valueToCode(block, "B", order) || "0";
  return [valueA + " " + operator + " " + valueB, order];
};

Blockly.JavaScript['controls_for'] = function (block) {
  const variableVar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  const valueFrom = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  const valueCondition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_ASSIGNMENT) || `${variableVar} < 10`;
  const valueBy = Blockly.JavaScript.valueToCode(block, 'BY', Blockly.JavaScript.ORDER_ASSIGNMENT) || `${variableVar} ++`;
  const statementsDo = Blockly.JavaScript.statementToCode(block, 'DO');

  let memory = JSON.parse(localStorage.getItem('memory')) || {};
  memory[variableVar] = {
    type: 'INT',
    value: valueFrom
  };
  localStorage.setItem('memory', JSON.stringify(memory));

  const code = `for (var ${variableVar} = ${valueFrom}; ${valueCondition}; ${valueBy}) {\n${statementsDo}}\n`;
  return code;
};

Blockly.JavaScript['math_prev_inc_decrement_exp'] = function (block) {
  const dropdown_newop = block.getFieldValue('NEWOP');
  const value_var = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
  const code = value_var + dropdown_newop + ';\n';
  return code;
};

Blockly.JavaScript['math_post_inc_decrement_exp'] = function (block) {
  const value_var = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
  const dropdown_newop = block.getFieldValue('NEWOP');
  const code = value_var + dropdown_newop + ';\n';
  return code;
};

Blockly.JavaScript['address'] = function (block) {
  const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  const code = '&' + value;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['pointer'] = function (block) {
  const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  const code = value + '.val';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.getFunctionParameters = function (functionString) {
  const innerFunctionPattern = /\w+\([^()]*\)/;
  const matchFunction = functionString.match(innerFunctionPattern);

  if (!matchFunction) return [];

  const codeFunc = matchFunction[0];
  const parameterPattern = /\(([^)]+)\)/;
  const match = codeFunc.match(parameterPattern);

  return match && match[1] ? match[1].split(',').map(param => param.trim()) : [];
}

// Blockly.JavaScript.getFunctionName = function (functionString) {
//   const functionNamePattern = /^\s*function\s+([^\s(]+)/;
//   const match = functionString.match(functionNamePattern);
//   if (!match) return '';
//   return match[1];
// };

Blockly.JavaScript.getFunctionName = function (functionString) {
  const functionNamePattern = /(\w+)\(/;
  const functionNameMatch = functionString.match(functionNamePattern);
  return functionNameMatch ? functionNameMatch[1] : '';
}

Blockly.JavaScript.replaceFunctionParameters = function (functionString, newParameters) {
  const functionName = Blockly.JavaScript.getFunctionName(functionString);
  const updatedFunctionString = `${functionName}(${newParameters.join(', ')})`;
  return updatedFunctionString;
}

// Override procedures_callnoreturn function
Blockly.JavaScript.procedures_callnoreturn = function (a) {
  const codeFuncText = Blockly.JavaScript.procedures_callreturn(a)[0];
  const params = Blockly.JavaScript.getFunctionParameters(codeFuncText);
  const functionName = Blockly.JavaScript.getFunctionName(codeFuncText);
  let memory = JSON.parse(localStorage.getItem('memory')) || {};
  let c1 = "";
  let c2 = "";
  const newCodeFuncText = Blockly.JavaScript.replaceFunctionParameters(codeFuncText, params);

  for (let i = 0; i < params.length; i++) {
    if (params[i][0] === '&') {
      const variable = params[i].substring(1);
      params[i] = variable;
      c1 += `${variable} = { val: ${variable} };\n`;
      c2 += `${variable} = ${variable}.val;\n`;
    }
    if (
      memory[functionName]?.params[i]
      && (Object.values(memory[functionName]?.params[i])[0] == 'INT_REF'
        || Object.values(memory[functionName]?.params[i])[0] == 'CHAR_REF')
    ) {
      const variable = params[i];
      if (variable !== 'null') {
        c1 += `${variable} = { val: ${variable} };\n`;
        c2 += `${variable} = ${variable}.val;\n`;
      }
    }
  }
  return c1 + newCodeFuncText + ';\n' + c2;
};

Blockly.JavaScript.checkPassRef = function (memory, varName) {
  for (const key in memory) {
    if (memory[key].isFunction == 1 && Array.isArray(memory[key].params)) {
      for (const param of memory[key].params) {
        if (param[varName] === "INT_REF" || param[varName] === "CHAR_REF") {
          return true;
        }
      }
    }
  }
  return false;
}
Blockly.JavaScript.removeDotVal = function (str) {
  return str.replace('.val', '');
}

// Generator for main block
Blockly.JavaScript['main_block'] = function (block) {
  const stackCode = Blockly.JavaScript.statementToCode(block, 'STACK');
  let code = 'function main() {\n';
  code += stackCode;
  code += '}\n';
  code += 'main();\n';
  return code;
};
